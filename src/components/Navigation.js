import React from 'react'

const Navigation = ({ token, setPage, handleLogout }) => {
  return (
    <div className='navigation'>
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
  )
}

export default Navigation
