import React, { useState, useEffect } from 'react'
import { useMutation } from '@apollo/client'
import { CREATE_BOOK, ALL_BOOKS } from '../utils/queries'

const NewBook = ({ setPage, show }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [published, setPublished] = useState('')
  const [genre, setGenre] = useState('')
  const [genres, setGenres] = useState([])
  const [createBook, result] = useMutation(CREATE_BOOK, {
    refetchQueries: [{ query: ALL_BOOKS }],
  })
  useEffect(() => {
    if (result.data) {
      setPage('books')
    }
  }, [result.data, setPage])

  const submit = async (event) => {
    event.preventDefault()
    createBook({
      variables: {
        title,
        author,
        published: parseInt(published),
        genres,
      },
    })

    setTitle('')
    setPublished('')
    setAuthor('')
    setGenres([])
    setGenre('')
  }

  const addGenre = () => {
    if (genre.length > 0) {
      setGenres(genres.concat(genre))
      setGenre('')
    }
  }
  const removeGenre = (i) => {
    if (genres.length === 1) {
      setGenres([])
    } else {
      setGenres(genres.splice(i, 1))
    }
  }

  if (!show) {
    return null
  }
  return (
    <div>
      <form onSubmit={submit}>
        <div>
          title
          <input
            value={title}
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          author
          <input
            value={author}
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
          published
          <input
            type='number'
            value={published}
            onChange={({ target }) => setPublished(target.value)}
          />
        </div>
        <div>
          <input
            value={genre}
            onChange={({ target }) => setGenre(target.value)}
          />
          <button onClick={addGenre} type='button'>
            add genre
          </button>
        </div>
        <div>
          genres:{' '}
          {genres.length !== 0 ? (
            genres.map((g, i) => (
              <div key={i}>
                {g}{' '}
                <button type='button' onClick={(i) => removeGenre(i)}>
                  Remove
                </button>
              </div>
            ))
          ) : (
            <div>Enter a genre</div>
          )}
        </div>
        <button type='submit'>create book</button>
      </form>
    </div>
  )
}

export default NewBook
