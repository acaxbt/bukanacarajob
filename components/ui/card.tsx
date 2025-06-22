import * as React from "react"

const Card = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  (props, ref) => {
    const styles = {
      borderRadius: '0.5rem',
      border: '1px solid #e5e5e5',
      backgroundColor: '#ffffff',
      color: '#171717',
      boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
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

Card.displayName = "Card";

const CardHeader = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  (props, ref) => {
    const styles = {
      display: 'flex',
      flexDirection: 'column' as const,
      gap: '0.5rem',
      padding: '1.5rem',
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
  (props, ref) => {
    const styles = {
      fontSize: '1.125rem',
      lineHeight: '1.75rem',
      fontWeight: '600',
      letterSpacing: '-0.025em',
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
  (props, ref) => {
    const styles = {
      fontSize: '0.875rem',
      lineHeight: '1.25rem',
      color: '#737373',
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
  (props, ref) => {
    const styles = {
      padding: '1.5rem',
      paddingTop: '0',
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
  (props, ref) => {
    const styles = {
      display: 'flex',
      alignItems: 'center',
      padding: '1.5rem',
      paddingTop: '0',
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
