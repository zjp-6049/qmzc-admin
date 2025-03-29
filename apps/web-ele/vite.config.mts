import { defineConfig } from '@vben/vite-config';

import ElementPlus from 'unplugin-element-plus/vite';

export default defineConfig(async () => {
  return {
    application: {},
    vite: {
      plugins: [
        ElementPlus({
          format: 'esm',
        }),
      ],
      server: {
        proxy: {
          '/api': {
            changeOrigin: true,
            rewrite: (path) => path.replace(/^\/api/, ''),
            // mock代理目标地址
            target: 'http://localhost:5320/api',
            ws: true,
          },
          '/dev-api': {
            changeOrigin: true, // 允许跨域
            rewrite: (path) => path.replace(/^\/dev-api/, ''), // 路径重写（可选）
            target: 'http://192.168.1.91:8080', // 后端接口地址
            ws: true,
          },
        },
      },
    },
  };
});
