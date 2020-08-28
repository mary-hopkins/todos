
import { loadHomeTab, loadProjectTab } from "./HomeTab.js";
import { List } from "./ProjectsAndTodos.js";
import {
  addNavigationEventListeners,
  runAllDisplayEventListeners,
  addCreateNewEventListeners
} from "./eventListeners.js";
import { notAPageReset } from "./DOMfunctions.js"

let loadThisTab = "home";

function tabSwitchBoard(tab) {
  notAPageReset()
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
    }
  }
  addCreateNewEventListeners();
  runAllDisplayEventListeners();
}
let listOne = List();

window.addEventListener("load", () => {
  listOne.getLocalStorage();
  addNavigationEventListeners();
  addCreateNewEventListeners();
  tabSwitchBoard("home");
});

export { tabSwitchBoard, listOne };
