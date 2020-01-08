import { Event } from './event';

export class CalendarTypeMonth {
    selectedMonth: number;
    selectedYear: number;
    events: Event[] = []; // All event in this month

    constructor(){
        /** Do nothing */
    }

    /**
     * Summary: Get number of days of input month
     * Function name: getDaysOfMonth
     * Input: None (Used class variable: selectedMonth and selectedYear)
     * Input data type: number
     * Output: Number of days of month
     * Output data type: number
     */
    getDaysOfMonth(){
        let tempDate = new Date();
        tempDate.setFullYear(this.selectedYear);
        tempDate.setMonth(this.selectedMonth - 1); // Month: january -> December = 0 -> 11
        tempDate.setDate(0);

        return tempDate.getDate();
    }

    /**
     * Summary: Get first day of input month
     * Function name: getFirstDayOfMonth
     * Input: None (Used class variable: selectedMonth and selectedYear)
     * Input data type: number
     * Output: First day of month
     * Output data type: number
     */
    getFirstDayOfMonth(){
        let tempDate = new Date();
        tempDate.setFullYear(this.selectedYear);
        tempDate.setMonth(this.selectedMonth - 1); // Month: january -> December = 0 -> 11
        tempDate.setDate(1);

        return tempDate.getDay(); 
    }
}
