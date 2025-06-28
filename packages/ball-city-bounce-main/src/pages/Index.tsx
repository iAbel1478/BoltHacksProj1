import React, { useRef, useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';

const Index = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const gameRef = useRef<any>(null);
  const [isGameStarted, setIsGameStarted] = useState(false);
  const [showShop, setShowShop] = useState(false);

  useEffect(() => {
    if (canvasRef.current && isGameStarted) {
      const game = new BasketballGame(canvasRef.current, setShowShop);
      gameRef.current = game;
      
      return () => {
        if (gameRef.current) {
          gameRef.current.cleanup();
        }
      };
    }
  }, [isGameStarted]);

  const startGame = () => {
    setIsGameStarted(true);
  };

  const resetGame = () => {
    if (gameRef.current) {
      gameRef.current.cleanup();
    }
    setIsGameStarted(false);
    setTimeout(() => setIsGameStarted(true), 100);
  };

  const handlePurchaseSkin = (skinId: string) => {
    if (gameRef.current) {
      gameRef.current.purchaseSkin(skinId);
    }
  };

  if (!isGameStarted) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-blue-900 via-blue-800 to-blue-700 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-6xl font-bold text-white mb-8 drop-shadow-lg" style={{
            textShadow: '4px 4px 0px #ff6b35, 8px 8px 0px rgba(0,0,0,0.3)',
            fontFamily: 'Arial, sans-serif'
          }}>
            Let's Ball! 🏀
          </h1>
          <p className="text-xl text-white mb-8 drop-shadow-md font-semibold">
            Hold and drag to aim, release to shoot!<br/>
            Score as many baskets as you can!
          </p>
          <Button 
            onClick={startGame} 
            className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white text-2xl px-8 py-4 rounded-lg font-bold shadow-lg border-2 border-orange-400"
          >
            Start Game
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-900 via-blue-800 to-blue-700 flex">
      {/* Game Canvas */}
      <div className="flex-1 relative">
        <canvas 
          ref={canvasRef}
          className="w-full h-full cursor-crosshair"
          width={1000}
          height={700}
        />
        {/* Reset Button - Always Visible During Gameplay */}
        <Button 
          onClick={resetGame}
          className="absolute top-4 left-4 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-bold z-10 border-2 border-red-500 shadow-lg"
        >
          Reset Game
        </Button>
      </div>

      {/* Shop Controls - Right Side */}
      <div className="w-64 p-4 bg-gradient-to-b from-blue-800 to-blue-900 border-l-2 border-blue-600">
        <Button 
          onClick={() => setShowShop(!showShop)}
          className="w-full bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-black font-bold mb-4 border-2 border-yellow-400 shadow-lg"
        >
          🏀 Shop ({gameRef.current?.coins || 0} coins)
        </Button>
        
        {showShop && (
          <div className="bg-gradient-to-b from-white to-gray-100 rounded-lg p-4 shadow-lg border-2 border-gray-300">
            <h3 className="font-bold text-center mb-4 text-blue-900">Basketball Skins</h3>
            <div className="space-y-2">
              {BASKETBALL_SKINS.map((skin) => (
                <button
                  key={skin.id}
                  onClick={() => handlePurchaseSkin(skin.id)}
                  className="w-full p-2 bg-gradient-to-r from-orange-100 to-orange-200 hover:from-orange-200 hover:to-orange-300 rounded text-sm font-medium border border-orange-300 transition-colors"
                  disabled={gameRef.current?.coins < skin.price && !gameRef.current?.ownedSkins.includes(skin.id)}
                >
                  {skin.name} - {skin.price} coins
                  {gameRef.current?.ownedSkins.includes(skin.id) && " ✓"}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// Basketball Skins Data
const BASKETBALL_SKINS = [
  { id: 'default', name: 'Classic Orange', price: 0, colors: ['#ff6b35'] },
  { id: 'gradient1', name: 'Fire Gradient', price: 10, colors: ['#ff6b35', '#ff0000'] },
  { id: 'gradient2', name: 'Ocean Gradient', price: 15, colors: ['#00bfff', '#0066cc'] },
  { id: 'rainbow', name: 'Rainbow Ball', price: 25, colors: ['#ff0000', '#ff8800', '#ffff00', '#00ff00', '#0000ff', '#8800ff'] },
  { id: 'galaxy', name: 'Galaxy Ball', price: 30, colors: ['#2c1810', '#8b4513', '#dda0dd'] },
  { id: 'metallic', name: 'Gold Ball', price: 50, colors: ['#ffd700', '#ffed4e'] }
];

// NBA Player Comparisons
const NBA_COMPARISONS = [
  { name: "Stephen Curry", minScore: 15, message: "You're shooting like a superstar!" },
  { name: "LeBron James", minScore: 12, message: "The King would be proud!" },
  { name: "Kevin Durant", minScore: 10, message: "That's some elite shooting!" },
  { name: "Damian Lillard", minScore: 8, message: "Dame Time!" },
  { name: "Kyrie Irving", minScore: 6, message: "Smooth moves like Uncle Drew!" },
  { name: "Klay Thompson", minScore: 4, message: "Splash Brother vibes!" },
  { name: "Chris Paul", minScore: 2, message: "Point God precision!" },
  { name: "Rookie", minScore: 0, message: "Every pro started somewhere!" }
];

// Humorous basketball comments
const FUNNY_COMMENTS = [
  "Lamelo!",
  "Air ball city!",
  "Brick house!",
  "Nothing but net... eventually!",
  "Shaq would be proud!",
  "Kobe would've made that!",
  "Better luck next time, champ!",
  "Close but no cigar!",
  "Keep shooting, shooter!"
];

// Basketball Game Class
class BasketballGame {
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;
  width: number;
  height: number;
  setShowShop: (show: boolean) => void;
  
  // Game state
  score: number = 0;
  level: number = 1;
  coins: number = 0;
  streak: number = 0;
  maxStreak: number = 0;
  gameOver: boolean = false;
  currentSkin: string = 'default';
  ownedSkins: string[] = ['default'];
  gameOverMessage: string = '';
  nbaComparison: string = '';
  
  // Ball properties
  ball: {
    x: number;
    y: number;
    vx: number;
    vy: number;
    radius: number;
    colors: string[];
    inPlay: boolean;
    trail: Array<{x: number, y: number, life: number}>;
    scored: boolean;
  };
  
  // Shooting state
  isAiming: boolean = false;
  startX: number = 0;
  startY: number = 0;
  currentX: number = 0;
  currentY: number = 0;
  ballSequenceComplete: boolean = true;
  
  // Hoop properties
  hoop: {
    x: number;
    y: number;
    width: number;
    height: number;
    rimY: number;
    originalRimY: number;
    rimTime: number;
    netSwayTime: number;
    netSwayIntensity: number;
  };
  
  // Physics constants
  gravity: number = 0.4;
  bounce: number = 0.7;
  friction: number = 0.99;
  
  // Coin animations
  coinAnimations: Array<{
    x: number;
    y: number;
    life: number;
    maxLife: number;
  }> = [];

  // Particle effects
  particles: Array<{
    x: number;
    y: number;
    vx: number;
    vy: number;
    life: number;
    maxLife: number;
    color: string;
    type: string;
  }> = [];

  constructor(canvas: HTMLCanvasElement, setShowShop: (show: boolean) => void) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d')!;
    this.width = canvas.width;
    this.height = canvas.height;
    this.setShowShop = setShowShop;
    
    // Initialize hoop
    this.hoop = {
      x: 150,
      y: 200,
      width: 80,
      height: 100,
      rimY: 250,
      originalRimY: 250,
      rimTime: 0,
      netSwayTime: 0,
      netSwayIntensity: 0
    };
    
    // Initialize ball
    this.resetBall();
    
    this.setupEventListeners();
    this.gameLoop();
  }
  
  setupEventListeners() {
    this.canvas.addEventListener('mousedown', (e) => this.handleMouseDown(e));
    this.canvas.addEventListener('mousemove', (e) => this.handleMouseMove(e));
    this.canvas.addEventListener('mouseup', (e) => this.handleMouseUp(e));
  }
  
  handleMouseDown(e: MouseEvent) {
    if (this.gameOver || this.ball.inPlay || !this.ballSequenceComplete) return;
    
    const rect = this.canvas.getBoundingClientRect();
    this.startX = (e.clientX - rect.left) * (this.width / rect.width);
    this.startY = (e.clientY - rect.top) * (this.height / rect.height);
    this.currentX = this.startX;
    this.currentY = this.startY;
    this.isAiming = true;
  }
  
  handleMouseMove(e: MouseEvent) {
    if (!this.isAiming) return;
    
    const rect = this.canvas.getBoundingClientRect();
    this.currentX = (e.clientX - rect.left) * (this.width / rect.width);
    this.currentY = (e.clientY - rect.top) * (this.height / rect.height);
  }
  
  handleMouseUp(e: MouseEvent) {
    if (!this.isAiming || this.gameOver) return;
    
    this.isAiming = false;
    this.shootBall();
  }
  
  shootBall() {
    const power = 0.12;
    const dx = this.currentX - this.startX;
    const dy = this.currentY - this.startY;
    
    this.ball.vx = dx * power;
    this.ball.vy = dy * power;
    this.ball.inPlay = true;
    this.ballSequenceComplete = false;
    this.ball.trail = [];
  }
  
  updateRimPosition() {
    // Dynamic rim movement based on level
    if (this.level > 3) {
      this.hoop.rimTime += 0.05 + (this.level - 3) * 0.01;
      
      // Vertical movement
      if (this.level > 5) {
        this.hoop.rimY = this.hoop.originalRimY + Math.sin(this.hoop.rimTime) * 20;
      }
      
      // Horizontal movement
      if (this.level > 8) {
        this.hoop.x = 150 + Math.cos(this.hoop.rimTime * 0.7) * 30;
      }
    }
    
    // Decrease rim width as level increases
    this.hoop.width = Math.max(60, 80 - this.level * 2);
  }

  updateNetSway() {
    this.hoop.netSwayTime += 0.1;
    this.hoop.netSwayIntensity *= 0.95; // Gradually reduce sway
  }
  
  updateBallTrail() {
    if (this.ball.inPlay) {
      // Add new trail point
      this.ball.trail.push({
        x: this.ball.x,
        y: this.ball.y,
        life: 0
      });
      
      // Update trail points
      this.ball.trail = this.ball.trail.filter(point => {
        point.life += 1;
        return point.life < 20;
      });
      
      // Add streak-based particles
      if (this.streak > 0 && Math.random() < 0.3) {
        this.addStreakParticles();
      }
    }
  }

  addStreakParticles() {
    const particleCount = Math.min(this.streak, 5);
    for (let i = 0; i < particleCount; i++) {
      let color = '#ffffff';
      let type = 'smoke';
      
      if (this.streak >= 10) {
        color = this.streak % 2 === 0 ? '#ff4500' : '#ffff00';
        type = 'fire';
      } else if (this.streak >= 5) {
        color = this.streak % 2 === 0 ? '#00ffff' : '#ffffff';
        type = 'lightning';
      }
      
      this.particles.push({
        x: this.ball.x + (Math.random() - 0.5) * 40,
        y: this.ball.y + (Math.random() - 0.5) * 40,
        vx: (Math.random() - 0.5) * 4,
        vy: (Math.random() - 0.5) * 4,
        life: 0,
        maxLife: 30,
        color: color,
        type: type
      });
    }
  }

  updateParticles() {
    this.particles = this.particles.filter(particle => {
      particle.life++;
      particle.x += particle.vx;
      particle.y += particle.vy;
      particle.vx *= 0.98;
      particle.vy *= 0.98;
      return particle.life < particle.maxLife;
    });
  }
  
  updateBall() {
    if (!this.ball.inPlay) return;
    
    // Update trail
    this.updateBallTrail();
    
    // Apply physics
    this.ball.vy += this.gravity;
    this.ball.x += this.ball.vx;
    this.ball.y += this.ball.vy;
    
    // Apply friction
    this.ball.vx *= this.friction;
    
    // Check boundaries
    if (this.ball.x - this.ball.radius < 0 || this.ball.x + this.ball.radius > this.width) {
      this.ball.vx *= -this.bounce;
      this.ball.x = Math.max(this.ball.radius, Math.min(this.width - this.ball.radius, this.ball.x));
    }
    
    // Enhanced backboard collision
    if (this.ball.x - this.ball.radius < this.hoop.x + 15 && 
        this.ball.x + this.ball.radius > this.hoop.x - 5 &&
        this.ball.y > this.hoop.y && this.ball.y < this.hoop.y + this.hoop.height) {
      
      // Calculate realistic bounce angle
      const centerY = this.hoop.y + this.hoop.height / 2;
      const hitY = this.ball.y - centerY;
      const bounceAngle = hitY / (this.hoop.height / 2) * 0.3;
      
      this.ball.vx = Math.abs(this.ball.vx) * this.bounce * (1 + bounceAngle);
      this.ball.vy += bounceAngle * 2;
    }
    
    // Enhanced scoring detection
    if (this.ball.x > this.hoop.x && this.ball.x < this.hoop.x + this.hoop.width &&
        this.ball.y > this.hoop.rimY && this.ball.y < this.hoop.rimY + 20 &&
        this.ball.vy > 0 && !this.ball.scored) {
      this.ball.scored = true;
      this.score++;
      this.streak++;
      this.maxStreak = Math.max(this.maxStreak, this.streak);
      this.level = Math.floor(this.score / 5) + 1;
      this.coins += 5 + this.streak; // Bonus coins for streaks
      this.addCoinAnimation(this.hoop.x + this.hoop.width / 2, this.hoop.rimY);
      
      // Net sway effect
      this.hoop.netSwayIntensity = 10;
    }
    
    // FIXED: Check if ball hits ground
    if (this.ball.y + this.ball.radius > this.height - 50) {
      if (this.ball.scored) {
        // Ball scored, spawn new ball
        setTimeout(() => this.resetBall(), 500);
        this.ball.inPlay = false;
      } else {
        // Ball missed, end game
        this.endGame();
        return;
      }
    }
    
    // Reset ball if it goes too far off screen
    if (this.ball.y > this.height + 200) {
      if (this.ball.scored) {
        this.resetBall();
      } else {
        this.endGame();
      }
    }
  }

  endGame() {
    this.gameOver = true;
    this.ballSequenceComplete = true;
    this.streak = 0; // Reset streak on game over
    
    // Set static game over message
    this.gameOverMessage = FUNNY_COMMENTS[Math.floor(Math.random() * FUNNY_COMMENTS.length)];
    
    // Find NBA comparison
    for (const comparison of NBA_COMPARISONS) {
      if (this.score >= comparison.minScore) {
        this.nbaComparison = `You shot like ${comparison.name}! ${comparison.message}`;
        break;
      }
    }
  }
  
  addCoinAnimation(x: number, y: number) {
    this.coinAnimations.push({
      x: x,
      y: y,
      life: 0,
      maxLife: 60
    });
  }
  
  updateCoinAnimations() {
    this.coinAnimations = this.coinAnimations.filter(coin => {
      coin.life++;
      coin.y -= 2;
      return coin.life < coin.maxLife;
    });
  }
  
  resetBall() {
    const currentSkinData = BASKETBALL_SKINS.find(skin => skin.id === this.currentSkin) || BASKETBALL_SKINS[0];
    
    this.ball = {
      x: Math.random() * 400 + 500,
      y: this.height - 100,
      vx: 0,
      vy: 0,
      radius: 20,
      colors: currentSkinData.colors,
      inPlay: false,
      trail: [],
      scored: false
    };
    
    this.ballSequenceComplete = true;
  }
  
  purchaseSkin(skinId: string) {
    const skin = BASKETBALL_SKINS.find(s => s.id === skinId);
    if (!skin) return;
    
    if (this.ownedSkins.includes(skinId)) {
      // Already owned, just equip it
      this.currentSkin = skinId;
      this.resetBall();
    } else if (this.coins >= skin.price) {
      // Purchase and equip
      this.coins -= skin.price;
      this.ownedSkins.push(skinId);
      this.currentSkin = skinId;
      this.resetBall();
    }
  }
  
  getTrajectoryPoints(): Array<{x: number, y: number}> {
    if (!this.isAiming) return [];
    
    const points = [];
    const dx = this.currentX - this.startX;
    const dy = this.currentY - this.startY;
    const power = 0.12;
    
    let vx = dx * power;
    let vy = dy * power;
    let x = this.ball.x;
    let y = this.ball.y;
    
    for (let i = 0; i < 50; i++) {
      points.push({ x, y });
      vx *= this.friction;
      vy += this.gravity;
      x += vx;
      y += vy;
      
      if (y > this.height - 50) break;
    }
    
    return points;
  }
  
  getTrajectoryColor(): string {
    const points = this.getTrajectoryPoints();
    if (points.length === 0) return '#ffffff';
    
    // Enhanced accuracy prediction
    const rimCenterX = this.hoop.x + this.hoop.width / 2;
    const rimY = this.hoop.rimY;
    
    let bestDistance = Infinity;
    let passedThroughRim = false;
    
    for (let i = 0; i < points.length - 1; i++) {
      const point = points[i];
      const nextPoint = points[i + 1];
      
      // Check if trajectory passes through rim area
      if (point.x <= rimCenterX && nextPoint.x >= rimCenterX &&
          point.y <= rimY + 20 && nextPoint.y >= rimY) {
        passedThroughRim = true;
        const distance = Math.abs(point.y - rimY);
        bestDistance = Math.min(bestDistance, distance);
      }
    }
    
    if (passedThroughRim && bestDistance < 15) return '#00ff00'; // Green - excellent shot
    if (passedThroughRim && bestDistance < 30) return '#ff8800'; // Orange - good shot
    return '#ff0000'; // Red - likely miss
  }
  
  draw() {
    // Clean NBA 2K Inspired Sky
    const skyGradient = this.ctx.createLinearGradient(0, 0, 0, this.height);
    skyGradient.addColorStop(0, '#4A90E2');
    skyGradient.addColorStop(0.7, '#5BA0F2');
    skyGradient.addColorStop(1, '#6BB6FF');
    this.ctx.fillStyle = skyGradient;
    this.ctx.fillRect(0, 0, this.width, this.height);
    
    // Update systems
    this.updateRimPosition();
    this.updateNetSway();
    this.updateCoinAnimations();
    this.updateParticles();
    
    // Draw minimal clouds
    this.drawMinimalClouds();
    
    // Draw clean professional court
    this.drawCleanCourt();
    
    // Draw hoop with professional net
    this.drawProfessionalHoop();
    
    // Draw particles
    this.drawParticles();
    
    // Draw ball with trail
    this.drawBallTrail();
    this.drawBall();
    
    // Draw trajectory
    if (this.isAiming && !this.ball.inPlay && this.ballSequenceComplete) {
      this.drawCurvedTrajectory();
    }
    
    // Draw coin animations
    this.drawCoinAnimations();
    
    // Draw NBA 2K style UI
    this.drawNBA2KUI();
    
    // Draw game over screen
    if (this.gameOver) {
      this.drawNBA2KGameOver();
    }
  }

  drawMinimalClouds() {
    // Simple, clean cloud formations
    this.drawCleanCloud(200, 80, 60);
    this.drawCleanCloud(500, 100, 50);
    this.drawCleanCloud(800, 70, 55);
  }
  
  drawCleanCloud(x: number, y: number, size: number) {
    this.ctx.fillStyle = 'rgba(255,255,255,0.8)';
    this.ctx.beginPath();
    this.ctx.arc(x, y, size * 0.5, 0, Math.PI * 2);
    this.ctx.arc(x + size * 0.3, y, size * 0.4, 0, Math.PI * 2);
    this.ctx.arc(x - size * 0.3, y, size * 0.4, 0, Math.PI * 2);
    this.ctx.fill();
  }
  
  drawCleanCourt() {
    // Professional court surface
    const courtGradient = this.ctx.createLinearGradient(0, this.height - 50, 0, this.height);
    courtGradient.addColorStop(0, '#D2691E');
    courtGradient.addColorStop(1, '#8B4513');
    this.ctx.fillStyle = courtGradient;
    this.ctx.fillRect(0, this.height - 50, this.width, 50);
    
    // Clean court lines
    this.ctx.strokeStyle = '#ffffff';
    this.ctx.lineWidth = 3;
    
    // Center circle
    this.ctx.beginPath();
    this.ctx.arc(this.width / 2, this.height - 25, 80, 0, Math.PI * 2);
    this.ctx.stroke();
    
    // Free throw line
    this.ctx.beginPath();
    this.ctx.moveTo(this.hoop.x + 120, this.height - 50);
    this.ctx.lineTo(this.hoop.x + 120, this.height - 180);
    this.ctx.stroke();
  }
  
  drawProfessionalHoop() {
    // Professional backboard
    const backboardGradient = this.ctx.createLinearGradient(this.hoop.x - 10, this.hoop.y, this.hoop.x + 10, this.hoop.y);
    backboardGradient.addColorStop(0, '#f8f8f8');
    backboardGradient.addColorStop(1, '#e0e0e0');
    this.ctx.fillStyle = backboardGradient;
    this.ctx.fillRect(this.hoop.x - 10, this.hoop.y, 20, this.hoop.height);
    this.ctx.strokeStyle = '#333333';
    this.ctx.lineWidth = 2;
    this.ctx.strokeRect(this.hoop.x - 10, this.hoop.y, 20, this.hoop.height);
    
    // Professional rim
    this.ctx.strokeStyle = '#ff6b35';
    this.ctx.lineWidth = 5;
    this.ctx.beginPath();
    this.ctx.moveTo(this.hoop.x, this.hoop.rimY);
    this.ctx.lineTo(this.hoop.x + this.hoop.width, this.hoop.rimY);
    this.ctx.stroke();
    
    // Professional net
    this.ctx.strokeStyle = '#ffffff';
    this.ctx.lineWidth = 2;
    for (let i = 0; i < 6; i++) {
      const x = this.hoop.x + (i * this.hoop.width / 5);
      const swayOffset = Math.sin(this.hoop.netSwayTime + i) * this.hoop.netSwayIntensity;
      
      this.ctx.beginPath();
      this.ctx.moveTo(x, this.hoop.rimY);
      this.ctx.quadraticCurveTo(
        x + swayOffset, 
        this.hoop.rimY + 15, 
        x - 2 + swayOffset, 
        this.hoop.rimY + 30
      );
      this.ctx.stroke();
    }
  }
  
  drawParticles() {
    this.particles.forEach(particle => {
      const alpha = 1 - (particle.life / particle.maxLife);
      this.ctx.save();
      this.ctx.globalAlpha = alpha;
      
      if (particle.type === 'fire') {
        this.ctx.fillStyle = particle.color;
        this.ctx.beginPath();
        this.ctx.arc(particle.x, particle.y, 3, 0, Math.PI * 2);
        this.ctx.fill();
      } else if (particle.type === 'lightning') {
        this.ctx.strokeStyle = particle.color;
        this.ctx.lineWidth = 2;
        this.ctx.beginPath();
        this.ctx.moveTo(particle.x - 5, particle.y);
        this.ctx.lineTo(particle.x + 5, particle.y);
        this.ctx.stroke();
      } else {
        this.ctx.fillStyle = particle.color;
        this.ctx.beginPath();
        this.ctx.arc(particle.x, particle.y, 2, 0, Math.PI * 2);
        this.ctx.fill();
      }
      
      this.ctx.restore();
    });
  }
  
  drawBallTrail() {
    if (this.ball.trail.length < 2) return;
    
    // Draw streak-based trail
    for (let i = 0; i < this.ball.trail.length - 1; i++) {
      const point = this.ball.trail[i];
      const alpha = 1 - (point.life / 20);
      
      this.ctx.save();
      this.ctx.globalAlpha = alpha * 0.6;
      
      let trailColor = '#ffffff';
      if (this.streak >= 10) {
        trailColor = '#ff4500'; // Fire trail
      } else if (this.streak >= 5) {
        trailColor = '#00ffff'; // Lightning trail
      }
      
      this.ctx.fillStyle = trailColor;
      this.ctx.beginPath();
      this.ctx.arc(point.x, point.y, 3, 0, Math.PI * 2);
      this.ctx.fill();
      this.ctx.restore();
    }
  }
  
  drawCoinAnimations() {
    this.coinAnimations.forEach(coin => {
      const alpha = 1 - (coin.life / coin.maxLife);
      this.ctx.save();
      this.ctx.globalAlpha = alpha;
      this.ctx.fillStyle = '#ffd700';
      this.ctx.font = '20px Arial';
      this.ctx.textAlign = 'center';
      this.ctx.fillText(`+${5 + this.streak} coins!`, coin.x, coin.y);
      this.ctx.restore();
    });
  }
  
  drawCurvedTrajectory() {
    const points = this.getTrajectoryPoints();
    if (points.length < 2) return;
    
    const color = this.getTrajectoryColor();
    this.ctx.strokeStyle = color;
    this.ctx.lineWidth = 3;
    this.ctx.setLineDash([5, 5]);
    
    this.ctx.beginPath();
    this.ctx.moveTo(points[0].x, points[0].y);
    
    for (let i = 1; i < points.length; i++) {
      this.ctx.lineTo(points[i].x, points[i].y);
    }
    
    this.ctx.stroke();
    this.ctx.setLineDash([]);
  }
  
  drawHoop() {
    // Backboard
    this.ctx.fillStyle = '#ffffff';
    this.ctx.fillRect(this.hoop.x - 10, this.hoop.y, 20, this.hoop.height);
    this.ctx.strokeStyle = '#000000';
    this.ctx.lineWidth = 2;
    this.ctx.strokeRect(this.hoop.x - 10, this.hoop.y, 20, this.hoop.height);
    
    // Rim
    this.ctx.strokeStyle = '#ff6b35';
    this.ctx.lineWidth = 4;
    this.ctx.beginPath();
    this.ctx.moveTo(this.hoop.x, this.hoop.rimY);
    this.ctx.lineTo(this.hoop.x + this.hoop.width, this.hoop.rimY);
    this.ctx.stroke();
    
    // Enhanced Net with realistic sway
    this.ctx.strokeStyle = '#ffffff';
    this.ctx.lineWidth = 2;
    for (let i = 0; i < 8; i++) {
      const x = this.hoop.x + (i * this.hoop.width / 7);
      const swayOffset = Math.sin(this.hoop.netSwayTime + i) * this.hoop.netSwayIntensity;
      
      this.ctx.beginPath();
      this.ctx.moveTo(x, this.hoop.rimY);
      this.ctx.quadraticCurveTo(
        x + 5 + swayOffset, 
        this.hoop.rimY + 20, 
        x - 5 + swayOffset, 
        this.hoop.rimY + 40
      );
      this.ctx.stroke();
    }
  }
  
  drawBall() {
    if (!this.ball) return;
    
    // Ball shadow
    this.ctx.fillStyle = 'rgba(0,0,0,0.3)';
    this.ctx.beginPath();
    this.ctx.ellipse(this.ball.x, this.height - 45, this.ball.radius * 0.8, this.ball.radius * 0.3, 0, 0, Math.PI * 2);
    this.ctx.fill();
    
    // Ball with skin
    if (this.ball.colors.length === 1) {
      // Solid color
      this.ctx.fillStyle = this.ball.colors[0];
      this.ctx.beginPath();
      this.ctx.arc(this.ball.x, this.ball.y, this.ball.radius, 0, Math.PI * 2);
      this.ctx.fill();
    } else {
      // Gradient or pattern
      const gradient = this.ctx.createRadialGradient(
        this.ball.x - 5, this.ball.y - 5, 0,
        this.ball.x, this.ball.y, this.ball.radius
      );
      
      this.ball.colors.forEach((color, i) => {
        gradient.addColorStop(i / (this.ball.colors.length - 1), color);
      });
      
      this.ctx.fillStyle = gradient;
      this.ctx.beginPath();
      this.ctx.arc(this.ball.x, this.ball.y, this.ball.radius, 0, Math.PI * 2);
      this.ctx.fill();
    }
    
    // Ball lines
    this.ctx.strokeStyle = '#000000';
    this.ctx.lineWidth = 2;
    this.ctx.beginPath();
    this.ctx.arc(this.ball.x, this.ball.y, this.ball.radius, 0, Math.PI * 2);
    this.ctx.moveTo(this.ball.x - this.ball.radius, this.ball.y);
    this.ctx.lineTo(this.ball.x + this.ball.radius, this.ball.y);
    this.ctx.moveTo(this.ball.x, this.ball.y - this.ball.radius);
    this.ctx.lineTo(this.ball.x, this.ball.y + this.ball.radius);
    this.ctx.stroke();
  }
  
  drawNBA2KUI() {
    // NBA 2K Style Title
    this.ctx.fillStyle = '#ffffff';
    this.ctx.font = 'bold 36px Arial';
    this.ctx.textAlign = 'center';
    this.ctx.strokeStyle = '#1a365d';
    this.ctx.lineWidth = 3;
    this.ctx.strokeText("Let's Ball!", this.width / 2, 50);
    this.ctx.fillText("Let's Ball!", this.width / 2, 50);
    
    // NBA 2K Style Stats Panel
    const panelGradient = this.ctx.createLinearGradient(this.width - 200, 20, this.width - 30, 140);
    panelGradient.addColorStop(0, '#1a365d');
    panelGradient.addColorStop(1, '#2d5a87');
    this.ctx.fillStyle = panelGradient;
    this.ctx.fillRect(this.width - 200, 20, 170, 120);
    
    // Panel border
    this.ctx.strokeStyle = '#ff6b35';
    this.ctx.lineWidth = 2;
    this.ctx.strokeRect(this.width - 200, 20, 170, 120);
    
    // Stats text
    this.ctx.fillStyle = '#ffffff';
    this.ctx.font = 'bold 16px Arial';
    this.ctx.textAlign = 'center';
    this.ctx.fillText(`Score: ${this.score}`, this.width - 115, 45);
    this.ctx.fillText(`Level: ${this.level}`, this.width - 115, 65);
    this.ctx.fillText(`Coins: ${this.coins}`, this.width - 115, 85);
    this.ctx.fillText(`Streak: ${this.streak}`, this.width - 115, 105);
    this.ctx.fillText(`Best: ${this.maxStreak}`, this.width - 115, 125);
    
    // NBA 2K Style Shooting Metrics
    if (this.isAiming && this.ballSequenceComplete) {
      const dx = this.currentX - this.startX;
      const dy = this.currentY - this.startY;
      const velocity = Math.sqrt(dx * dx + dy * dy) * 0.12;
      const angle = Math.atan2(dy, dx) * 180 / Math.PI;
      
      // Metrics panel
      const metricsGradient = this.ctx.createLinearGradient(20, this.height - 140, 240, this.height - 40);
      metricsGradient.addColorStop(0, '#1a365d');
      metricsGradient.addColorStop(1, '#2d5a87');
      this.ctx.fillStyle = metricsGradient;
      this.ctx.fillRect(20, this.height - 140, 220, 100);
      
      // Metrics border
      this.ctx.strokeStyle = '#ff6b35';
      this.ctx.lineWidth = 2;
      this.ctx.strokeRect(20, this.height - 140, 220, 100);
      
      // Metrics text
      this.ctx.fillStyle = '#ffffff';
      this.ctx.font = 'bold 14px Arial';
      this.ctx.textAlign = 'left';
      this.ctx.fillText(`🚀 Power: ${velocity.toFixed(1)}`, 30, this.height - 115);
      this.ctx.fillText(`📐 Angle: ${angle.toFixed(1)}°`, 30, this.height - 95);
      this.ctx.fillText(`🔥 Streak: ${this.streak}`, 30, this.height - 75);
    }
  }
  
  drawNBA2KGameOver() {
    // NBA 2K Style overlay
    this.ctx.fillStyle = 'rgba(26, 54, 93, 0.95)';
    this.ctx.fillRect(0, 0, this.width, this.height);
    
    // Game Over title
    this.ctx.fillStyle = '#ff6b35';
    this.ctx.font = 'bold 48px Arial';
    this.ctx.textAlign = 'center';
    this.ctx.strokeStyle = '#ffffff';
    this.ctx.lineWidth = 3;
    this.ctx.strokeText('Game Over!', this.width / 2, this.height / 2 - 200);
    this.ctx.fillText('Game Over!', this.width / 2, this.height / 2 - 200);
    
    // Stats panel background
    const statsGradient = this.ctx.createLinearGradient(this.width / 2 - 200, this.height / 2 - 150, this.width / 2 + 200, this.height / 2 + 50);
    statsGradient.addColorStop(0, '#2d5a87');
    statsGradient.addColorStop(1, '#1a365d');
    this.ctx.fillStyle = statsGradient;
    this.ctx.fillRect(this.width / 2 - 200, this.height / 2 - 150, 400, 200);
    
    // Stats panel border
    this.ctx.strokeStyle = '#ff6b35';
    this.ctx.lineWidth = 3;
    this.ctx.strokeRect(this.width / 2 - 200, this.height / 2 - 150, 400, 200);
    
    // Final Stats
    this.ctx.fillStyle = '#ffffff';
    this.ctx.font = 'bold 18px Arial';
    this.ctx.fillText(`Final Score: ${this.score}`, this.width / 2, this.height / 2 - 120);
    this.ctx.fillText(`Level Reached: ${this.level}`, this.width / 2, this.height / 2 - 100);
    this.ctx.fillText(`Best Streak: ${this.maxStreak}`, this.width / 2, this.height / 2 - 80);
    this.ctx.fillText(`Coins Earned: ${this.coins}`, this.width / 2, this.height / 2 - 60);
    
    // NBA Comparison
    this.ctx.fillStyle = '#00ff88';
    this.ctx.font = 'bold 20px Arial';
    this.ctx.fillText(this.nbaComparison, this.width / 2, this.height / 2 - 25);
    
    // Encouraging message
    this.ctx.fillStyle = '#ffffff';
    this.ctx.font = 'bold 18px Arial';
    this.ctx.fillText('Good try, try again!', this.width / 2, this.height / 2 + 5);
    
    // Funny comment
    this.ctx.font = 'bold 16px Arial';
    this.ctx.fillStyle = '#ffff44';
    this.ctx.fillText(this.gameOverMessage, this.width / 2, this.height / 2 + 30);
  }
  
  gameLoop() {
    if (!this.gameOver) {
      this.updateBall();
    }
    this.draw();
    requestAnimationFrame(() => this.gameLoop());
  }
  
  cleanup() {
    // Remove event listeners
    this.canvas.removeEventListener('mousedown', this.handleMouseDown);
    this.canvas.removeEventListener('mousemove', this.handleMouseMove);
    this.canvas.removeEventListener('mouseup', this.handleMouseUp);
  }
}

export default Index;
