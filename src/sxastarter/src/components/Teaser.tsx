import React from 'react';
import cx from 'classnames';
import {
  RichText as JssRichText,
  Text as JssText,
  Field,
  Link as JssLink,
  LinkField,
  ImageField,
  Image as JssImage,
} from '@sitecore-jss/sitecore-jss-nextjs';
import style from '../assets/sass/components/Teasar/index.module.scss';

interface TeasarProps {
  fields: {
    ButtonLink: LinkField;
    Description: Field<string>;
    Image: ImageField;
    PrimaryLink: LinkField;
    SecondaryLink: LinkField;
    Title: Field<string>;
    Variant: {
      displayName: string;
      fields: {
        variant: Field<string>;
      };
    };
  };
}

export default function Teaser(props: TeasarProps): JSX.Element {
  const {
    fields: { ButtonLink, Description, Image, PrimaryLink, SecondaryLink, Title, Variant },
  } = props;

  return (
    <div
      className={cx(
        style.teasarContainer,
        Variant.fields.variant.value === 'image-left' ? style.teasarContainer__reverse : ''
      )}
    >
      <div
        className={cx(
          style.teasarContainer__left,
          Variant.fields.variant.value === 'image-left' ? style.paddingLeft0px : '',
          Variant.fields.variant.value === 'image-left' ? style.flex40 : ''
        )}
      >
        <JssText field={Title} tag="h2" />
        <JssRichText field={Description} tag="p" />
        <div className={style.teasarContainer__left__action_btns}>
          {ButtonLink ? (
            <JssLink field={ButtonLink} className={style.teasarContainer__left__anchor_button} />
          ) : null}
        </div>
        <div className={style.linksContainer}>
          {PrimaryLink ? <JssLink field={PrimaryLink} /> : null}
          {SecondaryLink ? <JssLink field={SecondaryLink} /> : null}
        </div>
      </div>
      <div
        className={cx(
          style.teasarContainer__right,
          Variant.fields.variant.value === 'image-left'
            ? style.teasarContainer__right__content__start
            : '',
          Variant.fields.variant.value === 'image-left' ? style.flex60 : ''
        )}
      >
        <div
          className={cx(
            style.teasarContainer__right__imgContainer,
            Variant.fields.variant.value === 'right'
              ? style.teasarContainer__right__imgContainer__zero_padding
              : ''
          )}
        >
          <JssImage field={Image} />
        </div>
      </div>
    </div>
  );
}
