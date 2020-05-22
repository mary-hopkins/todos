import {
  toggleTodo,
  CreateTodoForm,
  EditTodoForm,
  notAPageReset,
} from "./DOMtodo.js";

import {
  toggleProject,
  createProjectForm,
  editProjectForm,
} from "./DOMproject.js";

import {
  submitNewProject,
  deleteProject,
  toggleCompleteProject,
  editProject,
} from "./ProjectsArray.js";

import {
  submitNewTodo,
  deleteTodo,
  toggleCompleteTodo,
  editTodo,
} from "./TodosArray.js";
import { tabSwitchBoard } from "./index.js";

////////////////////////// FOR TODOS ////////////////////////////////
function addTodoEventListeners() {
  // maxi/mini view toggle
  let maxi_btns = document.querySelectorAll(".minimax");
  for (let j = 0; j < maxi_btns.length; j++) {
    let current_btn = maxi_btns[j];
    current_btn.addEventListener("click", toggleTodo, false);
  }

  // Delete btns
  let delete_btns = document.querySelectorAll(".delete-btn");
  for (let j = 0; j < delete_btns.length; j++) {
    let current_btn = delete_btns[j];
    current_btn.addEventListener("click", deleteTodo, false);
  }

  // Complete btns
  let complete_btns = document.querySelectorAll(".complete-btn");
  for (let j = 0; j < complete_btns.length; j++) {
    let current_btn = complete_btns[j];
    current_btn.addEventListener("click", toggleCompleteTodo, false);
  }

  // Edit btns
  let edit_btns = document.querySelectorAll(".edit-btn");
  for (let j = 0; j < edit_btns.length; j++) {
    let current_btn = edit_btns[j];
    current_btn.addEventListener(
      "click",
      function (e) {
        EditTodoForm(e);
        addEditTodoFormEventListeners();
      },
      false
    );
  }
}
function addNewTodoFormEventListeners() {
  // New form submit btns
  let todoCreateNewSubmitBtn = document.querySelector(".newTodosubmit");
  todoCreateNewSubmitBtn.addEventListener(
    "click",
    function () {
      if (submitNewTodo()) {
        notAPageReset();
        tabSwitchBoard("persist");
      }
    },
    false
  );

  // Cancel new/edit form btn
  let cancelBtn = document.querySelector(".newTodoCancelBtn");
  cancelBtn.addEventListener(
    "click",
    function () {
      notAPageReset();
      tabSwitchBoard("persist");
    },
    false
  );
}
function addEditTodoFormEventListeners() {
  //Edit form submit btns
  let todoEditSubmitBtn = document.querySelector(".editTodosubmit");
  todoEditSubmitBtn.addEventListener(
    "click",
    function (e) {
      editTodo(e);
      notAPageReset();
    },
    false
  );

  // Cancel edit form btn
  let cancelEditBtn = document.querySelector(".editTodoCancelBtn");
  cancelEditBtn.addEventListener(
    "click",
    function () {
      notAPageReset();
      tabSwitchBoard("persist");
    },
    false
  );
}
////////////////////////// FOR TODOS ////////////////////////////////

///////////////////////// FOR PROJECTS //////////////////////////////
function addProjectEventListeners() {
  // maxi/mini view toggle
  let maxi_btns = document.querySelectorAll(".projectMinimax");
  for (let j = 0; j < maxi_btns.length; j++) {
    let current_btn = maxi_btns[j];
    current_btn.addEventListener("click", toggleProject, false);
  }

  // Delete btns
  let delete_btns = document.querySelectorAll(".project-delete-btn");
  for (let j = 0; j < delete_btns.length; j++) {
    let current_btn = delete_btns[j];
    current_btn.addEventListener("click", deleteProject, false);
  }

  // Complete btns
  let complete_btns = document.querySelectorAll(".project-complete-btn");
  for (let j = 0; j < complete_btns.length; j++) {
    let current_btn = complete_btns[j];
    current_btn.addEventListener("click", toggleCompleteProject, false);
  }

  // Edit btns
  let edit_btns = document.querySelectorAll(".project-edit-btn");

  for (let j = 0; j < edit_btns.length; j++) {
    let current_btn = edit_btns[j];
    current_btn.addEventListener(
      "click",
      function (e) {
        editProjectForm(e);
        addEditProjectFormEventListeners();
      },
      false
    );
  }
}
function addNewProjectFormEventListeners() {
  // New form submit btns
  let todoCreateNewSubmitBtn = document.querySelector(".newProjectsubmit");
  todoCreateNewSubmitBtn.addEventListener(
    "click",
    function () {
      if (submitNewProject()) {
        notAPageReset();
        tabSwitchBoard("persist");
      }
    },
    false
  );

  // Cancel new/edit form btn
  let cancelBtn = document.querySelector(".newProjectCancelBtn");
  cancelBtn.addEventListener(
    "click",
    function () {
      notAPageReset();
      tabSwitchBoard("persist");
    },
    false
  );
}
function addEditProjectFormEventListeners() {
  //Edit form submit btns
  let todoEditSubmitBtn = document.querySelector(".editProjectsubmit");
  todoEditSubmitBtn.addEventListener(
    "click",
    function (e) {
      editProject(e);
      notAPageReset();
      tabSwitchBoard("persist");
    },
    false
  );

  // Cancel edit form btn
  let cancelEditBtn = document.querySelector(".editProjectCancelBtn");
  cancelEditBtn.addEventListener(
    "click",
    function () {
      notAPageReset();
      tabSwitchBoard("persist");
    },
    false
  );
}
///////////////////////// FOR PROJECTS //////////////////////////////

///////////////////////// FOR GENERAL ///////////////////////////////
function addNavigationEventListeners() {
  // projects tab
  let projectsBtn = document.querySelector(".projectslive");
  projectsBtn.addEventListener(
    "click",
    function () {
      tabSwitchBoard("project");
    },
    false
  );

  // home tab
  let homeBtn = document.querySelector(".homepg");
  homeBtn.addEventListener(
    "click",
    function () {
      tabSwitchBoard("home");
    },
    false
  );

  // reveal Todo New form btn
  let todoCreateNewBtn = document.querySelector("#createTodoForm");
  todoCreateNewBtn.addEventListener(
    "click",
    function () {
      CreateTodoForm();
      addNewTodoFormEventListeners();
    },
    false
  );

  // reveal Project New form btn
  let projectCreateNewBtn = document.querySelector("#createProjectForm");
  projectCreateNewBtn.addEventListener(
    "click",
    function () {
      testMe();
      createProjectForm();
      console.log("ran createProjectForm");
      addNewProjectFormEventListeners();
    },
    false
  );
}
function testMe() {
  console.log("Button was clicked");
}
///////////////////////// FOR GENERAL ///////////////////////////////

export {
  addTodoEventListeners,
  addNavigationEventListeners,
  addProjectEventListeners,
};
