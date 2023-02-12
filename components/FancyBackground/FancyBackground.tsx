import { keyframes } from '@emotion/react';
import { createStyles, Image } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { FC, ReactNode } from 'react';
// @ts-ignore
import GalaxyBackground from 'react-animated-stars';
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
      },
      unGlowingBoreal: {
        position: 'absolute',
        marginLeft: 'auto',
        marginRight: 'auto',
        borderRadius: '100%',
        background: 'transparent',
        webkitAnimation: `${unfading} 20s ease-in-out  infinite alternate`,
        animation: `${unfading} 20s ease-in-out  infinite alternate`,
        mozAnimation: `${unfading} 20s ease-in-out  infinite alternate`,
      },
      app: {
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
  },
);

const glowing = keyframes`
  0% {
    filter: drop-shadow(0 0 5px #062C2D) drop-shadow(0 0 15px #062C2D) drop-shadow(0 0 20px #062C2D);
  }
  90% {
    filter: drop-shadow(0 0 5px #062C2D) drop-shadow(0 0 15px #062C2D) drop-shadow(0 0 20px #062C2D);
  }

  100% {
    filter: drop-shadow(0 0 20px #D1DE5D) drop-shadow(0 0 25px #D9E022) drop-shadow(0 0 40px #E89B17);
  }
`;


export const FancyBackground: FC<{ children: ReactNode }> = ({ children }) => {
  const [opened, handlers] = useDisclosure(false);
  const { classes, cx } = useStyles();
  return (
    <SwitchTransition mode='out-in'>
      <CSSTransition key={'start'} appear={true} classNames={classes.app} timeout={{
        appear: 700,
        enter: 700,
        exit: 500,
      }}>
         <GalaxyBackground starCount={100} rotationSpeed={0.05} bgColor={'transparent'} minSize={0.3} maxSize={2}
                          innerRadius={150}>
        <>
          <Image
            src='/assets/boreal1.svg'
            alt='glowing boreal'
            className={classes.glowingBoreal}
          />
          <div
            style={{
              left: 50,
              top: 50,
              width: 800,
              opacity: 0.7,
              marginLeft: 'auto',
              marginRight: 'auto',
              position: 'absolute',
            }}>
            <Image
              src='/assets/boreal2.svg'
              alt='glowing boreal'
              className={classes.unGlowingBoreal}
            />
          </div>
          {children}
        </>
         </GalaxyBackground>
      </CSSTransition>
    </SwitchTransition>
  );
};
