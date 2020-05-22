import { objectToProject, shareProjectsArray } from "./ProjectsArray.js";

import { createProjectDOM } from "./DOMproject.js";

function loadProjectTab() {
  let base = document.querySelector("#content");
  base.innerHTML = "";
  let projectsArray = shareProjectsArray();

  for (var i = 0; i < projectsArray.length; i++) {
    let currentObject = projectsArray[i];
    let currentProject = objectToProject(currentObject);
    let project = createProjectDOM(currentProject);
    base.appendChild(project);
  }
}

export { loadProjectTab };
