<script lang="ts" setup></script>

<template>
  <QMZCPage :has-page-title="false">
    <template #content>
      <div>
        <div class="p-5">
          <h1 class="text-center text-2xl font-bold">商品 360视图</h1>
        </div>
        <div class="mt-5">
          <QMZCFormDiv div-name="基础信息" />
        </div>
        <div class="mt-5">
          <QMZCFormDiv div-name="商品图片" />
        </div>
        <div class="mt-5">
          <QMZCFormDiv div-name="订单记录" />
        </div>
      </div>
    </template>
  </QMZCPage>
</template>

<style scoped></style>
