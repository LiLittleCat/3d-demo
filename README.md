# 3D Point Coordinate Visualization

[中文](README_CN.md)

This is a 3D point coordinate visualization tool based on React, TypeScript, and Three.js.

## Features

- Interactive 3D coordinate system visualization
- Add, edit, and delete 3D point coordinates
- Real-time updates of points in the 3D scene
- Clear axis labels (X, Y, Z, and origin O)
- Adjustable grid background
- Responsive design to adapt to different screen sizes

## Tech Stack

- React
- TypeScript
- Vite
- Three.js / React Three Fiber
- Material-UI

## Instructions

1. Enter the X, Y, Z coordinate values in the input fields on the left panel.
2. Click the "Add Point" button to add the new point to the list and the 3D scene.
3. In the point list, you can edit or delete the added points.
4. The 3D scene will update in real-time to reflect the addition, editing, or deletion of points.
5. Use the mouse or touchpad to interact with the 3D scene:
   - Left-click and drag: Rotate the view
   - Right-click and drag: Pan the view
   - Scroll wheel: Zoom in/out

## Installation and Running

1. Clone the repository:

   ```
   git clone https://github.com/LiLittleCat/3d-demo.git
   ```

2. Install dependencies:

   ```
   pnpm install
   ```

3. Start the development server:

   ```
   pnpm dev
   ```

4. Open `http://localhost:5173` in your browser to view the application.

## Build for Production

Run the following command to build the production version:

```
pnpm build
```

The build files will be located in the `dist` directory.

## Contribution

Contributions are welcome! Feel free to submit issues and pull requests to improve this project.
