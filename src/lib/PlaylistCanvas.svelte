<script>
  import { onMount } from 'svelte';
  import random from '$lib/utils/random';
  import clamp from '$lib/utils/clamp';
  import { goto } from '$app/navigation';

  export let playlists = [];

  let clientHeight = 0;
  let clientWidth = 0;
  let selectedBall = null;

  function startPositionX(radius) {
    return clamp(
      clientWidth * random(0, 1, 0.1),
      10 + radius * 2,
      clientWidth - 10 - radius * 2
    );
  }
  function startPositionY(radius) {
    const r = random(-2000, -100, 50);
    return clamp(r, -2000, 0 - radius);
  }
  function createBalls() {
    return playlists.map((playlist) => ({
      x: startPositionX(45),
      y: startPositionY(45),
      r:
        playlist.name === 'Top 10'
          ? 100
          : clamp(1200 * playlist.score, 60, 200),
      color: playlist.color,
      vx: 0,
      vy: 5,
      mass: 1,
      text: playlist.name,
      id: playlist.id
    }));
  }

  onMount(() => {
    // Get the canvas element and its context
    const canvas = document.getElementById('myCanvas');
    canvas.width = clientWidth;
    canvas.height = clientHeight;
    const ctx = canvas.getContext('2d');

    // Create an array of ball objects with x, y, radius, color, and velocity properties
    const balls = createBalls();
    const gravity = 0.075;
    const bounceFactor = 0.45;

    // Draw a ball on the canvas
    function drawBall(ball) {
      const strokeWidth = 4;
      const innerRadius = ball.r - strokeWidth;

      // draw inner stroke
      ctx.fillStyle = ball.color;
      ctx.beginPath();
      ctx.arc(ball.x, ball.y, ball.r, 0, Math.PI * 2);
      ctx.fill();

      // draw main circle
      ctx.fillStyle = ball.color;
      ctx.beginPath();
      ctx.arc(ball.x, ball.y, innerRadius, 0, Math.PI * 2);
      ctx.fill();

      // draw text
      ctx.fillStyle = 'white';
      const fontSize = ball.r * 0.3; // adjust the percentage as needed
      ctx.font = `bold ${fontSize}px Fraunces`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(ball.text, ball.x, ball.y, ball.r * 2 - 10);
    }

    // Update the position and velocity of a ball
    function updateBall(ball) {
      ball.vy += gravity;
      ball.x += ball.vx;
      ball.y += ball.vy;
      if (ball.y + ball.r > canvas.height) {
        ball.y = canvas.height - ball.r;
        ball.vy *= -bounceFactor;
      }
      if (ball.x + ball.r > canvas.width || ball.x - ball.r < 0) {
        ball.vx *= -1;
      }
    }

    // Check for collisions between a ball and the walls
    function checkCollisions(ball) {
      if (ball.x + ball.r > canvas.width) {
        ball.x = canvas.width - ball.r;
        ball.vx *= -bounceFactor;
      }
      if (ball.x - ball.r < 0) {
        ball.x = ball.r;
        ball.vx *= -bounceFactor;
      }
    }

    // Check for collisions between the balls
    function checkBallCollisions() {
      for (let i = 0; i < balls.length; i++) {
        const ball1 = balls[i];
        for (let j = i + 1; j < balls.length; j++) {
          const ball2 = balls[j];
          const dx = ball2.x - ball1.x;
          const dy = ball2.y - ball1.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          if (distance < ball1.r + ball2.r) {
            const angle = Math.atan2(dy, dx);
            const sin = Math.sin(angle);
            const cos = Math.cos(angle);
            const vx1 = ball1.vx * cos + ball1.vy * sin;
            const vy1 = ball1.vy * cos - ball1.vx * sin;
            const vx2 = ball2.vx * cos + ball2.vy * sin;
            const vy2 = ball2.vy * cos - ball2.vx * sin;
            const v1 =
              ((ball1.mass - ball2.mass) * vx1 + 2 * ball2.mass * vx2) /
              (ball1.mass + ball2.mass);
            const v2 =
              ((ball2.mass - ball1.mass) * vx2 + 2 * ball1.mass * vx1) /
              (ball1.mass + ball2.mass);
            ball1.vx = v1 * cos - vy1 * sin;
            ball1.vy = vy1 * cos + v1 * sin;
            ball2.vx = v2 * cos - vy2 * sin;
            ball2.vy = vy2 * cos + v2 * sin;
            const overlap = 0.5 * (distance - ball1.r - ball2.r);
            ball1.x -= (overlap * (ball1.x - ball2.x)) / distance;
            ball1.y -= (overlap * (ball1.y - ball2.y)) / distance;
            ball2.x += (overlap * (ball1.x - ball2.x)) / distance;
            ball2.y += (overlap * (ball1.y - ball2.y)) / distance;
          }
        }
      }
    }

    // Handle ball clicks
    function handleBallClick(ball) {
      // TOOD: Update to `/playlist/${ball.id}`
      goto(`/${ball.id}`);
    }

    // Handle ball activation
    function activateBall() {
      if (selectedBall) {
        handleBallClick(selectedBall);
      }
    }

    // Handle keyboard events
    function handleKeyDown(event) {
      if (event.key === 'ArrowLeft') {
        event.preventDefault();
        selectPreviousBall();
      } else if (event.key === 'ArrowRight') {
        event.preventDefault();
        selectNextBall();
      } else if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        activateBall();
      }
    }

    // Select the previous ball
    function selectPreviousBall() {
      const index = balls.indexOf(selectedBall);
      if (index > 0) {
        selectedBall = balls[index - 1];
      } else {
        selectedBall = balls[balls.length - 1];
      }
    }

    // Select the next ball
    function selectNextBall() {
      const index = balls.indexOf(selectedBall);
      if (index < balls.length - 1) {
        selectedBall = balls[index + 1];
      } else {
        selectedBall = balls[0];
      }
    }

    function handleClick(event) {
      const rect = canvas.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;
      for (let i = 0; i < balls.length; i++) {
        const ball = balls[i];
        const dx = x - ball.x;
        const dy = y - ball.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        if (distance < ball.r) {
          handleBallClick(ball);
          break;
        }
      }
    }
    // Add event listeners to the canvas
    canvas.addEventListener('click', handleClick);

    function handleMouseMove(event) {
      const rect = canvas.getBoundingClientRect();
      const mouseX = event.clientX - rect.left;
      const mouseY = event.clientY - rect.top;
      let cursor = 'default';
      for (let i = 0; i < balls.length; i++) {
        const ball = balls[i];
        const dx = ball.x - mouseX;
        const dy = ball.y - mouseY;
        const distance = Math.sqrt(dx * dx + dy * dy);
        if (distance <= ball.r) {
          cursor = 'pointer';
          selectedBall = ball;
          break;
        }
      }
      canvas.style.cursor = cursor;
    }

    canvas.addEventListener('mousemove', handleMouseMove);

    canvas.addEventListener('keydown', handleKeyDown);
    canvas.tabIndex = 0;

    // Update the canvas
    function updateCanvas() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (let i = 0; i < balls.length; i++) {
        const ball = balls[i];
        drawBall(ball);
        updateBall(ball);
        checkCollisions(ball);
      }
      checkBallCollisions();
      requestAnimationFrame(updateCanvas);
    }

    // Start the animation
    requestAnimationFrame(updateCanvas);
  });

  function updateCanvasSize() {
    const canvas = document.getElementById('myCanvas');
    canvas.width = clientWidth;
    canvas.height = clientHeight;
  }
</script>

<svelte:window on:resize={updateCanvasSize} />

<div class="h-full" bind:clientHeight bind:clientWidth>
  <canvas id="myCanvas" style="" />
</div>
