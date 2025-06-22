import * as React from "react"

const Card = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ style, ...props }, ref) => {
    const cardStyle: React.CSSProperties = {
      borderRadius: '0.75rem',
      border: '1px solid var(--card-border)',
      backgroundColor: 'var(--card-background)',
      color: 'var(--card-foreground)',
      boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.05)',
      ...style,
    };

    return (
      <div
        ref={ref}
        style={cardStyle}
        data-card="true"
        {...props}
      />
    );
  }
);

Card.displayName = "Card";

const CardHeader = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ style, ...props }, ref) => {
    const styles = {
      display: 'flex',
      flexDirection: 'column' as const,
      gap: '0.5rem',
      padding: '1.5rem',
      ...style,
    };

    return (
      <div
        ref={ref}
        style={styles}
        {...props}
      />
    );
  }
);

CardHeader.displayName = "CardHeader";

const CardTitle = React.forwardRef<HTMLHeadingElement, React.HTMLAttributes<HTMLHeadingElement>>(
  ({ style, ...props }, ref) => {
    const styles = {
      fontSize: '1.25rem',
      fontWeight: '600',
      letterSpacing: '-0.025em',
      color: 'inherit',
      ...style,
    };

    return (
      <h3
        ref={ref}
        style={styles}
        {...props}
      />
    );
  }
);

CardTitle.displayName = "CardTitle";

const CardDescription = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLParagraphElement>>(
  ({ style, ...props }, ref) => {
    const styles = {
      fontSize: '0.875rem',
      color: 'var(--muted-foreground)',
      ...style,
    };

    return (
      <p
        ref={ref}
        style={styles}
        {...props}
      />
    );
  }
);

CardDescription.displayName = "CardDescription";

const CardContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ style, ...props }, ref) => {
    const styles = {
      padding: '1.5rem',
      paddingTop: '0',
      ...style,
    };

    return (
      <div
        ref={ref}
        style={styles}
        {...props}
      />
    );
  }
);

CardContent.displayName = "CardContent";

const CardFooter = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ style, ...props }, ref) => {
    const styles = {
      display: 'flex',
      alignItems: 'center',
      padding: '1.5rem',
      paddingTop: '0',
      ...style,
    };

    return (
      <div
        ref={ref}
        style={styles}
        {...props}
      />
    );
  }
);

CardFooter.displayName = "CardFooter";

export { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent };
