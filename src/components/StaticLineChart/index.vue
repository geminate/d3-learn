<template>
    <svg :width="width" :height="height" ref="svg"></svg>
</template>

<script>
    import staticLineChart from './staticLineChart';

    export default {
        name: 'StaticLineChart',
        props: ["data", "width", "height"],
        mounted() {
            const bar = new staticLineChart({svg: this.$refs.svg, data: this.data});
            bar.create();
        }
    }
</script>

<style lang="less" scoped>
</style>