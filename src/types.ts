export interface Municipality {
  name: string;
}

export interface Zone {
  code: string;
  name: string;
  munis: string[];
}

export interface RouteOption {
  id: string;
  code: string;
  name: string;
  description: string;
  basePriceText: string;
  unitLabel: string;
  features: string[];
  warnings?: string[];
  isBestValue?: boolean;
  isUrgent?: boolean;
  bulletText?: string;
  whatsappMsg: string;
}

export interface Testimonial {
  id: string;
  stars: number;
  quote: string;
  author: string;
  role: string;
}

export interface StatItem {
  id: string;
  target: number;
  suffix: string;
  prefix?: string;
  label: string;
}

export interface RuleItem {
  id: string;
  title: string;
  description: string;
  isHighlighted?: boolean;
}
