import {
  Connection,
  CONNECTIONS,
  getConnectionName,
  hooksMetamask,
  hooksNetwork,
  metaMask,
  network,
} from '@utils/connectors';
import { getName } from '@utils/getName';
import { useWeb3React, Web3ReactHooks, Web3ReactProvider } from '@web3-react/core';
import { MetaMask } from '@web3-react/metamask';
import { Network } from '@web3-react/network';
import { Connector } from '@web3-react/types';
import useEagerlyConnect from 'hooks/useEagerlyConnect';
import { ReactNode, useEffect, useMemo } from 'react';


const connectors: [MetaMask | Network, Web3ReactHooks][] = [
  [metaMask, hooksMetamask],
  [network, hooksNetwork],
];


export default function Web3Provider({ children }: { children: ReactNode }) {
  useEagerlyConnect();
  const connectors: [Connector, Web3ReactHooks][] = CONNECTIONS.map(({ hooks, connector }) => [connector, hooks]);

  const key = useMemo(() => CONNECTIONS.map(({ type }: Connection) => getConnectionName(type)).join('-'), [CONNECTIONS]);

  return (
    <Web3ReactProvider connectors={connectors} key={key}>
      <Web3Status />
      <Tracer />
      {children}
    </Web3ReactProvider>
  );
}

function Web3Status() {
  const { connector } = useWeb3React();
  console.log(`Priority Connector is: ${getName(connector)}`);
  return null;
}


function Tracer() {
  const { chainId, provider } = useWeb3React();
  const shouldTrace = true;

  useEffect(() => {
    if (shouldTrace) {
      provider?.on('debug', trace);
    }
    return () => {
      provider?.off('debug', trace);
    };
  }, [provider, shouldTrace]);

  return null;
}

function trace(event: any) {
  if (event.action !== 'request') return;
  const { method, id, params } = event.request;
  console.groupCollapsed(method, id);
  console.debug(params);
  console.groupEnd();
}
