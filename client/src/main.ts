import { createApp } from 'vue';
import App from './App.vue';
import plugins from './plugins';
import './assets/styles/bootstrap/bootstrap.min.css';
import './assets/styles/global.scss';
import { createMetaManager } from 'vue-meta';

const app = createApp(App)
  .use(plugins.router)
  .use(plugins.i18n)
  .use(plugins.ElementUI)
  .use(createMetaManager());

app.mount('#app');
