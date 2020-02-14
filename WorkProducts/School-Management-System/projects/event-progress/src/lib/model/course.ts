import { User } from './user';

export class Course {
    courseid: String;
    name: String;
    startday: Date;
    endday: Date;
    starttime: String;
    endtime: String;
    frequency: String[] = [];
    involvers: any[] = [];

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
        var retArray = [];
        /**
         * *Algorithm: Loop each day, if it's in frequency so it is a day
         */
        for (var d = new Date(this.startday.valueOf()); d <= this.endday; d.setDate(d.getDate() + 1)){
            // console.log(d.getDay());
            // TODO: if this day is in frequency
            if (this.frequency.includes(this.dayOfWeek[d.getDay()])){
                retArray.push(new Date(d.toString()));
            }
        }

        return retArray;
    }

    /**
     * TODO: Get the amount of day that this course takes
     */
    getNumberOfDayInCourse(){
        var retArray = [];
        /**
         * *Algorithm: Loop each day, if it's in frequency so it is a day
         */
        retArray = this.getAllDayOfCourse();

        return retArray.length;
    }

    /**
     * TODO: Get completed percentage
     * * Algorithm: count numbers of day earlier than current day
     */
    getCompletedPercent(){
        let daysInCourse = this.getAllDayOfCourse();
        let currentDay = new Date();
        var numberOfDay = 0;
        for (numberOfDay = 0; numberOfDay < daysInCourse.length; numberOfDay++){
            // * for to current day
            if (daysInCourse[numberOfDay] > currentDay){
                break;
            }
        }

        // TODO: Calculate Percentage
        // console.log(numberOfDay)
        let percentage = (numberOfDay * 100) / daysInCourse.length;
        return percentage;
    }
}
