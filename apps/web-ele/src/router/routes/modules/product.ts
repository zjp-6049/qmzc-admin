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
        name: 'ProductCategoryAttribute',
        path: '/product-manage/category-attribute',
        component: () =>
          import('#/views/product/manage/category-attribute/index.vue'),
        meta: {
          icon: 'lucide:settings',
          title: '类目属性',
        },
      },
      {
        name: 'ProductCategoryAttributeAdd',
        path: '/product-manage/category-attribute/add',
        component: () =>
          import('#/views/product/manage/category-attribute/add.vue'),
        meta: {
          hideInMenu: true,
          icon: 'lucide:settings',
          title: '添加类目属性',
        },
      },
      {
        name: 'ProductAuthentication',
        path: '/product-manage/authentication',
        component: () =>
          import('#/views/product/manage/authentication/index.vue'),
        meta: {
          icon: 'lucide:search',
          title: '商品鉴定',
        },
      },
      {
        name: 'ProductInfo',
        path: '/product-manage/info',
        component: () => import('#/views/product/manage/libs/info/index.vue'),
        meta: {
          icon: 'lucide:file-text',
          title: '商品资料',
        },
      },
      {
        name: 'ProductCirculation',
        path: '/product-manage/circulation',
        component: () => import('#/views/product/manage/circulation/index.vue'),
        meta: {
          icon: 'lucide:shopping-cart',
          title: '流通商品',
        },
      },
    ],
  },
];

export default routes;
