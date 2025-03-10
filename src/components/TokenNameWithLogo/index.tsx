import React from 'react';
import { tokenImages } from '../../pages/Tokens/TokenTransactionSettings/TokenTransactionSettingDetails';

type Props = { tokenName: string; showColorizedText?: boolean; showText?: boolean; tokenImageClassName?: string };

const TokenNameWithLogo = ({
  tokenName,
  showColorizedText = false,
  showText = true,
  tokenImageClassName = '',
}: Props) => {
  return (
    <span
      className={`${
        showColorizedText &&
        (tokenName === 'XPL'
          ? 'text-XPLColor'
          : tokenName === 'PUSD'
          ? 'text-PUSDColor'
          : tokenName === 'AUSD'
          ? 'text-AUSDColor'
          : 'text-USDTColor')
      }
              flex gap-1 items-center
              `}
    >
      <img src={tokenImages[tokenName ?? 'USDT']} alt="" className={`w-5 h-5 object-contain ${tokenImageClassName}`} />
      {showText && tokenName}
    </span>
  );
};

export default TokenNameWithLogo;
