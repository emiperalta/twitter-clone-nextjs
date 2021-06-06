import { formatDate } from './useDateTimeFormat';

import { DATE_UNITS } from 'constants/date';
import { DEFAULT_LANGUAGE } from 'constants/locale';

const isRTFSupported = typeof Intl !== 'undefined' && Intl.RelativeTimeFormat;

const getDateDiffs = timestamp => {
  const now = Date.now();
  const elapsed = (now - timestamp) / 1000;
  for (const [unit, secondsInUnit] of DATE_UNITS) {
    if (elapsed > secondsInUnit || unit === 'seconds') {
      const value = Math.round(elapsed / secondsInUnit);
      return { value, unit };
    }
  }
};

export default function useTimeAgo(timestamp, { lang = DEFAULT_LANGUAGE } = {}) {
  const { value, unit } = getDateDiffs(timestamp);
  if (!isRTFSupported) {
    return formatDate(timestamp, lang);
  }
  return new Intl.RelativeTimeFormat(lang, { style: 'short' }).format(-value, unit);
}
