import React, { useEffect, useState } from 'react'
import { useApolloClient } from '@apollo/client'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import LoginForm from './components/LoginForm'
import Recommended from './components/Recommended'

const App = () => {
  const [page, setPage] = useState('authors')
  const [token, setToken] = useState(null)
  const client = useApolloClient()

  useEffect(() => {
    if (token === null) {
      const storageToken = localStorage.getItem('books-user-token')
      if (storageToken) {
        setToken(storageToken)
      }
    }
  }, [token])

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
          <>
            <button onClick={() => setPage('add')}>add book</button>
            <button onClick={() => setPage('recommend')}>recommended</button>
            <button onClick={() => handleLogout()}>Logout</button>
          </>
        )}
        {token === null && (
          <button onClick={() => setPage('login')}>login</button>
        )}
      </div>
      <div>
        {page === 'recommend' ? (
          <Recommended show={page === 'recommend'} />
        ) : null}

        <LoginForm show={page === 'login'} handleLogin={handleLogin} />
        <Authors show={page === 'authors'} />
        <Books show={page === 'books'} />
        <NewBook show={page === 'add'} setPage={setPage} />
      </div>
    </div>
  )
}

export default App
