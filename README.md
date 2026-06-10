# 夜宵搭子

基于 Next.js 14、Tailwind CSS、shadcn/ui 风格组件和 Supabase 的轻量夜宵邀约工具。

## 本地运行

1. 安装依赖：`npm install`
2. 复制 `.env.example` 为 `.env.local`
3. 在 Supabase SQL Editor 执行 `supabase/schema.sql`
4. 填写 Supabase URL 和匿名密钥
5. 启动：`npm run dev`

未配置 Supabase 时，邀请列表会使用内置演示数据。
