interface WriteTextOptions {
  text: string;
  fontSize: number;
  fontFamily: string;
  context: CanvasRenderingContext2D;
  x: number;
  y: number;
}

export function writeText(options: WriteTextOptions) {
  const text = options.text;
  const fontSize = options.fontSize;
  const fontFamily = options.fontFamily;

  options.context.fillStyle = "black";
  options.context.font = fontSize + "px " + fontFamily;

  const x = options.x;
  const y = options.y;

  options.context.fillText(text, x, y);
}
