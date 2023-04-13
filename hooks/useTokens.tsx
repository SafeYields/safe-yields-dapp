import { useWeb3React } from '@web3-react/core';
import { createContext, ReactNode, useContext, useState } from 'react';
import { DEFAULT_TOKENS, TokenInfo } from 'utils/constants';

const TokenContext = createContext<{
  tokenList?: TokenInfo[];
  importedTokens: TokenInfo[];
  addToken: (token: TokenInfo) => void;
  removeToken: (token: TokenInfo) => void;
}>({
  tokenList: [],
  importedTokens: [],
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  addToken: () => {},
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  removeToken: () => {},
});

export const TokenListProvider = ({
  tokenList,
  children,
}: {
  tokenList?: TokenInfo[];
  children: ReactNode;
}) => {
  const { chainId } = useWeb3React();

  const [importedTokens, setImportedTokens] = useState<TokenInfo[]>(() => {
    if (typeof window !== 'undefined') {
      try {
        const localStorageTokens = JSON.parse(localStorage.getItem('importedTokens') || '[]');

        return localStorageTokens;
      } catch (e) {
        return [];
      }
    }

    return [];
  });

  const addToken = (token: TokenInfo) => {
    const newTokens = [...importedTokens.filter((t) => t.address !== token.address), token];
    setImportedTokens(newTokens);
    if (typeof window !== 'undefined')
      localStorage.setItem('importedTokens', JSON.stringify(newTokens));
  };

  const removeToken = (token: TokenInfo) => {
    const newTokens = importedTokens.filter(
      (t) => t.address.toLowerCase() !== token.address.toLowerCase() && t.chainId === token.chainId,
    );

    setImportedTokens(newTokens);
    if (typeof window !== 'undefined')
      localStorage.setItem('importedTokens', JSON.stringify(newTokens));
  };

  return (
    chainId && (
      <TokenContext.Provider
        value={{
          tokenList: tokenList?.length ? tokenList : DEFAULT_TOKENS[chainId],
          importedTokens,
          addToken,
          removeToken,
        }}
      >
        {children}
      </TokenContext.Provider>
    )
  );
};

export const useTokens = () => {
  const { tokenList, importedTokens } = useContext(TokenContext);
  const { chainId } = useWeb3React();

  return [
    ...importedTokens
      .filter((item) => item.chainId === chainId)
      .map((item) => ({ ...item, isImport: true })),
    ...(tokenList || []),
  ];
};

export const useImportedTokens = () => {
  const { addToken, removeToken, importedTokens } = useContext(TokenContext);

  return {
    addToken,
    removeToken,
    importedTokens,
  };
};
