'use client'

import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { IconSettings } from '@tabler/icons-react'

import { useGetCollections, useGetConfig } from '@/lib/client/query'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Button } from '@/components/ui/button'
import { AppShell, AppShellMain, AppShellHeader } from '@/components/ui/app-shell'

import type { ReactNode } from 'react'

export default function Layout({ children, params }: { children: ReactNode; params: { name: string } }) {
  const router = useRouter()
  const { data: config } = useGetConfig()
  const { name: currentCollectionName } = params
  const { data: collections } = useGetCollections(config)

  const collectionChanged = (name: string | null) => {
    router.push(`/collections/${name}`)
  }

  return (
    <AppShell
      header={
        <AppShellHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <h1 className="font-bold text-lg">Chromadb Admin</h1>
              {collections ? (
                <Select value={currentCollectionName} onValueChange={collectionChanged}>
                  <SelectTrigger className="w-[200px]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {collections.map(collection => (
                      <SelectItem key={collection} value={collection}>
                        {collection}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              ) : null}
            </div>
            <div className="flex items-center gap-4">
              {config && (
                <div className="flex items-center gap-1 text-sm text-muted-foreground">
                  <span>{config.connectionString}</span>
                  <span>/</span>
                  <span>{config.tenant}</span>
                  <span>/</span>
                  <span>{config.database}</span>
                </div>
              )}
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
