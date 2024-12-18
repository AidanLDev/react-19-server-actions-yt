import React, { useActionState } from "react";
import { submitNote } from "../actions";
import { INoteState } from "../types";

export default function CreateNote() {
  const initialNoteState: INoteState = {
    content: null,
  };

  const [state, formAction, isPending] = useActionState(
    submitNote,
    initialNoteState
  );

  if (isPending) {
    return <p>Loading...</p>;
  }

  return (
    <form action={formAction}>
      <input name="note" type="text" id="note" />
      <button type="submit">Add Note</button>
      {state?.content && <p>Note is: {state?.content}</p>}
      {state?.error && <p>Error! Something went wrong: {state?.error}</p>}
    </form>
  );
}
