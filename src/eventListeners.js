
import { tabSwitchBoard } from "./index.js";

import {
displayNewProjectForm,
displayNewTodoForm,
displayEditTodoForm,
displayEditProjectForm,
toggleTodo,
toggleProject,
deleteTodo,
deleteProject,
toggleCompleteTodo,
toggleCompleteProject,
submitNewTodo,
submitNewProject,
updateTodo,
updateProject
} from "./DOMfunctions.js"


// Site-Wide event listeners
function addNavigationEventListeners() {
  let projectsBtn = document.querySelector(".projectslive");
  projectsBtn.addEventListener("click",
    function () {
      tabSwitchBoard("project");
    }, false);

  let homeBtn = document.querySelector(".homepg");
  homeBtn.addEventListener("click",
    function () {
      tabSwitchBoard("home");
    }, false);
}
function testMe() {
  console.log("Button was clicked");
}
function addCreateNewEventListeners() {
  let todoCreateNewBtn = document.querySelector("#createTodoForm");
  todoCreateNewBtn.addEventListener("click",
    function () {
      displayNewTodoForm();
      addNewTodoFormEventListeners();
    },false);

  let projectCreateNewBtn = document.querySelector("#createProjectForm");
  projectCreateNewBtn.addEventListener("click",
    function () {
      displayNewProjectForm();
      addNewProjectFormEventListeners();
    },false);
}

// Display Event Listeners
function addMinMaxEventListeners() {
  let maxi_btns = document.querySelectorAll(".minimax");
  for (let j = 0; j < maxi_btns.length; j++) {
    let current_btn = maxi_btns[j];
    current_btn.addEventListener("click", 
    function(e) {
      toggleTodo(e)
    }, false);
  }
  let proj_maxi_btns = document.querySelectorAll(".projectMinimax");
  for (let j = 0; j < proj_maxi_btns.length; j++) {
    let current_btn = proj_maxi_btns[j];
    current_btn.addEventListener("click", 
    function(e) {
      toggleProject(e)
    }, false);
  }
}
function addDeleteEventListeners() {
  let delete_btns = document.querySelectorAll(".delete-btn");
  for (let j = 0; j < delete_btns.length; j++) {
    let current_btn = delete_btns[j];
    current_btn.addEventListener("click", 
    function(e) {
      deleteTodo(e);
      tabSwitchBoard("persist");
    }, false);
  }
  let proj_delete_btns = document.querySelectorAll(".project-delete-btn");
  for (let j = 0; j < proj_delete_btns.length; j++) {
    let current_btn = proj_delete_btns[j];
    current_btn.addEventListener("click", 
      function(e) {
        deleteProject(e);
        tabSwitchBoard("persist");
      }, false);
  }
}
function addCompleteEventListeners() {
  let complete_btns = document.querySelectorAll(".complete-btn");
  for (let j = 0; j < complete_btns.length; j++) {
    let current_btn = complete_btns[j];
    current_btn.addEventListener("click", 
    function(e) {
      toggleCompleteTodo(e);
      tabSwitchBoard("persist");
    }, false);
  }
  let proj_complete_btns = document.querySelectorAll(".project-complete-btn");
  for (let j = 0; j < proj_complete_btns.length; j++) {
    let current_btn = proj_complete_btns[j];
    current_btn.addEventListener("click", 
      function(e) {
        toggleCompleteProject(e);
        tabSwitchBoard("persist");
      }, false);
  }
}
function addEditEventListeners() {
  let edit_btns = document.querySelectorAll(".edit-btn");
  for (let j = 0; j < edit_btns.length; j++) {
    let current_btn = edit_btns[j];
    current_btn.addEventListener("click",
      function (e) {
        displayEditTodoForm(e);
        addEditTodoFormEventListeners();
      }, false);
  }

  let proj_edit_btns = document.querySelectorAll(".project-edit-btn");
  for (let j = 0; j < proj_edit_btns.length; j++) {
    let current_btn = proj_edit_btns[j];
    current_btn.addEventListener("click",
      function (e) {
        displayEditProjectForm(e);
        addEditProjectFormEventListeners();
      }, false);
  }
}
function runAllDisplayEventListeners() {
  addMinMaxEventListeners();
  addDeleteEventListeners();
  addCompleteEventListeners();
  addEditEventListeners();

  preventDefault();
}
// Form Event Listeners
function addNewTodoFormEventListeners () {
  let todoCreateNewSubmitBtn = document.querySelector(".newTodosubmit");
  todoCreateNewSubmitBtn.addEventListener("click",
    function () {
      if (submitNewTodo()) {
        tabSwitchBoard("persist");
      }
    },false);
  let cancelBtn = document.querySelector(".newTodoCancelBtn");
  cancelBtn.addEventListener("click",
    function () {
      tabSwitchBoard("persist");
    },false);
}
function addNewProjectFormEventListeners() {
  let todoCreateNewSubmitBtn = document.querySelector(".newProjectsubmit");
  todoCreateNewSubmitBtn.addEventListener("click",
    function () {
      if (submitNewProject()) {
        tabSwitchBoard("persist");
      }
    },false);
  let cancelBtn = document.querySelector(".newProjectCancelBtn");
  cancelBtn.addEventListener("click",
    function () {
      tabSwitchBoard("persist");
    },false);
}

function addEditTodoFormEventListeners() {
  let todoEditSubmitBtn = document.querySelector(".editTodosubmit");
  todoEditSubmitBtn.addEventListener("click",
    function (e) {
      if(updateTodo(e)){
      tabSwitchBoard("persist");
      }
    },false);
  let cancelEditBtn = document.querySelector(".editTodoCancelBtn");
  cancelEditBtn.addEventListener("click",
    function () {
      tabSwitchBoard("persist");
    },false);
}
function addEditProjectFormEventListeners() {
  let todoEditSubmitBtn = document.querySelector(".editProjectsubmit");
  todoEditSubmitBtn.addEventListener("click",
    function (e) {
      if(updateProject(e)){
      tabSwitchBoard("persist");
      }
    },false);
  let cancelEditBtn = document.querySelector(".editProjectCancelBtn");
  cancelEditBtn.addEventListener("click",
    function () {
      tabSwitchBoard("persist");
    }, false);
}


export {
  addNavigationEventListeners,
  testMe,
  addCreateNewEventListeners,
  runAllDisplayEventListeners,
};
