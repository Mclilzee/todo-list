import { endOfWeek, startOfToday } from "date-fns";
import { startOfTomorrow } from "date-fns/esm";
import "./style.css";
import { createTodoItem, removeTodoItem, getTodoItem } from "./todoItemsDOM.js";

createTodoItem("Yes", "nice", startOfTomorrow());
createTodoItem("IJ", "noooman", startOfToday());
createTodoItem("IJ", "noooman", endOfWeek(2));

const all = document.querySelectorAll(".itemDate").forEach((date) => {
  date.addEventListener("click", (e) => {
    const form = document.createElement("form");
    const datePicker = document.createElement("input");
    console.log(e);

    form.appendChild(datePicker);
    document.body.appendChild(form);

    form.addEventListener("change", (e) => {
      console.log(e);
      date.textContent = form.date.value;
      document.body.removeChild("form");
    });
  });
});
