// components/Boids/boidsSketch.ts

import type { P5CanvasInstance, SketchProps } from "@p5-wrapper/react";
import p5, { Vector } from "p5"; // Gunakan Vector dari p5!

// Props yang akan diterima dari komponen React
export interface BoidsSketchProps extends SketchProps {
  boidsCount: number;
  alignment: number;
  cohesion: number;
  separation: number;
}

// ===================================================
// Kelas Boid (Mirip seperti sebelumnya, tapi pakai p5)
// ===================================================
class Boid {
  p: P5CanvasInstance<BoidsSketchProps>;
  position: Vector;
  velocity: Vector;
  acceleration: Vector;
  maxForce: number = 0.2;
  maxSpeed: number = 4;

  constructor(p: P5CanvasInstance<BoidsSketchProps>, x: number, y: number) {
    this.p = p; // Simpan instance p5
    this.position = p.createVector(x, y);
    this.velocity = Vector.random2D();
    this.velocity.setMag(p.random(2, 4));
    this.acceleration = p.createVector();
  }

  edges() {
    if (this.position.x > this.p.width) this.position.x = 0;
    else if (this.position.x < 0) this.position.x = this.p.width;
    if (this.position.y > this.p.height) this.position.y = 0;
    else if (this.position.y < 0) this.position.y = this.p.height;
  }

  align(boids: Boid[]): Vector {
    let perceptionRadius = 50;
    let steering = this.p.createVector();
    let total = 0;
    for (let other of boids) {
      let d = this.p.dist(
        this.position.x,
        this.position.y,
        other.position.x,
        other.position.y,
      );
      if (other !== this && d < perceptionRadius) {
        steering.add(other.velocity);
        total++;
      }
    }
    if (total > 0) {
      steering.div(total);
      steering.setMag(this.maxSpeed);
      steering.sub(this.velocity);
      steering.limit(this.maxForce);
    }
    return steering;
  }

  cohere(boids: Boid[]): Vector {
    let perceptionRadius = 75;
    let steering = this.p.createVector();
    let total = 0;
    for (let other of boids) {
      let d = this.p.dist(
        this.position.x,
        this.position.y,
        other.position.x,
        other.position.y,
      );
      if (other !== this && d < perceptionRadius) {
        steering.add(other.position);
        total++;
      }
    }
    if (total > 0) {
      steering.div(total);
      return this.seek(steering);
    }
    return this.p.createVector();
  }

  separate(boids: Boid[]): Vector {
    let perceptionRadius = 25;
    let steering = this.p.createVector();
    let total = 0;
    for (let other of boids) {
      let d = this.p.dist(
        this.position.x,
        this.position.y,
        other.position.x,
        other.position.y,
      );
      if (other !== this && d < perceptionRadius && d > 0) {
        let diff = Vector.sub(this.position, other.position);
        diff.div(d * d);
        steering.add(diff);
        total++;
      }
    }
    if (total > 0) {
      steering.div(total);
      steering.setMag(this.maxSpeed);
      steering.sub(this.velocity);
      steering.limit(this.maxForce);
    }
    return steering;
  }

  flock(
    boids: Boid[],
    alignment: number,
    cohesion: number,
    separation: number,
  ) {
    let alignmentForce = this.align(boids).mult(alignment);
    let cohesionForce = this.cohere(boids).mult(cohesion);
    let separationForce = this.separate(boids).mult(separation);

    this.applyForce(alignmentForce);
    this.applyForce(cohesionForce);
    this.applyForce(separationForce);
  }

  seek(target: Vector): Vector {
    let desired = Vector.sub(target, this.position);
    desired.setMag(this.maxSpeed);
    let steer = Vector.sub(desired, this.velocity);
    steer.limit(this.maxForce);
    return steer;
  }

  flee(target: Vector): Vector {
    let desired = Vector.sub(target, this.position).mult(-1);
    desired.setMag(this.maxSpeed);
    let steer = Vector.sub(desired, this.velocity);
    steer.limit(this.maxForce);
    return steer;
  }

  applyForce(force: Vector) {
    this.acceleration.add(force);
  }

  update() {
    this.velocity.add(this.acceleration);
    this.velocity.limit(this.maxSpeed);
    this.position.add(this.velocity);
    this.acceleration.mult(0);
  }

  show() {
    this.p.push();
    this.p.translate(this.position.x, this.position.y);
    this.p.rotate(this.velocity.heading() + this.p.PI / 2);
    this.p.fill("#2dd4bf");
    this.p.stroke("#14b8a6");
    this.p.beginShape();
    this.p.vertex(0, -6);
    this.p.vertex(-4, 6);
    this.p.vertex(4, 6);
    this.p.endShape(this.p.CLOSE);
    this.p.pop();
  }
}

// ===================================================
// Fungsi Sketch Utama untuk p5-wrapper
// ===================================================
export function boidsSketch(p: P5CanvasInstance<BoidsSketchProps>) {
  let flock: Boid[] = [];
  let currentProps: BoidsSketchProps = {
    boidsCount: 100,
    alignment: 1.0,
    cohesion: 1.0,
    separation: 1.5,
  };
  let canvasRenderer: p5.Renderer;

  p.setup = () => {
    // 1. Buat canvas dengan ukuran placeholder dulu, dan simpan renderer-nya
    canvasRenderer = p.createCanvas(100, 100);

    // 2. Sekarang kita bisa akses `canvasRenderer.canvas` dengan aman untuk mencari parent
    const parentEl = canvasRenderer.elt.parentElement;

    if (parentEl) {
      p.resizeCanvas(parentEl.clientWidth, parentEl.clientHeight);
    } else {
      p.resizeCanvas(p.windowWidth, p.windowHeight);
    }

    // 3. Resize canvas agar sesuai dengan ukuran parent-nya
    if (parentEl) {
      p.resizeCanvas(parentEl.clientWidth, parentEl.clientHeight);
    } else {
      // Fallback jika karena suatu hal parent tidak ditemukan
      p.resizeCanvas(p.windowWidth, p.windowHeight);
    }

    // 4. Lanjutkan sisa setup seperti biasa
    for (let i = 0; i < currentProps.boidsCount; i++) {
      flock.push(new Boid(p, p.random(p.width), p.random(p.height)));
    }
  };

  // Fungsi ini dipanggil oleh wrapper setiap kali props dari React berubah
  p.updateWithProps = (props: BoidsSketchProps) => {
    currentProps = { ...currentProps, ...props };

    // Sesuaikan jumlah boid jika berubah
    const countDiff = currentProps.boidsCount - flock.length;
    if (countDiff > 0) {
      // Tambah boid
      for (let i = 0; i < countDiff; i++) {
        flock.push(new Boid(p, p.random(p.width), p.random(p.height)));
      }
    } else if (countDiff < 0) {
      // Kurangi boid
      flock.splice(0, -countDiff);
    }
  };

  p.draw = () => {
    p.background("#030712"); // Mirip bg-gray-900

    const mouseVec = p.createVector(p.mouseX, p.mouseY);

    for (let boid of flock) {
      boid.flock(
        flock,
        currentProps.alignment,
        currentProps.cohesion,
        currentProps.separation,
      );

      // Interaksi mouse
      if (p.mouseIsPressed) {
        if (p.mouseButton === p.LEFT) {
          boid.applyForce(boid.seek(mouseVec).mult(0.5));
        } else if (p.mouseButton === p.RIGHT) {
          const MOUSE_FLEE_RADIUS = 150;
          if (
            p.dist(boid.position.x, boid.position.y, p.mouseX, p.mouseY) <
            MOUSE_FLEE_RADIUS
          ) {
            boid.applyForce(boid.flee(mouseVec).mult(1.2));
          }
        }
      }

      boid.update();
      boid.edges();
      boid.show();
    }
  };

  // Mencegah menu klik kanan
  p.mouseClicked = () => {
    if (p.mouseButton === p.RIGHT) {
      return false;
    }
  };

  p.windowResized = () => {
    // Gunakan canvasRenderer yang sudah tersimpan
    if (canvasRenderer) {
      const parentEl = canvasRenderer.elt.parentElement;
      if (parentEl) {
        p.resizeCanvas(parentEl.clientWidth, parentEl.clientHeight);
      } else {
        p.resizeCanvas(p.windowWidth, p.windowHeight);
      }
    }
  };
}
