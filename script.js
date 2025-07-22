const db = firebase.database();
let currentUser = null;

function signup() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  firebase.auth().createUserWithEmailAndPassword(email, password)
    .then(() => alert("Signup Success"))
    .catch(e => alert("Signup Error: " + e.message));
}

function login() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  firebase.auth().signInWithEmailAndPassword(email, password)
    .then(() => alert("Login Success"))
    .catch(e => alert("Login Error: " + e.message));
}

function logout() {
  firebase.auth().signOut();
}

firebase.auth().onAuthStateChanged(user => {
  if (user) {
    currentUser = user;
    document.getElementById("noteSection").style.display = "block";
    loadNotes();
  } else {
    currentUser = null;
    document.getElementById("noteSection").style.display = "none";
  }
});

function addNote() {
  const input = document.getElementById("noteInput");
  const noteText = input.value.trim();
  if (noteText && currentUser) {
    const ref = db.ref("users/" + currentUser.uid + "/notes").push();
    ref.set({ text: noteText });
    input.value = "";
  }
}

function deleteNote(noteId) {
  if (currentUser) {
    db.ref("users/" + currentUser.uid + "/notes/" + noteId).remove();
  }
}

function loadNotes() {
  const list = document.getElementById("notesList");
  const ref = db.ref("users/" + currentUser.uid + "/notes");
  ref.on("value", snapshot => {
    list.innerHTML = "";
    snapshot.forEach(child => {
      const li = document.createElement("li");
      li.innerHTML = `
        ${child.val().text}
        <button onclick="deleteNote('${child.key}')">❌</button>
      `;
      list.appendChild(li);
    });
  });
}
