export abstract class Handler {
    public static handlerCount = 0;    
    abstract handle(next: Function);
}

export class FriendHandler extends Handler {

    constructor(private propabilityToHelp = Math.random()){
        super();
    }

    public handle(next: Function) {
        const count = ++Handler.handlerCount;
        console.log('count:', count, this.propabilityToHelp);
        if (Math.random() <= this.propabilityToHelp) {
            console.log(`Friend #${count} has saved you`);
            console.log('Proccessing the payment...');
        } else {
            if (!next != null) {
                next();
            } else {
                console.log('Sorry, you cant buy anything without a credit');
            }
        }
    }
}

export class CreditHandler extends Handler {
    constructor(){
        super();
    }

    public handle(next: Function) {
        console.log('A credit handler will supply you with all money you need');
        console.log('Proccessing the payment...');
        if (next)
            next();
    }
}


export class User {
    private handlers: Handler[] = [];

    public use(handler: Handler) {
        this.handlers.push(handler);
    }

    private callHandler(index: number) {
        const currHandler = this.handlers[index];
        if (!currHandler) {
            return;
        }
        currHandler.handle(() => this.callHandler(index + 1));
    }

    public buyProduct()  {
        this.callHandler(0);
    }
}