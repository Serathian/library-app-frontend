import React, { useEffect } from 'react'
import { useLazyQuery } from '@apollo/client'
import { USER_GENRE, ALL_BOOKS_GENRE } from '../utils/queries'

const Recommended = () => {
  const [getUserGenre, userGenreResult] = useLazyQuery(USER_GENRE)
  const [getAllBooksGenre, allBooksGenreResult] = useLazyQuery(ALL_BOOKS_GENRE)

  useEffect(() => {
    getUserGenre()
  }, [getUserGenre])

  useEffect(() => {
    if (userGenreResult.data) {
      getAllBooksGenre({
        variables: { genre: userGenreResult.data.me.favoriteGenre },
      })
    }
  }, [userGenreResult, getAllBooksGenre])

  if (
    userGenreResult.loading ||
    userGenreResult.data === undefined ||
    allBooksGenreResult.data === undefined
  ) {
    return <div>Loading...</div>
  }
  return (
    <div>
      {allBooksGenreResult.data.allBooks.map((b) => (
        <h4 key={b.id}>{b.title}</h4>
      ))}
    </div>
  )
}

export default Recommended
