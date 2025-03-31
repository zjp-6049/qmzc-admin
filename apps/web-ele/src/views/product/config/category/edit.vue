<script setup lang="ts">
import type { CategoryItem } from '#/types/product';

import { onMounted, reactive, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';

import { createIconifyIcon } from '@vben/icons';

import { ElLoading, ElMessage } from 'element-plus';

import { getCategoryListApi, updateCategoryApi } from '#/api/core/product';

const UploadIcon = createIconifyIcon('mdi:cloud-upload');
const BackIcon = createIconifyIcon('mdi:arrow-left');

const route = useRoute();
const router = useRouter();

// 表单数据
const formRef = ref();
const uploadRef = ref();
const imageUrl = ref('');

const form = reactive({
  id: route.query.id ? Number(route.query.id) : undefined,
  name: '',
  parentId: undefined as number | undefined,
  status: '启用',
  icon: '',
});

// 上级类目列表
const parentCategories = ref<CategoryItem[]>([]);
const loading = ref(false);
const currentCategory = ref<CategoryItem | null>(null);

// 表单验证规则
const rules = {
  name: [
    { required: true, message: '请输入类目名称', trigger: 'blur' },
    { min: 2, max: 15, message: '长度在2到15个字符之间', trigger: 'blur' },
  ],
  parentId: [
    {
      required: false,
      message: '请选择上级类目',
      trigger: 'change',
    },
  ],
};

// 获取所有类目
const fetchAllCategories = async () => {
  try {
    loading.value = true;
    const res = await getCategoryListApi();

    // 查找当前编辑的类目
    if (form.id) {
      findCurrentCategory(res, form.id);
    }

    // 提取所有类目，用于选择上级类目
    parentCategories.value = flattenCategories(res);

    // 移除当前类目及其子类目，避免选择自己作为父类目
    if (currentCategory.value) {
      removeCurrentCategoryFromOptions();
    }

    // 填充表单数据
    if (currentCategory.value) {
      form.name = currentCategory.value.name;
      form.parentId = currentCategory.value.parentId;
      form.status = currentCategory.value.status;
      form.icon = currentCategory.value.icon || '';

      if (form.icon) {
        imageUrl.value = form.icon;
      }
    }
  } catch (error) {
    console.error('获取类目列表失败:', error);
    ElMessage.error('获取类目列表失败');
  } finally {
    loading.value = false;
  }
};

// 查找当前编辑的类目
const findCurrentCategory = (
  categories: CategoryItem[],
  id: number,
): boolean => {
  for (const category of categories) {
    if (category.id === id) {
      currentCategory.value = category;
      return true;
    }

    if (
      category.children &&
      category.children.length > 0 &&
      findCurrentCategory(category.children, id)
    ) {
      return true;
    }
  }

  return false;
};

// 移除当前类目及其子类目，避免选择自己作为父类目
const removeCurrentCategoryFromOptions = () => {
  if (!currentCategory.value) return;

  const removeSelfAndChildren = (categoryId: number) => {
    parentCategories.value = parentCategories.value.filter((item) => {
      return item.id !== categoryId;
    });
  };

  const collectChildrenIds = (
    category: CategoryItem,
    ids: number[] = [],
  ): number[] => {
    ids.push(category.id);

    if (category.children && category.children.length > 0) {
      for (const child of category.children) {
        collectChildrenIds(child, ids);
      }
    }

    return ids;
  };

  // 收集当前类目及其所有子类目的ID
  const categoryIds = collectChildrenIds(currentCategory.value);

  // 从选项中移除这些ID
  for (const id of categoryIds) {
    removeSelfAndChildren(id);
  }
};

// 将嵌套的类目树展平为一维数组
const flattenCategories = (
  categories: CategoryItem[],
  level = 0,
  result: CategoryItem[] = [],
): CategoryItem[] => {
  categories.forEach((category) => {
    // 添加层级前缀，用于显示缩进效果
    const prefix = level > 0 ? `${''.padStart(level * 2, '　')}└ ` : '';
    const flatCategory = { ...category, name: prefix + category.name };
    result.push(flatCategory);

    if (category.children && category.children.length > 0) {
      flattenCategories(category.children, level + 1, result);
    }
  });

  return result;
};

// 图片上传前的验证
const beforeAvatarUpload = (file: File) => {
  const isImage = /\.(?:jpe?g|png|gif)$/i.test(file.name);
  const isLt2M = file.size / 1024 / 1024 < 2;

  if (!isImage) {
    ElMessage.error('上传图标只能是图片格式!');
    return false;
  }

  if (!isLt2M) {
    ElMessage.error('上传图标大小不能超过2MB!');
    return false;
  }

  return true;
};

// 图片上传成功的回调
const handleAvatarSuccess = (response: any) => {
  // 实际项目中这里会得到图片的URL
  // 这里模拟一个URL
  imageUrl.value = `https://example.com/images/${response.data.filename}`;
  form.icon = imageUrl.value;
};

// 图片上传失败的回调
const handleAvatarError = () => {
  ElMessage.error('上传图片失败，请重试');
};

// 提交表单
const submitForm = async () => {
  if (!formRef.value) return;

  await formRef.value.validate(async (valid: boolean) => {
    if (valid) {
      const loadingInstance = ElLoading.service({
        text: '正在提交...',
      });

      try {
        // 添加操作者信息和时间信息
        const categoryData = {
          ...form,
          operator: '当前用户', // 实际项目中这里应该使用当前登录用户的信息
          updateTime: new Date().toISOString().replace('T', ' ').slice(0, 19),
        };

        await updateCategoryApi(categoryData);
        ElMessage.success('修改成功');
        router.push('/product/config/category');
      } catch (error) {
        console.error('修改失败:', error);
        ElMessage.error('修改失败');
      } finally {
        loadingInstance.close();
      }
    } else {
      ElMessage.error('请正确填写表单');
      return false;
    }
  });
};

// 返回列表页
const goBack = () => {
  router.push('/product/config/category');
};

onMounted(() => {
  if (!route.query.id) {
    ElMessage.error('缺少类目ID参数');
    router.push('/product/config/category');
    return;
  }

  fetchAllCategories();
});
</script>

<template>
  <el-card class="edit-category-card">
    <template #header>
      <div class="card-header">
        <div class="title-section">
          <el-button class="back-button" :icon="BackIcon" @click="goBack">
            返回
          </el-button>
          <h2 class="page-title">编辑类目</h2>
        </div>
      </div>
    </template>

    <el-form
      v-loading="loading"
      ref="formRef"
      :model="form"
      :rules="rules"
      label-position="right"
      label-width="100px"
    >
      <el-form-item label="类目名称" prop="name">
        <el-input
          v-model="form.name"
          placeholder="请输入类目名称"
          maxlength="15"
          show-word-limit
          style="width: 400px"
        />
      </el-form-item>

      <el-form-item label="上级类目" prop="parentId">
        <el-select
          v-model="form.parentId"
          placeholder="请选择上级类目，不选择则为一级类目"
          style="width: 400px"
          clearable
        >
          <el-option
            v-for="item in parentCategories"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          />
        </el-select>
      </el-form-item>

      <el-form-item label="状态" prop="status">
        <el-switch
          v-model="form.status"
          active-text="启用"
          inactive-text="禁用"
          active-value="启用"
          inactive-value="禁用"
        />
      </el-form-item>

      <el-form-item label="类目图标">
        <el-upload
          ref="uploadRef"
          class="avatar-uploader"
          action="/api/upload"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :on-error="handleAvatarError"
          :before-upload="beforeAvatarUpload"
        >
          <img v-if="imageUrl" :src="imageUrl" class="avatar" />
          <el-icon v-else class="avatar-uploader-icon">
            <UploadIcon />
          </el-icon>
        </el-upload>
        <div class="upload-hint">
          图标尺寸为18*18，大小不能超过200KB，图片只能为JPG、PNG、GIF格式
        </div>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="submitForm">提交</el-button>
        <el-button @click="goBack">取消</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<style scoped>
.edit-category-card {
  margin: 8px;
  border-radius: 4px;
  box-shadow: 0 2px 12px 0 rgb(0 0 0 / 10%);
}

.card-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.title-section {
  display: flex;
  align-items: center;
}

.back-button {
  margin-right: 15px;
}

.page-title {
  margin: 0;
  font-size: 20px;
  color: #303133;
}

.avatar-uploader {
  position: relative;
  width: 178px;
  height: 178px;
  overflow: hidden;
  cursor: pointer;
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  transition: border-color 0.3s;
}

.avatar-uploader:hover {
  border-color: #409eff;
}

.avatar-uploader-icon {
  width: 178px;
  height: 178px;
  font-size: 28px;
  line-height: 178px;
  color: #8c939d;
  text-align: center;
}

.avatar {
  display: block;
  width: 178px;
  height: 178px;
}

.upload-hint {
  margin-top: 10px;
  font-size: 12px;
  color: #909399;
}
</style>
