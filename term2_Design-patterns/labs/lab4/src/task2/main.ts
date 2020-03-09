import { CleaningProcces } from "./CleaningProccess";
import argParser from 'minimist';

const args = argParser(process.argv.slice(2));
const timeAvailable = args.time || args.t;
console.log('timeAvailable:', timeAvailable)

try {
    const cleaning = new CleaningProcces(timeAvailable);
    cleaning.performCleaning();
} catch {
    console.log('Unfortunatelly mon doest have a time for this(');
}
