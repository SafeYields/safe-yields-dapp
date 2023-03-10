/* Autogenerated file. Do not edit manually. */

/* tslint:disable */

/* eslint-disable */
import type { PromiseOrValue } from "../../common";
import type { Wallets, WalletsInterface } from "../../contracts/Wallets";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";

const _abi = [
  {
    inputs: [],
    name: "WALLETS",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "wallets",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
];

const _bytecode =
  "0x608060405234801561001057600080fd5b5060e48061001f6000396000f3fe6080604052348015600f57600080fd5b506004361060325760003560e01c80637ad71f721460375780638d3bd55b146063575b600080fd5b604660423660046096565b6077565b6040516001600160a01b0390911681526020015b60405180910390f35b606a600281565b604051908152602001605a565b60008160028110608657600080fd5b01546001600160a01b0316905081565b60006020828403121560a757600080fd5b503591905056fea2646970667358221220abf33b68f413a83531421e4ba6b141defe1e7ca83ab0218009f832b77f24f52164736f6c63430008110033";

type WalletsConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: WalletsConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class Wallets__factory extends ContractFactory {
  constructor(...args: WalletsConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override deploy(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<Wallets> {
    return super.deploy(overrides || {}) as Promise<Wallets>;
  }
  override getDeployTransaction(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(overrides || {});
  }
  override attach(address: string): Wallets {
    return super.attach(address) as Wallets;
  }
  override connect(signer: Signer): Wallets__factory {
    return super.connect(signer) as Wallets__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): WalletsInterface {
    return new utils.Interface(_abi) as WalletsInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): Wallets {
    return new Contract(address, _abi, signerOrProvider) as Wallets;
  }
}
