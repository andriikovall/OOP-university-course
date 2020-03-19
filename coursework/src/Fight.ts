import { Fighter } from "./models/Fighter";

export interface FightResult {
    log: string[], 
    winner: Fighter, 
    loser: Fighter
}

export class Fight {

    private battleLog: string[];

    private log(msg: string): void {
        this.battleLog.push(msg);
    }

    constructor(private f1: Fighter, private f2: Fighter){
        this.battleLog = [];
    }

    private getDeadFighters(...fighters: Fighter[]) {
        return fighters.filter(f => f.getHp() <= 0);
    }
    
    private getAliveFighters(...fighters: Fighter[]) {
        return fighters.filter(f => f.getHp() > 0);
    }
    
    private getWinner(f1: Fighter, f2: Fighter) {
        const aliveFighters = this.getAliveFighters(f1, f2);
        return aliveFighters.length === 1 ? aliveFighters[0] : null;
    }
    
    private getLoser(f1: Fighter, f2: Fighter) {
        const deadFighters = this.getDeadFighters(f1, f2);
        return deadFighters.length === 1 ? deadFighters[0] : null;
    }

    public begin(): FightResult {
        console.log(`\nBATTLE BEETWEEN --${this.f1.name}-- and --${this.f2.name}--`);
        let winner: Fighter = null;
        let loser: Fighter = null;
        do {
            this.log(this.f1.attack(this.f2));
            console.log(this.f1.getHp(), this.f2.getHp());
            winner = this.getWinner(this.f1, this.f2);
            loser = this.getLoser(this.f1, this.f2);
            [this.f1, this.f2] = [this.f2, this.f1];
        } while (!winner);

        console.log(`${winner.name} has won!`);
        console.log(`BATTLE HAS ENDED ---\n`);
        return {
            log: this.battleLog, 
            winner, loser
        };
    }
}