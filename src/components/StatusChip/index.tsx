import { Chip } from '@mui/material';
import React from 'react';

type Props = { status: string | boolean };

const StatusChip = ({ status }: Props) => {
  return (
    <Chip
      label={typeof status === 'boolean' ? (status ? 'ENABLED' : 'DISABLED') : status}
      size="small"
      color={
        status === 'COMPLETED' ||
        status === 'ACTIVE' ||
        status === 'ENABLED' ||
        status === 'PAID' ||
        (typeof status === 'boolean' && status)
          ? 'success'
          : status === 'PENDING'
          ? 'warning'
          : 'error'
      }
      sx={{ fontSize: '10px', fontWeight: 700 }}
    />
  );
};

export default StatusChip;
