import { ICloneable } from './icloneable';

enum CardSuit {
    SuitHeart, SuitDiamond, SuitClub, SuitSpade
}

enum CardRank {
    RankSix, RankSeven, RankEight, RankNine, RankTen,
    RankJack, RankQueen, RankKing, RankAce
}

export class Card implements ICloneable {

    private _rank: CardRank;
    private _suit: CardSuit;

    constructor({ _rank, _suit }: Card) {
        this._rank = Card.isValidCardRank(_rank) ? _rank : CardRank.RankSix;
        this._suit = Card.isValidSuit(_suit) ? _suit : CardSuit.SuitHeart;
    }

    set rank(value: CardRank) {
        if (Card.isValidCardRank(value)) {
            this._rank = value;
        } else {
            throw new Error('Invalid card rank value');
        }
    } 

    get rank() {
        return this._rank;
    }

    clone() {
        return new Card({ ...this }) as this;
    }

    private static isValidCardRank(rank: CardRank) {
        return Object.values(CardRank).includes(rank);
    }

    private static isValidSuit(suit: CardSuit) {
        return Object.values(CardSuit).includes(suit);
    }

}