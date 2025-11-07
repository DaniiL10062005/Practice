import { Segmented } from 'antd'

export const Category = () => {
  return (
    <Segmented
      size="large"
      options={['Бестселлер', 'Научпоп', 'Детектив', 'Романтика', 'Худодественная литература']}
      onChange={(value) => {
        console.log(value)
      }}
    />
  )
}
