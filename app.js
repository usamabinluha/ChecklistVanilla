let id                = 0;
let ids               = [];
const addButton       = document.querySelector('.add-button');
const inputText       = document.querySelector('.input');
const listContainer   = document.querySelector('.list-container');
const headerContainer = document.querySelector('.header');
const header          = getTemplate('header-template').querySelector('#header');
const editableHeader  = getTemplate('editable-header-template').querySelector('#editable-header');
const editable        = editableHeader.querySelector('.header-title-input');

const domStore        = {}
let title             = ''
let onSave;

resumeState()

function resumeState () {
  if(localStorage.getItem('item_ids')){
    const itemIds     = localStorage.getItem('item_ids')
    ids = JSON.parse(itemIds)
    ids.forEach(id => {
      const name      = localStorage.getItem(id);
      const listItem  = new ListItem(id, name, onDelete, onEdit);
      addItem(id, listItem);
    });
    id = ids.length ? ids[ids.length - 1] : 0
  }

  if(localStorage.getItem('title')){
    title = localStorage.getItem('title');
  }

  initTitle()
  inputText.focus()
}

function initTitle () {
  header.textContent = title;
  headerContainer.appendChild(header);
  header.addEventListener('dblclick', onEditTitle)
}

function onEditTitle (event) {
  if(event.target === header){

    event.stopPropagation()

    headerContainer.removeChild(header);
    editable.value = header.textContent;
    headerContainer.appendChild(editableHeader);
    editable.select()

    editable.addEventListener('keyup', onKeyup)
    editable.addEventListener('blur', onBlur)

    function onKeyup (event) {
      event.preventDefault()
      if(event.keyCode === 13){
        header.textContent  = editable.value;
        title               = editable.value
        localStorage.setItem('title', editable.value)
        editable.value      = ''
        headerContainer.removeChild(editableHeader);
        headerContainer.appendChild(header);
      }
      else if(event.keyCode === 27){
        header.textContent  = title;
        editable.value      = ''
        headerContainer.removeChild(editableHeader);
        headerContainer.appendChild(header);
      }
    }

    function onBlur (event) {
      event.preventDefault()
      if(editable.value){
        headerContainer.removeChild(editableHeader);
        header.textContent = title;
        headerContainer.appendChild(header);
      }
      editable.removeEventListener('blur', onBlur)
      editable.removeEventListener('keyup', onKeyup)
    }
  }
}

function onAdd (event) {
  event.preventDefault()
  const name        = inputText.value;
  const listItem    = new ListItem(++id, name, onDelete, onEdit);
  addItem(id, listItem);
  inputText.value   = ''
  saveState()
}

addButton.addEventListener('click', onAdd)

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
  const listItem        = domStore[id]
  inputText.value       = listItem.getName()
  inputText.focus()
}

function onSaveCallback (event, id) {
  event.preventDefault()
  const listItem        = domStore[id];
  const name            = inputText.value;
  listItem.setName(name)
  updateItem(id)
  inputText.value       = ''
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
  const listItem = domStore[id]
  localStorage.setItem(id, listItem.getName())
}

function deleteItem (id) {
  const indexToBeDeleted  = ids.indexOf(id)
  ids.splice(indexToBeDeleted, 1);
  const listItem          = domStore[id]
  listContainer.removeChild(listItem.getDOM())
  delete domStore[id];
  localStorage.removeItem(id)
}

function saveState () {
  localStorage.setItem('item_ids', JSON.stringify(ids))
}