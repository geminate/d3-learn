import Vue from 'vue';
import Router from 'vue-router';

import DataBind from '@/pages/DataBind';
import DataSvg from '@/pages/DataSvg';

Vue.use(Router);

export default new Router({
    linkActiveClass: "active",
    routes: [
        {path: '/', redirect: '/dataBind'},
        {path: '/dataBind', component: DataBind},
        {path: '/dataSvg', component: DataSvg},
    ]
})
