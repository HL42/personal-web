# Personal Portfolio Website

我的个人作品集网站，展示我的项目、经历和技能。

🌐 **Live Demo**: [https://personal-web-steel-ten.vercel.app/](https://personal-web-steel-ten.vercel.app/)

## 关于这个项目

这是一个用 React + TypeScript 构建的个人作品集网站，展示了我的：
- 🎯 个人介绍和技能
- 💼 工作经历和教育背景
- 🚀 精选项目（包含项目详情页）
- 📧 联系方式

## 技术栈

- **React 19** - UI 框架
- **TypeScript** - 类型安全
- **Vite** - 构建工具
- **Framer Motion** - 动画效果
- **React Router** - 路由管理
- **Tailwind CSS** - 样式（通过 CDN）

## 本地运行

1. 克隆仓库
```bash
git clone https://github.com/HL42/personal-web.git
cd personal-web
```

2. 安装依赖
```bash
npm install
```

3. 启动开发服务器
```bash
npm run dev
```

4. 打开浏览器访问 `http://localhost:5173`

## 构建生产版本

```bash
npm run build
```

构建后的文件会在 `dist` 目录中。

## 项目结构

```
src/
├── components/     # React 组件
│   ├── Hero.tsx           # 首页英雄区
│   ├── ProjectList.tsx    # 项目列表
│   ├── ProjectDetail.tsx # 项目详情页
│   ├── ExperienceList.tsx # 经历和技能
│   └── Contact.tsx        # 联系方式
├── constants.ts    # 数据常量（项目、经历等）
├── types.ts        # TypeScript 类型定义
└── main.tsx        # 入口文件
```

## 部署

这个项目部署在 Vercel 上，每次推送到 main 分支会自动触发部署。

## 联系方式

- 📧 Email: fuquanlin347@gmail.com
- 💼 LinkedIn: [LinkedIn Profile](https://www.linkedin.com/in/fuquan-lin-1b3ba3290)
- 💻 GitHub: [github.com/HL42](https://github.com/HL42)

---

Made with ❤️ using React + TypeScript + Vite
