var NAME = "Crazy Penguins";
module.exports = {

  VERSION: "0.1.1",

  bet_request: function (game_state, bet) {
    var highCards = ['10', 'J', 'Q', 'K', 'A'];
    var highCardsForLessPeople = ['7', '8', '9', '10', 'J', 'Q', 'K', 'A'];

    var smallCardsForPair = ['2', '3', '4', '5'];
    var betTreshold = 0.2; //prcentages of player money, see isBetNotBig() function
    var playersTreshold = 3;
    var allInStep = 0.25;
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

    function isCardPresent(array) {
      return array.some(function (cardsElement) {
        return player.hole_cards[0].rank == cardsElement || player.hole_cards[1].rank == cardsElement;
      });
    }

    function isHighCardPresent(){
      return isCardPresent(highCards);
    }

    function isHighCardForLessPeoplePresent(){
      return isCardPresent(highCardsForLessPeople);
    }

    function isSmallCardPresent(){
      return smallCardsForPair.some(function (cardsElement) {
        return player.hole_cards[0].rank == cardsElement || player.hole_cards[1].rank == cardsElement;
      });
        // return false;
    }

    var minBet = getMinBetForKeepPlaying();

    function isBetNotBig(){
        return minBet < player.stack * betTreshold;
    }

    function getActivePlayersCount() {
      return game_state.players.filter(function (p) { return p.status == "active" }).length;
    }

    function manyPlayersCanPlay() {
        return getActivePlayersCount() > playersTreshold;
    }

    function getAllIn(){
        // bet(player.stack);
      bet(Math.round(minBet + (player.stack * allInStep)));
    }

    if (isCardNotEmpty() && isPairCards() && isHighCardPresent()) {
      //All in!
      getAllIn();
    } else if (!manyPlayersCanPlay()) {
        if (isCardNotEmpty() && isPairCards() && isHighCardForLessPeoplePresent()) {
          //All in!
          getAllIn();
        } else if (/*isBetNotBig() &&*/ isCardNotEmpty() && isHighCardPresent()) {
            bet(minBet + game_state.minimum_raise);
        } else {
            bet(0);
        }
    } else {
        bet(0);
    }
  },

  showdown: function (game_state) {

  }
};
