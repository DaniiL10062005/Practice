import { Segmented, type SegmentedProps } from 'antd'
import type { Author } from '../../../../utils/types/authors'

type Props = {
  authors: Author[] | undefined
  setSelectedAuthor: (author: Author | undefined) => void
}

export const Authors = ({ authors, setSelectedAuthor }: Props) => {
  const authorOptions: SegmentedProps['options'] = [
    { label: 'Все', value: 'all' },
    ...(authors ?? []).map((author) => ({
      label: author.name,
      value: author.id,
    })),
  ]
  return (
    <Segmented
      size="large"
      options={authorOptions}
      onChange={(value) => {
        setSelectedAuthor(authors?.find((author) => author.id === value) ?? undefined)
      }}
    />
  )
}
