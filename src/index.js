import { loadHomeTab } from "./DOMHomeTab.js";
import { loadProjectTab } from "./DOMProjectTab.js";

import {
  addTodoEventListeners,
  addProjectEventListeners,
  addNavigationEventListeners,
} from "./eventListeners.js";

let loadThisTab = "home";

function tabSwitchBoard(tab) {
  if (tab == "home") {
    loadHomeTab();
    loadThisTab = "home";
  } else if (tab == "project") {
    loadProjectTab();
    loadThisTab = "project";
  } else if (tab == "persist") {
    if (loadThisTab == "home") {
      tabSwitchBoard("home");
    } else if (loadThisTab == "project") {
      tabSwitchBoard("project");
    } else if (loadThisTab == "completed") {
      tabSwitchBoard("completed");
    }
  }
  tonsOfEventListeners();
}

function tonsOfEventListeners() {
  addTodoEventListeners();
  addProjectEventListeners();
  addNavigationEventListeners();
}
window.addEventListener("load", () => {
  tabSwitchBoard("home");
});

export { tabSwitchBoard };
