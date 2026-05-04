import {getRequestConfig} from 'next-intl/server';
import {notFound} from 'next/navigation';

export const locales = ['th', 'en'];

export default getRequestConfig(async ({requestLocale}) => {
  let locale = await requestLocale;
  
  if (!locale || !locales.includes(locale as any)) {
    locale = 'th';
  }

  return {
    messages: (await import(`../messages/${locale}.json`)).default,
    locale
  };
});
