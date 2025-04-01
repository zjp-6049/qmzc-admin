<script lang="ts" setup>
// 已售商品组件
import { useRoute } from 'vue-router';

interface IProps {
  pageTitle?: string;
  hasPageTitle?: boolean;
}

defineOptions({
  name: 'QMZCPage',
});

const { pageTitle, hasPageTitle = true } = defineProps<IProps>();
const route = useRoute();
</script>

<template>
  <div class="h-full p-5">
    <div class="rounded-[5px] border border-solid border-[#D1D1D1] bg-white">
      <h1
        v-if="hasPageTitle"
        class="border-b-solid mx-2 border-b border-[#D1D1D1] p-2 text-2xl font-bold"
      >
        {{ pageTitle || route.meta.title }}
      </h1>

      <div>
        <slot name="content"></slot>
      </div>
    </div>
  </div>
</template>
