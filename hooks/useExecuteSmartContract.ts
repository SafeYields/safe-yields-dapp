import { ContractTransaction } from 'ethers';
import { useSetAtom } from 'jotai';

import { transactionInProgressAtom } from '../components/Account/Account';
import { executeContractHandler } from '../handlers/executeContractHandler';

export default function useExecuteSmartContract(smartContractCallback: () => Promise<ContractTransaction>) {
  const setExecutionInProgress = useSetAtom(transactionInProgressAtom);
  return executeContractHandler(setExecutionInProgress, smartContractCallback);
}
