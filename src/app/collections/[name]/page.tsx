import ClientCollectionPage from './client-page'

export async function generateStaticParams() {
  // Generate some common collection names for static generation
  // Other collections will be handled dynamically
  return [
    { name: 'default' },
    { name: 'documents' },
    { name: 'embeddings' }
  ]
}

export default function CollectionPage({ params }: { params: { name: string } }) {
  const { name } = params
  return <ClientCollectionPage collectionName={name} />
}
