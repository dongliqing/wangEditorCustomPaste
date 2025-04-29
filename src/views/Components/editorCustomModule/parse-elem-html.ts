/**
 * @description parse elem html
 * @author dongliqing
 */

import { DOMElement } from '../utils/dom';
import { IDomEditor, SlateDescendant, SlateElement } from '@wangeditor/editor'
import { MentionElement, TAG } from './custom-types'
import * as cheerio from 'cheerio';
import { convertToJson } from "@/views/EditorCustomPaste/utils";

function parseHtml(
  elem: DOMElement,
  children: SlateDescendant[],
  editor: IDomEditor
): SlateElement {
  // elem HTML 结构 <div data-w-e-type="paste"><div></div></div>


  //获取elem节点的所有子节点
  const $ = cheerio.load(elem.innerHTML);
  const allChild = [] as TAG[];

  // 递归处理子元素
  $("div[data-w-e-type='paste]").children().each(function () {
    allChild.push(convertToJson($, this)); // 递归调用转换函数
  });

  return {
    type: 'paste',
    children: allChild,
  } as MentionElement
}



const parseHtmlConf = {
  selector: 'div[data-w-e-type="paste"]',
  parseElemHtml: parseHtml,
}

export default parseHtmlConf
