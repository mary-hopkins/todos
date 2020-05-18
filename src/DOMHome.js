import {
    createTodoDOM
} from './DOMstuff.js'

import {
    setLocalstorage,
    objectToTodo,
    populateList,
    populateProject
} from './NonDomStuff.js'


let todosArray = (localStorage.getItem('todos') ? JSON.parse(localStorage.getItem('todos')) : []);

// DOM HOME function to create DueSoonList
function createDueSoonListDOM() {
    let dueSoon = document.createElement('div');
    dueSoon.classList.add('duesoon');
    dueSoon.classList.add('section');

    let dueSoonTitle = document.createElement('h2');
    dueSoonTitle.innerHTML = "ToDos Due in the next 7 days";

    dueSoonTodos = populateList(dueSoonList);
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
}

// DOM HOME function to create aside 
function createGeneralListDOM() {

    let aside = document.createElement('aside');
    aside.classList.add("generalProject");
    
    let projectTitle = document.createElement('h2');
    projectTitle.innerHTML = "General Todos";
    aside.appendChild(projectTitle);

    setLocalstorage();
    
    todosArray = (localStorage.getItem('todos') ? JSON.parse(localStorage.getItem('todos')) : []);
    let asideTodos = populateList(general); // will go thru project switchboard oneday
    
    for (let i = 0; i < asideTodos.length; i++) {
        let currentObject = asideTodos[i];
        let currentTodo = objectToTodo(currentObject);   
        let todo = createTodoDOM(currentTodo); 
        aside.appendChild(todo);
    }
    return aside;
}



export {
    createGeneralListDOM,
    createDueSoonListDOM,
    createHighPriorityListDOM
}