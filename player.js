var NAME = "Crazy Penguins";
var indetifier = require('./indetifier');
global.map = global.map || [];

module.exports = {

  VERSION: "0.2.2",

  bet_request: function (game_state, bet) {
    var highCards = ['10', 'J', 'Q', 'K', 'A'];
    var highCardsForLessPeople = ['7', '8', '9', '10', 'J', 'Q', 'K', 'A'];

    var smallCardsForPair = ['2', '3', '4', '5'];
    var betTreshold = 0.2; //prcentages of player money, see isBetNotBig() function
    var playersTreshold = 2;
    var allInStep = 0.25;
    var smallPairBetMultiplier = 0.7;
    var player = game_state.players[game_state.in_action];

    function getMinBetForKeepPlaying() {
      //return game_state.players.reduce(function (p, n) { return n.bet > p ? n.bet : p }, 0);
      return game_state.current_buy_in || 0;
    }

    function getGameBetRound() {
      var round = map[game_state.game_id];
      if (round != undefined) {
        round++;
      } else {
        map = [];
        round = 0;
      }

      map[game_state.game_id] = round;

      return round;
    }

    function isCardNotEmpty() {
      return player.hole_cards[0] && player.hole_cards[1];
    }

    function isPairCards() {
      return player.hole_cards[0].rank == player.hole_cards[1].rank;
    }

    function isCardPresent(array) {
      return array.some(function (cardsElement) {
        return player.hole_cards[0].rank == cardsElement || player.hole_cards[1].rank == cardsElement;
      });
    }

    function isHighCardPresent() {
      return isCardPresent(highCards);
    }

    function isHighCardForLessPeoplePresent() {
      return isCardPresent(highCardsForLessPeople);
    }

    function isSmallCardPresent() {
      return smallCardsForPair.some(function (cardsElement) {
        return player.hole_cards[0].rank == cardsElement || player.hole_cards[1].rank == cardsElement;
      });
      // return false;
    }

    function isPostFlop() {
      return game_state.community_cards.length > 0;
    }

    function isAnyPlaybleCombination() {
      indetifier.setCards(player.hole_cards, game_state.community_cards);
      return (indetifier.isPair() && isHighCardPresent()) || indetifier.isTriple() || indetifier.isTwoPairs() || indetifier.isKare() || indetifier.isFullHouse();
    }

    var minBet = getMinBetForKeepPlaying();

    function isBetNotBig() {
      return minBet < player.stack * betTreshold;
    }

    function getActivePlayersCount() {
      return game_state.players.filter(function (p) { return p.status == "active" }).length;
    }

    function manyPlayersCanPlay() {
      return getActivePlayersCount() > playersTreshold;
      // return true;
    }

    function getAllIn() {
      // bet(player.stack);
      bet(Math.round(minBet + (player.stack * allInStep)));
    }

    if (isCardNotEmpty() && isAnyPlaybleCombination()) {
      //All in!
      getAllIn();
    } else if (!manyPlayersCanPlay()) {
      if (isCardNotEmpty() && (indetifier.isPair() && isHighCardForLessPeoplePresent())) {
        //All in!
        getAllIn();
      } else if (/*isBetNotBig() &&*/ isCardNotEmpty() && isHighCardPresent()) {
        bet(minBet/* + game_state.minimum_raise*/);
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
