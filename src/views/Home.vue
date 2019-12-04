<template lang="pug">
  transition(name="slide")
    #home.content
      router-link#info(to="/about", class="bar", tag="button")
        img(src="../assets/icons/help.png")
      h1 Amada Workspace
      h2 What you want to do?
      #items
        //- img(src="@/assets/images/doc.svg")
        card(src="@/assets/images/doc.svg", 
              title="New Document", 
              @click="document",
              action="create",
               description="Create a new template (amada) document that you can play in playground.")
</template>

<script>
import Card from '@/components/Card.vue'

// @ is an alias to /src
// import HelloWorld from "@/components/HelloWorld.vue";

export default {
  name: "home",
  components: {
    Card
  },
  methods: {
    document() {
      this.$router.push('/doc')

      // console.log('aa')
    }
  }
};
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