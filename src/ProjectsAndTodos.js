
const Todo = (
  title,
  description,
  dueDate,
  priority,
  notes,
  completeStatus, // = false,
  todoId,
  projectId
) => {
  
  function updateTodoTitle(string) {
    if(title != string) {
      title = string;
    }
  }
  function updateTodoDescription(string) {
    if(description != string) {
      description = string;
    } 
  }
  function updateTodoDueDate(string) {
    if(dueDate != string){
      dueDate = string;
    }
  }
  function updateTodoPriority(number) {
    if(priority != number) {
      priority = number;
    }
  }
  function updateTodoNotes(string) {
    if(notes != string) {
      notes = string;
    }
  }
  function updateTodoCompleteStatus(boolean) {
    if(completeStatus != boolean) {
      completeStatus = boolean;
    }
  } 

  const getTitle = () => title;
  const getDueDate = () => dueDate;
  const getPriority = () => priority;
  const getDescription = () => description;
  const getNotes = () => notes;
  const getCompleteStatus = () => completeStatus;
  const getTodoId = () => todoId;
  const getProjectId = () => projectId;

  return {
    getTitle,
    getDueDate,
    getPriority,
    getDescription,
    getNotes,
    getCompleteStatus,
    getTodoId,
    getProjectId,
    updateTodoTitle,
    updateTodoDescription,
    updateTodoDueDate,
    updateTodoPriority,
    updateTodoNotes,
    updateTodoCompleteStatus
  };
};
const Project = (
  title,
  description,
  dueDate,
  priority,
  notes,
  completeStatus,
  projectId
) => {
  function updateProjectTitle(string) {
    if(title != string) {
      title = string;
    }
  }
  function updateProjectDescription(string) {
    if(description != string) {
      description = string;
    }
  }
  function updateProjectDueDate(string) {
    if(dueDate != string) {
      dueDate = string;
    }
  }
  function updateProjectPriority(number) {
    if(priority != number) {
      priority = number;
    }
  }
  function updateProjectNotes(string) {
    if(notes != string) {
      notes = string;
    }
  }
  function updateProjectCompleteStatus(boolean) {
    if(completeStatus != boolean) {
      completeStatus = boolean;
    }
  }
  
  // functions to return useful shit
  const getTitle = () => title;
  const getDueDate = () => dueDate;
  const getPriority = () => priority;
  const getDescription = () => description;
  const getNotes = () => notes;
  const getCompleteStatus = () => completeStatus;
  const getProjectId = () => projectId;
  const getTodosArray = () => todosArray;

  /// TODOS --
  let todosArray = [];

  // function to find to correct Todo in todosArray by Id
  function findTodoInTodosArray(id) {
    let targetTodoId = id;
    for (let i = 0; i < todosArray.length; i++) {
      let currentTodo = todosArray[i];
      if (currentTodo.getTodoId() == targetTodoId) {
        return currentTodo;
      }
    }
  }

  function createTodo(obj) {
    let todoTitle = obj.title; 
    let todoDescription = obj.description;
    let todoDueDate = obj.dueDate;
    let todoPriority = obj.priority;
    let todoNotes = obj.notes;
    let todoId = getNewTodoId();
    let newTodo = Todo(todoTitle, todoDescription, todoDueDate, todoPriority, todoNotes, false, todoId, projectId)
    todosArray.push(newTodo);
    return newTodo;
  }

  function getNewTodoId() {
    let todoIdCounter = 1;
    if (todosArray.length == 0) {
      todoIdCounter = 1;
    } else {
      for (let i = 0; i < todosArray.length; i++) {
        let currentObject = todosArray[i];
        let currentTodoId = currentObject.getTodoId();
        if (currentTodoId >= todoIdCounter) {
          todoIdCounter = currentTodoId;
          todoIdCounter++;
        }
      }
    }
    return todoIdCounter;
  }

  function editTodo(obj) {
    let currentTodo = findTodoInTodosArray(obj.todoId);
    if(obj.title) {
      currentTodo.updateTodoTitle(obj.title); 
    }
    if(obj.description) {
      currentTodo.updateTodoDescription(obj.description);
    }
    if(obj.dueDate) {
      currentTodo.updateTodoDueDate(obj.dueDate);
    }
    if(obj.priority) {
      currentTodo.updateTodoPriority(obj.priority);
    }
    if(obj.notes) {
      currentTodo.updateTodoNotes(obj.notes);
    }
    if(obj.completeStatus) {
      currentTodo.updateTodoCompleteStatus(obj.completeStatus);
    }
    return currentTodo;    
  }

  function deleteTodo(id) {
    if (todosArray.length == 1) {
      todosArray = [];
    } else {
      for(let i = 0; i < todosArray.length; i++) {
        if(todosArray[i].getTodoId() == id) {
          todosArray.splice(i, 1);
        }
      }
    }
    return todosArray;
  }


  ///// SERIALIZATION /////
  function todosToObjects() {
    let objectsArray = [];
    let todosArraylength = Object.keys(todosArray).length;
    for(let i = 0; i < todosArraylength; i++) {
      let currentTodo = todosArray[i];
      let obj = {
        title: currentTodo.getTitle(),
        description: currentTodo.getDescription(),
        dueDate: currentTodo.getDueDate(),
        priority: currentTodo.getPriority(),
        notes: currentTodo.getNotes(),
        completeStatus: currentTodo.getCompleteStatus(),
      }
      objectsArray.push(obj);
    }
    return objectsArray;
  }

  function todosArrayToJSON() {
    let JSONTodosArray = JSON.stringify(todosToObjects());
    todosArray = [];
    return JSONTodosArray;
  }

  function JSONToTodos(JSONarray) {
    for(let i = 0; i < JSONarray.length; i++) {
      createTodo(JSONarray[i]);
    }
  }

  return {
    getTitle,
    getDueDate,
    getPriority,
    getDescription,
    getNotes,
    getCompleteStatus,
    getProjectId,
    updateProjectTitle,
    updateProjectDescription,
    updateProjectDueDate,
    updateProjectPriority,
    updateProjectNotes,
    updateProjectCompleteStatus,
    createTodo,
    editTodo,
    deleteTodo,
    getTodosArray,
    findTodoInTodosArray,
    todosArrayToJSON,
    JSONToTodos,
    todosToObjects
  };
};
const List = (
) => {
  
  let projectsArray = [];

  function findProjectInProjectsArray(id) {
    let targetProjectId = id;
    for (let i = 0; i < projectsArray.length; i++) {
      let currentProject = projectsArray[i];
      if (currentProject.getProjectId() == targetProjectId) {
        return currentProject;
      }
    }
  }
  function findProjectIdFromProjectTitle(title) {
    for(let l = 0; l < projectsArray.length; l++) {
      let currentProjectTitle = projectsArray[l].getTitle();
      if(currentProjectTitle == title) {
        return projectsArray[l].getProjectId();
      }
    }
  }

  ///// CRUD /////
  function createProject(obj) {
    let projectTitle = obj.title; 
    let projectDescription = obj.description;
    let projectDueDate = obj.dueDate;
    let projectPriority = obj.priority;
    let projectNotes = obj.notes;
    let projectId = (obj.title == "General") ? 0 : getNewProjectId();
    let newProject = Project(projectTitle, projectDescription, projectDueDate, projectPriority, projectNotes, false, projectId)
    projectsArray.push(newProject);
    return newProject;
  }
  function getNewProjectId() {
    let projectIdCounter = 1;
    if (projectsArray.length == 0) {
      projectIdCounter = 1;
    } else {
      for (let i = 0; i < projectsArray.length; i++) {
        let currentObject = projectsArray[i];
        let currentProjectId = currentObject.getProjectId();
        if (currentProjectId >= projectIdCounter) {
          projectIdCounter = currentProjectId;
          projectIdCounter++;
        }
      }
    }
    return projectIdCounter;
  }
  function editProject(obj) {
    let currentProject = findProjectInProjectsArray(obj.projectId);
    if(obj.title) {
      currentProject.updateProjectTitle(obj.title); 
    }
    if(obj.description) {
      currentProject.updateProjectDescription(obj.description);
    }
    if(obj.dueDate) {
      currentProject.updateProjectDueDate(obj.dueDate);
    }
    if(obj.priority) {
      currentProject.updateProjectPriority(obj.priority);
    }
    if(obj.notes) {
      currentProject.updateProjectNotes(obj.notes);
    }
    if(obj.completeStatus) {
      currentProject.updateProjectCompleteStatus(obj.completeStatus);
    }
    return currentProject;    
  }
  function deleteProject(id) {
    let projectsArraylength = Object.keys(projectsArray).length;
    if (projectsArraylength == 1) {
      projectsArray = [];
    } else {
      for(let i = 0; i < projectsArraylength; i++) {
        if(projectsArray[1].getProjectId() == id) {
          projectsArray.splice(i, 1);
        }
      }
    }
    return projectsArray;
  }

  ///// SERIALIZATION /////
  function projectsToObjects() {
    let objectsArray = [];
    let projectsArraylength = Object.keys(projectsArray).length;
    for(let i = 0; i < projectsArraylength; i++) {
      let currentProject = projectsArray[i];
      let obj = {
        title: currentProject.getTitle(),
        description: currentProject.getDescription(),
        dueDate: currentProject.getDueDate(),
        priority: currentProject.getPriority(),
        notes: currentProject.getNotes(),
        completeStatus: currentProject.getCompleteStatus(),
        todosArray: currentProject.todosToObjects()
      }
      objectsArray.push(obj);
    }
    return objectsArray;
  }
  function projectsArrayToJSON() {
    let JSONProjectsArray = JSON.stringify(projectsToObjects());
    //projectsArray = [];
    return JSONProjectsArray;
  }
  function JSONToProjects(JSONarray) {
    let objectArray = JSON.parse(JSONarray);
    for(let i = 0; i < objectArray.length; i++) {
      let currentObj = objectArray[i];
      let todosJSON = currentObj.todosArray;
      delete currentObj.todosArray;
      let newProject = createProject(objectArray[i]);
      if(todosJSON != undefined) {
        newProject.JSONToTodos(todosJSON);
      }
      
    }
  }

  ///// Local Storage /////
  function setLocalStorage() {
    let JSONarray = projectsArrayToJSON();
    localStorage.setItem('projects', JSONarray);
  }
  function getLocalStorage() {
    let JSONarray = localStorage.getItem('projects');
    if(JSONarray != undefined) {
      JSONToProjects(JSONarray);
    } else {
      addGeneralProject();
    }
  }
  function addGeneralProject() {
    let generalProject = {
      title: "General",
      description: "Miscellaneous Todos",
      dueDate: "2025-12-31",
      priority: 1,
      notes: " ",
      projectId: 0,
    }
    createProject(generalProject);
  }

  ///// Non Project Lists /////
  function populateDueSoon() {
    let dueSoonArray = [];
    let sevenDaysFromNow = new Date();
    sevenDaysFromNow.setDate(sevenDaysFromNow.getDate() + 7);
    for(let j = 0; j < projectsArray.length; j++) {
      let currentProject = projectsArray[j];
      let curProjTodosArray = currentProject.getTodosArray();
      for(let i = 0; i < curProjTodosArray.length; i++) {
        let currentTodo = curProjTodosArray[i];
        let currentDueDate = new Date(currentTodo.getDueDate());
        if(currentDueDate <= sevenDaysFromNow) {
          dueSoonArray.push(currentTodo);
        }
      }
    }
    return dueSoonArray;
  }
  function populateHighPriority() {
    let highPriorityArray = [];
    for(let j = 0; j < projectsArray.length; j++) {
      let currentProject = projectsArray[j];
      let curProjTodosArray = currentProject.getTodosArray();
      for(let i = 0; i < curProjTodosArray.length; i++) {
        let currentTodo = curProjTodosArray[i];
        let currentPriority = currentTodo.getPriority();
        if(currentPriority >= 4) {
          highPriorityArray.push(currentTodo);
        }
      }
    }
    return highPriorityArray;
  }
  function getGeneralTodos() {
    let generalProject = findProjectInProjectsArray(0);
    let generalTodos = generalProject.getTodosArray();
    return generalTodos;
  }
  const getProjectsArray = () => projectsArray;

  return {
    createProject,
    editProject,
    deleteProject,
    getProjectsArray,
    findProjectInProjectsArray,
    findProjectIdFromProjectTitle,
    setLocalStorage,
    getLocalStorage,
    populateDueSoon,
    populateHighPriority,
    getGeneralTodos
  };
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export {
  Todo,
  Project,
  List,
};
