const gameControl = (function(GM){
  const dealer = new Player('House', 'dealer');
  let player = {};
  const waitForAlertMs = 30;
  
  // INITIALIZE GAME
  function init(){
    GM.ui.btnHit.click(hit);
    GM.ui.btnStop.click(stop);

    let playerName = '' //prompt("Choose your username");
    player = new Player(playerName || 'default user', 'player');
    GM.ui.table.player.name.innerText = player.name;
  }

  function commandsDisabled(toDisable){
    GM.ui.btnHit[0].disabled = toDisable;
    GM.ui.btnStop[0].disabled = toDisable;
  }

  // NEW CARD LOGIC FROM CARDS MAP
  function newCard(player){
    const randomNum = Math.floor(Math.random() * 13);
    const card = Object.assign({}, GM.cards[randomNum]);
    
    if(card.name === 'ace'){
      if (player.total() + card.value[1] <= 21) {
        card.value = card.value[1];
      } else {
        card.value = card.value[0];
      }
    }

    return card;
  }

  // PROMISE FOR BOT OR PLAYER NEW HAND (USED IN FN hit AND stop)
  function promiseHand() {
    return new Promise(function(resolve, reject){
      const card = newCard(this);
      this.move(card, GM.ui.table[this.type]);
      resolve(this.total());
    }.bind(this));
  }

  // PLAYER PICK NEW CARD
  function hit(){
    const hand = promiseHand.call(player);

    hand.then(playerTotal => {
      setTimeout(()=> {
        if (playerTotal > 21) return endGame(0);
      }, waitForAlertMs);
    });
  }
  
  // ACTIVATE BOT PART OF A GAME
  function stop(){
    commandsDisabled(true);

    const bot = setInterval(function(){
      const hand = promiseHand.call(dealer);

      hand.then(total => {
        setTimeout(() => {
          if (total > 21) {
            clearInterval(bot);
            return endGame(1);
          }
          if (total > player.total() || total === 21){
            clearInterval(bot);
            return calculateWinner();
          }
        }, waitForAlertMs);
      });
    }, 1000);
  }

  // FUNCTION FOR RESTARTING GAME
  function endGame(status){
    const gameStatus = GM.gameStatus[status];
    alert(gameStatus.message);

    gameStatus.scoreBoard.innerText = updateScoreBoard(status);
    player.restart(GM.ui.table.player);
    dealer.restart(GM.ui.table.dealer);
    commandsDisabled(false);
  }

  // PART OF CALCULATION WINNER LOGIC
  function calculateWinner(){
    /* 0 - loose, 1 - win, 2 - draw */
    const dt = dealer.total();
    const pt = player.total();
    switch (true) {
      case pt < dt: return endGame(0);
      case pt > dt: return endGame(1);
      case pt === dt: return endGame(2);
      default: return;
    }
  }

  // DATA FOR SCORE BOARD UPDATE
  function updateScoreBoard(status){
    switch (status) {
      case 0: return player.score.loose += 1;
      case 1: return player.score.win += 1;
      case 2: return player.score.draw += 1;
      default: return 0;
    }
  }

  // REVEAL MODULE
  return {
    init
  };

})(gameMap);