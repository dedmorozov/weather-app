export const formatTemp = (value?: number | null): string => {
  if (value === undefined || value === null || Number.isNaN(value)) {
    return '—';
  }

  return `${Math.round(value)}°C`;
};
