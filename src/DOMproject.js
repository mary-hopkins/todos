import {
  findProjectInProjectsArray,
  shareProjectsArray,
} from "./ProjectsArray.js";

import { getTodosForProject } from "./DOMtodo.js";

// New Project form
function createProjectFormDOM() {
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

  let newProjectSubmitBtn = document.createElement("button");
  newProjectSubmitBtn.classList.add("newProjectsubmit");
  newProjectSubmitBtn.setAttribute("type", "button");
  newProjectSubmitBtn.innerHTML = "Submit";
  formDiv.appendChild(newProjectSubmitBtn);

  let cancelBtn = document.createElement("button");
  cancelBtn.setAttribute("type", "button");
  cancelBtn.classList.add("newProjectCancelBtn");
  cancelBtn.innerHTML = "Cancel";
  formDiv.appendChild(cancelBtn);

  return formDiv;
}

// Edit Project form
function editProjectFormDOM(e) {
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

  let newProjectSubmitBtn = document.createElement("button");
  newProjectSubmitBtn.classList.add("editProjectsubmit");
  newProjectSubmitBtn.setAttribute("type", "button");
  newProjectSubmitBtn.setAttribute("data-num", e.projectId);
  newProjectSubmitBtn.innerHTML = "Submit";
  formDiv.appendChild(newProjectSubmitBtn);

  let cancelBtn = document.createElement("button");
  cancelBtn.setAttribute("type", "button");
  cancelBtn.classList.add("editProjectCancelBtn");
  cancelBtn.innerHTML = "Cancel";
  formDiv.appendChild(cancelBtn);

  return formDiv;
}

// DOM function to create Project
function createProjectDOM(project) {
  let index = project.getProjectId();

  let projectDiv = document.createElement("div");
  projectDiv.classList.add("project");

  let projectTitle = document.createElement("h3");
  projectTitle.innerHTML = project.getTitle();
  projectDiv.appendChild(projectTitle);

  let due_date = document.createElement("p");
  due_date.innerHTML = `Due: ${project.getdueDate()}`;
  projectDiv.appendChild(due_date);

  let projectDescription = document.createElement("p");
  projectDescription.classList.add("description", "hidden");
  projectDescription.innerHTML = project.getDescription();
  projectDiv.appendChild(projectDescription);

  let projectNotes = document.createElement("p");
  projectNotes.classList.add("notes", "hidden");
  projectNotes.innerHTML = project.getNotes();
  projectDiv.appendChild(projectNotes);

  let projectPriority = document.createElement("p");
  projectPriority.classList.add("priority", "hidden");
  projectPriority.innerHTML = `Priority: ${project.getPriority()}`;
  projectDiv.appendChild(projectPriority);

  let todosContainer = document.createElement("div");
  todosContainer.classList.add("todos-container", "hidden");
  let todosContainerTitle = document.createElement("h3");
  todosContainerTitle.innerHTML = `${project.getTitle()} Todos`;
  todosContainer.appendChild(todosContainerTitle);
  todosContainer.appendChild(getTodosForProject(project.getProjectId()));
  projectDiv.appendChild(todosContainer);

  let btn_holder = document.createElement("div");
  btn_holder.classList.add("btn-holder");

  let edit_btn = document.createElement("button");
  edit_btn.innerHTML = "Edit";
  edit_btn.setAttribute("type", "button");
  edit_btn.setAttribute("data-num", index);
  edit_btn.classList.add("project-edit-btn");
  btn_holder.appendChild(edit_btn);

  let delete_btn = document.createElement("button");
  delete_btn.innerHTML = "Delete";
  delete_btn.setAttribute("type", "button");
  delete_btn.setAttribute("data-num", index);
  delete_btn.classList.add("project-delete-btn");
  btn_holder.appendChild(delete_btn);

  let mini_btn = document.createElement("button");
  mini_btn.classList.add("projectMinimax");
  mini_btn.setAttribute("type", "button");
  mini_btn.innerHTML = "&#8593";
  btn_holder.appendChild(mini_btn);

  let completed_btn = document.createElement("button");
  completed_btn.innerHTML = project.getCompletedStatus();
  completed_btn.setAttribute("type", "button");
  completed_btn.setAttribute("data-num", index);
  completed_btn.classList.add("project-complete-btn");
  btn_holder.appendChild(completed_btn);

  projectDiv.appendChild(btn_holder);

  return projectDiv;
}

// DOM function to toggle visibility
function toggleProject(e) {
  let btnDiv = e.target;
  let btnHolderDiv = btnDiv.parentNode;
  let projectDiv = btnHolderDiv.parentNode;
  let searchDivs = projectDiv.children;

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

// New Project form visibility
function createProjectForm() {
  let base = document.querySelector("#content");
  base.classList.add("hidden");

  let createDiv = document.querySelector(".create");
  createDiv.classList.add("hidden");

  let formSection = document.querySelector(".form");
  formSection.classList.remove("hidden");
  formSection.innerHTML = "";

  let formSectionTitle = document.createElement("h2");
  formSectionTitle.innerHTML = "Create a New Project!";
  formSection.appendChild(formSectionTitle);
  formSection.appendChild(createProjectFormDOM());
}

// Edit Project form visibilty
function editProjectForm(e) {
  console.log("the toggle fires");
  let targetProjectId = e.target.dataset.num;
  let targetProjectIndex = findProjectInProjectsArray(targetProjectId);
  let targetProject = shareProjectsArray()[targetProjectIndex];

  let base = document.querySelector("#content");
  let createDiv = document.querySelector(".create");
  let formSection = document.querySelector(".form");
  let formSectionTitle = document.createElement("h2");
  formSectionTitle.innerHTML = "Edit Your Project";

  if (formSection.classList.contains("hidden")) {
    createDiv.classList.add("hidden");
    base.classList.add("hidden");

    formSection.classList.remove("hidden");
    formSection.innerHTML = "";
    formSection.appendChild(formSectionTitle);
    formSection.appendChild(editProjectFormDOM(targetProject));
  }
}

export { toggleProject, createProjectForm, editProjectForm, createProjectDOM };
