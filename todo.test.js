const TodoApp = require("./todo");

describe("TodoApp (versi console)", () => {
  let app;

  beforeEach(() => {
    app = new TodoApp();
  });

  test("Add task", () => {
    app.addTask("Learn Node.js");
    expect(app.tasks.length).toBe(1);
    expect(app.tasks[0].text).toBe("Learn Node.js");
    expect(app.tasks[0].done).toBe(false);
  });

  test("Toggle task", () => {
    app.addTask("Learn Jest");
    app.toggleTask(1);
    expect(app.findById(1).done).toBe(true);
  });

  test("Delete task", () => {
    app.addTask("Learn OOP");
    app.deleteTask(1);
    expect(app.tasks.length).toBe(0);
  });

  test("Do not add empty tasks", () => {
    app.addTask("");
    expect(app.tasks.length).toBe(0);
  });
 
  test("Delete task with invalid index",() => {
  app.addTask("Delete Task invalid index");
  app.deleteTask(0);
  expect(app.tasks.length).toBe(1);

  });

  test("Toggle task with invalid index", () => {
    app.addTask("Toggle task invalid index");
    app.toggleTask(0);
    expect(app.findById(1).done).toBe(false);
  });

  test("Find ID but no ID", () => {
    expect(app.findById()).toBeUndefined();

  });


// ////////////////////
//   test("Toggle task", () => {
//     app.addTask("Learn Jest");
//     app.toggleTask(0);
//     expect(app.findById(0).done).toBe(false);
//   });

// test("Delete task", () => {
//     app.addTask("Learn OOP");
//     app.deleteTask(0);
//     expect(app.tasks.length).toBe(1);
//   });

});
