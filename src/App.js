import React, { useState } from 'react'
import { useApolloClient } from '@apollo/client'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import LoginForm from './components/LoginForm'

const App = () => {
  const [page, setPage] = useState('authors')
  const [token, setToken] = useState(null)
  const client = useApolloClient()

  const handleLogin = (token) => {
    setToken(token)
    setPage('authors')
  }

  const handleLogout = () => {
    setToken(null)
    localStorage.clear()
    client.resetStore()
  }

  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        {token !== null && (
          <button onClick={() => setPage('add')}>add book</button>
        )}
        {token === null && (
          <button onClick={() => setPage('login')}>login</button>
        )}
        {token !== null && (
          <button onClick={() => handleLogout()}>Logout</button>
        )}
      </div>
      <LoginForm show={page === 'login'} handleLogin={handleLogin} />

      <Authors show={page === 'authors'} />

      <Books show={page === 'books'} />

      <NewBook show={page === 'add'} />
    </div>
  )
}

export default App
