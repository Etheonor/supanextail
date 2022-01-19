import { format, parseISO } from 'date-fns';

type Properties = {
  dateString: string;
};

const DateFormatter = ({ dateString }: Properties): JSX.Element => {
  const date = parseISO(dateString);
  return <time dateTime={dateString}>{format(date, 'LLLL	d, yyyy')}</time>;
};

export default DateFormatter;
