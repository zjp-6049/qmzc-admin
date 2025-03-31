import path from 'node:path';
import { fileURLToPath } from 'node:url';

import { defineConfig } from '@vben/vite-config';

import AutoImport from 'unplugin-auto-import/vite';
import ElementPlus from 'unplugin-element-plus/vite';
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers';
import Components from 'unplugin-vue-components/vite';

// autoimport相关
const pathSrc = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  'src',
);

export default defineConfig(async () => {
  return {
    application: {},
    vite: {
      plugins: [
        ElementPlus({
          format: 'esm',
        }),
        AutoImport({
          dts: path.resolve(pathSrc, '../types/auto-imports.d.ts'),

          imports: ['vue'],
          // Auto import functions from Element Plus, e.g. ElMessage, ElMessageBox... (with style)
          // 自动导入 Element Plus 相关函数，如：ElMessage, ElMessageBox... (带样式)
          resolvers: [ElementPlusResolver()],
        }),
        Components({
          dts: path.resolve(pathSrc, '../types/components.d.ts'),
          resolvers: [
            // Auto register Element Plus components
            // 自动导入 Element Plus 组件
            ElementPlusResolver(),
          ],
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
