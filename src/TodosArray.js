import { tabSwitchBoard } from "./index";

import { findProjectIdFromProjectTitle } from "./ProjectsArray.js";

// array of all todos in local storage
let todosArray = localStorage.getItem("todos")
  ? JSON.parse(localStorage.getItem("todos"))
  : [];

// function to reset local storage after new todo is saved
function setLocalstorage() {
  if (todosArray.length == 0) {
    console.log('she"s empty');
  } else {
    //localStorage.clear();// --> for easily clearing local storage
    localStorage.setItem("todos", JSON.stringify(todosArray));
    return true;
  }
}

// function to find to correct Todo in todosArray by Id
function findTodoInTodosArray(Id) {
  let targetTodoId = Id;
  for (let i = 0; i < todosArray.length; i++) {
    let currentTodo = todosArray[i];
    if (currentTodo.todoId == targetTodoId) {
      return i;
    }
  }
}

// function to edit a todo
function editTodo(e) {
  let targetTodoId = e.target.dataset.num;
  let targetTodoIndex = findTodoInTodosArray(targetTodoId);
  let targetTodo = todosArray[targetTodoIndex];

  if (validateTodoForm) {
    let titleInput = document.querySelector("#title");
    let dueDateInput = document.querySelector("#dueDate");
    let priorityInput = document.querySelector("#priority");
    let descriptionInput = document.querySelector("#description");
    let notesInput = document.querySelector("#notes");
    let projectSelect = document.querySelector("#project");
    let projectIdInput = findProjectIdFromProjectTitle(projectSelect.value);

    targetTodo.title = titleInput.value;
    targetTodo.dueDate = dueDateInput.value;
    targetTodo.description = descriptionInput.value;
    targetTodo.priority = priorityInput.value;
    targetTodo.notes = notesInput.value;
    targetTodo.projectId = projectIdInput;
  }
  setLocalstorage();

  tabSwitchBoard("persist");
}

// function to delete todo from TodosArray
function deleteTodo(e) {
  if (todosArray.length == 1) {
    todosArray = [];
    localStorage.removeItem("todos");
    setLocalstorage();
  } else {
    let targetTodoId = e.target.dataset.num;
    let targetTodo = findTodoInTodosArray(targetTodoId);
    todosArray.splice(targetTodo, 1);
    setLocalstorage();
  }
  tabSwitchBoard("persist");
}

//function to toggle completedStatus
function toggleCompleteTodo(e) {
  let targetTodoId = e.target.dataset.num;
  let targetTodoIndex = findTodoInTodosArray(targetTodoId);
  let targetTodo = todosArray[targetTodoIndex];

  if (targetTodo.completeStatus == "Incomplete") {
    targetTodo.completeStatus = "Complete";
  } else {
    targetTodo.completeStatus = "Incomplete";
  }
  setLocalstorage();
  tabSwitchBoard("persist");
}

// factory function to create todo
const Todo = (
  title,
  description,
  dueDate,
  priority,
  notes,
  completeStatus,
  todoId,
  projectId
) => {
  // functions to return useful shit
  const getTitle = () => title;
  const getdueDate = () => dueDate;
  const getPriority = () => priority;
  const getDescription = () => description;
  const getNotes = () => notes;
  const getCompletedStatus = () => completeStatus;
  const getTodoId = () => todoId;
  const getProjectId = () => projectId;

  return {
    getTitle,
    getdueDate,
    getPriority,
    getDescription,
    getNotes,
    getCompletedStatus,
    getTodoId,
    getProjectId,
  };
};

function populateDueSoon() {
  let dueSoonArray = [];
  let sevenDaysFromNow = new Date();
  sevenDaysFromNow.setDate(sevenDaysFromNow.getDate() + 7);
  for (var i = 0; i < todosArray.length; i++) {
    let currentDueDate = new Date(todosArray[i].dueDate);
    if (currentDueDate <= sevenDaysFromNow) {
      dueSoonArray.push(todosArray[i]);
    }
  }
  return dueSoonArray;
}

function populateHighPriority() {
  let highPriorityArray = [];
  for (var i = 0; i < todosArray.length; i++) {
    let currentPriority = todosArray[i].priority;
    if (currentPriority == 5) {
      highPriorityArray.push(todosArray[i]);
    } else if (currentPriority == 4) {
      highPriorityArray.push(todosArray[i]);
    }
  }
  return highPriorityArray;
}

// function to pull list objects from todosArray
function populateList(list) {
  switch (list) {
    case "general":
      todosArray = localStorage.getItem("todos")
        ? JSON.parse(localStorage.getItem("todos"))
        : [];
      return todosArray;
    case "dueSoon":
      return populateDueSoon();
    case "highPriority":
      return populateHighPriority();
    default:
      console.log("populate List failed out");
  }
}

//Object --> Todo
function objectToTodo(object) {
  var title = object.title;
  var description = object.description;
  var dueDate = object.dueDate;
  var priority = object.priority;
  var notes = object.notes;
  var completeStatus = object.completeStatus;
  var todoId = object.todoId;
  var projectId = object.projectId;

  var objToTodo = Todo(
    title,
    description,
    dueDate,
    priority,
    notes,
    completeStatus,
    todoId,
    projectId
  );
  return objToTodo;
}

// Function to validate todo form input
function validateTodoForm() {
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

// Function to handle submit for new todo form
function submitNewTodo() {
  if (validateTodoForm()) {
    let newTodo = pullNewTodoValues();
    todosArray.push(newTodo); // puts object in todosArray
    setLocalstorage();
    return true;
  }
}

// Function to find largest todoId in todosArray and add 1 to it.
function todoIdCounter() {
  let todoIdCounter = 1;
  todosArray = localStorage.getItem("todos")
    ? JSON.parse(localStorage.getItem("todos"))
    : [];
  if (todosArray.length == 0) {
    todoIdCounter = 1;
  } else {
    for (let i = 0; i < todosArray.length; i++) {
      let currentObject = todosArray[i];
      let currentTodoId = currentObject.todoId;
      if (currentTodoId >= todoIdCounter) {
        todoIdCounter = currentTodoId;
        todoIdCounter++;
      }
    }
  }
  return todoIdCounter;
}

// Function to pull new Todo values from form
function pullNewTodoValues() {
  let titleInput = document.querySelector("#title");
  let dueDateInput = document.querySelector("#dueDate");
  let priorityInput = document.querySelector("#priority");
  let descriptionInput = document.querySelector("#description");
  let notesInput = document.querySelector("#notes");
  let projectSelect = document.querySelector("#project");
  let projectIdInput = findProjectIdFromProjectTitle(projectSelect.value);

  let newTodo = {
    title: titleInput.value,
    dueDate: dueDateInput.value,
    priority: priorityInput.value,
    description: descriptionInput.value,
    notes: notesInput.value,
    completeStatus: "Incomplete",
    todoId: todoIdCounter(),
    projectId: projectIdInput,
  };

  return newTodo;
}

export {
  Todo,
  setLocalstorage,
  findTodoInTodosArray,
  objectToTodo,
  submitNewTodo,
  deleteTodo,
  populateList,
  toggleCompleteTodo,
  editTodo,
};
