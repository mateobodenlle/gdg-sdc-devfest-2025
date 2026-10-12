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
  const baseClass = `inline-flex min-h-[44px] items-center justify-center gap-2 whitespace-nowrap rounded-full px-6 py-3 cursor-pointer text-white font-semibold text-base transition-[background-color,border-color,box-shadow,transform] duration-200 ease-out relative overflow-hidden group focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand-lighter)] focus-visible:ring-offset-2 focus-visible:ring-offset-[#111] motion-safe:hover:-translate-y-0.5`;
  let variantClass = ``;
  if (variant === 'danger') {
    variantClass = `bg-[var(--brand-red)] shadow-lg shadow-red-500/25 hover:shadow-xl hover:shadow-red-500/35`;
  } else if (variant === 'secondary') {
    variantClass = `border border-white/20 bg-white/5 hover:border-white/40 hover:bg-white/10`;
  } else {
    variantClass = `bg-[var(--brand)] shadow-lg shadow-[#4285f4]/25 hover:bg-[var(--brand-light)] hover:shadow-xl hover:shadow-[#4285f4]/35`;
  }
  return (
    <a className={cn(baseClass, variantClass, className)} href={href} {...props}>
      <span className="relative z-10 inline-flex items-center gap-2">{children}</span>
      <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-500 motion-reduce:hidden"></div>
    </a>
  );
};

export default LinkButton;
