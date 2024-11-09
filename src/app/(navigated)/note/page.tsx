"use client";
import React, { useRef, useState, useEffect } from "react";

export default function DrawPage() {
  const imageCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const drawingCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const imageCtxRef = useRef<CanvasRenderingContext2D | null>(null);
  const drawingCtxRef = useRef<CanvasRenderingContext2D | null>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [selectedColor, setSelectedColor] = useState("black");
  const [isErasing, setIsErasing] = useState(false);
  const [lineWidth, setLineWidth] = useState(3);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target && imageCtxRef.current) {
          const img = new Image();
          img.src = e.target.result as string;
          img.onload = () => {
            imageCtxRef.current?.clearRect(
              0,
              0,
              imageCanvasRef.current!.width,
              imageCanvasRef.current!.height
            );
            imageCtxRef.current?.drawImage(
              img,
              0,
              0,
              imageCanvasRef.current!.width,
              imageCanvasRef.current!.height
            );
          };
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const startDrawing = (x: number, y: number) => {
    if (drawingCtxRef.current) {
      drawingCtxRef.current.beginPath();
      drawingCtxRef.current.moveTo(x, y);
      setIsDrawing(true);
    }
  };

  const draw = (x: number, y: number) => {
    if (!isDrawing || !drawingCtxRef.current) return;
    drawingCtxRef.current.lineTo(x, y);
    drawingCtxRef.current.stroke();
  };

  const endDrawing = () => {
    if (drawingCtxRef.current) {
      drawingCtxRef.current.closePath();
    }
    setIsDrawing(false);
  };

  const handleMouseDown = (event: React.MouseEvent<HTMLCanvasElement>) => {
    const { offsetX, offsetY } = event.nativeEvent;
    startDrawing(offsetX, offsetY);
  };

  const handleMouseMove = (event: React.MouseEvent<HTMLCanvasElement>) => {
    const { offsetX, offsetY } = event.nativeEvent;
    draw(offsetX, offsetY);
  };

  const handleTouchStart = (event: React.TouchEvent<HTMLCanvasElement>) => {
    const touch = event.touches[0];
    const rect = drawingCanvasRef.current?.getBoundingClientRect();
    if (rect) {
      const x = touch.clientX - rect.left;
      const y = touch.clientY - rect.top;
      startDrawing(x, y);
    }
  };

  const handleTouchMove = (event: React.TouchEvent<HTMLCanvasElement>) => {
    const touch = event.touches[0];
    const rect = drawingCanvasRef.current?.getBoundingClientRect();
    if (rect) {
      const x = touch.clientX - rect.left;
      const y = touch.clientY - rect.top;
      draw(x, y);
    }
    event.preventDefault(); // 터치 스크롤 방지
  };

  const initializeCanvas = (
    canvas: HTMLCanvasElement | null,
    contextRef: React.MutableRefObject<CanvasRenderingContext2D | null>
  ) => {
    if (canvas && !contextRef.current) {
      canvas.width = 800;
      canvas.height = 600;
      const ctx = canvas.getContext("2d");
      if (ctx) {
        ctx.lineCap = "round";
        ctx.lineWidth = lineWidth;
        ctx.strokeStyle = selectedColor;
        contextRef.current = ctx;
      }
    }
  };

  useEffect(() => {
    if (imageCanvasRef.current) {
      initializeCanvas(imageCanvasRef.current, imageCtxRef);
    }
    if (drawingCanvasRef.current) {
      initializeCanvas(drawingCanvasRef.current, drawingCtxRef);
    }
  }, []);

  useEffect(() => {
    if (drawingCtxRef.current) {
      drawingCtxRef.current.strokeStyle = selectedColor;
      drawingCtxRef.current.lineWidth = lineWidth;
      drawingCtxRef.current.globalCompositeOperation = isErasing
        ? "destination-out"
        : "source-over";
    }
  }, [selectedColor, isErasing, lineWidth]);

  const handleColorChange = (color: string) => {
    setIsErasing(false);
    setSelectedColor(color);
  };

  const handleErase = () => {
    setIsErasing(true);
  };

  const handleLineWidthChange = (width: number) => {
    setLineWidth(width);
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
      <div
        style={{ position: "relative", width: 800, height: 600 }}
        className="border border-gray-300"
      >
        <canvas
          ref={imageCanvasRef}
          style={{ position: "absolute", left: 0, top: 0 }}
        />
        <canvas
          ref={drawingCanvasRef}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={endDrawing}
          onMouseLeave={endDrawing}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={endDrawing}
          style={{ position: "absolute", left: 0, top: 0 }}
        />
      </div>
      <div className="flex space-x-2 mt-4">
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
        <button
          onClick={handleErase}
          className={`w-8 h-8 rounded-full bg-white border ${
            isErasing ? "border-black" : "border-gray-300"
          }`}
        >
          🧽
        </button>
      </div>
      <div className="flex space-x-2 mt-4">
        {[1, 3, 5, 10, 15, 20].map((width) => (
          <button
            key={width}
            onClick={() => handleLineWidthChange(width)}
            className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center"
            style={{
              backgroundColor: lineWidth === width ? "lightgray" : "white",
            }}
          >
            {width}
          </button>
        ))}
      </div>
    </div>
  );
}
