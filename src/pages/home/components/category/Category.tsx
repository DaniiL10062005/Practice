import { Segmented, type SegmentedProps } from 'antd'
import type { Genre } from '../../../../utils/types/genres'

type Props = {
  genres: Genre[] | undefined
  setSelectedGenre: (genre: Genre | undefined) => void
}

export const Category = ({ genres, setSelectedGenre }: Props) => {
  const genreOptions: SegmentedProps['options'] = [
    { label: 'Все', value: 'all' },
    ...(genres ?? []).map((genre) => ({
      label: genre.genre,
      value: genre.id,
    })),
  ]
  return (
    <Segmented
      size="large"
      options={genreOptions}
      onChange={(value) => {
        setSelectedGenre(genres?.find((genre) => genre.id === value) ?? undefined)
      }}
    />
  )
}
