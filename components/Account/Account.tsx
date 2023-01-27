import { Button, createStyles } from '@mantine/core';
import useMetaMaskOnboarding from 'hooks/useMetaMaskOnboarding';
import { useEffect, useState } from 'react';
import { Download, Link, Unlink } from 'tabler-icons-react';
import { hooksMetamask, metaMask } from 'utils/connectors';
import { shortenHex } from 'utils/web3utils';

import { supportedChainId } from '../../config/chainConfig';


const { useChainId, useAccount, useIsActivating, useIsActive, useProvider, useENSName } = hooksMetamask;


const useStyles = createStyles<string>((theme, params, getRef) => {
  const icon: string = getRef('icon');

  return {
    button: {
      ...theme.fn.focusStyles(),
      width: '220px',
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

      '&:hover': {
        boxShadow: '0 5px 15px 0 rgba(229, 66, 10, 0.85)',
        backgroundPosition: '100% 0',
        mozTransition: 'all 0.4s ease-in-out',
        oTransition: 'all 0.4s ease-in-out',
        webkitTransition: 'all 0.4s ease-in-out',
        transition: 'all 0.4s ease-in-out',
      },
      '&:focus': {
        outline: 'none',
      },
    },

    buttonActive: {
      boxShadow: '0 5px 15px 0 rgba(229, 66, 10, 0.85)',
    },
  };
});

export const Account = () => {
  const { classes, cx } = useStyles();

  const chainId = useChainId();
  const account = useAccount();
  const isActivating = useIsActivating();

  const active = useIsActive();

  const provider = useProvider();
  const ENSNames = useENSName(provider);

  const [error, setError] = useState(undefined);


  const {
    isMetaMaskInstalled,
    startOnboarding,
    stopOnboarding,
  } = useMetaMaskOnboarding();

  const [web3Available, setweb3Available] = useState(false);
  useEffect(() => setweb3Available(typeof window !== 'undefined' && !!window?.ethereum), []);

  // manage connecting state for injected connector
  const [connecting, setConnecting] = useState(false);
  useEffect(() => {
    if (active || error) {
      setConnecting(false);
      stopOnboarding();
    }
  }, [active, error, stopOnboarding]);

  const ENSName = useENSName();

  if (typeof account !== 'string' || (chainId && chainId !== supportedChainId)) {
    return (
      <div>
        {web3Available ? (
          <Button
            className={cx(classes.button)}
            loading={connecting}
            loaderProps={{ color: 'yellow', size: 'sm', variant: 'dots' }}
            variant='light'
            leftIcon={
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
              leftIcon: { marginLeft: 0 },
            }}
            onClick={() => {
              setConnecting(true);
              metaMask.activate(supportedChainId)
                .then(() => {
                  setConnecting(false);
                  setError(undefined);
                })
                .catch((error) => {
                  // ignore the error if it's a user rejected request
                  if (error instanceof Error) {
                    setConnecting(false);
                  } else {
                    setError(error);
                  }
                });
            }}
          >
            {(typeof account !== 'string') && !(chainId && chainId !== supportedChainId) && (isMetaMaskInstalled ? 'Connect to MetaMask' : 'Connect to Wallet')}
            {chainId && chainId !== supportedChainId && 'Wrong Network'}
          </Button>
        ) : (
          <Button className={cx(classes.button)} radius='xl'
                  size='md'
                  leftIcon={
                    <Download size={20} />
                  }
                  styles={{
                    root: { paddingRight: 14, height: 48 },
                    leftIcon: { marginLeft: 0 },
                  }} onClick={startOnboarding}>Install Metamask</Button>
        )}
      </div>
    );
  }

  return (
    <div>
      <Button className={cx(classes.button, classes.buttonActive)}
              variant='light'
              leftIcon={<Link size={20} />}
              radius='xl'
              size='md'
              styles={{
                root: { paddingRight: 14, height: 48 },
                leftIcon: { marginLeft: 0 },
              }}
      >
        {ENSName || `${shortenHex(account, 7)}`}
      </Button>
    </div>
  );
};
