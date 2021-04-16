// 변수 초기화 
const GAME_TIME = 10;
let score;
let isPlaying = false;
let timeInterval;
let checkInterval;
let time = GAME_TIME;
let words = [];
const wordInput = document.querySelector('.word-input');
const wordDisplay = document.querySelector('.word-display');
const scoreDisplay = document.querySelector('.score');
const timeDisplay = document.querySelector('.time');
const button = document.querySelector('.button');

init();

function init(){
  time = 0;
  buttonChange('Loading...')
  getWords();
  wordInput.addEventListener('input', checkMatch)
}

// 게임 실행 
function run(){
  if(isPlaying){
    return;
  }
  score = 0;
  isPlaying = true;
  time = GAME_TIME;
  wordInput.focus();
  scoreDisplay.innerText = 0;
  timeInterval = setInterval(countDown, 10000);
  checkInterval = setInterval(checkStatus, 50); // 상태 체크 
  buttonChange('ing...')
}

function checkStatus(){
  if(!isPlaying && time === 0){
    buttonChange("Game Start")
    clearInterval(checkInterval)
    alert(score)
  }
}

// 단어 불러오기 
function getWords(){
  // axios 사용 -> 랜덤한 단어 불러오기 
  axios.get('https://random-word-api.herokuapp.com/word?number=100')
    .then(function (response) {
      response.data.forEach((word)=>{
       if(word.length < 10){
          words.push(word);
          console.log(word)
       }
      })
      buttonChange('Game Start');
      // handle success
    })
    .catch(function (error) {
      // handle error
      console.log(error);
    })
    .then(function () {
      // always executed
    });
}

// 단어 일치하는지 체크 
// display word와 input word가 일치하면 score 1씩 증가 
function checkMatch(){
  if(wordInput.value.toLowerCase() === wordDisplay.innerText.toLowerCase()){
    wordInput.value = "";
    if(!isPlaying){ // 게임실행중이 아닌경우 
      score = 0;
      return;
    }
    score++;
    scoreDisplay.innerText = score;
    time = GAME_TIME;
    const randomIndex = Math.floor(Math.random() * words.length);
    wordDisplay.innerText = words[randomIndex] // 배열에 저장된 단어들을 랜덤하게 불러와 word-display에 뿌려줌 
  }
}

setInterval(countDown, 1000);
buttonChange('Game Start');

function countDown(){
  time > 0 ? time-- : isPlaying = false;
  if(!isPlaying){
    clearInterval(timeInterval) // isPlaying === false인 경우 게임 종료
  }
  timeDisplay.innerText = time;
}

function buttonChange(text){
  button.innerText = text;
  text === 'Game Start' ? button.classList.remove('loading') : 
  button.classList.add('loading');
}