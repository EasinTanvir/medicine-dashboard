"use client";

import React from "react";

const DeleteConfirm = ({ name, onClose, onConfirm, loading }) => {
  return (
    <div className="text-center">
      <h2 className="text-lg font-semibold text-gray-800 mb-2">
        Delete Confirmation
      </h2>
      <p className="text-sm text-gray-600 mb-6">
        Are you sure you want to delete{" "}
        <span className="font-medium text-red-600">"{name}"</span>? <br />
        This action cannot be undone.
      </p>

      <div className="flex justify-center gap-3">
        <button
          onClick={onClose}
          disabled={loading}
          className="px-4 py-2 text-sm rounded-md border border-gray-300 hover:bg-gray-100 transition disabled:opacity-50"
        >
          Cancel
        </button>
        <button
          onClick={onConfirm}
          disabled={loading}
          className="px-4 py-2 text-sm rounded-md bg-red-600 text-white hover:bg-red-700 transition flex items-center justify-center disabled:opacity-50"
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
          {loading ? "Deleting..." : "Yes, Delete"}
        </button>
      </div>
    </div>
  );
};

export default DeleteConfirm;
