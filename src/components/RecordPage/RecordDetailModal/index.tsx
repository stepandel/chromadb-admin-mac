import { Icon123, IconBlockquote, IconBraces } from '@tabler/icons-react'

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { ScrollArea } from '@/components/ui/scroll-area'

import type { Record } from '@/lib/types'

const RecordDetailModal = ({ record }: { record: Record }) => {
  const iconStyle = { width: 14, height: 14 }

  return (
    <Tabs defaultValue="Document" className="w-full">
      <TabsList className="grid w-full grid-cols-3">
        <TabsTrigger value="Document" className="flex items-center gap-2">
          <IconBlockquote style={iconStyle} />
          Document
        </TabsTrigger>
        <TabsTrigger value="Embedding" className="flex items-center gap-2">
          <Icon123 style={iconStyle} />
          Embedding
        </TabsTrigger>
        <TabsTrigger value="Metadata" className="flex items-center gap-2">
          <IconBraces style={iconStyle} />
          Metadata
        </TabsTrigger>
      </TabsList>

      <TabsContent value="Document" className="mt-4">
        <div className="p-4">
          <ScrollArea className="h-64">
            <p className="text-sm">{record.document}</p>
          </ScrollArea>
        </div>
      </TabsContent>

      <TabsContent value="Embedding" className="mt-4">
        <div className="p-4">
          <ScrollArea className="h-64">
            <ul className="space-y-1">
              {record.embedding.map((embedding, index) => (
                <li key={index} className="text-sm">
                  {embedding}
                </li>
              ))}
            </ul>
          </ScrollArea>
        </div>
      </TabsContent>

      <TabsContent value="Metadata" className="mt-4">
        <div className="p-4">
          <ScrollArea className="h-64">
            <pre className="text-sm whitespace-pre-wrap">{JSON.stringify(record.metadata, null, 2)}</pre>
          </ScrollArea>
        </div>
      </TabsContent>
    </Tabs>
  )
}

export default RecordDetailModal
