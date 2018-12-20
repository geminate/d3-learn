import Vue from 'vue';
import Router from 'vue-router';

import DataBindPage from '@/pages/DataBindPage';
import DataSvgPage from '@/pages/DataSvgPage';
import StaticBarChartPage from '@/pages/StaticBarChartPage';

Vue.use(Router);

export default new Router({
    linkActiveClass: "active",
    routes: [
        {path: '/', redirect: '/dataBind'},
        {path: '/dataBind', component: DataBindPage},
        {path: '/dataSvg', component: DataSvgPage},
        {path: '/staticBarChart', component: StaticBarChartPage},
    ]
})
