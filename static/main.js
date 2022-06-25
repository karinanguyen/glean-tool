
// function save() { 
//   localStorage.setItem("text", textarea.value);
//   console.log(textarea.value)
// }

function create(tag) {
  return document.createElement(tag);
}

function populate_table(response_json) {
  var table_container = document.querySelector(".relations-table");
  for (const relation_type in response_json) {
    console.log(relation_type);
    const table = create('table');

    const relations = response_json[relation_type];
    for (const relation of relations) {
      const table_row = create('tr');
      console.log(relation_type, relation);

      const cell1 = create('td');
      cell1.textContent = relation.subject;
      const cell2 = create('td');
      cell2.textContent = relation.object;
      const cell3 = create('td');
      cell3.textContent = relation.context;

      table_row.append(cell1, cell2, cell3);
      table.append(table_row);
    }

    table_container.append(table);
  }
}

var button = document.querySelector("#submit_button")
button.onclick = async () => {
  var text_area = document.querySelector("#textarea");
  var local_text = text_area.value;
  const response = await fetch('/extract-relations', {
    method: 'POST',
    body: JSON.stringify({
      text: local_text,
    }),
  });
  const response_json = await response.json();
  populate_table(response_json);
}
