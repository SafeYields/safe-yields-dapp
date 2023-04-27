/* Autogenerated file. Do not edit manually. */

/* tslint:disable */

/* eslint-disable */
import type {
  TypedEventFilter,
  TypedEvent,
  TypedListener,
  OnEvent,
  PromiseOrValue,
} from "../common";
import type { FunctionFragment, Result } from "@ethersproject/abi";
import type { Listener, Provider } from "@ethersproject/providers";
import type {
  BaseContract,
  BigNumber,
  BigNumberish,
  BytesLike,
  CallOverrides,
  PopulatedTransaction,
  Signer,
  utils,
} from "ethers";

export interface WalletsInterface extends utils.Interface {
  functions: {
    "HUNDRED_PERCENT()": FunctionFragment;
    "WALLETS()": FunctionFragment;
    "wallets(uint256)": FunctionFragment;
  };

  getFunction(
    nameOrSignatureOrTopic: "HUNDRED_PERCENT" | "WALLETS" | "wallets"
  ): FunctionFragment;

  encodeFunctionData(
    functionFragment: "HUNDRED_PERCENT",
    values?: undefined
  ): string;
  encodeFunctionData(functionFragment: "WALLETS", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "wallets",
    values: [PromiseOrValue<BigNumberish>]
  ): string;

  decodeFunctionResult(
    functionFragment: "HUNDRED_PERCENT",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "WALLETS", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "wallets", data: BytesLike): Result;

  events: {};
}

export interface Wallets extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  interface: WalletsInterface;

  queryFilter<TEvent extends TypedEvent>(
    event: TypedEventFilter<TEvent>,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TEvent>>;

  listeners<TEvent extends TypedEvent>(
    eventFilter?: TypedEventFilter<TEvent>
  ): Array<TypedListener<TEvent>>;
  listeners(eventName?: string): Array<Listener>;
  removeAllListeners<TEvent extends TypedEvent>(
    eventFilter: TypedEventFilter<TEvent>
  ): this;
  removeAllListeners(eventName?: string): this;
  off: OnEvent<this>;
  on: OnEvent<this>;
  once: OnEvent<this>;
  removeListener: OnEvent<this>;

  functions: {
    HUNDRED_PERCENT(overrides?: CallOverrides): Promise<[BigNumber]>;

    WALLETS(overrides?: CallOverrides): Promise<[BigNumber]>;

    wallets(
      arg0: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<[string]>;
  };

  HUNDRED_PERCENT(overrides?: CallOverrides): Promise<BigNumber>;

  WALLETS(overrides?: CallOverrides): Promise<BigNumber>;

  wallets(
    arg0: PromiseOrValue<BigNumberish>,
    overrides?: CallOverrides
  ): Promise<string>;

  callStatic: {
    HUNDRED_PERCENT(overrides?: CallOverrides): Promise<BigNumber>;

    WALLETS(overrides?: CallOverrides): Promise<BigNumber>;

    wallets(
      arg0: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<string>;
  };

  filters: {};

  estimateGas: {
    HUNDRED_PERCENT(overrides?: CallOverrides): Promise<BigNumber>;

    WALLETS(overrides?: CallOverrides): Promise<BigNumber>;

    wallets(
      arg0: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;
  };

  populateTransaction: {
    HUNDRED_PERCENT(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    WALLETS(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    wallets(
      arg0: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;
  };
}
