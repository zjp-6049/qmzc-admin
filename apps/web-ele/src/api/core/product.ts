import type { CategoryItem } from '#/types/product';

import { requestClient } from '#/api/request';

/**
 * 获取商品类目列表
 */
export async function getCategoryListApi() {
  return requestClient.get<CategoryItem[]>('/product/category/list');
}

/**
 * 添加商品类目
 */
export async function addCategoryApi(data: Partial<CategoryItem>) {
  return requestClient.post('/product/category/add', data);
}

/**
 * 编辑商品类目
 */
export async function updateCategoryApi(data: Partial<CategoryItem>) {
  return requestClient.post('/product/category/update', data);
}

/**
 * 删除商品类目
 */
export async function deleteCategoryApi(id: number) {
  return requestClient.post('/product/category/delete', { id });
}

/**
 * 更新类目状态
 */
export async function updateCategoryStatusApi(id: number, status: string) {
  return requestClient.post('/product/category/status', { id, status });
}
