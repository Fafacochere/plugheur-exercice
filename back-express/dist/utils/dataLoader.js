"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DataManager = void 0;
const fs = require('fs');
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
        this.loadSerialNumbersFromData = () => {
            for (const metric of this.data) {
                if (metric[0] && this.serialNumbers.indexOf(metric[0]) < 0) {
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
