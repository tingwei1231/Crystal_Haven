import type { Crystal, Service, Status } from '../types.ts';
export const statusLabels: Record<Status, string> = { available: '可詢問', reserved: '洽談或保留中', sold: '已售出', hidden: '不公開' };
export function filterCrystals(items: Crystal[], category = 'all', status = 'all') {
  return items.filter(item => item.status !== 'hidden' && (category === 'all' || item.category === category) && (status === 'all' || item.status === status));
}
export const activeServices = (items: Service[]) => items.filter(item => item.enabled);
