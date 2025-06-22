import * as React from "react"

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link'
  size?: 'default' | 'sm' | 'lg' | 'icon'
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'default', size = 'default', asChild = false, ...props }, ref) => {
    const baseStyles = {
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '0.5rem',
      whiteSpace: 'nowrap' as const,
      borderRadius: '0.375rem',
      fontSize: '0.875rem',
      fontWeight: '500',
      transition: 'all 0.2s',
      cursor: 'pointer',
      border: 'none',
      outline: 'none',
    }

    const variantStyles = {
      default: {
        backgroundColor: '#171717',
        color: '#fafafa',
        boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
      },
      destructive: {
        backgroundColor: '#ef4444',
        color: '#ffffff',
        boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
      },
      outline: {
        border: '1px solid #e5e5e5',
        backgroundColor: '#ffffff',
        color: '#171717',
        boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
      },
      secondary: {
        backgroundColor: '#f5f5f5',
        color: '#171717',
        boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
      },
      ghost: {
        backgroundColor: 'transparent',
        color: '#171717',
      },
      link: {
        backgroundColor: 'transparent',
        color: '#171717',
        textDecoration: 'underline',
      },
    }

    const sizeStyles = {
      default: {
        height: '2.25rem',
        padding: '0.5rem 1rem',
      },
      sm: {
        height: '2rem',
        borderRadius: '0.375rem',
        padding: '0.375rem 0.75rem',
      },
      lg: {
        height: '2.5rem',
        borderRadius: '0.375rem',
        padding: '0.75rem 1.5rem',
      },
      icon: {
        width: '2.25rem',
        height: '2.25rem',
      },
    }

    const styles = {
      ...baseStyles,
      ...variantStyles[variant],
      ...sizeStyles[size],
    }

    return (
      <button
        ref={ref}
        style={styles}
        {...props}
      />
    )
  }
)

Button.displayName = "Button"

export { Button }
