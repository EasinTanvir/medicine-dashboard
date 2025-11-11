const Button = ({ className, children, type = "button", ...rest }) => {
  return (
    <button className={`  cursor-pointer ${className}`} type={type} {...rest}>
      {children}
    </button>
  );
};

export { Button };
