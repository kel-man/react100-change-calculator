import React, { Component } from 'react';

class ChangeCard extends Component {
  render() {
    return(
      <div className='card well' style={{backgroundColor: '#f5f5f5', width: '22%', textAlign:'center', minHeight:'7em'}}>
        <div className='card-body'>
          <h4 className='card-title '>{this.props.title}</h4>
          <p className='card-text change' /*className={this.props.title}*/ name={this.props.title}>{this.props.amount}</p>
        </div>
      </div>
    )
  }
}
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      twenties: '',
      tens: "",
      fives: "",
      ones: "",
      quarters: "",
      dimes: "",
      nickels: "",
      pennies: "",
      message: "",
      change: "",
      paid: "",
      due: "",
      alert: ''
    }
    this.handleDue = this.handleDue.bind(this);
    this.handlePaid = this.handlePaid.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    var change = [this.state];
    var paid = this.state.paid;
    var due = this.state.due;
    var difference = ((paid - due)*100).toFixed(2);
    let twenties = Math.floor(difference/2000);
    let tens = Math.floor(difference%2000/1000);
    let fives = Math.floor(difference%1000/500);
    let ones = Math.floor(difference%500/100);
    let quarters = Math.floor(difference%100/25);
    let dimes = Math.floor(difference%25/10);
    let nickels = Math.floor((difference-(twenties*2000)-(tens*1000)-(fives*500)-(ones*100)-(quarters*25)-(dimes*10))/5);
     console.log(change);

    this.setState({
      change: (paid-due).toFixed(2),
      twenties: twenties,
      tens: tens,
      fives: fives,
      ones: ones,
      quarters : quarters,
      dimes : dimes,
      nickels: nickels,
      pennies : Math.ceil(difference%5/1)
    })
    if (difference > 0){
      this.setState({
        message: 'The total change due is ',
        alert: 'alert alert-success'
      })
    }
    else {
      this.setState({
        message: 'Additional money owed.',
        alert: 'alert alert-danger'
      })
    }
  }

  handleDue(e) {
    this.setState({
      due : e.target.value
    });
  }

  handlePaid(e) {
    this.setState({
      paid : e.target.value
    });
  }

  render() {
    return(
      <div>
        <h1 style={{color:'white', padding:'20px'}}>Change Calculator</h1>
        <hr style={{borderTop:'3px solid white'}}/>
        <div style={{display:'flex', justifyContent:'space-around'}}>
          <div className='card bg-light mb-3' style={{width:'30%'}}>
            <div className='card-header'>Enter information</div>
              <form onSubmit={this.handleSubmit} className='card-body'>
                <div className='form-group'>
                  <label>How much is due?</label>
                  <input name='amountDue' type='number' className='due form-control' value={this.state.due} onChange={this.handleDue} placeholder='Balance due: '/>
                </div>
                <div className='form-group'>
                  <label>How much was received?</label>
                  <input name='amountReceived' type='number' className='paid form-control' value={this.state.paid} onChange={this.handlePaid} placeholder='Amount tendered: '/>
                </div>
                  <button type='submit' className='btn btn-primary' style={{width:'100%'}}>Calculate</button>
              </form>
          </div>
          
          <div className='card' style={{width:'60%'}}>
            <div className='card-header' name='changeDue totalChange alert' className={(this.state.alert)} style={{textAlign:'center', color:'black'}}>
              <h4 className='alert-heading'>{(this.state.message)}${(this.state.change)}</h4>
            </div>
            <div style={{display:'flex', flexFlow:'row wrap', justifyContent:'space-around', alignContent:'space-around', height:'100%'}}>
              <ChangeCard name='Twenties' title='Twenties' amount={this.state.twenties}/>
              <ChangeCard name='Tens' title='Tens ' amount={this.state.tens}/>
              <ChangeCard name='Fives' title='Fives ' amount={this.state.fives}/>
              <ChangeCard name='Ones' title='Ones' amount={this.state.ones}/>
              <ChangeCard name='Quarters' title='Quarters' amount={this.state.quarters}/>
              <ChangeCard name='Dimes' title='Dimes' amount={this.state.dimes}/>
              <ChangeCard name='Nickels' title='Nickels' amount={this.state.nickels}/>
              <ChangeCard name='Pennies' title='Pennies' amount={this.state.pennies}/>
            </div>
          </div>
        </div>
      </div>
  )}
}

export default App;
