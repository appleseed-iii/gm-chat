import { ConnectButton } from '@rainbow-me/rainbowkit'
import { useAccount } from 'wagmi'

import { Account } from '../components'
import { ChatBox } from '../components/ChatBox'
import { ConnectOrbis } from '../components/ConnectOrbis';


function Page() {
  const { isConnected } = useAccount()
  
  return (
    <>
      <h1>gm-chat</h1>

      {/* wagmi provider doesn't work with orbis :sob */}
      {/* <ConnectButton /> */}
      {isConnected && <Account />}
      <ConnectOrbis />
      {/* <ChatBox /> */}
    </>
  )
}

export default Page
