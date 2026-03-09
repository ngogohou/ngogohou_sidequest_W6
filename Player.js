class Player {
  constructor(x, y, speed) {
    this.x = x;
    this.y = y;
    this.s = speed ?? 1.8; // slower, meditative pace
    this.vx = 0;
    this.vy = 0;

    this.trail = [];
  }

  updateInput() {
    const dx =
      (keyIsDown(RIGHT_ARROW) || keyIsDown(68)) -
      (keyIsDown(LEFT_ARROW) || keyIsDown(65));

    const dy =
      (keyIsDown(DOWN_ARROW) || keyIsDown(83)) -
      (keyIsDown(UP_ARROW) || keyIsDown(87));

    // gentle acceleration
    this.vx += dx * 0.15;
    this.vy += dy * 0.15;

    // soft damping (floating in space)
    this.vx *= 0.92;
    this.vy *= 0.92;

    this.x += this.vx;
    this.y += this.vy;

    // add trail particle
    if (abs(this.vx) + abs(this.vy) > 0.3) {
      this.trail.push({
        x: this.x,
        y: this.y,
        life: 40,
      });
    }

    if (this.trail.length > 80) this.trail.shift();
  }

  draw() {
    // trail particles
    noStroke();
    for (let p of this.trail) {
      fill(180, 220, 255, p.life * 2);
      ellipse(p.x, p.y, 6);
      p.life--;
    }

    // glow
    for (let i = 40; i > 0; i -= 8) {
      fill(120, 180, 255, 20);
      ellipse(this.x, this.y, i);
    }

    fill(200, 230, 255);
    ellipse(this.x, this.y, 14);
  }
}
