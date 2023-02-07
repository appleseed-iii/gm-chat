import { useEffect, useRef, useState } from "react";
import { InputMsg } from "./InputMsg"

interface ICreatorDetails {
  metadata: {
    address: string;
    chain: string;
    ensName?: string;
  };
  profile: {
    pfp: string;
    username: string;
    description?: string;
  };
}

interface IPost {
  stream_id: string;
  creator_details: ICreatorDetails
  content: {body: string};
  creator: string;
  timestamp: number;
}
export const ChatBox = ({orbis, resyncChat, setResyncChat}: {orbis: any; resyncChat: boolean; setResyncChat: any;}) => {
  const [posts, setPosts] = useState<IPost[]>();
  const pendingRef = useRef(false);

  useEffect(() => {
    const queryPosts = async () => {
      console.log("querying");
      const res = await orbis.getPosts({ context: "gm" });
      // const doc = await loadTile();
      // console.log("content", doc.content)
      console.log("resdata", res.data);
      setPosts(res.data);
      setResyncChat(false);
    }
    if (orbis) queryPosts();
  }, [orbis, setResyncChat])

  useEffect(() => {
    const queryPosts = async () => {
      pendingRef.current = true;
      console.log("queryin pending ref");
      window.setTimeout(async() => {
        console.log("timeout");
        const res = await orbis.getPosts({ context: "gm" });
        // const doc = await loadTile();
        // console.log("content", doc.content)
        console.log("resdata", res.data);
        pendingRef.current = false;
        setPosts(res.data);
        setResyncChat(false);
      }, 1000)
      
    }
    if (orbis && resyncChat && !pendingRef.current) queryPosts();
  }, [orbis, resyncChat, setResyncChat])

  const dateFromUnixTimestamp = (unix_timestamp: number) => {
    const a = new Date(unix_timestamp * 1000);
    // Hours part from the timestamp
    const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    const year = a.getFullYear();
    const month = months[a.getMonth()];
    const date = a.getDate();
    const hour = a.getHours();
    const min = a.getMinutes();
    const sec = a.getSeconds();
    const time = date + ' ' + month + ' ' + year + ' ' + hour + ':' + min + ':' + sec ;
    return time;
  }

  return (
    <>
      <h2>{`gm's:`}</h2>
      {resyncChat && (<p>... resyncing ...</p>)}
      {posts && posts.length > 0 && posts.map((post) => {
        return (
          <div key={post.stream_id}>
            <p>{post.content.body} at {dateFromUnixTimestamp(post.timestamp)}</p>
            <p>from: {post.creator_details.metadata.address}</p>
            <hr />
          </div>
        )
      })}
    </>
  )
}