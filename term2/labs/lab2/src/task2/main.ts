import { Greeter } from './Greeter';
import { NewGreeter } from './NewGreeter';
import { User } from './User';


const users = [
    new User('Andrii', 'koval', new Date('10 22 2000')), 
    new User('arnord', 'Shwarc', new Date('06 30 1947 ')), 
    new User('Ilon', 'Mask', new Date('05 28 1971')), 
    new User('no name', 'no surname ', new Date(Date.now())), 
];

users.forEach(user => Greeter.greet(user.firstName + ' ' + user.lastName));
console.log('\n');
users.forEach(user => NewGreeter.greet(user));