<script setup lang="ts">
import type { CategoryItem } from '#/types/product';

import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';

import { createIconifyIcon } from '@vben/icons';

import { ElMessage, ElMessageBox } from 'element-plus';

import { deleteCategoryApi, getCategoryListApi } from '#/api/core/product';

// 创建图标组件
const SearchIcon = createIconifyIcon('mdi:magnify');
const PlusIcon = createIconifyIcon('mdi:plus');
const EditIcon = createIconifyIcon('mdi:pencil');
const DeleteIcon = createIconifyIcon('mdi:delete');
const FolderIcon = createIconifyIcon('mdi:folder');
const BanIcon = createIconifyIcon('mdi:cancel');

interface CategoryOption {
  value: string;
  label: string;
}

const router = useRouter();

// 搜索区域数据
const searchCategory = ref('');
const categoryOptions = ref<CategoryOption[]>([]);

// 表格数据
const tableData = ref<CategoryItem[]>([]);
const loading = ref(false);

// 分页数据
const currentPage = ref(1);
const pageSize = ref(10);
const total = ref(0);
const goToPage = ref(1);

// 获取类目列表数据
const fetchCategoryList = async () => {
  try {
    loading.value = true;
    const res = await getCategoryListApi();
    tableData.value = res;
    // 提取顶级类目作为搜索选项
    categoryOptions.value = res.map((item) => ({
      value: item.name,
      label: item.name,
    }));
    total.value = res.length;
  } catch (error) {
    console.error('获取类目列表失败:', error);
    ElMessage.error('获取类目列表失败');
  } finally {
    loading.value = false;
  }
};

// 方法
const handleSearch = () => {
  console.log('搜索:', searchCategory.value);
  // 实际业务中可以根据搜索条件过滤数据
};

const handleAdd = () => {
  router.push('/product/config/category/add');
};

const handleAddSubCategory = (row: CategoryItem) => {
  router.push({
    path: '/product/config/category/add',
    query: { parentId: row.id.toString(), parentName: row.name },
  });
};

const handleEdit = (row: CategoryItem) => {
  router.push({
    path: '/product/config/category/edit',
    query: { id: row.id.toString() },
  });
};

const handleDelete = (row: CategoryItem) => {
  ElMessageBox.confirm(`确认删除类目 "${row.name}" 吗？`, '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning',
  })
    .then(async () => {
      try {
        await deleteCategoryApi(row.id);
        ElMessage.success('删除成功');
        fetchCategoryList(); // 重新加载数据
      } catch (error) {
        console.error('删除失败:', error);
        ElMessage.error('删除失败');
      }
    })
    .catch(() => {
      // 取消删除
    });
};

const handleDisable = (row: CategoryItem) => {
  ElMessageBox.confirm(
    `你确定要${row.status === '启用' ? '禁用' : '启用'}当前${row.name}吗？`,
    '提示',
    {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning',
    },
  )
    .then(async () => {
      try {
        // 这里应该调用API来更新状态
        // 模拟API调用
        setTimeout(() => {
          row.status = row.status === '启用' ? '禁用' : '启用';
          ElMessage.success(`${row.status === '启用' ? '启用' : '禁用'}成功`);
        }, 500);
      } catch (error) {
        console.error(`${row.status === '禁用' ? '启用' : '禁用'}失败:`, error);
        ElMessage.error(`${row.status === '禁用' ? '启用' : '禁用'}失败`);
      }
    })
    .catch(() => {
      // 取消操作
    });
};

const handleSizeChange = (val: number) => {
  pageSize.value = val;
  // 表格数据已经是分层的树形结构，不需要重新加载
};

const handleCurrentChange = (val: number) => {
  currentPage.value = val;
  // 表格数据已经是分层的树形结构，不需要重新加载
};

// 页面加载时获取数据
onMounted(() => {
  fetchCategoryList();
});
</script>

<template>
  <el-card class="category-manage-card">
    <template #header>
      <div class="card-header">
        <h2 class="page-title">商品类目管理</h2>
      </div>
    </template>

    <!-- 搜索区域 -->
    <div class="search-area">
      <el-select
        v-model="searchCategory"
        placeholder="请选择类目"
        style="width: 300px"
        clearable
      >
        <el-option
          v-for="item in categoryOptions"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        />
      </el-select>

      <el-button type="primary" :icon="SearchIcon" @click="handleSearch">
        搜索
      </el-button>
    </div>

    <!-- 列表区域 -->
    <div class="list-header">
      <span class="title">商品类目列表</span>
      <el-button type="primary" :icon="PlusIcon" @click="handleAdd">
        添加
      </el-button>
    </div>

    <!-- 表格 -->
    <el-table
      v-loading="loading"
      :data="tableData"
      style="width: 100%; margin-bottom: 20px"
      row-key="id"
      border
      default-expand-all
      :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
      :header-cell-style="{
        background: '#f5f7fa',
        color: '#606266',
        fontWeight: 'bold',
      }"
    >
      <el-table-column
        prop="name"
        label="类目名称"
        min-width="200"
        align="left"
      />
      <el-table-column label="图标" width="80" align="center">
        <template #default>
          <FolderIcon class="size-5" />
        </template>
      </el-table-column>
      <el-table-column prop="status" label="状态" width="100" align="center">
        <template #default="scope">
          <el-tag
            :type="scope.row.status === '启用' ? 'success' : 'danger'"
            effect="dark"
          >
            {{ scope.row.status }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column
        prop="operator"
        label="操作者"
        min-width="100"
        align="center"
      />
      <el-table-column
        prop="createTime"
        label="创建时间"
        min-width="160"
        align="center"
      />
      <el-table-column
        prop="updateTime"
        label="最后修改时间"
        min-width="160"
        align="center"
      />
      <el-table-column label="操作" min-width="350" align="center">
        <template #default="scope">
          <div class="operation-buttons">
            <el-button
              size="small"
              type="primary"
              plain
              :icon="PlusIcon"
              @click="handleAddSubCategory(scope.row)"
            >
              新增子类
            </el-button>
            <el-button
              size="small"
              type="primary"
              plain
              :icon="EditIcon"
              @click="handleEdit(scope.row)"
            >
              编辑
            </el-button>
            <el-button
              size="small"
              :type="scope.row.status === '启用' ? 'warning' : 'success'"
              plain
              :icon="BanIcon"
              @click="handleDisable(scope.row)"
            >
              {{ scope.row.status === '启用' ? '禁用' : '启用' }}
            </el-button>
            <el-button
              size="small"
              type="danger"
              plain
              :icon="DeleteIcon"
              @click="handleDelete(scope.row)"
            >
              删除
            </el-button>
          </div>
        </template>
      </el-table-column>
    </el-table>

    <!-- 分页 -->
    <div class="pagination-container">
      <div class="total-info">共 {{ total }} 条</div>
      <div class="pagination-controls">
        <el-select
          v-model="pageSize"
          style="width: 110px"
          class="page-size-select"
        >
          <el-option :value="10" label="10/page" />
          <el-option :value="20" label="20/page" />
          <el-option :value="50" label="50/page" />
        </el-select>

        <el-pagination
          v-model:current-page="currentPage"
          :page-size="pageSize"
          layout="prev, pager, next, jumper"
          :total="total"
          background
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        />

        <div class="goto">
          Go to
          <el-input v-model="goToPage" style="width: 60px" />
        </div>
      </div>
    </div>
  </el-card>
</template>

<style scoped>
.category-manage-card {
  margin: 8px;
  border-radius: 4px;
  box-shadow: 0 2px 12px 0 rgb(0 0 0 / 10%);
}

.card-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.page-title {
  margin: 0;
  font-size: 20px;
  color: #303133;
}

.search-area {
  display: flex;
  gap: 12px;
  align-items: center;
  margin-bottom: 24px;
}

.list-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 16px;
}

.list-header .title {
  font-size: 18px;
  font-weight: bold;
  color: #303133;
}

.operation-buttons {
  display: flex;
  gap: 8px;
  justify-content: center;
}

.pagination-container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-top: 16px;
  margin-top: 24px;
  border-top: 1px solid #ebeef5;
}

.total-info {
  font-size: 14px;
  color: #606266;
}

.pagination-controls {
  display: flex;
  gap: 16px;
  align-items: center;
}

.page-size-select {
  margin-right: 8px;
}

.goto {
  display: flex;
  gap: 8px;
  align-items: center;
  color: #606266;
}
</style>
