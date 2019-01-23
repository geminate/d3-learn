import Vue from 'vue';
import Router from 'vue-router';

import DataBindPage from '@/pages/DataBindPage';
import DataSvgPage from '@/pages/DataSvgPage';
import StaticBarChartPage from '@/pages/StaticBarChartPage';
import DynamicBarChartPage from '@/pages/DynamicBarChartPage';
import StaticLineChartPage from '@/pages/StaticLineChartPage';

Vue.use(Router);

export default new Router({
    linkActiveClass: "active",
    routes: [
        {path: '/', redirect: '/staticBarChart'},
        {path: '/dataBind', component: DataBindPage},
        {path: '/dataSvg', component: DataSvgPage},
        {path: '/staticBarChart', component: StaticBarChartPage},
        {path: '/dynamicBarChart', component: DynamicBarChartPage},
        {path: '/staticLineChartPage', component: StaticLineChartPage},
    ]
})
