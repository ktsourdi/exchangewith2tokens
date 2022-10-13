import React, { Component } from 'react';
import logo from './logo.png';
import './App.css';
import Web3 from 'web3';
import Navbar from './Navbar.js';
import Exchange from './Exchange.js';
import ReactDOM from 'react-dom';
import Button from 'react-bootstrap/Button';


class App extends Component {

  constructor(props) {
      super(props)
      this.state = {
        account: '',
        ethBalance: '0',
        message: 'Πατήστε για να συνδεθείτε με Metamask πορτοφόλι: '
      }
    }

    componentDidMount(){
      document.title = "TsourdiSwap"
    }


  async loadWeb3 () {
    if(window.ethereum) {
      window.web3 = new Web3(window.ethereum)
      await window.ethereum.enable()
    }
    else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider)
    }
    else {
      window.alert('')
    }
  }


  onClick = async () => { 

    ReactDOM.render(<Exchange />, document.getElementById('root'));
  };

  onClick2 = async () => { 
    await this.loadWeb3()
    const web3 = new Web3(window.web3.currentProvider);
    
    const accounts = await web3.eth.getAccounts()
    this.setState ({account: accounts[0]})
    const ethBalance = await web3.eth.getBalance(this.state.account)
    this.setState({ethBalance: ethBalance})

    this.setState({message:"Είστε συνδεδεμένος με το πορτοφόλι: "})
  };

  
  render() {
    return (
      <div>              
        <Navbar/>
          <div>
            <div className="row">
              <main role="main" className="col-lg-12 d-flex text-center">
                <div className="content mr-auto ml-auto">
                  <img src={logo} className="App-logo" alt="logo" />
                <h1>Κάντε ανταλλαγές νομισμάτων στο Tsourdi Swap</h1> <br/>
                <text>{this.state.message}{this.state.account}</text> &nbsp; &nbsp;
                  <Button variant="info" class="rounded-circle" 
                  onClick={this.onClick2}>Σύνδεση</Button><br/><br/>
                <text>Πατήστε για να κατευθυνθείτε στο ανταλλακτήριο: </text> &nbsp;
                  <Button variant="dark"  onClick={this.onClick} >Μετάβαση</Button>
              </div>
            </main>
          </div>
        </div>
      </div>
    );
  }
}

export default App;