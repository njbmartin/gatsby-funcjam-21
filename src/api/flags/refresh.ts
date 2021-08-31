import { GatsbyFunctionRequest, GatsbyFunctionResponse } from "gatsby";
import fauna, { query, Client, Paginate } from "faunadb";

import {
  FaunaResponse,
  FlagModel,
  UserFlag,
  UserFlags,
} from "../../types/flags";

const secret = process.env.FAUNADB_SECRET;

const client = new Client({
  secret: process.env.FAUNADB_SECRET,
  domain: process.env.FAUNADB_DOMAIN,
});

const { Match, Index, Get } = query;

const requestHandler = async (
  req: GatsbyFunctionRequest,
  res: GatsbyFunctionResponse
) => {
  if (!secret) {
    return res.status(500).json({
      message: "FaunaDB secret not set",
    });
  }
  if (req.method !== "GET") {
    return res.status(405).json({ message: "really?" });
  }

  const { userId } = req.query;

  if (!userId) {
    return res.status(422).json({
      error: "userId parameter is missing",
    });
  }
  try {
    const existingFlagsQuery: FaunaResponse<FaunaResponse<FlagModel>[]> =
      await client.query(
        fauna.Map(
          Paginate(Match(Index("allFlags"))),
          fauna.Lambda("ref", Get(fauna.Var("ref")))
        )
      );

    const userFlagResponse: FaunaResponse<UserFlags> = await client.query(
      Get(Match(Index("userFlags"), userId))
    );

    const { flags } = userFlagResponse.data;

    const missingFlags = existingFlagsQuery.data
      .filter(({ data }) => !Object.keys(flags).includes(data.name))
      .map(({ data }) => ({
        [data.name]: Math.random() < 0.5, // In an ideal world, this would be round robin style!
      }))
      .reduce((obj, current) => {
        return {
          ...obj,
          ...current,
        };
      }, {});

    const combinedFlags: UserFlag = {
      ...flags,
      ...missingFlags,
    };

    const updatedUserFlags: UserFlags = {
      ...userFlagResponse.data,
      flags: combinedFlags,
    };
    // update fields
    await client.query(
      fauna.Update(userFlagResponse.ref, {
        data: updatedUserFlags,
      })
    );

    res.json(updatedUserFlags);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

export default requestHandler;
