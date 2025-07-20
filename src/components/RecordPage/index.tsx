import SearchPanel from './SearchPanel'
import RecordPanel from './RecordPanel'

const RecordPage = ({ collectionName }: { collectionName: string }) => {
  return (
    <div>
      <SearchPanel />
      <RecordPanel collectionName={collectionName} />
    </div>
  )
}

export default RecordPage
