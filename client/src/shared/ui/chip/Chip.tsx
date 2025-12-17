import type { FC } from 'react';

import './chip.scss';

type ChipProps = {
  label: string;
  value: string;
};

export const Chip: FC<ChipProps> = ({ label, value }) => (
  <div className="chip">
    <span className="chip__label">{label}</span>
    <span className="chip__value">{value}</span>
  </div>
);
