import { useState } from 'react'

import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '@/components/ui/table'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import RecordDetailModal from '../../RecordDetailModal'
import RecordRowActionMenu from './RecordRowActionMenu'

import styles from './index.module.scss'

import type { Record } from '@/lib/types'
import type { RecordsPage } from '@/lib/types'

const RecordTable = ({ withQuery, recordsPage }: { withQuery: boolean; recordsPage: RecordsPage }) => {
  const [selectedRecord, setSelectedRecord] = useState<Record | null>(null)

  const openDetailModal = (record: Record) => {
    setSelectedRecord(record)
  }

  const closeDetailModal = () => {
    setSelectedRecord(null)
  }

  return (
    <>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-12"></TableHead>
            {withQuery && <TableHead className="w-[10%]">Distance</TableHead>}
            <TableHead className="w-[10%]">ID</TableHead>
            <TableHead className="w-[40%]">Document</TableHead>
            <TableHead className={withQuery ? 'w-[20%]' : 'w-[30%]'}>Metadata</TableHead>
            <TableHead>Embedding</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {recordsPage?.records.map(record => (
            <TableRow
              key={record.id}
              onClick={() => openDetailModal(record)}
              className="cursor-pointer hover:bg-muted/50"
            >
              <TableCell className={styles.td}>
                <RecordRowActionMenu embedding={record.embedding.join(', ')} />
              </TableCell>
              {withQuery && <TableCell className={styles.td}>{record.distance}</TableCell>}
              <TableCell className={styles.td}>
                <span className="text-sm">{record.id}</span>
              </TableCell>
              <TableCell className={styles.td}>{record.document}</TableCell>
              <TableCell className={styles.td}>{record.metadata ? JSON.stringify(record.metadata) : ''}</TableCell>
              <TableCell className={styles.td}>{record.embedding.join(', ')}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <Dialog open={!!selectedRecord} onOpenChange={open => !open && closeDetailModal()}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle>{selectedRecord ? `ID: ${selectedRecord.id}` : ''}</DialogTitle>
          </DialogHeader>
          {selectedRecord && <RecordDetailModal record={selectedRecord} />}
        </DialogContent>
      </Dialog>
    </>
  )
}

export default RecordTable
