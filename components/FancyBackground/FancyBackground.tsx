import { createStyles, Image } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { FC, ReactNode } from 'react';
// @ts-ignore
import GalaxyBackground from 'react-animated-stars';
import { CSSTransition, SwitchTransition } from 'react-transition-group';

const useStyles = createStyles<string>((theme, params, getRef) => {
    return {
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
    };
  },
);


export const FancyBackground: FC<{ children: ReactNode }> = ({ children }) => {
  const [opened, handlers] = useDisclosure(false);
  const { classes, cx } = useStyles();

  return (
    <SwitchTransition mode='out-in'>
      <CSSTransition key={'start'} appear={true} classNames={classes.app} timeout={700}>
        <GalaxyBackground starCount={100} rotationSpeed={0.05} bgColor={'transparent'} minSize={0.3} maxSize={2}
                          innerRadius={200}>
          <div style={{ width: 240, marginLeft: 'auto', marginRight: 'auto', position: 'absolute' }}>
            <Image
              src='/assets/boreal1.svg'
            />
          </div>
          {children}
        </GalaxyBackground>
      </CSSTransition>
    </SwitchTransition>
  );
};
