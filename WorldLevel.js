class WorldLevel {
  constructor(json) {
    this.w = json.world?.w ?? 4000;
    this.h = json.world?.h ?? 3000;

    this.camLerp = json.camera?.lerp ?? 0.04;

    this.stars = [];
    this.hiddenStars = [];
    this.planets = [];

    // ⭐ Background stars
    for (let i = 0; i < 600; i++) {
      this.stars.push({
        x: random(this.w),
        y: random(this.h),
        size: random(1, 3),
        alpha: random(100, 255),
      });
    }

    // 🌟 Hidden discoverable stars
    for (let i = 0; i < 25; i++) {
      this.hiddenStars.push({
        x: random(this.w),
        y: random(this.h),
        found: false,
      });
    }

    // 🪐 Planets
    for (let i = 0; i < 8; i++) {
      this.planets.push({
        x: random(400, this.w - 400),
        y: random(400, this.h - 400),
        size: random(60, 120),
        color: color(random(80, 200), random(60, 150), random(150, 255)),
        hasRings: random() > 0.5,
        rotationOffset: random(1000),
      });
    }
  }

  drawBackground() {
    for (let y = 0; y < height; y++) {
      let inter = map(y, 0, height, 0, 1);
      let c = lerpColor(color(10, 10, 35), color(2, 0, 15), inter);
      stroke(c);
      line(0, y, width, y);
    }
  }

  drawWorld(player) {
    noStroke();

    // ✨ Twinkling stars
    for (const s of this.stars) {
      fill(255, 255, 255, s.alpha + sin(frameCount * 0.02 + s.x) * 40);
      ellipse(s.x, s.y, s.size);
    }

    // 🪐 Planets (draw BEFORE hidden stars so they feel distant)
    for (const p of this.planets) {
      push();
      translate(p.x, p.y);

      // glow halo
      for (let i = p.size * 1.4; i > p.size; i -= 15) {
        fill(red(p.color), green(p.color), blue(p.color), 8);
        ellipse(0, 0, i);
      }

      // planet body
      fill(p.color);
      ellipse(0, 0, p.size);

      // subtle animated shading
      fill(0, 40);
      ellipse(sin(frameCount * 0.002 + p.rotationOffset) * 10, 0, p.size * 0.9);

      // rings
      if (p.hasRings) {
        stroke(255, 120);
        noFill();
        strokeWeight(2);
        ellipse(0, 0, p.size * 1.6, p.size * 0.5);
      }

      pop();
    }

    // 🌟 Hidden discoverable stars
    for (const hs of this.hiddenStars) {
      const d = dist(player.x, player.y, hs.x, hs.y);

      if (d < 60 && !hs.found) {
        hs.found = true;
      }

      if (hs.found) {
        for (let i = 30; i > 0; i -= 6) {
          fill(255, 240, 180, 15);
          ellipse(hs.x, hs.y, i);
        }
        fill(255, 240, 180);
        ellipse(hs.x, hs.y, 6);
      }
    }
  }

  drawHUD() {
    fill(255, 150);
    textSize(12);
    text("Drift. Discover. Orbit.", 20, height - 20);
  }
}
