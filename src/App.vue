<template>
  <div id="app">
    <div id="left-bar">
      <button class="bar">
        <logo/>
     
      </button>

       <button class="bar">

       <i class="far fa-file"></i>
     
      </button>

    </div>

    <div id="content" class="content">
      
      <button>
        <i class="fas fa-university"></i>
        This is button
      </button>nicotn
      <div class="round">This is text</div>
      <HelloWorld class="content" msg="Welcome to Your Vue.js App" />
    </div>
  </div>
</template>

<script>
import HelloWorld from "./components/HelloWorld.vue";
import Logo from "./assets/icons/unicorn.svg";

export default {
  name: "app",
  data() {
    return {
      imgsr: 'assets/icons/unicorn.png'
    }

  },
  components: {
    HelloWorld,
    Logo
  }
};
</script>

<style lang="scss">
@import "@/scss/base.scss";

#app {
  width: 100%;
  height: 100%;
}

#content {
  margin-left: $icon-width ;
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

img {
  svg {
    fill: red;
  }
}
</style>
