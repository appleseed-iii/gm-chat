import { CeramicClient } from '@ceramicnetwork/http-client'
import { TileDocument } from '@ceramicnetwork/stream-tile'

const MAINNET_NODE_URL = "https://node1.orbis.club/";
const READ_ONLY_NODE = "https://gateway.ceramic.network";
// Connect to a Ceramic node
const ceramic = new CeramicClient(READ_ONLY_NODE);

// The `id` argument can be a stream ID (to load the latest version)
// or a commit ID (to load a specific version)
async function load(id: string) {
  return await TileDocument.load(ceramic, id)
}

/** loads a TileDocument from a deifferent node */
export const loadTile = async () => {
  const result = await load("kjzl6cwe1jw149yxhvdmgjll7kv2fyika86y1n5up5n0zuzmkwzc7pob60ac4js");
  console.log('result', result);
  return result;
}
