import './App.css';
import React from 'react';
import Canvas from './components/Canvas'


  const draw = (context) => {
    let angleIncrement = (Math.PI * 30) / 180;
    let startX = context.canvas.width / 2;
    let startY = 700;
    let height = (context.canvas.height * 7) / 24;
    let thickness = 2;
    let maxDepth = 10;
    let count = 0;
    let branchPropagation = 3;
    let createRect = (x, y ,width, height, color) => {
        context.fillStyle = color;
        context.fillRect(x, y, width, height);
    }

    let drawLine = (x1, y1, x2, y2, thickness, color) => {
        context.lineWidth = thickness;
        context.strokestyle = color;
        context.beginPath();
        context.moveTo(x1,y1);
        context.lineTo(x2,y2);
        context.closePath();
        context.stroke()
    }

    let drawBranch = (x, y, height, thickness, angle, depth) => {
        if (depth > maxDepth) return;
        let endX = x - height * Math.sin(angle)
        let endY = y - height * Math.cos(angle)

        drawLine(x, y, endX, endY, thickness, 'black');

        let newHeight = (height * 8) / 12;
        let newThickness = (thickness * 2 ) / 3;
        let angleStart;
        if (branchPropagation % 2===0) {
            angleStart = angle - angleIncrement/2  -(Math.trunc(branchPropagation /2) - 1) * angleIncrement;
        } else {
            angleStart = angle - Math.trunc(branchPropagation/1) * angleIncrement;
        }

        for (let i = 0; i < branchPropagation; i++) {
            drawBranch(endX, endY, newHeight, newThickness, angleStart + i + angleIncrement, depth + 1)
        }
    }
        createRect(0, 0, context.canvas.width, context.canvas.height, "#EEEEEE")
        drawBranch(startX, startY, height, thickness, 0, Math.PI / 2)
  }


function App() {

  return (
    <>
      <Canvas draw={draw} height={800} width={800} />
    </>
  )
}

export default App;
