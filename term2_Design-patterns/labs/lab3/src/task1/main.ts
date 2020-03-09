import { CardProvider } from './cardProvider';
import { Card, CardRank, CardSuit } from './card';
import assert from 'assert';


CardProvider.instance.loadCards();

function sample1() {
    const card1 = CardProvider.instance.getCard(CardRank.RankAce, CardSuit.SuitDiamond);
    const possibleCopy = CardProvider.instance.getCard(CardRank.RankAce, CardSuit.SuitDiamond);
    card1.setRank(CardRank.RankKing);  
    console.log(card1, possibleCopy);
}
sample1();


function sample2() {
    const ranks = Card.getRankEnumKeys();
    const suits = Card.getSuitEnumKeys();
    const deck: Card[] = [];
    for (const suit of suits) {
        for (const rank of ranks) {
            const card: Card = CardProvider.instance.getCard(rank, suit);
            deck.push(card);
        }
    }

    deck.forEach(c => c.displayInfo());
    assert.equal(deck.length, 36);
}

sample2();
