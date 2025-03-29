import type { RouteRecordRaw } from 'vue-router';

import { $t } from '#/locales';

const routes: RouteRecordRaw[] = [
  {
    meta: {
      icon: 'lucide:shopping-bag',
      order: 2,
      title: $t('product.config.title'),
    },
    name: 'ProductConfig',
    path: '/product-config',
    children: [
      {
        name: 'CategoryManage',
        path: '/product-config/category',
        component: () => import('#/views/product/config/category/index.vue'),
        meta: {
          icon: 'lucide:list-tree',
          title: $t('product.config.categoryManage'),
        },
      },
      {
        name: 'AttributeCategory',
        path: '/product-config/attribute-category',
        component: () =>
          import('#/views/product/config/attribute-category/index.vue'),
        meta: {
          icon: 'lucide:list-filter',
          title: $t('product.config.attributeCategory'),
        },
      },
      {
        name: 'Attribute',
        path: '/product-config/attribute',
        component: () => import('#/views/product/config/attribute/index.vue'),
        meta: {
          icon: 'lucide:list-checks',
          title: $t('product.config.attribute'),
        },
      },
      {
        name: 'UnitLib',
        path: '/product-config/unit',
        component: () => import('#/views/product/config/unit/index.vue'),
        meta: {
          icon: 'lucide:ruler',
          title: $t('product.config.unitLib'),
        },
      },
      {
        name: 'MaterialCenter',
        path: '/product-config/material',
        component: () => import('#/views/product/config/material/index.vue'),
        meta: {
          icon: 'lucide:image',
          title: $t('product.config.materialCenter'),
        },
      },
      {
        name: 'TagLib',
        path: '/product-config/tag',
        component: () => import('#/views/product/config/tag/index.vue'),
        meta: {
          icon: 'lucide:tag',
          title: $t('product.config.tagLib'),
        },
      },
    ],
  },
  {
    meta: {
      icon: 'lucide:package',
      order: 3,
      title: $t('product.manage.title'),
    },
    name: 'ProductManage',
    path: '/product-manage',
    children: [
      {
        name: 'ProductSetting',
        path: '/product-manage/setting',
        component: () => import('#/views/product/manage/setting/index.vue'),
        meta: {
          icon: 'lucide:settings',
          title: $t('product.manage.productSetting'),
        },
      },
      {
        name: 'ProductInfo',
        path: '/product-manage/info',
        component: () => import('#/views/product/manage/info/index.vue'),
        meta: {
          icon: 'lucide:file-text',
          title: $t('product.manage.productInfo'),
        },
      },
      {
        name: 'SoldProducts',
        path: '/product-manage/sold',
        component: () => import('#/views/product/manage/sold/index.vue'),
        meta: {
          icon: 'lucide:shopping-cart',
          title: $t('product.manage.soldProducts'),
        },
      },
    ],
  },
];

export default routes;
