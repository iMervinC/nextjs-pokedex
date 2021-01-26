import axios from 'axios'
import React, { FC, useEffect } from 'react'
import Link from 'next/link'
import Layout from '../components/Layout'

interface Pokemon {
  details: {
    name: string
    url: string
    id: string
    img: string
  }[]
}

const Home: FC<Pokemon> = ({ details }) => {
  return (
    <Layout title="Next Js Pokedex">
      <h1>Next Js Pokedex</h1>
      <ul className="flex gap-2 flex-col">
        {details.map((pokemon, index) => (
          <li key={index}>
            <Link href={`/pokemon?id=${pokemon.id}`}>
              <a className="p-4 w-auto h-20 bg-black flex items-center justify-around rounded-md">
                <p className="capitalize text-yellow-50">{pokemon.name}</p>
                <img className="h-full" src={pokemon.img} alt={pokemon.name} />
              </a>
            </Link>
          </li>
        ))}
      </ul>
    </Layout>
  )
}
export default Home

export const getStaticProps = async () => {
  const getIdUrl = (url) => {
    const splitUrl = url.split('/').splice(-2, 1).toString()
    return splitUrl
  }

  const img = (_id) => {
    let imgUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${_id}.png`
    return imgUrl
  }

  const { data } = await axios.get(
    'https://pokeapi.co/api/v2/pokemon?limit=151'
  )
  const { results } = data
  const details = results.map((pokemon) => {
    const _id = getIdUrl(pokemon.url)
    return {
      ...pokemon,
      id: _id,
      img: img(_id),
    }
  })

  return {
    props: {
      details: details,
    },
  }
}
