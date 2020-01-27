import Vue from 'vue'
import VueRouter from 'vue-router'
import EventsList from './components/EventsList'
import EventDetail from './components/EventDetail'
import App from './App'



Vue.use(VueRouter)

const router = new VueRouter({
  mode: 'history',
  // for production change base
  //base: '/projects/eventer',
  routes: [
    { path: '/', redirect: '/events-list/all' },
    
    { path: '/events-list/type', redirect: '/events-list/all'},
    { path: '/events-list/type/*/period', redirect: '/events-list/all'},
    
    { path: '/events-list/type/past', redirect: '/events-list/type/past/period/any'},
    { path: '/events-list/type/upcoming', redirect: '/events-list/type/upcoming/period/any'},

    
    { path: '/events-list/all', component: EventsList, name: "All Events",},
    { path: '/events-list/type/:type/period/:period?', component: EventsList, name: 'Events' },
    { path: '/events-detail/id/:id', component: EventDetail, name: 'Event Detail' },
  ]
});

Vue.config.productionTip = false

new Vue({
  el: '#app',
  router: router,
  template: '<App/>',
  components: { App },
});
