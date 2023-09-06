import { CountUp } from './assets/js/countUp.min.js';

const optionsSaved = {
    prefix: '$',
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

window.onload = function () {
    var countUpSaved = new CountUp('saved', 4000000, optionsSaved);
    var countUpCodes = new CountUp('codes', 25000, optionsCodes);
    var countUpCustomers = new CountUp('customers', 16000, optionsCustomers);
    countUpSaved.start();
    countUpCodes.start();
    countUpCustomers.start();
}