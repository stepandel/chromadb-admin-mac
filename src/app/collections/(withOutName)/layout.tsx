'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { IconSettings } from '@tabler/icons-react'

import { useGetConfig } from '@/lib/client/query'
import { Button } from '@/components/ui/button'
import { AppShell, AppShellMain, AppShellHeader } from '@/components/ui/app-shell'

import type { ReactNode } from 'react'

export default function AppLayout({ children }: { children: ReactNode }) {
  const router = useRouter()
  const { data: config } = useGetConfig()

  useEffect(() => {
    if (config && !config.connectionString) {
      router.push(`/setup`)
    }
  }, [config, router])

  return (
    <AppShell
      header={
        <AppShellHeader>
          <div className="flex items-center justify-between">
            <div>
              <h1 className="font-bold text-lg">Chromadb Admin</h1>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-sm text-muted-foreground">{config?.connectionString}</span>
              <Button variant="ghost" size="icon" asChild title="Setup">
                <Link href="/setup">
                  <IconSettings className="h-5 w-5" />
                </Link>
              </Button>
            </div>
          </div>
        </AppShellHeader>
      }
    >
      <AppShellMain>{children}</AppShellMain>
    </AppShell>
  )
}
