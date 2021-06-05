import { DEFAULT_LANGUAGE } from 'constants/locale';

const isDTFSupported = typeof Intl !== 'undefined' && Intl.DateTimeFormat;

export const formatDate = (timestamp, { lang = DEFAULT_LANGUAGE }) => {
  const date = new Date(timestamp);
  const options = {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    hour12: true,
    minute: 'numeric',
  };
  if (!isDTFSupported) {
    return date.toLocaleDateString(lang, options);
  }
  return new Intl.DateTimeFormat(lang, options).format(date);
};

export default function useDateTimeFormat(timestamp) {
  return formatDate(timestamp, { lang: DEFAULT_LANGUAGE });
}
