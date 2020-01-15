<template>
 <div ref="app" id="app">
    <div id="left-bar">
       <router-link to="/" class="bar" tag="button"><unicorn/></router-link>
       <router-link to="/doc" class="bar"  tag="button"><docs/></router-link>
       <router-link to="/about" class="bar"  tag="button"><info/></router-link>
    </div>
      <div v-show="is_drag" id="drop" >
        <div>
          <h1>DROP FILES HERE</h1>
        </div>
      </div>
      <div  id="view" class="view">
        <div>
          <vue-page-transition name="fade" style="top: 0;padding-top: -10px">
            <router-view/>
          </vue-page-transition>
        </div>

      </div>
  </div>
</template>
<script>
import unicorn from './assets/icons/unicorn.svg'
import docs from './assets/icons/docs.svg'
import info from './assets/icons/info.svg'

import { initDragIn } from './utils/drop'

export default {
  name: 'app',
  data () {
    return {
      page: 'dasbhoard',
      is_drag: false
    }
  },
  mounted () {
    initDragIn(null, this.onDrop, null)
  },
  components: {
    unicorn,
    docs,
    info
  },
  methods: {
    onDragOver () {
      console.log('over')
      this.is_drag = true
    },
    onDrop (files) {
      this.$router.replace({
        path: '/doc',
        params: { file_path: files[0].path, timestamp: new Date() },
        query: { file_path: files[0].path, timestamp: new Date() }
      })
      this.is_drag = false
    },
    // TODO: DOESN'T WORK, call mutliple times on MacOSX
    onDreagLeave () {
      console.log('leave')
      this.is_drag = false
    }
  }
}
</script>

<style lang="scss">
@import "@/scss/base.scss";

#drop {
  width: 100%;
  height: 100%;
  margin: auto;
  // padding: 5px;
  // margin: 15px;
  border: 2px solid dotted;
  background: rgba(white,0.9);
  z-index: 800;
  left:0;
  top: 0;

  position: absolute;
  display: flex;
  justify-content: center;
      align-items: center;

}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}

#app {
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-columns: auto 1fr;

}

#view {
  // margin-left: 5px ;
  grid-column: 2;
  overflow: auto;
  // padding: 1rem;
}

#left-bar {
  background: $grey-bar;
  overflow: auto;
  grid-column: 1;
  // position: sticky;
  top: 0;
  height: 100%; /* Full-height: remove this if you want "auto" height */
  width: $icon-width ; /* Set the width of the sidebar */
  // position: fixed; /* Fixed Sidebar (stay in place on scroll) */
  z-index: 1; /* Stay on top */
  // top: 0; /* Stay at the top */
  // left: 0;
  // position: absolute;
  //  height: 100%;
}
</style>
