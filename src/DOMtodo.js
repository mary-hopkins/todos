import { findTodoInTodosArray, objectToTodo } from "./TodosArray";

import {
  findProjectTitleFromProjectId,
  shareProjectsArray,
} from "./ProjectsArray";

let todosArray = localStorage.getItem("todos")
  ? JSON.parse(localStorage.getItem("todos"))
  : [];

// DOM function to create Todo form
function createTodoFormDOM() {
  let formDiv = document.createElement("div");
  formDiv.classList.add("formDiv");
  let titleLabel = document.createElement("label");
  titleLabel.setAttribute("for", "title");
  titleLabel.innerHTML = "Title:";
  formDiv.appendChild(titleLabel);
  formDiv.appendChild(document.createElement("br"));

  let titleInput = document.createElement("input");
  titleInput.setAttribute("id", "title");
  titleInput.setAttribute("type", "text");
  titleInput.setAttribute("maxlength", "50");
  titleInput.setAttribute("required", "");
  formDiv.appendChild(titleInput);
  formDiv.appendChild(document.createElement("br"));
  formDiv.appendChild(document.createElement("br"));

  let dueDateLabel = document.createElement("label");
  dueDateLabel.setAttribute("for", "dueDate");
  dueDateLabel.innerHTML = "Due Date:";
  formDiv.appendChild(dueDateLabel);
  formDiv.appendChild(document.createElement("br"));

  let dueDateInput = document.createElement("input");
  dueDateInput.setAttribute("id", "dueDate");
  dueDateInput.setAttribute("type", "date");
  dueDateInput.setAttribute("required", "");
  formDiv.appendChild(dueDateInput);
  formDiv.appendChild(document.createElement("br"));
  formDiv.appendChild(document.createElement("br"));

  let descriptionLabel = document.createElement("label");
  descriptionLabel.setAttribute("for", "description");
  descriptionLabel.innerHTML = "Description:";
  formDiv.appendChild(descriptionLabel);
  formDiv.appendChild(document.createElement("br"));

  let descriptionInput = document.createElement("textarea");
  descriptionInput.setAttribute("id", "description");
  descriptionInput.setAttribute("name", "description");
  descriptionInput.setAttribute("rows", "4");
  descriptionInput.setAttribute("cols", "50");
  descriptionInput.setAttribute("maxlength", "140");
  formDiv.appendChild(descriptionInput);
  formDiv.appendChild(document.createElement("br"));
  formDiv.appendChild(document.createElement("br"));

  let notesLabel = document.createElement("label");
  notesLabel.setAttribute("for", "notes");
  notesLabel.innerHTML = "Notes:";
  formDiv.appendChild(notesLabel);
  formDiv.appendChild(document.createElement("br"));

  let notesInput = document.createElement("textarea");
  notesInput.setAttribute("id", "notes");
  notesInput.setAttribute("name", "notes");
  notesInput.setAttribute("rows", "4");
  notesInput.setAttribute("cols", "50");
  notesInput.setAttribute("maxlength", "140");
  formDiv.appendChild(notesInput);
  formDiv.appendChild(document.createElement("br"));
  formDiv.appendChild(document.createElement("br"));

  let priorityLabel = document.createElement("label");
  priorityLabel.setAttribute("for", "priority");
  priorityLabel.innerHTML = "Priority:";
  formDiv.appendChild(priorityLabel);
  formDiv.appendChild(document.createElement("br"));

  let priorityInput = document.createElement("input");
  priorityInput.setAttribute("id", "priority");
  priorityInput.setAttribute("type", "number");
  priorityInput.setAttribute("max", "5");
  priorityInput.setAttribute("min", "1");
  priorityInput.setAttribute("required", "");
  formDiv.appendChild(priorityInput);
  formDiv.appendChild(document.createElement("br"));
  formDiv.appendChild(document.createElement("br"));

  let projectLabel = document.createElement("label");
  projectLabel.setAttribute("for", "project");
  projectLabel.innerHTML = "Project:";
  formDiv.appendChild(projectLabel);
  formDiv.appendChild(document.createElement("br"));

  let projectInput = document.createElement("select");
  projectInput.setAttribute("id", "project");
  projectInput.setAttribute("name", "project");

  // function to go thru projectsArray and make an option for each one
  function createProjectOptions() {
    let projectsArray = shareProjectsArray();
    for (var i = 0; i < projectsArray.length; i++) {
      let currentProject = projectsArray[i];
      let optionBlock = document.createElement("option");
      optionBlock.setAttribute("value", `${currentProject.title}`);
      optionBlock.innerHTML = `${currentProject.title}`;
      projectInput.appendChild(optionBlock);
    }
  }
  createProjectOptions();

  formDiv.appendChild(projectInput);
  formDiv.appendChild(document.createElement("br"));
  formDiv.appendChild(document.createElement("br"));

  let newTodoSubmitBtn = document.createElement("button");
  newTodoSubmitBtn.classList.add("newTodosubmit");
  newTodoSubmitBtn.setAttribute("type", "button");
  newTodoSubmitBtn.innerHTML = "Submit";
  formDiv.appendChild(newTodoSubmitBtn);

  let cancelBtn = document.createElement("button");
  cancelBtn.setAttribute("type", "button");
  cancelBtn.classList.add("newTodoCancelBtn");
  cancelBtn.innerHTML = "Cancel";
  formDiv.appendChild(cancelBtn);

  return formDiv;
}

// Function to make Edit form for todo
function editTodoFormDOM(e) {
  let formDiv = document.createElement("div");
  formDiv.classList.add("formDiv");

  let titleLabel = document.createElement("label");
  titleLabel.setAttribute("for", "title");
  titleLabel.innerHTML = "Title:";
  formDiv.appendChild(titleLabel);
  formDiv.appendChild(document.createElement("br"));

  let titleInput = document.createElement("input");
  titleInput.setAttribute("id", "title");
  titleInput.setAttribute("type", "text");
  titleInput.setAttribute("maxlength", "50");
  titleInput.setAttribute("required", "");
  titleInput.value = `${e.title}`;
  formDiv.appendChild(titleInput);
  formDiv.appendChild(document.createElement("br"));
  formDiv.appendChild(document.createElement("br"));

  let dueDateLabel = document.createElement("label");
  dueDateLabel.setAttribute("for", "dueDate");
  dueDateLabel.innerHTML = "Due Date:";
  formDiv.appendChild(dueDateLabel);
  formDiv.appendChild(document.createElement("br"));

  let dueDateInput = document.createElement("input");
  dueDateInput.setAttribute("id", "dueDate");
  dueDateInput.setAttribute("type", "date");
  dueDateInput.setAttribute("required", "");
  dueDateInput.value = `${e.dueDate}`;
  formDiv.appendChild(dueDateInput);
  formDiv.appendChild(document.createElement("br"));
  formDiv.appendChild(document.createElement("br"));
  let descriptionLabel = document.createElement("label");
  descriptionLabel.setAttribute("for", "description");
  descriptionLabel.innerHTML = "Description:";
  formDiv.appendChild(descriptionLabel);
  formDiv.appendChild(document.createElement("br"));

  let descriptionInput = document.createElement("textarea");
  descriptionInput.setAttribute("id", "description");
  descriptionInput.setAttribute("name", "description");
  descriptionInput.setAttribute("rows", "4");
  descriptionInput.setAttribute("cols", "50");
  descriptionInput.setAttribute("maxlength", "140");
  descriptionInput.value = `${e.description}`;
  formDiv.appendChild(descriptionInput);
  formDiv.appendChild(document.createElement("br"));
  formDiv.appendChild(document.createElement("br"));

  let notesLabel = document.createElement("label");
  notesLabel.setAttribute("for", "notes");
  notesLabel.innerHTML = "Notes:";
  formDiv.appendChild(notesLabel);
  formDiv.appendChild(document.createElement("br"));

  let notesInput = document.createElement("textarea");
  notesInput.setAttribute("id", "notes");
  notesInput.setAttribute("name", "notes");
  notesInput.setAttribute("rows", "4");
  notesInput.setAttribute("cols", "50");
  notesInput.setAttribute("maxlength", "140");
  notesInput.value = `${e.notes}`;
  formDiv.appendChild(notesInput);
  formDiv.appendChild(document.createElement("br"));
  formDiv.appendChild(document.createElement("br"));

  let priorityLabel = document.createElement("label");
  priorityLabel.setAttribute("for", "priority");
  priorityLabel.innerHTML = "Priority:";
  formDiv.appendChild(priorityLabel);
  formDiv.appendChild(document.createElement("br"));

  let priorityInput = document.createElement("input");
  priorityInput.setAttribute("id", "priority");
  priorityInput.setAttribute("type", "number");
  priorityInput.setAttribute("max", "5");
  priorityInput.setAttribute("min", "1");
  priorityInput.setAttribute("required", "");
  priorityInput.value = `${e.priority}`;
  formDiv.appendChild(priorityInput);
  formDiv.appendChild(document.createElement("br"));
  formDiv.appendChild(document.createElement("br"));

  let projectLabel = document.createElement("label");
  projectLabel.setAttribute("for", "project");
  projectLabel.innerHTML = "Project:";
  formDiv.appendChild(projectLabel);
  formDiv.appendChild(document.createElement("br"));

  let projectInput = document.createElement("select");
  projectInput.setAttribute("id", "project");
  projectInput.setAttribute("name", "project");

  // function to go thru projectsArray and make an option for each one
  function createProjectOptions() {
    let projectsArray = shareProjectsArray();
    for (var i = 0; i < projectsArray.length; i++) {
      let currentProject = projectsArray[i];
      let optionBlock = document.createElement("option");
      optionBlock.setAttribute("value", `${currentProject.title}`);
      optionBlock.innerHTML = `${currentProject.title}`;
      projectInput.appendChild(optionBlock);
    }
  }
  createProjectOptions();

  formDiv.appendChild(projectInput);
  formDiv.appendChild(document.createElement("br"));
  formDiv.appendChild(document.createElement("br"));

  let newTodoSubmitBtn = document.createElement("button");
  newTodoSubmitBtn.classList.add("editTodosubmit");
  newTodoSubmitBtn.setAttribute("type", "button");
  newTodoSubmitBtn.setAttribute("data-num", e.todoId);
  newTodoSubmitBtn.innerHTML = "Submit";
  formDiv.appendChild(newTodoSubmitBtn);

  let cancelBtn = document.createElement("button");
  cancelBtn.setAttribute("type", "button");
  cancelBtn.classList.add("editTodoCancelBtn");
  cancelBtn.innerHTML = "Cancel";
  formDiv.appendChild(cancelBtn);

  return formDiv;
}

// DOM function to create todo
function createTodoDOM(todo) {
  let index = todo.getTodoId();

  let todoDiv = document.createElement("div");
  todoDiv.classList.add("todo");

  let todoTitle = document.createElement("h3");
  todoTitle.innerHTML = todo.getTitle();
  todoDiv.appendChild(todoTitle);

  let due_date = document.createElement("p");
  due_date.innerHTML = `Due: ${todo.getdueDate()}`;
  todoDiv.appendChild(due_date);

  let todoDescription = document.createElement("p");
  todoDescription.classList.add("description", "hidden");
  todoDescription.innerHTML = todo.getDescription();
  todoDiv.appendChild(todoDescription);

  let todoNotes = document.createElement("p");
  todoNotes.classList.add("notes", "hidden");
  todoNotes.innerHTML = todo.getNotes();
  todoDiv.appendChild(todoNotes);

  let todoPriority = document.createElement("p");
  todoPriority.classList.add("priority", "hidden");
  todoPriority.innerHTML = `Priority: ${todo.getPriority()}`;
  todoDiv.appendChild(todoPriority);

  let todoProject = document.createElement("p");
  todoProject.classList.add("project", "hidden");
  todoProject.innerHTML = `Project: ${findProjectTitleFromProjectId(
    todo.getProjectId()
  )}`;

  let btn_holder = document.createElement("div");
  btn_holder.classList.add("btn-holder");

  let edit_btn = document.createElement("button");
  edit_btn.innerHTML = "Edit";
  edit_btn.setAttribute("type", "button");
  edit_btn.setAttribute("data-num", index);
  edit_btn.classList.add("edit-btn");
  btn_holder.appendChild(edit_btn);

  let delete_btn = document.createElement("button");
  delete_btn.innerHTML = "Delete";
  delete_btn.setAttribute("type", "button");
  delete_btn.setAttribute("data-num", index);
  delete_btn.classList.add("delete-btn");
  btn_holder.appendChild(delete_btn);

  let mini_btn = document.createElement("button");
  mini_btn.classList.add("minimax");
  mini_btn.setAttribute("type", "button");
  mini_btn.innerHTML = "&#8593";
  btn_holder.appendChild(mini_btn);

  let completed_btn = document.createElement("button");
  completed_btn.innerHTML = todo.getCompletedStatus();
  completed_btn.setAttribute("type", "button");
  completed_btn.setAttribute("data-num", index);
  completed_btn.classList.add("complete-btn");
  btn_holder.appendChild(completed_btn);

  todoDiv.appendChild(btn_holder);

  return todoDiv;
}

// DOM function to toggle visibility
function toggleTodo(e) {
  let btnDiv = e.target;
  let btnHolderDiv = btnDiv.parentNode;
  let todoDiv = btnHolderDiv.parentNode;
  let searchDivs = todoDiv.children;

  for (var i = 0; i < searchDivs.length; i++) {
    var currentElement = searchDivs[i];
    if (currentElement.classList.contains("hidden")) {
      currentElement.classList.remove("hidden");
      currentElement.classList.add("hiddable");
    } else if (currentElement.classList.contains("hiddable")) {
      currentElement.classList.remove("hiddable");
      currentElement.classList.add("hidden");
    }
  }
}

// New Todo Form Visibility
function CreateTodoForm() {
  let base = document.querySelector("#content");
  base.classList.add("hidden");

  let createDiv = document.querySelector(".create");
  createDiv.classList.add("hidden");

  let formSection = document.querySelector(".form");
  formSection.classList.remove("hidden");
  formSection.innerHTML = "";

  let formSectionTitle = document.createElement("h2");
  formSectionTitle.innerHTML = "Create a New Todo!";
  formSection.appendChild(formSectionTitle);

  formSection.appendChild(createTodoFormDOM());
}

// Edit Todo Form Visibility
function EditTodoForm(e) {
  let targetTodoId = e.target.dataset.num;
  let targetTodoIndex = findTodoInTodosArray(targetTodoId);
  let targetTodo = todosArray[targetTodoIndex];

  let base = document.querySelector("#content");
  base.classList.add("hidden");

  let createDiv = document.querySelector(".create");
  createDiv.classList.add("hidden");

  let formSection = document.querySelector(".form");
  formSection.classList.remove("hidden");
  formSection.innerHTML = "";

  let formSectionTitle = document.createElement("h2");
  formSectionTitle.innerHTML = "Edit Your Todo";
  formSection.appendChild(formSectionTitle);

  formSection.appendChild(editTodoFormDOM(targetTodo));
}

function getTodosForProject(id) {
  let projectId = id;
  let returnerDiv = document.createElement("div");

  for (var i = 0; i < todosArray.length; i++) {
    let object = todosArray[i];
    if (object.projectId == projectId) {
      let todo = objectToTodo(object);
      let todoDom = createTodoDOM(todo);
      returnerDiv.appendChild(todoDom);
    }
  }
  return returnerDiv;
}

function notAPageReset() {
  let base = document.querySelector("#content");
  let createDiv = document.querySelector(".create");
  let formSection = document.querySelector(".form");

  createDiv.classList.remove("hidden");
  formSection.classList.add("hidden");
  base.classList.remove("hidden");
  formSection.innerHTML = "";
}

export {
  toggleTodo,
  CreateTodoForm,
  EditTodoForm,
  createTodoDOM,
  getTodosForProject,
  notAPageReset,
};
