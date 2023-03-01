import { ContractTransaction } from '@ethersproject/contracts';
import { showNotification } from '@mantine/notifications';
import { Check, X } from 'tabler-icons-react';


function isWithReasonType(obj: any): obj is { reason: string } {
  return 'reason' in obj;
}

export const executeContractHandler = async (setExecutionInProgress: (progress: boolean) => void, smartContractCallback: () => Promise<ContractTransaction>) => {
  setExecutionInProgress(true);
  showNotification({
    message: 'Follow the Wallet.',
  });
  try {
    const tx = await smartContractCallback();
    showNotification({
      message: 'Smart contract transaction sent. Please wait for the confirmation.',
    });
    await tx.wait();
    showNotification({
      title: 'Success',
      color: 'lime',
      icon: <Check size={18} />,
      message: 'Smart contract transaction confirmed.',
    });
    setExecutionInProgress(false);
  } catch (err) {
    console.error('err', err);
    showNotification({
      title: 'Error',
      color: 'yellow',
      icon: <X size={18} />,
      message: err && isWithReasonType(err) ? err.reason : 'Smart Contract Execution Error.',
      radius: 'lg',
    });
    setExecutionInProgress(false);
  }
};
