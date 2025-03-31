import { defineEventHandler, readBody } from 'h3';

export default defineEventHandler(async (event) => {
  const { id, status } = await readBody(event);

  if (!id) {
    return {
      code: 400,
      message: '类目ID不能为空',
    };
  }

  if (!status) {
    return {
      code: 400,
      message: '状态不能为空',
    };
  }

  // 实际开发中会从数据库中更新数据
  // 这里只是模拟更新成功
  return {
    code: 200,
    data: { id, status },
    message: '状态更新成功',
  };
});
