import React, { useEffect, useState } from 'react'
import { useApolloClient } from '@apollo/client'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import LoginForm from './components/LoginForm'
import Recommended from './components/Recommended'
import Navigation from './components/Navigation'

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
      <Navigation token={token} setPage={setPage} handleLogout={handleLogout} />
      <div className='page-wrapper'>
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
