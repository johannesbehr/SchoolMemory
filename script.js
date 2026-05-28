let scholars = [];
let selectedCard = null;
let revealed = new Set();
let solved = new Set();
let numberOfScholars = 0;
let dataPath = "data/";

const board = document.getElementById("board");
const nameButtons = document.getElementById("nameButtons");
const status = document.getElementById("status");
const overlay = document.getElementById("overlay");
const overlayTitle = document.getElementById("overlayTitle");
const overlayText = document.getElementById("overlayText");
const restartBtn = document.getElementById("restartBtn");

const sound_ding = new Audio("sounds/ding.mp3");
const sound_buzzer = new Audio("sounds/buzzer.mp3");
const sound_applause = new Audio("sounds/applause.mp3");

let fehler = 0;

async function init() {
	
  const res = await fetch(dataPath + "scholars.json");
  scholars = await res.json();

  // nur 9 nehmen
  scholars = shuffle([...scholars]);
  numberOfScholars = scholars.length;
  
  fehler = 0;

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

board.style.gridTemplateColumns =
  `repeat(${size}, minmax(60px, 1fr))`;


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

    if(!checkWin()){
		sound_ding.currentTime = 0;
		sound_ding.play();
	};
  } else {
    // falsch → Karte wieder verdecken
    const card = board.children[selectedCard];
    card.classList.remove("revealed");
		sound_buzzer.currentTime = 0;
		sound_buzzer.play();
    status.textContent = "Falsch!";
	fehler ++;
    selectedCard = null;
  }
}

function checkWin() {
  if (solved.size === numberOfScholars) {
    status.textContent = "🎉 Spiel beendet!";
	
	sound_applause.currentTime = 0;
	sound_applause.play();
	
	showOverlay(
	  "🎉 Spiel beendet!",
	  "Alle Schüler wurden richtig erkannt.<br>" + "Fehler: " + fehler
	);
	return true;
  }
  return false;
}

function shuffle(arr) {
  return arr.sort(() => Math.random() - 0.5);
}

// Source - https://stackoverflow.com/a/10627148
// Posted by Zuul, modified by community. See post 'Timeline' for change history
// Retrieved 2026-05-26, License - CC BY-SA 3.0

function toggleFullScreen() {
  if ((document.fullScreenElement && document.fullScreenElement !== null) ||    
   (!document.mozFullScreen && !document.webkitIsFullScreen)) {
    if (document.documentElement.requestFullScreen) {  
      document.documentElement.requestFullScreen();  
    } else if (document.documentElement.mozRequestFullScreen) {  
      document.documentElement.mozRequestFullScreen();  
    } else if (document.documentElement.webkitRequestFullScreen) {  
      document.documentElement.webkitRequestFullScreen(Element.ALLOW_KEYBOARD_INPUT);  
    }  
  } else {  
    if (document.cancelFullScreen) {  
      document.cancelFullScreen();  
    } else if (document.mozCancelFullScreen) {  
      document.mozCancelFullScreen();  
    } else if (document.webkitCancelFullScreen) {  
      document.webkitCancelFullScreen();  
    }  
  }  
}

function showOverlay(title, text) {
  overlayTitle.innerHTML = title;
  overlayText.innerHTML = text;
  overlay.classList.remove("hidden");
}

function hideOverlay() {
  overlay.classList.add("hidden");
}

restartBtn.addEventListener("click", () => {
  location.reload();
});


init();