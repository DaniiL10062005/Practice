export type CartRequest = {
  book_id: number
  quantity?: number
}

export type CartItem = {
  user_id: number
  book_id: number
  quantity: number
}

export type CartItemWithBook = {
  book: {
    id: number
    title: string
    description: string
    image: string
    year: number
    page_count: number
    price: number
    publisher: string
    publication_place: string
    authors: [
      {
        id: number
        name: string
      }
    ]
    genres: [
      {
        id: number
        genre: string
      }
    ]
  }
  quantity: number
}
