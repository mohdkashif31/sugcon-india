import React from 'react';
import Head from 'next/head';
import { Field, ImageField, LinkField, getPublicUrl } from '@sitecore-jss/sitecore-jss-nextjs';
import { useRouter } from 'next/router';

const publicUrl = getPublicUrl();

interface SeoAnalyticsProps {
  [key: string]: unknown;
  Title?: Field;
  MetaTitle?: Field;
  MetaKeywords?: Field;
  MetaDescription?: Field;
  MetaNoFollow?: Field;
  MetaNoIndex?: Field;
  CanonicalUrl?: LinkField;
  SchemaData?: Field;
  IncludeSchema?: Field;
  RobotsMeta?: string;
  OgTitle?: Field;
  OgDescription?: Field;
  OgImage?: ImageField;
}

interface SeoAnalyticsData {
  Fields?: SeoAnalyticsProps;
}
export default function SeoAnalytics(props: SeoAnalyticsData): JSX.Element {
  const seoData = props.Fields;
  if (seoData?.MetaNoFollow?.value && seoData?.MetaNoIndex?.value) {
    seoData.robotsmeta = 'noindex,nofollow';
  } else if (seoData?.MetaNoFollow?.value) {
    seoData.robotsmeta = 'nofollow';
  } else if (seoData?.MetaNoIndex?.value) {
    seoData.robotsmeta = 'noindex';
  }
  return (
    <div>
      <Head>
        <meta
          name="title"
          content={seoData?.MetaTitle?.value?.toString() || seoData?.Title?.value?.toString()}
          key="title"
        />
        <meta name="description" content={seoData?.MetaDescription?.value?.toString()} key="desc" />
        <meta name="keywords" content={seoData?.MetaKeywords?.value?.toString()} key="keyword" />
        <meta name="robots" content={seoData?.robotsmeta?.toString()} key="robots" />
        <meta property="og:title" content={seoData?.OgTitle?.value.toString()} key="ogTitle" />
        <meta
          property="og:description"
          content={seoData?.OgDescription?.value.toString()}
          key="ogDescription"
        />
        <meta property="og:image" content={seoData?.OgImage?.value?.src} key="ogImage" />
        <link rel="canonical" href={CanonicalURL(seoData?.CanonicalUrl)} />
      </Head>
    </div>
  );
}

function CanonicalURL(SeoUrl: LinkField | undefined) {
  const router = useRouter();
  if (SeoUrl && SeoUrl.value && SeoUrl.value.href) {
    return SeoUrl.value.linktype === 'external'
      ? SeoUrl.value.href
      : `${publicUrl}` + SeoUrl.value.href;
  }
  const cleanPath = router.asPath.split('#')[0].split('?')[0];
  return `${publicUrl}` + (router.asPath === '/' ? '' : cleanPath);
}
