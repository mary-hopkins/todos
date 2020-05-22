import { tabSwitchBoard } from "./index";

let projectsArray = shareProjectsArray();
// function to share projectsArray
function shareProjectsArray() {
  let generalProject = {
    title: "General Todos",
    dueDate: "2025-05-28",
    priority: "1",
    description: "",
    notes: "",
    completeStatus: "Incomplete",
    projectId: 0,
  };
  let projectsArray = localStorage.getItem("projects")
    ? JSON.parse(localStorage.getItem("projects"))
    : localStorage.setItem("projects", JSON.stringify([generalProject]));

  return projectsArray;
}

// function to reset local storage after new project is saved
function setLocalstorage() {
  if (projectsArray.length == 0) {
    console.log('she"s empty');
  } else {
    //localStorage.removeItem('projects');// --> for easily clearing local storage
    localStorage.setItem("projects", JSON.stringify(projectsArray));
    return true;
  }
}

// function to find correct Project in projectsArray by Id
function findProjectInProjectsArray(Id) {
  let targetProjectId = Id;
  for (let i = 0; i < projectsArray.length; i++) {
    let currentProject = projectsArray[i];
    if (currentProject.projectId == targetProjectId) {
      return i;
    }
  }
}

// Edit Project
function editProject(e) {
  let targetProjectId = e.target.dataset.num;
  let targetProjectIndex = findProjectInProjectsArray(targetProjectId);
  let targetProject = projectsArray[targetProjectIndex];

  console.log(`project title = ${targetProject.title}`);
  if (validateProjectForm) {
    let titleInput = document.querySelector("#title");
    let dueDateInput = document.querySelector("#dueDate");
    let priorityInput = document.querySelector("#priority");
    let descriptionInput = document.querySelector("#description");
    let notesInput = document.querySelector("#notes");

    targetProject.title = titleInput.value;
    targetProject.dueDate = dueDateInput.value;
    targetProject.description = descriptionInput.value;
    targetProject.priority = priorityInput.value;
    console.log(`should be 4 ${targetProject.priority}`);
    targetProject.notes = notesInput.value;
  }
  setLocalstorage();

  tabSwitchBoard("persist");
}

// function to delete project from projectsArray
function deleteProject(e) {
  if (projectsArray.length == 1) {
    localStorage.removeItem("projects");
  } else {
    let targetProjectId = e.target.dataset.num;
    let targetProject = findProjectInProjectsArray(targetProjectId);
    projectsArray.splice(targetProject, 1);
    setLocalstorage();
  }
  tabSwitchBoard("persist");
}

//function to toggle completedStatus Project
function toggleCompleteProject(e) {
  let targetProjectId = e.target.dataset.num;
  let targetProjectIndex = findProjectInProjectsArray(targetProjectId);
  let targetProject = projectsArray[targetProjectIndex];

  if (targetProject.completeStatus == "Incomplete") {
    targetProject.completeStatus = "Complete";
  } else {
    targetProject.completeStatus = "Incomplete";
  }
  setLocalstorage();
  tabSwitchBoard("persist");
}

// factory function to create Project
const Project = (
  title,
  description,
  dueDate,
  priority,
  notes,
  completeStatus,
  projectId
) => {
  // functions to return useful shit
  const getTitle = () => title;
  const getdueDate = () => dueDate;
  const getPriority = () => priority;
  const getDescription = () => description;
  const getNotes = () => notes;
  const getCompletedStatus = () => completeStatus;
  const getProjectId = () => projectId;

  return {
    getTitle,
    getdueDate,
    getPriority,
    getDescription,
    getNotes,
    getCompletedStatus,
    getProjectId,
  };
};
//Object --> Project
function objectToProject(object) {
  var title = object.title;
  var description = object.description;
  var dueDate = object.dueDate;
  var priority = object.priority;
  var notes = object.notes;
  var completeStatus = object.completeStatus;
  var projectId = object.projectId;

  var objToProject = Project(
    title,
    description,
    dueDate,
    priority,
    notes,
    completeStatus,
    projectId
  );
  return objToProject;
}

// New Project submit
function submitNewProject() {
  if (validateProjectForm()) {
    console.log(`Made it past validation`);
    let newProject = pullNewProjectValues();
    projectsArray.push(newProject); // puts object in projectsArray
    setLocalstorage();
    return true;
  }
}
// Function to validate Project form input
function validateProjectForm() {
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
// Function to pull new project values from form
function pullNewProjectValues() {
  let titleInput = document.querySelector("#title");
  let dueDateInput = document.querySelector("#dueDate");
  let priorityInput = document.querySelector("#priority");
  let descriptionInput = document.querySelector("#description");
  let notesInput = document.querySelector("#notes");

  let newProject = {
    title: titleInput.value,
    dueDate: dueDateInput.value,
    priority: priorityInput.value,
    description: descriptionInput.value,
    notes: notesInput.value,
    completeStatus: "Incomplete",
    projectId: projectIdCounter(),
  };

  return newProject;
}
// Function to find largest projectId in projectsArray and add 1 to it.
function projectIdCounter() {
  let projectIdCounter = 1;

  let projectsArray = shareProjectsArray();
  if (projectsArray.length == 1) {
    projectIdCounter = 1;
  } else {
    for (let i = 0; i < projectsArray.length; i++) {
      let currentObject = projectsArray[i];
      let currentProjectId = currentObject.projectId;
      if (currentProjectId >= projectIdCounter) {
        projectIdCounter = currentProjectId;
        projectIdCounter++;
      }
    }
  }
  return projectIdCounter;
}

function findProjectIdFromProjectTitle(title) {
  let projectTitle = title;
  for (var i = 0; i < projectsArray.length; i++) {
    let currentProject = projectsArray[i];
    if (currentProject.title == projectTitle) {
      return currentProject.projectId;
    }
  }
}

function findProjectTitleFromProjectId(id) {
  let projectId = id;
  for (var i = 0; i < projectsArray.length; i++) {
    let currentProject = projectsArray[i];
    if (currentProject.projectId == projectId) {
      return currentProject.title;
    }
  }
}

export {
  Project,
  setLocalstorage,
  findProjectInProjectsArray,
  objectToProject,
  submitNewProject,
  deleteProject,
  toggleCompleteProject,
  editProject,
  findProjectIdFromProjectTitle,
  findProjectTitleFromProjectId,
  shareProjectsArray,
};
