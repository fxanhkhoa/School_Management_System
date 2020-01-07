import { Event } from './event';

export class CalendarTypeMonth {
    selectedMonth: number;
    selectedYear: number;
    events: Event[] = []; // All event in this month
}
