import { CleaningStrategy, CommonCleaning, SuperCleaning, LightCleaning } from "./CleaningStrategy";

export class CleaningProcces {
    private cleaningStrategy: CleaningStrategy;

    constructor(timeAvailable: number) {
        this.cleaningStrategy = this.getStrategyForTime(timeAvailable);
    }

    public performCleaning() {
        this.cleaningStrategy.doCleaning();
    }

    public setAvailableTime(time: number) {
        this.cleaningStrategy = this.getStrategyForTime(time);
    }

    private getStrategyForTime(time: number): CleaningStrategy {
        const strategy = [CommonCleaning, SuperCleaning, LightCleaning]
            .sort( (a, b) => a.timeNeeded - b.timeNeeded )
            .filter(st => st.timeNeeded <= time)
            .pop() || null;

        if (strategy == null) 
            throw new Error('Not enough time ti perform cleaning');
        return new strategy();
    }
}