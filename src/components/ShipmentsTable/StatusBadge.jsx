import React from 'react';
import { getStatusConfig } from '../../constants/statusConfig';

export default function StatusBadge({ status }) {
  const config = getStatusConfig(status);

  return <span className={`status-badge ${config.tone}`}>{config.label}</span>;
}
