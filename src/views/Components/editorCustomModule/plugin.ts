/**
 * @description mention plugin
 * @author dongliqing
 */

import { DomEditor, IDomEditor } from '@wangeditor/editor'
import { IExtendConfig } from './interface'

function getMentionConfig(editor: IDomEditor) {
  const { EXTEND_CONF } = editor.getConfig()
  const { mentionConfig } = EXTEND_CONF as IExtendConfig
  return mentionConfig
}

function withMention<T extends IDomEditor>(editor: T) {
  const { insertText, isInline, isVoid } = editor
  const newEditor = editor

  // 重写 insertText
  newEditor.insertText = t => {
    console.log(editor.children);
    // 选过选中了 void 元素
    // const elems = DomEditor.getSelectedElems(newEditor)
    // const isSelectedVoidElem = elems.some(elem => newEditor.isVoid(elem))
    // console.log('isSelectedVoidElem', isSelectedVoidElem)
    // if (isSelectedVoidElem) {
    //   insertText(t)
    //   return
    // }

    insertText(t)
  }

  // 重写 isInline
  newEditor.isInline = elem => {
    const type = DomEditor.getNodeType(elem)
    if (type === 'paste') {
      return true
    }

    return isInline(elem)
  }

  // 重写 isVoid
  newEditor.isVoid = elem => {
    const type = DomEditor.getNodeType(elem)
    if (type === 'paste') {
      return true
    }
    return isVoid(elem)
  }

  return newEditor
}

export default withMention
