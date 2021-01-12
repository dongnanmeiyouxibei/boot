import React, { useRef } from 'react';
import { useSize } from 'ahooks';
import useLayout from '@/hooks/useLayout';
import ContainerContext from '@/components/AutoX/ContainerContext';

/**
 * 列表属性{template}包括 [布局, Cart, 分隔线, 数据转换 [,子组件] ]
 * 简单列表仅向子组件传递数据源以及 子组件属性
 * @param {*} props 
 * @param {object} layout  布局
 * @param {array}} items,dataSource
 */
export default function PlainList(props) {
  const { children, layout, items, dataSource=items, onItemClick= () => {console.log('未设置onItemClick点击事件')}, ...rest } = props;

  const [layoutRef, { getClassName }] = useLayout();

  const containerRef = useRef();
  const size = useSize(containerRef);

  // ensure only child [NamedLayout, Presenter ...]
  const Child = React.Children.only(children);

  // 检查数据是否有效
  if(!(dataSource && Array.isArray(dataSource))){
     return tips(dataSource)
  }

  return <div
    style={{
      overflow: 'auto',
      position: 'relative',
    }}
    className={getClassName()}
    ref={containerRef}
  >
    <ContainerContext.Provider value={size}>
        {dataSource.map((item, i) => React.isValidElement(Child) ?
            React.cloneElement(Child, {
                ...item,
                ...rest,
                layout:layout,
                key: i,
                ref: layoutRef,
                onItemClick:onItemClick,
                isLastItem: dataSource.length == (i+1) ? true : false,
            })
            : <Child key={i} {...item } {...rest} layout={layout} ref={layoutRef} onItemClick={onItemClick} />)}
    </ContainerContext.Provider>
  </div>
}

function tips(dataSource) {
  return <div>PlainList 数据无效</div>;
}