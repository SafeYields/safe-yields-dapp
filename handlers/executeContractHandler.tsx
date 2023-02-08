import { showNotification } from '@mantine/notifications';
import { ContractTransaction } from 'ethers';
import { Check, X } from 'tabler-icons-react';

export const executeContractHandler = async (setExecutionInProgress: (progress: boolean) => void, smartContractCallback: () => Promise<ContractTransaction>) => {

  setExecutionInProgress(true);
  showNotification({
    message: 'Executing transaction...',
  });
  try {
    const tx = await smartContractCallback();
    showNotification({
      title: 'Success',
      color: 'lime',
      icon: <Check size={18} />,
      message: 'Smart contract transaction sent. Please wait for confirmation.',
    });
    await tx.wait();
    showNotification({
      title: 'Success',
      message: 'Smart contract transaction confirmed.',
    });
    setExecutionInProgress(false);
  } catch (err) {
    console.error('err', err);
    showNotification({
      title: 'Error',
      color: 'yellow',
      icon: <X size={18} />,
      message: err ? err.reason : 'Smart Contract Execution Error.',
      radius: 'lg',
    });
    setExecutionInProgress(false);
  }
};
