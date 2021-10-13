import React from 'react';

const PageComponent = ({ children }: { children: React.ReactNode | null }) => (
  <div className="min-h-screen">
    {children}
  </div>
);

export default PageComponent;
