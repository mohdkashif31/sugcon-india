import React from 'react';
import { useI18n } from 'next-localization';
import {
  // Image as JssImage,
  Link as JssLink,
  ImageField,
  LinkField,
  Text as JssText,
  Field,
} from '@sitecore-jss/sitecore-jss-nextjs';
import style from '../assets/sass/components/HeroBanner/index.module.scss';

interface BottomCard {
  id: string;
  url: string;
  name: string;
  displayName: string;
  fields: {
    Title: Field<string>;
    Description: Field<string>;
    Link: LinkField;
  };
}

interface HeroBannerProps {
  fields: {
    ButtonLinkPrimary: LinkField;
    SearchFieldText: Field<string>;
    Title: Field<string>;
    BottomCards: Array<BottomCard>;
    BackgroundImage: ImageField;
    BreadcrumbLink: LinkField;
    ButtonLinkSecondary: LinkField;
    Description: Field<string>;
  };
}

export default function HeroBanner(props: HeroBannerProps): JSX.Element {
  const { t } = useI18n();
  return (
    <div className={style.HeroContainer}>
      <div
        className={style.HeroContainer__topSection}
        style={{ backgroundImage: `url(${props.fields.BackgroundImage.value?.src || ''})` }}
      >
        <p>Translated text: {t('MyEntry')}</p>
        <JssText tag="h2" field={props.fields.Title} />
        <input type="text" placeholder={props.fields.SearchFieldText.value} />
      </div>
      <div className={style.HeroContainer__bottomSection}>
        {props.fields.BottomCards.map((b) => (
          <div className={style.HeroContainer__Card} key={b.id}>
            <JssText tag="p" field={b.fields.Title} />
            <JssLink field={b.fields.Link} className={style.teasarContainer__left__anchor_button} />
          </div>
        ))}
      </div>
    </div>
  );
}
