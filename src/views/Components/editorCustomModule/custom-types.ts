/**
 * @description mention element
 * @author dongliqing
 */

export type TAG = {
  tag: "",
  src?: "",
  style?: {},
  text?: "",
  children?: TAG[]
}

export type MentionElement = {
  type: 'paste'
  children: TAG[] // void 元素必须有一个空 text
}
