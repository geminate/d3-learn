<template>
    <div>
        <static-line-chart :data="data" width="800px" height="600px"></static-line-chart>
    </div>
</template>

<script>
    import StaticLineChart from '@/components/StaticLineChart';

    export default {
        components: {StaticLineChart},
        data() {
            return {
                data: [
                    {letter: "一", frequency: 0.08167},
                    {letter: "二", frequency: 0.13492},
                    {letter: "三", frequency: 0.02782},
                    {letter: "四", frequency: 0.04253},
                    {letter: "五", frequency: 0.12702},
                    {letter: "六", frequency: 0.02288},
                    {letter: "日", frequency: 0.48888}
                ]
            }
        }
    }
</script>

<style lang="less" scoped>

</style>