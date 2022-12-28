import {
  Connection,
  CONNECTIONS, connectors,
  getConnectionName,
} from '@utils/connectors';
import { getName } from '@utils/getName';
import { useWeb3React, Web3ReactProvider } from '@web3-react/core';
import useEagerlyConnect from 'hooks/useEagerlyConnect';
import { ReactNode, useEffect, useMemo } from 'react';



export default function Web3Provider({ children }: { children: ReactNode }) {
  useEagerlyConnect();

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
  const context = useWeb3React();
  console.debug(`Priority Connector is: ${getName(context.connector)}, chainId is ${context.chainId}`);
  console.debug(`${context.account ? 'Account given' : 'no account'}`);
  console.debug(`${context.isActive ? 'Active' : 'Not active'}`);
  console.debug(`${context.isActivating ? 'Activating' : 'Not activating'}`);
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
