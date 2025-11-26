import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/downloads/', '/private/'],
      },
    ],
    sitemap: 'https://dudaberger.com.br/sitemap.xml',
  };
}
