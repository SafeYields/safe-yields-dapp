import { createContext, ReactNode, useContext, useMemo, useState } from 'react';
import { DEFAULT_TOKENS, SAFE_TOKENS, TokenInfo } from 'utils/constants';

const TokenContext = createContext<{
  tokenList?: TokenInfo[];
  safeTokensList?: TokenInfo[];
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
  const chainId = Number(process.env.NEXT_PUBLIC_CHAIN_ID) || 42161;

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
    <TokenContext.Provider
      value={{
        tokenList: tokenList?.length ? tokenList : DEFAULT_TOKENS[chainId],
        safeTokensList: SAFE_TOKENS[chainId],
        importedTokens,
        addToken,
        removeToken,
      }}
    >
      {children}
    </TokenContext.Provider>
  );
};

export const useTokens = () => {
  const { tokenList, importedTokens } = useContext(TokenContext);
  const chainId = Number(process.env.NEXT_PUBLIC_CHAIN_ID) || 42161;

  return useMemo(
    () => [
      ...importedTokens
        .filter((item) => item.chainId === chainId)
        .map((item) => ({ ...item, isImport: true })),
      ...(tokenList || []),
    ],
    [tokenList, importedTokens, chainId],
  );
};

export const useSafeTokens = () => {
  const { safeTokensList } = useContext(TokenContext);
  const chainId = Number(process.env.NEXT_PUBLIC_CHAIN_ID) || 42161;
  return useMemo(() => safeTokensList || [], [chainId]);
};

export const useImportedTokens = () => {
  const { addToken, removeToken, importedTokens } = useContext(TokenContext);

  return {
    addToken,
    removeToken,
    importedTokens,
  };
};
