function Player(username, playerType){
  this.name = username;
  this.type = playerType;
  this.cards = [];
  this.total = function(){
    return this.cards.reduce((result, cardObj) => result + cardObj.value, 0);
  };
  this.score = {
    loose: 0,
    win: 0,
    draw: 0
  }
}

Player.prototype.move = function(card, playerUIMapObj){
  // ADD NEW CARD TO PLAYER OBJECT
  this.cards.push(card);

  // ADD NEW CARD TO UI
  const elImg = document.createElement('img');
  elImg.src = card.img;
  playerUIMapObj.cards.appendChild(elImg);

  // ADD TOTAL TO UI
  playerUIMapObj.total.innerText = this.total();
};

// RESTART ALL NEEDED FOR NEW GAME
Player.prototype.restart = function(playerUIMapObj){
  this.cards.length = 0;
  playerUIMapObj.cards.innerText = '';
  playerUIMapObj.total.innerText = 0;
};