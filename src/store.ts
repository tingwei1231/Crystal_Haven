import crystalData from './data/crystals.json';
import serviceData from './data/engraving-services.json';
import type { Crystal, Service } from './types';
import { activeServices } from './lib/catalog';
export const crystals = crystalData as Crystal[];
export const services = activeServices(serviceData as Service[]);
