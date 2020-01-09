let myCanvas = document.createElement('canvas');
let ctx = myCanvas.getContext('2d');

let offCanvas = document.createElement('canvas');
let offCtx = offCanvas.getContext('2d');

let things = [];

let myImage = new Image();
let fps = 60;
let MAX_SPEED_X, MAX_SPEED_Y, G;

/*
* image 图片
* width canvas宽度
* height canvas高度
* interval 每间隔一段时间向画布上添加一个新图像 ms
* continueTime 效果持续时间 ms
* maxRadius 图像最大直径
* minRadius 图像最小直径
* maxSpeedX 图像最大X轴速度
* maxSpeedY 图像最大Y轴速度
* G 加速度
* */
class ThingsFall {
  constructor(props) {
    this.canvasWidth = props.width || window.innerWidth;
    this.canvasHeight = props.height || window.innerHeight;
    this.addThingsInterval = props.interval || 1000;
    this.recordTime = 0;
    this.startTime = Date.now();
    this.timing = 0;
    this.stopAnimation = false;
    this.suspendAnimation = false;
    this.continueTime = props.continueTime || 0;
    this.maxRadius = props.maxRadius || 10;
    this.minRadius = props.minRadius || 5;
    myImage.src = props.image;
    MAX_SPEED_X = props.maxSpeedX || 1;
    MAX_SPEED_Y = props.maxSpeedY || 1;
    G = props.G || 0.1;
    this.init();
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
    offCanvas.width = this.canvasWidth;
    offCanvas.height = this.canvasHeight;
    myCanvas.style.cssText = 'position: fixed; z-index: 11; top: 0; left: 0; pointer-events: none;';
    document.body.appendChild(myCanvas);

    if (this.continueTime) {
      setTimeout(() => {
        this.stopAnimation = true
      }, this.continueTime);
    }

    // window.requestAnimationFrame(this.everyFrame);
    this.everyFrame();
  };

  everyFrame = () => {
    ctx.clearRect(0, 0, this.canvasWidth, this.canvasHeight);
    offCtx.clearRect(0, 0, this.canvasWidth, this.canvasHeight);

    let newTime = Date.now();
    this.recordTime = newTime - this.startTime;
    this.startTime = newTime;
    this.timing += this.recordTime;

    if (this.timing > this.addThingsInterval) {
      if (!this.stopAnimation) {
        things.push(new Something(
        {
            x: Math.random() * this.canvasWidth,
            y: 0,
            radius: Math.random() * (this.maxRadius - this.minRadius) + this.minRadius
          }
        ));
        this.timing %= this.addThingsInterval;
        //
        if (things.length < 1) {
          ctx.clearRect(0, 0, this.canvasWidth, this.canvasHeight);
          return
        }
      }
    }

    things.forEach((item, index) => {
      item.updateStatus();
      item.draw();
      if (item.y > this.canvasHeight) {
        item = null;
        things.splice(index, 1);
      }
    });

    ctx.drawImage(offCanvas, 0 ,0, this.canvasWidth, this.canvasHeight);
    // window.requestAnimationFrame(this.everyFrame);
    if (!this.suspendAnimation) {
      setTimeout(() => {
        this.everyFrame();
      }, 50);
    }
  };

  stop = () => {
    this.stopAnimation = true;
    things = [];
    document.body.removeChild(myCanvas);
  };

  suspend = () => {
    this.suspendAnimation = true;
  };

  startAgain = () => {
    this.suspendAnimation = false;
    this.everyFrame();
  };
}

class Something {
  constructor(props) {
    this.x = props.x;
    this.y = props.y;
    this.speedX = 0;
    this.speedY = 0;
    this.deg = 0;
    this.radius = props.radius;
    this.initSpeedX = Math.random() < 0.5 ? 0.005 : -0.005;
  }

  updateStatus = () => {
    // let rotateDeg = Math.random() * 0.6 + 0.2;
    this.speedX += this.initSpeedX;
    if (this.speedX >= MAX_SPEED_X || this.speedX <= -MAX_SPEED_X) {
      this.initSpeedX *= -1;
    }
    if (this.speedY < MAX_SPEED_Y) {
      this.speedY += G;
    }
    // this.deg += rotateDeg;
    this.x += this.speedX;
    this.y += this.speedY;
  };

  draw = () => {
    const radius = this.radius;
    offCtx.save();
    offCtx.translate(this.x, this.y);
    // offCtx.rotate(this.deg * Math.PI / 180);
    offCtx.drawImage(myImage, -radius, -radius, radius * 2, radius * 2);
    offCtx.restore();
  };
}

export default ThingsFall;
