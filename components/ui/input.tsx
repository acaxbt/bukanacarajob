import * as React from "react"

const Input = React.forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>(
  ({ type, style, ...props }, ref) => {
    const baseStyles: React.CSSProperties = {
      display: 'flex',
      height: '2.25rem',
      width: '100%',
      minWidth: '0',
      borderRadius: '0.375rem',
      border: '1px solid var(--input-border)',
      backgroundColor: 'var(--input-background)',
      color: 'var(--input-foreground)',
      padding: '0.25rem 0.75rem',
      fontSize: '0.875rem',
      lineHeight: '1.25rem',
      transition: 'box-shadow 0.2s, border-color 0.2s',
      outline: 'none',
    };

    // Merge base styles with any additional styles passed as props
    const mergedStyles = { ...baseStyles, ...style };

    return (
      <input
        type={type}
        ref={ref}
        style={mergedStyles}
        {...props}
      />
    );
  }
);

Input.displayName = "Input";

export { Input }
