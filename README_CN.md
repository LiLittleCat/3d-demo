# 3D 点坐标可视化

[English](README.md)

这是一个基于 React、TypeScript 和 Three.js 的 3D 点坐标可视化工具。

## 功能特点

- 交互式 3D 坐标系可视化
- 添加、编辑和删除 3D 点坐标
- 实时更新 3D 场景中的点
- 清晰的坐标轴标识（X、Y、Z 和原点 O）
- 可调节的网格背景
- 响应式设计，适应不同屏幕尺寸

## 技术栈

- React
- TypeScript
- Vite
- Three.js / React Three Fiber
- Material-UI

## 使用说明

1. 在左侧面板的输入框中输入 X、Y、Z 坐标值。
2. 点击"添加点"按钮将新的点添加到列表和 3D 场景中。
3. 在点列表中，您可以编辑或删除已添加的点。
4. 3D 场景会实时更新以反映点的添加、编辑或删除。
5. 使用鼠标或触控板与 3D 场景交互：
   - 左键拖动：旋转视图
   - 右键拖动：平移视图
   - 滚轮：缩放视图

## 安装和运行

1. 克隆仓库：

   ```
   git clone https://github.com/LiLittleCat/3d-demo.git
   ```

2. 安装依赖：

   ```
   pnpm install
   ```

3. 启动开发服务器：

   ```
   pnpm dev
   ```

4. 在浏览器中打开 `http://localhost:5173` 查看应用。

## 构建生产版本

运行以下命令构建生产版本：

```
pnpm build
```

构建后的文件将位于 `dist` 目录中。

## 贡献

欢迎提交 issues 和 pull requests 来改进这个项目。
