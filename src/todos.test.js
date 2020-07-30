const functions = require('./ProjectsAndTodos.js');



test('Lists can be created', () => {
    let listOne = functions.List();
    expect(listOne.getProjectsArray()).toBeDefined();
});
test('Lists can create Projects', () => {
    let listOne = functions.List();
    let futureProject = {
        title: "Plan Marcy's Wedding",
        description: "Summer wedding of Marcy and George",
        dueDate: "2020-08-06",
        priority: 3,
        notes: "They both love the beach"
    }
    let projectOne = listOne.createProject(futureProject);
    expect(projectOne.getTitle()).toBe("Plan Marcy's Wedding");
    expect(projectOne.getDescription()).toBe("Summer wedding of Marcy and George");
    expect(projectOne.getDueDate()).toBe("2020-08-06");
    expect(projectOne.getPriority()).toBe(3);
    expect(projectOne.getNotes()).toBe("They both love the beach");
    expect(projectOne.getCompleteStatus()).toBe(false);
    expect(projectOne.getProjectId()).toBe(1);
});
test('Lists can edit Projects', () => {
    let listOne = functions.List();
    let futureProject = {
        title: "Plan Marcy's Wedding",
        description: "Summer wedding of Marcy and George",
        dueDate: "2020-08-06",
        priority: 3,
        notes: "They both love the beach"
    }
    let projectOne = listOne.createProject(futureProject);
    let updatedProject = {
        title: "Cancel Marcy's Wedding",
        description: "Return everything and get deposits back",
        dueDate: "2020-08-05",
        priority: 5,
        notes: "Will need lighter fluid",
        completeStatus: true,
        projectId: 1
    }
    listOne.editProject(updatedProject)
    expect(projectOne.getTitle()).toBe("Cancel Marcy's Wedding");
    expect(projectOne.getDescription()).toBe("Return everything and get deposits back");
    expect(projectOne.getDueDate()).toBe("2020-08-05");
    expect(projectOne.getPriority()).toBe(5);
    expect(projectOne.getNotes()).toBe("Will need lighter fluid");
    expect(projectOne.getCompleteStatus()).toBe(true);
    expect(projectOne.getProjectId()).toBe(1);
});
test('Lists can delete Projects', () => {
    let objectOne = {
        title: "Plan Marcy's Wedding",
        description: "Summer wedding of Marcy and George",
        dueDate: "2020-08-06",
        priority: 3,
        notes: "They both love the beach",
        completeStatus: false,
    }
    let objectTwo = {
        title: "Plan Fitness Month",
        description: "August 2020 with Whole30 and HIIT exercise",
        dueDate: "2020-07-31",
        priority: 3,
        notes: "Talk to the Dr. about health concerns",
        completeStatus: false,
    }
    let objectThree = {
        title: "Set up Rachel's Birthday Party",
        description: "Remy's Patissari at 10:00 AM",
        dueDate: "2020-08-04",
        priority: 3,
        notes: "bring candles for the cake",
        completeStatus: false,
    }
    let listOne = functions.List();
    let projectOne = listOne.createProject(objectOne);
    let projectTwo = listOne.createProject(objectTwo);
    let projectThree = listOne.createProject(objectThree);
    
    let ogProjectsArray = listOne.getProjectsArray();
    let ogLength = Object.keys(ogProjectsArray).length;

    listOne.deleteProject(2);

    let newProjectsArray = listOne.getProjectsArray();
    let newLength = Object.keys(newProjectsArray).length;
    expect(ogLength).toBe(3);
    expect(newLength).toBe(2);
});

test('Projects can create Todos', () => {
    let listOne = functions.List();
    let futureProject = {
        title: "Plan Marcy's Wedding",
        description: "Summer wedding of Marcy and George",
        dueDate: "2020-08-06",
        priority: 3,
        notes: "They both love the beach"
    }
    let projectOne = listOne.createProject(futureProject);

    let todoObject = {
        title: "Look for Dress",
        description: "Dress for Wedding",
        dueDate: "2020-08-06",
        priority: 3,
        notes: "Not a white dress",
        completeStatus: false,
        todoId: 1,
        projectId: 1

    };
    let todoOne = projectOne.createTodo(todoObject);
    expect(todoOne.getTitle()).toBe("Look for Dress");
    expect(todoOne.getDescription()).toBe("Dress for Wedding");
    expect(todoOne.getDueDate()).toBe("2020-08-06");
    expect(todoOne.getPriority()).toBe(3);
    expect(todoOne.getNotes()).toBe("Not a white dress");
    expect(todoOne.getCompleteStatus()).toBe(false);
    expect(todoOne.getTodoId()).toBe(1);
    expect(todoOne.getProjectId()).toBe(1);
});

test('Todo ids are unique', () => {
    let objectOne = {
        title: "Look for Dress",
        description: "Dress for Wedding",
        dueDate: "2020-08-06",
        priority: 3,
        notes: "Not a white dress",
        completeStatus: false,
    }
    let objectTwo = {
        title: "Pick Up Flowers",
        description: "Moe's Arrangments at 9:00 AM",
        dueDate: "2020-08-04",
        priority: 3,
        notes: "Get watering instructions",
        completeStatus: false,
    }
    let objectThree = {
        title: "Get Cake",
        description: "Remy's Patissari at 10:00 AM",
        dueDate: "2020-08-04",
        priority: 3,
        notes: "Clean out room in the fridge",
        completeStatus: false,
    }

    let listOne = functions.List();
    let futureProject = {
        title: "Plan Marcy's Wedding",
        description: "Summer wedding of Marcy and George",
        dueDate: "2020-08-06",
        priority: 3,
        notes: "They both love the beach"
    }
    let projectOne = listOne.createProject(futureProject);
    let todoOne = projectOne.createTodo(objectOne);
    let todoTwo = projectOne.createTodo(objectTwo);
    let todoThree = projectOne.createTodo(objectThree);
    expect(todoOne.getTodoId()).toBe(1);
    expect(todoTwo.getTodoId()).toBe(2);
    expect(todoThree.getTodoId()).toBe(3);
});

test('Projects can edit Todos', () => {
    let listOne = functions.List();
    let futureProject = {
        title: "Plan Marcy's Wedding",
        description: "Summer wedding of Marcy and George",
        dueDate: "2020-08-06",
        priority: 3,
        notes: "They both love the beach"
    }
    let projectOne = listOne.createProject(futureProject);
    
    let todoObject = {
        title: "Look for Dress",
        description: "Dress for Wedding",
        dueDate: "2020-08-06",
        priority: 3,
        notes: "Not a white dress",
        completeStatus: false,
        todoId: 1,
        projectId: 1
    };
    let todoOne = projectOne.createTodo(todoObject);
    let updatedTodoObject = {
        title: "Look for New Dress",
        description: "Dress for Funeral",
        dueDate: "2020-08-07",
        priority: 3,
        notes: "Must be black",
        completeStatus: true,
        todoId: 1
    }
    let todoTwo = projectOne.editTodo(updatedTodoObject);
    expect(todoTwo.getTitle()).toBe("Look for New Dress");
    expect(todoTwo.getDescription()).toBe("Dress for Funeral");
    expect(todoTwo.getDueDate()).toBe("2020-08-07");
    expect(todoTwo.getPriority()).toBe(3);
    expect(todoTwo.getNotes()).toBe("Must be black");
    expect(todoTwo.getCompleteStatus()).toBe(true);
    expect(todoTwo.getTodoId()).toBe(1);
    expect(todoTwo.getProjectId()).toBe(1);
});

test('Projects can delete Todos', () => {
    let objectOne = {
        title: "Look for Dress",
        description: "Dress for Wedding",
        dueDate: "2020-08-06",
        priority: 3,
        notes: "Not a white dress",
        completeStatus: false,
    };
    
    let objectTwo = {
        title: "Pick Up Flowers",
        description: "Moe's Arrangments at 9:00 AM",
        dueDate: "2020-08-04",
        priority: 3,
        notes: "Get watering instructions",
        completeStatus: false,
    }
    let objectThree = {
        title: "Get Cake",
        description: "Remy's Patissari at 10:00 AM",
        dueDate: "2020-08-04",
        priority: 3,
        notes: "Clean out room in the fridge",
        completeStatus: false,
    }

    let listOne = functions.List();
    let futureProject = {
        title: "Plan Marcy's Wedding",
        description: "Summer wedding of Marcy and George",
        dueDate: "2020-08-06",
        priority: 3,
        notes: "They both love the beach"
    }
    let projectOne = listOne.createProject(futureProject);
    let todoOne = projectOne.createTodo(objectOne);
    let todoTwo = projectOne.createTodo(objectTwo);
    let todoThree = projectOne.createTodo(objectThree);

    let ogTodosArray = projectOne.getTodosArray();
    let ogLength = Object.keys(ogTodosArray).length;

    projectOne.deleteTodo(2);

    let newTodosArray = projectOne.getTodosArray();
    let newLength = Object.keys(newTodosArray).length;
    expect(ogLength).toBe(3);
    expect(newLength).toBe(2);
});

test('Projects correctly delete single Todos', () => {
    let objectOne = {
        title: "Look for Dress",
        description: "Dress for Wedding",
        dueDate: "2020-08-06",
        priority: 3,
        notes: "Not a white dress",
        completeStatus: false,
    };
    let listOne = functions.List();
    let futureProject = {
        title: "Plan Marcy's Wedding",
        description: "Summer wedding of Marcy and George",
        dueDate: "2020-08-06",
        priority: 3,
        notes: "They both love the beach"
    }
    let projectOne = listOne.createProject(futureProject);
    let todoOne = projectOne.createTodo(objectOne);

    let ogTodosArray = projectOne.getTodosArray();
    let ogLength = Object.keys(ogTodosArray).length;

    projectOne.deleteTodo(1);

    let newTodosArray = projectOne.getTodosArray();
    let newLength = Object.keys(newTodosArray).length;
    expect(ogLength).toBe(1);
    expect(newLength).toBe(0);
});

test('Serilization', () => {
    let listOne = functions.List();
    let futureProject = {
        title: "Plan Marcy's Wedding",
        description: "Summer wedding of Marcy and George",
        dueDate: "2020-08-06",
        priority: 3,
        notes: "They both love the beach"
    }
    let projectOne = listOne.createProject(futureProject);
    let objectOne = {
        title: "Look for Dress",
        description: "Dress for Wedding",
        dueDate: "2020-08-06",
        priority: 3,
        notes: "Not a white dress",
        completeStatus: false,
    }
    let objectTwo = {
        title: "Pick Up Flowers",
        description: "Moe's Arrangments at 9:00 AM",
        dueDate: "2020-08-04",
        priority: 3,
        notes: "Get watering instructions",
        completeStatus: false,
    }
    let objectThree = {
        title: "Get Cake",
        description: "Remy's Patissari at 10:00 AM",
        dueDate: "2020-08-04",
        priority: 3,
        notes: "Clean out room in the fridge",
        completeStatus: false,
    }
    let todoOne = projectOne.createTodo(objectOne);
    let todoTwo = projectOne.createTodo(objectTwo);
    let todoThree = projectOne.createTodo(objectThree);

    listOne.setLocalStorage();
    listOne.getLocalStorage();

    let newTodoOne = projectOne.findTodoInTodosArray(1);
    let newTodoTwo = projectOne.findTodoInTodosArray(2);
    let newTodoThree = projectOne.findTodoInTodosArray(3);

    expect(todoOne.getTitle()).toBe(newTodoOne.getTitle());
    expect(todoTwo.getDueDate()).toBe(newTodoTwo.getDueDate());
    expect(todoThree.getPriority()).toBe(newTodoThree.getPriority());
});








/* 
Obsolete Tests 

/ Tests for Todo - factory function - Creation
test('Todos can be created', () => {
    let todoOne = functions.Todo("Look for Dress", "Dress for Wedding", "2020-08-06", 3, "Not a white dress", false, 1, 1);
    expect(todoOne.getTitle()).toBe("Look for Dress");
    expect(todoOne.getDescription()).toBe("Dress for Wedding");
    expect(todoOne.getDueDate()).toBe("2020-08-06");
    expect(todoOne.getPriority()).toBe(3);
    expect(todoOne.getNotes()).toBe("Not a white dress");
    expect(todoOne.getCompleteStatus()).toBe(false);
    expect(todoOne.getTodoId()).toBe(1);
    expect(todoOne.getProjectId()).toBe(1);
});

test('Todos can be edited', () => {
    let todoOne = functions.Todo("Look for Dress", "Dress for Wedding", "2020-08-06", 3, "Not a white dress", false, 1, 1);
    todoOne.updateTodoTitle("Burn the Dress");
    todoOne.updateTodoDescription("Dress for Canceled Wedding");
    todoOne.updateTodoDueDate("2020-08-05");
    todoOne.updateTodoPriority(5);
    todoOne.updateTodoNotes("Will need lighter fluid");
    todoOne.updateTodoCompleteStatus(true);
    expect(todoOne.getTitle()).toBe("Burn the Dress");
    expect(todoOne.getDescription()).toBe("Dress for Canceled Wedding");
    expect(todoOne.getDueDate()).toBe("2020-08-05");
    expect(todoOne.getPriority()).toBe(5);
    expect(todoOne.getNotes()).toBe("Will need lighter fluid");
    expect(todoOne.getCompleteStatus()).toBe(true);
    expect(todoOne.getTodoId()).toBe(1);
    expect(todoOne.getProjectId()).toBe(1);
});

test('Projects can be created', () => {
    let projectOne = functions.Project("Plan Marcy's Wedding", "Summer wedding of Marcy and George", "2020-08-06", 3, "They both love the beach", false, 1);
    expect(projectOne.getTitle()).toBe("Plan Marcy's Wedding");
    expect(projectOne.getDescription()).toBe("Summer wedding of Marcy and George");
    expect(projectOne.getDueDate()).toBe("2020-08-06");
    expect(projectOne.getPriority()).toBe(3);
    expect(projectOne.getNotes()).toBe("They both love the beach");
    expect(projectOne.getCompleteStatus()).toBe(false);
    expect(projectOne.getProjectId()).toBe(1);
});

test('Projects can be edited', () => {
    let projectOne = functions.Project("Plan Marcy's Wedding", "Summer wedding of Marcy and George", "2020-08-06", 3, "They both love the beach", false, 1);
    projectOne.updateProjectTitle("Cancel Marcy's Wedding");
    projectOne.updateProjectDescription("Return everything and get deposits back");
    projectOne.updateProjectDueDate("2020-08-05");
    projectOne.updateProjectPriority(5);
    projectOne.updateProjectNotes("Will need lighter fluid");
    projectOne.updateProjectCompleteStatus(true);
    expect(projectOne.getTitle()).toBe("Cancel Marcy's Wedding");
    expect(projectOne.getDescription()).toBe("Return everything and get deposits back");
    expect(projectOne.getDueDate()).toBe("2020-08-05");
    expect(projectOne.getPriority()).toBe(5);
    expect(projectOne.getNotes()).toBe("Will need lighter fluid");
    expect(projectOne.getCompleteStatus()).toBe(true);
    expect(projectOne.getProjectId()).toBe(1);
});






*/
