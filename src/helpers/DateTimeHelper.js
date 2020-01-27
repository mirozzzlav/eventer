import * as moment from 'moment';

export default {
    
    getDateFormatted(dateStr) {
        return `${moment(dateStr).format("DD.MM.YYYY")} at ${moment(dateStr).format("HH:mm")}`;
    },
    compareDates(date1, date2, compareOnlyDatePart = false) {
        
        if (compareOnlyDatePart) {
            date1 = moment(date1).format('L');
            date2 = moment(date2).format('L');
        }
        let diff = moment(date1).diff(date2);
        
        return diff > 0 ? 1 : (diff < 0 ? -1 : 0);
    },
    /**
     * Compare given date to current date adapted by value of period.
     * @param {string} dateStr date to be compared with current date +/- value of period
     * @param {string} sign + or -, determines if period will be added or deducted
     * @param {string} period value to add/subtract (i.e. '1-month, 2-weeks') to current date
     */
    compareGivenDateToCurrentDateAdaptedByPeriod(dateStr, sign, period) {
        let periodSplit = period.split("_");
        let errMsg = "Period / sign parameter is unknown format!";

        if (periodSplit.length < 2 || sign !== '+' && sign !== '-') {
            throw errMsg;
        }
        let amount = parseInt(periodSplit[0]), unit = periodSplit[1];
        
        if (isNaN(amount) || !isFinite(amount)) {
            throw errMsg;
        }
        
        let adaptedDate = moment(moment.now()).add(parseInt(sign + amount), unit);
        let diff = moment(dateStr).diff(adaptedDate);

        return diff > 0 ? 1 : (diff < 0 ? -1 : 0);
    },
    compareGivenDateToCurrentDate(dateStr, compareOnlyDatePart = false) {
        return this.compareDates(dateStr, moment.now(), compareOnlyDatePart);
    },


}