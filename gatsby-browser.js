import React from "react"

import { TestProvider } from "./src/context/testContext"

export const wrapRootElement = ({ element }) => (
    <TestProvider>{element}</TestProvider>
  )