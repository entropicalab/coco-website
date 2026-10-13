import type { ImageMetadata } from 'astro';
import site from '../data/site.json';

const usd = (n: number) => `$${Math.round(n).toLocaleString('en-US')}`;

export const formatPrice = (n: number | null) => (n == null ? 'Pricing on request' : `From ${usd(n)}`);

/** Residential price per m² from site.json → pricing.residentialPerM2 */
export const ratePerM2 = site.pricing.residentialPerM2;
export const formatRate = (rate: number | null = ratePerM2) => (rate ? `${usd(rate)} per m²` : '');

/**
 * A residence's price: its own priceFrom if set in residences.yaml,
 * otherwise size × the site-wide rate per m². null = "Pricing on request".
 */
export const residencePrice = (r: { size: number; priceFrom: number | null }) =>
  r.priceFrom ?? (ratePerM2 ? r.size * ratePerM2 : null);

export const formatArea = (m2: number) =>
  `${m2} m² · ${Math.round(m2 * 10.7639).toLocaleString('en-US')} sq ft`;

export const bedroomLabel = (n: number) => `${n} bedroom${n === 1 ? '' : 's'}`;

export const statusLabel = { available: 'Available', reserved: 'Reserved', sold: 'Sold' } as const;

// Images are matched to residences by id (src/assets/plans/type-a.jpg, src/assets/interiors/type-a.jpg).
const plans = import.meta.glob<{ default: ImageMetadata }>('../assets/plans/*.jpg', { eager: true });
const interiors = import.meta.glob<{ default: ImageMetadata }>('../assets/interiors/*.jpg', { eager: true });

export const planFor = (id: string) => plans[`../assets/plans/${id}.jpg`]?.default;
export const interiorFor = (id: string) => interiors[`../assets/interiors/${id}.jpg`]?.default;
