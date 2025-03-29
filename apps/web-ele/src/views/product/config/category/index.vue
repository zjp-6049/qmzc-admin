<script lang="ts" setup>
import { onMounted } from 'vue';

// 类目管理组件
import axios from 'axios';
// 直接请求代理路径
onMounted(() => {
  const params = {
    username: 'admin',
    password: 'admin123',
  };
  axios.post('/dev-api/auth/login', params).then((_) => {});
});
</script>

<template>
  <div>
    <h1>类目管理</h1>
  </div>
</template>

<style scoped></style>
