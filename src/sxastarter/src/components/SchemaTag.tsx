import React from 'react';
import Head from 'next/head';
import { Field } from '@sitecore-jss/sitecore-jss-nextjs';

interface SchemaProps {
  [key: string]: unknown;
  SchemaData?: Field;
}

interface SchemaData {
  Fields?: SchemaProps;
}
export default function SchemaTag(props: SchemaData): JSX.Element {
  return (
    <div>
      <Head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: props?.Fields?.SchemaData?.value?.toString()
              ? props?.Fields?.SchemaData?.value?.toString()
              : '',
          }}
          key="product-jsonld"
        />
      </Head>
    </div>
  );
}
