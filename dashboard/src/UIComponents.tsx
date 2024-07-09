import React, { ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
  className?: string;
}

export const Card: React.FC<CardProps> = ({ children, className = '' }) => (
  <div className={`bg-white shadow-lg rounded-lg overflow-hidden ${className}`}>
    {children}
  </div>
);

export const CardHeader: React.FC<CardProps> = ({ children, className = '' }) => (
  <div className={`px-6 py-4 bg-gray-50 border-b border-gray-200 font-bold text-xl ${className}`}>
    {children}
  </div>
);

export const CardContent: React.FC<CardProps> = ({ children, className = '' }) => (
  <div className={`p-6 ${className}`}>
    {children}
  </div>
);

interface SelectProps {
  value: string;
  onValueChange: (value: string) => void;
  children: ReactNode;
  className?: string;
  placeholder?: string;
}

export const Select: React.FC<SelectProps> = ({ value, onValueChange, children, className = '', placeholder }) => (
  <select 
    value={value} 
    onChange={(e) => onValueChange(e.target.value)} 
    className={`border border-gray-300 rounded-md px-4 py-2 ${className}`}
  >
    {placeholder && <option value="" disabled>{placeholder}</option>}
    {children}
  </select>
);

export const SelectTrigger: React.FC<{children: ReactNode}> = ({ children }) => <>{children}</>;

interface SelectValueProps {
  children?: ReactNode;
  placeholder?: string;
}

export const SelectValue: React.FC<SelectValueProps> = ({ children, placeholder }) => (
  <>{children || placeholder}</>
);

export const SelectContent: React.FC<{children: ReactNode}> = ({ children }) => <>{children}</>;

interface SelectItemProps {
  value: string;
  children: ReactNode;
}

export const SelectItem: React.FC<SelectItemProps> = ({ value, children }) => (
  <option value={value}>{children}</option>
);