import { GatsbyFunctionRequest, GatsbyFunctionResponse } from "gatsby"
import fauna, { query, Client } from 'faunadb'
import { v4 as uuidv4 } from "uuid"
import { FaunaResponse, FlagModel } from "../../types/flags"

interface UserFlags {
    userId: string
    flags: UserFlag
    created: string
}

interface UserFlag {
    [name:string]: boolean
}

const secret = process.env.FAUNADB_SECRET

const client = new Client({
  secret,
  domain: process.env.FAUNADB_DOMAIN
})

const { Create, Collection } = query

const userFlagsCollection = Collection("userFlags")

const requestHandler = async (
  req: GatsbyFunctionRequest,
  res: GatsbyFunctionResponse
) => {
  if(!secret) {
    return res.status(500).json({
      message: "Fauna DB secret not set"
    })
  }
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'really?' })
  }

  const userId = uuidv4()

  // get existing flags
  const existingFlagsQuery: FaunaResponse<FaunaResponse<FlagModel>[]> =
  await client.query(
    fauna.Map(
      fauna.Paginate(fauna.Match(fauna.Index("allFlags"))),
      fauna.Lambda("ref", fauna.Get(fauna.Var("ref")))
    )
  );

  const newFlags = existingFlagsQuery.data
      .map(({ data }) => ({
        [data.name]: Math.random() < 0.5, // In an ideal world, this would be round robin style!
      }))
      .reduce((obj, current) => {
        return {
          ...obj,
          ...current,
        };
      }, {});

  const newUserData: UserFlags = {
      userId,
      flags: newFlags,
    created: new Date().toISOString(),
  }

  try {
    await client.query(Create(userFlagsCollection, {
      data: newUserData
     }))

  }catch(error) {
    console.log(error)
    return res.status(error.status || 500).json({
      error
    })
  }

  console.log(`created new user`)
  res.json(newUserData)
}

export default requestHandler