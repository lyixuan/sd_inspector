let myCanvas = document.createElement('canvas');
let ctx = myCanvas.getContext('2d');
let myImage = new Image();
let fps = 60;
let MAX_SPEED_X, MAX_SPEED_Y, G;

class something {
  constructor(props) {
    this.x = props.x;
    this.y = props.y;
    this.speedX = 0;
    this.speedY = 0;
    this.deg = 0;
    this.radius = props.radius;
    this.initSpeedX = Math.random() < 0.5 ? 0.005 : -0.005;
  }

  updata = () => {
    let rotateDeg = Math.random() * 0.6 + 0.2;
    this.speedX += this.initSpeedX;
    if (this.speedX >= MAX_SPEED_X || this.speedX <= -MAX_SPEED_X) {
      this.initSpeedX *= -1;
    }
    if (this.speedY < MAX_SPEED_Y) {
      this.speedY += G;
    }
    this.deg += rotateDeg;
    this.x += this.speedX;
    this.y += this.speedY;
  };

  draw = () => {
    const radius = this.radius;
    ctx.save();
    ctx.translate(this.x, this.y);
    ctx.rotate(this.deg * Math.PI / 180);
    ctx.drawImage(myImage, -radius, -radius, radius * 2, radius * 2);
    ctx.restore();
  }
}
class ThingsFall {
  constructor(props) {
    this.things = [];
    this.canvasWidth = props.width || window.innerWidth;
    this.canvasHeight = props.height || window.innerHeight;
    this.addThingsInterval = props.interval || 150;
    this.recordTime = 0;
    this.nowTime = Date.now();
    myImage.src = props.image;
    MAX_SPEED_X = props.maxSpeedX || 1;
    MAX_SPEED_Y = props.maxSpeedY || 1;
    G = props.G || 0.01;
  }
  init = () => {
    window.requestAnimationFrame = window.requestAnimationFrame
      || window.webkitRequestAnimationFrame
      || window.mozRequestAnimationFrame
      || window.oRequestAnimationFrame
      || window.msRequestAnimationFrame
      || function(callback) {
        setTimeout(callback, 1000 / fps);
      };
    myCanvas.width = this.canvasWidth;
    myCanvas.height = this.canvasHeight;
    myCanvas.style.cssText = 'position: fixed; top: 0; left: 0; pointer-events: none;';
    document.body.appendChild(myCanvas);
  }

}
