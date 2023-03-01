import { AddressZero, MaxUint256 } from '@ethersproject/constants';
import { createStyles, Grid, Group, Image, Modal, Text, useMantineTheme } from '@mantine/core';
import { useAtom } from 'jotai/index';
import { FC, useState } from 'react';

import { executeContractHandler } from '../../handlers/executeContractHandler';
import useFetchFromApi from '../../hooks/useFetchFromApi';
import useNFTContract from '../../hooks/useNFTContract';
import useSafeNFTBalance from '../../hooks/useSafeNFTBalance';
import useSafeNFTOwnership from '../../hooks/useSafeNFTOnwership';
import useUsdcAllowance from '../../hooks/useUsdcAllowance';
import useUsdcBalance from '../../hooks/useUsdcBalance';
import useUsdcContract from '../../hooks/useUsdcContract';
import { transactionInProgressAtom } from '../Account/Account';
import { FancyButton } from '../FancyButton';

const useStyles = createStyles<string>((theme, params, getRef) => {
  return {
    modalTable: {
      color: theme.colors.veryDarkGreen[0],
      textAlign: 'center',
    },
    // nftIconContainer: {
    //   width: '94.03px',
    //   height: '113.62px',
    //   // background: 'linear-gradient(180deg, #D9D9D9 9.78%, rgba(217, 217, 217, 0) 89.67%)',
    //   borderRadius: '10px',
    //   justifyContent: 'center',
    //   textAlign: 'center',
    //   align: 'center'
    // },
  };
});

export const BuyNFTModal: FC<{ opened: boolean, handleModalClose: () => boolean, tier: number, referralAddress?: string }> =
  ({
     opened,
     handleModalClose,
     tier,
     referralAddress,
   }) => {
    const { classes, cx } = useStyles();
    const theme = useMantineTheme();
    const nftRegularPostPresalePrice = useFetchFromApi('nft/price')?.data;
    const nftDiscountedPrice = useFetchFromApi('nft/presale-price')?.data;
    const safeNFTBalance = useSafeNFTBalance()?.data;
    const nftContract = useNFTContract();
    const usdAllowance = useUsdcAllowance(nftContract?.address)?.data;
    const usdcBalance = useUsdcBalance()?.data;
    const usdcContract = useUsdcContract();
    const safeNFTOwnership = useSafeNFTOwnership();
    const [executionInProgress, setExecutionInProgress] = useAtom(transactionInProgressAtom);
    const [quantity, setQuantity] = useState(1);
    const presaleNFTAvailable = useFetchFromApi('nft/available')?.data;
    const maxQuantity = presaleNFTAvailable && !isNaN(presaleNFTAvailable) ? Math.min(10, parseInt(presaleNFTAvailable[tier])) : 10;
    const handleIncrease = () => setQuantity(quantity < maxQuantity ? quantity + 1 : maxQuantity);
    const handleDecrease = () => setQuantity(quantity > 1 ? quantity - 1 : 1);

    const presaleNFTAvailableForTier = (tier: number) => contractsLoaded && presaleNFTAvailable && parseInt(presaleNFTAvailable[tier]) > 0;


    const totalPrice = (parseFloat(nftDiscountedPrice[tier]) * quantity).toFixed(2);
    // const balanceIfPurchased = safeNFTBalance ? (parseInt(safeNFTBalance[tier]) + quantity) : 0;
    // const totalSupplyOfTierIfPurchased = safeNFTTotalSupply ? parseInt(safeNFTTotalSupply[tier]) + quantity : 0;
    // const ownershipIfPurchased = (balanceIfPurchased / totalSupplyOfTierIfPurchased * 100).toFixed(5);
    const ownershipIfPurchased = (safeNFTOwnership[tier] * quantity).toFixed(5);

    const contractsLoaded = !!nftRegularPostPresalePrice && !!usdcBalance && !!usdAllowance;
    const enoughBalanceForTier = (tier: number) => contractsLoaded && Number(nftDiscountedPrice[tier]) * quantity <= Number(usdcBalance);
    const enoughAllowanceForTier = (tier: number) => contractsLoaded && (Number(usdAllowance) >= Number(nftDiscountedPrice[tier]) * quantity);

    const buyNFTHandler = (tier: number) => usdAllowance && nftRegularPostPresalePrice && nftContract && usdcContract && (Number(usdAllowance) >= Number(nftRegularPostPresalePrice[tier])) &&
      executeContractHandler(setExecutionInProgress, () => nftContract.buy(tier, quantity, referralAddress || AddressZero));

    const approveSpendUsdcForNFTHandler = (tier: number) => usdAllowance && nftRegularPostPresalePrice && nftContract && usdcContract && Number(usdAllowance) < Number(nftRegularPostPresalePrice[tier]) &&
      executeContractHandler(setExecutionInProgress, () => usdcContract.approve(nftContract.address, MaxUint256));

    return (
      <Modal opened={opened}
             onClose={() => handleModalClose()}
             closeOnClickOutside={true}
             centered={true}
             overlayColor={theme.colors.dark[9]}
             overlayOpacity={0.55}
             overlayBlur={3}
      >
        <Grid mt='130px' align='center' justify='center' gutter='xs'>
          <Grid.Col span={2} style={{ textAlign: 'center' }}>
            <Image src={`/assets/nft-icon-${tier + 1}.png`} alt='NFT icon' fit='contain' radius={10} mt='xs' />
            <Text size='sm' mt='2px' color='white'
                  style={{ fontWeight: 700 }}>Tier{` ${tier + 1}`}</Text>
          </Grid.Col>
          <Grid.Col span={10}>
            <Grid align='center' justify='center' gutter='xs' className={cx(classes.modalTable)}>
              <Grid.Col span={3}>
                <Text size='xs'>Price</Text>
              </Grid.Col>
              <Grid.Col span={3}>
                <Text size='xs'>Quantity</Text>
              </Grid.Col>
              <Grid.Col span={3}>
                <Text size='xs'>Total</Text>
              </Grid.Col>
              <Grid.Col span={3}>
                <Text size='xs'>Ownership</Text>
              </Grid.Col>
              <Grid.Col span={3}>
                {nftDiscountedPrice &&
                  <>
                    <Text size='sm' color={theme.colors.veryDarkGreen[0]} style={{ fontWeight: 700 }}>
                      {(parseFloat(nftDiscountedPrice[tier])).toFixed(2)}
                    </Text>
                    <Text>USDC</Text>
                  </>
                }
              </Grid.Col>
              <Grid.Col span={3}>
                <Group spacing='xs' position='center'>
                  <Text size='md' style={{ cursor: 'pointer', userSelect: 'none' }} onClick={handleDecrease}>∨</Text>
                  <Text size='sm' style={{ minWidth: '15px', textAlign: 'center' }}>{quantity}</Text>
                  <Text size='md' style={{ cursor: 'pointer', userSelect: 'none' }} onClick={handleIncrease}>∧</Text>
                </Group>
              </Grid.Col>
              <Grid.Col span={3}>
                <Text size='sm'>{totalPrice}</Text>
              </Grid.Col>
              <Grid.Col span={3}>
                <Text
                  size='xs'>{ownershipIfPurchased}%</Text>
              </Grid.Col>
            </Grid>
          </Grid.Col>
        </Grid>
        <FancyButton style={{ height: '24px', position: 'fixed', bottom: '15px', right: '30px' }}
                     loading={executionInProgress}
                     disabled={executionInProgress || !enoughBalanceForTier(tier) || !presaleNFTAvailableForTier(tier)}
                     onClick={() => !enoughAllowanceForTier(tier) ? approveSpendUsdcForNFTHandler(tier) : handleModalClose() && buyNFTHandler(tier)}>
          {!contractsLoaded ? 'Buy' :
            !enoughBalanceForTier(tier) ? 'No balance' : !enoughAllowanceForTier(tier) ? 'Approve' : 'Buy'
          }</FancyButton>
      </Modal>
    );
  };
