let id              = 0;
let ids             = [];
const addButton     = document.querySelector('.add-button');
const inputText     = document.querySelector('.input');
const listContainer = document.querySelector('.students-list');

const domStore      = {}
let onSave;

inputText.focus()

function onAdd (event) {
  event.preventDefault()
  const name        = inputText.value;
  const studentItem = new StudentItem(++id, name, onDelete, onEdit);
  addItem(id, studentItem);
  inputText.value   = ''
  saveState()
}

addButton.addEventListener('click', onAdd)

resumeState()

function onDelete (id) {
  deleteItem(id);
  inputText.focus();
  saveState()
}

function onEdit (id) {
  addButton.removeEventListener('click', onAdd)
  onSave = (event) => {
    onSaveCallback(event, id)
  }
  addButton.addEventListener('click', onSave)
  addButton.textContent = 'Save'
  const studentItem = domStore[id]
  inputText.value   = studentItem.getName()
  inputText.focus()
}

function onSaveCallback (event, id) {
  event.preventDefault()
  const studentItem = domStore[id];
  const name        = inputText.value;
  studentItem.setName(name)
  updateItem(id)
  inputText.value   = ''
  addButton.textContent = 'Add'
  addButton.removeEventListener('click', onSave)
  addButton.addEventListener('click', onAdd)
}

function addItem (id, item) {
  if(!ids.includes(id)){
    ids.push(id);
  }
  listContainer.appendChild(item.getDOM())
  domStore[id] = item;
  localStorage.setItem(id, item.getName())
}

function updateItem (id) {
  const studentItem = domStore[id]
  localStorage.setItem(id, studentItem.getName())
}

function deleteItem (id) {
  const indexToBeDeleted = ids.indexOf(id)
  ids.splice(indexToBeDeleted, 1);
  const studentItem = domStore[id]
  listContainer.removeChild(studentItem.getDOM())
  delete domStore[id];
  localStorage.removeItem(id)
}

function saveState () {
  localStorage.setItem('student_ids', JSON.stringify(ids))
}

function resumeState () {
  if(localStorage.getItem('student_ids')){
    const studentIds = localStorage.getItem('student_ids')
    ids = JSON.parse(studentIds)
    ids.forEach(id => {
      const name = localStorage.getItem(id);
      const studentItem = new StudentItem(id, name, onDelete, onEdit);
      addItem(id, studentItem);
    });
    id = ids.length ? ids[ids.length - 1] : 0
  }
}