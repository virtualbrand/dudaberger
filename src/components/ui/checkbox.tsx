"use client";

import * as CheckboxPrimitive from "@radix-ui/react-checkbox";
import * as React from "react";

const Checkbox = React.forwardRef<
  React.ElementRef<typeof CheckboxPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root>
>(({ className, ...props }, ref) => {
  const [isChecked, setIsChecked] = React.useState(props.checked || false);

  const handleCheckedChange = (checked: boolean) => {
    setIsChecked(checked);
    if (props.onCheckedChange) {
      props.onCheckedChange(checked);
    }
  };

  React.useEffect(() => {
    if (props.checked !== undefined) {
      setIsChecked(props.checked);
    }
  }, [props.checked]);

  return (
    <CheckboxPrimitive.Root
      ref={ref}
      className="peer inline-flex shrink-0 items-center justify-center transition-all duration-200 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50"
      style={{
        width: '20px',
        height: '20px',
        border: isChecked ? '2px solid #D65B58' : '2px solid rgba(255, 255, 255, 0.7)',
        borderRadius: '50%',
        padding: '0',
        margin: '0',
        backgroundColor: isChecked ? '#D65B58' : 'transparent',
        boxShadow: 'none',
        position: 'relative',
        top: '1px',
        color: isChecked ? 'white' : 'transparent'
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.backgroundColor = '#D65B58';
        e.currentTarget.style.borderColor = '#D65B58';
        e.currentTarget.style.color = 'white';
      }}
      onMouseLeave={(e) => {
        if (!isChecked) {
          e.currentTarget.style.backgroundColor = 'transparent';
          e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.7)';
          e.currentTarget.style.color = 'transparent';
        }
      }}
      onFocus={(e) => {
        e.currentTarget.style.backgroundColor = '#D65B58';
        e.currentTarget.style.borderColor = '#D65B58';
        e.currentTarget.style.color = 'white';
      }}
      onBlur={(e) => {
        if (!isChecked) {
          e.currentTarget.style.backgroundColor = 'transparent';
          e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.7)';
          e.currentTarget.style.color = 'transparent';
        }
      }}
      {...props}
      onCheckedChange={handleCheckedChange}
    >
      <CheckboxPrimitive.Indicator className="flex items-center justify-center text-current">
        <svg
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <polyline points="20,6 9,17 4,12" />
        </svg>
      </CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Root>
  );
});
Checkbox.displayName = CheckboxPrimitive.Root.displayName;

export { Checkbox };
