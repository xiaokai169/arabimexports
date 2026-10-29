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
      component: HomeView
    },
    {
      path: '/arabFund',
      name: 'arabFund',
      component: arabFund
    },
    {
      path: '/beeFinancialServiceGroup',
      name: 'beeFinancialServiceGroup',
      component: arabFund
    },
    {
      path: '/arabExportAndImportBank',
      name: 'arabExportAndImportBank',
      component: arabFund
    },
    {
      path: '/economics',
      name: 'economics',
      component: arabFund
    },
    {
      path: '/countryDetails',
      name: 'countryDetails',
      component: countryDetails
    },
    {
      path: '/activePage',
      name: 'activePage',
      component: activePage
    }
  ]
})

export default router
