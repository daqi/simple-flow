# 全栈开发

1. monorepo pnpm
2. 后端 hono + Prisma
3. 前端 vite + react
4. 流程图 React Flow

https://www.pnpm.cn/  
https://hono.dev/  
https://www.prisma.io/  
https://vite.dev/  
https://reactflow.dev/

## 步骤

1. 创建项目 `mkdir my-flow`
2. 打开项目 `code my-flow`
3. 初始化 git `git init`
4. 初始化 pnpm `pnpm init`
5. 创建 pnpm-workspace.yaml

```yaml
packages:
    - 'apps/*'
```

6. 创建 apps `mkdir apps`
7. 创建 server `pnpm create hono@latest`
8. 启动 server
9. 创建 client `pnpm create vite`
10. 启动 client
11. 创建 count 接口，前后端联调
12. 安装 Prisma 跑一下 [quickstart](https://www.prisma.io/docs/getting-started/quickstart-sqlite) 
13. 创建 user 增删改查，前后端联调
