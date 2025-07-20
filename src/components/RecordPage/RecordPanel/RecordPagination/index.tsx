import { useAtom } from 'jotai'

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination'
import { currentPageAtom } from '@/components/RecordPage/atom'

import type { RecordsPage } from '@/lib/types'

const PAGE_SIZE = 20

const RecordPagination = ({ recordsPage }: { recordsPage: RecordsPage }) => {
  const [currentPage, setCurrentPage] = useAtom(currentPageAtom)

  const totalPages = Math.ceil(recordsPage.total / PAGE_SIZE)

  const handlePrevious = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1)
    }
  }

  const handleNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1)
    }
  }

  const handlePageClick = (page: number) => {
    setCurrentPage(page)
  }

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            href="#"
            onClick={e => {
              e.preventDefault()
              handlePrevious()
            }}
            className={currentPage <= 1 ? 'pointer-events-none opacity-50' : ''}
          />
        </PaginationItem>

        {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
          const page = i + 1
          return (
            <PaginationItem key={page}>
              <PaginationLink
                href="#"
                onClick={e => {
                  e.preventDefault()
                  handlePageClick(page)
                }}
                isActive={currentPage === page}
              >
                {page}
              </PaginationLink>
            </PaginationItem>
          )
        })}

        {totalPages > 5 && <PaginationEllipsis />}

        <PaginationItem>
          <PaginationNext
            href="#"
            onClick={e => {
              e.preventDefault()
              handleNext()
            }}
            className={currentPage >= totalPages ? 'pointer-events-none opacity-50' : ''}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  )
}
export default RecordPagination
