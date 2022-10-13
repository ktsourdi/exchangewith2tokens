import React, { Component } from 'react';
import Navbar from './Navbar.js';
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Button from 'react-bootstrap/Button';
import Dropdown from 'react-bootstrap/Dropdown';
import Icon from "react-crypto-icons";
import _exchange from './ExchangeSol.js';
import web3 from './web3';
import ReactDOM from 'react-dom';
import App from './App';
import Pool from './Pool.js';
import Vote from './Vote.js';
 

class Exchange extends Component {

    constructor(props) {
        super(props)
        this.state = {
          account: '',
          ethBalance: '0',
          value1: '',
          value2: '',
          value3: '',
          token: 'Επιλέξτε νόμισμα',
          token2: 'Επιλέξτε νόμισμα',
          token3: 'Επιλέξτε νόμισμα',
          rate: [],
          selectedRate1: '',
          selectedRate2: '',
          firstAddress: '',
          secondAddress: '',
          thirdAddress: ''
        };
        this.onChange1 = this.onChange1.bind(this);
        this.onChange2 = this.onChange2.bind(this);
        this.onChange3 = this.onChange3.bind(this);

      }

      updateRates = async () => {
        const rate1 = await _exchange.methods.returnRate().call()/1000000000000000000;
        this.state.rate[0] = rate1;
      }


      onChange1(e){
        
        const re = /^[0-9]*([.][0-9]*)?$/;
        if (e.target.value === '' || re.test(e.target.value)) {
           this.setState({value1: e.target.value})
        }

        if(this.state.token === "Token1" && this.state.token2 === "Token2") {
          this.setState({value2: e.target.value*this.state.rate}, 
            () => {console.log(this.state.value2)}
            )
        }

        if(this.state.token === "Token2" && this.state.token2 === "Token1") {
          this.setState({value2: e.target.value/this.state.rate}, 
            () => {console.log(this.state.value2)}
            )
        }

        if(this.state.token ===  this.state.token2 && this.state.token!=='Επιλέξτε νόμισμα') {
          this.setState({value2: e.target.value}, 
            () => {console.log(this.state.value2)}
            )
        }
      }

     

     onChange2(e){

      const re = /^[0-9]*([.][0-9]*)?$/;
      if (e.target.value === '' || re.test(e.target.value)) {
         this.setState({value2: e.target.value})
      }

      if(this.state.token === "Token1" && this.state.token2 === "Token2") {
        this.setState({value1: e.target.value*this.state.rate}, 
          () => {console.log(this.state.value2)}
          )
      }

      if(this.state.token === "Token2" && this.state.token2 === "Token1") {
        this.setState({value1: e.target.value/this.state.rate}, 
          () => {console.log(this.state.value2)}
          )
      }

      if(this.state.token ===  this.state.token2 && this.state.token2!=='Επιλέξτε νόμισμα') {
        this.setState({value1: e.target.value}, 
          () => {console.log(this.state.value2)}
          )
      }
    }  

    onChange3(e){
      
      const re = /^[0-9]*([.][0-9]*)?$/;
      if (e.target.value === '' || re.test(e.target.value)) {
         this.setState({value3: e.target.value})
      }
    } 

    change(token) {
      this.setState({token:token})
    };

    change2(token) {
      this.setState({token2:token})
    };

    change3(token) {
      this.setState({token3:token})
    }

    
    onclick = async () => {

      const accounts = await web3.eth.getAccounts();
      this.setState ({account: accounts[0]});

      if(this.state.token ==='Token1') {this.setState({firstAddress:'0xca3b9A3F84Bad262637720e1c71f6eA9fa37B48a'})}
      if(this.state.token ==='Token2') {this.setState({firstAddress:'0x933b201c88C01Ae6D7b0BdAE777A91e7730BA73B'})}

      if(this.state.token2 ==='Token1') {this.setState({secondAddress:'0xca3b9A3F84Bad262637720e1c71f6eA9fa37B48a'})}
      if(this.state.token2 ==='Token2') {this.setState({secondAddress:'0x933b201c88C01Ae6D7b0BdAE777A91e7730BA73B'})}


      if(this.state.account === undefined) {
        alert("Δεν έχετε συνδέσει κάποιο πορτοφόλι,  \nΘα μεταβείτε στην σελίδα σύνδεσης.")
        ReactDOM.render(<App />, document.getElementById('root'));
      }
      else if(this.state.token === 'Επιλέξτε νόμισμα' || this.state.token2 === 'Επιλέξτε νόμισμα') {
        alert("Παρακαλώ επιλέξτε νομίσματα.")
        } else if (this.state.token ===  this.state.token2){
          alert("Επιλέξτε διαφορετικά νομίσματα.")
        }
      else if(this.state.value1 === '' || this.state.value2 === '') {
        alert("Παρακαλώ ορίστε ποσότητα νομισμάτων.")
      }
      else if(isNaN(parseFloat(this.state.value1)) || isNaN(parseFloat(this.state.value2))) {
        alert("Οι τιμές δεν συμπληρώθηκαν σωστά.")
      }
     
     

      else {

          await _exchange.methods.swap(
            web3.utils.toChecksumAddress(this.state.firstAddress),
            web3.utils.toChecksumAddress(this.state.secondAddress),
            web3.utils.toWei(String(this.state.value1, 'ether')),
            web3.utils.toWei(String(this.state.value2, 'ether'))
            ).send({
              from:accounts[0]
            });
      }
    }


    onclick2 = async () => {

      
      const accounts = await web3.eth.getAccounts();
      this.setState ({account: accounts[0]});


      if(this.state.token3 === 'Επιλέξτε νόμισμα') {
        alert("Επιλέξτε νόμισμα")
      }
      else if(this.state.value3 === '' ) {
        alert("Συμπληρώστε την νέα ισοτιμία.")
      }
   
      else {
        var answer = window.confirm("Θέλετε να αλλάξετε την ισοτιμία του "
        + this.state.token3 +
        " σε σχέση με το Token1 σε: " +
        this.state.value3 + 
        ";");
        if (answer) {
            _exchange.methods.changeRate(web3.utils.toWei(String(this.state.value3, 'ether'))).send({
              from:accounts[0]
            })
          }
      }
    }



    render() {
    this.updateRates();
    
    let isotimia;
    if(this.state.token !== 'Επιλέξτε νόμισμα' && this.state.token2 !== 'Επιλέξτε νόμισμα') {
      isotimia = <h6>Με 1 Token1 παίρνετε {this.state.rate} Token2 </h6>
    }

    return (
      <div>              
        <Navbar account={this.state.account}/>
            <div>
              <main role="main" className="col-lg-12 d-flex 
                     text-center align-items-center h-100"
                     style={{paddingTop: 80}}>
                <div className="content mr-auto ml-auto">
                  <Card
                    style={{
                      width: 600,
                      height: 550,
                    }}
                  >
                    <Button 
                        onClick={() => {ReactDOM.render(<Exchange />, 
                        document.getElementById('root'))}}
                        variant="info" 
                        size="lg"
                        style={{
                          width: 200
                        }}>SWAP</Button>
                    <Button 
                        onClick={() => {ReactDOM.render(<Pool />, 
                        document.getElementById('root'))}}
                        variant="light" 
                        size="lg"
                        style={{
                          width: 200
                        }}>POOL</Button>
                    <Button 
                        onClick={() => {ReactDOM.render(<Vote />, 
                        document.getElementById('root'))}}
                        variant="light" 
                        size="lg"
                        style={{
                          width: 200
                        }}>VOTE</Button>
                    <CardContent>
                      <Typography variant="h4" component="h2">
                        Συναλλαγή
                      </Typography>
                      <Typography
                        style={{
                          marginBottom: 12,
                        }}
                        color="textSecondary"
                      >
                        Επιλέξτε συνδιασμό νομισμάτων:
                      </Typography>
                      <div class="form-group">
                        <div class="row align-items-center">
                          <div class="col-sm">
                            <input 
                            name= 'input1'
                            value={this.state.value1} 
                            onChange={this.onChange1}
                            placeholder="0.0"
                            style={{
                              margin: 20,
                              borderRadius:20,
                              height: 100,
                              width: 300
                            }}/> <br/>
                          </div>
                          <div class="col-sm">
                            <Dropdown>
                              <Dropdown.Toggle
                               variant="success" 
                               id="dropdown-basic"
                               style={{
                                width: 160
                               }}
                               >
                                <text>{this.state.token}</text>
                              </Dropdown.Toggle>
                              <Dropdown.Menu>
                                <Dropdown.Item onSelect={()=> (this.setState({value1: ''}),
                                  this.change("Token1"), this.setState({selectedRate1:0}))}>
                                  <Icon name="Token1" size={25} /> Token1 </Dropdown.Item>
                                <Dropdown.Item onSelect={()=> (this.setState({value1: ''}),
                                  this.change("Token2"), this.setState({selectedRate1:1}))}>
                                  <Icon name="Token2" size={25} /> Token2 </Dropdown.Item>
                              </Dropdown.Menu>
                            </Dropdown>
                          </div>
                        </div>
                        <div class="row align-items-center">
                          <div class="col-sm">
                            <input 
                            name= 'input2'
                            value={this.state.value2} 
                            onChange={this.onChange2}
                            placeholder="0.0"
                            style={{
                              margin: 20,
                              borderRadius:20,
                              height: 100,
                              width: 300
                            }} />
                          </div>
                          <div class="col-sm">
                            <Dropdown>
                              <Dropdown.Toggle 
                              variant="success" 
                              id="dropdown-basic"
                              style={{
                                width: 160
                               }}>
                              <text>{this.state.token2}</text>
                              </Dropdown.Toggle>
                              <Dropdown.Menu>
                                <Dropdown.Item onSelect={()=> (this.setState({value2: ''}),
                                  this.change2("Token1"), this.setState({selectedRate2:0}))}>
                                  <Icon name="Token1" size={25} /> Token1 </Dropdown.Item>
                                <Dropdown.Item onSelect={()=> (this.setState({value2: ''}),
                                  this.change2("Token2"), 
                                  this.setState({selectedRate2:1}))}>
                                  <Icon name="Token2" size={25} /> Token2 </Dropdown.Item>
                              </Dropdown.Menu>
                            </Dropdown>
                          </div>
                        </div>
                        {isotimia}
                      </div>
                    </CardContent>
                      <div className="d-grid gap-2">
                        <Button 
                        onClick={this.onclick}
                        variant="dark" 
                        size="lg"
                        style={{
                          width: 400
                        }}>Συναλλαγή</Button>
                      </div>
                  </Card>

                  <Card
                    style={{
                      width: 600,
                      height: 300,
                      marginTop: 20,
                      marginBottom: 20
                    }}
                    >
                      <h4>Αλλαγή ισοτιμίας.</h4>
                      <h6>Η ενέργεια επιτρέπεται μόνο από τον κάτοχο του συμβολαίου.</h6>
                      <h6>Πόσα Token2 αντιστοιχούν σε 1 Token1:</h6>
                      <div class="row align-items-center">
                          <div class="col-sm">
                            <input 
                            name= 'input3'
                            value={this.state.value3} 
                            onChange={this.onChange3}
                            placeholder="Νέα ισοτιμία."
                            style={{
                              margin: 20,
                              borderRadius:20,
                              height: 100,
                              width: 300
                            }} />
                          </div>
                          <div class="col-sm">
                            <Dropdown>
                              <Dropdown.Toggle 
                              variant="success" 
                              id="dropdown-basic"
                              style={{
                                width: 160
                               }}>
                              <text>Token2</text>
                              </Dropdown.Toggle>
                              <Dropdown.Menu>
                                <Dropdown.Item onSelect={()=> (this.setState({value2: ''}),
                                  this.change3("Token2"))}>
                                  <Icon name="Token2" size={25} /> Token2 </Dropdown.Item>
                              </Dropdown.Menu>
                            </Dropdown>
                          </div>
                          <div class="col-sm">
                          <div className="d-grid gap-2">
                            <Button 
                            onClick={this.onclick2}
                            variant="warning" 
                            size="md"
                            style={{
                              width: 400
                            }}>Αλλαγή ισοτιμίας</Button>
                          </div>
                          </div>
                        </div>

                  </Card>
              </div>
            </main>
          </div>
        </div>
    );
    }
}
export default Exchange;

