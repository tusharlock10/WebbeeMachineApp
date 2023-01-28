import { format, parse } from 'date-fns';

const dateLayout = "yyyy-MM-dd";

export const formatDateToString = (date: Date) => {
  return format(date, dateLayout);
};

export const parseDateFromString = (formattedDate: string) => {
  return parse(formattedDate, dateLayout, new Date());
};