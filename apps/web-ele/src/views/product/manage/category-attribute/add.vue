<script lang="ts" setup>
import { reactive, ref } from 'vue';

import {
  DEFAULT_INPUT_PLACEHOLDER,
  DEFAULT_SELECT_PLACEHOLDER,
} from '#/views/product/manage/libs/constants/message';

const currentStep = ref(2);
const value = ref([]);
const options = [
  {
    value: 'guide',
    label: 'Guide',
    children: [
      {
        value: 'disciplines',
        label: 'Disciplines',
        children: [
          {
            value: 'consistency',
            label: 'Consistency',
          },
          {
            value: 'feedback',
            label: 'Feedback',
          },
          {
            value: 'efficiency',
            label: 'Efficiency',
          },
          {
            value: 'controllability',
            label: 'Controllability',
          },
        ],
      },
      {
        value: 'navigation',
        label: 'Navigation',
        children: [
          {
            value: 'side nav',
            label: 'Side Navigation',
          },
          {
            value: 'top nav',
            label: 'Top Navigation',
          },
        ],
      },
    ],
  },
];

const basicInfoForm = reactive({});

function handleNextStep() {
  if (value.value.length === 0) {
    // return ElMessage.error('请选择商品类别');
  }

  currentStep.value = 2;
}

const attributeList = ref([
  {
    name: '长',
    type: 'input',
    required: true,
  },
  {
    name: '宽',
    type: 'input',
    required: true,
  },
  {
    name: '商品图片哈哈哈哈哈',
    type: 'imageUpload',
    required: true,
  },
]);
</script>

<template>
  <QMZCPage :has-page-title="false">
    <template #content>
      <div class="flex items-start">
        <div class="flex h-full w-[300px] flex-col items-center p-5">
          <el-input placeholder="请输入属性名称" />
          <div class="mt-4">
            <div class="grid grid-cols-2 gap-x-3 gap-y-3">
              <div
                v-for="item in attributeList"
                :key="item.name"
                class="cursor-pointer rounded-[5px] bg-[#A0A0A0] p-4 text-center text-white"
              >
                {{ item.name }}
              </div>
            </div>
          </div>
        </div>

        <div class="flex-1 border-l border-solid border-[#D1D1D1] py-5">
          <div>
            <h1 class="text-center text-2xl font-bold">添加类目商品属性</h1>
            <el-steps :active="currentStep" align-center class="mt-5">
              <el-step title="选择类目" />
              <el-step title="填写商品属性" />
            </el-steps>
          </div>
          <div v-show="currentStep === 1">
            <QMZCFormDiv class="mt-5" div-name="商品分类" />

            <div class="mt-5 flex justify-center">
              <div>
                <el-cascader-panel
                  v-model="value"
                  :options="options"
                  clearable
                  filterable
                />
                <div class="mt-5">
                  <div>
                    <span>{{
                      value.length > 0
                        ? '您当前选择的商品类别是'
                        : '您当前没有选择商品类别'
                    }}</span>
                    <span class="ml-2 text-red-600">{{
                      value.join(' > ')
                    }}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div v-show="currentStep === 2">
            <div>
              <QMZCFormDiv class="mt-5" div-name="基础信息" />

              <div class="flex items-start">
                <div class="mt-5 flex flex-1 justify-center">
                  <div>
                    <el-form :model="basicInfoForm" label-width="auto">
                      <el-form-item label="商品分类" required>
                        <span class="font-bold">{{ value.join(' > ') }}</span>
                      </el-form-item>
                      <el-form-item label="是否流通" required>
                        <div class="flex items-center">
                          <el-switch />
                          <el-select
                            :model-value="1"
                            class="ml-2 !w-[100px]"
                            disabled
                          >
                            <el-option :value="1" label="必选"> 必选</el-option>
                          </el-select>
                        </div>
                      </el-form-item>
                      <el-form-item label="商品名称" required>
                        <div class="flex items-center">
                          <el-input
                            :placeholder="DEFAULT_INPUT_PLACEHOLDER"
                            class="!w-[500px]"
                            clearable
                          />
                          <el-select
                            :model-value="1"
                            class="ml-2 !w-[100px]"
                            disabled
                          >
                            <el-option :value="1" label="必选"> 必选</el-option>
                          </el-select>
                        </div>
                      </el-form-item>
                      <el-form-item label="商品品牌" required>
                        <div class="flex items-center">
                          <el-select
                            :placeholder="DEFAULT_SELECT_PLACEHOLDER"
                            class="!w-[500px]"
                            clearable
                          />
                          <el-select
                            :model-value="1"
                            class="ml-2 !w-[100px]"
                            disabled
                          >
                            <el-option :value="1" label="必选"> 必选</el-option>
                          </el-select>
                        </div>
                      </el-form-item>
                      <el-form-item label="无理由退货" required>
                        <div class="flex items-center">
                          <el-switch />
                          <el-select
                            :model-value="1"
                            class="ml-2 !w-[100px]"
                            disabled
                          >
                            <el-option :value="1" label="必选"> 必选</el-option>
                          </el-select>
                        </div>
                      </el-form-item>
                      <el-form-item label="产地" required>
                        <div class="flex items-center">
                          <el-select
                            :placeholder="DEFAULT_SELECT_PLACEHOLDER"
                            class="!w-[500px]"
                            clearable
                          />
                          <el-select
                            :model-value="1"
                            class="ml-2 !w-[100px]"
                            disabled
                          >
                            <el-option :value="1" label="必选"> 必选</el-option>
                          </el-select>
                        </div>
                      </el-form-item>
                      <el-form-item label="商品说明" required>
                        <div class="flex items-center">
                          <el-input
                            :placeholder="DEFAULT_INPUT_PLACEHOLDER"
                            class="!w-[500px]"
                            clearable
                          />
                          <el-select
                            :model-value="1"
                            class="ml-2 !w-[100px]"
                            disabled
                          >
                            <el-option :value="1" label="必选"> 必选</el-option>
                          </el-select>
                        </div>
                      </el-form-item>
                      <el-form-item label="发行价格/售价" required>
                        <div class="flex items-center">
                          <el-input
                            :placeholder="DEFAULT_INPUT_PLACEHOLDER"
                            class="!w-[500px]"
                            clearable
                          />
                          <el-select
                            :model-value="1"
                            class="ml-2 !w-[100px]"
                            disabled
                          >
                            <el-option :value="1" label="必选"> 必选</el-option>
                          </el-select>
                        </div>
                      </el-form-item>
                      <el-form-item label="发行数量/库存" required>
                        <div class="flex items-center">
                          <el-input
                            :placeholder="DEFAULT_INPUT_PLACEHOLDER"
                            class="!w-[500px]"
                            clearable
                          />
                          <el-select
                            :model-value="1"
                            class="ml-2 !w-[100px]"
                            disabled
                          >
                            <el-option :value="1" label="必选"> 必选</el-option>
                          </el-select>
                        </div>
                      </el-form-item>
                    </el-form>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <QMZCFormDiv class="mt-5" div-name="拓展信息" />
              <div class="mt-5 flex items-start">
                <div class="flex flex-1 justify-center">
                  <div>
                    <el-form :model="basicInfoForm" label-width="auto">
                      <el-form-item label="商品分类" required>
                        <span class="font-bold">{{ value.join(' > ') }}</span>
                      </el-form-item>
                      <el-form-item label="是否流通" required>
                        <el-switch />
                      </el-form-item>
                      <el-form-item label="商品名称" required>
                        <el-input
                          :placeholder="DEFAULT_INPUT_PLACEHOLDER"
                          class="!w-[500px]"
                          clearable
                        />
                      </el-form-item>
                      <el-form-item label="商品品牌" required>
                        <el-select
                          :placeholder="DEFAULT_SELECT_PLACEHOLDER"
                          class="!w-[500px]"
                          clearable
                        />
                      </el-form-item>
                      <el-form-item label="无理由退货" required>
                        <el-switch />
                      </el-form-item>
                      <el-form-item label="产地" required>
                        <el-select
                          :placeholder="DEFAULT_SELECT_PLACEHOLDER"
                          class="!w-[500px]"
                          clearable
                        />
                      </el-form-item>
                      <el-form-item label="商品说明" required>
                        <el-input
                          :placeholder="DEFAULT_INPUT_PLACEHOLDER"
                          class="!w-[500px]"
                          clearable
                        />
                      </el-form-item>
                      <el-form-item label="发行价格/售价" required>
                        <el-input
                          :placeholder="DEFAULT_INPUT_PLACEHOLDER"
                          class="!w-[500px]"
                          clearable
                        />
                      </el-form-item>
                      <el-form-item label="发行数量/库存" required>
                        <el-input
                          :placeholder="DEFAULT_INPUT_PLACEHOLDER"
                          class="!w-[500px]"
                          clearable
                        />
                      </el-form-item>
                    </el-form>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="mt-5">
            <div v-if="currentStep === 1" class="text-center">
              <el-button type="primary" @click="handleNextStep">
                下一步
              </el-button>
            </div>
            <div v-else class="text-center">
              <el-button @click="currentStep = 1">上一步</el-button>
              <el-button class="ml-5" type="primary">提交</el-button>
            </div>
          </div>
        </div>
      </div>
    </template>
  </QMZCPage>
</template>
