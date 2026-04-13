import { createApp } from 'vue' //importa librerias
//import './style.css'
//import App from './App.vue'
import RouterRoot from './RouterRoot.vue';
import router from './router'
import 'leaflet/dist/leaflet.css';
import 'leaflet.markercluster/dist/MarkerCluster.css'
import 'leaflet.markercluster/dist/MarkerCluster.Default.css'




createApp(RouterRoot).use(router).mount('#app')


//createApp(App).mount('#app')



