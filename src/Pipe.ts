export class Pipe {
  constructor(
    public x: number,
    public y: number,
    public width: number,
    public height: number,
    public speed: number,
    public position: "top" | "bottom"
  ) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.speed = speed;
    this.position = position;
  }

  update() {
    this.x -= this.speed;
  }

  draw(context: CanvasRenderingContext2D, image: HTMLImageElement) {
    const sourceY = this.position === "top" ? 0 : 820;
    const sourceHeight = this.position === "top" ? 350 : 340;
    context.drawImage(
      image,
      770,
      sourceY,
      260,
      sourceHeight,
      this.x,
      this.y,
      this.width,
      this.height
    );
  }
}
