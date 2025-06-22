import * as React from "react"

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    const styles = {
      display: 'flex',
      height: '2.25rem',
      width: '100%',
      minWidth: '0',
      borderRadius: '0.375rem',
      border: '1px solid #e5e5e5',
      backgroundColor: 'transparent',
      padding: '0.25rem 0.75rem',
      fontSize: '0.875rem',
      lineHeight: '1.25rem',
      transition: 'color 0.2s, box-shadow 0.2s',
      outline: 'none',
    };

    return (
      <input
        type={type}
        ref={ref}
        style={styles}
        {...props}
      />
    );
  }
);

Input.displayName = "Input";

export { Input }
