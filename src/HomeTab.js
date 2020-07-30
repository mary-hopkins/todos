import { displayTodo, displayProject } from "./DOMfunctions.js";
import { List } from "./ProjectsAndTodos.js";
import { listOne } from "./index.js";

function loadHomeTab() {
  let base = document.querySelector("#content");
  base.innerHTML = "";
  base.appendChild(createGeneralList());
  base.appendChild(createDueSoonList());
  base.appendChild(createHighPriorityList());
}
function loadProjectTab() {
  let base = document.querySelector("#content");
  base.innerHTML = "";
  let projectsArray = listOne.getProjectsArray();

  for (var i = 0; i < projectsArray.length; i++) {
    let currentProject = projectsArray[i];
    let project = displayProject(currentProject);
    base.appendChild(project);
  }
}


function createDueSoonList() {
  let dueSoon = document.createElement("div");
  dueSoon.classList.add("duesoon");
  dueSoon.classList.add("section");

  let dueSoonTitle = document.createElement("h2");
  dueSoonTitle.innerHTML = "ToDos Due in the next 7 days";
  dueSoon.appendChild(dueSoonTitle);

  let dueSoonTodos = listOne.populateDueSoon();
  for (let i = 0; i < dueSoonTodos.length; i++) {
    let currentTodo = dueSoonTodos[i];
    let todo = displayTodo(currentTodo);
    dueSoon.appendChild(todo);
  }
  return dueSoon;
}
function createHighPriorityList() {
  let highPriority = document.createElement("div");
  highPriority.classList.add("highpriority", "section");

  let highPriorityTitle = document.createElement("h2");
  highPriorityTitle.innerHTML = "ToDos with High Priority (4 and 5)";
  highPriority.appendChild(highPriorityTitle);

  let highPriorityTodos = listOne.populateHighPriority();
  for (let i = 0; i < highPriorityTodos.length; i++) {
    let currentTodo = highPriorityTodos[i];
    let todo = displayTodo(currentTodo);
    highPriority.appendChild(todo);
  }
  return highPriority;
}
function createGeneralList() {
  let aside = document.createElement("aside");
  aside.classList.add("generalProject");

  let projectTitle = document.createElement("h2");
  projectTitle.innerHTML = "General Todos";
  aside.appendChild(projectTitle);

  let asideTodos = listOne.getGeneralTodos();
  for (let i = 0; i < asideTodos.length; i++) {
    let currentTodo = asideTodos[i];
    let todo = displayTodo(currentTodo);
    aside.appendChild(todo);
  }
  return aside;
}

export { loadHomeTab, loadProjectTab };
