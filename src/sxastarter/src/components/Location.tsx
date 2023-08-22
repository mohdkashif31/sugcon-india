import React from 'react';
import {
  RichText as JssRichText,
  Link as JssLink,
  ImageField,
  LinkField,
  Text as JssText,
  Field,
  Image as JssImage,
} from '@sitecore-jss/sitecore-jss-nextjs';
import style from '../assets/sass/components/Location/index.module.scss';

interface LocationCard {
  id: string;
  url: string;
  name: string;
  displayName: string;
  fields: {
    Image: ImageField;
    Title: Field<string>;
    Link: LinkField;
    Description: Field<string>;
  };
}

interface LocationProps {
  fields: {
    Button: LinkField;
    Description: Field<string>;
    Location: Array<LocationCard>;
    Title: Field<string>;
    Variant: {
      displayName: string;
      fields: {
        variant: Field<string>;
      };
    };
  };
}

export default function Location(props: LocationProps): JSX.Element {
  const variantName = props.fields?.Variant?.fields?.variant?.value;
  if (variantName === 'image-with-text') {
    return (
      <div className={style.locationContainer__bg_grey_light}>
        <div className={style.locationContainer}>
          <div className={style.locationContainer__heading_justifycontent_mb2}>
            <JssText tag="h3" field={props.fields?.Title} />

            {props.fields?.Button ? (
              <JssLink
                field={props.fields?.Button}
                className={style.locationContainer__anchor_button}
              />
            ) : null}
          </div>

          <div className={style.locationContainer__imageContainer_list}>
            {props.fields.Location.map((s) => (
              <div className={style.locationContainer__imageContainer_main} key={s.id}>
                <JssImage field={s.fields?.Image} className={style.locationContainer__image} />
                <JssRichText
                  className={style.locationContainer__imageContainer_description}
                  tag="p"
                  field={s.fields?.Description}
                />
                {s.fields.Link ? (
                  <JssLink
                    field={s.fields?.Link}
                    className={style.locationContainer__anchor_link}
                  />
                ) : null}
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }
  return <LocationWithoutTextComponent {...props} />;
}

const LocationWithoutTextComponent = (props: LocationProps): JSX.Element => (
  <div className={style.locationContainer}>
    <JssText tag="h3" field={props.fields?.Title} className={style.locationContainer__title} />

    <div>
      <JssRichText
        tag="p"
        field={props.fields?.Description}
        className={style.locationContainer__description}
      />
      {props.fields?.Button ? (
        <JssLink field={props.fields?.Button} className={style.locationContainer__anchor_button} />
      ) : null}
    </div>
    {props.fields?.Location?.map((s) => (
      <div className={style.locationContainer__imageContainer} key={s.id}>
        <JssImage field={s.fields?.Image} className={style.locationContainer__image} />
        <JssText tag="p" field={s.fields?.Title} />
      </div>
    ))}
  </div>
);
