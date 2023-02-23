import Button from "react-bootstrap/Button";
import "bootstrap/dist/css/bootstrap.css";
import Form from "react-bootstrap/Form";
import { useState } from "react";
import AppCss from "../styles/App.module.css";
import axios from "axios";
import { ethers } from "ethers";

// address : 0x05c4e5be145409Bc48b1686B8E56751b2DcD3810
const contractAddress = "0xc4955914F1bDa695e3746257d58399c042D8a43c";
const provider = new ethers.providers.Web3Provider(window.ethereum);
const abi = ["function mint( address _recepient, string memory _hash) public"];
const contract = new ethers.Contract(contractAddress, abi, provider);
const signer = contract.connect(provider.getSigner());
const jwt =
  "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiI3OWUyYWJjOS02NmEyLTQ5MjYtYTIxMS04YjJmMDA3MzIyMTQiLCJlbWFpbCI6ImRpdnllc2hsYWx3YW5pMTNAZ21haWwuY29tIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsInBpbl9wb2xpY3kiOnsicmVnaW9ucyI6W3siaWQiOiJGUkExIiwiZGVzaXJlZFJlcGxpY2F0aW9uQ291bnQiOjF9LHsiaWQiOiJOWUMxIiwiZGVzaXJlZFJlcGxpY2F0aW9uQ291bnQiOjF9XSwidmVyc2lvbiI6MX0sIm1mYV9lbmFibGVkIjpmYWxzZSwic3RhdHVzIjoiQUNUSVZFIn0sImF1dGhlbnRpY2F0aW9uVHlwZSI6InNjb3BlZEtleSIsInNjb3BlZEtleUtleSI6IjY0MWE5MGZlMjI2NWRiNzYwZDE3Iiwic2NvcGVkS2V5U2VjcmV0IjoiYzgyN2FhOTM4MmMwZTg3MTBiMjg1NTc0ZDg1Yjc5N2M0MDhmMjhjYTc4OGViNDE3MWQzNDg2Y2UzOTdkZmI2OSIsImlhdCI6MTY3MjQwNTg4OX0.Ly1YIV9PvIuiVFZqtHg27f3KbisVJ1FnLL7Ujfadof8";

function App() {
  const [selectedFile, setselectedFile] = useState();
  const [address, setaddress] = useState();
  const [activeAcc, setactiveAcc] = useState(false);

  async function PinToIpfs(e) {
    e.preventDefault();
    const formData = new FormData();
    formData.append("file", selectedFile);
    const metadata = JSON.stringify({
      name: "test",
    });
    formData.append("pinataMetadata", metadata);
    const options = JSON.stringify({
      cidVersion: 0,
    });
    formData.append("pinataOptions", options);

    let ipfsHash = "";

    try {
      const res = await axios.post(
        "https://api.pinata.cloud/pinning/pinFileToIPFS",
        formData,
        {
          maxBodyLength: "Infinity",
          headers: {
            "Content-Type": `multipart/form-data; boundary=${formData._boundary}`,
            Authorization: jwt,
          },
        }
      );
      console.log(res.data);
      ipfsHash = res.data.IpfsHash;
      mint(ipfsHash);
    } catch (error) {
      console.log(error);
    }
  }

  async function mint(hash) {
    try {
      await signer.mint(address, hash);
    } catch (e) {
      console.log(e);
    }
  }

  async function connect() {
    try {
      const res = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      setactiveAcc(res[0]);
      console.log(res);
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <div className={AppCss.app}>
      {activeAcc ? (
        <div className={AppCss.acc}>{activeAcc.slice(0,15)}....</div>
      ) : (
        <Button className={AppCss.wallet} onClick={connect}>
          Connect wallet
        </Button>
      )}

      <div className={AppCss.addCandidateContainer}>
        <h1 className={AppCss.head}>Add new candidate</h1>
        <Form>
          <input
            className={AppCss.file}
            type="file"
            onChange={(e) => setselectedFile(e.target.files[0])}
          />
          <Form.Control
            className={AppCss.recep}
            placeholder="Enter receipient address"
            onChange={(e) => setaddress(e.target.value)}
          />
          <Button
            className={AppCss.submitBtn}
            type="submit"
            variant="primary"
            onClick={(e) => PinToIpfs(e)}
          >
            Mint
          </Button>
        </Form>
      </div>
    </div>
  );
}

export default App;
