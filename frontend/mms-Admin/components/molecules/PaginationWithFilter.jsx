import React from "react";
import { Icons } from "../atoms/Icons";

export const PaginationWithFilter = () => {
  return (
    <div className={`flex flex-align-center gap-10`}>
      <span className={`cursor-pointer`}>
        <Icons name="double-backward" />
      </span>
      <span className={`cursor-pointer`}>
        <Icons name="backward" />
      </span>
      <span>1 </span> - <span>10</span> of <span>20</span>
      <span className={`cursor-pointer`}>
        <Icons name="foward" />
      </span>
      <span className={`cursor-pointer`}>
        <Icons name="double-foward" />
      </span>
      <span className="cursor-pointer">
        <Icons name="filter" />
      </span>
      <span className={`cursor-pointer`}>
        <Icons name="close" />
      </span>
    </div>
  );
};
