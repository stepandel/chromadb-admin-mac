import { useSetAtom } from 'jotai'
import { IconDots } from '@tabler/icons-react'

import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { Button } from '@/components/ui/button'
import { currentPageAtom, queryAtom } from '@/components/RecordPage/atom'

const RecordRowActionMenu = ({ embedding }: { embedding: string }) => {
  const setQuery = useSetAtom(queryAtom)
  const setCurrentPage = useSetAtom(currentPageAtom)

  const queryMenuItemClicked = () => {
    setQuery(embedding)
    setCurrentPage(1)
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm" onClick={event => event.stopPropagation()} aria-label="Settings">
          <IconDots className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={queryMenuItemClicked}>Query by this record</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default RecordRowActionMenu
