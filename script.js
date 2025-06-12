const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

let player = { x: 180, y: 550, width: 40, height: 20 };
let bullets = [];
let enemies = [];
let score = 0;

document.addEventListener("keydown", (e) => {
  if (e.key === "ArrowLeft" && player.x > 0) player.x -= 20;
  if (e.key === "ArrowRight" && player.x < canvas.width - player.width) player.x += 20;
  if (e.key === " " || e.key === "z") {
    bullets.push({ x: player.x + 15, y: player.y });
  }
});

function spawnEnemy() {
  const x = Math.random() * (canvas.width - 30);
  enemies.push({ x, y: 0, width: 30, height: 20 });
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // プレイヤー
  ctx.fillStyle = "lime";
  ctx.fillRect(player.x, player.y, player.width, player.height);

  // 弾
  ctx.fillStyle = "cyan";
  bullets.forEach((b, i) => {
    b.y -= 5;
    ctx.fillRect(b.x, b.y, 5, 10);
    if (b.y < 0) bullets.splice(i, 1);
  });

  // 敵
  ctx.fillStyle = "red";
  enemies.forEach((e, ei) => {
    e.y += 2;
    ctx.fillRect(e.x, e.y, e.width, e.height);

    // 弾と敵の当たり判定
    bullets.forEach((b, bi) => {
      if (b.x < e.x + e.width &&
          b.x + 5 > e.x &&
          b.y < e.y + e.height &&
          b.y + 10 > e.y) {
        enemies.splice(ei, 1);
        bullets.splice(bi, 1);
        score++;
      }
    });
  });

  // スコア表示
  ctx.fillStyle = "white";
  ctx.font = "16px Arial";
  ctx.fillText(`Score: ${score}`, 10, 20);
}

setInterval(() => {
  spawnEnemy();
}, 1000);

function gameLoop() {
  draw();
  requestAnimationFrame(gameLoop);
}

gameLoop();
