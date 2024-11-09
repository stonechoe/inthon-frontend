"use client";
import React, { useRef, useState, useEffect } from "react";

export default function DrawPage() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const ctxRef = useRef<CanvasRenderingContext2D | null>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [selectedColor, setSelectedColor] = useState("black");
  const [isErasing, setIsErasing] = useState(false);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target && ctxRef.current) {
          const img = new Image();
          img.src = e.target.result as string;
          img.onload = () => {
            ctxRef.current?.drawImage(
              img,
              0,
              0,
              canvasRef.current!.width,
              canvasRef.current!.height
            );
          };
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const startDrawing = (event: React.MouseEvent<HTMLCanvasElement>) => {
    const { offsetX, offsetY } = event.nativeEvent;
    if (ctxRef.current) {
      ctxRef.current.beginPath();
      ctxRef.current.moveTo(offsetX, offsetY);
      setIsDrawing(true);
    }
  };

  const draw = (event: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing || !ctxRef.current) return;
    const { offsetX, offsetY } = event.nativeEvent;
    ctxRef.current.lineTo(offsetX, offsetY);
    ctxRef.current.stroke();
  };

  const endDrawing = () => {
    if (ctxRef.current) {
      ctxRef.current.closePath();
    }
    setIsDrawing(false);
  };

  const initializeCanvas = (canvas: HTMLCanvasElement | null) => {
    if (canvas && !ctxRef.current) {
      canvas.width = 800;
      canvas.height = 600;
      const ctx = canvas.getContext("2d");
      if (ctx) {
        ctx.lineCap = "round";
        ctx.strokeStyle = selectedColor;
        ctx.lineWidth = 3;
        ctxRef.current = ctx;
      }
    }
  };

  useEffect(() => {
    if (canvasRef.current) {
      initializeCanvas(canvasRef.current);
    }
  }, []);

  useEffect(() => {
    if (ctxRef.current) {
      ctxRef.current.strokeStyle = isErasing ? "white" : selectedColor;
      ctxRef.current.lineWidth = isErasing ? 20 : 3;
    }
  }, [selectedColor, isErasing]);

  const handleColorChange = (color: string) => {
    setIsErasing(false); // 지우개가 선택된 경우 해제
    setSelectedColor(color);
  };

  const handleErase = () => {
    setIsErasing(true);
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h2 className="text-2xl font-bold mb-4">이미지 위에 그리기</h2>
      <input
        type="file"
        accept="image/*"
        onChange={handleImageUpload}
        className="mb-4"
      />
      <canvas
        ref={canvasRef}
        onMouseDown={startDrawing}
        onMouseMove={draw}
        onMouseUp={endDrawing}
        onMouseLeave={endDrawing}
        className="border border-gray-300"
        style={{ cursor: "crosshair" }}
      />
      <div className="flex space-x-2 mt-4">
        {/* 색상 선택 버튼 */}
        {["black", "red", "orange", "yellow", "green", "blue", "purple"].map(
          (color) => (
            <button
              key={color}
              onClick={() => handleColorChange(color)}
              className="w-8 h-8 rounded-full"
              style={{
                backgroundColor: color,
                border:
                  selectedColor === color && !isErasing
                    ? "2px solid black"
                    : "none",
              }}
            ></button>
          )
        )}
        {/* 지우개 버튼 */}
        <button
          onClick={handleErase}
          className={`w-8 h-8 rounded-full bg-white border ${
            isErasing ? "border-black" : "border-gray-300"
          }`}
        >
          🧽
        </button>
      </div>
    </div>
  );
}
