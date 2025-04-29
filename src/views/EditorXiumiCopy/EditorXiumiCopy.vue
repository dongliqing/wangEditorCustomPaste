<template>
  <div class="w-[400px]">
    <p>wangEditor copy xiumi demo</p>

    <div style="border: 1px solid #ccc;">
      <Toolbar style="border-bottom: 1px solid #ccc" :editor="editorRef" :defaultConfig="toolbarConfig" :mode="mode" />
      <Editor style="height:300px;" v-model="valueHtml" :defaultConfig="editorConfig" :mode="mode"
        @onCreated="handleCreate" @customPaste="customPaste" />

    </div>

    <div style="margin-top: 10px;">
      <textarea v-model="valueHtml" style="width: 100%; height: 500px;"></textarea>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Boot } from '@wangeditor/editor'
import { Editor, Toolbar } from '@wangeditor/editor-for-vue'
// import mentionModule from '@wangeditor/plugin-mention'
import editorXiumiModule from '@/views/Components/editorXiumiModule/index';
import * as cheerio from 'cheerio';
import { convertToRootJson } from './utils';

// 注册插件
Boot.registerModule(editorXiumiModule)



const editorRef = shallowRef();
const mode = "default";
const toolbarConfig = {
  excludeKeys: [],
  // insertKeys: {
  //   index: 31,
  //   keys: ['variable'] // ====>对应上文定义的key
  // }
}
const html = ref();
const valueHtml = ref();
const editorConfig = {
  placeholder: '请输入内容...',
};
const handleCreate = (editor) => {
  // editorRef.value = editor;
  editorRef.value = Object.seal(editor);// 【注意】一定要用 Object.seal() 否则会报错
}
//   const onChange = (editor) => {
//     console.log("🚀 ~ onChange ~ editor.getHtml():", editor.getHtml())
// }

const customPaste = (editor: IDomEditor, event: ClipboardEvent) => {
  let html = event.clipboardData.getData("text/html"); // 获取粘贴的 html
  // let text = event.clipboardData.getData('text/plain') // 获取粘贴的纯文本
  let rtf = event.clipboardData.getData("text/rtf"); // 获取 rtf 数据（如从 word wsp 复制粘贴）

  if (html) {

    // 列表缩进会超出边框，直接过滤掉
    //   html = html.replace(/text\-indent:\-(.*?)pt/gi, "");
    html = html.replace(/html|body|head/gi, "");
    html = html.replace(/\<\>/gi, "");
    html = html.replace(/\<\/\>/gi, "");
    html = html.replace(/\<\!\-\-StartFragment\-\-\>/gi, "<div data-w-e-type='paste'>");
    html = html.replace(/\<\!\-\-EndFragment\-\-\>/gi, "</div>");
    //   html = html.replace(/\<\/body\>\<\/html\>\<\!\-\-EndFragment\-\-\>\<\/body\>\<\/html\>/gi, "");
    html = html.replace(/section/gi, "div");
    html = html.replace(/section/gi, "div");

    //   html.replace(/class="[^"]*"/g, '') // 删除所有class属性
    // .replace(/<section[^>]*>/g, '<div>') // 将<section>转换为<div>
    // .replace(/<\/section>/g, '</div>')
    // .replace(/<img[^>]*>/g, (match) => {
    //   // 保留图片src，移除其他属性（如秀米的样式）
    //   const src = match.match(/src="([^"]*)"/)?.[1] || '';
    //   const style = match.match(/style="([^"]*)"/)?.[1] || '';
    //   return `<img src="${src}" style="${style}">`;
    // });


    console.log("🚀 ~ before ~ html:", html)
    const $ = cheerio.load(html);
    const resultJson = convertToRootJson($)

    console.log("🚀 ~ jsonData:", resultJson);

    // 同步
    editor.insertNode(resultJson);
    //   editor.dangerouslyInsertHtml(html);
    // editor.setHtml(html);
    // editor.insertText(html);

    //   console.log("🚀 ~ after ~ html:", editor.getHtml())



    console.log("🚀 ~ customPaste ~ 111",)

    // 阻止默认的粘贴行为
    event.preventDefault();
    return false;
  }

  console.log("🚀 ~ customPaste ~ 222",)
  return true;
}




onBeforeUnmount(() => {
  if (editorRef.value) return
  editorRef.value.destroy() // 组件销毁时，及时销毁 editor ，重要！！！
})

</script>

<style src="@wangeditor/editor/dist/css/style.css"></style>