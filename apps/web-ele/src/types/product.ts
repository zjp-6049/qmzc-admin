/**
 * 商品类目项
 */
export interface CategoryItem {
  /**
   * 唯一ID
   */
  id: number;
  /**
   * 父ID
   */
  parentId?: number;
  /**
   * 类别名称
   */
  name: string;
  /**
   * 状态：启用、禁用
   */
  status: string;
  /**
   * 操作者
   */
  operator: string;
  /**
   * 创建时间
   */
  createTime: string;
  /**
   * 更新时间
   */
  updateTime: string;
  /**
   * 图标URL
   */
  icon?: string;
  /**
   * 子类目
   */
  children?: CategoryItem[];
}
