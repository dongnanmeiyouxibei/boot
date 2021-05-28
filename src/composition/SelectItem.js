import React from 'react';
const AutoComponent = require('@/components/AutoComponent');
const presenter = require('@/components/presenter/default');

export default function SelectItem(props) {

  const { item_index, curr_index } = props;

  const config = {
    layout: {
      name: 'Flexbox',
      props: {
        col: 1,
      },
      children: [
        {
          name: 'Title',
          span: 1,
          gateway: {
            name: 'Gateway',
            props: {
              field: 'title',
              converter: {
                title: 'TitleText'
              }
            }
          }
        },
      ]
    },
    ...props,
  };

  return (
    <div style={{ minWidth: '200px'}} >
      <AutoComponent config={config} allComponents={presenter}/>
    </div>
  )

}