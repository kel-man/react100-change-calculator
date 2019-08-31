import React, { Component } from 'react';
class ChangeCard extends Component {
  render() {
    return(
      <div className='card' style={{backgroundColor: '#f5f5f5', width: '22%', textAlign:'center', minHeight:'7em'}}>
        <div className='card-body'>
          <h4 className='card-title'>{this.props.title}</h4>
          <p className='card-text'>{this.props.amount}</p>
        </div>
      </div>
    )
  }
}

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      paid: "",
      due: "",
      twenties: "",
      tens: "",
      fives: "",
      ones: "",
      quarters: "",
      dimes: "",
      nickels: "",
      pennies: ""
    }
    this.handleDue = this.handleDue.bind(this);
    this.handlePaid = this.handlePaid.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    let paid = this.state.paid;
    let due = this.state.due;
    let difference = (paid - due)*100;
    this.setState({
      twenties: Math.floor(difference/2000),
      tens: Math.floor((difference % 2000)/1000),
      fives: Math.floor((difference %1000)/500),
      ones: Math.floor((difference%500)/100),
      quarters : Math.floor((difference % 100) / 25),
      dimes : Math.floor((difference % 25) / 10),
      nickels: Math.floor((difference%10)/5),
      pennies : Math.ceil((difference % 5) / 1)
    })
    console.log(this.state);
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
              <input type='number' className='due form-control' value={this.state.due} onChange={this.handleDue} placeholder='Balance due: '/>
            </div>
            <div className='form-group'>
              <label>How much was received?</label>
              <input type='number' className='paid form-control' value={this.state.paid} onChange={this.handlePaid} placeholder='Amount tendered: '/>
            </div>
              <button type='submit' className='btn btn-primary' style={{width:'100%'}}>Calculate</button>
          </form>
        </div>

        <div className='card' style={{width:'60%'}}>
          <div className='card-header' style={{textAlign:'center', color:'green'}}>The total change due is ${this.state.paid-this.state.due}</div>
          <div style={{display:'flex', flexFlow:'row wrap', justifyContent:'space-around', alignContent:'space-around', height:'100%'}}>
            <ChangeCard title='Twenties' amount={this.state.twenties}/>
            <ChangeCard title='Tens ' amount={this.state.tens}/>
            <ChangeCard title='Fives ' amount={this.state.fives}/>
            <ChangeCard title='Ones' amount={this.state.ones}/>
            <ChangeCard title='Quarters' amount={this.state.quarters}/>
            <ChangeCard title='Dimes' amount={this.state.dimes}/>
            <ChangeCard title='Nickels' amount={this.state.nickels}/>
            <ChangeCard title='Pennies' amount={this.state.pennies}/>
          </div>
        </div>
      </div>
      </div>
    )
  }
}

export default App;
