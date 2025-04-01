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
    { field: 'name', title: '商品信息' },
    { field: 'name', title: '凭证编号' },
    { field: 'name', title: '拥有者' },
    { field: 'name', title: '流通状态' },
    { field: 'name', title: '发行方' },
    { field: 'name', title: '发行量/库存' },
    { field: 'name', title: '当前市场价' },
    {
      cellRender: { name: 'CellLink', props: { text: '360视图' } },
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
};

const gridEvents: VxeGridListeners<RowType> = {};

const [Grid] = useVbenVxeGrid({ gridEvents, gridOptions });
</script>

<template>
  <QMZCPage>
    <template #content>
      <div class="p-5">
        <el-form :ref="searchFormRef" :model="searchForm" inline>
          <el-form-item label="凭证编号">
            <el-input
              :placeholder="DEFAULT_INPUT_PLACEHOLDER"
              class="!w-[220px]"
            />
          </el-form-item>
          <el-form-item label="流通状态">
            <el-select
              :placeholder="DEFAULT_SELECT_PLACEHOLDER"
              class="!w-[220px]"
            />
          </el-form-item>
          <el-form-item label="市场价格">
            <div class="flex items-center">
              <el-input class="!w-[100px]" placeholder="元" />
              <span class="mx-2">至</span>
              <el-input class="!w-[100px]" placeholder="元" />
            </div>
          </el-form-item>
          <el-form-item label="商品编号">
            <el-input
              :placeholder="DEFAULT_INPUT_PLACEHOLDER"
              class="!w-[220px]"
            />
          </el-form-item>
          <el-form-item label="商品类目">
            <el-select
              :placeholder="DEFAULT_SELECT_PLACEHOLDER"
              class="!w-[220px]"
            />
          </el-form-item>
          <el-form-item label="品牌名称">
            <el-select
              :placeholder="DEFAULT_SELECT_PLACEHOLDER"
              class="!w-[220px]"
            />
          </el-form-item>
          <el-form-item label="发行时间">
            <el-date-picker
              :start-placeholder="DEFAULT_SELECT_PLACEHOLDER"
              end-placeholder="结束日期"
              range-separator="至"
              type="daterange"
            />
          </el-form-item>
          <el-form-item label="成交时间">
            <el-date-picker
              :start-placeholder="DEFAULT_SELECT_PLACEHOLDER"
              end-placeholder="结束日期"
              range-separator="至"
              type="daterange"
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
