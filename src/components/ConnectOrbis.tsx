import { Web3Provider } from "@ethersproject/providers";
import { Orbis } from "@orbisclub/orbis-sdk";
import { useEffect, useState } from "react";
import { useSigner } from "wagmi";
import { ChatBox } from "./ChatBox";
import { InputMsg } from "./InputMsg";

let orbis = new Orbis();

export const ConnectOrbis = () => {
  // const provider = useProvider();
  const { data: signer } = useSigner();
  /** The user object */
	const [user, setUser] = useState();
	const [resyncChat, setResyncChat] = useState(false);
  
  useEffect(() => {
    console.log("useEffect", user);
    const checkOrbis = async () => {
      console.log("checking orbis");
      let res = await orbis.isConnected();
      console.log("orbis res", res);
      setUser(res.did)
    }
    if (!user) {
      checkOrbis();
    }
    console.log("useEffect end", user);
  }, [user])

  /** Calls the Orbis SDK and handle the results */
	async function connect() {
    // let res = await orbis.connect(signer?.provider as Web3Provider);
    let res = await orbis.connect(window.ethereum);
    // let res = await orbis.connect_v2({
    //   provider: window.ethereum,
    //   lit: false

		/** Check if connection is successful or not */
		if(res.status == 200) {
			setUser(res.did);
		} else {
			console.log("Error connecting to Ceramic: ", res);
			alert("Error connecting to Ceramic.");
		}
	}

  const handleLogout = async () => {
    await orbis.logout();
    window.location.reload();
  }

  return (
    <div>
      {user ?
        <>
          <p>Connected with: {user}</p>
          <button onClick={() => handleLogout()}>Logout</button>
          <h2>Say gm</h2>
          <InputMsg orbis={orbis} setResyncChat={setResyncChat} />
        </>
			: signer ?
				<button onClick={() => connect()}>Connect to say gm</button>
			: <button onClick={() => connect()}>Connect to say gm</button>
      }

      <ChatBox orbis={orbis} resyncChat={resyncChat} setResyncChat={setResyncChat} />

    </div>
  )
}