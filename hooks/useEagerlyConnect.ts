import { Connector } from '@web3-react/types';
import { useEffect } from 'react';
import { ConnectionType, getConnection, networkConnection } from 'utils/connectors';

async function connect(connector: Connector) {
  try {
    if (connector.connectEagerly) {
      await connector.connectEagerly();
    } else {
      await connector.activate();
    }
  } catch (error) {
    console.debug(`web3-react eager connection error: ${error}`);
  }
}

export default function useEagerlyConnect() {
  const selectedConnection = getConnection(ConnectionType.INJECTED);
  useEffect(() => {
    connect(networkConnection.connector);
    if (selectedConnection) {
      connect(selectedConnection.connector);
    } // The dependency list is empty so this is only run once on mount
  }, []); // eslint-disable-line react-hooks/exhaustive-deps
}
