export type Status = 'available' | 'reserved' | 'sold' | 'hidden';
export interface Crystal {
  id: string; slug: string; name: string; category: string; description: string; priceTwd: number | null;
  status: Status; featured: boolean; isSample: boolean; images: string[]; sizeText: string | null; weightGrams: number | null; updatedAt: string;
}
export interface Service {
  id: string; name: string; description: string; availableMaterials: string[]; availableSizes: string[];
  availableFonts: string[]; startingPriceTwd: number | null; turnaroundNote: string; images: string[]; enabled: boolean; isSample: boolean;
}
export interface Inquiry {
  service: string; material: string; size: string; font: string; text: string; quantity: string; delivery: string; date: string; notes: string;
}
