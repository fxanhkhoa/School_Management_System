export class Event {
    startdate: Date = null;
    enddate: Date = null;
    name: String = null;
    content: String = null;
    note: String = null;
    progress: String = null; // Calculate % by hours
    priority: String = null;
    type: String = null;
    location: String = 'None';

    /**
     * Summary: Check if this event contains a day
     * Function name: containDay
     * Input: date need to check 
     * Input data type: Date
     * Output: true for contain, false for not contain
     * Output data type: Boolean
     */
    containDay(inputday){
        if ((this.startdate <= inputday) && (inputday <= this.enddate)){
            return true;
        } else {
            return false;
        }
    }
}
