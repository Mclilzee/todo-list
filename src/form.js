import {
  changeInformation,
  createTodoItem,
  toggleComplete,
  removeTodoItem
} from "./todoItemsDOM";
import { format } from "date-fns";

function newForm(element) {
  element.addEventListener("click", () => {
    const form = defaultView();

    document.body.appendChild(form);

    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const submitter = e.submitter.value;
      const title = e.target.titleInput.value;
      const description = e.target.textArea.value;
      const date = e.target.datePicker.value;

      if (submitter === "Add Item" && title && date) {
        createTodoItem(title, description, new Date(date));
      }

      document.body.removeChild(form);
    });
  });
}

function filledForm(todoItem, index) {
  const isComplete = todoItem.complete;

  const form = defaultView(true, isComplete);

  form.titleInput.value = todoItem.title;
  form.textArea.value = todoItem.description;
  form.datePicker.value = format(todoItem.dueDate, "yyyy-MM-dd'T'HH:mm");
  form.submitButton.value = "Apply Changes";
  buttonStyle(form.completeButton);
  buttonStyle(form.deleteButton);

  form.completeButton.addEventListener("click", () => {
    toggleComplete(todoItem);
  });

  form.deleteButton.addEventListener("click", () => {
    removeTodoItem(index);
  });

  document.body.appendChild(form);

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const submitter = e.submitter.value;
    const title = e.target.titleInput.value;
    const description = e.target.textArea.value;
    const date = e.target.datePicker.value;

    if (submitter === "Apply Changes" && title && date) {
      changeInformation(todoItem, title, description, new Date(date));
    }

    document.body.removeChild(form);
  });
}

function defaultView(includeButtons, isComplete) {
  const form = document.createElement("form");
  form.id = "newTodoForm";
  const formCloseButton = document.createElement("input");
  formCloseButton.type = "submit";
  formCloseButton.value = "X";
  formCloseButton.name = "closeButton";
  formCloseButton.id = "formCloseButton";
  form.appendChild(formCloseButton);

  if (includeButtons) {
    const completeButton = document.createElement("button");
    completeButton.classList.add("acitvityButton");
    completeButton.name = "completeButton";
    if (isComplete) {
      completeButton.textContent = "Set Active";
    } else {
      completeButton.textContent = "Set Complete";
    }

    form.appendChild(completeButton);
  }
  const titleLabel = document.createElement("label");
  titleLabel.textContent = "Title:";
  const titleInput = document.createElement("input");
  titleInput.type = "text";
  titleInput.name = "titleInput";
  titleInput.id = "titleInput";

  const textAreaLable = document.createElement("label");
  textAreaLable.textContent = "Description:";
  const textArea = document.createElement("textarea");
  textArea.id = "textAreaInput";
  textArea.name = "textArea";
  textArea.rows = 20;
  textArea.cols = 100;

  const datePicker = document.createElement("input");
  datePicker.id = "dateInput";
  datePicker.name = "datePicker";
  datePicker.type = "datetime-local";

  const submitButton = document.createElement("input");
  submitButton.name = "submitButton";
  submitButton.value = "Add Item";
  submitButton.id = "submitButtonInput";
  submitButton.type = "submit";

  form.appendChild(titleLabel);
  form.appendChild(titleInput);
  form.appendChild(textAreaLable);
  form.appendChild(textArea);
  form.appendChild(datePicker);
  form.appendChild(submitButton);

  if (includeButtons) {
    const deleteButton = document.createElement("button");
    deleteButton.name = "deleteButton";
    deleteButton.textContent = "Delete Activity";
    deleteButton.classList.add("acitvityButton");
    deleteButton.classList.add("deleteButton");
    form.appendChild(deleteButton);
  }
  return form;
}

function buttonStyle(button) {
  button.addEventListener("mouseover", () => {
    button.classList.toggle("buttonHover");
  });

  button.addEventListener("mouseout", () => {
    button.classList.toggle("buttonHover");
  });
}

export { newForm, filledForm };
