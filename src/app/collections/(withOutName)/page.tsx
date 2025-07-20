'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

import { useGetCollections, useGetConfig } from '@/lib/client/query'
import { Card } from '@/components/ui/card'

export default function CollectionsPage() {
  const router = useRouter()
  const { data: config } = useGetConfig()
  const { data: collections, isError, error } = useGetCollections(config)

  useEffect(() => {
    if (collections != null && collections.length > 0) {
      router.push(`/collections/${collections[0]}`)
    }
  }, [collections, router])

  if (isError) {
    return (
      <div className="container mx-auto max-w-md text-center">
        <Card className="p-8 mt-8 border shadow-md">
          <h2 className="text-2xl font-semibold mb-4">Something went wrong</h2>
          <p className="mb-2">{error.message}</p>
          <p>
            Go to{' '}
            <Link href="/setup" className="text-primary hover:underline">
              Setup
            </Link>
            .
          </p>
        </Card>
      </div>
    )
  }

  if (collections != null && collections.length === 0) {
    return (
      <div className="container mx-auto max-w-md text-center">
        <Card className="p-8 mt-8 border shadow-md">
          <p className="mb-2">There are no collections.</p>
          <p>
            <Link href="/setup" className="text-primary hover:underline">
              Setup
            </Link>{' '}
            a new Chroma instance.
          </p>
        </Card>
      </div>
    )
  }

  return null
}
