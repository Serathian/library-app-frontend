import React, { useState } from 'react'
import { useQuery, useSubscription, useApolloClient } from '@apollo/client'
import { ALL_BOOKS, BOOK_ADDED } from '../utils/queries'
import Select from 'react-select'

const Books = ({ show }) => {
  const [selectedOption, setSelectedOption] = useState(null)

  const result = useQuery(ALL_BOOKS)
  const client = useApolloClient()
  const updateCacheWith = (addedBook) => {
    const includedIn = (set, object) => set.map((b) => b.id).includes(object.id)

    const dataInStore = client.readQuery({ query: ALL_BOOKS })
    if (!includedIn(dataInStore.allBooks, addedBook)) {
      client.writeQuery({
        query: ALL_BOOKS,
        data: { allBooks: dataInStore.allBooks.concat(addedBook) },
      })
    }
  }

  useSubscription(BOOK_ADDED, {
    onSubscriptionData: ({ subscriptionData }) => {
      const addedBook = subscriptionData.data.bookAdded
      updateCacheWith(addedBook)
    },
  })

  const getGenres = () => {
    let listOfGenres = ['Show All']

    result.data.allBooks.forEach((book) => {
      listOfGenres = [...listOfGenres, ...book.genres]
    })

    listOfGenres = [...new Set(listOfGenres)]

    return listOfGenres.map((g) => ({ value: g, label: g }))
  }

  if (!show) {
    return null
  } else {
    if (result.loading) {
      return <div>Loading...</div>
    }

    const filteredArray = () => {
      if (selectedOption !== null && selectedOption.value !== 'Show All') {
        return result.data.allBooks.filter((b) =>
          b.genres.includes(selectedOption.value)
        )
      }
      return result.data.allBooks
    }

    console.log('Filtered array: ', filteredArray())
    console.log('genres: ', getGenres())
    return (
      <div>
        <h2>books</h2>
        {selectedOption === null ? (
          <h4>showing all books</h4>
        ) : (
          <h4>filtering by genre {selectedOption.label}</h4>
        )}

        <table>
          <tbody>
            <tr>
              <th></th>
              <th>author</th>
              <th>published</th>
            </tr>
            {filteredArray().map((a) => (
              <tr key={a.id}>
                <td>{a.title}</td>
                <td>{a.author.name}</td>
                <td>{a.published}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <Select
          defaultValue={selectedOption}
          onChange={setSelectedOption}
          options={getGenres()}
        />
      </div>
    )
  }
}

export default Books
