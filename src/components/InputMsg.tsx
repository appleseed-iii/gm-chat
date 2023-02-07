import { useState } from "react";

export const InputMsg = ({orbis, setResyncChat}: {orbis: any; setResyncChat: any;}) => {
  const [msg, setMsg] = useState<string>();
  const [orbisRes, setOrbisRes] = useState<{status: number; doc: string; result: string}>();

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    console.log("submitted", e);
    console.log("current msg", msg);
    let res = await orbis.createPost({context: "gm", body: msg});
    console.log("response", res);
    setOrbisRes(res);
    setResyncChat(true);
    console.log("sending resyncchat")
  }

  return (
    <>
      <form onSubmit={(e) => handleSubmit(e)}>
        <div>
          <label htmlFor="send-msg">Send Msg:</label>

          <input
            type="text"
            id="send-msg"
            name="send-msg"
            required
            minLength={1}
            size={50}
            placeholder="say gm"
            onChange={(event) => setMsg(event.target.value)}
          />
        </div>
        <div>
          <button>Submit</button>
        </div>
      </form>
      {orbisRes && (
        <div>
          <p>{orbisRes.status}</p>
          <p>{orbisRes.result}</p>
          <p>{orbisRes.doc}</p>
        </div>
      )}
    </>
  )
}