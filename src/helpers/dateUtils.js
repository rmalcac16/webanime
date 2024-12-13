import moment from 'moment';
import 'moment/locale/es';

moment.locale('es');

export function getDateFromNow(date) {
    return moment(date).fromNow();
}

export function formatDate(date, format = 'DD/MM/YYYY') {
    return moment(date).format(format);
}

export function getDaysDifference(date1, date2) {
    const start = moment(date1);
    const end = moment(date2);
    return end.diff(start, 'days');
}

export function addDays(date, days) {
    return moment(date).add(days, 'days').toDate();
}

export function subtractDays(date, days) {
    return moment(date).subtract(days, 'days').toDate();
}
