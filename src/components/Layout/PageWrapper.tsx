import React from "react";

type Props = {
  title?: string;
  children?: React.ReactNode
};

const PageWrapper = ({ title, children }: Props) => {
  return (
    <div>
      <div className="w-full text-white px-2 py-2">
        {title && (
          <div className="pb-3">
            <h1 className="text-xl font-bold tracking-tight sm:text-2xl">
              {title}
            </h1>
          </div>
        )}
        {children}
      </div>
    </div>
  );
};

export default PageWrapper;
