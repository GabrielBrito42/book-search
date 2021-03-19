import React, { useState } from 'react'
import { map, get } from 'lodash'
import './Home.scss'

const Home = () => {
  const[search, setSearch] = useState('')
  const[books, setBooks] = useState([])
  const[isLoading, setIsloading] = useState()

  const handleInput = (e) => {
    setSearch(e.target.value)
  }

  const searchBooks = async() => {
    const url = `https://www.googleapis.com/books/v1/volumes?q=${search}`
    var myHeaders = new Headers();

    var myInit = { method: 'GET',
                  headers: myHeaders,
                  mode: 'cors',
                  cache: 'default' }

    setIsloading(true)
    setBooks([''])
    const response = await fetch(url, myInit).then(response => {
      setIsloading(false)
      return response.json()
    })
    setBooks(response)
  }

  return(
    <div className="home-container">
      <div className="container">
        <div className="row">
          <div className="col-12">
            <h1>Book Search</h1>
          </div>
        </div>
        <div className="row">
          <div className="col-12 center">
            <input type="text" name="name" value={search} onChange={(e) => handleInput(e)}/>
            <button type="button" className="btn btn-dark" onClick={searchBooks}>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-search" viewBox="0 0 16 16">
                <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
              </svg>
            </button>
          </div>
        </div>
        <br/>
        <div className="row">
          {books ? 
          <div className="col-12">
            {isLoading ? 
              <div className="spinner-border" role="status">
                <span className="sr-only">Loading...</span>
              </div>
            :
              ''
            }
            {map(get(books, 'items', ''), (values, index) => (
              <div className="col-12 border" key={index}>
                <div className="row">
                  <div className="col-2">
                    <a href={get(values, 'volumeInfo.previewLink', '')}>
                      <img src={get(values, 'volumeInfo.imageLinks.thumbnail', '')} alt="thumbnail"/>
                    </a>
                  </div>
                  <div className="col-8">
                    <p><span><b>Titulo: </b>{get(values, 'volumeInfo.title', '')}</span></p>
                    <p><span><b>Subtitulo:</b> {get(values, 'volumeInfo.subtitle', '')}</span></p>
                    <p><span><b>Autor:</b> {get(values, 'volumeInfo.authors[0]', '')}</span></p>
                  </div>
                </div>
                <p><span><b>Descrição:</b> {get(values, 'volumeInfo.description', '')}</span></p>
              </div>
            ))}
          </div>
          : ''}
        </div>
      </div>
    </div>
  )
}

export default Home