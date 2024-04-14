let toDos = [];

function storeToDo() {
  localStorage.setItem("elemente", JSON.stringify(toDos));
}

function load() {
  const receivedData = localStorage.getItem("elemente");
  toDos = JSON.parse(receivedData) ? JSON.parse(receivedData) : [];
}

function incloseToDo() {
  const passedText = document.querySelector("#passedText");
  let counter = 0;
  toDos.forEach((e) => {
    if (e.instruction.toLowerCase() === passedText.value.toLowerCase()) {
      alert("bereits vorhanden");
      counter++;
    }
  });

  if (passedText.value === "") {
    alert("Bitte Wert angeben");
    counter++;
  }

  if (counter === 0) {
    const newObject = {
      instruction: passedText.value.trim(),
      done: false,
    };
    toDos.push(newObject);
    storeToDo();
  }
  counter = 0;
}

function convertToDo() {
  const list = document.querySelector("#list");
  toDos.forEach((element) => {
    const newEntry = document.createElement("li");
    newEntry.classList = "list-element";

    const text = document.createTextNode(element.instruction);
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.classList = "check";
    checkbox.checked = element.done;
    newEntry.appendChild(checkbox);
    newEntry.appendChild(text);

    changeStatus(checkbox, element, newEntry);

    doneYesNo(element, newEntry);

    controlList(newEntry, element);
    list.appendChild(newEntry);
  });
}

function doneYesNo(element, newEntry) {
  if (element.done === true) {
    newEntry.style.textDecoration = "line-through";
  } else {
    newEntry.style.textDecoration = "none";
  }
}

function changeStatus(checkbox, element, newEntry) {
  checkbox.addEventListener("change", (e) => {
    element.done = e.target.checked;

    doneYesNo(element, newEntry);
    storeToDo();
  });
}

function controlList(newEntry, element) {
  const advert = document.querySelector("#advert");
  advert.addEventListener("change", (e) => {
    if (e.target.id === "all") {
      newEntry.style.display = "";
    } else if (e.target.id === "todo") {
      if (element.done === true) {
        newEntry.style.display = "none";
      } else {
        newEntry.style.display = "";
      }
    } else if (e.target.id === "done") {
      if (element.done === false) {
        newEntry.style.display = "none";
      } else {
        newEntry.style.display = "";
      }
    }
  });
}

const wipeOut = document.querySelector("#wipeOut");
wipeOut.addEventListener("click", () => {
  const filter = toDos.filter((todo) => !todo.done);
  toDos = filter;

  storeToDo();
  location.reload();
});

const pressBtn = document.querySelector("#enter");

pressBtn.addEventListener("submit", () => {
  incloseToDo();
});

load();
convertToDo();
