import * as React from 'react'

import { cn } from '@/lib/utils'

interface LoadingOverlayProps {
  visible: boolean
  children?: React.ReactNode
  className?: string
}

const LoadingOverlay = React.forwardRef<HTMLDivElement, LoadingOverlayProps>(
  ({ visible, children, className, ...props }, ref) => {
    return (
      <div ref={ref} className={cn('relative', className)} {...props}>
        {children}
        {visible && (
          <div className="absolute inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center z-50">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          </div>
        )}
      </div>
    )
  }
)
LoadingOverlay.displayName = 'LoadingOverlay'

export { LoadingOverlay }
