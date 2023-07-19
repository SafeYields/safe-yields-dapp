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
  speed: number;
}

interface CreateStarProps {
  minSize: number;
  maxSize: number;
  color: string;
  canvasWidth: number;
  canvasHeight: number;
  speed?: number;
  minSpeed?: number;
  maxSpeed?: number;
}
const createStar = ({
  minSize,
  maxSize,
  color,
  canvasWidth,
  canvasHeight,
  speed = 2e-5,
  minSpeed,
  maxSpeed,
}: CreateStarProps): Star => {
  const startPosition: { x: number; y: number } = {
    x: Math.random() * canvasWidth,
    y: Math.random() * canvasHeight,
  };

  const size = Math.random() * (maxSize - minSize) + minSize;
  const averageSize = 0.5 * (maxSize - minSize) + minSize;
  const _speed = minSpeed && maxSpeed ? Math.random() * maxSpeed - minSpeed + minSpeed : speed;

  return {
    startPosition,
    position: startPosition,
    distance: Math.sqrt(
      Math.pow(startPosition.x - canvasWidth / 2, 2) +
        Math.pow(startPosition.y - (canvasHeight / 2 + 100), 2),
    ),
    size,
    angle: (Math.atan2(startPosition.y, startPosition.x) * 180) / Math.PI,
    color,
    speed: _speed * (size / averageSize),
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
}> = ({
  starColor = '#fff',
  starsAmount = Math.min(Math.ceil(window.innerWidth / 3), 1000),
  starMinSize = 0.5,
  starMaxSize = 1.2,
  children,
}) => {
  const { classes } = useStyles();
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const requestIdRef = useRef<number | null>(null);

  const update = useCallback(
    ({
      stars,
      canvas,
      ctx,
      skyX,
      skyY,
      startingCanvasHeight,
      startingCanvasWidth,
    }: {
      time: number;
      stars: Star[];
      canvas: HTMLCanvasElement;
      ctx: CanvasRenderingContext2D;
      skyX: number;
      skyY: number;
      startingCanvasHeight: number;
      startingCanvasWidth: number;
    }) => {
      ctx.canvas.width = canvas.offsetWidth;
      ctx.canvas.height = canvas.offsetHeight;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (let i = 0; i < stars.length; i++) {
        const xScale = canvas.offsetWidth / startingCanvasWidth;

        const yScale = canvas.offsetHeight / startingCanvasHeight;

        stars[i].position.x = (skyX + stars[i].distance * Math.sin(stars[i].angle)) * xScale;
        stars[i].position.y = (skyY + stars[i].distance * Math.cos(stars[i].angle)) * yScale;
        stars[i].angle += stars[i].speed;
        if (
          stars[i].position.x > 0 &&
          stars[i].position.x <= canvas.width &&
          stars[i].position.y > 0 &&
          stars[i].position.y <= canvas.height
        ) {
          ctx.beginPath();
          ctx.fillStyle = stars[i].color;
          ctx.arc(stars[i].position.x, stars[i].position.y, stars[i].size, 0, 2 * Math.PI, false);
          ctx.fill();
        }
      }
      requestIdRef.current = requestAnimationFrame((time) =>
        update({
          time,
          stars,
          canvas,
          ctx,
          skyX,
          skyY,
          startingCanvasHeight,
          startingCanvasWidth,
        }),
      );
    },
    [],
  );

  useLayoutEffect(() => {
    if (canvasRef.current) {
      const canvas = canvasRef.current;
      const getHeight = () => canvas.offsetHeight ?? 0;
      const getWidth = () => canvas.offsetWidth ?? 0;

      // These numbers make the 'gravity center' as the center o SAFE logo.
      const skyX = 0.494 * canvas.offsetWidth;
      const skyY = 0.83 * canvas.offsetHeight;

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
        update({
          time,
          stars,
          canvas,
          ctx,
          skyX,
          skyY,
          startingCanvasHeight: canvas.offsetHeight,
          startingCanvasWidth: canvas.offsetWidth,
        }),
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
