import React, { useState, useEffect } from 'react'
import { useMutation } from '@apollo/client'
import { LOGIN } from '../utils/queries'

const LoginForm = ({ show, handleLogin, setError }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const [login, result] = useMutation(LOGIN, {
    onError: (error) => {
      console.log(error.graphQLErrors[0].message)
    },
  })

  useEffect(() => {
    if (result.data) {
      const token = result.data.login.value
      handleLogin(token)
      localStorage.setItem('books-user-token', token)
    }
  }, [result.data, handleLogin])

  const submit = async (event) => {
    event.preventDefault()

    login({ variables: { username, password } })
  }
  if (show) {
    return (
      <div>
        <form onSubmit={submit}>
          <div>
            username{' '}
            <input
              value={username}
              onChange={({ target }) => setUsername(target.value)}
            />
          </div>
          <div>
            password{' '}
            <input
              type='password'
              value={password}
              onChange={({ target }) => setPassword(target.value)}
            />
          </div>
          <button type='submit'>login</button>
        </form>
      </div>
    )
  } else {
    return null
  }
}

export default LoginForm
