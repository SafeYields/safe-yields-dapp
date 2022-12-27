import { initializeConnector, Web3ReactHooks } from '@web3-react/core';
import { MetaMask } from '@web3-react/metamask';
import { Network } from '@web3-react/network';
import { Connector } from '@web3-react/types';

import { urlMap } from '../config/chainConfig';

export enum ConnectionType {
  INJECTED = 'INJECTED',
  NETWORK = 'NETWORK',
}

export interface Connection {
  connector: Connector;
  hooks: Web3ReactHooks;
  type: ConnectionType;
}

let metaMaskErrorHandler: (error: Error) => void | undefined;

export function setMetMaskErrorHandler(errorHandler: (error: Error) => void) {
  metaMaskErrorHandler = errorHandler;
}

function onError(error: Error) {
  console.debug(`web3-react error: ${error}`);
}

function onMetamaskError(error: Error) {
  onError(error);
  metaMaskErrorHandler?.(error);
}

export const [metaMask, hooksMetamask] = initializeConnector<MetaMask>((actions) => new MetaMask({
  actions,
  onError: onMetamaskError,
}));

export const [network, hooksNetwork] = initializeConnector<Network>((actions) => new Network({
  actions,
  urlMap,
  // urlMap: { 1337: ['http://localhost:8545'] },
  defaultChainId: 1337,
}));

export const injectedConnection: Connection = {
  connector: metaMask,
  hooks: hooksMetamask,
  type: ConnectionType.INJECTED,
};

export const networkConnection: Connection = {
  connector: network,
  hooks: hooksNetwork,
  type: ConnectionType.NETWORK,
};


export function getIsInjected(): boolean {
  return Boolean(window.ethereum);
}

export function getIsMetaMask(): boolean {
  return window.ethereum?.isMetaMask ?? false;
}

export const CONNECTIONS = [
  injectedConnection,
  networkConnection,
];

export function getConnection(c: Connector | ConnectionType) {
  if (c instanceof Connector) {
    const connection = CONNECTIONS.find((connection) => connection.connector === c);
    if (!connection) {
      throw Error('unsupported connector');
    }
    return connection;
  } else {
    switch (c) {
      case ConnectionType.INJECTED:
        return injectedConnection;
      case ConnectionType.NETWORK:
        return networkConnection;
    }
  }
}

export function getConnectionName(connectionType: ConnectionType, isMetaMask?: boolean) {
  switch (connectionType) {
    case ConnectionType.INJECTED:
      return isMetaMask ? 'MetaMask' : 'Browser Wallet';
    case ConnectionType.NETWORK:
      return 'Network';
  }
}
