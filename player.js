var NAME = "Crazy Penguins";
module.exports = {

  VERSION: "0.0.4",

  bet_request: function (game_state, bet) {
    var player = game_state.players[game_state.in_action];
    var maxbet = game_state.players.reduce(function (p, n) { return n.bet > p ? n.bet : p }, 0);

    if (player.hole_cards[0].rank == player.hole_cards[1].rank) {
      bet(maxbet + game_state.minimum_raise);
    } else {
      bet(game_state.minimum_raise);
    }
  },

  showdown: function (game_state) {

  }
};
