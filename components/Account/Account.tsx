import { Button } from '@mantine/core';
import useMetaMaskOnboarding from 'hooks/useMetaMaskOnboarding';
import { atom, useAtomValue } from 'jotai';
import { useEffect, useState } from 'react';
import { Download, Link, Unlink } from 'tabler-icons-react';
import { hooksMetamask, metaMask } from 'utils/connectors';
import { shortenHex } from 'utils/web3utils';

import { chainConfig, supportedChainId } from '../../config/chainConfig';
import useStyles from './Account.styles';


const { useChainId, useAccount, useIsActivating, useIsActive, useProvider, useENSName } = hooksMetamask;
export const transactionInProgressAtom = atom(false);

export const Account = () => {
  const { classes, cx } = useStyles();

  const inProgress = useAtomValue(transactionInProgressAtom);
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

  const testnetNotification = () => {
    switch (chainId) {
      case 42161:
        return '';
      case 1337:
        return '(Localhost)';
      case 421613:
        return '(Testnet)';
      default:
        return '(Unsupported network)';
    }
  };


  if (typeof account !== 'string' || (chainId && chainId !== supportedChainId)) {
    return (
      <div>
        {web3Available ? (
          <Button
            className={cx(classes.button)}
            loading={connecting || inProgress}
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
              if (!connecting) {
                setConnecting(true);
                metaMask.activate(chainConfig)
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
              }
            }}
          >
            {(typeof account !== 'string') && !(chainId && chainId !== supportedChainId) && (isMetaMaskInstalled ? `Connect to MetaMask ${testnetNotification()}` : `Connect to Wallet ${testnetNotification()}`)}
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
              loading={isActivating || inProgress}
              styles={{
                root: { paddingRight: 14, height: 48 },
                leftIcon: { marginLeft: 0 },
              }}
      >
        {ENSName || `${shortenHex(account, 7)} ${testnetNotification()}`}
      </Button>
    </div>
  );
};
