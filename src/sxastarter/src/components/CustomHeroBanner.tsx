import React from 'react';
import {
  Image as JssImage,
  Link as JssLink,
  RichText as JssRichText,
  ImageField,
  Field,
  LinkField,
  Text,
} from '@sitecore-jss/sitecore-jss-nextjs';

interface Fields {
  PhoneImage: ImageField;
  PhoneNumber: Field<string>;
  BookAnAppointmentLink: LinkField;
  VerifiedBySection: Field<string>;
  CareQualitySection: Field<string>;
}

type PromoProps = {
  params: { [key: string]: string };
  fields: Fields;
};

const PromoDefaultComponent = (props: PromoProps): JSX.Element => (
  <div className="component promo">
    <div className="component-content">
      <span className="is-empty-hint">Promo </span>
      <JssRichText field={props.fields.PhoneNumber} />
    </div>
  </div>
);

export const Default = (props: PromoProps): JSX.Element => {
  //const id = props.params.RenderingIdentifier;
  if (props.fields) {
    return (
      <div className={`component promo`}>
        <div className="component-content">
          <div className="field-promoicon">
            <JssImage field={props.fields.PhoneImage} />
          </div>
          <div className="promo-text">
            <div>
              <div className="field-promotext">
                <JssRichText field={props.fields.PhoneNumber} />
              </div>
            </div>
            <div className="field-promolink">
              <JssLink field={props.fields.BookAnAppointmentLink} />
            </div>
          </div>
        </div>
      </div>
    );
  }

  return <PromoDefaultComponent {...props} />;
};

export const WithText = (props: PromoProps): JSX.Element => {
  const id = props.params.RenderingIdentifier;
  if (props.fields) {
    return (
      <div className={`component promo ${props.params.styles}`} id={id ? id : undefined}>
        <div className="component-content">
          <div className="field-promoicon">
            <JssImage field={props.fields.PhoneImage} />
          </div>
          <div className="promo-text">
            <div>
              <div className="field-promotext">
                <Text className="promo-text" field={props.fields.PhoneNumber} />
              </div>
            </div>
            <div className="field-promotext">
              <Text className="promo-text" field={props.fields.VerifiedBySection} />
            </div>
          </div>
        </div>
      </div>
    );
  }

  return <PromoDefaultComponent {...props} />;
};
