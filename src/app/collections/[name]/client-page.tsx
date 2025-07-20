'use client'

import RecordPage from '@/components/RecordPage'

export default function ClientCollectionPage({ collectionName }: { collectionName: string }) {
  return <RecordPage collectionName={collectionName} />
}