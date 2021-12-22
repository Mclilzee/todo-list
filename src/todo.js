import { isPast, isToday, isTomorrow } from "date-fns";

class Todo {
  constructor(title, description, dueDate) {
    this.title = title;
    this.description = description;
    this.dueDate = dueDate;
    this.complete = false;
    this.id;
    this.priority = this.getPriority(dueDate);
  }

  editValues(title, description, dueDate) {
    this.title = title;
    this.description = description;
    this.dueDate = dueDate;
    this.priority = this.getPriority(dueDate);
  }

  getPriority(dueDate) {
    let value = 4;
    if (isToday(dueDate)) {
      value = 1;
    } else if (isTomorrow(dueDate)) {
      value = 2;
    } else if (!isPast(dueDate)) {
      value = 3;
    }

    return value;
  }
}

export default Todo;
