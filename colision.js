const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// 🎯 CONTADOR
let score = 0;

// 🖼️ IMAGEN (puedes cambiarla)
const img = new Image();
img.src = "https://cdn-icons-png.flaticon.com/512/616/616494.png";

// =====================
// CLASE OBJETO
// =====================
class FallingObject {
  constructor(x, y, size, speed) {
    this.x = x;
    this.y = y;
    this.size = size;
    this.speed = speed;
  }

  draw() {
    ctx.drawImage(img, this.x, this.y, this.size, this.size);
  }

  update() {
    this.y += this.speed;

    // Si sale de pantalla → reaparece arriba
    if (this.y > canvas.height) {
      this.reset();
    }
  }

  reset() {
    this.x = Math.random() * (canvas.width - this.size);
    this.y = -this.size; // arriba del canvas
    this.speed = getSpeed();
  }

  // 🎯 DETECCIÓN DE CLICK
  isClicked(mouseX, mouseY) {
    return (
      mouseX >= this.x &&
      mouseX <= this.x + this.size &&
      mouseY >= this.y &&
      mouseY <= this.y + this.size
    );
  }
}

// =====================
// VELOCIDAD DINÁMICA
// =====================
function getSpeed() {
  if (score > 15) return Math.random() * 6 + 6;   // alta
  if (score > 10) return Math.random() * 4 + 4;   // media
  return Math.random() * 2 + 2;                   // inicial
}

// =====================
// CREAR OBJETOS
// =====================
let objects = [];

function generateObjects(n) {
  for (let i = 0; i < n; i++) {
    let size = Math.random() * 40 + 40;
    let x = Math.random() * (canvas.width - size);
    let y = Math.random() * -canvas.height;

    objects.push(new FallingObject(x, y, size, getSpeed()));
  }
}

// =====================
// CLICK DEL MOUSE
// =====================
canvas.addEventListener("click", (e) => {
  const rect = canvas.getBoundingClientRect();
  const mouseX = e.clientX - rect.left;
  const mouseY = e.clientY - rect.top;

  objects.forEach(obj => {
    if (obj.isClicked(mouseX, mouseY)) {
      score++;
      obj.reset(); // reaparece (no se elimina definitivamente)
    }
  });
});

// =====================
// DIBUJAR CONTADOR
// =====================
function drawScore() {
  ctx.fillStyle = "white";
  ctx.font = "25px Arial";
  ctx.textAlign = "right";
  ctx.fillText("Puntos: " + score, canvas.width - 20, 40);
}

// =====================
// ANIMACIÓN
// =====================
function animate() {

  // 🎨 FONDO (degradado)
  let gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
  gradient.addColorStop(0, "#1e3c72");
  gradient.addColorStop(1, "#2a5298");

  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Objetos
  objects.forEach(obj => {
    obj.update();
    obj.draw();
  });

  drawScore();

  requestAnimationFrame(animate);
}

// =====================
// INICIO
// =====================
generateObjects(15);
animate();