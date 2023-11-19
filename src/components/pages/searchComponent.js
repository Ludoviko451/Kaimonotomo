import React from 'react'
import './searchComponent.css'
const searchComponent = () => {
  return (

    <header>
    <div className='search-bar'>
          <img loading="lazy" srcset="https://cdn.builder.io/api/v1/image/assets/TEMP/c060c197-bf0b-4711-a04f-2fd8e55355fe?apiKey=65389d7fce93477e9980a2b2c102c353&width=100 100w, https://cdn.builder.io/api/v1/image/assets/TEMP/c060c197-bf0b-4711-a04f-2fd8e55355fe?apiKey=65389d7fce93477e9980a2b2c102c353&width=200 200w, https://cdn.builder.io/api/v1/image/assets/TEMP/c060c197-bf0b-4711-a04f-2fd8e55355fe?apiKey=65389d7fce93477e9980a2b2c102c353&width=400 400w, https://cdn.builder.io/api/v1/image/assets/TEMP/c060c197-bf0b-4711-a04f-2fd8e55355fe?apiKey=65389d7fce93477e9980a2b2c102c353&width=800 800w, https://cdn.builder.io/api/v1/image/assets/TEMP/c060c197-bf0b-4711-a04f-2fd8e55355fe?apiKey=65389d7fce93477e9980a2b2c102c353&width=1200 1200w, https://cdn.builder.io/api/v1/image/assets/TEMP/c060c197-bf0b-4711-a04f-2fd8e55355fe?apiKey=65389d7fce93477e9980a2b2c102c353&width=1600 1600w, https://cdn.builder.io/api/v1/image/assets/TEMP/c060c197-bf0b-4711-a04f-2fd8e55355fe?apiKey=65389d7fce93477e9980a2b2c102c353&width=2000 2000w, https://cdn.builder.io/api/v1/image/assets/TEMP/c060c197-bf0b-4711-a04f-2fd8e55355fe?apiKey=65389d7fce93477e9980a2b2c102c353& "className="img-2" />
          <div>
            <input type="text" placeholder="Buscar..." class="search-input"></input>
            <button class="search-button">Buscar</button>
        </div>
        <img loading="lazy" src="https://cdn.builder.io/api/v1/image/assets/TEMP/c92e6091-cb14-4592-8436-d43333f112e7?apiKey=65389d7fce93477e9980a2b2c102c353&" className="img-4" />

    </div>
    </header>
  )
}

export default searchComponent