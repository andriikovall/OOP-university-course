import { CleaningProcces } from "./CleaningProccess";
import argParser from 'minimist';

const args = argParser(process.argv.slice(2));
const timeAvailable = args.time || args.t;

(function main() {
    const cleaning = new CleaningProcces(timeAvailable);
    cleaning.performCleaning();

    // cleaning.setAvailableTime(1);

    // cleaning.performCleaning();
})()