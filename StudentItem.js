function StudentItem(id, name, onDelete, onEdit) {
  this.id                   = id;
  this.name                 = name;
  this.dom                  = getTemplate('list-item-template').querySelector('.student-item')
  this.nameDom              = this.dom.querySelector('.name')
  this.deleteButton         = this.dom.querySelector('.delete')
  this.nameDom.textContent  = name;
  attachListeners.call(this, onDelete, onEdit)
}

StudentItem.prototype = {

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

  const studentItem = this

  this.deleteButton.addEventListener('click', () => onDelete(studentItem.id))
  this.nameDom.addEventListener('click', () => onEdit(studentItem.id))

}

window.StudentItem = StudentItem;