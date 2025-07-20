import { useEffect, useState } from 'react'
import { useAtom, useSetAtom } from 'jotai'

import { Input } from '@/components/ui/input'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { currentPageAtom, queryAtom } from '@/components/RecordPage/atom'

const SearchPanel = () => {
  const [query, setQuery] = useAtom(queryAtom)
  const setCurrentPage = useSetAtom(currentPageAtom)

  const [queryValue, setQueryValue] = useState(query)

  useEffect(() => {
    setQueryValue(query)
  }, [query])

  const queryButtonClicked = () => {
    setQuery(queryValue)
    setCurrentPage(1)
  }

  const clearButtonClicked = () => {
    setQueryValue('')
    setQuery('')
    setCurrentPage(1)
  }

  return (
    <Card className="p-4 mb-4 border">
      <div className="flex items-center gap-4">
        <div className="flex-shrink-0">
          <span className="text-sm text-muted-foreground">Query by vectors or ID:</span>
        </div>
        <div className="flex-1">
          <Input
            placeholder="0.1, 0.2, 0.3, -0.1, -0.2, -0.3"
            value={queryValue}
            onChange={e => setQueryValue(e.target.value)}
          />
        </div>
        <div className="flex-shrink-0">
          <Button onClick={queryButtonClicked}>Query</Button>
        </div>
        <div className="flex-shrink-0">
          <Button variant="outline" onClick={clearButtonClicked}>
            Clear
          </Button>
        </div>
      </div>
    </Card>
  )
}

export default SearchPanel
