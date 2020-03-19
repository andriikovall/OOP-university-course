"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Fight {
    constructor(f1, f2) {
        this.f1 = f1;
        this.f2 = f2;
        this.battleLog = [];
    }
    log(msg) {
        this.battleLog.push(msg);
    }
    getDeadFighters(...fighters) {
        return fighters.filter(f => f.getHp() <= 0);
    }
    getAliveFighters(...fighters) {
        return fighters.filter(f => f.getHp() > 0);
    }
    getWinner(f1, f2) {
        const aliveFighters = this.getAliveFighters(f1, f2);
        return aliveFighters.length === 1 ? aliveFighters[0] : null;
    }
    getLoser(f1, f2) {
        const deadFighters = this.getDeadFighters(f1, f2);
        return deadFighters.length === 1 ? deadFighters[0] : null;
    }
    begin() {
        console.log(`\nBATTLE BEETWEEN --${this.f1.name}-- and --${this.f2.name}--`);
        let winner = null;
        let loser = null;
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
exports.Fight = Fight;
