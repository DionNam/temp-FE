export interface DemoFormData {
  name: string;
  employees: string;
  timeline: string;
  agency: string;
}

export interface DemoDialogProps {
  isOpen: boolean;
  onClose: () => void;
  formData: DemoFormData;
  setFormData: React.Dispatch<React.SetStateAction<DemoFormData>>;
}

export interface HeaderProps {
  onLoginClick: () => void;
  onDashboardClick: () => void;
}

export interface HeroSectionProps {
  email: string;
  setEmail: (email: string) => void;
  onEmailSubmit: () => void;
}

export interface PricingSectionProps {
  isYearly: boolean;
  setIsYearly: (isYearly: boolean) => void;
}

export interface FAQSectionProps {
  expandedFaq: number[];
  setExpandedFaq: (expandedFaq: number[]) => void;
}

export interface CTASectionProps {
  onDashboardClick: () => void;
}

export interface TypographyConfig {
  readonly h1: string;
  readonly h2: string;
  readonly h3: string;
  readonly h4: string;
  readonly title: string;
  readonly title2: string;
  readonly subtitle: string;
  readonly body: string;
  readonly caption: string;
  readonly price: string;
}