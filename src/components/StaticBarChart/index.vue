<template>
    <svg :width="width" :height="height" ref="svg"></svg>
</template>

<script>
    import staticBarChart from './staticBarChart';

    export default {
        name: 'StaticBarChart',
        props: ["data", "width", "height"],
        mounted() {
            const bar = new staticBarChart({svg: this.$refs.svg, data: this.data});
            bar.create();
        }
    }
</script>

<style lang="less" scoped>
</style>