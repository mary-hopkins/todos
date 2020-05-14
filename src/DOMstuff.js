// import from NON DOM scripts 
    // populateProject(project) to load all todos from project
    // populateList(list) for weird home pg lists
    // local storage stuff
    // pull info function ---> send to Todo
// 
// create edit forms that autofill with info
//
/*
*/

// DOM function to create Todo form
function createTodoFormDOM() {
    
    let formDiv = document.createElement('div');
    formDiv.classList.add('formDiv');

    let titleLabel = document.createElement('label');
    titleLabel.setAttribute("for", "title");
    titleLabel.innerHTML = "Title:";
    formDiv.appendChild(titleLabel);
    formDiv.appendChild(document.createElement('br'));

    let titleInput = document.createElement('input');
    titleInput.setAttribute("id", "title");
    titleInput.setAttribute("type", "text");
    titleInput.setAttribute("maxlength", "50");
    titleInput.setAttribute("required", "");
    formDiv.appendChild(titleInput);
    formDiv.appendChild(document.createElement('br'));
    formDiv.appendChild(document.createElement('br'));

    let dueDateLabel = document.createElement('label');
    dueDateLabel.setAttribute("for", "dueDate");
    dueDateLabel.innerHTML = "Due Date:";
    formDiv.appendChild(dueDateLabel);
    formDiv.appendChild(document.createElement('br'));

    let dueDateInput = document.createElement('input');
    dueDateInput.setAttribute("id", "dueDate");
    dueDateInput.setAttribute("type", "date");
    dueDateInput.setAttribute("required", "");
    formDiv.appendChild(dueDateInput);
    formDiv.appendChild(document.createElement('br'));
    formDiv.appendChild(document.createElement('br'));

    let descriptionLabel = document.createElement('label');
    descriptionLabel.setAttribute("for", "description");
    descriptionLabel.innerHTML = "Description:";
    formDiv.appendChild(descriptionLabel);
    formDiv.appendChild(document.createElement('br'));

    let descriptionInput = document.createElement('textarea');
    descriptionInput.setAttribute("id", "description");
    descriptionInput.setAttribute("name", "description");
    //descriptionInput.setAttribute("required", "");
    descriptionInput.setAttribute("rows", "4");
    descriptionInput.setAttribute("cols", "50");
    descriptionInput.setAttribute("maxlength", "140");
    formDiv.appendChild(descriptionInput);
    formDiv.appendChild(document.createElement('br'));
    formDiv.appendChild(document.createElement('br'));

    let notesLabel = document.createElement('label');
    notesLabel.setAttribute("for", "notes");
    notesLabel.innerHTML = "Notes:";
    formDiv.appendChild(notesLabel);
    formDiv.appendChild(document.createElement('br'));

    let notesInput = document.createElement('textarea');
    notesInput.setAttribute("id", "notes");
    notesInput.setAttribute("name", "notes");
    //notesInput.setAttribute("required", "");
    notesInput.setAttribute("rows", "4");
    notesInput.setAttribute("cols", "50");
    notesInput.setAttribute("maxlength", "140");
    formDiv.appendChild(notesInput);
    formDiv.appendChild(document.createElement('br'));
    formDiv.appendChild(document.createElement('br'));

    let priorityLabel = document.createElement('label');
    priorityLabel.setAttribute("for", "priority");
    priorityLabel.innerHTML = "Priority:";
    formDiv.appendChild(priorityLabel);
    formDiv.appendChild(document.createElement('br'));

    let priorityInput = document.createElement('input');
    priorityInput.setAttribute("id", "priority");
    priorityInput.setAttribute("type", "number");
    priorityInput.setAttribute("max", "5");
    priorityInput.setAttribute("min", "1");
    priorityInput.setAttribute("required", "");
    formDiv.appendChild(priorityInput);
    formDiv.appendChild(document.createElement('br'));
    formDiv.appendChild(document.createElement('br'));

    let newTodoSubmitBtn = document.createElement('button');
    newTodoSubmitBtn.setAttribute("id", "newTodosubmit");
    newTodoSubmitBtn.setAttribute("type", "button");
    newTodoSubmitBtn.innerHTML = "Submit";
    formDiv.appendChild(newTodoSubmitBtn);

    return formDiv;
}

// DOM function to create todo
function createTodoDOM(todo) {
    let todoDiv = document.createElement('div');
    todoDiv.classList.add("todo");

    let projectTitle = document.createElement('h3');
    projectTitle.innerHTML = todo.getTitle();
    todoDiv.appendChild(projectTitle);

    let due_date = document.createElement('p');
    due_date.innerHTML = `Due: ${todo.getdueDate()}`;
    todoDiv.appendChild(due_date);

    let projectDescription = document.createElement('p');
    projectDescription.classList.add('description');
    projectDescription.classList.add('hidden');
    projectDescription.innerHTML = todo.getDescription();
    todoDiv.appendChild(projectDescription);

    let projectNotes = document.createElement('p');
    projectNotes.classList.add('notes');
    projectNotes.classList.add('hidden');
    projectNotes.innerHTML = todo.getNotes();
    todoDiv.appendChild(projectNotes);

    let projectPriority = document.createElement('p');
    projectPriority.classList.add('priority');
    projectPriority.classList.add('hidden');
    projectPriority.innerHTML = `Priority: ${todo.getPriority()}`;
    todoDiv.appendChild(projectPriority);

    let btn_holder = document.createElement('div');
    btn_holder.classList.add('btn-holder');

    let edit_btn = document.createElement('button');
    edit_btn.innerHTML = 'Edit';
    edit_btn.setAttribute("type", "button");
    btn_holder.appendChild(edit_btn);

    let delete_btn = document.createElement('button');
    delete_btn.innerHTML = 'Delete';
    delete_btn.setAttribute("type", "button");
    btn_holder.appendChild(delete_btn);

    let mini_btn = document.createElement('button');
    mini_btn.classList.add("minimax");
    mini_btn.setAttribute("type", "button");
    mini_btn.innerHTML = '&#8593';
    btn_holder.appendChild(mini_btn);

    todoDiv.appendChild(btn_holder);


    return todoDiv;
}

// DOM HOME function to create aside 
function createDefaultProjectDOM() {
    
    let aside = document.createElement('aside');
    aside.classList.add("defaultProject");
    
    let projectTitle = document.createElement('h2');
    projectTitle.innerHTML = "Default Project";
    aside.appendChild(projectTitle);
    // will return an array of todo objects
    asideTodos = populateProject(defaultList);
    for (let i = 0; i < asideTodos.length; i++) {
        let todo = createTodoDOM(aside[i], i);
        aside.appendChild(todo);
    }
    return aside;
}
// DOM function to validate form input
function validateTodoForm() {
    let titleInput = document.querySelector('#title');
    let dueDateInput = document.querySelector('#dueDate');
    let priorityInput = document.querySelector('#priority');
    
    if (titleInput.value == "") {
        console.log("Title cannot be blank!");
        return false;
    } else if (dueDateInput.value == "") {
        console.log("Please choose a Due Date");
        return false;
    } else if (priorityInput.value == "") {
        console.log('Please set a Priority (1-5)');
        return false;
    } else {
        return true;
    }
}

// Function to handle submit for new todo form
function submitNewTodo() {
    if (validateTodoForm()) {
        let newTodo = pullNewTodoValues();
        let aside = document.querySelector('aside'); // will go away
        let newTodoDOM = createTodoDOM(newTodo); // will go away
        aside.appendChild(newTodoDOM); // will go away
        toggleCreateTodoForm();
        //saveNewTodo(newTodo); --> local storage
        // reset page to reload from local storage
        return true;
    } else {
        return false;
    }
}

// Function to pull new Todo values from form
function pullNewTodoValues() {
    let titleInput = document.querySelector('#title');
    let dueDateInput = document.querySelector('#dueDate');
    let priorityInput = document.querySelector('#priority');
    let descriptionInput = document.querySelector('#description');
    let notesInput = document.querySelector('#notes');
    
    title = titleInput.value;
    dueDate = dueDateInput.value;
    priority = priorityInput.value;
    description = descriptionInput.value;
    notes = notesInput.value;

    let newTodo = Todo(title, description, dueDate, priority, notes);
    return newTodo;
}

// DOM HOME function to create DueSoonList
function createDueSoonListDOM() {

}
// DOM HOME function to create highpriorityList
function createHighPriorityListDOM() {
}

// DOM function to toggle visibility
function toggleTodo(e) {
    let btnDiv = e.target;
    let btnHolderDiv = btnDiv.parentNode;
    let todoDiv = btnHolderDiv.parentNode;
    let searchDivs = todoDiv.children;
    
    for (var i = 0; i < searchDivs.length; i++) {
        var currentElement = searchDivs[i];
        if (currentElement.classList.contains('hidden')) {
            currentElement.classList.remove('hidden');
            currentElement.classList.add('hiddable');
            
        } else if (currentElement.classList.contains('hiddable')) {
            currentElement.classList.remove("hiddable");
            currentElement.classList.add("hidden");
            
        } else {}
    }
}

// DOM function to toggle form visibility
function toggleCreateTodoForm() {
    let createDiv = document.querySelector(".create");
    let formSection = document.querySelector(".form");
    let formSectionTitle = document.createElement("h2");
    formSectionTitle.innerHTML = "Create a New Todo!"

    if (formSection.classList.contains("hidden")) {
        createDiv.classList.add("hidden");
        formSection.classList.remove("hidden");
        formSection.appendChild(createTodoFormDOM());
    } else {
        createDiv.classList.remove("hidden");
        formSection.classList.add("hidden");
        formSection.innerHTML = "";
        formSection.appendChild(formSectionTitle);
    }
}

// factory function to create todo
const Todo = (title, description, dueDate, priority, notes) => {
    
    // functions to return useful shit
    const getTitle = () => title;
    const getdueDate = () => dueDate;
    const getPriority = () => priority;
    const getDescription = () => description;
    const getNotes = () => notes;


    // Functions to change the shit
    const setTitle = string => {
        title = string;
    }
    const setdueDate = date => {
        dueDate = date;
    }
    const setDescription = string => {
        description = string;
    }
    const setPriority = number => {
        priority = number;
    }
    const setNotes = string => {
        notes = string;
    }

    return { getTitle, getdueDate, getPriority, getDescription, getNotes, setTitle, setdueDate, setDescription, setPriority, setNotes }

}

export {
    Todo,
    createTodoDOM,
    toggleTodo,
    toggleCreateTodoForm,
    submitNewTodo
}
