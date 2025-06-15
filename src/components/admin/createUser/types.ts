
export interface CreateUserModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export interface PackageWithCategory {
  id: string;
  name: string;
  price: number;
  duration?: string;
  category: string;
  categoryKey: string;
}

export interface CategoryGroup {
  title: string;
  packages: PackageWithCategory[];
}

export interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  company: string;
  position: string;
  industry: string;
  address: string;
  city: string;
  postalCode: string;
  country: string;
  selectedPackages: string[];
  notes: string;
}
