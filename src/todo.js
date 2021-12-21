import { isToday, isTomorrow } from "date-fns";

class Todo {
  constructor(title, description, dueDate) {
    this.title = title;
    this.description = description;
    this.dueDate = dueDate;
    this.complete = false;
    this.id;

    if (isToday(dueDate)) {
      this.priority = 1;
    } else if (isTomorrow(dueDate)) {
      this.priority = 2;
    } else {
      this.priority = 3;
    }
  }
}

export default Todo;
