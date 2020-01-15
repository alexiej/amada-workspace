import EditorJS from '@editorjs/editorjs'

const Header = require('@editorjs/header')
const SimpleImage = require('@editorjs/simple-image')
const Checklist = require('@editorjs/checklist')
const List = require('@editorjs/list')
const InlineCode = require('@editorjs/inline-code')
const Warning = require('@editorjs/warning')
const Table = require('@editorjs/table')
const Paragraph = require('@editorjs/paragraph')
const CodeTool = require('@editorjs/code')

export async function getEditor (div, data, onChange) {
  // div.innerHTML = ''
  var editor = await new EditorJS({
    // eslint-disable-line no-new
    /**
         * Id of Element that should contain the Editor
         */
    holder: 'codex-editor',
    // logLevel: 'ERROR',
    onChange: onChange,
    placeholder: 'Let`s start edit!',
    focus: true,
    /**
         * Available Tools list.
         * Pass Tool's class or Settings object for each Tool you want to use
         */
    tools: {
      header: Header,
      list: {
        class: List,
        inlineToolbar: true
      },
      /**
       * * onReady callback
      */
      onReady: () => {
        // console.log('Editor.jsx is ready to work!')
      },

      checklist: {
        class: Checklist,
        inlineToolbar: true
      },

      image: {
        class: SimpleImage,
        inlineToolbar: true
      },
      inlineCode: {
        class: InlineCode,
        shortcut: 'CMD+SHIFT+M'
      },
      warning: {
        class: Warning,
        inlineToolbar: true,
        shortcut: 'CMD+SHIFT+W',
        config: {
          titlePlaceholder: 'Title',
          messagePlaceholder: 'Message'
        }
      },
      table: {
        class: Table,
        inlineToolbar: true,
        config: {
          rows: 2,
          cols: 3
        }
      },
      paragraph: {
        class: Paragraph,
        inlineToolbar: true
      },
      code: CodeTool
    },

    /**
         * Previously saved data that should be rendered
         */
    data: data
  })
  return editor
}
