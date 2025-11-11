const Text = ({ className = "", children }) => {
  return (
    <p className={`font-normal text-[13px] text-textColor ${className}`}>
      {children}
    </p>
  );
};

export { Text };
