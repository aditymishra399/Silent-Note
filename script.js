function addNote() {
  const input = document.getElementById("noteInput");
  const noteText = input.value.trim();

  if (noteText !== "") {
    const list = document.getElementById("notesList");
    const li = document.createElement("li");
    li.innerHTML = `${noteText} <button onclick="deleteNote(this)">❌</button>`;
    list.appendChild(li);
    input.value = "";
    saveNotes();
  }
}

function deleteNote(button) {
  const li = button.parentElement;
  li.remove();
  saveNotes();
}
