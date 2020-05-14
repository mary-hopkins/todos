
import {
    Todo, 
    createTodoDOM, 
    toggleTodo, 
    toggleCreateTodoForm, 
    submitNewTodo
} from './DOMstuff';


const base = document.querySelector("#content");
const formCell = document.querySelector(".form");
let home_btn = document.querySelector('.homepg');
let contact_btn = document.querySelector('#contact');


// should return completed 
function createTest() {
    console.log('made it to createTest');
    base.innerHTML = '';
    console.log('cleared base');
    let todoitt = Todo("Pick a color", "a not so brief description on the todo", "1/30/20", "3", "do not pick green");
    console.log(todoitt.getTitle());
    console.log(todoitt.setTitle("a new title"));
    console.log(todoitt.getTitle());
    base.appendChild(createTodoDOM(todoitt));
    console.log('appended the thing');
}

function createContact() {
    base.innerHTML = '';
    base.appendChild(loadContact());
}

function addEventListeners() {
    // maxi/mini view toggle
    let maxi_btns = document.querySelectorAll('.minimax');
    for (var j = 0; j < maxi_btns.length; j++) {
        let current_btn = maxi_btns[j];
        current_btn.addEventListener('click', toggleTodo, false);
    }
    // reveal form btns
    let todoCreateNewBtn = document.querySelector("#createTodoForm");
    todoCreateNewBtn.addEventListener('click', function(){
        toggleCreateTodoForm();
        addEventListeners();
    }, false);
    
    // form submit btns
    let todoCreateNewSubmitBtn = document.querySelector('#newTodosubmit');
    todoCreateNewSubmitBtn.addEventListener('click', function() {
        if (submitNewTodo()) {
        addEventListeners();
        console.log('Event listener sould be there');
        } else  {}
    }, false);
    // home btn to reload
    // projects tab
    // completed tab
}



addEventListeners();
