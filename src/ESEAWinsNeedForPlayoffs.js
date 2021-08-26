import React from 'react'

class ESEAWinsNeedForPlayoffs extends React.Component {
    
    constructor() {
        super()
        this.state = {
            numWins: '',
            division: '',
            madeOrNot: '',
            displayText: ''
        }
        
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }
    
    handleChange(event) {
        const {name, value} = event.target
        this.setState({ 
            [name]: value
        })
    }
    
    handleSubmit(event) {
        event.preventDefault()
        if (this.state.division === '' || this.state.numWins === '') {
            this.setState({ displayText: 'Please select a division and/or the number of wins'})
        }
        else if (this.state.division === 'open') {
            if (this.state.numWins === '' || this.state.numWins === '0' || this.state.numWins === '1' ||
            this.state.numWins === '2' || this.state.numWins === '3' || this.state.numWins === '4' ||
            this.state.numWins === '5' || this.state.numWins === '6' ||this.state.numWins === '7' || this.state.numWins === '8') {
                this.setState({ displayText: 'Did not make playoffs' })
            }
            else if (this.state.numWins === '9' || this.state.numWins === '10') {
                this.setState({ displayText: 'Good chance of making playoffs' })
            }
            else {
                this.setState({ displayText: 'Made playoffs!' })
            }
        }
        else if (this.state.division === 'intermediate') {
            if (this.state.numWins === '' || this.state.numWins === '0' || this.state.numWins === '1' ||
            this.state.numWins === '2' || this.state.numWins === '3' || this.state.numWins === '4' ||
            this.state.numWins === '5' || this.state.numWins === '6' || this.state.numWins === '7' ||
            this.state.numWins === '8' || this.state.numWins === '9') {
                this.setState({ displayText: 'Did not make playoffs' })
            }
            else if (this.state.numWins === '10') {
                this.setState({ displayText: 'Good chance of making playoffs' })
            }
            else {
                this.setState({ displayText: 'Made playoffs!'})
            }
        }
        else if (this.state.division === 'main') {
            if (this.state.numWins === '' || this.state.numWins === '0' || this.state.numWins === '1' ||
            this.state.numWins === '2' || this.state.numWins === '3' || this.state.numWins === '4' ||
            this.state.numWins === '5' || this.state.numWins === '6' || this.state.numWins === '7' ||
            this.state.numWins === '8' || this.state.numWins === '9') {
                this.setState({ displayText: 'Did not make playoffs' })
            }
            else if (this.state.numWins === '10') {
                this.setState({ displayText: 'Good chance of making playoffs' })
            }
            else {
                this.setState({ displayText: 'Made playoffs!' })
            }
        }
        else if (this.state.division === 'advanced') {
            if (this.state.numWins === '' ||  this.state.numWins === '0' ||this.state.numWins === '1' ||
            this.state.numWins === '2' || this.state.numWins === '3' || this.state.numWins === '4' ||
            this.state.numWins === '5' || this.state.numWins === '6' || this.state.numWins === '7' || this.state.numWins === '8') {
                this.setState({ displayText: 'Did not make playoffs' })
            }
            else if (this.state.numWins === '9' || this.state.numWins === '10' ) {
                this.setState({ displayText: 'Good chance of making playoffs' })
            }
            else {
                this.setState({ displayText: 'Made playoffs!' })
            }
        }
    }
    
    
  render() {
    return (
      <div className='container pt-5'>
        <h3>Choose your current division and how many wins you have:</h3>
        <form className='info-form' onSubmit={this.handleSubmit}>
            <label>
                <select 
                    type='text'
                    value={this.state.division}
                    onChange={this.handleChange}
                    name='division'
                    class="form-select"
                >
                    <option value=''>Select division</option>
                    <option value='open'>Open</option>
                    <option value='intermediate'>Intermediate</option>
                    <option value='main'>Main</option>
                    <option value='advanced'>Advanced</option>
                </select>
                <br />
                <select
                    type='text'
                    name='numWins'
                    value={this.state.numWins}
                    onChange={this.handleChange}
                    class="form-select"
                >
                    <option value=''>Select wins</option>
                    <option value='16'>16</option>
                    <option value='15'>15</option>
                    <option value='14'>14</option>
                    <option value='13'>13</option>
                    <option value='12'>12</option>
                    <option value='11'>11</option>
                    <option value='10'>10</option>
                    <option value='9'>9</option>
                    <option value='8'>8</option>
                    <option value='7'>7</option>
                    <option value='6'>6</option>
                    <option value='5'>5</option>
                    <option value='4'>4</option>
                    <option value='3'>3</option>
                    <option value='2'>2</option>
                    <option value='1'>1</option>
                    <option value='0'>0</option>
                </select>
                
                <br />
                <button class="btn btn-primary">Submit</button>
                <div>
                    <h3 className="pt-3">{this.state.displayText}</h3>
                </div>
            </label>
        </form>
        
      </div>
    );
  }
}

export default ESEAWinsNeedForPlayoffs
