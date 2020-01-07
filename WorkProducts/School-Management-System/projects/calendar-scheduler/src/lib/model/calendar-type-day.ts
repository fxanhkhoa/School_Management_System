import { Event } from './event';

export class CalendarTypeDay {
    selectedDay: Date = null;
    events: Event[] = []; // Which event contain this day
}
