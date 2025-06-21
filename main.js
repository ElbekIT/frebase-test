// Firebase kutubxonalarini import qilish
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getDatabase, ref, set, onValue } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-database.js";

// Firebase konfiguratsiyasi
const firebaseConfig = {
  apiKey: "AIzaSyB1KIzGCvifH-lzNzOtY0F__AL6PU7_B_Y",
  authDomain: "elbekproductions.firebaseapp.com",
  databaseURL: "https://elbekproductions-default-rtdb.firebaseio.com",
  projectId: "elbekproductions",
  storageBucket: "elbekproductions.appspot.com",
  messagingSenderId: "467619718063",
  appId: "1:467619718063:web:f370881cffbb396899c55a",
  measurementId: "G-Y46P6R2H8V"
};

// Firebase’ni boshlash
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

// Foydalanuvchini saqlash funksiyasi
window.saveUser = function () {
  const userId = document.getElementById("userId").value.trim();
  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();

  if (!userId || !name || !email) {
    alert("Barcha maydonlarni to'ldiring!");
    return;
  }

  set(ref(db, "users/" + userId), {
    username: name,
    email: email,
  })
  .then(() => {
    alert("Ma'lumot saqlandi!");
    document.getElementById("userId").value = "";
    document.getElementById("name").value = "";
    document.getElementById("email").value = "";
  })
  .catch((error) => {
    alert("Xatolik: " + error);
  });
};

// Reyting (foydalanuvchilar ro'yxati)ni o'qish va ko‘rsatish funksiyasi
window.loadUsers = function () {
  const usersRef = ref(db, "users/");
  const listDiv = document.getElementById("usersList");
  listDiv.innerHTML = "Yuklanmoqda...";

  onValue(usersRef, (snapshot) => {
    const data = snapshot.val();
    listDiv.innerHTML = ""; // tozalash

    if (data) {
      Object.keys(data).forEach((id, index) => {
        const user = data[id];
        const div = document.createElement("div");
        div.innerHTML = `<strong>${index + 1}. ${user.username}</strong> (${user.email})`;
        listDiv.appendChild(div);
      });
    } else {
      listDiv.innerHTML = "Hali hech kim ro‘yxatdan o‘tmagan.";
    }
  });
};
