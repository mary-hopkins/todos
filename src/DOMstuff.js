
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
    newTodoSubmitBtn.classList.add("newTodosubmit");
    newTodoSubmitBtn.setAttribute("type", "button");
    newTodoSubmitBtn.innerHTML = "Submit";
    formDiv.appendChild(newTodoSubmitBtn);

    let cancelBtn = document.createElement('button');
    cancelBtn.setAttribute("type", "button");
    cancelBtn.classList.add('cancel-btn');
    cancelBtn.innerHTML = "Cancel";
    formDiv.appendChild(cancelBtn);

    return formDiv;
}

// DOM function to create todo
function createTodoDOM(todo) {
    let index = todo.getTodoId();
    
    let todoDiv = document.createElement('div');
    todoDiv.classList.add("todo");

    let todoTitle = document.createElement('h3');
    todoTitle.innerHTML = todo.getTitle();
    todoDiv.appendChild(todoTitle);

    // will delete once project complete
    let idblock = document.createElement('h3');
    idblock.innerHTML = `Todo Id = ${todo.getTodoId()}`;
    todoDiv.appendChild(idblock);

    let due_date = document.createElement('p');
    due_date.innerHTML = `Due: ${todo.getdueDate()}`;
    todoDiv.appendChild(due_date);

    let todoDescription = document.createElement('p');
    todoDescription.classList.add('description');
    todoDescription.classList.add('hidden');
    todoDescription.innerHTML = todo.getDescription();
    todoDiv.appendChild(todoDescription);

    let todoNotes = document.createElement('p');
    todoNotes.classList.add('notes');
    todoNotes.classList.add('hidden');
    todoNotes.innerHTML = todo.getNotes();
    todoDiv.appendChild(todoNotes);

    let todoPriority = document.createElement('p');
    todoPriority.classList.add('priority');
    todoPriority.classList.add('hidden');
    todoPriority.innerHTML = `Priority: ${todo.getPriority()}`;
    todoDiv.appendChild(todoPriority);

    let btn_holder = document.createElement('div');
    btn_holder.classList.add('btn-holder');

    let edit_btn = document.createElement('button');
    edit_btn.innerHTML = 'Edit';
    edit_btn.setAttribute("type", "button");
    edit_btn.classList.add('edit-btn');
    btn_holder.appendChild(edit_btn);

    let delete_btn = document.createElement('button');
    delete_btn.innerHTML = 'Delete';
    delete_btn.setAttribute("type", "button");
    delete_btn.setAttribute("data-num", index);
    delete_btn.classList.add("delete-btn");
    btn_holder.appendChild(delete_btn);

    let mini_btn = document.createElement('button');
    mini_btn.classList.add("minimax");
    mini_btn.setAttribute("type", "button");
    mini_btn.innerHTML = '&#8593';
    btn_holder.appendChild(mini_btn);

    let completed_btn = document.createElement('button');
    completed_btn.innerHTML = todo.getCompletedStatus();
    completed_btn.setAttribute("type", "button");
    completed_btn.setAttribute("data-num", index);
    completed_btn.classList.add('complete-btn');
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

  //on delete remove book
  function attachButtonevents() {
    
    let spanButtons = document.querySelectorAll('.book_span');
    spanButtons.forEach((item) => {
        item.addEventListener('click', function (e) {
            bookArr[e.target.dataset.num].readval = item.textContent == 'yes' ? 'no' : 'yes';
            setLocalstorage();
        })
    })
  }


/////////////////////

export {
    toggleTodo,
    toggleCreateTodoForm,
    createTodoDOM
}
