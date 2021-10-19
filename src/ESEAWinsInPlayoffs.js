import React from 'react'

class ESEAWinsInPlayoffs extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            currDiv: '',
            nextDiv: '',
            numWins: '',
            displayText: ''
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    componentDidMount() {
        
    }
    
    handleChange(event) {
        const {name, value} = event.target
        // console.log(value);
        this.setState({ 
            [name]: value
        })
    }
    
    handleSubmit(event) {
        event.preventDefault()
        if (this.state.currDiv === 'open') {
            if (this.state.nextDiv === 'intermediate') {
                this.setState({displayText: 'You need at least 1 win to make intermediate' })    
            }
            else if (this.state.nextDiv === 'main') {
                this.setState({ displayText: 'You need at least 4 wins to make main' })
            }
            else if (this.state.nextDiv === 'advanced') {
                this.setState({ displayText: 'You need to win open to make advanced' })
            }
            else {
                this.setState({ displayText: 'Invalid division' }) }
        }
        else if (this.state.currDiv === 'intermediate') {
            if (this.state.nextDiv === 'main') {
                this.setState({displayText: 'You need at least 1 win to make main' })    
            }
            else if (this.state.nextDiv === 'advanced') {
                this.setState({ displayText: 'You need to win intermediate to make advanced' })
            }
            else {
                this.setState({ displayText: 'Invalid division' })
            }
        }
        else if (this.state.currDiv === 'main') {
            if (this.state.nextDiv === 'advanced') {
                this.setState({ displayText: 'You need to either win 3 upper round bracket matches or make the 5th round of lower bracket.' })
            }
            else {
                this.setState({ displayText: 'Invalid division' })
            }
        }
        else if (this.state.currDiv === 'advanced') {
            this.setState({ displayText: 'To move from advanced to MDL, the rules can be found here: ' })
        }
        else {
            this.setState({ displayText: 'Please select a current division and/or a desired division' })
        }
    }
    
    render() {
        return (
            <div className="container pt-5">
                <h1>Fill out the following information to see how many wins you need to make your desired division.</h1>
                <br />
                <form onSubmit={this.handleSubmit}>
                    <label>What division are you in?</label>
                    <select 
                        type='text'
                        onChange={this.handleChange}
                        name='currDiv'
                        className="form-select"
                    >
                        <option value=''>Select current division</option>
                        <option value='open'>Open</option>
                        <option value='intermediate'>Intermediate</option>
                        <option value='main'>Main</option>
                        <option value='advanced'>Advanced</option>
                    </select>
                    <br />
                    <label>What division do you want to make?</label>
                        <select 
                            type='text'
                            onChange={this.handleChange}
                            name='nextDiv'
                            className="form-select"
                        >
                            <option value=''>Select desired division</option>
                            <option value='open'>Open</option>
                            <option value='intermediate'>Intermediate</option>
                            <option value='main'>Main</option>
                            <option value='advanced'>Advanced</option>
                        </select>
                        <br />
                        <button className="btn btn-primary">Submit</button>
                </form>
                <div>
                    <h3>{this.state.displayText}</h3>
                </div>
            </div>

        )
    }
}


export default ESEAWinsInPlayoffs
