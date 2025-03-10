import React from 'react';

const SubHeading = ({ heading, className = '' }: { heading: string; className?: string }) => {
  return <div className={`font-medium text-sm md:text-base text-white ${className}`}>{heading}</div>;
};

export default SubHeading;
