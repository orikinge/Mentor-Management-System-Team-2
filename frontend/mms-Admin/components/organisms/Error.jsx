import Link from "next/link";
import React from "react";

export const Error = () => {
  return (
    <div className="h-full flex items-center justify-center">
      <div>
        <p>An error has occured while fetching data</p>

        <Link href="/dashboard">Go home</Link>
      </div>
    </div>
  );
};
