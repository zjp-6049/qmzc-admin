import { defineEventHandler, readBody } from 'h3';

export default defineEventHandler(async (event) => {
  const { id } = await readBody(event);

  if (!id) {
    return {
      code: 400,
      message: '类目ID不能为空',
    };
  }

  // 实际开发中会从数据库中删除数据
  // 这里只是模拟删除成功
  return {
    code: 200,
    data: true,
    message: '删除成功',
  };
});
