import { createStyles } from '@mantine/core';
import { FC, ReactNode, useCallback, useLayoutEffect, useRef } from 'react';

interface Star {
  startPosition: {
    x: number;
    y: number;
  };
  position: {
    x: number;
    y: number;
  };
  distance: number;
  size: number;
  angle: number;
  color: string;
}

const getRandomInteger = (min: number, max: number) => {
  return Math.round(Math.random() * (max - min) + min);
};

interface CreateStarProps {
  minSize: number;
  maxSize: number;
  color: string;
  canvasWidth: number;
  canvasHeight: number;
}
const createStar = ({
  minSize,
  maxSize,
  color,
  canvasWidth,
  canvasHeight,
}: CreateStarProps): Star => {
  const startPosition: { x: number; y: number } = {
    x: Math.random() * canvasWidth,
    y: Math.random() * canvasHeight,
  };

  return {
    startPosition,
    position: startPosition,
    distance: Math.sqrt(
      Math.pow(startPosition.x - canvasWidth / 2, 2) +
        Math.pow(startPosition.y - (canvasHeight / 2 + 100), 2),
    ),
    size: Math.random() * (maxSize - minSize) + minSize,
    angle: (Math.atan2(startPosition.y, startPosition.x) * 180) / Math.PI,
    color,
  };
};

const createStars = ({ starsAmount, ...rest }: CreateStarProps & { starsAmount: number }) => {
  const stars = [];
  for (let i = 0; i < starsAmount; i++) {
    stars.push(createStar(rest));
  }
  return stars;
};

const useStyles = createStyles<string>((theme, params, getRef) => {
  return {
    canvas: {
      position: 'absolute',
      inset: 0,
      width: '100%',
      height: '100%',
      pointerEvents: 'none',
    },
  };
});

// This implementation is based on https://codepen.io/krzysztofadamczak/pen/vYQNrKW
export const StarryBackground: FC<{
  starColor?: string;
  starsAmount?: number;
  starMinSize?: number;
  starMaxSize?: number;
  children: ReactNode;
}> = ({ starColor = '#fff', starsAmount = 1000, starMinSize = 0.5, starMaxSize = 2, children }) => {
  const { classes } = useStyles();
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const requestIdRef = useRef<number | null>(null);

  const update = useCallback(
    ({
      stars,
      starsAmount,
      canvas,
      ctx,
      skyX,
      skyY,
    }: {
      time: number;
      stars: Star[];
      starsAmount: number;
      canvas: HTMLCanvasElement;
      ctx: CanvasRenderingContext2D;
      skyX: number;
      skyY: number;
    }) => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.beginPath();
      ctx.fillStyle = 'transparent';
      ctx.rect(0, 0, canvas.width, canvas.height);
      ctx.fill();

      ctx.beginPath();
      ctx.fillStyle = '#fff';
      for (let i = 0; i < starsAmount; i++) {
        stars[i].position.x = skyX + stars[i].distance * Math.sin(stars[i].angle);
        stars[i].position.y = skyY + stars[i].distance * Math.cos(stars[i].angle);
        stars[i].angle += 0.00002;
        if (
          stars[i].position.x > 0 &&
          stars[i].position.x <= canvas.width &&
          stars[i].position.y > 0 &&
          stars[i].position.y <= canvas.height
        ) {
          ctx.rect(stars[i].position.x, stars[i].position.y, stars[i].size, stars[i].size);
        }
      }
      ctx.fill();
      requestIdRef.current = requestAnimationFrame((time) =>
        update({ time, stars, starsAmount, canvas, ctx, skyX, skyY }),
      );
    },
    [],
  );

  useLayoutEffect(() => {
    if (canvasRef.current) {
      const canvas = canvasRef.current;
      const getHeight = () => canvas.offsetHeight ?? 0;
      const getWidth = () => canvas.offsetWidth ?? 0;

      const skyX = canvas.offsetWidth / 2;
      const skyY = canvas.offsetHeight / 2;

      const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;

      ctx.canvas.width = canvas.offsetWidth;
      ctx.canvas.height = canvas.offsetHeight;

      const stars = createStars({
        starsAmount,
        canvasHeight: getHeight(),
        canvasWidth: getWidth(),
        color: starColor,
        minSize: starMinSize,
        maxSize: starMaxSize,
      });

      requestIdRef.current = requestAnimationFrame((time) =>
        update({ time, stars, starsAmount, canvas, ctx, skyX, skyY }),
      );

      if (Number.isFinite(requestIdRef.current)) {
        return () => {
          cancelAnimationFrame(requestIdRef.current as number);
        };
      }
    }
  }, [canvasRef, starColor, starMinSize, starMaxSize, starsAmount]);

  return (
    <>
      <canvas
        ref={canvasRef}
        role='presentation'
        aria-label='background'
        aria-hidden='true'
        className={classes.canvas}
      />
      {children}
    </>
  );
};
