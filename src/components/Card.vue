<template lang="pug">
 .card
    .image
        <img src="@/assets/images/doc.svg">
    //- img(:src="src")
    h4.title {{title}}
    span.description {{description}}
    button.button(@click="$emit('click')") {{action}}
</template>
<script>
export default {
  data () {
    return {
      hello: 'dsfds'
    }
  },
  props: ['title', 'description', 'src', 'action']
}
</script>
<style lang="scss">

.card {
    border: 1px solid $grey;
    border-radius: 5px;
    padding: 1rem;
    min-width: 500px;
    max-width: 500px;
    display: grid;
    grid-template-columns: minmax(64px, 64px) auto auto;
    grid-template-rows: auto 1fr auto;
    grid-template-areas: "img  title title"
                         "img  description description"
                         "img _ button";

    &:hover {
        border: 1px solid $primary;
    }

    .title {
        grid-area: title;
        margin-left: 1rem;
    }

    .description {
        grid-area: description;
        margin-left: 1rem;
        margin-top: 1rem;
        margin-bottom: 1rem;
    }
    .image {
        grid-area: img;
        margin-top: 1.5rem;
        margin-right: 1rem;
        // display: flex;

        // align-items: center;

        img {
            width: 64px;
            height: 64px;
        }
    }

    .button {
        grid-area: button;
    }

}
</style>
