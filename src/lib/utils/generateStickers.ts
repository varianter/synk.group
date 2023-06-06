import SynkIcon from '$lib/icons/SynkIcon.svelte';
import SynkLargeIcon from '$lib/icons/SynkLargeIcon.svelte';
import IconWrapper from '$lib/login/IconWrapper.svelte';
import { colors } from './palette';
import random from './random';
import shuffle from 'lodash.shuffle';

export default function generateStickers() {
  const numberOfStickers = colors.length;
  const stickers = [];
  const shuffledColors = shuffle(colors);

  for (let i = 0; i < numberOfStickers; i++) {
    const large = random(0, 10) > 5;

    stickers.push({
      component: IconWrapper,
      props: {
        Icon: large ? SynkLargeIcon : SynkIcon,
        ...calculatePosition(i, numberOfStickers),
        color: shuffledColors[i]
      }
    });
  }

  return shuffle(stickers);
}

function calculatePosition(i: number, maxI: number) {
  const gridSize = Math.floor(Math.sqrt(maxI));

  const currentColumn = Math.floor(i % gridSize);
  const currentRow = Math.floor(i / gridSize);
  const cellSize = 100 / (gridSize + 1);

  const top = random(currentColumn * cellSize, (currentColumn + 1) * cellSize);
  const left = random(currentRow * cellSize, (currentRow + 1) * cellSize);

  return { top, left };
}
