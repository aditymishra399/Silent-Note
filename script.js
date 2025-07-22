function saveNotes() {
  const notes = [];
  document.querySelectorAll("#notesList li").forEach(li => {
    const text = li.childNodes[0].textContent.trim();
    notes.push(text);
  });
  localStorage.setItem("notes", JSON.stringify(notes));
}

function loadNotes() {
  const savedNotes = JSON.parse(localStorage.getItem("notes") || "[]");
  savedNotes.forEach(note => {
    const list = document.getElementById("notesList");
    const li = document.createElement("li");
    li.innerHTML = `${note} <button onclick="deleteNote(this)">❌</button>`;
    list.appendChild(li);
  });
}

window.onload = loadNotes;
