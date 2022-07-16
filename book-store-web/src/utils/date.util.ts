export type DateIso = string;

export const DateUtil = {
    formatDate: (date: DateIso): string =>
        date.substring(0, 10).split('-').reverse().join('.'),
};
