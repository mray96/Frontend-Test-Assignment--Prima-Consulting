export const statusConfig = {
  pending: {
    label: 'Pending',
    tone: 'warning',
  },
  in_transit: {
    label: 'On Delivery',
    tone: 'info',
  },
  out_for_delivery: {
    label: 'On Delivery',
    tone: 'info',
  },
  delivered: {
    label: 'Delivered',
    tone: 'success',
  },
  completed: {
    label: 'Completed',
    tone: 'success',
  },
  delayed: {
    label: 'Delayed',
    tone: 'danger',
  },
  cancelled: {
    label: 'Cancelled',
    tone: 'neutral',
  },
  customs_hold: {
    label: 'Customs Hold',
    tone: 'warning',
  },
  returned: {
    label: 'Returned',
    tone: 'neutral',
  },
};

export function getStatusConfig(status) {
  return statusConfig[status] || {
    label: titleize(status),
    tone: 'neutral',
  };
}

export function titleize(value = '') {
  return value
    .replace(/_/g, ' ')
    .replace(/\b\w/g, (letter) => letter.toUpperCase());
}
