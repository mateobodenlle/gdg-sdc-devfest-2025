import React from 'react';
import cn from 'classnames';

interface LinkButtonProps {
  type?: JSX.IntrinsicElements['button']['type'];
  variant?: 'secondary' | 'primary' | 'danger';
  className?: string;
  href: string;
}

const LinkButton: React.FC<LinkButtonProps & JSX.IntrinsicElements['a']> = ({
  variant = 'primary',
  className = '',
  children,
  href = '/',
  ...props
}) => {
  const baseClass = `flex items-center justify-center rounded-full px-8 py-3 cursor-pointer focus:outline-none text-white font-semibold text-base transition-all duration-300 ease-out relative overflow-hidden group`;
  let variantClass = ``;
  if (variant === 'danger') {
    variantClass = `bg-gradient-to-br from-red-500 to-red-600 shadow-lg shadow-red-500/25 hover:shadow-xl hover:shadow-red-500/35 hover:-translate-y-0.5`;
  } else if (variant === 'secondary') {
    variantClass = `bg-gradient-to-br from-gray-600 to-gray-700 shadow-lg shadow-gray-600/25 hover:shadow-xl hover:shadow-gray-600/35 hover:-translate-y-0.5`;
  } else {
    variantClass = `bg-gradient-to-br from-blue-500 to-blue-600 shadow-lg shadow-blue-500/25 hover:shadow-xl hover:shadow-blue-500/35 hover:-translate-y-0.5`;
  }
  return (
    <a className={cn(baseClass, variantClass, className)} href={href} {...props}>
      <span className="relative z-10">{children}</span>
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-500"></div>
    </a>
  );
};

export default LinkButton;
