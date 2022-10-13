import React, { Component } from 'react';
import Navbar from './Navbar.js';
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Button from 'react-bootstrap/Button';
import web3 from './web3';
import ReactDOM from 'react-dom';
import token1 from './Token1';
import Pool from './Pool.js';
import VoteSol from './VoteSol.js';
import Exchange from './Exchange.js';
import App from './App';



class Vote extends Component {

    constructor(props) {
        super(props)
        this.state = {
          account: '',
          btcVotes: 0,
          ethVotes: 0,
          dogeVotes: 0
        };
        this.revealVotes = this.revealVotes.bind(this);
       
      }

    voteBitcoin = async () => {

      const accounts = await web3.eth.getAccounts();
      this.setState ({account: accounts[0]});


      if(this.state.account === undefined) {
        alert("Δεν έχετε συνδέσει κάποιο πορτοφόλι,  \nΘα μεταβείτε στην σελίδα σύνδεσης.")
        ReactDOM.render(<App />, document.getElementById('root'));
      }        
        
        else {

          const balance = await token1.methods.balanceOf(accounts[0]).call()

          if(balance/1000000000000000000 < 20){
              alert("Έχετε λιγότερα από 20 Token1.")
          }
          else {
              VoteSol.methods.voteForCandidate(0).send(
                  {
                      from: accounts[0]
                  }
              );
          }
        }
    }   

    voteEthereum = async () => {

      const accounts = await web3.eth.getAccounts();
      this.setState ({account: accounts[0]});


      if(this.state.account === undefined) {
        alert("Δεν έχετε συνδέσει κάποιο πορτοφόλι,  \nΘα μεταβείτε στην σελίδα σύνδεσης.")
        ReactDOM.render(<App />, document.getElementById('root'));
      }        
        
        else {
          
          const balance = await token1.methods.balanceOf(accounts[0]).call()

          if(balance/1000000000000000000 < 20){
              alert("Έχετε λιγότερα από 20 TSRD Tokens.")
          }
          else {
              VoteSol.methods.voteForCandidate(1).send(
                  {
                      from: accounts[0]
                  }
              );
          }
        }
    }   

    voteDoge = async () => {

      const accounts = await web3.eth.getAccounts();
      this.setState ({account: accounts[0]});


      if(this.state.account === undefined) {
        alert("Δεν έχετε συνδέσει κάποιο πορτοφόλι,  \nΘα μεταβείτε στην σελίδα σύνδεσης.")
        ReactDOM.render(<App />, document.getElementById('root'));
      }        
        
        else {
                    
          const balance = await token1.methods.balanceOf(accounts[0]).call()

          if(balance/1000000000000000000 < 20){
              alert("Έχετε λιγότερα από 20 TSRD Tokens.")
          }
          else {
              VoteSol.methods.voteForCandidate(2).send(
                  {
                      from: accounts[0]
                  }
              );
          }
        }
    }   

    revealVotes = async ()  => {
        const _btcVotes = await VoteSol.methods.totalVotesFor(0).call()
        this.setState({btcVotes: _btcVotes})

        const _ethVotes = await VoteSol.methods.totalVotesFor(1).call()
        this.setState({ethVotes: _ethVotes})

        const _dogeVotes = await VoteSol.methods.totalVotesFor(2).call()
        this.setState({dogeVotes: _dogeVotes})

        alert("Ψήφοι για Bitcoin: " + this.state.btcVotes + 
        "\nΨήφοι για Ethereum: " + this.state.ethVotes + 
        "\nΨήφοι για Doge: " + this.state.dogeVotes)
    }


    
    render() {

    return (
      <div>              
        <Navbar account={this.state.account}/>
          <div>
              <main role="main" className="col-lg-12 d-flex text-center align-items-center h-100" style={{paddingTop: 80}}>
                <div className="content mr-auto ml-auto" >
                  <Card
                    style={{
                      width: 600,
                      height: 600
                    }}
                  >
                     <Button 
                        onClick={ () => {ReactDOM.render(<Exchange />, document.getElementById('root'))}}
                        variant="light" 
                        size="lg"
                        style={{
                          width: 200
                        }}>SWAP</Button>
                    <Button 
                        onClick={() => {ReactDOM.render(<Pool />, document.getElementById('root'))}}
                        variant="light" 
                        size="lg"
                        style={{
                          width: 200
                        }}>POOL</Button>
                    <Button 
                        onClick={() => {ReactDOM.render(<Vote />, document.getElementById('root'))}}
                        variant="info" 
                        size="lg"
                        style={{
                          width: 200
                        }}>VOTE</Button>
                    <CardContent>
                      <Typography variant="h4" component="h2">
                        Ψηφοφορίες
                      </Typography>
                      <Typography
                        style={{
                          marginBottom: 12,
                        }}
                        color="textSecondary"
                      >
                        Για να ψηφίσετε πρέπει να έχετε τουλάχιστον 20 Token1.
                      </Typography><br/>
                      <div class="form-group">
                        <div class="row align-items-center">
                          <div class="col-sm">
                           <h4>Ποιο κρυπτονόμισμα προτιμάτε; </h4> <br/>
                          </div>
                          <div class="col-sm" style={{padding: 20}}>
                            <Button 
                                onClick={this.voteBitcoin}
                                variant="warning" 
                                size="lg"
                                style={{
                                width: 400
                                }}>Bitcoin
                            </Button>
                          
                          </div>
                          <div class="col-sm" style={{padding: 20}}>
                            <Button 
                                onClick={this.voteEthereum}
                                variant="info" 
                                size="lg"
                                style={{
                                width: 400,
                              
                                }}>Ethereum
                            </Button>
                          
                          </div>
                          <div class="col-sm" style={{padding: 20}}>
                            <Button 
                                onClick={this.voteDoge}
                                variant="dark" 
                                size="lg"
                                style={{
                                width: 400,
                              
                                }}>DogeCoin
                            </Button>
                        
                          </div>
                        </div>
                        </div>
                        <div class="row">
                           
                            <div class="col-sm">
                            <Button 
                                onClick={this.revealVotes}
                                variant="outline-success" 
                                size="md"
                                style={{
                                width: 250,
                                }}>Δείτε τις ψήφους.
                            </Button>
                            </div>
                        </div>
                        
                    </CardContent>
                  </Card>
              </div>
            </main>
          </div>
      </div>
    );
    }
}
export default Vote;

