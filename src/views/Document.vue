<template lang="pug">
    div.doc
        div.nav
          //- span asdfkasdjfsdlfjkf
          div.top
            div(:class="{'active': is_outline}", @click="is_outline = true") outline
            div(:class="{'active': !is_outline}", @click="is_outline = false")  files
          div.filelist(v-show="!is_outline")
             div(v-for="f in files",:key="f.path",class="block file",@click="open_file(f.path)",:class="[f.path==file ? 'active' : '', f.type]")
              span {{f.name}}
          div.outline(v-show="is_outline")
            div(v-for="b in blocks",:key="b.i",class="block",@click="block_focus(b.i)",:class="[b.type,b.i==active_block ? 'active' : '', b.level]")
              span {{b.name}}
        div.header
            div.left
              span {{filename}}
              input(v-model="title", placeholder='Your document title')
        div.info
          span.date {{last_saved}}
          button.bar.save(@click="save_file",:class="{'new': file=='', 'changed': changed & file!='' }")
            diskette
        div#codex-editor(ref="codex-editor")
</template>
<script>
import diskette from '../assets/icons/diskette.svg'
import { setMenu } from './Document/menu'
import { getEditor } from './editor/editor'
import { mapState, mapActions } from 'vuex'
const runes = require('runes')

var fs = require('fs')
var path = require('path')
const { dialog } = require('electron').remote

function replaceHTML (str) {
  return str.replace(/&nbsp;/g, ' ')
}

export default {
  data () {
    return {
      title: '',
      file: '',
      blocks: [],
      active_block: -1,
      is_outline: true,
      editor_var: undefined,
      filename: 'Draft',
      changed: false,
      last_saved: '-',
      active_index: 0
    }
  },
  computed: {
    ...mapState(['last_file', 'draft', 'files']),
    editor: vm => vm.editor_var
  },
  components: {
    diskette
  },
  async beforeRouteUpdate (to, from, next) {
    this.open_file(to.query.file_path)
  },
  beforeRouteEnter (to, from, next) {
    next(async vm => {
      vm.open_file(to.query.file_path)
    })
  },
  async beforeDestroy () {
    if (this.file !== '') {
      // console.log(['beforeDestroy-file', this.file])
      await this.write_data(this.file, false)
      await this.updateLastFile(this.file)
    } else {
      // console.log(['beforeDestroy-draft', this.file])
      await this.updateDraft(await this.get_data())
    }
  },
  async mounted () {
    setMenu(this)
    // console.log([ 'mounted: last file', this.last_file ])
  },
  methods: {
    ...mapActions([
      'updateDraft',
      'updateLastFile',
      'addFile' // map `this.increment()` to `this.$store.dispatch('increment')`
    ]),
    async init_editor () {
      if (this.editor === undefined) {
        this.editor_var = await getEditor(
          this.$refs['codex-editor'],
          {},
          this.on_changed
        )
      }
      await this.editor.isReady
    },

    async block_focus (i) {
      var block = await this.editor.blocks.getBlockByIndex(i)
      this.editor.focus(true)
      block.scrollIntoView()
    },

    async count_blocks () {
      var blocks = []
      var data = await this.editor.save()
      for (var i in data.blocks) {
        let block = data.blocks[i]

        blocks.push({
          'i': parseInt(i),
          'data': block.data,
          'name': block.type === 'header' ? replaceHTML(block.data.text) : block.type === 'paragraph' ? runes.substr(replaceHTML(block.data.text), 0, 10) + ' ✏' : block.type,
          'type': block.type,
          'level': block.type === 'header' ? 'H' + block.data.level : ''
        })
      }
      this.active_block = await this.editor.blocks.getCurrentBlockIndex()
      this.blocks = blocks
    },

    async on_changed () {
      this.changed = true
      this.count_blocks()
    },

    async get_data () {
      var data = await this.editor.save()
      data['title'] = this.title
      data['type'] = 'document'
      return data
    },

    async open_file (filePath) {
      // console.log(filePath)
      var data = this.draft
      // console.log([filePath, data])
      if (filePath === undefined) {
        filePath = this.last_file // go to last_file
      }

      var type
      if (filePath === '') {
        document.title = data.title
        this.file = ''
        this.filename = '▶︎ Draft'
        type = 'draft'
      } else {
        var text = fs.readFileSync(filePath, 'utf8')
        data = JSON.parse(text)
        this.change_stats(filePath)
        type = ''
      }
      this.title = data.title
      this.updateLastFile(this.file)
      await this.init_editor()

      if (data.blocks !== undefined) {
        await this.editor.render(data)
      }
      await this.count_blocks()

      await this.addFile({
        type: type,
        name: this.filename,
        path: this.file
      })
      // console.log(this.files)
      // this.is_outline = true
      this.changed = false
    },

    change_stats (filePath) {
      var stats = fs.statSync(filePath)
      this.file = filePath
      this.filename = path.basename(filePath)
      this.last_saved =
        stats.mtime.toLocaleDateString() +
        ' ' +
        stats.mtime.toLocaleTimeString([], { timeStyle: 'short' })
      this.changed = false
      document.title = filePath
    },

    async write_data (filename, notify = true) {
      let data = await this.get_data()
      let v = this
      fs.writeFileSync(filename, JSON.stringify(data), err => {
        alert('An error ocurred creating the file ' + err.message)
      })
      v.change_stats(filename)
      if (notify) {
        new Notification('Save 😁', { // eslint-disable-line no-new
          body: 'File ' + v.filename + ' has been saved',
          silent: true
        })
      }
    },

    async save_file () {
      if (this.file === '') {
        let v = this
        const file = await dialog.showSaveDialog({
          title: 'Save AMADA file',
          message: 'AMADA file',
          defaultPath: v.title,
          filters: [
            {
              name: 'amada',
              extensions: ['amada']
            }
          ]
        })
        if (file.canceled === false) {
          await v.write_data(file.filePath)
          // console.log([this.filename, this.file])
          await v.addFile({
            type: 'file',
            name: v.filename,
            path: v.file
          })
          // console.log([this.files, this.file])
        }
      } else {
        await this.write_data(this.file, false)
      }
    }
  }
}
</script>
<style lang="scss">
.doc {
  // margin-left: 1rem;
  // margin-right: 1rem;

  // margin-top: 1rem;
  // margin-left: 1rem;
  margin-right: 1rem;
  display: grid;
  grid-template-columns: 180px 1fr auto;
  grid-auto-rows: auto 1fr;

  height: 100vh;
  grid-template-areas:
    "nav header info"
    "nav content content";

  .nav {
    grid-area: nav;
    overflow: none;
    // position: fixed;
    background: $grey-bar2;
    border-right: 1px solid $grey-bar;
    padding: 5px;

    .block {
      text-align: right;
      padding: 5px;
      border-bottom: 1px dotted $grey-bar;
      cursor: pointer;

      -webkit-transition: 0.1s ease-in-out;
      -moz-transition: 0.1s ease-in-out;
      -o-transition: 0.1s ease-in-out;
      transition: 0.1s ease-in-out;

      &:hover {
        // transform: scale(0.9);
        color: $primary-dark;
      }

      &:active {
        color: $primary-dark;
        transform: scale(0.85);
        border-left: none;
      }

      &.active {
        //  background: rgba($primary,0.1);
         color: $primary;
      }
    }

    .draft {
      border-bottom: 2px dashed $grey-light;
    }

    .file {
      color: $grey;
      text-align: left;
    }

    .outline {
      padding-top: 5px;
      padding-left: 3px;
      padding-right: 5px;

      color: $grey;

      .header {
        text-align: left;
        font-weight: 600;

      }

      .H1 {
        padding-left: 5px;
        font-weight: 900;
        color: $grey-dark;
      }

      .H2 {
        padding-left: 8px;
      }

      .H3, .H4, .H5, .H6 {
        padding-left: 15px;
      }

    }

    .top {
      border-bottom: 2px dotted $grey-bar;
      display: flex;

      div {
        color: $grey;
        font-weight: 400;
        cursor: pointer;
        width: 100%;
        padding: 5px;
        text-align: center;

       &:first-child {
        border-right: 1px solid $grey-bar;
       }
       &.active {
           color: $primary;
       }

        -webkit-transition: 0.1s ease-in-out;
        -moz-transition: 0.1s ease-in-out;
        -o-transition: 0.1s ease-in-out;
        transition: 0.1s ease-in-out;

        &:hover {
          // transform: scale(0.9);
          color: $primary-dark;
        }

        &:active {
          color: $primary-dark;
          transform: scale(0.85);
          border-left: none;
        }
      }
    }
  }

  #codex-editor {
    margin-left: 15px;
    grid-area: content;
    overflow: auto;
  }

  .info {
    grid-area: info;
    text-align: center;
    height: 45px;
    .date {
      font-size: 1.2rem;
      color: $grey;
    }
    .save {
      width: 100%;
      fill: rgba($grey, 0.5);
    }

    .new {
      fill: $success;
    }

    .changed {
      fill: $primary;
    }
  }

  > .header {
    grid-area: header;
    border-left: 3px solid $primary;
    margin-left: 10px;
    margin-top: 5px;

    display: flex;
    margin-bottom: 8px;

    .left {
      width: 100%;
      margin: 5px;

      span {
        color: $grey;
        font-size: 1.4rem;
        font-weight: 800;
      }
    }

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
        border-bottom: 1px solid $grey-light;
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
