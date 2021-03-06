import React from 'react'
import { useQuery } from '@apollo/client'
import { ALL_AUTHORS } from '../utils/queries'
import AddAuthorBorn from './AddAuthorBorn'

const Authors = (props) => {
  const result = useQuery(ALL_AUTHORS)

  if (!props.show) {
    return null
  } else if (result.loading) {
    return <div>Loading...</div>
  }
  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
          {result.data.allAuthors.map((a) => (
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born === null ? 'data missing' : a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <AddAuthorBorn authors={result.data.allAuthors} />
    </div>
  )
}

export default Authors
