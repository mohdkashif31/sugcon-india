import React from 'react';
import style from '../assets/sass/components/FAQAccordion/index.module.scss';
import { Text as JssText, Field, RichText as JssRichText } from '@sitecore-jss/sitecore-jss-nextjs';

interface FAQItem {
  displayName: string;
  fields: {
    Answer: Field<string>;
    Question: Field<string>;
  };
  id: string;
  name: string;
  url: string;
}

interface FAQProps {
  fields: {
    FAQList: Array<FAQItem>;
    Title: Field<string>;
  };
}

export default function FAQ(props: FAQProps): JSX.Element {
  return (
    <div className={style.faqAccordion}>
      <div className={style.row}>
        <div className={style.col}>
          <JssText tag="h2" field={props.fields.Title} />
          <div className={style.tabs}>
            {props.fields.FAQList.map((f) => (
              <div className={style['tab']} key={f.id}>
                <input type="checkbox" id={f.id} />
                <label className={style['tab-label']} htmlFor={f.id}>
                  <JssRichText field={f.fields.Question} tag="p" />
                </label>
                <div className={style['tab-content']}>
                  <JssRichText field={f.fields.Answer} tag="p" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
