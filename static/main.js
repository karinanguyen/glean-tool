import * as d3 from "https://cdn.skypack.dev/d3@7";
// import * as d3 from 'https://unpkg.com/d3?module';

// import * as d3 from 'd3';
// function save() {
//   localStorage.setItem("text", textarea.value);
//   console.log(textarea.value)
// }

// function create(tag) {
//   return document.createElement(tag);
// }
console.log(d3);

function characters(response_json) {
  var activities = response_json["activity_done"];
  var list_characters = [];
  activities.forEach((item) => list_characters.push(item["subject"]));
  const uniqueCharacters = Array.from(new Set(list_characters));
  console.log(uniqueCharacters);

  const character_actions = [];
  for (const character of uniqueCharacters) {
    const matched_activities = activities.filter((activity) => {
      if (activity["subject"] == character) {
        return true;
      }
      return false;
    });

    character_actions.push({
      name: character,
      children: matched_activities.map((activity) => {
        return {
          name: activity.object,
          value: activity.confidence,
        };
      }),
    });
  }
  console.log(character_actions);
  return {
    name: "Document",
    children: character_actions,
  };
}

// Copyright 2022 Observable, Inc.
// Released under the ISC license.
// https://observablehq.com/@d3/radial-tree
// Copyright 2021 Observable, Inc.
// Released under the ISC license.
//observablehq.com/@d3/tree
function Tree(
  data,
  {
    // data is either tabular (array of objects) or hierarchy (nested objects)
    path, // as an alternative to id and parentId, returns an array identifier, imputing internal nodes
    id = Array.isArray(data) ? (d) => d.id : null, // if tabular data, given a d in data, returns a unique identifier (string)
    parentId = Array.isArray(data) ? (d) => d.parentId : null, // if tabular data, given a node d, returns its parent’s identifier
    children, // if hierarchical data, given a d in data, returns its children
    tree = d3.tree, // layout algorithm (typically d3.tree or d3.cluster)
    sort, // how to sort nodes prior to layout (e.g., (a, b) => d3.descending(a.height, b.height))
    label, // given a node d, returns the display name
    title, // given a node d, returns its hover text
    link, // given a node d, its link (if any)
    linkTarget = "_blank", // the target attribute for links (if any)
    width, // outer width, in pixels
    height, // outer height, in pixels
    r = 3, // radius of nodes
    padding = 1, // horizontal padding for first and last column
    fill = "#999", // fill for nodes
    fillOpacity, // fill opacity for nodes
    stroke = "#555", // stroke for links
    strokeWidth = 1.5, // stroke width for links
    strokeOpacity = 0.4, // stroke opacity for links
    strokeLinejoin, // stroke line join for links
    strokeLinecap, // stroke line cap for links
    halo = "#fff", // color of label halo
    haloWidth = 5, // padding around the labels
  } = {}
) {
  // If id and parentId options are specified, or the path option, use d3.stratify
  // to convert tabular data to a hierarchy; otherwise we assume that the data is
  // specified as an object {children} with nested objects (a.k.a. the “flare.json”
  // format), and use d3.hierarchy.
  const root =
    path != null
      ? d3.stratify().path(path)(data)
      : id != null || parentId != null
      ? d3.stratify().id(id).parentId(parentId)(data)
      : d3.hierarchy(data, children);

  // Sort the nodes.
  if (sort != null) root.sort(sort);

  // Compute labels and titles.
  const descendants = root.descendants();
  const L = label == null ? null : descendants.map((d) => label(d.data, d));

  // Compute the layout.
  const dx = 20;
  const dy = width / (root.height + padding + 2);
  tree().nodeSize([dx, dy])(root);

  // Center the tree.
  let x0 = Infinity;
  let x1 = -x0;
  root.each((d) => {
    if (d.x > x1) x1 = d.x;
    if (d.x < x0) x0 = d.x;
  });

  // Compute the default height.
  if (height === undefined) height = x1 - x0 + dx * 2;

  const svg = d3
    .create("svg")
    .attr("viewBox", [(-dy * padding) / 2, x0 - dx, width, height])
    .attr("width", width)
    .attr("height", height)
    .attr("style", "max-width: 100%; height: auto; height: intrinsic;")
    .attr("font-family", "sans-serif")
    .attr("font-size", 16);

  svg
    .append("g")
    .attr("fill", "none")
    .attr("stroke", stroke)
    .attr("stroke-opacity", strokeOpacity)
    .attr("stroke-linecap", strokeLinecap)
    .attr("stroke-linejoin", strokeLinejoin)
    .attr("stroke-width", strokeWidth)
    .selectAll("path")
    .data(root.links())
    .join("path")
    .attr(
      "d",
      d3
        .linkHorizontal()
        .x((d) => d.y)
        .y((d) => d.x)
    );

  svg.append("defs").html(`
    <style>
    .highlight circle { fill:pink }
    .highlight circle { fill:pink }
    .highlight text { fill:pink }
    .leaf circle { fill:red }
    .leaf circle { fill:red }
    .leaf text { fill:red }
    path.highlight { stroke:pink }
    <style>`);

  function dist2(a, b) {
    return (a[0] - b[0]) ** 2 + (a[1] - b[1]) ** 2;
  }

  const node = svg
    .append("g")
    .selectAll("a")
    .data(root.descendants())
    .join("a")
    .attr("xlink:href", link == null ? null : (d) => link(d.data, d))
    .attr("target", link == null ? null : linkTarget)
    .attr("transform", (d) => `translate(${d.y},${d.x})`)
    .on("mouseover", function (d) {
      // Highlight the nodes: every node is green except of him
      node.style("fill", "black");
      d3.select(this).style("fill", "#b3696a").style('font-size','17px').style("cursor","pointer");
      // Highlight the connections
      root.links().style("stroke", function (link_d) {
        return link_d.children === d.id || link_d.children === d.id
          ? "#b3696a"
          : "#b8b8b8";
      });
    })
    .on("mouseout", function (d) {
      node.style("fill", "black").style('font-size','14px');
      root.links().style("stroke", "black");
    });

  node
    .append("circle")
    .attr("fill", (d) => (d.children ? stroke : fill))
    .attr("r", r);

  if (title != null) node.append("title").text((d) => title(d.data, d));

  if (L)
    node
      .append("text")
      .style('font-weight', '300')
      .attr("dy", "0.12em")
      .attr("x", (d) => (d.children ? -6 : 6))
      .attr("text-anchor", (d) => (d.children ? "end" : "start"))
      .attr("paint-order", "stroke")
      .attr("stroke", halo)
      .attr("stroke-width", haloWidth)
      .text((d, i) => L[i]);

  return svg.node();
}

var button = document.querySelector("#submit_button");
button.onclick = async () => {
  var text_area = document.querySelector("#textarea");
  var local_text = text_area.value;
  const response = await fetch("/extract-relations", {
    method: "POST",
    body: JSON.stringify({
      text: local_text,
    }),
  });
  const response_json = await response.json();
  const tree_svg_element = Tree(characters(response_json), {
    label: (d) => d.name,
    width: 1800,
    height: 1500,
    // margin: 220,
  });

  const text_field = document.querySelector(".textfield");
  text_field.parentNode.insertBefore(tree_svg_element, text_field.nextSibling);
};
