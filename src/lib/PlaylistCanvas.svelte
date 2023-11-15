<script lang="ts">
  import { onMount } from 'svelte';
  import random from '$lib/utils/random.js';
  import clamp from '$lib/utils/clamp.js';
  import { goto } from '$app/navigation';
  import { darkenHexHsl } from '$lib/utils/hex-to-hsl.js';
  import type { Ball, Playlist } from '$lib/types';
  import { writable } from 'svelte/store';

  export let playlists: Playlist[] = [];

  let clientHeight = 0;
  let clientWidth = 0;
  let selectedBall: Ball | null = null;

  function startPositionX(radius: number) {
    return clamp(
      clientWidth * random(0, 1, 0.1),
      10 + radius * 2,
      clientWidth - 10 - radius * 2
    );
  }
  function startPositionY(radius: number) {
    const r = random(-2000, -100, 50);
    return clamp(r, -2000, 0 - radius);
  }

  function createBalls(): Ball[] {
    return playlists.map((playlist) => {
      const radius =
        playlist.name === 'Top 10'
          ? 100
          : clamp(1200 * playlist.score, 60, 200);
      const mass = radius;
      const vy = (radius / 100) * 5;

      return {
        x: startPositionX(radius),
        y: startPositionY(radius),
        r: radius,
        color: playlist.color,
        vx: random(-1, 1, 0.1),
        vy: vy,
        mass: mass,
        text: playlist.name,
        id: playlist.id
      };
    });
  }

  let canvas: HTMLCanvasElement;

  const stopIkkeMobb = writable(false);

  onMount(() => {
    // Get the canvas element and its context
    // const canvas: HTMLCanvasElement = document.getElementById('myCanvas');
    if (!canvas) return;

    canvas.width = clientWidth;
    canvas.height = clientHeight;
    const ctx = canvas.getContext('2d', { willReadFrequently: true });

    // Create an array of ball objects with x, y, radius, color, and velocity properties
    const balls = createBalls();
    const originalBallColors = balls.map((ball) => ball.color);

    const gravity = 0.1;
    const bounceFactor = 0.3;

    // Draw a ball on the canvas
    function drawBall(ball: Ball) {
      if (!ctx) return;

      // draw inner stroke
      ctx.fillStyle = ball.color;
      ctx.beginPath();
      ctx.arc(ball.x, ball.y, ball.r, 0, Math.PI * 2);
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
    function updateBall(ball: Ball) {
      const dampingFactor = 0.995; // Adjust as needed
      ball.vx *= dampingFactor;
      ball.vy *= dampingFactor;

      ball.vy += gravity;
      ball.x += ball.vx;
      ball.y += ball.vy;

      if (ball.y + ball.r > canvas.height) {
        ball.y = canvas.height - ball.r;
        ball.vy *= -bounceFactor;
      }

      if (ball.x + ball.r > canvas.width || ball.x - ball.r < 0) {
        // Check for collisions between a ball and the walls
        if (ball.x + ball.r > canvas.width) {
          ball.x = canvas.width - ball.r;
          ball.vx *= -bounceFactor;
        }
        if (ball.x - ball.r < 0) {
          ball.x = ball.r;
          ball.vx *= -bounceFactor;
        }
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
    function handleBallClick(ball: Ball) {
      // const imgData = ctx?.getImageData(0, 0, canvas.width, canvas.height);
      // console.log('');
      //
      // console.log('imgData', imgData);
      // $stopIkkeMobb = true;
      //
      // setTimeout(() => {
      //   ctx?.clearRect(0, 0, canvas.width, canvas.height);
      // }, 2000);
      //
      // setTimeout(() => {
      //   if (imgData) {
      //     $stopIkkeMobb = false;
      //     ctx?.putImageData(imgData, 0, 0);
      //     requestAnimationFrame(updateCanvas);
      //   }
      // }, 4000);
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
    function handleKeyDown(event: KeyboardEvent) {
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
      if (!selectedBall) selectedBall = balls[0];

      const prevIndex = balls.indexOf(selectedBall);

      selectedBall.color = originalBallColors[prevIndex];

      if (prevIndex > 0) {
        selectedBall = balls[prevIndex - 1];
      } else {
        selectedBall = balls[balls.length - 1];
      }
      const newIndex = balls.indexOf(selectedBall);
      selectedBall.color = darkenHexHsl(originalBallColors[newIndex], 5);
    }

    // Select the next ball
    function selectNextBall() {
      if (!selectedBall) selectedBall = balls[0];

      const prevIndex = balls.indexOf(selectedBall);

      selectedBall.color = originalBallColors[prevIndex];

      if (prevIndex < balls.length - 1) {
        selectedBall = balls[prevIndex + 1];
      } else {
        selectedBall = balls[0];
      }

      const newIndex = balls.indexOf(selectedBall);
      selectedBall.color = darkenHexHsl(originalBallColors[newIndex], 5);
    }

    function handleClick(event: MouseEvent) {
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

    function handleMouseMove(event: MouseEvent) {
      const rect = canvas.getBoundingClientRect();
      const mouseX = event.clientX - rect.left;
      const mouseY = event.clientY - rect.top;
      let cursor = 'default';
      for (let i = 0; i < balls.length; i++) {
        const ball = balls[i];
        const dx = ball.x - mouseX;
        const dy = ball.y - mouseY;
        const distance = Math.sqrt(dx * dx + dy * dy);
        ball.color = originalBallColors[i];
        // Subtract 5 to avoid highlighting touching neighbours.
        if (distance < ball.r - 5) {
          cursor = 'pointer';
          ball.color = darkenHexHsl(originalBallColors[i], 5);
          selectedBall = ball;
          break;
        }
      }
      canvas.style.cursor = cursor;
    }

    // Add event listeners to the canvas
    canvas.addEventListener('click', handleClick);
    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('keydown', handleKeyDown);
    canvas.tabIndex = 0;

    let stopAllMovement = false;
    const stopAllMovementTimeout = setTimeout(() => {
      stopAllMovement = true;
    }, 10000);

    // Update the canvas
    function updateCanvas() {
      if (!ctx || !canvas) return;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Check if all balls are stationary and stop animation
      const isEveryBallStationary = balls.every((ball) => {
        const velocityThreshold = 0.125;
        return (
          Math.abs(ball.vx) < velocityThreshold &&
          Math.abs(ball.vy) < velocityThreshold
        );
      });

      const shouldStopAllMovement = isEveryBallStationary || stopAllMovement;

      for (let i = 0; i < balls.length; i++) {
        const ball = balls[i];
        drawBall(ball);

        if (!shouldStopAllMovement) {
          updateBall(ball);
        }
      }
      if (!shouldStopAllMovement) {
        checkBallCollisions();
      }

      if (!$stopIkkeMobb) requestAnimationFrame(updateCanvas);
    }

    // Start the animation
    requestAnimationFrame(updateCanvas);

    return () => clearTimeout(stopAllMovementTimeout);
  });

  // function updateCanvasSize() {
  // canvas.width = clientWidth;
  // canvas.height = clientHeight;
  // }
</script>

<!--<svelte:window on:resize={updateCanvasSize} />-->

<div
  class="absolute bottom-0 left-0 right-0 top-0"
  bind:clientHeight
  bind:clientWidth
>
  <canvas bind:this={canvas} />
</div>
