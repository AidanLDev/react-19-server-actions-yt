"use server";

import { INoteState } from "./types";
import {
  DynamoDBClient,
  PutItemCommand,
  PutItemCommandInput,
} from "@aws-sdk/client-dynamodb";
import { v4 as uuidv4 } from "uuid";

export async function submitNote(prevState: INoteState, formData: FormData) {
  const newNote = formData.get("note") as string;

  if (!newNote) {
    return {
      error: "No note, please include a note next time you submit sir/madam",
      content: null,
    };
  }

  const dynamoDBClient = new DynamoDBClient({
    credentials: {
      accessKeyId: process.env.REACT_APP_AWS_ACCESS_KEY_ID!,
      secretAccessKey: process.env.REACT_APP_AWS_SECRET_ACCESS_KEY!,
    },
    region: process.env.REACT_APP_AWS_REGION,
  });

  const putItemInput: PutItemCommandInput = {
    TableName: process.env.REACT_APP_AWS_NOTES_TABLE!,
    Item: {
      Id: { S: uuidv4() },
      Note: { S: newNote },
    },
  };

  try {
    const putItemCommand = new PutItemCommand(putItemInput);
    const putItemResponse = await dynamoDBClient.send(putItemCommand);

    if (putItemResponse?.$metadata.httpStatusCode !== 200) {
      return {
        content: null,
        error: "Issue with putItem DB request, status code !== 200",
      };
    }
    return {
      content: newNote,
    };
  } catch (err) {
    return {
      content: null,
      error: `Error when submitting note to the DB ${err}`,
    };
  }
}
