import { formatDate, formatFollowUpDate } from './formatDate';
import { getStatusConfig, titleize } from '../constants/statusConfig';

function escapeCell(value) {
  const stringValue = String(value ?? '');
  if (/[",\n]/.test(stringValue)) {
    return `"${stringValue.replace(/"/g, '""')}"`;
  }

  return stringValue;
}

export function exportShipmentsCsv(rows) {
  const headers = [
    'Shipping ID',
    'Company',
    'Product Category',
    'Weight',
    'Route',
    'Created Date',
    'Follow-up Date',
    'Status',
  ];

  const body = rows.map((row) => [
    row.shipping_id,
    row.company_name,
    titleize(row.product_category),
    `${row.weight} kg`,
    row.route,
    formatDate(row.date),
    formatFollowUpDate(row.date),
    getStatusConfig(row.status).label,
  ]);

  const csv = [headers, ...body]
    .map((line) => line.map(escapeCell).join(','))
    .join('\n');

  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = 'shipments.csv';
  link.click();
  URL.revokeObjectURL(url);
}
