import { Card, CardSuit, CardRank } from './card';

export class CardProvider {

    private static _instance: CardProvider;

    private static cachedCards: Card[] = [];

    public static get instance(): CardProvider {
        if (!CardProvider._instance) {
            CardProvider._instance = new CardProvider();
        }
        return CardProvider._instance;
    }

    public static loadCards(): void {
        const ranks = Object.values(CardRank).map(v => parseInt(v as string)).filter(v => !isNaN(v));
        console.log('ranks:', ranks)
        const suits = Object.values(CardSuit).map(v => parseInt(v as string)).filter(v => !isNaN(v));
        console.log('suits:', suits)
        for (const rank of ranks) {
            for (const suit of suits) {
                this.cachedCards.push(new Card({ rank, suit }));
            }
        }

        console.log(this.cachedCards, this.cachedCards.length);
    }
}