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
    console.log(this.state.account, "okk");
  }

  constructor(props) {
    super(props);
    this.state = {
      account: "",
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
            <l className="nav-item text-nowrap d-none d-sm-none d-sm-block">
              <small className="text-white">{this.state.account}</small>
            </l>
          </ul>
        </nav>
        <h1>NFT Marketplace</h1>
      </div>
    );
  }
}

export default App;
