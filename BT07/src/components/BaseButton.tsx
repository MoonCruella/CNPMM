import React from 'react';
import '../styles/base.css';

export interface BaseButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  loading?: boolean;
}

const variantClass: Record<string, string> = {
  primary: 'btn-primary',
  secondary: 'btn-secondary',
  danger: 'btn-danger'
};

export const BaseButton: React.FC<BaseButtonProps> = ({ variant = 'primary', size='md', loading=false, className = '', disabled, children, ...rest }) => {
  const sizeClass = size === 'md' ? '' : `btn-${size}`;
  const loadingClass = loading ? 'loading' : '';
  return <button className={`btn ${variantClass[variant]} ${sizeClass} ${loadingClass} ${className}`.trim()} disabled={disabled || loading} aria-busy={loading} {...rest}>{children}</button>;
};
