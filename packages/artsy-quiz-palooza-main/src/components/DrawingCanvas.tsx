
import React, { useRef, useEffect, useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';
import { Brush, Eraser, Palette, Undo, Redo } from 'lucide-react';

interface DrawingCanvasProps {
  onAddScore: (points: number) => void;
}

interface CanvasState {
  imageData: ImageData;
}

export const DrawingCanvas: React.FC<DrawingCanvasProps> = ({ onAddScore }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [tool, setTool] = useState<'brush' | 'eraser'>('brush');
  const [brushColor, setBrushColor] = useState('#FF6B6B');
  const [brushSize, setBrushSize] = useState(8);
  const [currentEmoji, setCurrentEmoji] = useState('😀');
  const [showColorPicker, setShowColorPicker] = useState(false);
  const [undoStack, setUndoStack] = useState<CanvasState[]>([]);
  const [redoStack, setRedoStack] = useState<CanvasState[]>([]);

  const emojis = ['😀', '😎', '🐱', '🐶', '🌸', '⭐', '🎈', '🍎', '🌞', '🦋', '🎨', '🎪', '🏰', '🚂', '🎁', '🌈', '🎵', '🍕', '🎂', '🎯'];
  const kidFriendlyColors = [
    '#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7', '#DDA0DD', 
    '#FF9ff3', '#54a0ff', '#5f27cd', '#00d2d3', '#ff9f43', '#ee5253',
    '#10ac84', '#222f3e', '#c44569', '#f368e0', '#ff6348', '#FFFFFF'
  ];

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    canvas.width = 600;
    canvas.height = 400;

    // Set background
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Save initial state
    saveCanvasState();
  }, []);

  const saveCanvasState = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    setUndoStack(prev => [...prev.slice(-19), { imageData }]); // Keep last 20 states
    setRedoStack([]); // Clear redo stack when new action is performed
  };

  const undo = () => {
    if (undoStack.length <= 1) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const currentState = undoStack[undoStack.length - 1];
    const previousState = undoStack[undoStack.length - 2];

    setRedoStack(prev => [...prev, currentState]);
    setUndoStack(prev => prev.slice(0, -1));

    ctx.putImageData(previousState.imageData, 0, 0);
  };

  const redo = () => {
    if (redoStack.length === 0) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const stateToRestore = redoStack[redoStack.length - 1];
    
    setUndoStack(prev => [...prev, stateToRestore]);
    setRedoStack(prev => prev.slice(0, -1));

    ctx.putImageData(stateToRestore.imageData, 0, 0);
  };

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    setIsDrawing(true);
    draw(x, y);
  };

  const draw = (x: number, y: number) => {
    const canvas = canvasRef.current;
    if (!canvas || !isDrawing) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.lineWidth = brushSize;
    ctx.lineCap = 'round';

    if (tool === 'brush') {
      ctx.globalCompositeOperation = 'source-over';
      ctx.strokeStyle = brushColor;
    } else {
      ctx.globalCompositeOperation = 'destination-out';
    }

    ctx.lineTo(x, y);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(x, y);
  };

  const onMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    draw(x, y);
  };

  const stopDrawing = () => {
    if (isDrawing) {
      setIsDrawing(false);
      const canvas = canvasRef.current;
      if (!canvas) return;

      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      ctx.beginPath();
      saveCanvasState();
    }
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    saveCanvasState();
  };

  const analyzeDrawing = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const data = imageData.data;
    let coloredPixels = 0;
    let totalPixels = 0;
    const colors = new Set<string>();

    for (let i = 0; i < data.length; i += 4) {
      totalPixels++;
      const r = data[i];
      const g = data[i + 1];
      const b = data[i + 2];
      
      // Check if pixel is not white
      if (r !== 255 || g !== 255 || b !== 255) {
        coloredPixels++;
        colors.add(`${r},${g},${b}`);
      }
    }

    const coverage = (coloredPixels / totalPixels) * 100;
    const colorVariety = colors.size;

    // More nuanced evaluation
    if (coverage < 0.5) {
      toast.error("I can barely see anything! Try adding more details to your drawing 🎨");
      return;
    }

    if (coverage < 2) {
      toast.success("That's a nice start! Your drawing could use more details though 😊 +5 points!");
      onAddScore(5);
    } else if (coverage < 5) {
      if (colorVariety > 5) {
        toast.success("Great use of colors! Your drawing is taking shape nicely! 🌈 +15 points!");
        onAddScore(15);
      } else {
        toast.success("Good progress! Try adding more colors to make it pop! 🎨 +10 points!");
        onAddScore(10);
      }
    } else if (coverage < 15) {
      if (colorVariety > 8) {
        toast.success("Wow! Beautiful artwork with great color variety! 🎨✨ +25 points!");
        onAddScore(25);
      } else {
        toast.success("Excellent drawing! Your creativity is shining through! ⭐ +20 points!");
        onAddScore(20);
      }
    } else {
      if (colorVariety > 10) {
        toast.success("Incredible masterpiece! Amazing use of colors and space! 🏆🎨 +30 points!");
        onAddScore(30);
      } else {
        toast.success("Fantastic artwork! You've really captured the essence! 🌟 +25 points!");
        onAddScore(25);
      }
    }
    
    newChallenge();
  };

  const newChallenge = () => {
    const randomEmoji = emojis[Math.floor(Math.random() * emojis.length)];
    setCurrentEmoji(randomEmoji);
    clearCanvas();
  };

  return (
    <div className="max-w-6xl mx-auto">
      <Card className="p-4 bg-white/95 backdrop-blur border-4 border-pink-300 rounded-3xl shadow-2xl">
        <div className="text-center mb-4">
          <h2 className="text-4xl font-black mb-3 text-pink-800"
              style={{ fontFamily: 'Comic Sans MS, cursive' }}>
            Draw This Emoji! 🎨
          </h2>
          <div className="text-9xl mb-3 animate-bounce">{currentEmoji}</div>
          <p className="text-xl text-pink-700 font-bold"
             style={{ fontFamily: 'Comic Sans MS, cursive' }}>
            Use your imagination and have fun creating! ✨
          </p>
        </div>

        {/* Compact Tools */}
        <div className="flex flex-wrap gap-3 mb-4 justify-center items-center bg-pink-50 p-4 rounded-2xl">
          <div className="flex gap-2">
            <Button
              onClick={() => setTool('brush')}
              variant={tool === 'brush' ? 'default' : 'outline'}
              className={`${tool === 'brush' ? 'bg-blue-500 hover:bg-blue-600' : 'border-2'} rounded-2xl font-bold`}
              style={{ fontFamily: 'Comic Sans MS, cursive' }}
            >
              <Brush size={20} className="mr-1" />
              Brush
            </Button>
            <Button
              onClick={() => setTool('eraser')}
              variant={tool === 'eraser' ? 'default' : 'outline'}
              className={`${tool === 'eraser' ? 'bg-gray-500 hover:bg-gray-600' : 'border-2'} rounded-2xl font-bold`}
              style={{ fontFamily: 'Comic Sans MS, cursive' }}
            >
              <Eraser size={20} className="mr-1" />
              Eraser
            </Button>
          </div>

          <div className="flex gap-2">
            <Button
              onClick={undo}
              disabled={undoStack.length <= 1}
              variant="outline"
              className="border-2 rounded-2xl font-bold disabled:opacity-50"
              style={{ fontFamily: 'Comic Sans MS, cursive' }}
            >
              <Undo size={20} className="mr-1" />
              Undo
            </Button>
            <Button
              onClick={redo}
              disabled={redoStack.length === 0}
              variant="outline"
              className="border-2 rounded-2xl font-bold disabled:opacity-50"
              style={{ fontFamily: 'Comic Sans MS, cursive' }}
            >
              <Redo size={20} className="mr-1" />
              Redo
            </Button>
          </div>

          <div className="flex items-center gap-2 bg-white p-2 rounded-xl">
            <span className="text-sm font-bold"
                  style={{ fontFamily: 'Comic Sans MS, cursive' }}>Size:</span>
            <Input
              type="range"
              min="2"
              max="25"
              value={brushSize}
              onChange={(e) => setBrushSize(Number(e.target.value))}
              className="w-16"
            />
            <span className="text-sm font-bold"
                  style={{ fontFamily: 'Comic Sans MS, cursive' }}>{brushSize}px</span>
          </div>

          <Button
            onClick={() => setShowColorPicker(!showColorPicker)}
            variant="outline"
            className="border-2 rounded-2xl font-bold"
            style={{ fontFamily: 'Comic Sans MS, cursive' }}
          >
            <Palette size={20} className="mr-1" />
            Colors
          </Button>
        </div>

        {/* Compact Color Picker */}
        {showColorPicker && (
          <Card className="p-3 mb-4 bg-gradient-to-r from-pink-50 to-purple-50 border-2 border-pink-200 rounded-2xl">
            <div className="grid grid-cols-6 md:grid-cols-9 gap-2 mb-3">
              {kidFriendlyColors.map((color) => (
                <button
                  key={color}
                  onClick={() => setBrushColor(color)}
                  className={`w-8 h-8 rounded-full border-3 transition-transform hover:scale-110 ${brushColor === color ? 'border-gray-800 shadow-lg' : 'border-white'}`}
                  style={{ backgroundColor: color }}
                />
              ))}
            </div>
            <div className="flex gap-2 items-center justify-center">
              <Input
                type="color"
                value={brushColor}
                onChange={(e) => setBrushColor(e.target.value)}
                className="w-12 h-8 border-2 rounded-lg"
              />
              <span className="text-sm font-bold"
                    style={{ fontFamily: 'Comic Sans MS, cursive' }}>Custom Color</span>
            </div>
          </Card>
        )}

        {/* Canvas */}
        <div className="flex justify-center mb-4">
          <canvas
            ref={canvasRef}
            onMouseDown={startDrawing}
            onMouseMove={onMouseMove}
            onMouseUp={stopDrawing}
            onMouseLeave={stopDrawing}
            className="border-4 border-pink-300 rounded-2xl cursor-crosshair bg-white shadow-xl"
            style={{ maxWidth: '100%', height: 'auto' }}
          />
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3 justify-center flex-wrap">
          <Button
            onClick={analyzeDrawing}
            className="bg-gradient-to-r from-green-500 to-teal-500 hover:from-green-600 hover:to-teal-600 text-white px-6 py-3 text-lg font-black rounded-2xl shadow-lg transform hover:scale-105 transition-all"
            style={{ fontFamily: 'Comic Sans MS, cursive' }}
          >
            Look at My Art! ✨
          </Button>
          <Button
            onClick={clearCanvas}
            variant="outline"
            className="border-3 border-orange-400 text-orange-600 hover:bg-orange-50 px-6 py-3 text-lg font-bold rounded-2xl"
            style={{ fontFamily: 'Comic Sans MS, cursive' }}
          >
            Start Over
          </Button>
          <Button
            onClick={newChallenge}
            variant="outline"
            className="border-3 border-purple-400 text-purple-600 hover:bg-purple-50 px-6 py-3 text-lg font-bold rounded-2xl"
            style={{ fontFamily: 'Comic Sans MS, cursive' }}
          >
            New Challenge
          </Button>
        </div>
      </Card>
    </div>
  );
};
