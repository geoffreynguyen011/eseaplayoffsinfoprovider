import React from 'react'
class ESEAWinsInPlayoffs extends React.Component {
    constructor() {
        super()
        this.state = {
            currDiv: '',
            nextDiv: '',
            numWins: '',
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
        if (this.state.currDiv === 'open') {
            if (this.state.nextDiv === 'intermediate') {
                this.setState({
                    displayText: 'You need at least 1 win to make intermediate'
                })    
            }
            else if (this.state.nextDiv === 'main') {
                this.setState({ 
                    displayText: 'You need at least 4 wins to make main'
                })
            }
            else if (this.state.nextDiv === 'advanced') {
                this.setState({ 
                    displayText: 'You need to win open to make advanced'
                })
            }
            else {
                this.setState({ 
                    displayText: 'Invalid division'
                })
            }
        }
        else if (this.state.currDiv === 'intermediate') {
            if (this.state.nextDiv === 'main') {
                this.setState({
                    displayText: 'You need at least 1 win to make main'
                })    
            }
            else if (this.state.nextDiv === 'advanced') {
                this.setState({ 
                    displayText: 'You need to win intermediate to make advanced'
                })
            }
            else {
                this.setState({ 
                    displayText: 'Invalid division'
                })
            }
        }
        else if (this.state.currDiv === 'main') {
            if (this.state.nextDiv === 'advanced') {
                this.setState({ 
                    displayText: 'You need to either win 3 upper round bracket matches or make the 5th round of lower bracket.'
                })
            }
        }
    }
    
    render() {
        return (
            <main>
            <div>Choose what division you are in and what division you want to make:</div>
            <br />
                <form onSubmit={this.handleSubmit}>
                    <label>
                        <select 
                            type='text'
                            value={this.state.division}
                            onChange={this.handleChange}
                            name='currDiv'
                        >
                            <option value=''>Select current division</option>
                            <option value='open'>Open</option>
                            <option value='intermediate'>Intermediate</option>
                            <option value='main'>Main</option>
                            <option value='advanced'>Advanced</option>
                        </select>
                        <br />
                        <select 
                            type='text'
                            value={this.state.division}
                            onChange={this.handleChange}
                            name='nextDiv'
                        >
                            <option value=''>Select desired division</option>
                            <option value='open'>Open</option>
                            <option value='intermediate'>Intermediate</option>
                            <option value='main'>Main</option>
                            <option value='advanced'>Advanced</option>
                        </select>
                        <br />
                        <button>Submit</button>
                    </label>
                </form>
                <div>
                    <h3>{this.state.displayText}</h3>
                </div>
            </main>
        )
    }
}


export default ESEAWinsInPlayoffs
