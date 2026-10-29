import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import arabFund from '../views/arabFund.vue'
import countryDetails from '../views/countryDetails.vue'
import activePage from '../views/activePage.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      meta: { title: 'home_title' }
    },
    {
      path: '/arabFund',
      name: 'arabFund',
      component: arabFund,
      meta: { title: 'router_link_01' }
    },
    {
      path: '/beeFinancialServiceGroup',
      name: 'beeFinancialServiceGroup',
      component: arabFund,
      meta: { title: 'router_link_04' }
    },
    {
      path: '/arabExportAndImportBank',
      name: 'arabExportAndImportBank',
      component: arabFund,
      meta: { title: 'router_link_02' }
    },
    {
      path: '/economics',
      name: 'economics',
      component: arabFund,
      meta: { title: 'router_link_06' }
    },
    {
      path: '/countryDetails',
      name: 'countryDetails',
      component: countryDetails,
      meta: { title: 'countryDetails' }
    },
    {
      path: '/activePage',
      name: 'activePage',
      component: activePage,
      meta: { title: 'activePage' }
    }
  ],
  scrollBehavior() {
    return { top: 0 }
  }
})

export default router
