import { keyframes } from '@emotion/react';
import { createStyles } from '@mantine/core';
import { FC, ReactNode } from 'react';
import { CSSTransition, SwitchTransition } from 'react-transition-group';

const fading = keyframes`
  0% {
    opacity: 0;
  }
  50% {
    opacity: 0;
  }
  100% {
    opacity: 0.5;
  }
`;

const unfading = keyframes`
  0% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.8;
  }
  100% {
    opacity: 0.8;
  }
`;

const useStyles = createStyles<string>((theme, params, getRef) => {
  return {
    glowingBoreal: {
      position: 'absolute',
      marginLeft: 'auto',
      marginRight: 'auto',
      borderRadius: '100%',
      background: 'transparent',
      webkitAnimation: `${fading} 50s ease-in-out infinite alternate`,
      animation: `${fading} 50s ease-in-out infinite alternate`,
      mozAnimation: `${fading} 50s ease-in-out infinite alternate`,
      pointerEvents: 'none',
      '.mantine-Image-image': {
        maxHeight: '100vh',
        maxWidth: '100vw',
      },
    },
    unGlowingBoreal: {
      position: 'absolute',
      marginLeft: 'auto',
      marginRight: 'auto',
      borderRadius: '100%',
      background: 'transparent',
      pointerEvents: 'none',
      webkitAnimation: `${unfading} 7s ease-in-out  infinite alternate`,
      animation: `${unfading} 7s ease-in-out  infinite alternate`,
      mozAnimation: `${unfading} 7s ease-in-out  infinite alternate`,
    },
    app: {
      pointerEvents: 'none',
      '&-appear': {
        opacity: 0.01,
      },
      '&-appear-active': {
        opacity: 1,
        transition: 'opacity 0.5s ease-in',
      },
      '&-enter': {
        opacity: 0,
      },
      '&-enter-active': {
        opacity: 1,
        transition: 'opacity 300ms',
      },
      '&-exit': {
        opacity: 1,
      },
      '&-exit-active': {
        opacity: 0,
        transition: 'opacity 300ms',
      },
    },
    boreal: {
      '&-appear': {
        opacity: 0.01,
      },
      '&-appear-active': {
        opacity: 1,
        transition: 'opacity 0.5s ease-in',
      },
      '&-enter': {
        opacity: 0,
      },
      '&-enter-active': {
        opacity: 1,
        transition: 'opacity 300ms',
      },
      '&-exit': {
        opacity: 1,
      },
      '&-exit-active': {
        opacity: 0,
        transition: 'opacity 300ms',
      },
    },
  };
});

export const FancyBackground: FC<{ children: ReactNode }> = ({ children }) => {
  const { classes, cx } = useStyles();
  return (
    <SwitchTransition mode='out-in'>
      <CSSTransition
        key={'start'}
        appear={true}
        classNames={classes.app}
        timeout={{
          appear: 700,
          enter: 700,
          exit: 500,
        }}
      >
        <>
          <div
            style={{
              left: 50,
              top: 50,
              width: '70vw',
              opacity: 0.7,
              marginLeft: 'auto',
              marginRight: 'auto',
              position: 'absolute',
            }}
          ></div>
          {children}
        </>
      </CSSTransition>
    </SwitchTransition>
  );
};
