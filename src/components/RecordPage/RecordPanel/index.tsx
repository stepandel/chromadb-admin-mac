import { useAtomValue } from 'jotai'

import { useGetCollectionRecords, useGetConfig } from '@/lib/client/query'
import { Card } from '@/components/ui/card'
import { currentPageAtom, queryAtom } from '@/components/RecordPage/atom'
import RecordTable from './RecordTable'
import RecordPagination from './RecordPagination'
import LoadingRecordTable from './LoadingRecordTable'

const RecordPanel = ({ collectionName }: { collectionName: string }) => {
  const query = useAtomValue(queryAtom)
  const currentPage = useAtomValue(currentPageAtom)

  const { data: config } = useGetConfig()
  const { data: queryResult, isLoading } = useGetCollectionRecords(config, collectionName, currentPage, query)

  if (isLoading) {
    return (
      <Card className="p-6 min-h-[50vh] border relative">
        <LoadingRecordTable />
      </Card>
    )
  }

  if (queryResult) {
    if ('error' in queryResult) {
      return (
        <Card className="p-4 mb-4 border">
          <p className="text-destructive">{queryResult.error}</p>
        </Card>
      )
    } else {
      return (
        <Card className="p-6 border">
          <RecordTable withQuery={!!query} recordsPage={queryResult}></RecordTable>
          {query ? null : (
            <div className="pt-4 flex justify-end">
              <RecordPagination recordsPage={queryResult} />
            </div>
          )}
        </Card>
      )
    }
  }
}

export default RecordPanel
