import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Alert, Box, Button, Input, Label, Heading } from "theme-ui";
import { Layout } from "../components/layout";

const NewFlag = () => {
  const [error, setError] = useState<string>()
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    if (!data.flagName) return;
    fetch(`/api/flags/new`, {
      method: `POST`,
      body: JSON.stringify(data),
      headers: {
        "content-type": `application/json`,
      },
    })
      .then((res) => res.json())
      .then((body) => {
        if (body.error) {
          setError(body.error.message);
          return;
        }
        console.log(`response from API:`, body);
        reset();
      })
  };

  return (
    <Layout>
      <Heading
        sx={{
          my: 4,
        }}
      >
        New flag
      </Heading>
      { error && <Alert bg="red" mb={4}>{error}</Alert>}
      <Box as="form"
       sx={{maxWidth: 360}}
        onSubmit={handleSubmit(onSubmit)}
      >
        <Label htmlFor="flagName">Flag name</Label>
        <Input
          id="flagName"
          type="text"
          style={{ display: `block`, marginBottom: 16 }}
          {...register("flagName", { required: true, maxLength: 80 })}
        />

        <Button>Create</Button>
      </Box>
    </Layout>
  );
};

export default NewFlag;
