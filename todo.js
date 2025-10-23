class TodoApp {
  constructor() {
    this.tasks = [];
  }

  addTask(text) {
    const trimmed = text.trim();

    if (trimmed === "") {
      console.log("⚠️ Cannot add empty tasks.");
      return;
    }
    
    const currentId = this.tasks.length + 1
    const task = { 
      id: currentId, 
      text: trimmed, 
      done: false 
    };

    this.tasks.push(task);
    console.log(`✅ Task "${trimmed}" added.`);
    this.listTasks();
  }

  toggleTask(index) {
    if (index < 0 || !index) {
      console.log("⚠️ Index is invalid.");
      return;
    }

    this.tasks = this.tasks.map(task => 
      task.id === index 
        ? {...task, done: true}
        : task 
    )

    const task = this.findById(index)
    const status = task.done ? "finished" : "Not finished";
    console.log(`🔄 Task "${task.text}" marked ${status}.`);
    this.listTasks();
  }

  deleteTask(index) {
    if (index === 0 || !index) {
      console.log("⚠️ Indeks si invalid.");
      return;
    }

    const task = this.findById(index)
    this.tasks = this.tasks.filter(task => task.id !== index)// delete

    console.log(`🗑️ Task "${task.text}" deleted.`);
    this.listTasks();
  }

  listTasks() {
    console.log("\n📝 Task List:");
    if (this.tasks.length === 0) {
      console.log("(Empty)");
    } else {
      this.tasks.forEach((task, i) => {
        const status = task.done ? "✅" : "🟡";
        console.log(`[${task.id}]. ${status} ${task.text}`);
      });
    }
    console.log("");
  }

  findById(id) {
    if (!id) return;
    return this.tasks.find(task => task.id === id)
  }
}

// Jalankan contoh jika file ini dieksekusi langsung
// if (require.main === module) {
//   const app = new TodoApp();
//   app.addTask("Learn JavaScript");
//   app.addTask("Reading the Jest documentation");
//   app.toggleTask(1);
//   app.toggleTask(2);
//   app.deleteTask(1);
//   app.deleteTask(2);
// }

// Ekspor class agar bisa dites dengan Jest
module.exports = TodoApp;
