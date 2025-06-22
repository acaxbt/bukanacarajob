import * as React from "react"

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link'
  size?: 'default' | 'sm' | 'lg' | 'icon'
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = 'default', size = 'default', style, ...props }, ref) => {
    const baseStyles: React.CSSProperties = {
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
      border: '1px solid transparent',
      outline: 'none',
    }

    const variantStyles: Record<NonNullable<ButtonProps['variant']>, React.CSSProperties> = {
      default: {
        backgroundColor: 'var(--primary)',
        color: 'var(--primary-foreground)',
      },
      destructive: {
        backgroundColor: 'var(--destructive)',
        color: 'var(--destructive-foreground)',
      },
      outline: {
        borderColor: 'var(--input-border)',
        backgroundColor: 'transparent',
        color: 'var(--foreground)',
      },
      secondary: {
        backgroundColor: 'var(--secondary)',
        color: 'var(--secondary-foreground)',
      },
      ghost: {
        backgroundColor: 'transparent',
      },
      link: {
        backgroundColor: 'transparent',
        color: 'var(--link)',
        textDecoration: 'underline',
      },
    }

    const sizeStyles: Record<NonNullable<ButtonProps['size']>, React.CSSProperties> = {
      default: {
        height: '2.5rem',
        padding: '0 1rem',
      },
      sm: {
        height: '2.25rem',
        padding: '0 0.75rem',
      },
      lg: {
        height: '2.75rem',
        padding: '0 1.25rem',
      },
      icon: {
        height: '2.5rem',
        width: '2.5rem',
      },
    }

    const mergedStyles = {
      ...baseStyles,
      ...variantStyles[variant],
      ...sizeStyles[size],
      ...style,
    }

    return (
      <button
        ref={ref}
        style={mergedStyles}
        {...props}
      />
    )
  }
)

Button.displayName = "Button"

export { Button }
