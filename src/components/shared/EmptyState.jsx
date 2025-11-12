// components/shared/EmptyState.jsx
"use client";

import React from "react";

const colorMap = {
  red: {
    bg: "bg-red-800",
    accent: "bg-red-700/70",
    text: "text-red-50",
  },
  blue: {
    bg: "bg-blue-800",
    accent: "bg-blue-700/70",
    text: "text-blue-50",
  },
  green: {
    bg: "bg-emerald-800",
    accent: "bg-emerald-700/70",
    text: "text-emerald-50",
  },
  gray: {
    bg: "bg-gray-800",
    accent: "bg-gray-700/70",
    text: "text-gray-100",
  },
};

const EmptyState = ({
  title = "No items found",
  subtitle = "Try changing filters or add new items.",

  color = "red", // one of: red | blue | green | gray
  className = "",
  children = null, // optional extra node (e.g. a button)
}) => {
  const c = colorMap[color] || colorMap.red;

  return (
    <div
      className={`mx-auto w-fit px-8 py-10 rounded-2xl ${c.bg} shadow-lg ${className}`}
      role="status"
      aria-live="polite"
    >
      <div className="flex flex-col items-center gap-4 max-w-md">
        <h3 className={`text-center text-xl font-semibold ${c.text}`}>
          {title}
        </h3>

        {subtitle && (
          <p className={`text-center text-sm ${c.text} opacity-90`}>
            {subtitle}
          </p>
        )}

        {children ? (
          <div className="mt-3 w-full flex justify-center">{children}</div>
        ) : null}
      </div>
    </div>
  );
};

export default EmptyState;
