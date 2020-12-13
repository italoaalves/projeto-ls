const base_url = "https://rocketeer-api.herokuapp.com/tasks";

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

async function updateList() {
  await fetch(base_url)
    .then((response) => response.json())
    .then((json) => {
      taskList.push(...json);
      updateTable(taskList);
      console.log(taskList);
    });
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

function updateTable(taskList) {
  console.log(taskList);
  for (let task of taskList) {
    template = document.createElement("tr");

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

    tdName.innerText = task.name;

    tdStatus.innerHTML = '<i class="fas fa-circle"></i >';
    tdStatus.classList.add("status-circle");
    tdStatus.style.color = statusColors[task.status];

    tdActions.appendChild(editButton);
    tdActions.appendChild(deleteButton);
    tdActions.appendChild(viewButton);

    template.appendChild(tdName);
    template.appendChild(tdStatus);
    template.appendChild(tdActions);

    console.log(template);
    tableBody.append(template);
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

    (async () => {
      const rawResponse = await fetch(base_url, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: taskName.value,
          description: taskDescription.value,
          owner: taskOwner.value,
          estimatedTime: taskEstimatedTime.value,
          status: "Nova",
        }),
      });
      const content = await rawResponse.json();

      console.log(content);
    })();

    clearView();
    updateList();
  });
});

updateList();
