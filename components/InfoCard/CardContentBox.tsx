import { createStyles, Text } from '@mantine/core';
import { FC, ReactNode } from 'react';

type CardContentBoxProps = {
  children: ReactNode;
  header: ReactNode;
  footer?: ReactNode;
}

export const CardContentBox: FC<CardContentBoxProps> = ({ children, header, footer }) => {

  const useStyles = createStyles<string>((theme, params, getRef) => {
    return {
      cardHeader: {
        ...theme.fn.focusStyles(),
        fontStyle: 'normal',
        fontWeight: '350',
        fontSize: '15px',
        lineHeight: '18px',
        position: 'absolute',
        color: theme.colors.almostWhite[0],
        top: '10px',
        paddingLeft: '10px',
        paddingRight: '10px',
        paddingTop: '10px',
        paddingBottom: '10px',
        borderRadius: '10px',
        background: 'transparent',
      },
    };
  });
      const { classes, cx } = useStyles();
      return (
        <>
          {
            <>
              <Text className={classes.cardHeader}>{header}</Text>
              {children}
              <Text className={classes.cardHeader}>{footer}</Text>
            </>
          }
        </>
      );
    }
  ;
