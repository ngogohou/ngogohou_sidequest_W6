class Player {
  constructor(x, y, speed) {
    this.x = x;
    this.y = y;
    this.s = speed ?? 1.8; // slower, meditative pace
    this.vx = 0;
    this.vy = 0;
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
  }

  draw() {
    noStroke();

    // soft glow
    for (let i = 40; i > 0; i -= 8) {
      fill(120, 180, 255, 20);
      ellipse(this.x, this.y, i);
    }

    // core
    fill(180, 220, 255);
    ellipse(this.x, this.y, 14);
  }
}
