import React from 'react';
import style from '../assets/sass/components/Widget/index.module.scss';
import { Field, RichText as JssRichText } from '@sitecore-jss/sitecore-jss-nextjs';

interface WidgetProps {
  fields: {
    Content: Field<string>;
    Id: Field<string>;
  };
}

export default function Widget(props: WidgetProps): JSX.Element {
  const id = props.fields.Id && props.fields.Id.value ? props.fields.Id.value : '';
  return (
    <div className={style.widget} id={id}>
      <JssRichText tag="div" field={props.fields.Content} />
    </div>
  );
}
