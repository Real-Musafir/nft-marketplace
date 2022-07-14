import React, { Component } from "react";
import Web3 from "web3";
import detectEthereumProvider from "@metamask/detect-provider";
import KryptoBird from "../abis/Kryptobird.json";
import {
  MDBCard,
  MDBCardBody,
  MDBCardTitle,
  MDBCardText,
  MDBCardImage,
  MDBBtn,
} from "mdb-react-ui-kit";

class App extends Component {
  async componentDidMount() {
    await this.loadWeb3();
    await this.loadBlockchainData();
  }
  // first up is to detect ethereum provider
  async loadWeb3() {
    const provider = await detectEthereumProvider();

    if (provider) {
      window.web3 = new Web3(provider);
    } else {
      console.log("No ethereum provider");
    }
  }

  async loadBlockchainData() {
    const web3 = window.web3;
    const accounts = await web3.eth.getAccounts();
    this.setState({ account: accounts[0] });

    // create a constant js valriable networkId Which
    // is set to blockchain network id
    const networkId = await web3.eth.net.getId();
    const networkData = KryptoBird.networks[networkId];

    if (networkData) {
      const abi = KryptoBird.abi;
      const address = networkData.address;
      const contract = new web3.eth.Contract(abi, address);

      this.setState({ contract });
      console.log(this.state.contract, "okk");

      // call the total supply of our Krypto Bird
      // grab the total supply on the front end and log the result
      const totalSupply = await contract.methods.totalSupply().call();
      this.setState({ totalSupply });

      // set up an array to keep track ot tokens
      //load KryptoBird
      for (let i = 1; i <= totalSupply; i++) {
        const KryptoBird = await contract.methods.kryptoBirdz(i - 1).call();
        // how should we handle the state on the frontend?
        this.setState({
          kryptoBirdz: [...this.state.kryptoBirdz, KryptoBird],
        });
        console.log(this.state.kryptoBirdz, "KryptoBird");
      }
    } else {
      window.alert("Smart Contract not deployed");
    }
  }

  // with minting we are sending information and we
  // need to specify the account

  mint = (kryptoBird) => {
    this.state.contract.methods
      .mint(kryptoBird)
      .send({ from: this.state.account })
      .once("receipt", (receipt) => {
        this.setState({
          kryptoBirdz: [...this.state.kryptoBirdz, kryptoBird],
        });
      });
  };

  constructor(props) {
    super(props);
    this.state = {
      account: "",
      contract: null,
      totalSupply: 0,
      kryptoBirdz: [],
    };
  }

  render() {
    return (
      <div>
        {console.log(this.state.kryptoBirdz)}
        <nav
          className="navbar navbar-dark fixed-top bg-dark flex-md-nowrap p-0 shadow 
         "
          style={{ color: "white" }}
        >
          <div className="navbar-brand col-sm-3 col-md-3 mr-0">
            KryptoBird NFTs (Non Fungible Tokens)
          </div>
          <ul className="navbar-nav px-3">
            <li className="nav-item text-nowrap d-none d-sm-none d-sm-block">
              <small className="text-white">{this.state.account}</small>
            </li>
          </ul>
        </nav>

        <div className="container-fluid mt-1">
          <div className="row">
            <main role="main" className="col-lg-12 d-flex text-center">
              <div
                className="content mr-auto ml-auto"
                style={{ opacity: "0.8" }}
              >
                <h1 style={{ color: "white" }}>
                  KryptoBirdz - NFT Marketplace
                </h1>

                <form
                  onSubmit={(event) => {
                    event.preventDefault();
                    const kryptoBird = this.kryptoBird.value;
                    this.mint(kryptoBird);
                  }}
                >
                  <input
                    type="text"
                    placeholder="Add a file location"
                    className="form-control mb-1"
                    ref={(input) => (this.kryptoBird = input)}
                  />
                  <input
                    type="submit"
                    className="btn btn-primary btn-black"
                    value="MINT"
                  />
                </form>
              </div>
            </main>
          </div>

          <hr></hr>
          <div className="row textCenter">
            {this.state.kryptoBirdz.map((kryptoBird, key) => {
              return (
                <div>
                  <div>
                    <MDBCard
                      className="token img"
                      style={{ maxWidth: "22rem" }}
                    />
                    <MDBCardImage
                      src={kryptoBird}
                      position="top"
                      style={{ marginRight: "4px" }}
                      height="250rem"
                    />
                    <MDBCardBody>
                      <MDBCardTitle>KrypToBird</MDBCardTitle>
                      <MDBCardText>
                        The kryptoBird are 20 uniquely genarated KBird from the
                        cyberpunk cloud galaxy Mystopia! There is only one of
                        each bird and each bird can be owned by a single person
                        on the etherum blockchanin
                      </MDBCardText>
                      <MDBBtn href={kryptoBird}>Download</MDBBtn>
                    </MDBCardBody>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }
}

export default App;
