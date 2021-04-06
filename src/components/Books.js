import React, { useState } from 'react'
import { useQuery, useSubscription, useApolloClient } from '@apollo/client'
import { ALL_BOOKS, BOOK_ADDED } from '../utils/queries'

const Books = (props) => {
  const [filter, setFilter] = useState(null)
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

  if (!props.show) {
    return null
  } else {
    if (result.loading) {
      return <div>Loading...</div>
    }

    const filteredArray = () => {
      if (filter !== null) {
        return result.data.allBooks.filter((b) => b.genres.includes(filter))
      }
      return result.data.allBooks
    }

    return (
      <div>
        <h2>books</h2>
        {filter === null ? (
          <h4>showing all books</h4>
        ) : (
          <h4>filtering by genre {filter}</h4>
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
        <button onClick={() => setFilter('One')}>One</button>
        <button onClick={() => setFilter(null)}>all genres</button>
      </div>
    )
  }
}

export default Books
