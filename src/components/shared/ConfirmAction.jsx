"use client";

import React from "react";

const ConfirmAction = ({
  title = "Are you sure?",
  message,
  name,
  confirmText = "Confirm",
  cancelText = "Cancel",
  onClose,
  onConfirm,
  loading,
  confirmColor = "red",
}) => {
  const colorClasses = {
    red: "bg-red-600 hover:bg-red-700",
    green: "bg-green-600 hover:bg-green-700",
    blue: "bg-blue-600 hover:bg-blue-700",
    yellow: "bg-yellow-500 hover:bg-yellow-600",
  };

  const confirmBtnClass = colorClasses[confirmColor] || colorClasses.red;

  return (
    <div className="text-center">
      {/* Title */}
      <h2 className="text-lg font-semibold text-gray-800 mb-2">{title}</h2>

      {/* Message */}
      {message ? (
        <p className="text-sm text-gray-600 mb-6">{message}</p>
      ) : (
        <p className="text-sm text-gray-600 mb-6">
          Are you sure you want to perform this action on{" "}
          <span className="font-medium text-red-600">"{name}"</span>?
        </p>
      )}

      {/* Buttons */}
      <div className="flex justify-center gap-3">
        <button
          onClick={onClose}
          disabled={loading}
          className="px-4 py-2 text-sm rounded-md border border-gray-300 hover:bg-gray-100 transition disabled:opacity-50"
        >
          {cancelText}
        </button>

        <button
          onClick={onConfirm}
          disabled={loading}
          className={`px-4 py-2 text-sm rounded-md text-white transition flex items-center justify-center disabled:opacity-50 ${confirmBtnClass}`}
        >
          {loading ? (
            <svg
              className="animate-spin h-4 w-4 mr-2 text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8v4l3.5-3.5L12 0v4a8 8 0 100 16v-4l-3.5 3.5L12 24v-4a8 8 0 01-8-8z"
              ></path>
            </svg>
          ) : null}
          {loading ? "Processing..." : confirmText}
        </button>
      </div>
    </div>
  );
};

export default ConfirmAction;
