import { ICloneable } from './icloneable';

export enum CardSuit {
    SuitHeart, SuitDiamond, SuitClub, SuitSpade
}

export enum CardRank {
    RankSix, RankSeven, RankEight, RankNine, RankTen,
    RankJack, RankQueen, RankKing, RankAce
}

export class Card implements ICloneable {

    private _rank: CardRank;
    private _suit: CardSuit;

    constructor({ rank, suit }: { rank: CardRank, suit: CardSuit }) {
        this._rank = Card.isValidCardRank(rank) ? rank : CardRank.RankSix;
        this._suit = Card.isValidSuit(suit) ? suit : CardSuit.SuitHeart;
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
        return new Card({ rank: this.rank, suit: this._suit }) as this;
    }

    private static isValidCardRank(rank: CardRank) {
        return Object.values(CardRank).includes(rank);
    }

    private static isValidSuit(suit: CardSuit) {
        return Object.values(CardSuit).includes(suit);
    }

}