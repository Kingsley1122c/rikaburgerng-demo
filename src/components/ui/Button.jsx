import React from 'react';
import './Button.css';

const Button = ({
  as: Component = 'button',
  children,
  className = '',
  variant = 'primary',
  ...props
}) => {
  return (
    <Component className={`btn btn-${variant} ${className}`.trim()} {...props}>
      {children}
    </Component>
  );
};

export default Button;
