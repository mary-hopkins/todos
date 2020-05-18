///// TO DO LIST /////

/// TODAY ///
//// function to delete a Todo from the DOM
//// event listener for complete
//// function to change completeStatus

/// Today ///
//// Edit event listeners
// Add Project dropdown to forms
// edit forms that prepopulate info
// edit function to change attributes and save them
// Populate List --> priority, dueSoon

/////  FUTURE //////
    // Adding Projects.... :(
    // populateList(list) for weird home pg lists
    // 
    // 
// FAR FUTURE
    // projects tab
    // completed tab


/*
*/

import {
    createGeneralListDOM,
    createDueSoonListDOM,
    createHighPriorityListDOM
} from'./DOMHome.js'

import { 
    toggleTodo, 
    toggleCreateTodoForm
} from './DOMstuff.js';

import {
    submitNewTodo,
    deleteTodo,
    toggleCompleteTodo
} from './NonDomStuff.js'

// "title", "description", "dueDate", "priority", "notes", "completeStatus", "todoId"
const base = document.querySelector("#content");
let home_btn = document.querySelector('.homepg');
let contact_btn = document.querySelector('#contact');


function addTodoEventListeners() {
    // maxi/mini view toggle
    let maxi_btns = document.querySelectorAll('.minimax');
    for (var j = 0; j < maxi_btns.length; j++) {
        let current_btn = maxi_btns[j];
        current_btn.addEventListener('click', toggleTodo, false);
    }

    // Delete btns
    let delete_btns = document.querySelectorAll('.delete-btn');
    for (var j = 0; j < delete_btns.length; j++) {
        let current_btn = delete_btns[j];
        current_btn.addEventListener('click', deleteTodo, false);
    }

    // Complete btns
    let complete_btns = document.querySelectorAll('.complete-btn');
    for (var j = 0; j < complete_btns.length; j++) {
        let current_btn = complete_btns[j];
        current_btn.addEventListener('click', toggleCompleteTodo, false);
    }

    // Edit btns
    let edit_btns = document.querySelectorAll('.edit-btn');
    for (var j = 0; j < edit_btns.length; j++) {
        let current_btn = edit_btns[j];
        current_btn.addEventListener('click', testMe, false);
    }

    // reveal form btns
    let todoCreateNewBtn = document.querySelector("#createTodoForm");
    todoCreateNewBtn.addEventListener('click', function(){
        toggleCreateTodoForm();
        addFormEventListeners();
        addTodoEventListeners();
    }, false);
    
    

    
}

function addFormEventListeners() {
    // form submit btns
    let todoCreateNewSubmitBtn = document.querySelector('.newTodosubmit');
    todoCreateNewSubmitBtn.addEventListener('click', function() {
        if (submitNewTodo()) {
        addTodoEventListeners();
        } else  {}
    }, false);

    // Cancel new/edit form btn
    let cancelBtn = document.querySelector('.cancel-btn');
    cancelBtn.addEventListener('click', function() {
        toggleCreateTodoForm();
        addTodoEventListeners();
    }, false);
}

function testMe() {
    console.log('Button was clicked');
}


window.addEventListener('load', () => {
    base.appendChild(createGeneralListDOM());
    //base.appendChild(createDueSoonListDOM());
    //base.appendChild(createHighPriorityListDOM());
    addTodoEventListeners();
    //window.onresize();
});

