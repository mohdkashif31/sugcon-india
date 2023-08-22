import React from 'react';
import {
  Image as JssImage,
  Link as JssLink,
  ImageField,
  LinkField,
  Text as JssText,
  Field,
} from '@sitecore-jss/sitecore-jss-nextjs';
import style from '../assets/sass/components/Footer/index.module.scss';

interface Link {
  id: string;
  url: string;
  name: string;
  displayName: string;
  fields: {
    CTA: LinkField;
    Icon: ImageField;
  };
}

interface SubCategory {
  id: string;
  fields: {
    SubCategory: LinkField;
  };
}

interface Category {
  id: string;
  fields: {
    CategoryLabel: Field<string>;
    SubCategoryList: Array<SubCategory>;
  };
}

interface FooterProps {
  fields: {
    Links: Array<Link>;
    EnqueryLabel: Field<string>;
    EnqueryNumber: Field<string>;
    Category: Array<Category>;
    Logo: ImageField;
    CopyRight: Field<string>;
  };
}

export default function Footer(props: FooterProps): JSX.Element {
  const copyRight = { value: 'Test' };
  copyRight.value = props.fields?.CopyRight?.value?.replace(
    '{year}',
    new Date().getFullYear().toString()
  );
  return (
    <footer className={style['g-footer']}>
      <div className={style['g-footer__aside']}>
        <div className={style['g-footer__aside-social']}>
          <ul className={style['g-footer__social']}>
            {props.fields.Links.map((l) => (
              <li className={style['g-footer__social-item']} key={l.id}>
                <JssLink field={l.fields.CTA}>
                  <JssImage field={l.fields.Icon} alt={l.displayName} />
                </JssLink>
              </li>
            ))}
          </ul>
        </div>
        <div className={style['g-footer__aside-enquiries']}>
          <JssText
            tag="span"
            className={style['g-footer__aside-heading']}
            field={props.fields.EnqueryLabel}
          />
          <JssLink
            field={{
              value: {
                href: `tel:${props.fields.EnqueryNumber.value}`,
              },
            }}
            className={style['g-footer__aside-phone']}
          ></JssLink>
        </div>
      </div>
      <div className={style['g-footer__menu-container']}>
        {props.fields.Category.map((c) => {
          return (
            <div className={style['g-footer__menu']} key={c.id}>
              <JssText
                tag="h2"
                className={style['g-footer__menu-heading']}
                aria-hidden="false"
                field={c.fields.CategoryLabel}
              />
              <button className={style['g-footer__menu-accordion-trigger']} aria-hidden="true">
                {c.fields.CategoryLabel.value}
                <JssText
                  tag="span"
                  aria-hidden="true"
                  className={style['g-footer__menu-accordion-arrow']}
                >
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M7.41 9L11.3141 12.68C11.6993 13.0431 12.3007 13.0431 12.6859 12.68L16.59 9L18 10.332L13.3734 14.7026C12.6026 15.4308 11.3974 15.4308 10.6266 14.7026L6 10.332L7.41 9Z"
                      fill="white"
                    ></path>
                  </svg>
                </JssText>
              </button>
              <ul className={style['g-footer__menu-list ']} style={{ height: 'auto' }}>
                {c.fields.SubCategoryList.map((s) => (
                  <li className={style['g-footer__menu-item']} key={s.id}>
                    <JssLink
                      field={s.fields.SubCategory}
                      className={style['g-footer__menu-link']}
                    ></JssLink>
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
      </div>
      <div className={style['g-footer__sub']}>
        <div className={style['g-footer__sub-logo']}>
          <JssImage field={props.fields.Logo} alt="HCA logo" />
        </div>
        <div className={style['g-footer__sub-company-info']}>
          <JssText className={style['g-footer__sub-text']} tag="p" field={copyRight} />
        </div>
      </div>
    </footer>
  );
}
