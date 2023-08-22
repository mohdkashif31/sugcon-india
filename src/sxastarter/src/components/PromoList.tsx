import React from 'react';
import { PromoComponent } from './Promo';

import { ImageField, Field, LinkField } from '@sitecore-jss/sitecore-jss-nextjs';

interface PromoItem {
  PromoIcon: ImageField;
  PromoText: Field<string>;
  PromoLink: LinkField;
  PromoText2: Field<string>;
  PromoNewField: Field<string>;
}

interface Fields {
  Promos: Array<InternalFields>;
  params: { [key: string]: string };
}

interface InternalFields {
  fields: PromoItem;
  params: { [key: string]: string };
}

type PromoListProps = {
  params: { [key: string]: string };
  fields: Fields;
};

const PromoListComponent = (props: PromoListProps): JSX.Element => (
  <div className={`component promo ${props.params}`}>
    <div className="component-content">
      <span className="is-empty-hint">Promo List1</span>
    </div>
  </div>
);

export const Default = (props: PromoListProps): JSX.Element => {
  if (props.fields && props.fields.Promos) {
    const list = props.fields.Promos.map((element, key: number) => (
      <PromoComponent key={`${key}`} fields={element.fields} params={element.params} />
    ));
    return <div>{list}</div>;
  }
  return <PromoListComponent {...props} />;
};
