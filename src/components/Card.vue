<template lang="pug">
 .card
    p hello world
    img(src="../assets/images/doc.svg")
    button add new document
</template>
<script>
export default {
    data() {
        return {

        }
    },
    props: ['title', 'content', 'image']
}
</script>
<style lang="scss">

.card {
    border: 1px solid $grey;
    border-radius: 5px;
    padding: 1rem;
    min-width: 500px;
    // flex: none;

    img {
        width: 64px;
        height: 64px;
    }

}
</style>