// More info on https://github.com/garmeeh/next-seo#readme

// Edit the canonical url
const canonicalUrl = ''

// Edit the default title
const defaultTitle = 'WAGMI'
const defaultDescription = 'A Web3 buildspace project'

// Edit the SEO parameters
export const SEO = {
  defaultTitle: defaultTitle,
  titleTemplate: `${defaultTitle}`,
  canonical: canonicalUrl,
  additionalLinkTags: [
    {
      rel: 'icon',
      href: 'favicons/favicon-16x16.png',
      type: 'image/png',
      sizes: '16x16',
    },
    {
      rel: 'icon',
      href: 'favicons/favicon-32x32.png',
      type: 'image/png',
      sizes: '32x32',
    },
    {
      rel: 'apple-touch-icon',
      href: 'favicons/apple-touch-icon.png',
      sizes: '180x180',
    },
    {
      rel: 'manifest',
      href: 'favicons/site.webmanifest',
    },
    {
      rel: 'mask-icon',
      href: 'favicons/safari-pinned-tab.svg',
      // Edit the touch bar background color
      color: '#81e6d9',
    },
  ],
  additionalMetaTags: [
    {
      name: 'msapplication-TileColor',
      // Edit the tile color (windows)
      content: '#81e6d9',
    },
    {
      name: 'theme-color',
      // Edit the full background color (android)
      content: '#ffffff',
    },
  ],
  openGraph: {
    title: defaultTitle,
    description: defaultDescription,
    type: 'website',
    locale: 'en_IE',
    url: canonicalUrl,
    images: [
      {
        // Add your custom image for sharing
        url: 'https://www.dropbox.com/s/sdcj5oavzhxayhh/web3-ap-ogimage.jpg?raw=1',
        width: 1200,
        height: 630,
        alt: 'Preview of the website',
      },
    ],
  },
  // Edit the twitter info or delete
  twitter: {
    handle: '@anhek_',
    cardType: 'summary_large_image',
  },
}

export default SEO
