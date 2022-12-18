const images = [
    './images/one.jpg',
    './images/one.jpg',
    './images/two.jpg',
    './images/three.jpg',
    './images/three.jpg',
    './images/two.jpg',
    './images/four.jpg',
    './images/four.jpg',
    './images/five.jpg',
    './images/five.jpg',
    './images/six.jpg',
    './images/six.jpg',
    './images/seven.jpg',
    './images/seven.jpg',
    './images/eight.jpg',
    './images/eight.jpg',
    './images/nine.jpg',
    './images/nine.jpg',
    './images/ten.jpg',
    './images/ten.jpg'
]

let starter = document.querySelector('.starting-game');
let startingTime;
let wonderful;
let m;
let s;

let cards = document.getElementById('game-box');
let userChoice = [];
let lifeCounter = 15;
let pointCounter = 0;
let score = document.getElementById("score");
let lives = document.getElementById("lives");

function randomNumber(){
  return Math.floor(Math.random() * images.length);
}

function resetGame(){
  lifeCounter = 15;
  pointCounter = 0;
  cards.innerHTML = "";
  generateCards();
}


function UpdatePointsLives(){
  score.innerHTML = `Score : ${pointCounter}`;
  lives.innerHTML = `<i class="bi bi-heart-fill"></i> : ${lifeCounter}`;
}

function checkImage(){
  let firstCard = userChoice[0];
  let secondCard = userChoice[1];

  let doc1 = document.getElementById(`${firstCard}`).firstChild;
  let doc2 = document.getElementById(`${secondCard}`).firstChild;

 if (doc1.src === doc2.src){
pointCounter += 200;
UpdatePointsLives();
userChoice = [];
setTimeout(() => {cards.classList.toggle('unclickable');},1000);


if (pointCounter === 2000 ){
  saveScore();
  setTimeout(() => {alert("Bravo ! Tu as gagné!");
  alert(`Temps : ${(m < 10) ? `0${m}` : m} : ${(s < 10) ? `0${s}` : s}`);
  }, 1000);
  clearInterval(wonderful);
}

 } else { 
setTimeout(() => {document.getElementById(`${firstCard}`).classList.add('hidden');
document.getElementById(`${secondCard}`).classList.add('hidden');}, 1000);
userChoice = [];
setTimeout(() => {cards.classList.toggle('unclickable');},1000);
lifeCounter--;
UpdatePointsLives();


if (lifeCounter === 0){
  setTimeout(() => {alert("You lost the game, sorry");
  resetGame()}, 1000);
}
}


}

let time = document.getElementById("timer");

let timer = () => {

  let counting = new Date().getTime();


  let difference = counting - startingTime;
  s = Math.floor((difference / 1000) % 60)
  m = Math.floor((difference / (1000 * 60) % 60));
  time.innerHTML = `${(m < 10) ? `0${m}` : m} : ${(s < 10) ? `0${s}` : s}`;

}



function generateCards() {

  startingTime = new Date().getTime();
  wonderful = setInterval(timer, 1000);

/*  let wonderful = images.sort((a,b) => .5 - Math.random());*/

for (let i = images.length - 1; i > 0; i--){
  let j = Math.floor(Math.random() * i);
  let temp = images[i];
  images[i] = images[j];
  images[j] = temp;
}

  let i = 0; 
  for (let elem of images){

    let container = document.createElement('div');
    let kdo = document.createElement('img');
  
    container.classList.add("hidden");
    container.classList.add("card__container");
    container.setAttribute('id', `card${i}`);

    kdo.classList.add("card");
    kdo.src = elem;

    container.appendChild(kdo);
    cards.appendChild(container);

    starter.style.display = "none";
    score.innerHTML = `Score : ${pointCounter}`;
    lives.innerHTML = `<i class="bi bi-heart-fill"></i> : ${lifeCounter}`;
    score.classList.remove("notvisible");
    lives.classList.remove("notvisible");

    i++;
  }
}

starter.addEventListener('click', generateCards);

cards.addEventListener('click', (event) => {
const selection = event.target;

if (selection.id === "game-box"){
} else if (userChoice.length < 1){
  selection.classList.remove('hidden');
  userChoice.push(selection.id);

} else {
      selection.classList.remove('hidden');
      userChoice.push(selection.id);
      cards.classList.toggle('unclickable');
      checkImage();
} 

});


let Leader = document.getElementById("bestScores");
let bestScore = [];
bestScore = JSON.parse(localStorage.getItem("leaderBoard"));

function saveScore(){
  let today = new Date();
  let day = today.getDate();
  let month = today.getMonth();
  bestScore.push(`${day} / ${month +1} - ${(m < 10) ? `0${m}` : m} : ${(s < 10) ? `0${s}` : s}`);
  console.log(bestScore);
  localStorage.setItem("leaderBoard", JSON.stringify(bestScore));
  Leader.innerHTML = bestScore;
}

saveScore();
