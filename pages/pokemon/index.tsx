import React, { FC } from 'react'
import axios from 'axios'
import Layout from '../../components/Layout'

const pokemon: FC<any> = ({ details }) => {
  console.log(details)
  const img = (_id) => {
    let imgUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${_id}.png`
    return imgUrl
  }
  return (
    <Layout title={details.name}>
      <h1 className="text-4xl font-bold capitalize">{details.name}</h1>
      <img src={img(details.id)} alt={details.name} />
    </Layout>
  )
}

export default pokemon

export const getServerSideProps = async ({ query }) => {
  const id = query.id
  const { data } = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`)
  return {
    props: {
      details: data,
    },
  }
}
