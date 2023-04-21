/*
  Advices
  - Always Check The Console
  - Take Your Time To Name The Identifiers
  - DRY

  Steps To Create The Project
  [01] Create HTML Markup
  [02] Add Styling And Separate From Logic
  [03] Create The App Logic
  ---- [01] Add Levels.
  ---- [02] Show Level And Seconds.
  ---- [03] Add Array Of Words.
  ---- [04] ِAdd Start Game Button.
  ---- [05] Generate Upcoming Words
  ---- [06] Disable Copy Word And Paste Event + Focus On Input
  ---- [07] Start Play Function
  ---- [08] Start The Time And Count Score
  ---- [09] Add The Error And Success Messages
  [04] Your Trainings To Add Features
  ---- [01] Save Score To Local Storage With Date
  ---- [02] Choose Levels From Select Box
  ---- [03] Break The Logic To More Functions
  ---- [04] Choose Array Of Words For Every Level
  ---- [05] Write Game Instruction With Dynamic Values
  ---- [06] Add 3 Seconds For The First Word
*/
let words = [
  "Hello",
  "Programming",
  "Code",
  "Javascript",
  "Town",
  "Country",
  "Testing",
  "Youtube",
  "Linkedin",
  "Twitter",
  "Github",
  "Leetcode",
  "Internet",
  "Python",
  "Scala",
  "Love",
  "Paradigm",
  "Styling",
  "Cascade",
  "Abdalla",
  "Coding",
  "Funny",
  "Working",
  "Sugar",
  "Task",
  "Runner",
  "Roles",
  "Test",
  "Rust",
  "Playing",
];
// Setting Levels
const lvls = {
  Easy: 9,
  Normal: 6,
  Hard: 3,
};
let selectlvl = document.querySelector(".select-lvl");
let secondsShow = document.querySelector(".seconds");
let defaultLvl = "Normal";
let playButton = document.querySelector(".start");
let theWordDiv = document.querySelector(".the-word");
let input = document.querySelector(".input");
let upComingWords = document.querySelector(".upcoming-words");
let timeLfet = document.querySelector(".time span");
let score = document.querySelector(".got");
let total = document.querySelector(".total");
let finish = document.querySelector(".finish");
secondsShow.innerHTML = lvls[defaultLvl];
selectlvl.value = "Normal";
timeLfet.innerHTML = secondsShow.innerHTML;
selectlvl.addEventListener("change", function () {
  secondsShow.innerHTML = lvls[selectlvl.value];
  timeLfet.innerHTML = secondsShow.innerHTML;
});
total.innerHTML = 30;
input.onpaste = function () {
  return false;
};

//
playButton.onclick = function (e) {
  this.remove();
  input.focus();
  genWords();
};
function genWords() {
  let randomWord = words[Math.floor(Math.random() * words.length)];
  let wordIndex = words.indexOf(randomWord);
  theWordDiv.innerHTML = randomWord;
  showingRest(wordIndex);
  playGame();
}
function showingRest(wordIndex) {
  upComingWords.innerHTML = "";
  words.splice(wordIndex, 1);
  words.forEach((word) => {
    let div = document.createElement("div");
    div.innerHTML = word;
    upComingWords.appendChild(div);
  });
}
function playGame() {
  secondsShow.innerHTML = lvls[selectlvl.value];
  timeLfet.innerHTML = secondsShow.innerHTML;
  let Counter = window.setInterval(() => {
    secondsShow.innerHTML--;
    timeLfet.innerHTML--;
    if (timeLfet.innerHTML == 0) {
      window.clearInterval(Counter);
      if (input.value.toLowerCase() == theWordDiv.innerHTML.toLowerCase()) {
        input.value = "";
        score.innerHTML++;
        if (words.length > 0) {
          genWords();
        } else {
          let span = document.createElement("span");
          span.className = "good";
          span.innerHTML = "Congratulation";
          finish.appendChild(span);
        }
      } else {
        let span = document.createElement("span");
        span.className = "bad";
        span.innerHTML = "Game Over";
        let inSpan = document.createElement("span");
        inSpan.innerHTML = `Your Score is ${score.innerHTML}`;
        span.appendChild(inSpan);
        finish.appendChild(span);
      }
    }
  }, 1000);
}
let InstructionDiv = document.createElement("div");
InstructionDiv.className = "inst";
let span = document.createElement("span");
span.className = "inst-head";
span.innerHTML = "Game Instructions";
InstructionDiv.appendChild(span);
let secSpan = document.createElement("span");
secSpan.className = "inst-content";
secSpan.innerHTML = `You have to choose one of the three available Levels :[Easy , Normal ,hard] and then Click start playing,
each level has a number of seconds shown above for examvle easy level give you 9 seconds , you have to write the word before 
the seconds become zero , if you wrote the 30 words you will win the game else if you missed 
just one word you will lose , have fun 
`;
InstructionDiv.appendChild(secSpan);
document.querySelector(".game").appendChild(InstructionDiv);
