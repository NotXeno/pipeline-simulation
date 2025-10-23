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

  test("Do not add non-string tasks", () => {
    // passing a number should be rejected
    // tasks should remain empty
    app.addTask(123);
    expect(app.tasks.length).toBe(0);
  });

  test("addTask trims input", () => {
    app.addTask("   trimmed   ");
    expect(app.tasks.length).toBe(1);
    expect(app.tasks[0].text).toBe("trimmed");
  });

  test("toggle/delete with non-existing id logs and does not change tasks", () => {
    app.addTask("only task");
    // toggle non-existing
    app.toggleTask(2);
    expect(app.findById(1).done).toBe(false);

    // delete non-existing
    app.deleteTask(2);
    expect(app.tasks.length).toBe(1);
  });

  test("findById with zero or negative id returns undefined", () => {
    app.addTask("Task X");
    expect(app.findById(0)).toBeUndefined();
    expect(app.findById(-1)).toBeUndefined();
  });

  test("findById returns task when id exists", () => {
    app.addTask("Task A");
    const result = app.findById(1);
    expect(result).toBeDefined();
    expect(result.id).toBe(1);
    expect(result.text).toBe("Task A");
    expect(result.done).toBe(false);
  });

  test("findById returns undefined for non-existing id", () => {
    app.addTask("Task B");
    expect(app.findById(2)).toBeUndefined();
  });

  test("findById returns undefined for non-number id", () => {
    app.addTask("Task C");
    expect(app.findById("1")).toBeUndefined();
  });

  test("toggle mapping covers both branches (matched and unmatched tasks)", () => {
    // add two tasks so map iterates over a matching and a non-matching element
    app.addTask("Task 1");
    app.addTask("Task 2");

    // first toggle: Task 1 becomes done (true) -> covers the true path
    app.toggleTask(1);
    expect(app.findById(1).done).toBe(true);
    expect(app.findById(2).done).toBe(false);

    // second toggle: Task 1 becomes not done (false) -> covers the false path for the status ternary
    app.toggleTask(1);
    expect(app.findById(1).done).toBe(false);
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
