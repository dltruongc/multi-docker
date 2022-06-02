import React, { useEffect, useState } from 'react'
import axios from 'axios'

export default function Fib() {
  const [data, setData] = useState({
    seenIndexes: [],
    values: {},
    index: ''
  })

  const fetchValues = async () => {
    const values = await axios.get('/api/values/current')
    setData((pre) => {
      return { ...pre, values: values.data.data }
    })
  }

  const fetchIndexes = async () => {
    const values = await axios.get('/api/values/all')
    setData((pre) => {
      return { ...pre, seenIndexes: values.data.data }
    })
  }

  useEffect(() => {
    fetchValues()
    fetchIndexes()
  }, [])

  const renderIndices = () => {
    return data.seenIndexes.map(({ number }) => number).join(', ')
  }

  const renderValues = () => {
    const entries = []

    for (let key in data.values) {
      entries.push(
        <div key={key}>
          For index {key} I calculated {data.values[key]}
        </div>
      )
    }

    return entries
  }

  const indexChangeHandler = (e) => {
    setData((pre) => ({ ...pre, index: e.target.value }))
  }

  const submitHandler = async (e) => {
    e.preventDefault()

    await axios.post('/api/values', { index: data.index })

    setData((pre) => ({ ...pre, index: '' }))
  }

  return (
    <div>
      <form onSubmit={submitHandler}>
        <label htmlFor="index">Enter your index:</label>
        <input
          type="number"
          name="index"
          id="index"
          value={data.index}
          onChange={indexChangeHandler}
        />
        <button type="submit">Submit</button>
      </form>
      <h3>Indices I have seen:</h3>
      {renderIndices()}
      <h3>Calculated values:</h3>
      {renderValues()}
    </div>
  )
}
