module.exports = {
    holdCards: [],
    comunityCards: [],
    holdsCardsRank: [],
    comunityCardsRank: [],
    counts: null,
    setCards: function (holdCards, comunityCards) {
        this.holdCards = holdCards;
        this.comunityCards = comunityCards;
        this.holdCardsRank = this.getCardRanks(holdCards);
        this.comunityCardsRank = this.getCardRanks(comunityCards);
        this.quantityInArray(this.holdCardsRank.concat(this.comunityCardsRank));
    },
    getCardRanks: function (cards) {
        var ranks = [];
        for (var i = 0; i < cards.length; i++) {
            ranks.push(cards[i].rank);
        }
        return ranks;
    },
    isPair: function () {
        for (var i = 0; i < this.holdCardsRank.length; i++) {
            if (this.counts[this.holdCardsRank[i]] > 1) {
                return true;
            }
        }
        return false;
    },
    isTriple: function () {
        for (var i = 0; i < this.holdCardsRank.length; i++) {
            if (this.counts[this.holdCardsRank[i]] > 2) {
                return true;
            }
        }
        return false;
    },
    isTwoPairs: function () {
        for (var i = 0; i < this.holdCardsRank.length; i++) {
            for (var j = 0; j < this.comunityCardsRank.length; j++) {
                if (this.counts[this.holdCardsRank[i]] > 1
                    && (this.counts[this.comunityCardsRank[j]] > 1 && this.holdCardsRank[i] != this.comunityCardsRank[j])) {
                    return true;
                }
            }
        }
        return false;
    },
    isKare: function () {
        for (var i = 0; i < this.holdCardsRank.length; i++) {
            if (this.counts[this.holdCardsRank[i]] > 3) {
                return this.holdCardsRank[i];
            }
        }
        return -1;
    },
    isFullHouse: function () {
        for (var i = 0; i < this.holdCardsRank.length; i++) {
            for (var j = 0; j < this.comunityCardsRank.length; j++) {
                if (this.counts[this.holdCardsRank[i]] == 2 && this.counts[this.comunityCardsRank[j]] > 2)
                    return true;
            }
        }
        return false;
    },
    quantityInArray: function (arr) {
        this.counts = {};
        for (var i = 0; i < arr.length; i++) {
            var num = arr[i];
            this.counts[num] = this.counts[num] ? this.counts[num] + 1 : 1;
        }
    }
};
