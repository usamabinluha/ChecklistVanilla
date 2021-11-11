function ListItem(id, name, onDelete, onEdit) {
  this.id                   = id;
  this.name                 = name;
  this.dom                  = getTemplate('list-item-template').querySelector('.list-item')
  this.nameDom              = this.dom.querySelector('.name')
  this.deleteButton         = this.dom.querySelector('.delete')
  this.nameDom.textContent  = name;
  attachListeners.call(this, onDelete, onEdit)
}

ListItem.prototype = {

  getDOM: function () {
    return this.dom;
  },

  getID: function () {
    return this.id;
  },

  getName: function () {
    return this.name;
  },

  setName: function (name) {
    this.name = name
    this.nameDom.textContent = name
  }

}

function attachListeners (onDelete, onEdit) {

  const listItem = this

  this.deleteButton.addEventListener('click', () => onDelete(listItem.id))
  this.nameDom.addEventListener('click', () => onEdit(listItem.id))

}

window.ListItem = ListItem;