export class Course {
    courseid: String;
    name: String;
    startday: Date;
    endday: Date;
    frequency: String[] = [];

    dayOfWeek = [
        'sunday',
        'monday',
        'tuesday',
        'wednesday',
        'thursday',
        'friday',
        'saturday',
    ];

    /**
     * TODO: Get All day that this course takes
     */
    getAllDayOfCourse(){

    }

    /**
     * TODO: Get the amount of day that this course takes
     */
    getNumberOfDayInCourse(){
        var retArray = [];
        /**
         * *Algorithm: Loop each day, if it's in frequency so it is a day
         */
        for (var d = this.startday; d <= this.endday; d.setDate(d.getDate() + 1)){
            // console.log(d.getDay());
            // TODO: if this day is in frequency
            if (this.frequency.includes(this.dayOfWeek[d.getDay()])){
                retArray.push(new Date(d.toString()));
            }
        }

        return retArray;
    }
}
