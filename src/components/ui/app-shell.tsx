import * as React from 'react'

import { cn } from '@/lib/utils'

interface AppShellProps {
  children: React.ReactNode
  header?: React.ReactNode
  navbar?: React.ReactNode
  aside?: React.ReactNode
  footer?: React.ReactNode
  className?: string
}

const AppShell = React.forwardRef<HTMLDivElement, AppShellProps>(
  ({ children, header, navbar, aside, footer, className, ...props }, ref) => {
    return (
      <div ref={ref} className={cn('min-h-screen flex flex-col', className)} {...props}>
        {header && <header className="sticky top-0 z-40 border-b bg-background">{header}</header>}
        <div className="flex flex-1">
          {navbar && <nav className="sticky top-16 h-[calc(100vh-4rem)] w-64 border-r bg-background">{navbar}</nav>}
          <main className="flex-1">{children}</main>
          {aside && <aside className="sticky top-16 h-[calc(100vh-4rem)] w-64 border-l bg-background">{aside}</aside>}
        </div>
        {footer && <footer className="border-t bg-background">{footer}</footer>}
      </div>
    )
  }
)
AppShell.displayName = 'AppShell'

const AppShellHeader = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn('flex h-16 items-center px-4', className)} {...props} />
  )
)
AppShellHeader.displayName = 'AppShellHeader'

const AppShellMain = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => <div ref={ref} className={cn('flex-1 p-4', className)} {...props} />
)
AppShellMain.displayName = 'AppShellMain'

export { AppShell, AppShellHeader, AppShellMain }
