import Todo from "./todo.js";
import { format } from "date-fns";
const dateFormatter = "p PP";

const items = [];

function createTodoItem(title, description, dueDate, priority) {
  items.push(new Todo(title, description, dueDate, priority));

  populateDOM();
}

function removeTodoItem(id) {
  items.splice(id, 1);

  populateDOM();
}

function changeDate(id, date) {
  items[id].dueDate = date;
  populateDOM();
}

function populateDOM() {
  document.body.removeChild(document.getElementById("list"));

  const list = document.createElement("div");
  list.id = "list";

  for (let i = 0; i < items.length; i++) {
    const todoItem = items[i];

    const item = document.createElement("div");
    item.classList.add("itemContainer");
    item.classList.add(`priority-${todoItem.priority}`);


    const itemTitle = document.createElement("h3");
    itemTitle.textContent = todoItem.title;
    itemTitle.classList.add("itemTitle");
    itemTitle.id = i;

    const itemDate = document.createElement("h3");
    itemDate.textContent = format(todoItem.dueDate, dateFormatter);
    itemDate.classList.add("itemDate");
    dateEventListener(itemDate, i);

    item.appendChild(itemTitle);
    item.appendChild(itemDate);

    list.appendChild(item);
  }

  document.body.appendChild(list);
}

function dateEventListener(element, id) {
  element.addEventListener(
    "click",
    (e) => {
      const form = document.createElement("form");
      const datePicker = document.createElement("input");
      datePicker.name = "date";
      datePicker.type = "datetime-local";

      form.appendChild(datePicker);
      element.appendChild(form);

      form.addEventListener("change", (e) => {
        const dateTime = new Date(form.date.value);
        changeDate(id, dateTime);
      });
    },
    { once: true }
  );
}

function itemEventListener(element) {
  
}

export { createTodoItem, removeTodoItem, changeDate };
