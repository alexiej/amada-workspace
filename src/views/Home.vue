<template lang="pug">
  transition(name="slide")
    #home.content
      router-link#info(to="/about", class="bar", tag="button")
        img(src="../assets/icons/help.png")
      h1 Amada Workspace
      h2 What you want to do?
      #items
        card(src="@/assets/images/doc.svg",
              title="Document",
              action="Create",@click="new_document",
              action2="Open", @click2="open_document",
              action3="Example", @click3="open_example",
              description="Create/Open a template (amada) document that you can play in playground.")
</template>

<script>
import Card from '@/components/Card.vue'
import { mapActions } from 'vuex'
import { defaults } from '../store/index'
import example from './editor/example.json'
const { dialog } = require('electron').remote

export default {
  name: 'home',
  components: {
    Card
  },
  mounted () {
    document.title = 'AMADA Workspace'
  },
  methods: {
    ...mapActions(['updateDraft', 'updateLastFile']),
    new_document () {
      this.updateDraft(defaults.state.draft)
      this.$router.push({
        path: '/doc',
        params: { file_path: '' },
        query: { file_path: '' } // NavigationDuplicated
      })
    },
    async open_document () {
      const file = await dialog.showOpenDialog({
        title: 'Open AMADA file',
        message: 'AMADA file',
        filters: [{
          name: 'amada',
          extensions: ['amada']
        }
        ]
      })
      if (file.canceled === false) {
        this.$router.push({
          path: '/doc',
          // WORKAROUND: add timestamp to avoid errror NavigationDuplicated
          params: { file_path: file.filePaths[0], timestamp: new Date() },
          query: { file_path: file.filePaths[0], timestamp: new Date() }
        })
      }
    },
    open_example () {
      // console.log(example)
      this.updateDraft(example)
      this.$router.push({
        path: '/doc',
        params: { file_path: '' },
        query: { file_path: '' } // NavigationDuplicated
      })
    }
  }
}
</script>
<style lang="scss">
#home {
  margin: 3rem;
  display: grid;

  #info {
    color: $grey;
    // color: $primary;
    width: 3rem;
    height: 3rem;
    position: absolute;
    right: 4rem;
    top: 2rem;
  }

  #items {
    display: flex;
    justify-content: center;
  }

}

</style>
