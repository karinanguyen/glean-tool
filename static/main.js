
// function save() { 
//   localStorage.setItem("text", textarea.value);
//   console.log(textarea.value)
// }

function create(tag) {
  return document.createElement(tag);
}

function build_timeline(response_json) {
  var table_container = document.querySelector(".relations-table"); 
  var activities = response_json['activity_done'] 
  console.log(activities)
  var list_characters = [] 
  activities.forEach(item => list_characters.push(item['subject']));
  const uniqueCharacters = Array.from(new Set(list_characters)); 
  console.log(uniqueCharacters)

  var list_of_actions = [] 
  activities.forEach(item => list_of_actions.push(item['object'])); 
  console.log(list_of_actions)
  
//MAYBE WE DON'T NEED NESTED DICTIONARY, TRY TO MAKE MULTIPLE DICTIONARIES

  var list_of_context = [] 
  activities.forEach(item => list_of_context.push(item['context'])); 
  console.log(list_of_context) 

  var action_by_context = {};
  list_of_actions.forEach((key, i) => action_by_context[key] = list_of_context[i]);
  console.log(action_by_context); 

  new_dict = {}  
  // TODO: FIX THE NEW DICT (FILTER THE ACTIONS BY CHARACTERS)
  for (var character of uniqueCharacters) {
    new_dict[character] = action_by_context
  } 

  console.log(new_dict)

  const dateRegex = /(?:January|February|March|April|May|June|July|August|September|October|November|December) \d{1,2}, \d{4}|(\d{4})|(?:January|February|March|April|May|June|July|August|September|October|November|December) \d{4}/g;
  for (const property in new_dict) {
    for (const action in new_dict[property]) {
      string = new_dict[property][action] 
      time = string.match(dateRegex) 
      console.log(time)
      console.log(`PERSON: ${property}. ACTION: ${action}. CONTEXT: ${new_dict[property][action]}`) 

    }
    // console.log(`${property}: ${new_dict[property]}`);
  }


  // console.log(Object.values(new_dict))

 
  // for (const subject in activities){
  //   console.log(subject['subject'])
  // }
  // for (const relation_type in response_json) {
  //   console.log(relation_type);
  //   const table = create('table');

  //   const relations = response_json[relation_type];
  //   for (const relation of relations) {
  //     const table_row = create('tr');
  //     console.log(relation_type, relation);

  //     const cell1 = create('td');
  //     cell1.textContent = relation.subject;
  //     const cell2 = create('td');
  //     cell2.textContent = relation.object;
  //     const cell3 = create('td');
  //     cell3.textContent = relation.context;

  //     table_row.append(cell1, cell2, cell3);
  //     table.append(table_row);
  //   }

  //   table_container.append(table);
  // }
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
  build_timeline(response_json);
}
