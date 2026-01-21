
export interface Package {
  id: string;
  name: string;
  price: number | string;
  duration: string;
  popular: boolean;
  features: string[];
  notIncluded: string[];
}

export interface Service {
  title: string;
  subtitle: string;
  description: string;
  icon: any;
  color: string;
  bgGradient: string;
  lightBg: string;
  darkColor: string;
  packages: Package[];
}

export interface CartItem extends Package {
  serviceId: string;
  serviceTitle: string;
}

export interface FormData {
  name: string;
  email: string;
  phone: string;
  company: string;
  message: string;
}
