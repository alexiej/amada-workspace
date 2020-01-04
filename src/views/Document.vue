<template lang="pug">
    div.doc
        div.header
            input(v-model="title")
        div#codex-editor
        //- div
        //-     div(@mouseleave="mouseLeave", @mouseenter="mouseOver(index)",  v-for="(i,index) in elements")
        //-         component(
        //-             :is="i.type" ,
        //-             :ref='index',

        //-             :properties="{  index: index, elements: elements, is_focus: index==active_index }",
        //-             :value='i',

        //-             @add="add(index+1, $event)"
        //-             @del="del(index)"
        //-             @down="down(index)"
        //-             @up="up(index)")
</template>
<script>
import Vue from 'vue'
import EditorJS from '@editorjs/editorjs'
// import ImageTool from '@editorjs/image'
const Header = require('@editorjs/header')
const SimpleImage = require('@editorjs/simple-image')
const Checklist = require('@editorjs/checklist')
const List = require('@editorjs/list')
const InlineCode = require('@editorjs/inline-code')
const Warning = require('@editorjs/warning')
const Table = require('@editorjs/table')
const Paragraph = require('@editorjs/paragraph')
const CodeTool = require('@editorjs/code')

function CallIf (fun) {
  if (fun !== undefined) {
    fun()
  }
}

export default {
  data () {
    return {
      title: 'Hello',
      elements: [
        { type: 'emarkdown', subtype: '', content: '# INDEX1 \n **bold** ' }
      ],
      active_index: 0
    }
  },
  mounted () {
    // const ImageTool = window.ImageTool;

    new EditorJS({ // eslint-disable-line no-new
      /**
       * Id of Element that should contain the Editor
       */
      holder: 'codex-editor',

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
      data: {}
    })
  },
  methods: {
    mouseOver (index) {
      this.active_index = index
      CallIf(this.$refs[this.active_index][0].focus)
    },
    mouseLeave () {
      CallIf(this.$refs[this.active_index][0].unfocus)
      this.active_index = -1
    },
    down (index) {
      if (index < this.elements.length - 1) {
        var el = this.elements[index + 1]
        Vue.set(this.elements, index + 1, this.elements[index])
        Vue.set(this.elements, index, el)
      }
    },
    up (index) {
      if (index > 0) {
        var el = this.elements[index - 1]
        Vue.set(this.elements, index - 1, this.elements[index])
        Vue.set(this.elements, index, el)
      }
    },
    del (index) {
      this.elements.splice(index, 1)
    },
    add (index, what) {
      if (what === 'header') {
        this._add(index, {
          type: 'eheader',
          subtype: 'H2',
          content: ''
        })
      }
      if (what === 'markdown') {
        this._add(index, {
          type: 'emarkdown',
          subtype: '',
          content: ''
        })
      }
      var ev = this
      Vue.nextTick(function () {
        CallIf(ev.$refs[index][0].focus)
      })
    },
    _add (index, item) {
      this.elements.splice(index, 0, item)
    }
  }
}
</script>
<style lang="scss">
.doc {
  margin-left: 1rem;
  margin-right: 1rem;

  margin-top: 1rem;
  margin-left: 1rem;
  margin-right: 1rem;

  > .header {
    border-left: 3px solid $primary;
    padding-left: 15px;

    input {
      font-size: 2.4rem;
      text-align: center;
      border: 0px;
      width: 100%;
      text-align: left;
      padding-bottom: 5px;

      &:active,
      &:focus,
      &:hover {
        border-bottom: 1px solid;
      }
    }
  }

  button.ce-inline-tool {
    background-color: inherit;
  }

  .cdx-simple-image {

      .cdx-input.cdx-simple-image__caption {
          margin-left: 15px;
          border: none;
          border-left: 2px solid $primary;
          padding-bottom: 5px;
          padding-top: 5px;
          box-shadow: none;
          border-radius: 0;

      }
  }
}
</style>
