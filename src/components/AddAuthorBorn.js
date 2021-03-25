import React, { useState } from 'react'
import { useMutation } from '@apollo/client'
import { ALL_AUTHORS, EDIT_AUTHOR } from '../utils/queries'
import Select from 'react-select'

const AddAuthorBorn = ({ authors }) => {
  const [born, setBorn] = useState('')
  const [selectedOption, setSelectedOption] = useState(null)

  const options = authors.map((a) => ({ value: a.name, label: a.name }))

  const [updateAuthor] = useMutation(EDIT_AUTHOR, {
    refetchQueries: [{ query: ALL_AUTHORS }],
  })

  const submit = async (event) => {
    event.preventDefault()
    console.log(selectedOption)
    updateAuthor({
      variables: {
        name: selectedOption.value,
        born: parseInt(born),
      },
    })
    console.log('add book...')

    setSelectedOption(null)
    setBorn('')
  }

  return (
    <div>
      <form onSubmit={submit}>
        <div>
          <Select
            defaultValue={selectedOption}
            onChange={setSelectedOption}
            options={options}
          />
        </div>

        <div>
          Born
          <input
            type='number'
            value={born}
            onChange={({ target }) => setBorn(target.value)}
          />
        </div>
        <button type='submit'>update author</button>
      </form>
    </div>
  )
}

export default AddAuthorBorn
