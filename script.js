const db = firebase.database();
let currentUser = null;

// 🔐 Signup
function signup() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  firebase.auth().createUserWithEmailAndPassword(email, password)
    .then(() => alert("Signup Success"))
    .catch(error => alert("Signup Error: " + error.message));
}

// 🔓 Login
function login() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  firebase.auth().signInWithEmailAndPassword(email, password)
    .then(() => alert("Login Success"))
    .catch(error => alert("Login Error: " + error.message));
}

// 🚪 Logout
function logout() {
  firebase.auth().signOut()
    .then(() => alert("Logout Success"))
    .catch(error => alert("Logout Error: " + error.message));
}

// 👀 Auth State Checker
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

// 📝 Add Note
function addNote() {
  const noteText = document.getElementById("noteInput").value.trim();
  if (noteText && currentUser) {
    const ref = db.ref("users/" + currentUser.uid + "/notes").push();
    ref.set({ text: noteText });
    document.getElementById("noteInput").value = "";
  }
}

// ❌ Delete Note
function deleteNote(noteId) {
  if (currentUser) {
    db.ref("users/" + currentUser.uid + "/notes/" + noteId).remove();
  }
}

// 📥 Load Notes
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
