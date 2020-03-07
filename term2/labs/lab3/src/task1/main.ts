import { CardProvider } from './cardProvider';
import { CardRank, CardSuit } from './card';

CardProvider.instance.loadCards();


const card1 = CardProvider.instance.getCard(CardRank.RankAce, CardSuit.SuitDiamond);
const possibleCopy = CardProvider.instance.getCard(CardRank.RankAce, CardSuit.SuitDiamond);
card1.setRank(CardRank.RankKing);  
console.log(card1, possibleCopy);