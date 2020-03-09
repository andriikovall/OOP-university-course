export abstract class CleaningStrategy {
    actions: string[];
    static readonly timeNeeded: number;
    doCleaning() {
        console.log(this.actions.join('\n'));
    }
}

export class LightCleaning extends CleaningStrategy {
    actions: string[] = [
        'Picking up thrown clothes', 
        'Sweeping the floor'
    ];

    public static readonly timeNeeded = 1;

    doCleaning() {
        console.log('Doing light cleaning--');
        super.doCleaning();
    }
}

export class CommonCleaning extends CleaningStrategy {
    actions: string[] = [
        'Wiping off the dust', 
        'Vacuuming the floor'
    ];

    public static readonly timeNeeded = 3;

    doCleaning() {
        console.log('Doing common cleaning');
        super.doCleaning();
    }
}

export class SuperCleaning extends CleaningStrategy {
    actions: string[] = [
        'Wet cleaning the floor', 
        'Cleaning the windows'
    ];

    public static readonly timeNeeded = 5;

    doCleaning() {
        console.log('Doing superMegaXXLProMaxPlus cleaning');
        super.doCleaning();
    }
}