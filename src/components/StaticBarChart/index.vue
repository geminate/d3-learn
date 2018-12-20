<template>
    <svg width="800" height="600" ref="svg"></svg>
</template>

<script>
    import staticBarChart from './staticBarChart';

    export default {
        name: 'StaticBarChart',
        mounted() {
            const data = [
                {letter: "一", frequency: 0.08167},
                {letter: "二", frequency: 0.13492},
                {letter: "三", frequency: 0.02782},
                {letter: "四", frequency: 0.04253},
                {letter: "五", frequency: 0.12702},
                {letter: "六", frequency: 0.02288},
                {letter: "日", frequency: 0.48888}
            ];

            const bar = new staticBarChart({svg: this.$refs.svg, data: data});
            bar.create();
        }
    }
</script>

<style lang="less" scoped>
</style>