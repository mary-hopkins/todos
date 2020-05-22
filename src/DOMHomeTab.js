import { createTodoDOM } from "./DOMtodo.js";

import { setLocalstorage, objectToTodo, populateList } from "./TodosArray.js";

function loadHomeTab() {
  let base = document.querySelector("#content");
  base.innerHTML = "";
  base.appendChild(createGeneralListDOM());
  base.appendChild(createDueSoonListDOM());
  base.appendChild(createHighPriorityListDOM());
}

// DOM HOME function to create DueSoonList
function createDueSoonListDOM() {
  let dueSoon = document.createElement("div");
  dueSoon.classList.add("duesoon");
  dueSoon.classList.add("section");

  let dueSoonTitle = document.createElement("h2");
  dueSoonTitle.innerHTML = "ToDos Due in the next 7 days";
  dueSoon.appendChild(dueSoonTitle);

  let dueSoonList = "dueSoon";
  let dueSoonTodos = populateList(dueSoonList);
  for (let i = 0; i < dueSoonTodos.length; i++) {
    let currentObject = dueSoonTodos[i];
    let currentTodo = objectToTodo(currentObject);
    let todo = createTodoDOM(currentTodo);
    dueSoon.appendChild(todo);
  }
  return dueSoon;
}

// DOM HOME function to create highpriorityList
function createHighPriorityListDOM() {
  let highPriority = document.createElement("div");
  highPriority.classList.add("highpriority", "section");

  let highPriorityTitle = document.createElement("h2");
  highPriorityTitle.innerHTML = "ToDos with High Priority (4 and 5)";
  highPriority.appendChild(highPriorityTitle);

  let highPriorityList = "highPriority";
  let highPriorityTodos = populateList(highPriorityList);
  for (let i = 0; i < highPriorityTodos.length; i++) {
    let currentObject = highPriorityTodos[i];
    let currentTodo = objectToTodo(currentObject);
    let todo = createTodoDOM(currentTodo);
    highPriority.appendChild(todo);
  }
  return highPriority;
}

// DOM HOME function to create aside
function createGeneralListDOM() {
  let aside = document.createElement("aside");
  aside.classList.add("generalProject");

  let projectTitle = document.createElement("h2");
  projectTitle.innerHTML = "General Todos";
  aside.appendChild(projectTitle);

  setLocalstorage();

  let general = "general";
  let asideTodos = populateList(general); // will go thru project switchboard oneday

  for (let i = 0; i < asideTodos.length; i++) {
    let currentObject = asideTodos[i];
    let currentTodo = objectToTodo(currentObject);
    let todo = createTodoDOM(currentTodo);
    aside.appendChild(todo);
  }
  return aside;
}

export { loadHomeTab };
