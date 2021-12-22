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

createTodoItem(
  "Click me for Information",
  "Create new Todo Items with 'New Todo' button, delete items and change their values by clicking on them. change date by clicking on the date",
  startOfTomorrow()
);
createTodoItem(
  "Color depends on due Date",
  "Red for today, orange for Tommorow, green for after Tommorow, and grey means time is due",
  startOfToday()
);
createTodoItem("Go Swimming", "very Old", new Date(endOfWeek(2)));
