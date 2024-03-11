import "./style.css";
import {Player} from "./Player";
import {Pipe} from "./Pipe";

addEventListener("load", () => {
  const canvas = document.getElementById("main-canvas") as HTMLCanvasElement;
  canvas.width = 900;
  canvas.height = 600;

  const context = canvas.getContext("2d") as CanvasRenderingContext2D;
  const backgroundImage = document.getElementById("background") as HTMLImageElement;
  const flappyImage = document.getElementById("flappy") as HTMLImageElement;
  const pipeImage = document.getElementById("pipe") as HTMLImageElement;

  let lastTime = 0;
  let timer = 0;
  let gameState: "intro" | "playing" | "game-over" = "intro";
  let score = 0;

  const flappyBird = new Player(50, 150, 409, 289);
  const pipes: Pipe[] = [];

  function animate(timeStamp: number) {
    const deltaTime = timeStamp - lastTime;
    lastTime = timeStamp;
    timer += deltaTime;

    context.clearRect(0, 0, canvas.width, canvas.height);

    update(deltaTime);
    draw(context);
    generatePipes();

    if (gameState === "playing") {
      requestAnimationFrame(animate);
    }
  }

  animate(0);

  function update(deltaTime: number) {
    flappyBird.update();

    if (flappyBird.checkOutOfBounds(canvas)) {
      gameState = "game-over";
    }

    pipes.forEach((pipe) => {
      if (pipe.x + pipe.width < 0) {
        pipes.pop();
      }
      if (pipe.x === flappyBird.x && pipe.position === "top") {
        score += 1;
      }
      if (collision(pipe, flappyBird)) {
        gameState = "game-over";
      }

      pipe.update();
    });
  }

  function draw(context: CanvasRenderingContext2D) {
    context.drawImage(backgroundImage, 0, 0, canvas.width, canvas.height);
    flappyBird.draw(context, flappyImage);

    pipes.forEach((pipe) => {
      pipe.draw(context, pipeImage);
    });

    if (gameState === "intro") {
      const text = 'Press "Enter" to start the game';
      const fontSize = 40;
      const fontFamily = "Serif";

      context.fillStyle = "black";
      context.font = fontSize + "px " + fontFamily;
      const textWidth = context.measureText(text).width;

      const x = (canvas.width - textWidth) / 2;
      const y = (canvas.height + fontSize) / 2;

      context.fillText(text, x, y);
    }

    if (gameState === "playing") {
      const text = "Score: " + score;
      const fontSize = 30;
      const fontFamily = "Serif";

      context.fillStyle = "white";
      context.font = fontSize + "px " + fontFamily;

      const x = 30;
      const y = 50;

      context.fillText(text, x, y);
    }

    if (gameState === "game-over") {
      const text = "Your score is " + score;
      const text2 = 'press "R" to restart!';
      const fontSize = 40;
      const fontFamily = "Serif";

      context.fillStyle = "black";
      context.font = fontSize + "px " + fontFamily;
      const textWidth = context.measureText(text).width;

      const x = (canvas.width - textWidth) / 2;
      const y = (canvas.height + fontSize) / 2;

      context.fillText(text, x, y);
      context.fillText(text2, x, y + 40);
    }
  }

  function generatePipes() {
    if (timer >= 1500) {
      const randomHeight = Math.random() * 20 + 220;

      const topPipe = new Pipe(canvas.width + 5, 0, 120, randomHeight, 3, "top");
      const bottomPipe = new Pipe(
        canvas.width + 5,
        canvas.height - randomHeight,
        120,
        randomHeight,
        3,
        "bottom"
      );
      pipes.unshift(topPipe, bottomPipe);
      timer = 0;
    }
  }

  function collision(pipe: Pipe, player: Player) {
    if (
      pipe.x < player.x + player.width &&
      pipe.x + pipe.width > player.x &&
      pipe.y < player.y + player.height &&
      pipe.y + pipe.height > player.y
    ) {
      return true;
    } else {
      return false;
    }
  }

  document.addEventListener("keydown", function (event) {
    if (event.code === "Space") {
      flappyBird.velocity = flappyBird.bounceStrength;
    }
    if (event.code === "Enter") {
      if (gameState === "playing" || gameState === "game-over") {
        return;
      }

      gameState = "playing";
      animate(0);
    }
    if (event.code === "KeyR" && gameState === "game-over") {
      window.location.reload();
    }
  });
});
