import { CountUp } from './countUp.min.js';

const optionsSaved = {
    // prefix: '$',
    suffix: '+',
    duration: 3,
};
const optionsCodes = {
    suffix: '+',
    duration: 2.5,
};
const optionsCustomers = {
    suffix: '+',
};

window.onload = () => {
    const countUpSaved = new CountUp('saved', 6000000, optionsSaved);
    const countUpCodes = new CountUp('codes', 30000, optionsCodes);
    const countUpCustomers = new CountUp('customers', 20000, optionsCustomers);
    countUpSaved.start();
    countUpCodes.start();
    countUpCustomers.start();
};