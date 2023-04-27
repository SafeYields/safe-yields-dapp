import { SafeRouter } from '@contractTypes/contracts/SafeRouter';
import SafeRouterABI from 'artifacts/contracts/SafeRouter.sol/SafeRouter.json';

import useContract from './useContract';

const useRouterContract = () =>
  useContract<SafeRouter>(
    process.env.NEXT_PUBLIC_SAFE_ROUTER_ADDRESS || '',
    SafeRouterABI.abi,
    true,
  );
export default useRouterContract;
