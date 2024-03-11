export class Player {
  velocity: number;
  gravity: number;
  bounceStrength: number;
  scale: number;
  width: number;
  height: number;

  constructor(
    public x: number,
    public y: number,
    public imageWidth: number,
    public imageHeight: number
  ) {
    this.x = x;
    this.y = y;
    this.imageWidth = imageWidth;
    this.imageHeight = imageHeight;
    this.velocity = 0;
    this.gravity = 0.6;
    this.bounceStrength = -8;
    this.scale = 0.12;
    this.width = imageWidth * this.scale;
    this.height = imageHeight * this.scale;
  }

  update() {
    this.velocity += this.gravity;
    this.y += this.velocity;
  }

  draw(context: CanvasRenderingContext2D, image: HTMLImageElement) {
    context.drawImage(
      image,
      0,
      0,
      this.imageWidth,
      this.imageHeight,
      this.x,
      this.y,
      this.width,
      this.height
    );
  }

  checkOutOfBounds(canvas: HTMLCanvasElement) {
    if (this.y + this.height >= canvas.height) {
      // this.y = canvas.height - this.height;
      return true;
    }

    if (this.y <= 0) {
      // this.y = 0;
      return true;
    }

    return false;
  }
}
