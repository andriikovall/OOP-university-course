import { User } from './User';
import { Greeter } from './Greeter';

export class NewGreeter {

    public static ageForMoreOfficialGreeting: number = 35;
    private static oldGreeter: Greeter;

    private static greetingsForTime = [
        {
            hour: {
                from: 5, to: 11
            }, 
            message: 'Good morning'
        }, {
            hour: {
                from: 11, to: 16
            }, 
            message: 'Good afternoon'
        }, {
            hour: {
                from: 16, to: 22
            }, 
            message: 'Good evening'
        }, {
            hour: {
                from: 22, to: 5
            }, 
            message: 'Good night'
        }
    ];

    private static getCurrentGreeting(): string {
        const currentHour = new Date().getHours();
        const greeting: string = NewGreeter.greetingsForTime.filter(g => currentHour >= g.hour.from && currentHour < g.hour.to)[0]?.message;
        return greeting;
    }

    public static greet(user: User) {
        const age = new Date().getUTCFullYear() - user.bDay.getUTCFullYear();
        if (age > this.ageForMoreOfficialGreeting) {
            const msg: string = `${NewGreeter.getCurrentGreeting()} ${NewGreeter.capitalize(`${user.firstName} ${user.lastName}`)}`;
            console.log(msg);
        } else {
            NewGreeter.oldGreeter.greet(user.firstName + ' ' + user.lastName); 
        }
    }

    private static capitalize(string: string): string {
        return string.split(' ').map(s => s[0].toUpperCase() + s.slice(1)).join(' ');
    }
}