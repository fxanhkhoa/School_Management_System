export class Event {
    evendID: String = null;
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
        // Check Day first
        // if (inputday.getDate() == 3){
        //     console.log(this.startdate.getDate(), inputday.getDate(), this.enddate.getDate(),
        //     ((this.startdate.getDate() <= inputday.getDate()) 
        //     && (inputday.getDate() <= this.enddate.getDate())));
        // }
        
        if ((this.startdate.getDate() <= inputday.getDate()) 
        && (inputday.getDate() <= this.enddate.getDate())){
            if ((this.startdate.getMonth() <= inputday.getMonth()) 
            && (inputday.getMonth() <= this.enddate.getMonth()))
                if ((this.startdate.getFullYear() <= inputday.getFullYear()) 
                && (inputday.getFullYear() <= this.enddate.getFullYear()))
                    return true;
                else {
                    return false;
                }
            else {
                return false;
            }
        } else {
            return false;
        }
    }
}
