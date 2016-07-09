var NAME = "Crazy Penguins";
module.exports = {

  VERSION: "0.0.10",

  bet_request: function (game_state, bet) {
    var highCards = ['J', 'Q', 'K', 'A'];
    var smallCardsForPair = ['2', '3', '4', '5'];
    var betTreshold = 0.2; //10% of player money, see isBetNotBig() function
    var smallPairBetMultiplier = 0.7;
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

    function isHighCardPresent(){
      return highCards.some(function (cardsElement) {
            return player.hole_cards[0].rank == cardsElement || player.hole_cards[1].rank == cardsElement;
          });
    }

    function isSmallCardPresent(){
      // return smallCardsForPair.some(function (cardsElement) {
      //   return player.hole_cards[0].rank == cardsElement || player.hole_cards[1].rank == cardsElement;
      // });
      return false;
    }

    var minBet = getMinBetForKeepPlaying();

    function isBetNotBig(){
          return minBet < player.stack * betTreshold;
          }

    if (isCardNotEmpty() && isPairCards()) {
      if (isSmallCardPresent()) {
        //70% of all in!
        bet(Math.round(player.stack * smallPairBetMultiplier));
      } else {
        //All in!
        bet(player.stack);
      }
    } else if (/*isBetNotBig() &&*/ isCardNotEmpty() && isHighCardPresent()) {
      bet(minBet + game_state.minimum_raise);
    } else {
      bet(0);
    }
  },

  showdown: function (game_state) {

  }
};
