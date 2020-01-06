import { Event } from './event';

export class CalendarTypeDay {
    selectedDay: Date = null;
    event: Event[] = null; // Which event contain this day
}
