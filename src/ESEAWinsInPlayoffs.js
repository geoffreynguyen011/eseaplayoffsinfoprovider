import React from 'react'

class ESEAWinsInPlayoffs extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            currDiv: '',
            nextDiv: '',
            displayText: '',
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleClick = this.handleClick.bind(this)
    }

    componentDidMount() {
        
    }
    
    handleChange(event) {
        console.log(event.target.value);
        var division = document.getElementById("division");
        if (event.target.value === "currOpen") {
            division.innerHTML = "";
            var selectAnOption = document.createElement("option");
            selectAnOption.value = "";
            selectAnOption.selected = true;
            selectAnOption.disabled = true;
            var im = document.createElement("option");
            im.value = "intermediate";
            im.innerHTML = "Intermediate";
            var main = document.createElement("option");
            main.value = "main";
            main.innerHTML = "Main";
            var adv = document.createElement("option");
            adv.value = "advanced";
            adv.innerHTML = "Advanced";

            division.appendChild(selectAnOption);
            division.appendChild(im);
            division.appendChild(main);
            division.appendChild(adv);
            this.setState({ currDiv: "open", nextDiv: "" });
        }
        else if (event.target.value === "currIntermediate") {
            division.innerHTML = "";
            selectAnOption = document.createElement("option");
            selectAnOption.value = "";
            selectAnOption.selected = true;
            selectAnOption.disabled = true;
            main = document.createElement("option");
            main.value = "main";
            main.innerHTML = "Main"
            adv = document.createElement("option");
            adv.value = "advanced";
            adv.innerHTML = "Advanced";

            division.appendChild(selectAnOption);
            division.appendChild(main);
            division.appendChild(adv);
            this.setState({ currDiv: "intermediate", nextDiv: "" });
        }
        else if (event.target.value === "currMain") {
            selectAnOption = document.createElement("option");
            selectAnOption.value = "";
            selectAnOption.selected = true;
            selectAnOption.disabled = true;
            division.innerHTML = "";
            adv = document.createElement("option");
            adv.value = "advanced";
            adv.innerHTML = "Advanced";

            division.appendChild(selectAnOption);
            division.appendChild(adv);
            this.setState({ currDiv: "main", nextDiv: "" });
        }
        else if (event.target.value === "") {
            division.innerHTML = "";
            this.setState ({ currDiv: "", nextDiv: "" });
        }

        else if (event.target.value === "intermediate") {
            this.setState({ nextDiv: "intermediate" });
        }

        else if (event.target.value === "main") {
            this.setState({ nextDiv: "main" });
        }
        else if (event.target.value === "advanced") {
            this.setState({ nextDiv: "advanced" });
        }

        // const {name, value} = event.target
        // console.log(value);
        // this.setState({ 
        //     [name]: value
        // })
    }
    
    handleClick() {
        console.log(this.state.currDiv);
        if (this.state.currDiv === 'open') {
            if (this.state.nextDiv === 'intermediate') {
                this.setState({displayText: 'You need at least 1 win to make intermediate.' })    
            }
            else if (this.state.nextDiv === 'main') {
                this.setState({ displayText: 'You need at least 4 wins to make main.' })
            }
            else if (this.state.nextDiv === 'advanced') {
                this.setState({ displayText: 'You need to win open to make advanced.' })
            }
        }
        else if (this.state.currDiv === 'intermediate') {
            if (this.state.nextDiv === 'main') {
                this.setState({displayText: 'You need at least 1 win to make main.' })    
            }
            else if (this.state.nextDiv === 'advanced') {
                this.setState({ displayText: 'You need to win intermediate to make advanced.' })
            }
            else {
                this.setState({ displayText: 'Invalid selection: please choose main or advanced.' })
            }
        }
        else if (this.state.currDiv === 'main') {
            if (this.state.nextDiv === 'advanced') {
                this.setState({ displayText: 'You need to either win 3 upper round bracket matches or make the 5th round of lower bracket to make advanced.' })
            }
            else {
                this.setState({ displayText: 'Invalid selection: ' })
            }
        }
        else if (this.state.currDiv === 'advanced') {
            this.setState({ displayText: 'To move from advanced to MDL, the rules can be found here: ' })
        }
        else {
            this.setState({ displayText: 'Please select a current division and/or a desired division.' })
        }
    }
    
    render() {
        return (
            <div className="container pt-5">
                <h1>Fill out the following information to see how many wins you need to make your desired division.</h1>
                <br />
                <label>What division are you in?</label>
                <select 
                    type='text'
                    onChange={this.handleChange}
                    name='currDiv'
                    className="form-select"
                >
                    <option value=''>Select current division</option>
                    <option value='currOpen'>Open</option>
                    <option value='currIntermediate'>Intermediate</option>
                    <option value='currMain'>Main</option>
                </select>
                <br />
                <label>What division do you want to make?</label>
                    <select 
                        type='text'
                        onChange={this.handleChange}
                        name='nextDiv'
                        className="form-select"
                        id='division'
                    >
                    </select>
                    <br />
                    <button 
                    className="btn btn-primary"
                    onClick={this.handleClick}
                    >
                        Submit
                    </button>
                <div>
                    <h3>{this.state.displayText}</h3>
                </div>
            </div>

        )
    }
}


export default ESEAWinsInPlayoffs
