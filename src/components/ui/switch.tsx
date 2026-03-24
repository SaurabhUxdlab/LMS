import * as React from "react"

export interface SwitchProps extends React.InputHTMLAttributes<HTMLInputElement> {
  checked?: boolean
  onCheckedChange?: (checked: boolean) => void
}

export const Switch = React.forwardRef<HTMLInputElement, SwitchProps>(
  ({ checked, onCheckedChange, className = "", ...props }, ref) => {
    return (
      <label className={`inline-flex items-center cursor-pointer ${className}`}>
        <input
          type="checkbox"
          className="sr-only peer"
          checked={checked}
          onChange={e => onCheckedChange?.(e.target.checked)}
          ref={ref}
          {...props}
        />
        <div
          className="w-10 h-6 bg-muted rounded-full peer-focus:ring-2 peer-focus:ring-primary transition peer-checked:bg-primary relative"
        >
          <span
            className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full shadow transition-transform peer-checked:translate-x-4"
          />
        </div>
      </label>
    )
  }
)
Switch.displayName = "Switch"
