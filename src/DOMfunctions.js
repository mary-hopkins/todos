
import {listOne} from "./index.js"
import {
  Todo,
  Project,
  List
} from "./ProjectsAndTodos";
import { runAllDisplayEventListeners, addCreateNewEventListeners } from "./eventListeners.js"


// Functions to validate form input
function requiredInputFormFields() {
  let titleInput = document.querySelector("#title");
  let dueDateInput = document.querySelector("#dueDate");
  let priorityInput = document.querySelector("#priority");

  if (titleInput.value == "") {
    alert("Title cannot be blank!");
    return false;
  } else if (dueDateInput.value == "") {
    alert("Please choose a Due Date");
    return false;
  } else if (priorityInput.value == "") {
    alert("Please set a Priority (1-5)");
    return false;
  } else {
    return true;
  }
}
function validateDueDate(todo, project) {
  let todoDueDate = new Date(todo.dueDate);
  let projectDueDate = new Date(project.getDueDate());
  if(todoDueDate > projectDueDate) {
    alert("Your Due Date is past the end of the project.  Please choose a new Due Date");
    return false;
  }
  return true;
}
function pullNewTodoValues(id = 0) {
  let titleInput = document.querySelector("#title");
  let dueDateInput = document.querySelector("#dueDate");
  let priorityInput = document.querySelector("#priority");
  let descriptionInput = document.querySelector("#description");
  let notesInput = document.querySelector("#notes");
  let projectSelect = document.querySelector("#project");
  let projectIdInput = listOne.findProjectIdFromProjectTitle(projectSelect.value);
  if(projectIdInput == undefined){
    projectIdInput = parseInt(projectSelect.innerHTML);
  }
  
  let newTodo = {
    title: titleInput.value,
    dueDate: dueDateInput.value,
    priority: parseInt(priorityInput.value),
    description: descriptionInput.value,
    notes: notesInput.value,
    projectId: parseInt(projectIdInput),
    todoId: id
  };

  return newTodo;
}
function pullProjectValues(id = 1) {
  let titleInput = document.querySelector("#title");
  let dueDateInput = document.querySelector("#dueDate");
  let priorityInput = document.querySelector("#priority");
  let descriptionInput = document.querySelector("#description");
  let notesInput = document.querySelector("#notes");

  let newProject = {
    title: titleInput.value,
    dueDate: dueDateInput.value,
    priority: parseInt(priorityInput.value),
    description: descriptionInput.value,
    notes: notesInput.value,
    projectId: parseInt(id),
  };

  return newProject;
}

// TODO CRUD
function submitNewTodo() {
  if(requiredInputFormFields()) {
    let newTodo = pullNewTodoValues();
    let targetProjectId = newTodo.projectId;
    let targetProject = listOne.findProjectInProjectsArray(targetProjectId);
    if(validateDueDate(newTodo, targetProject)) {
      targetProject.createTodo(newTodo);
      listOne.setLocalStorage();
      return true;
    }
  }
}
function updateTodo(e) {
  let targetProjectId = parseInt(e.target.dataset.project);
  let targetTodoId = parseInt(e.target.dataset.todo);

  let targetProject = listOne.findProjectInProjectsArray(targetProjectId);
  let targetTodo = targetProject.findTodoInTodosArray(targetTodoId);

  if (requiredInputFormFields() && validateDueDate(targetTodo, targetProject)) {
    let updatedTodo = pullNewTodoValues(targetTodoId);
    targetProject.editTodo(updatedTodo);
    listOne.setLocalStorage();
    return true;
  }
  
}
function deleteTodo(e) {
  let targetProjectId = parseInt(e.target.dataset.project);
  let targetTodoId = parseInt(e.target.dataset.todo);
  let targetProject = listOne.findProjectInProjectsArray(targetProjectId);
  
  targetProject.deleteTodo(targetTodoId);
  listOne.setLocalStorage();
}
function toggleCompleteTodo(e) {
  console.log(`toggle fired`);
  let targetProjectId = parseInt(e.target.dataset.project);
  let targetTodoId = parseInt(e.target.dataset.todo);
  let project = listOne.findProjectInProjectsArray(targetProjectId);
  let todo = project.findTodoInTodosArray(targetTodoId);
  let todoCompleteStatus = todo.getCompleteStatus();
  console.log(`1 todoCompleteStatus: ${todoCompleteStatus}`);
  if(todoCompleteStatus) {
    todo.updateTodoCompleteStatus(false);
  } else {todo.updateTodoCompleteStatus(true)}
  listOne.setLocalStorage();
}

// PROJECTS CRUD
function submitNewProject() {
  if(requiredInputFormFields()) {
    let newProject = pullProjectValues();
    listOne.createProject(newProject);
    listOne.setLocalStorage();
    return true;
  }
}
function updateProject(e) {
  let projectId = parseInt(e.target.dataset.project);
  if(requiredInputFormFields()) {
    let updatedProject = pullProjectValues(projectId);
    listOne.editProject(updatedProject);
    listOne.setLocalStorage();
    return true;
  }
}
function deleteProject(e) {
  let targetProjectId = parseInt(e.target.dataset.project);
  listOne.deleteProject(targetProjectId);
  listOne.setLocalStorage();
}
function toggleCompleteProject(e) {
  let targetProjectId = parseInt(e.target.dataset.project);
  let project = listOne.findProjectInProjectsArray(targetProjectId);
  
  let projectCompleteStatus = project.getCompleteStatus();
  if(projectCompleteStatus) {
    project.updateProjectCompleteStatus(false);
  } else {project.updateProjectCompleteStatus(true)}
  listOne.setLocalStorage();
}

// Todo Forms
function getProjectOptions() {
  let titlesArray = [];
  let projectsArray = listOne.getProjectsArray();
  for (var i = 0; i < projectsArray.length; i++) {
    let currentProject = projectsArray[i];
    let newTitle = currentProject.getTitle();
    titlesArray.push(newTitle);
  }
  return titlesArray;
}
function createTodoForm() {
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
  let titlesArray = getProjectOptions();
  for(let p = 0; p < titlesArray.length; p ++) {
    let currentProject = titlesArray[p];
    let optionBlock = document.createElement("option");
    optionBlock.setAttribute("value", `${currentProject}`);
    optionBlock.innerHTML = `${currentProject}`;
    projectInput.appendChild(optionBlock);
  }

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
function editTodoForm(todo) {
  let targetProjectId = todo.getProjectId();
  let targetTodo = todo;
  
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
  titleInput.value = `${targetTodo.getTitle()}`;
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
  dueDateInput.value = `${targetTodo.getDueDate()}`;
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
  descriptionInput.value = `${targetTodo.getDescription()}`;
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
  notesInput.value = `${targetTodo.getNotes()}`;
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
  priorityInput.value = `${targetTodo.getPriority()}`;
  formDiv.appendChild(priorityInput);
  formDiv.appendChild(document.createElement("br"));
  formDiv.appendChild(document.createElement("br"));

  formDiv.appendChild(document.createElement("br"));
  formDiv.appendChild(document.createElement("br"));
  let projectHidder = document.createElement("div");
  projectHidder.classList.add("hidden");
  projectHidder.setAttribute("id", "project");
  projectHidder.innerHTML = `${targetTodo.getProjectId()}`;
  formDiv.appendChild(projectHidder);

  let newTodoSubmitBtn = document.createElement("button");
  newTodoSubmitBtn.classList.add("editTodosubmit");
  newTodoSubmitBtn.setAttribute("type", "button");
  newTodoSubmitBtn.setAttribute("data-todo", targetTodo.getTodoId());
  newTodoSubmitBtn.setAttribute("data-project", targetProjectId);
  newTodoSubmitBtn.innerHTML = "Submit";
  formDiv.appendChild(newTodoSubmitBtn);

  let cancelBtn = document.createElement("button");
  cancelBtn.setAttribute("type", "button");
  cancelBtn.classList.add("editTodoCancelBtn");
  cancelBtn.innerHTML = "Cancel";
  formDiv.appendChild(cancelBtn);

  return formDiv;
}

// Project Forms
function createProjectForm() {
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
function editProjectForm(project) {
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
  titleInput.value = `${project.getTitle()}`;
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
  dueDateInput.value = `${project.getDueDate()}`;
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
  descriptionInput.value = `${project.getDescription()}`;
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
  notesInput.value = `${project.getNotes()}`;
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
  priorityInput.value = `${project.getPriority()}`;
  formDiv.appendChild(priorityInput);
  formDiv.appendChild(document.createElement("br"));
  formDiv.appendChild(document.createElement("br"));

  let newProjectSubmitBtn = document.createElement("button");
  newProjectSubmitBtn.classList.add("editProjectsubmit");
  newProjectSubmitBtn.setAttribute("type", "button");
  newProjectSubmitBtn.setAttribute("data-project", project.getProjectId());
  newProjectSubmitBtn.innerHTML = "Submit";
  formDiv.appendChild(newProjectSubmitBtn);

  let cancelBtn = document.createElement("button");
  cancelBtn.setAttribute("type", "button");
  cancelBtn.classList.add("editProjectCancelBtn");
  cancelBtn.innerHTML = "Cancel";
  formDiv.appendChild(cancelBtn);

  return formDiv;
}

// Todos and Projects Displays
function getTodosForProject(id) {
  let project = listOne.findProjectInProjectsArray(id);
  let todosArray = project.getTodosArray(); 
  let returnerDiv = document.createElement("div");

  for (var i = 0; i < todosArray.length; i++) {
    let todo = todosArray[i];
    let todoDom = displayTodo(todo);
    returnerDiv.appendChild(todoDom);
  }
  return returnerDiv;
}
function getBackgroundColor(priority) {
  switch (priority) {
    case 1:
      return "#bae1ff";
    case 2:
      return "#baffc9";
    case 3:
      return "#ffffba";
    case 4:
      return "#ffdfba";
    case 5:
      return "ffb3ba";
    default:
      return "white";
  }
}
function displayTodo(todo) {
  let todoId = todo.getTodoId();
  let project = listOne.findProjectInProjectsArray(todo.getProjectId());
  let projectId = project.getProjectId();

  let todoDiv = document.createElement("div");
  todoDiv.classList.add("todo");
  todoDiv.style.backgroundColor = getBackgroundColor(todo.getPriority());

  let todoTitle = document.createElement("h3");
  todoTitle.innerHTML = todo.getTitle();
  todoDiv.appendChild(todoTitle);

  let due_date = document.createElement("p");
  due_date.innerHTML = `Due: ${todo.getDueDate()}`;
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
  todoProject.innerHTML = `Project: ${project.getTitle()}`;

  let btn_holder = document.createElement("div");
  btn_holder.classList.add("btn-holder");

  let edit_btn = document.createElement("button");
  edit_btn.innerHTML = "Edit";
  edit_btn.setAttribute("type", "button");
  edit_btn.setAttribute("data-todo", todoId);
  edit_btn.setAttribute("data-project", projectId);
  edit_btn.classList.add("edit-btn");
  btn_holder.appendChild(edit_btn);

  let delete_btn = document.createElement("button");
  delete_btn.innerHTML = "Delete";
  delete_btn.setAttribute("type", "button");
  delete_btn.setAttribute("data-todo", todoId);
  delete_btn.setAttribute("data-project", projectId);
  delete_btn.classList.add("delete-btn");
  btn_holder.appendChild(delete_btn);

  let mini_btn = document.createElement("button");
  mini_btn.classList.add("minimax");
  mini_btn.setAttribute("type", "button");
  mini_btn.setAttribute("data-todo", todoId);
  mini_btn.setAttribute("data-project", projectId);
  mini_btn.innerHTML = "&#8593";
  btn_holder.appendChild(mini_btn);

  let completed_btn = document.createElement("button");
  if(todo.getCompleteStatus()) {
    completed_btn.innerHTML = "Complete";
  } else {
    completed_btn.innerHTML = "Incomplete"
  }
  completed_btn.setAttribute("type", "button");
  completed_btn.setAttribute("data-todo", todoId);
  completed_btn.setAttribute("data-project", projectId);
  completed_btn.classList.add("complete-btn");
  btn_holder.appendChild(completed_btn);

  todoDiv.appendChild(btn_holder);

  return todoDiv;
}
function displayProject(project) {
  let projectId = project.getProjectId();

  let projectDiv = document.createElement("div");
  projectDiv.classList.add("project");

  let projectTitle = document.createElement("h3");
  projectTitle.innerHTML = project.getTitle();
  projectDiv.appendChild(projectTitle);

  let due_date = document.createElement("p");
  due_date.innerHTML = `Due: ${project.getDueDate()}`;
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
  edit_btn.setAttribute("data-project", projectId);
  edit_btn.classList.add("project-edit-btn");
  btn_holder.appendChild(edit_btn);

  let delete_btn = document.createElement("button");
  delete_btn.innerHTML = "Delete";
  delete_btn.setAttribute("type", "button");
  delete_btn.setAttribute("data-project", projectId);
  delete_btn.classList.add("project-delete-btn");
  btn_holder.appendChild(delete_btn);

  let mini_btn = document.createElement("button");
  mini_btn.classList.add("projectMinimax");
  mini_btn.setAttribute("type", "button");
  mini_btn.setAttribute("data-project", projectId);
  mini_btn.innerHTML = "&#8593";
  btn_holder.appendChild(mini_btn);

  let completed_btn = document.createElement("button");
  if(project.getCompleteStatus()) {
    completed_btn.innerHTML = "Complete";
  } else {
    completed_btn.innerHTML = "Incomplete";
  }
  completed_btn.setAttribute("type", "button");
  completed_btn.setAttribute("data-project", projectId);
  completed_btn.classList.add("project-complete-btn");
  btn_holder.appendChild(completed_btn);

  projectDiv.appendChild(btn_holder);

  return projectDiv;
}

// Todo Visibilty Toggles
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
function displayNewTodoForm() {
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

  formSection.appendChild(createTodoForm());
}
function displayEditTodoForm(e) {
  let todoId = parseInt(e.target.dataset.todo);
  let projectId = parseInt(e.target.dataset.project);

  let project = listOne.findProjectInProjectsArray(projectId);
  let todo = project.findTodoInTodosArray(todoId);
  
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

  formSection.appendChild(editTodoForm(todo));
}

// Project Visiblity Toggles
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
function displayNewProjectForm() {
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
  formSection.appendChild(createProjectForm());
}
function displayEditProjectForm(e) {
  let projectId = parseInt(e.target.dataset.project);
  let project = listOne.findProjectInProjectsArray(projectId);


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
    formSection.appendChild(editProjectForm(project));
  }
}

// Utility
function notAPageReset() {
  let base = document.querySelector("#content");
  let createDiv = document.querySelector(".create");
  let formSection = document.querySelector(".form");

  createDiv.classList.remove("hidden");
  formSection.classList.add("hidden");
  base.classList.remove("hidden");
  formSection.innerHTML = "";
}



//////////////////////////////////////////////////////////////////////
export {
  submitNewTodo,
  updateTodo,
  deleteTodo,
  
  submitNewProject,
  updateProject,
  deleteProject,

  displayTodo,
  displayProject,

  toggleTodo,
  toggleProject,
  toggleCompleteTodo,
  toggleCompleteProject,

  displayNewTodoForm,
  displayEditTodoForm,
  displayNewProjectForm,
  displayEditProjectForm,
  
  notAPageReset,
};