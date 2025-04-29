/**
 * @description elem to html
 * @author dongliqing
 */

import { SlateElement } from '@wangeditor/editor'
import { MentionElement, TAG } from './custom-types'

// 生成 html 的函数
function mentionToHtml(elem: SlateElement, childrenHtml: string): string {
  const { children } = elem as MentionElement;
  // console.log("🚀 ~ mentionToHtml ~ child:", children)

  const childHtml = convertHtml(children);
  // console.log("🚀 childHtml:", childHtml)
  return "<div data-w-e-type='paste'>" + childHtml + "</div>"
}


const convertHtml = (eleList: TAG[]): string => {
  return eleList.map((ele) => {
    const { children = [], src, style, tag, text } = ele;
    // if (children.length === 0) {
    //   return text;
    // }
    return `<${tag} ${src ? 'src=' + src : ''} ${style ? 'style=' + style : ''}>${children.length === 0 ? (text || "") : convertHtml(children)}</${tag}>`
  }).join('');
}

// 配置
const conf = {
  type: 'paste', // 节点 type ，重要！！！
  elemToHtml: mentionToHtml,
}

export default conf
