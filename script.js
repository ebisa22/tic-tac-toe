
const gameApp=(function (){

  const gameBoard = {
    gameBoxes: [],
    currentPlayer: "",
    gameCount:0,
    roundCount:0,
    player1: {
      name: "Player 1",
      value: "x",
      score: 0,
    },
    player2: {
      name: "Player 2",
      value: "o",
      score: 0,
    },
    isGameEnded:false,
  };
  //IIF to constantly check for game ending
   
  //Init function
  function init() {
    bindEvent();
  }
  //cacheDom object
  const cacheDom = {
    gameContainer: document.querySelector("#game-board-container"),
    signBtn: document.querySelector("#sign-btn"),
    howBtn: document.querySelector("#description-btn"),
    signDialog: document.querySelector("#sign"),
    infoDialog: document.querySelector("#description"),
    enterBtn: document.querySelector("#enter-btn"),
    playerOneInput: document.querySelector("#first"),
    playerTwoInput: document.querySelector("#second"),
    playerOneName: document.querySelector("p.first-name"),
    playerTwoName: document.querySelector("p.second-name"),
    cancelBtns: document.querySelectorAll(".dialog-close"),
    startBtn: document.querySelector("#start-btn"),
    announceDialog: document.querySelector("#announce"),
    boxes:document.querySelectorAll('div.box'),
    announceText: document.querySelector("#announce-para"),
    descriptionDialog: document.querySelector("#description"),
  };
  //toggle players function
  function togglePlayers() {
    if (gameBoard.currentPlayer == "") {
      gameBoard.currentPlayer = "x";
      cacheDom.playerOneName.classList.toggle('turn-on')
      return;
    }
    if (gameBoard.currentPlayer == "x") {
      gameBoard.currentPlayer = "o";
      cacheDom.playerOneName.classList.toggle('turn-on');
      cacheDom.playerTwoName.classList.toggle('turn-on');
 
    }
     else{
       gameBoard.currentPlayer = "x";
      cacheDom.playerOneName.classList.toggle("turn-on");
      cacheDom.playerTwoName.classList.toggle("turn-on");
     }
 
  }
  //eventListener
  function bindEvent() {
    cacheDom.signBtn.addEventListener("click", showSignForm);
    cacheDom.howBtn.addEventListener("click", showInfoGame);
    cacheDom.enterBtn.addEventListener("click", enterPlayersName);
    for (const btn of cacheDom.cancelBtns) {
      btn.addEventListener("click", closeDialog);
    }
    cacheDom.startBtn.addEventListener("click", startRound);
    cacheDom.gameContainer.addEventListener("click", playStep);
    cacheDom.announceDialog.addEventListener('click',closeAnnounce);
    cacheDom.signDialog.addEventListener('click',closeSignDialog);
    cacheDom.descriptionDialog.addEventListener('click',closeDescription);
  }
  //close the sign and how dialog function
 function closeSignDialog(e){
  const dimensionDialog=cacheDom.signDialog.getBoundingClientRect();
  if(
    e.clientX>dimensionDialog.right||
    e.clientX<dimensionDialog.left ||
    e.clientY>dimensionDialog.bottom
  ){
     cacheDom.signDialog.close();
  }

 }
 //close the description dialog function
 function closeDescription(e){
  const dimensionDialog = cacheDom.descriptionDialog.getBoundingClientRect();
  if (
    e.clientX > dimensionDialog.right ||
    e.clientX < dimensionDialog.left ||
    e.clientY > dimensionDialog.bottom
  ) {
     cacheDom.descriptionDialog.close();

  }
 }
  //playStep function
  function playStep(e) {
    if(!e.target.classList.contains('box'))
        return;
    if(e.target.textContent=='X'||e.target.textContent=='O')
      return;
    const boxNumber = +(e.target.dataset.value);
    const currentPlayer = gameBoard.currentPlayer;
    if (currentPlayer == "") 
        return;
    else if (currentPlayer == "x")
      gameBoard.gameBoxes[boxNumber - 1] = "x";
    else 
        gameBoard.gameBoxes[boxNumber - 1] = "o";
    renderBox(currentPlayer,boxNumber);
  }
  //render winner function-- looks for winners
  function renderWinner(){
      let winner;
      //check if the gameEnded and is tie
      if(
        gameBoard.gameBoxes[0]==gameBoard.gameBoxes[1]&&gameBoard.gameBoxes[1]==gameBoard.gameBoxes[2] &&gameBoard.gameBoxes[2]!=undefined||
        gameBoard.gameBoxes[3]==gameBoard.gameBoxes[4]&&gameBoard.gameBoxes[4]==gameBoard.gameBoxes[5] &&gameBoard.gameBoxes[5]!=undefined||
        gameBoard.gameBoxes[6]==gameBoard.gameBoxes[7]&&gameBoard.gameBoxes[7]==gameBoard.gameBoxes[8] &&gameBoard.gameBoxes[8]!=undefined||
        gameBoard.gameBoxes[0]==gameBoard.gameBoxes[3]&&gameBoard.gameBoxes[3]==gameBoard.gameBoxes[6] &&gameBoard.gameBoxes[6]!=undefined||
        gameBoard.gameBoxes[1]==gameBoard.gameBoxes[4]&&gameBoard.gameBoxes[4]==gameBoard.gameBoxes[7] &&gameBoard.gameBoxes[7]!=undefined||
        gameBoard.gameBoxes[2]==gameBoard.gameBoxes[5]&&gameBoard.gameBoxes[5]==gameBoard.gameBoxes[8] &&gameBoard.gameBoxes[8]!=undefined||
        gameBoard.gameBoxes[0]==gameBoard.gameBoxes[4]&&gameBoard.gameBoxes[4]==gameBoard.gameBoxes[8] &&gameBoard.gameBoxes[8]!=undefined||
        gameBoard.gameBoxes[2]==gameBoard.gameBoxes[4]&&gameBoard.gameBoxes[4]==gameBoard.gameBoxes[6] &&gameBoard.gameBoxes[6]!=undefined
    ){
         winner=gameBoard.currentPlayer;
         displayWinner(winner);
    }
    else{
       gameBoard.gameCount++;
    }
   
  }
//display winner function
function displayWinner(winner){
    if(winner=='x'){
       gameBoard.player1.score++;
       cacheDom.announceText.textContent = ` 🎉🎉🎉 ${gameBoard.player1.name} won ! Score ${gameBoard.player1.score} - ${gameBoard.player2.score}`;
       gameBoard.roundCount++;
    }
    else if(winner=='o'){
          gameBoard.player2.score++;
         cacheDom.announceText.textContent = `🎉🎉🎉 ${gameBoard.player2.name} won ! Score ${gameBoard.player1.score} - ${gameBoard.player2.score}`;
       gameBoard.roundCount++;
    }
    else if(winner=='No Winner'){
      cacheDom.announceText.textContent = `It was a tie, Score ${gameBoard.player1.score} - ${gameBoard.player2.score}`;
       gameBoard.roundCount++;
    }
    else if (winner=="overall") {
      if (gameBoard.player1.score > gameBoard.player2.score) {
        cacheDom.announceText.textContent = ` 🎉🎉🎉 Game Over ${gameBoard.player1.name} won ! Score ${gameBoard.player1.score} - ${gameBoard.player2.score}, Start Again`;
      } 
      else if (gameBoard.player1.score < gameBoard.player2.score) {
        cacheDom.announceText.textContent = ` 🎉🎉🎉 Game Over ${gameBoard.player2.name} won ! Score ${gameBoard.player1.score} - ${gameBoard.player2.score}, Start Again`;
      } 
      else if (gameBoard.player1.score == gameBoard.player2.score) {
        cacheDom.announceText.textContent = ` 🎉🎉🎉 Game Over It was a draw, Score ${gameBoard.player1.score} - ${gameBoard.player2.score}, Start Again`;
      }
   
    }
 
   cacheDom.announceDialog.showModal();
}
 // renders and add color to boxes 
 function renderBoxColor(){
    cacheDom.boxes.forEach((box)=>{
       if(box.textContent=='X'){
        box.style.color = "#DC0E0E";
       }
       else if (box.textContent=='O'){
        box.style.color = "#0046FF";
       }
    })
 }
  //render box function
  function renderBox(currentPlayer,boxNumber){
    if(currentPlayer=='x')
  cacheDom.gameContainer.querySelector(`[data-value="${boxNumber}"]`).textContent='X';
   else if(currentPlayer=='o')
   cacheDom.gameContainer.querySelector(`[data-value="${boxNumber}"]`).textContent='O';
    renderBoxColor();
    renderWinner();
    if(gameBoard.gameCount==9){
        displayWinner('No Winner')
    }
   togglePlayers();
  }
  //start round function
  function startRound(e) {
    //change start button to reset button
       if (e.target.textContent == "Start Game"){
        e.target.textContent='Reset';
       }
       else if(e.target.textContent=='Reset'){
        resetBoard();
        e.target.textContent='Start Game';
        return;
       }
         cacheDom.playerOneName.style.visibility = `visible`;
         cacheDom.playerTwoName.style.visibility = `visible`;
    togglePlayers();
  }
 
  //close dialog function
  function closeDialog(e) {
    e.target.closest("dialog.extra-info").close();
  }
  //showModalFunctions
  function showSignForm() {
    cacheDom.signDialog.showModal();
  }
  //Enter Players NAME
  function enterPlayersName(e) {
    e.preventDefault();
    if (
      cacheDom.playerOneInput.value == "" ||
      cacheDom.playerTwoInput.value == ""
    )
      return 1;
    gameBoard.player1.name = cacheDom.playerOneInput.value;
    gameBoard.player2.name = cacheDom.playerTwoInput.value;
    cacheDom.signDialog.close();
    cacheDom.playerOneInput.value = "";
    cacheDom.playerTwoInput.value = "";
    render();
  }
  //show info dialog
  function showInfoGame() {
    cacheDom.infoDialog.showModal();
  }
  //render function
  function render() {
    cacheDom.playerOneName.textContent = gameBoard.player1.name;
    cacheDom.playerTwoName.textContent = gameBoard.player2.name;
  }
  //resetBoard function
  function resetBoard(){
       gameBoard.gameBoxes=[];
       gameBoard.currentPlayer='';
       gameBoard.gameCount=0;
       //clear all boxes
       const clearBoxes=cacheDom.gameContainer.querySelectorAll('.box');
       clearBoxes.forEach((box)=>{
        box.textContent='';
       });
        cacheDom.playerOneName.removeAttribute('style');
        cacheDom.playerTwoName.removeAttribute('style');
        cacheDom.playerOneName.classList.remove("turn-on");
        cacheDom.playerTwoName.classList.remove('turn-on');

       renderOverallWinner();
       if(gameBoard.isGameEnded){
        gameBoard.player1.score=0;
        gameBoard.player2.score=0;
        gameBoard.roundCount=0;
        gameBoard.isGameEnded=false;
       }
    
  }
  //announce dialog close
  function closeAnnounce(e){
     let dimensionDialog=cacheDom.announceDialog.getBoundingClientRect();
     let isClickedBelow=e.clientY>dimensionDialog.bottom;
      if (e.target.classList.contains("announce-close") || isClickedBelow) {
        cacheDom.announceDialog.close();
        resetBoard();
        cacheDom.startBtn.textContent='Start Game';
      }
  }
  //render overall winner
  function renderOverallWinner(){
    const rounds=gameBoard.roundCount;
 
    if(rounds==3){
        displayWinner("overall");
        gameBoard.isGameEnded=true;
    }
  }
  //INIT Function invoked
  return {init};
})();
 gameApp.init();
//window event listener for introduction
 const introDialog=(function(){
   function init(){
    bindEvent();
   }
   const cacheDom={
     introductionDialog:document.querySelector("#intro-dialog"),
   }
   function bindEvent(){
    window.addEventListener('load',showIntroduction);
    cacheDom.introductionDialog.addEventListener('click',closeIntroDialog);
   }
   function showIntroduction(){
    cacheDom.introductionDialog.showModal();
   }
   function closeIntroDialog(e){
    const dimensionDialog=cacheDom.introductionDialog.getBoundingClientRect();
    const isBelow=e.clientY>dimensionDialog.bottom;
 
    if(isBelow || e.target.classList.contains('intro-dialog-close')){
      cacheDom.introductionDialog.close();
    }
   }
   return{init};
 })();
 
introDialog.init();