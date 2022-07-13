import React, { Component } from "react";
import Web3 from "web3";
import detectEthereumProvider from "@metamask/detect-provider";
import KryptoBird from "../abis/Kryptobird.json";

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
    this.setState({ account: accounts });

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
          kryptoBirdz: [...this.state.kryptoBirdz, receipt],
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
        <h1>NFT Marketplace</h1>
      </div>
    );
  }
}

export default App;
