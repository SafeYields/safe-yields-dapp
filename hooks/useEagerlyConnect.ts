import { Connector } from '@web3-react/types';
import { useEffect } from 'react';
import { ConnectionType, getConnection } from 'utils/connectors';

import { supportedChainId } from '../config/chainConfig';

async function connect(connector: Connector) {
  try {
    if (connector.connectEagerly) {
      await connector.connectEagerly(supportedChainId);
    } else {
      await connector.activate(supportedChainId);
    }
  } catch (error) {
    console.debug(`web3-react eager connection error: ${error}`);
  }
}

export default function useEagerlyConnect() {
  const selectedConnection = getConnection(ConnectionType.INJECTED);
  useEffect(() => {
    if (selectedConnection) {
      connect(selectedConnection.connector);
    } // The dependency list is empty so this is only run once on mount
  }, []); // eslint-disable-line react-hooks/exhaustive-deps
}
