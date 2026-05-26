let scholars = [];
let selectedCard = null;
let revealed = new Set();
let solved = new Set();
let numberOfScholars = 0;
let dataPath = "data/";
//let dataPath = "/_internal/SchoolMemory/EIS253/";


const board = document.getElementById("board");
const nameButtons = document.getElementById("nameButtons");
const status = document.getElementById("status");

async function init() {
  const res = await fetch(dataPath + "scholars.json");
  scholars = await res.json();

  // nur 9 nehmen
  scholars = shuffle([...scholars]);
  numberOfScholars = scholars.length;

  renderBoard();
  renderButtons();
}

function getGridSize(n) {
  return Math.ceil(Math.sqrt(n));
}

function getGridCount(n) {
  const size = getGridSize(n);
  return size * size;
}

function prepareGridData(scholars) {
  const size = getGridSize(scholars.length);
  const gridCount = size * size;

  const shuffled = shuffle([...scholars]);

  // auffüllen falls nötig (mit null-Karten)
  //while (shuffled.length < gridCount) {
   // shuffled.push(null);
 // }

  return { data: shuffled, size };
}

function renderBoard() {
  board.innerHTML = "";

	const { data, size } = prepareGridData(scholars);
	
	const cardWidth = window.innerWidth <= 800 ? 80 : 120;
	board.style.gridTemplateColumns = `repeat(${size}, ${cardWidth}px)`;
	board.style.rowTemplateColumns = `repeat(${size}, ${cardWidth}px)`;


  scholars.forEach((person, index) => {
    const card = document.createElement("div");
    card.className = "card";
    card.dataset.index = index;

    const img = document.createElement("img");
    
	if(person.picture){
		img.src = `${dataPath}${person.picture}`;
	}else{
		img.src = `${dataPath}${person.lastname}, ${person.firstname}.png`;
	}
	

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
    btn.textContent = `${person.lastname}, ${person.firstname}`;

    btn.addEventListener("click", () => guess(person, btn));

    nameButtons.appendChild(btn);
  });
}

function selectCard(index) {
  if (solved.has(index)) return;

  // wenn bereits eine Karte aktiv ist und falsch geraten wurde → reset erlaubt
  if(!selectedCard){
	  selectedCard = index;

	  const card = board.children[index];
	  card.classList.add("revealed");

	  revealed.add(index);
  }
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