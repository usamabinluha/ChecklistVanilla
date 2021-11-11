function getTemplate(id) {
  const template = document.getElementById(id);
  const content = template.content;
  return content.cloneNode(true)
}

window.getTemplate = getTemplate;