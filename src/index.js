import { endOfWeek, startOfToday } from "date-fns";
import { startOfTomorrow } from "date-fns/esm";
import { newForm } from "./form";
import "./style.css";
import { createTodoItem } from "./todoItemsDOM.js";

const addTodoButton = document.createElement("button");
addTodoButton.textContent = "New Todo";
addTodoButton.id = "addTodoItem";
newForm(addTodoButton);

document.body.appendChild(addTodoButton);

createTodoItem("Yes", "nice", startOfTomorrow());
createTodoItem("IJ", "noooman", startOfToday());
createTodoItem("IJ", "noooman", new Date(endOfWeek(2)));
