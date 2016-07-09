var NAME = "Crazy Penguins";
module.exports = {

  VERSION: "0.0.6",

  bet_request: function (game_state, bet) {
    var player = game_state.players[game_state.in_action];

    function getMinBetForKeepPlaying(){
          return game_state.players.reduce(function (p, n) { return n.bet > p ? n.bet : p }, 0);
          }


    function isCardNotEmpty(){
      return player.hole_cards[0] && player.hole_cards[1];
    }

    function isPairCards(){
      return player.hole_cards[0].rank == player.hole_cards[1].rank;
    }

    var minBet = getMinBetForKeepPlaying();

    if (isCardNotEmpty() && isPairCards()) {
      //All in!
      bet(player.stack);
    } else if (minBet < player.stack / 10) {
      bet(minBet + game_state.minimum_raise);
    } else {
      bet(0);
    }
  },

  showdown: function (game_state) {

  }
};
