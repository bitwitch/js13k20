class Player {

  constructor() {
    this.tile_id = 22;
    this.x = 100;
    this.y = 40;
    this.w = 32;
    this.h = 32;
    this.jump_speed = 10;
    this.vx = 0;
    this.vy = 0;
    this.ax = 0;
    this.ay = 0;
    this.accel = 0.3;
    this.max_vx = 4.2;
    this.dir = 1;
    this.grounded = false;
    this.state = 0; // 0 idle, 1 walking, 2 jumping
  }

  update() {
    this.getInput();
    this.collide();
    this.move();
    this.draw();
  }

  draw() {
    c.translate(this.x + this.w/2 - 2, this.y);

    if (this.dir == -1) {
      c.scale(-1, 1);
    } 

    var cur_id = [21, [22,21,23][~~(frame / 3) % 3], 24][this.state];

    c.drawImage(tileset, cur_id * 16, 0, 16, 16, -this.w/2, 0, 32, 32);

    c.setTransform(1, 0, 0, 1, 0, 0);
  }

  getInput() {
    this.ax = 0;
    this.ay = 0;

    if (left && !right) {
      this.ax = -this.accel;
      this.dir = -1;
    }

    if (right && !left) {
      this.ax = this.accel;
      this.dir = 1;
    }

    if (this.grounded) {
      this.state = (left || right) ? 1 : 0;

      if(jump) {
        this.grounded = false;
        this.vy = -6.5;
        this.state = 2;
      }
    }
  }

  collide() {
    // reset terminal active
    terminal_active = false;

    // apply friction
    if (!left && !right)
      this.vx = this.vx*this.vx < 0.01 ? 0 : this.vx*friction;

    // left
    var target_left_top = tileAt(this.x + this.vx, this.y);
    var target_left_bottom = tileAt(this.x + this.vx, this.y + this.h - 1);
    if ( isSolid(target_left_top) || isSolid(target_left_bottom) ) {
      this.x = ~~((this.x + this.w + this.vx) / 32) * 32;
      this.vx = 0;
      this.ax = 0;
    } else if (isTerminal(target_left_top) || isTerminal(target_left_bottom) ) {
      terminal_active = true;
    }

    // right
    var target_right_top = tileAt(this.x + this.w + this.vx, this.y);
    var target_right_bottom = tileAt(this.x + this.w + this.vx, this.y + this.h - 1);
    if ( isSolid(target_right_top) || isSolid(target_right_bottom) ) {
      this.x = ~~((this.x + this.vx) / 32) * 32 - 1;
      this.vx = 0;
      this.ax = 0;
    } else if (isTerminal(target_right_top) || isTerminal(target_right_bottom) ) {
      terminal_active = true;
    }

    // down
    var target_bottom_left = tileAt(this.x, this.y + this.h + this.vy);
    var target_bottom_right = tileAt(this.x + this.w, this.y + this.h + this.vy);
    if (isSolid(target_bottom_left) || isSolid(target_bottom_right) ) {
      this.y = ~~((this.y + this.vy) / 32) * 32;
      this.vy = 0;
      this.grounded = true;
    } else {
      this.grounded = false;
      if (isTerminal(target_bottom_left) || isTerminal(target_bottom_right) ) {
        terminal_active = true;
      }
    }
  }

  move() {
    // update velocity
    this.vx += this.ax;
    if (this.vx > this.max_vx)
      this.vx = this.max_vx;
    if (this.vx < -this.max_vx)
      this.vx = -this.max_vx;

    if(!this.grounded) {
      this.vy += grav;
    }

    // update position
    this.x += this.vx;
    this.y += this.vy;

    if (this.y > 640)
      this.y = -this.h;

  }

}



