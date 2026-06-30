import React from 'react';

const Container = ({ as: Component = 'div', className = '', children }) => {
  return <Component className={`container ${className}`.trim()}>{children}</Component>;
};

export default Container;
