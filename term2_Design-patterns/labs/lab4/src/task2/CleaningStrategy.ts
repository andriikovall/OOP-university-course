export abstract class CleaningStrategy {
    actions: string[];
    timeNeeded: number;
    doCleaning() {
        console.log(this.actions.join('\n'));
    }
}

export class LightCleaning extends CleaningStrategy {
    actions: string[] = [
        'Picking up thrown clothes', 
        'Sweeping the floor'
    ];

    public static timeNeeded = 1;

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

    public static timeNeeded = 3;

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

    public static timeNeeded = 5;

    doCleaning() {
        console.log('Doing superMegaXXLProMaxPlus cleaning');
        super.doCleaning();
    }
}