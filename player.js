var NAME = "Crazy Penguins";
module.exports = {

  VERSION: "0.0.1",

  bet_request: function (game_state, bet) {
    //var player = game_state.players[]
    var maxbet = game_state.players.reduce(function (p, n) { return n.bet > p ? n.bet : p }, 0);
    bet(maxbet + game_state.minimum_raise);
  },

  showdown: function (game_state) {

  }
};
