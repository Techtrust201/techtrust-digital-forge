
import React from 'react';
import SearchFilters from '@/components/admin/SearchFilters';

interface UserFiltersProps {
  searchTerm: string;
  onSearchChange: (term: string) => void;
  statusFilter: string;
  onStatusFilterChange: (status: string) => void;
  tierFilter: string;
  onTierFilterChange: (tier: string) => void;
  onClearFilters: () => void;
}

const UserFilters: React.FC<UserFiltersProps> = ({
  searchTerm,
  onSearchChange,
  statusFilter,
  onStatusFilterChange,
  tierFilter,
  onTierFilterChange,
  onClearFilters
}) => {
  return (
    <SearchFilters
      searchTerm={searchTerm}
      onSearchChange={onSearchChange}
      statusFilter={statusFilter}
      onStatusFilterChange={onStatusFilterChange}
      tierFilter={tierFilter}
      onTierFilterChange={onTierFilterChange}
      onClearFilters={onClearFilters}
    />
  );
};

export default UserFilters;
