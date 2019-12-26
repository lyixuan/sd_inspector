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
  }
}
class ThingsFall {
  constructor(props) {
    this.things = [];
    this.G = props.G || 0.01;
    this.fps = 60;
    this.MAX_SPEED_X = props.maxSpeedX || 1;
    this.MAX_SPEED_Y = props.maxSpeedY || 1;
    this.canvasWidth = props.width || window.innerWidth;
    this.canvasHeight = props.height || window.innerHeight;
    this.addThingsInterval = props.interval || 150;
    this.recordTime = 0;
    this.nowTime = Date.now();
    this.thingsImage = props.image;
    this.myCanvas = document.createElement('canvas');
    this.ctx = this.myCanvas.getContext('2d');
  }
}
