<script lang="ts" setup>
import { router } from '#/router';
</script>

<template>
  <QMZCPage :has-page-title="false">
    <template #content>
      <div>
        <div class="p-5">
          <h1 class="text-center text-2xl font-bold">添加类目商品属性</h1>
          <el-steps :active="2" align-center class="mt-5">
            <el-step title="选择类目" />
            <el-step title="填写商品属性" />
          </el-steps>
        </div>
        <div class="mt-5">
          cd
          <QMZCFormDiv div-name="商品分类" />
        </div>

        <div class="mt-5">
          <QMZCFormDiv div-name="拓展信息" />
        </div>

        <div class="mt-5">
          <el-button @click="router.back()">取消</el-button>
          <el-button class="ml-5" type="primary">提交</el-button>
        </div>
      </div>
    </template>
  </QMZCPage>
</template>

<style scoped></style>
