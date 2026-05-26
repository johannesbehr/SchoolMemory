let scholars = [];
let selectedCard = null;
let revealed = new Set();
let solved = new Set();
let numberOfScholars = 0;


const board = document.getElementById("board");
const nameButtons = document.getElementById("nameButtons");
const status = document.getElementById("status");

async function init() {
  const res = await fetch("data/scholars.json");
  scholars = await res.json();

  // nur 9 nehmen
  scholars = shuffle([...scholars]).slice(0, 9);
  numberOfScholars = scholars.length;

  renderBoard();
  renderButtons();
}

function renderBoard() {
  board.innerHTML = "";

  scholars.forEach((person, index) => {
    const card = document.createElement("div");
    card.className = "card";
    card.dataset.index = index;

    const img = document.createElement("img");
    img.src = `data/${person.lastname}, ${person.firstname}.png`;

    card.appendChild(img);

    card.addEventListener("click", () => selectCard(index));

    board.appendChild(card);
  });
}

function renderButtons() {
  nameButtons.innerHTML = "";

  shuffle([...scholars]).forEach(person => {
    const btn = document.createElement("button");
    btn.className = "name-btn";
    btn.textContent = `${person.firstname} ${person.lastname}`;

    btn.addEventListener("click", () => guess(person, btn));

    nameButtons.appendChild(btn);
  });
}

function selectCard(index) {
  if (solved.has(index)) return;

  // wenn bereits eine Karte aktiv ist und falsch geraten wurde → reset erlaubt
  selectedCard = index;

  const card = board.children[index];
  card.classList.add("revealed");

  revealed.add(index);
}

function guess(person, btn) {
  if (selectedCard === null) return;

  const correctPerson = scholars[selectedCard];

  if (
    person.firstname === correctPerson.firstname &&
    person.lastname === correctPerson.lastname
  ) {
    // richtig
    btn.classList.add("correct");
    btn.disabled = true;

    solved.add(selectedCard);
    status.textContent = "Richtig!";

    selectedCard = null;

    checkWin();
  } else {
    // falsch → Karte wieder verdecken
    const card = board.children[selectedCard];
    card.classList.remove("revealed");

    status.textContent = "Falsch!";

    selectedCard = null;
  }
}

function checkWin() {
  if (solved.size === numberOfScholars) {
    status.textContent = "🎉 Spiel beendet!";
  }
}

function shuffle(arr) {
  return arr.sort(() => Math.random() - 0.5);
}

init();