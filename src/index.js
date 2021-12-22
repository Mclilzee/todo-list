import { endOfWeek, startOfToday } from "date-fns";
import { startOfTomorrow } from "date-fns/esm";
import "./style.css";
import { createTodoItem, removeTodoItem , changeDate} from "./todoItemsDOM.js";

const addTodoButton = document.createElement("button");
addTodoButton.textContent = "New Todo";
addTodoButton.id = "addTodoItem";
addTodoButton.addEventListener("click", () => {
  const form = document.createElement("form");
  form.id = "newTodoForm";
  const titleLabel = document.createElement("label");
  titleLabel.textContent = "Title:";
  const titleInput = document.createElement("input");
  titleInput.type = "text";
  titleInput.name = "titleInput";
  titleInput.id = "titleInput";


  const textAreaLable = document.createElement("label");
  textAreaLable.textContent = "Description:"
  const textArea = document.createElement("textarea");
  textArea.id = "textAreaInput";
  textArea.name = "textArea";
  textArea.rows = 6;
  textArea.cols = 50;

  const datePicker = document.createElement("input");
  datePicker.id = "dateInput";
  datePicker.name = "datePicker";
  datePicker.type = "datetime-local";

  const submitButton = document.createElement("input");
  submitButton.value = "Add Item";
  submitButton.id = "submitButtonInput";
  submitButton.type = "submit";

  form.appendChild(titleLabel);
  form.appendChild(titleInput);
  form.appendChild(textAreaLable);
  form.appendChild(textArea);
  form.appendChild(datePicker);
  form.appendChild(submitButton);

  document.body.appendChild(form);


})
document.body.appendChild(addTodoButton);

createTodoItem("Yes", "nice", startOfTomorrow());
createTodoItem("IJ", "noooman", startOfToday());
createTodoItem("IJ", "noooman", endOfWeek(2));

