import React from "react";

const Loading = () => {
  return (
    <>
      <div className="inline-block h-full aspect-square animate-spin rounded-full border-2 border-solid border-current border-e-transparent align-[-0.125em] text-surface motion-reduce:animate-[spin_1.5s_linear_infinite] dark:text-white" />
    </>
  );
};

export default Loading;
