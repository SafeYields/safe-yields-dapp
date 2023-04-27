/* Autogenerated file. Do not edit manually. */

/* tslint:disable */

/* eslint-disable */
import type { PromiseOrValue } from "../../../common";
import type {
  Multicall2,
  Multicall2Interface,
} from "../../../contracts/Multicall2.sol/Multicall2";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";

const _abi = [
  {
    inputs: [
      {
        components: [
          {
            internalType: "address",
            name: "target",
            type: "address",
          },
          {
            internalType: "bytes",
            name: "callData",
            type: "bytes",
          },
        ],
        internalType: "struct Multicall2.Call[]",
        name: "calls",
        type: "tuple[]",
      },
    ],
    name: "aggregate",
    outputs: [
      {
        internalType: "uint256",
        name: "blockNumber",
        type: "uint256",
      },
      {
        internalType: "bytes[]",
        name: "returnData",
        type: "bytes[]",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        components: [
          {
            internalType: "address",
            name: "target",
            type: "address",
          },
          {
            internalType: "bytes",
            name: "callData",
            type: "bytes",
          },
        ],
        internalType: "struct Multicall2.Call[]",
        name: "calls",
        type: "tuple[]",
      },
    ],
    name: "blockAndAggregate",
    outputs: [
      {
        internalType: "uint256",
        name: "blockNumber",
        type: "uint256",
      },
      {
        internalType: "bytes32",
        name: "blockHash",
        type: "bytes32",
      },
      {
        components: [
          {
            internalType: "bool",
            name: "success",
            type: "bool",
          },
          {
            internalType: "bytes",
            name: "returnData",
            type: "bytes",
          },
        ],
        internalType: "struct Multicall2.Result[]",
        name: "returnData",
        type: "tuple[]",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "blockNumber",
        type: "uint256",
      },
    ],
    name: "getBlockHash",
    outputs: [
      {
        internalType: "bytes32",
        name: "blockHash",
        type: "bytes32",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getBlockNumber",
    outputs: [
      {
        internalType: "uint256",
        name: "blockNumber",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getCurrentBlockCoinbase",
    outputs: [
      {
        internalType: "address",
        name: "coinbase",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getCurrentBlockDifficulty",
    outputs: [
      {
        internalType: "uint256",
        name: "difficulty",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getCurrentBlockGasLimit",
    outputs: [
      {
        internalType: "uint256",
        name: "gaslimit",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getCurrentBlockTimestamp",
    outputs: [
      {
        internalType: "uint256",
        name: "timestamp",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "addr",
        type: "address",
      },
    ],
    name: "getEthBalance",
    outputs: [
      {
        internalType: "uint256",
        name: "balance",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getLastBlockHash",
    outputs: [
      {
        internalType: "bytes32",
        name: "blockHash",
        type: "bytes32",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bool",
        name: "requireSuccess",
        type: "bool",
      },
      {
        components: [
          {
            internalType: "address",
            name: "target",
            type: "address",
          },
          {
            internalType: "bytes",
            name: "callData",
            type: "bytes",
          },
        ],
        internalType: "struct Multicall2.Call[]",
        name: "calls",
        type: "tuple[]",
      },
    ],
    name: "tryAggregate",
    outputs: [
      {
        components: [
          {
            internalType: "bool",
            name: "success",
            type: "bool",
          },
          {
            internalType: "bytes",
            name: "returnData",
            type: "bytes",
          },
        ],
        internalType: "struct Multicall2.Result[]",
        name: "returnData",
        type: "tuple[]",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bool",
        name: "requireSuccess",
        type: "bool",
      },
      {
        components: [
          {
            internalType: "address",
            name: "target",
            type: "address",
          },
          {
            internalType: "bytes",
            name: "callData",
            type: "bytes",
          },
        ],
        internalType: "struct Multicall2.Call[]",
        name: "calls",
        type: "tuple[]",
      },
    ],
    name: "tryBlockAndAggregate",
    outputs: [
      {
        internalType: "uint256",
        name: "blockNumber",
        type: "uint256",
      },
      {
        internalType: "bytes32",
        name: "blockHash",
        type: "bytes32",
      },
      {
        components: [
          {
            internalType: "bool",
            name: "success",
            type: "bool",
          },
          {
            internalType: "bytes",
            name: "returnData",
            type: "bytes",
          },
        ],
        internalType: "struct Multicall2.Result[]",
        name: "returnData",
        type: "tuple[]",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
] as const;

const _bytecode =
  "0x608060405234801561001057600080fd5b506109c4806100206000396000f3fe608060405234801561001057600080fd5b50600436106100b45760003560e01c806372425d9d1161007157806372425d9d1461013a57806386d516e814610140578063a8b0574e14610146578063bce38bd714610154578063c3077fa914610174578063ee82ac5e1461018757600080fd5b80630f28c97d146100b9578063252dba42146100ce57806327e86d6e146100ef578063399542e9146100f757806342cbb15c146101195780634d2301cc1461011f575b600080fd5b425b6040519081526020015b60405180910390f35b6100e16100dc3660046106ea565b610199565b6040516100c5929190610777565b6100bb610321565b61010a6101053660046107e1565b610334565b6040516100c59392919061089e565b436100bb565b6100bb61012d3660046108c6565b6001600160a01b03163190565b446100bb565b456100bb565b6040514181526020016100c5565b6101676101623660046107e1565b61034c565b6040516100c591906108e8565b61010a6101823660046106ea565b610506565b6100bb6101953660046108fb565b4090565b8051439060609067ffffffffffffffff8111156101b8576101b8610523565b6040519080825280602002602001820160405280156101eb57816020015b60608152602001906001900390816101d65790505b50905060005b835181101561031b5760008085838151811061020f5761020f610914565b6020026020010151600001516001600160a01b031686848151811061023657610236610914565b60200260200101516020015160405161024f919061092a565b6000604051808303816000865af19150503d806000811461028c576040519150601f19603f3d011682016040523d82523d6000602084013e610291565b606091505b5091509150816102e85760405162461bcd60e51b815260206004820181905260248201527f4d756c746963616c6c206167677265676174653a2063616c6c206661696c656460448201526064015b60405180910390fd5b808484815181106102fb576102fb610914565b6020026020010181905250505080806103139061095c565b9150506101f1565b50915091565b600061032e600143610975565b40905090565b4380406060610343858561034c565b90509250925092565b6060815167ffffffffffffffff81111561036857610368610523565b6040519080825280602002602001820160405280156103ae57816020015b6040805180820190915260008152606060208201528152602001906001900390816103865790505b50905060005b82518110156104ff576000808483815181106103d2576103d2610914565b6020026020010151600001516001600160a01b03168584815181106103f9576103f9610914565b602002602001015160200151604051610412919061092a565b6000604051808303816000865af19150503d806000811461044f576040519150601f19603f3d011682016040523d82523d6000602084013e610454565b606091505b509150915085156104b657816104b65760405162461bcd60e51b815260206004820152602160248201527f4d756c746963616c6c32206167677265676174653a2063616c6c206661696c656044820152601960fa1b60648201526084016102df565b60405180604001604052808315158152602001828152508484815181106104df576104df610914565b6020026020010181905250505080806104f79061095c565b9150506103b4565b5092915050565b6000806060610516600185610334565b9196909550909350915050565b634e487b7160e01b600052604160045260246000fd5b6040805190810167ffffffffffffffff8111828210171561055c5761055c610523565b60405290565b604051601f8201601f1916810167ffffffffffffffff8111828210171561058b5761058b610523565b604052919050565b80356001600160a01b03811681146105aa57600080fd5b919050565b6000601f83818401126105c157600080fd5b8235602067ffffffffffffffff808311156105de576105de610523565b8260051b6105ed838201610562565b938452868101830193838101908986111561060757600080fd5b84890192505b858310156106dd578235848111156106255760008081fd5b89016040601f19828d03810182131561063e5760008081fd5b610646610539565b610651898501610593565b815282840135888111156106655760008081fd5b8085019450508d603f85011261067b5760008081fd5b888401358881111561068f5761068f610523565b61069e8a848e84011601610562565b92508083528e848287010111156106b55760008081fd5b808486018b85013760009083018a01528089019190915284525050918401919084019061060d565b9998505050505050505050565b6000602082840312156106fc57600080fd5b813567ffffffffffffffff81111561071357600080fd5b61071f848285016105af565b949350505050565b60005b8381101561074257818101518382015260200161072a565b50506000910152565b60008151808452610763816020860160208601610727565b601f01601f19169290920160200192915050565b600060408201848352602060408185015281855180845260608601915060608160051b870101935082870160005b828110156107d357605f198887030184526107c186835161074b565b955092840192908401906001016107a5565b509398975050505050505050565b600080604083850312156107f457600080fd5b8235801515811461080457600080fd5b9150602083013567ffffffffffffffff81111561082057600080fd5b61082c858286016105af565b9150509250929050565b6000815180845260208085019450848260051b860182860160005b858110156108915783830389528151805115158452850151604086850181905261087d8186018361074b565b9a87019a9450505090840190600101610851565b5090979650505050505050565b8381528260208201526060604082015260006108bd6060830184610836565b95945050505050565b6000602082840312156108d857600080fd5b6108e182610593565b9392505050565b6020815260006108e16020830184610836565b60006020828403121561090d57600080fd5b5035919050565b634e487b7160e01b600052603260045260246000fd5b6000825161093c818460208701610727565b9190910192915050565b634e487b7160e01b600052601160045260246000fd5b60006001820161096e5761096e610946565b5060010190565b8181038181111561098857610988610946565b9291505056fea26469706673582212208a175ea7a41a5361b4508aaa1c513339559edba6576a5a9af50fa54f0abde5df64736f6c63430008110033";

type Multicall2ConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: Multicall2ConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class Multicall2__factory extends ContractFactory {
  constructor(...args: Multicall2ConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override deploy(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<Multicall2> {
    return super.deploy(overrides || {}) as Promise<Multicall2>;
  }
  override getDeployTransaction(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(overrides || {});
  }
  override attach(address: string): Multicall2 {
    return super.attach(address) as Multicall2;
  }
  override connect(signer: Signer): Multicall2__factory {
    return super.connect(signer) as Multicall2__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): Multicall2Interface {
    return new utils.Interface(_abi) as Multicall2Interface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): Multicall2 {
    return new Contract(address, _abi, signerOrProvider) as Multicall2;
  }
}
