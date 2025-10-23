// FILE: todo.js
class TodoApp {
  constructor() {
    this.tasks = [];
  }

  addTask(text) {
    // guard: only accept string input
    if (typeof text !== 'string') {
      console.log("⚠️ Cannot add non-string tasks.");
      return;
    }

    const trimmed = text.trim();

    if (trimmed === "") {
      console.log("⚠️ Cannot add empty tasks.");
      return;
    }

    const currentId = this.tasks.length + 1;
    const task = {
      id: currentId,
      text: trimmed,
      done: false,
    };

    this.tasks.push(task);
    console.log(`✅ Task "${trimmed}" added.`);
    this.listTasks();
  }

  toggleTask(index) {
    if (typeof index !== "number" || index <= 0) {
      console.log("⚠️ Index is invalid.");
      return;
    }

    const task = this.findById(index);
    if (!task) {
      console.log("⚠️ Index not found.");
      return;
    }

    this.tasks = this.tasks.map(t => 
      t.id === index 
        ? {...t, done: !t.done}
        : t 
    );

    const updated = this.findById(index);
    const status = updated.done ? "finished" : "Not finished";
    console.log(`🔄 Task "${updated.text}" marked ${status}.`);
    this.listTasks();
  }

  deleteTask(index) {
    if (typeof index !== "number" || index <= 0) {
      console.log("⚠️ Index is invalid.");
      return;
    }

    const task = this.findById(index);
    if (!task) {
      console.log("⚠️ Index not found.");
      return;
    }

    this.tasks = this.tasks.filter(t => t.id !== index);

    console.log(`🗑️ Task "${task.text}" deleted.`);
    this.listTasks();
  }

  listTasks() {
    console.log("\n📝 Task List:");
    if (this.tasks.length === 0) {
      console.log("(Empty)");
    } else {
      this.tasks.forEach((task) => {
        const status = task.done ? "✅" : "🟡";
        console.log(`[${task.id}]. ${status} ${task.text}`);
      });
    }
    console.log("");
  }

  findById(id) {
    if (typeof id !== "number" || id <= 0) return undefined;
    return this.tasks.find(task => task.id === id);
  }
}

module.exports = TodoApp;

