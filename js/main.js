const viewContainer = document.querySelector("#view-container");
const tableBody = document
  .querySelectorAll("table")[0]
  .querySelectorAll("tbody")[0];
const addButton = document.querySelector("#new-task-button");
let backButton = null;
let saveButton = null;

const statusColors = {
  Nova: "#00bfa6",
  "Em andamento": "#f8d559",
  Pedente: "#f87f59",
  Finalizada: "#f2f2f2",
};

let taskList = [];

class Task {
  constructor(name, description, owner, estimatedTime) {
    this.id = getID();
    this.name = name;
    this.description = description;
    this.owner = owner;
    this.estimatedTime = estimatedTime;
    this.status = "Nova";

    this.template = document.createElement("tr");

    let tdID = document.createElement("td");
    let tdName = document.createElement("td");
    let tdStatus = document.createElement("td");
    let tdActions = parseHTML("<td></td >");
    tdActions = tdActions.querySelector("td");

    let editButton = parseHTML(
      `<button class="button button--neumo button--warning edit-button mr-2"><i class="fas fa-edit"></i></button>`
    );
    let deleteButton = parseHTML(
      `<button class="button button--neumo button--danger delete-button mr-2"><i class="fas fa-trash"></i></button>`
    );
    let viewButton = parseHTML(
      `<button class="button button--neumo button--secondary view-button"><i class="fas fa-eye"></i></button>`
    );

    tdName.innerText = this.name;

    tdStatus.innerHTML = '<i class="fas fa-circle"></i >';
    tdStatus.classList.add("status-circle");
    tdStatus.style.color = statusColors[this.status];

    tdActions.appendChild(editButton);
    tdActions.appendChild(deleteButton);
    tdActions.appendChild(viewButton);

    tdID.innerText = this.id;

    this.template.appendChild(tdID);
    this.template.appendChild(tdName);
    this.template.appendChild(tdStatus);
    this.template.appendChild(tdActions);
  }
}

function getID() {
  return taskList[taskList.length - 1]
    ? taskList[taskList.length - 1].id + 1
    : 1;
}

function parseHTML(html) {
  var t = document.createElement("template");
  t.innerHTML = html;
  return t.content.cloneNode(true);
}

function clearView() {
  viewContainer.innerHTML =
    '<div class="flex flex-column justify-center align-center h-100"><i class="fas fa-user-astronaut placeholder__icon"></i><p>Selecione ou crie uma tarefa...</p></div>';
}

function updateTable() {
  for (let task of taskList) {
    tableBody.append(task.template);
  }
}

addButton.addEventListener("click", function () {
  taskForm = document.createElement("form");
  taskForm.id = "new-task-form";
  let formClasses = ["flex", "flex-column", "justify-content-between", "h-100"];
  taskForm.classList.add(...formClasses);

  taskForm.innerHTML =
    '<h2 class="form__title">Nova tarefa</h2><label for="name">Nome </label><input id="name" type="text"><label for="owner">Responsável </label><input id="owner" type="text"><label for="estimated-time">Tempo estimado</label><input id="estimated-time" type="text"><label for="description">Descrição</label><textarea name="description" id="description" cols="30" rows="10"></textarea><div><button id="back-button" class="button button--neumo button--secondary"><i class="fas fa-arrow-left"></i></button><button id="save-task-button" class="button button--neumo button--success"><i class="fas fa-check mr-2"></i>Criar</button></div>';
  viewContainer.innerHTML = "";

  viewContainer.append(taskForm);

  backButton = document.querySelector("#back-button");
  backButton.addEventListener("click", clearView);

  saveButton = document.querySelector("#save-task-button");
  saveButton.addEventListener("click", function (event) {
    event.preventDefault();
    let taskForm = document.querySelector("#new-task-form");
    let taskName = taskForm.querySelector("#name");
    let taskEstimatedTime = taskForm.querySelector("#estimated-time");
    let taskOwner = taskForm.querySelector("#owner");
    let taskDescription = taskForm.querySelector("#description");

    task = new Task(
      taskName.value,
      taskDescription.value,
      taskOwner.value,
      taskEstimatedTime.value
    );

    taskList.push(task);

    clearView();
    updateTable();
    console.log(deleteButtons);
  });
});
