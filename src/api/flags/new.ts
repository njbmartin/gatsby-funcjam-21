import { GatsbyFunctionRequest, GatsbyFunctionResponse } from "gatsby"
import { query, Client } from 'faunadb'
import { v4 as uuidv4 } from "uuid"
import { kebabCase } from "lodash"

import { FlagModel } from "../../types/flags"

const secret = process.env.FAUNADB_SECRET

const client = new Client({
  secret,
  domain: process.env.FAUNADB_DOMAIN
})

const { Create, Collection } = query

const flagCollection = Collection("flags")

const requestHandler = async (
  req: GatsbyFunctionRequest,
  res: GatsbyFunctionResponse
) => {
  if(!secret) {
    return res.status(500).json({
      message: "FaunaDB secret not set"
    })
  }
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'really?' })
  }

  const { flagName } = req.body

  if(!flagName) {
    return res.status(422).json({
      error: "flagName parameter is missing" 
    })
  }

  const newFlag: FlagModel = {
    name: kebabCase(flagName),
    created: new Date().toISOString(),
    id: uuidv4()
  }

  try {
    await client.query(Create(flagCollection, {
      data: newFlag
     }))

  }catch(error) {
    console.log(error)
    return res.status(error.status || 500).json({
      error
    })
  }

  console.log(`submitted form`, req.body)
  res.json(`flag is created!`)
}

export default requestHandler