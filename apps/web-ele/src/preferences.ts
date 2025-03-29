import { defineOverridesPreferences } from '@vben/preferences';

/**
 * @description 项目配置文件
 * 只需要覆盖项目中的一部分配置，不需要的配置不用覆盖，会自动使用默认配置
 * !!! 更改配置后请清空缓存，否则可能不生效
 */
export const overridesPreferences = defineOverridesPreferences({
  // overrides
  app: {
    name: import.meta.env.VITE_APP_TITLE,
    defaultAvatar:
      'https://img.iplaysoft.com/wp-content/uploads/2019/free-images/free_stock_photo.jpg',
  },
  logo: {
    enable: true,
    // source: 'https://unpkg.com/@vbenjs/static-source@0.1.7/source/logo-v1.webp',
  },
  footer: {
    enable: false,
    fixed: false,
  },
  theme: {
    mode: 'light',
  },
});
