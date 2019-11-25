<template>
 <div id="app">
    <div id="left-bar">
      <router-link to="/" class="bar" tag="button"><unicorn/></router-link>
       <router-link to="/about" class="bar"  tag="button"><docs/></router-link>
    </div>

    <div id="view" class="view">
      <vue-page-transition name="fade">
      <!-- <transition name="slide"> -->
         <router-view/>
      </vue-page-transition>
      <!-- </transition> -->
<!--       
      <button>
        <i class="fas fa-university"></i>
        This is button
      </button>nicotn
      <div class="round">This is text</div> -->
      <!-- <HelloWorld class="content" msg="Welcome to Your Vue.js App" /> -->
    </div>
  </div>
</template>

<script>
import './router';
import unicorn from "./assets/icons/unicorn.svg";
import docs from './assets/icons/docs.svg'

export default {
  name: "app",
  components: {
    unicorn,
    docs
  }
};
</script>

<style lang="scss">
@import "@/scss/base.scss";


// #app {
//   font-family: 'Avenir', Helvetica, Arial, sans-serif;
//   -webkit-font-smoothing: antialiased;
//   -moz-osx-font-smoothing: grayscale;
//   text-align: center;
//   color: #2c3e50;
// }

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
}

#view {
  margin-left: $icon-width ;
  // padding: 1rem;
}

#left-bar {
  background: $grey-bar;
   overflow: hidden;
  position: sticky;
  top: 0;
   height: 100%; /* Full-height: remove this if you want "auto" height */
  width: $icon-width ; /* Set the width of the sidebar */
  position: fixed; /* Fixed Sidebar (stay in place on scroll) */
  z-index: 1; /* Stay on top */
  top: 0; /* Stay at the top */
  left: 0;
    // position: absolute;
  //  height: 100%;
}
</style>
