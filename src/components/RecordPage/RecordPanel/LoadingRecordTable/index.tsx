import { Table, TableHeader, TableBody, TableRow, TableHead } from '@/components/ui/table'
import { LoadingOverlay } from '@/components/ui/loading-overlay'

const LoadingRecordTable = () => {
  return (
    <LoadingOverlay visible>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Document</TableHead>
            <TableHead>Metadata</TableHead>
            <TableHead>Embedding</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody></TableBody>
      </Table>
    </LoadingOverlay>
  )
}

export default LoadingRecordTable
