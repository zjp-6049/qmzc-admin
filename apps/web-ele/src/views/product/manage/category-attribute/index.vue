<script lang="ts" setup>
import type { VxeGridListeners, VxeGridProps } from '#/adapter/vxe-table';

import { useVbenVxeGrid } from '#/adapter/vxe-table';
import { router } from '#/router';
import { DEFAULT_SELECT_PLACEHOLDER } from '#/views/product/manage/libs/constants/message';

const searchForm = ref({});
const searchFormRef = ref();

interface RowType {
  address: string;
  age: number;
  id: number;
  name: string;
  nickname: string;
  role: string;
}

const gridOptions: VxeGridProps = {
  border: true,
  toolbarConfig: {
    buttons: [{ name: '新增', code: 'add', status: 'primary' }],
  },
  columns: [
    { field: 'name', title: '类目名称' },
    { field: 'name', title: '操作者' },
    { field: 'name', title: '创建时间' },
    { field: 'name', title: '最后修改时间' },
    {
      cellRender: { name: 'CellLink', props: { text: '编辑' } },
      field: 'action',
      fixed: 'right',
      title: '操作',
      width: 120,
    },
  ],
  data: [{ name: 'ok' }],
  pagerConfig: {
    total: 100,
    currentPage: 1,
    pageSize: 10,
    layouts: [
      'Sizes',
      'FullJump',
      'Total',
      'Home',
      'PrevJump',
      'PrevPage',
      'Number',
      'NextPage',
      'NextJump',
      'End',
    ],
  },
  sortConfig: {
    multiple: true,
  },
};

const gridEvents: VxeGridListeners<RowType> = {
  toolbarButtonClick(params) {
    if (params.code === 'add') {
      router.push({
        name: 'ProductCategoryAttributeAdd',
      });
    }
  },
};

const [Grid] = useVbenVxeGrid({ gridEvents, gridOptions });
</script>

<template>
  <QMZCPage page-title="类目属性配置列表">
    <template #content>
      <div class="p-5">
        <el-form :ref="searchFormRef" :model="searchForm" inline>
          <el-form-item label="类目名称">
            <el-select
              :placeholder="DEFAULT_SELECT_PLACEHOLDER"
              class="!w-[220px]"
            />
          </el-form-item>
          <el-form-item>
            <el-button type="primary">搜索</el-button>
            <el-button>重置</el-button>
          </el-form-item>
        </el-form>
        <!-- 此处的`vp-raw` 是为了适配文档的展示效果，实际使用时不需要 -->
        <div>
          <Grid />
        </div>
      </div>
    </template>
  </QMZCPage>
</template>
