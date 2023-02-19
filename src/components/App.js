import "bootstrap/dist/css/bootstrap.min.css"
import NFT from "./NFT";
import css from "../styles/NFT.module.css"
import { Button } from "react-bootstrap";
import { useState } from "react";
import { AppConfig, UserSession, showConnect, openContractCall } from "@stacks/connect";
import { StacksTestnet } from "@stacks/network"
import { AnchorMode, PostConditionMode } from "@stacks/transactions";

function App() {

  const [activeAcc, setactiveAcc] = useState(null)
  let paths = []

  for (let i = 1; i <= 5; i++) {
    paths.push(require(`../images/${i}.png`))
  }

  const appConfig = new AppConfig(["store_write", "publish_data"])
  const userSession = new UserSession({ appConfig })



  async function buy() {
    let txSuccess = false;
    await openContractCall({
      network: new StacksTestnet(),
      anchorMode: AnchorMode.Any, // which type of block the tx should be mined in

      contractAddress: 'STHX419GRFVWP11SFHA77SM595884AVX09QTQEBD',
      contractName: 'nft',
      functionName: 'claim',
      functionArgs: [],

      postConditionMode: PostConditionMode.Deny,
      postConditions: [],

      onFinish: response => {
        console.log(response);
        txSuccess = true
      },
      onCancel: () => {
        txSuccess = false
      },
    });

    return txSuccess

  }

  async function connectWallet() {
    showConnect({
      appDetails: {
        name: "ignitus",
        icon: "null"
      },
      redirectTo: "/",
      onFinish: () => {
        let userData = userSession.loadUserData();
        console.log(userData);
        setactiveAcc(userData.profile.stxAddress.testnet)
      },
      userSession: userSession
    })
  }


  return (
    <div className="App">
      <div style={{ display: "flex", justifyContent: "space-between", }}>

        <h1 style={{ textAlign: "center", paddingTop: "1rem" }}>The NFT marketplace</h1>
        {
          activeAcc == null ?
            <Button style={{ margin: "1rem" }} onClick={connectWallet}>Connect Wallet</Button>
            :
            <div style={{ fontSize: "larger", margin: "1rem", backgroundColor: "rgba(0, 0, 0, 0.488)", minHeight: "3rem", minWidth: "20rem", display: "flex", alignItems: "center", justifyContent: "center", color: "black" }}>
              Account ID : <span>{activeAcc.slice(0, 10)}.....</span>
            </div>
        }
      </div>
      <div className={css.wrapper}>
        {
          paths.map((img, i) => {
            return <NFT src={img} buy={buy} key={i} />
          })
        }
      </div>

    </div>
  );
}

export default App;
