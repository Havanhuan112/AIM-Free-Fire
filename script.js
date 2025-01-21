const canvas = document.getElementById("particles");
const ctx = canvas.getContext("2d");
const colorPicker = document.getElementById("colorPicker");
const switches = document.querySelectorAll(".switch label");
const menu = document.getElementById("menu");
const spinner = document.getElementById("loading-spinner");
const clickSound = document.getElementById("clickSound");

// Phát âm thanh và hiển thị vòng xoay khi bấm switch
switches.forEach((switchInput) => {
  switchInput.addEventListener("change", () => {
    clickSound.currentTime = 0;
    clickSound.play();

    // Hiển thị vòng xoay khi bật công tắc
    if (switchInput.checked) {
      spinner.classList.remove("hidden");
      setTimeout(() => {
        spinner.classList.add("hidden");
      }, 2000); // Tự động ẩn sau 2 giây
    }
  });
})

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particles = [];

// Particles logic
class Particle {
  constructor(x, y, radius, color, velocity) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = color;
    this.velocity = velocity;
  }

  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fillStyle = this.color;
    ctx.fill();
    ctx.closePath();
  }

  update() {
    this.x += this.velocity.x;
    this.y += this.velocity.y;

    if (this.x < 0 || this.x > canvas.width || this.y < 0 || this.y > canvas.height) {
      this.x = Math.random() * canvas.width;
      this.y = Math.random() * canvas.height;
    }

    this.draw();
  }
}

function initParticles() {
  particles = [];
  for (let i = 0; i < 100; i++) {
    const radius = Math.random() * 2 + 1;
    const x = Math.random() * canvas.width;
    const y = Math.random() * canvas.height;
    const color = "rgba(255, 255, 255, 0.5)";
    const velocity = {
      x: (Math.random() - 0.5) * 0.5,
      y: (Math.random() - 0.5) * 0.5,
    };

    particles.push(new Particle(x, y, radius, color, velocity));
  }
}

function animateParticles() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  particles.forEach((particle) => particle.update());
  requestAnimationFrame(animateParticles);
}

initParticles();
animateParticles();

// Resizing and dragging menu
let isDragging = false;
let offsetX, offsetY;

menu.addEventListener("mousedown", (e) => {
  isDragging = true;
  offsetX = e.offsetX;
  offsetY = e.offsetY;
});

window.addEventListener("mousemove", (e) => {
  if (isDragging) {
    menu.style.left = `${e.clientX - offsetX}px`;
    menu.style.top = `${e.clientY - offsetY}px`;
  }
});

window.addEventListener("mouseup", () => {
  isDragging = false;
});

// Change color of switches
colorPicker.addEventListener("input", (e) => {
  const color = e.target.value;
  switches.forEach((switchLabel) => {
    switchLabel.style.backgroundColor = color;
  });
});