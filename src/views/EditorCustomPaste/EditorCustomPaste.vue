<template>
  <div class="w-[400px] m-auto">
    <div class="border-[1px] border-[#ccc]">
      <Toolbar class="border-b-[1px] border-[#ccc]" :editor="editorRef" :defaultConfig="toolbarConfig" :mode="mode" />
      <Editor class="!h-[600px]" v-model="valueHtml" :defaultConfig="editorConfig" :mode="mode"
        @onCreated="handleCreate" @customPaste="customPaste" @onChange="handleChange" />
    </div>

    <!-- <div class="mt-[10px]">
      <textarea v-model="valueHtml" class="w-full"></textarea>
    </div> -->
  </div>
</template>

<script setup lang="ts">
import { Boot } from '@wangeditor/editor'
import { Editor, Toolbar } from '@wangeditor/editor-for-vue'
import editorCustomModule from '@/views/Components/editorCustomModule/index';
import * as cheerio from 'cheerio';
import { convertToRootJson } from './utils';
import { blob, text } from 'stream/consumers';

// 注册插件
Boot.registerModule(editorCustomModule)


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
  editorRef.value = editor;

  // editor.insertNode([{
  //   type: 'paragraph',
  //   textIndent: "3em",
  //   color: "red",
  //   display: "flex",
  //   justifyContent: "spaceBetween",
  //   children: [{ type: 'span', blob: true, text: '你好' }, { type: 'span', text: 'Hello, World!' }]
  // }]);
}
const handleChange = (editor) => {
  // console.log("🚀 ~ handleChange ~ ", editor.children)
}


const customPaste = (editor: IDomEditor, event: ClipboardEvent) => {
  let html = event.clipboardData.getData("text/html"); // 获取粘贴的 html
  // let text = event.clipboardData.getData('text/plain') // 获取粘贴的纯文本
  let rtf = event.clipboardData.getData("text/rtf"); // 获取 rtf 数据（如从 word wsp 复制粘贴）

  if (html) {

    html = html.replace(/html|body|head/gi, "");
    html = html.replace(/\<\>/gi, "");
    html = html.replace(/\<\/\>/gi, "");
    html = html.replace(/\<\!\-\-StartFragment\-\-\>/gi, "<div data-w-e-type='paste'>");
    html = html.replace(/\<\!\-\-EndFragment\-\-\>/gi, "</div>");
    html = html.replace(/section/gi, "div");

    const $ = cheerio.load(html);
    const resultJson = convertToRootJson($);

    editor.insertNode(resultJson);
    editor.move(2);

    //   editor.dangerouslyInsertHtml(html);

    // 阻止默认的粘贴行为
    event.preventDefault();
    return false;
  }

  return true;
}



onBeforeUnmount(() => {
  if (editorRef.value) return
  editorRef.value.destroy() // 组件销毁时，及时销毁 editor ，重要！！！
})

</script>

<style src="@wangeditor/editor/dist/css/style.css"></style>