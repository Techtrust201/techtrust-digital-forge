
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ChevronDown } from 'lucide-react';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';
import { NavItem, NavSubItem } from '@/types/admin';

interface AdminNavigationProps {
  navigationItems: NavItem[];
  isSidebarCollapsed: boolean;
  activeTab: string;
  openDropdown: string | null;
  activeSubMenu: string | null;
  onTabChange: (tabId: string) => void;
  onDropdownToggle: (dropdownId: string) => void;
}

const AdminNavigation = ({
  navigationItems,
  isSidebarCollapsed,
  activeTab,
  openDropdown,
  activeSubMenu,
  onTabChange,
  onDropdownToggle
}: AdminNavigationProps) => {
  if (isSidebarCollapsed) {
    return (
      <div className="space-y-2">
        {navigationItems.map((item: NavItem) => {
          const ItemIcon = item.icon;
          return (
            <Button
              key={item.id}
              variant="ghost"
              asChild
              className={`w-full justify-center px-2 hover:bg-gray-100 ${
                activeTab === item.id ? "bg-red-50 text-red-600" : ""
              }`}
              title={item.name}
            >
              <Link to={item.href} onClick={() => onTabChange(item.id)}>
                <ItemIcon className="w-5 h-5" />
              </Link>
            </Button>
          );
        })}
      </div>
    );
  }

  return (
    <div className="w-full space-y-1">
      {navigationItems.map((item: NavItem) => {
        const ItemIcon = item.icon;

        if (item.submenu) {
          return (
            <Collapsible
              key={item.id}
              open={openDropdown === item.id}
              onOpenChange={() => onDropdownToggle(item.id)}
            >
              <CollapsibleTrigger asChild>
                <Button
                  variant="ghost"
                  className={`w-full justify-between hover:bg-gray-50 rounded-lg px-3 py-2 transition-colors duration-200 group ${
                    activeTab === item.id
                      ? "bg-red-50 text-red-600 hover:bg-red-100"
                      : ""
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <ItemIcon className="w-5 h-5" />
                    <span className="font-medium">{item.name}</span>
                  </div>
                  <ChevronDown
                    className={`w-4 h-4 transition-transform duration-200 ${
                      openDropdown === item.id ? "rotate-180" : ""
                    }`}
                  />
                </Button>
              </CollapsibleTrigger>
              <CollapsibleContent className="space-y-1 mt-1">
                <div className="ml-8 space-y-1">
                  {item.submenu.map((subItem: NavSubItem) => (
                    <Button
                      key={subItem.href}
                      variant="ghost"
                      asChild
                      className={`w-full justify-start h-8 px-3 text-sm hover:bg-gray-100 rounded-md transition-colors duration-200 ${
                        activeSubMenu === subItem.href
                          ? "bg-red-100 text-red-700 hover:bg-red-200 font-medium"
                          : "text-gray-600 hover:text-gray-900"
                      }`}
                    >
                      <Link to={subItem.href}>
                        <span
                          className={`w-2 h-2 rounded-full mr-3 ${
                            activeSubMenu === subItem.href
                              ? "bg-red-500"
                              : "bg-gray-300"
                          }`}
                        ></span>
                        {subItem.name}
                      </Link>
                    </Button>
                  ))}
                </div>
              </CollapsibleContent>
            </Collapsible>
          );
        } else {
          return (
            <Button
              key={item.id}
              variant="ghost"
              asChild
              className={`w-full justify-start hover:bg-gray-100 transition-colors duration-200 ${
                activeTab === item.id
                  ? "bg-red-50 text-red-600 hover:bg-red-100"
                  : ""
              }`}
            >
              <Link to={item.href} onClick={() => onTabChange(item.id)}>
                <ItemIcon className="w-5 h-5 mr-3" />
                {item.name}
              </Link>
            </Button>
          );
        }
      })}
    </div>
  );
};

export default AdminNavigation;
