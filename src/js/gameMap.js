const gameMap = (function($){
  // UI MAP
  const ui = {
    table: {
      player: {
        name:  $("#player #name")[0],
        cards: $('#player #cards')[0],
        total: $('#player .total span')[0]
      },
      dealer: {
        cards: $('#dealer #cards')[0],
        total: $('#dealer .total span')[0]
      },
  },
    btnHit:  $('#hit'),
    btnStop: $('#stop')
  };

  // CARDS MAP
  const cards = [
    { name: 'two',    img: 'src/images/2.png',  value: 2 },
    { name: 'three',  img: 'src/images/3.png',  value: 3 },
    { name: 'four',   img: 'src/images/4.png',  value: 4 },
    { name: 'five',   img: 'src/images/5.png',  value: 5 },
    { name: 'six',    img: 'src/images/6.png',  value: 6 },
    { name: 'seven',  img: 'src/images/7.png',  value: 7 },
    { name: 'eight',  img: 'src/images/8.png',  value: 8 },
    { name: 'nine',   img: 'src/images/9.png',  value: 9 },
    { name: 'ten',    img: 'src/images/10.png', value: 10 },
    { name: 'jack',   img: 'src/images/J.png',  value: 10 },
    { name: 'quin',   img: 'src/images/Q.png',  value: 10 },
    { name: 'king',   img: 'src/images/K.png',  value: 10 },
    { name: 'ace',    img: 'src/images/A.png',  value: [1, 11] }
  ];

  // GAME STATUS MAP
  const gameStatus = {
    0: { message: 'You loose',    scoreBoard: $('#loose')[0] },
    1: { message: 'You win',      scoreBoard: $('#win')[0] },
    2: { message: `It's a draw`,  scoreBoard: $('#draw')[0] }
  };

  // REVEAL MODULE
  return {
    ui,
    cards,
    gameStatus
  };

})(jQuery);