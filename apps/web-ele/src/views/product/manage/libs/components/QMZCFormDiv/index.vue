<script lang="ts" setup>
interface IProps {
  divName: string;
}

defineOptions({
  name: 'QMZCFormDiv',
});

defineProps<IProps>();
</script>

<template>
  <div class="flex items-center bg-[#D1D1D1] py-4">
    <div class="h-5 w-3 bg-[#4B4B4B]"></div>
    <span class="ml-5 text-[18px]">{{ divName }}</span>
  </div>
</template>
