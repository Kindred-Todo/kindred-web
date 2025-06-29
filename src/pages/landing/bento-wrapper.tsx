import React from "react";
import { Bento } from "./bento";

export const BentoWrapper = () => {
  return (
    <div className="flex flex-col items-center justify-center w-screen bg-dark-bg z-10" style={{
      transform: 'translateY(50%)',
      borderRadius: '64px',
    }}>
      <Bento />
    </div>
  );
};