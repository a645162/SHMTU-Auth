import Home from './HomePage.vue';
import theme from '@huyikai/vitepress-helper/theme/index';

export default {
  extends: theme,
  enhanceApp: ({ app }: any) => {
    app.component('Home', Home);
  }
};
