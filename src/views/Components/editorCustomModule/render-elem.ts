/**
 * @description render elem
 * @author dongliqing
 */

import { DOMElement } from '../utils/dom';
import { h, VNode } from 'snabbdom'
import { DomEditor, IDomEditor, SlateElement } from '@wangeditor/editor'
import { MentionElement, TAG } from './custom-types'
import { camelCase } from 'lodash-es';

function renderMention(elem: DOMElement, child: VNode[] | null, editor: IDomEditor): VNode {
  // 当前节点是否选中
  // const selected = DomEditor.isNodeSelected(editor, elem)
  const { children } = elem;
  console.log("🚀 renderMention ::", children);


  // 构建 vnode
  const vnode = h(
    "div",
    {
      // props: {
      //   contentEditable: false, // 不可编辑
      // },
      style: {
        // backgroundColor: 'red',
      }
    },
    convertVNode(children)
  )
  console.log("🚀 vnode ::", vnode);

  return vnode
}


const convertVNode = (eleList: TAG[]): any[] => {
  return eleList.map((ele) => {
    const { children = [], src = '', style = '', tag, text } = ele;

    //将style字符串分割转化成对象
    const styleStr = style as string;
    const styleArr = styleStr ? styleStr.split(';') : [];
    const styleObj = styleArr.reduce((acc, cur) => {
      const [key, value] = cur.split(':');
      //将key转化成驼峰格式
      acc[camelCase(key)] = value;
      return acc;
    }, {} as { [key: string]: string });

    return h(
      tag || 'span',
      {
        props: src ? {
          src,
        } : {},
        style: styleObj,
      },
      children.length === 0 ? (text || "") : convertVNode(children)
    )
  })
}

const conf = {
  type: 'paste', // 节点 type ，重要！！！
  renderElem: renderMention,
}

export default conf
