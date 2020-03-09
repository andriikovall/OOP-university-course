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

    private getStrategyForTime(timeAvailable: number): CleaningStrategy {
        const strategy = [CommonCleaning, SuperCleaning, LightCleaning]
            .filter( st => st.timeNeeded <= timeAvailable )
            .sort( (a, b) => a.timeNeeded - b.timeNeeded )
            .pop() || null;

        if (strategy == null) 
            throw new Error('Not enough time to perform cleaning');
        return new strategy();
    }
}