import { initializeConnector, Web3ReactHooks } from '@web3-react/core';
import { MetaMask } from '@web3-react/metamask';
import { Connector } from '@web3-react/types';

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

export const injectedConnection: Connection = {
  connector: metaMask,
  hooks: hooksMetamask,
  type: ConnectionType.INJECTED,
};
export function getIsInjected(): boolean {
  return Boolean(window.ethereum);
}

export function getIsMetaMask(): boolean {
  return window.ethereum?.isMetaMask ?? false;
}

export const CONNECTIONS = [
  injectedConnection,
];

export const connectors: [Connector, Web3ReactHooks][] = CONNECTIONS.map(({ hooks, connector }) => [connector, hooks]);


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
