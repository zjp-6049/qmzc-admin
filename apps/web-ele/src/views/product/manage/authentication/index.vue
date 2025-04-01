<script lang="ts" setup>
import type { VxeGridListeners, VxeGridProps } from '#/adapter/vxe-table';

import { useVbenVxeGrid } from '#/adapter/vxe-table';
import {
  DEFAULT_INPUT_PLACEHOLDER,
  DEFAULT_SELECT_PLACEHOLDER,
} from '#/views/product/manage/libs/constants/message';

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
  columns: [
    { field: 'name', title: '类目' },
    { field: 'name', title: '品牌' },
    { field: 'name', title: '鉴定商品名称' },
    { field: 'name', title: '申请鉴定时间' },
    { field: 'name', title: '鉴定进度' },
    { field: 'name', title: '鉴定结果' },
    { field: 'name', title: '鉴定次数' },
    { field: 'name', title: '鉴定师鉴定费' },
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

const gridEvents: VxeGridListeners<RowType> = {};

const [Grid] = useVbenVxeGrid({ gridEvents, gridOptions });
</script>

<template>
  <QMZCPage page-title="商品列表">
    <template #content>
      <div class="p-5">
        <el-form :ref="searchFormRef" :model="searchForm" inline>
          <el-form-item label="类目名称">
            <el-select
              :placeholder="DEFAULT_SELECT_PLACEHOLDER"
              class="!w-[220px]"
            />
          </el-form-item>
          <el-form-item label="商品名称">
            <el-input
              :placeholder="DEFAULT_INPUT_PLACEHOLDER"
              class="!w-[220px]"
            />
          </el-form-item>
          <el-form-item label="品牌名称">
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
        <div class="">
          <Grid />
        </div>
      </div>
    </template>
  </QMZCPage>
</template>
