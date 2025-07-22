function addNote() {
  const input = document.getElementById("noteInput");
  const noteText = input.value;

  if (noteText.trim() !== "") {
    const list = document.getElementById("notesList");
    const li = document.createElement("li");
    li.innerText = noteText;
    list.appendChild(li);
    input.value = "";
  }
}
