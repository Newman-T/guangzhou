<template>
    <div>
        <Aside></Aside>
        <Header></Header>
    </div>
</template>

<script>
    import  Aside from './common/Aside.vue';
    import  Header from './common/Header.vue';

    export default {
        components: {
            Aside,
            Header
        }
    }
</script>

<style scoped>

</style>