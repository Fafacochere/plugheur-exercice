"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DataManager = void 0;
const fs = require('fs');
const SERIAL_INDEX = 0;
const WH_INDEX = 2;
const VARH_INDEX = 3;
class DataManager {
    constructor(filepath) {
        this.serialNumbers = [];
        this.loadData = () => {
            try {
                this.data = this.readFile();
                this.loadSerialNumbersFromData();
            }
            catch (err) {
                console.error(err);
                return false;
            }
            return true;
        };
        this.getSerialNumbers = () => {
            return this.serialNumbers;
        };
        this.checkSerialNumberExist = (serialNumber) => {
            return this.serialNumbers.includes(serialNumber);
        };
        this.getMetricsBySerialNumber = (serialNumber) => {
            return this.data
                .filter(metric => metric[SERIAL_INDEX] === serialNumber)
                .map((index) => {
                index.slice(SERIAL_INDEX, 1);
                return index;
            });
        };
        this.loadSerialNumbersFromData = () => {
            for (const metric of this.data) {
                if (metric[0] && this.serialNumbers.indexOf(metric[SERIAL_INDEX]) < 0) {
                    this.serialNumbers.push(metric[0]);
                }
            }
        };
        this.readFile = () => {
            const data = fs.readFileSync(this.filepath, 'utf8').toString().split('\n');
            data.shift();
            return data.map((item) => item.split(','));
        };
        this.filepath = filepath;
    }
}
exports.DataManager = DataManager;
