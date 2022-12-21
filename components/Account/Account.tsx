import { Button, createStyles } from '@mantine/core';
import { useWeb3React } from '@web3-react/core';
import { UserRejectedRequestError } from '@web3-react/injected-connector';
import { injected } from 'connectors';
import useENSName from 'hooks/useENSName';
import useMetaMaskOnboarding from 'hooks/useMetaMaskOnboarding';
import { useEffect, useState } from 'react';
import { Download, Link, Unlink } from 'tabler-icons-react';
import { shortenHex } from 'utils/web3utils';


const useStyles = createStyles<string>((theme, params, getRef) => {
  const icon: string = getRef('icon');

  return {
    button: {
      ...theme.fn.focusStyles(),
      width: '100%',
      display: 'flex',
      margin: 'auto',
      marginBottom: 2,
      alignItems: 'center',
      columnGap: theme.spacing.sm,
      textDecoration: 'none',
      fontSize: theme.fontSizes.md,
      color: theme.colors[theme.primaryColor][0],
      padding: `${theme.spacing.xs}px ${theme.spacing.xs}px`,
      lineHeight: '18px',
      fontWeight: 325,
      border: 'none',
      backgroundSize: '300% 100%',
      backgroundImage: theme.fn.linearGradient(90, theme.colors.mustardGreen[0], theme.colors.orange[0], theme.colors.mustardGreen[0], theme.colors.orange[0]),

      borderRadius: '50px',
      mozTransition: 'all 0.4s ease-in-out',
      oTransition: 'all 0.4s ease-in-out',
      webkitTransition: 'all 0.4s ease-in-out',
      transition: 'all 0.4s ease-in-out',
      boxShadow: '0 4px 15px 0 rgba(229, 66, 10, 0.75)',

      '&:hover': {
        // background: theme.fn.linearGradient(270, theme.colors.mustardGreen[0], theme.colors.orange[0]),
        backgroundPosition: '100% 0',
        mozTransition: 'all 0.4s ease-in-out',
        oTransition: 'all 0.4s ease-in-out',
        webkitTransition: 'all 0.4s ease-in-out',
        transition: 'all 0.4s ease-in-out',
        //   borderRadius: '50px',
        //   borderWidth: '2px',
        //   borderStyle: 'solid',
        //   '&:before': {
        //     content: '""',
        //     position: 'absolute',
        //     top: 0,
        //     right: 0,
        //     bottom: 0,
        //     left: 0,
        //     zIndex: -1,
        //     margin: '-4px',
        //     borderRadius: 'inherit',
        //     background: theme.fn.linearGradient(0, theme.colors.mustardGreen[0], theme.colors.orange[0]),
        //   },
      },
      '&:focus': {
        outline: 'none',
      },
    },

    buttonActive: {
      '&, &:hover': {
        // background: 'transparent',
        background: theme.colors.veryDarkGreen[0],
        '&:before': {
          content: '""',
          position: 'absolute',
          top: 0,
          right: 0,
          bottom: 0,
          left: 0,
          zIndex: -1,
          margin: '-4px',
          borderRadius: 'inherit',
          background: theme.fn.linearGradient(0, theme.colors.mustardGreen[0], theme.colors.orange[0]),
        },
        // borderRadius: '50px',
        // borderWidth: '2px',
        // borderStyle: 'solid',
        // borderColor: theme.colors[theme.primaryColor][0],
        [`& .${icon}`]: {
          color: theme.colors[theme.primaryColor][7],
        },
      },
    },
  };
});

type AccountProps = {
  triedToEagerConnect: boolean;
};

export const Account = ({ triedToEagerConnect }: AccountProps) => {
  const { classes, cx } = useStyles();

  const { active, error, activate, chainId, account, setError } =
    useWeb3React();

  const {
    isMetaMaskInstalled,
    isWeb3Available,
    startOnboarding,
    stopOnboarding,
  } = useMetaMaskOnboarding();

  // manage connecting state for injected connector
  const [connecting, setConnecting] = useState(false);
  useEffect(() => {
    if (active || error) {
      setConnecting(false);
      stopOnboarding();
    }
  }, [active, error, stopOnboarding]);

  const ENSName = useENSName(account);

  if (error) {
    return null;
  }

  if (!triedToEagerConnect) {
    return null;
  }

  if (typeof account !== 'string') {
    return (
      <div>
        {isWeb3Available ? (
          <Button
            className={cx(classes.button)}
            disabled={connecting}
            variant='light'
            rightIcon={
              isMetaMaskInstalled ? (
                <Unlink size={20} />
              ) : (
                <Download size={20} />
              )
            }
            radius='xl'
            size='md'
            styles={{
              root: { paddingRight: 14, height: 48 },
              rightIcon: { marginLeft: 22 },
            }}
            onClick={() => {
              setConnecting(true);
              activate(injected, undefined, true).catch((error) => {
                // ignore the error if it's a user rejected request
                if (error instanceof UserRejectedRequestError) {
                  setConnecting(false);
                } else {
                  setError(error);
                }
              });
            }}
          >
            {isMetaMaskInstalled ? 'Connect to MetaMask' : 'Connect to Wallet'}
          </Button>
        ) : (
          <Button onClick={startOnboarding}>Install Metamask</Button>
        )}
      </div>
    );
  }

  return (
    <div>
      <Button className={cx(classes.button)}
              disabled={connecting}
              variant='light'
              rightIcon={<Link size={20} />}
              radius='xl'
              size='md'
              styles={{
                root: { paddingRight: 14, height: 48 },
                rightIcon: { marginLeft: 22 },
              }}
      >
        {ENSName || `${shortenHex(account, 4)}`}
      </Button>
    </div>
  );
};


// {...{
//   href: formatEtherscanLink('Account', [chainId!, account]),
//     target: '_blank',
//     rel: 'noopener noreferrer',
// }}
