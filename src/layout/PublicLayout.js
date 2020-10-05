import React, { useEffect } from "react";

const PublicLayout = ({ children }) => {
  useEffect(() => {
    localStorage.clear()
  }, [])
  /* Login Register Recovery Layout */
  return <>{children}</>;
};

export default PublicLayout;
