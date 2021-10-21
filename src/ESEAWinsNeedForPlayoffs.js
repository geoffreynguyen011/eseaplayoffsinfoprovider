import React from 'react'
import openTeams from "./openTeams.txt";
import imTeams from "./imTeams.txt";
import mainTeams from "./mainTeams.txt";
import advTeams from "./advTeams.txt";

class ESEAWinsNeedForPlayoffs extends React.Component {
    
    constructor() {
        super()
        this.state = {
            numWins: '',
            division: '',
            madeOrNot: '',
            displayText: '',
            teamName: "",
            openTeamsArr: [],
            imTeamsArr: [],
            mainTeamsArr: [],
            advTeamsArr: [],
            isInPlayoffs: "",
            wins: 0,
            losses: 0
        }
        
        this.handleChange = this.handleChange.bind(this)
        this.handleClick = this.handleClick.bind(this)
    }
    
    handleChange(event) {
        if (!(event.target.value === "open" || event.target.value === "intermediate" || event.target.value === "main" || event.target.value === "advanced")) {
            this.setState({ teamName: event.target.value });
        }
        else {
            document.getElementById("input").value = "";
            if (event.target.value === "open") {
                var teams = document.getElementById("teams");
                if (teams.options.length > 0) {
                    teams.innerHTML = "none";
                }
                for (var i = 0; i < this.state.openTeamsArr.length; i++) {
                    var option = document.createElement("option");
                    option.value = this.state.openTeamsArr[i][1];
                    teams.appendChild(option);
                }
                this.setState({ division: "open" });
            }
            else if (event.target.value === "intermediate") {
                teams = document.getElementById("teams");
                if (teams.options.length > 0) {
                    teams.innerHTML = "none";
                }
                for (i = 0; i < this.state.imTeamsArr.length; i++) {
                    option = document.createElement("option");
                    option.value = this.state.imTeamsArr[i][1];
                    teams.appendChild(option);
                }
                this.setState({ division: "intermediate" });
            }
            else if (event.target.value === "main") {
                teams = document.getElementById("teams");
                if (teams.options.length > 0) {
                    teams.innerHTML = "none";
                }
                for (i = 0; i < this.state.mainTeamsArr.length; i++) {
                    option = document.createElement("option");
                    option.value = this.state.mainTeamsArr[i][1];
                    teams.appendChild(option);
                }
                this.setState({ division: "main" });
            }
            else if (event.target.value === "advanced") {
                teams = document.getElementById("teams");
                if (teams.options.length > 0) {
                    teams.innerHTML = "none";
                }
                for (i = 0; i < this.state.advTeamsArr.length; i++) {
                    option = document.createElement("option");
                    option.value = this.state.advTeamsArr[i][1];
                    teams.appendChild(option);
                }
                this.setState({ division: "advanced" });
            }
        }

        // console.log(event.target.value);
        const {name, value} = event.target
        // console.log(value);
        this.setState({ 
            [name]: value
        })
    }


    componentDidMount() {
        const fetchTeam = (teams) => {
            var tempArray = [];
            fetch(teams)
            .then(r => r.text())
            .then(text1 => {
                var lines = text1.split("\n");
                for (var line = 0; line < lines.length; line++) {
                    if (lines[line][0] === "/") {
                        continue;
                    }
                    else {
                        var team = lines[line].replace("\r", "");
                        team = team.split(", ");
                        team[2] = parseInt(team[2]);
                        team[3] = parseInt(team[3]);
                        team[4] = parseInt(team[4]);
                        team[5] = parseInt(team[5]);
                        tempArray.push(team);
                    }
                }
                tempArray = tempArray.sort((a, b) => {
                    if (a[2] === b[2]) {
                        if (a[3] === b[3]) {
                            if (a[4] === b[4]) {
                                return a[5] - b[5]
                            }
                            return b[4] - a[4]
                        }
                        return a[3] - b[3]
                    }
                    return b[2] - a[2]
                });
            })
            if (teams === openTeams) {
                this.setState({
                    openTeamsArr: tempArray
                });
            }
            else if (teams === imTeams) {
                this.setState({
                    imTeamsArr: tempArray
                });
            }
            else if (teams === mainTeams) {
                this.setState({
                    mainTeamsArr: tempArray
                });
            }
            else if (teams === advTeams) {
                this.setState({
                    advTeamsArr: tempArray
                });
            }
        }

        fetchTeam(openTeams);
        fetchTeam(imTeams);
        fetchTeam(mainTeams);
        fetchTeam(advTeams);
    }


    handleClick() {
        var i;
        var notInPlayoffs = "You are currently not in the standing for playoffs. Your record is ";
        var inPlayoffs = "You are currently in the standing for playoffs. Your record is ";
        if (this.state.division === "open") {
            for (i = 0; i < this.state.openTeamsArr.length; i++) {
                if (this.state.teamName === this.state.openTeamsArr[i][1]) {
                    if (i > 127) {
                        this.setState ({ isInPlayoffs: notInPlayoffs + this.state.openTeamsArr[i][2] + "-" + this.state.openTeamsArr[i][3] + " with a seed of " + (i + 1) + "." });
                    }
                    else {
                        this.setState({  isInPlayoffs: inPlayoffs + this.state.openTeamsArr[i][2] + "-" + this.state.openTeamsArr[i][3] + " with a seed of " + (i + 1) + "." });
                    }
                    break;
                }
                this.setState({ 
                    wins: this.state.openTeamsArr[i][2],
                    losses: this.state.openTeamsArr[i][3],
                })
            }
        }
        else if (this.state.division === "intermediate") {
            for (i = 0; i < this.state.imTeamsArr.length; i++) {
                if (this.state.teamName === this.state.imTeamsArr[i][1]) {
                    if (i > 63) {
                        this.setState ({ isInPlayoffs: notInPlayoffs + this.state.imTeamsArr[i][2] + "-" + this.state.imTeamsArr[i][3] + " with a seed of " + (i + 1) + "." });
                    }
                    else {
                        this.setState({ isInPlayoffs: inPlayoffs + this.state.imTeamsArr[i][2] + "-" + this.state.imTeamsArr[i][3] + " with a seed of " + (i + 1) + "." });
                    }
                    break;
                }
                this.setState({ 
                    wins: this.state.imTeamsArr[i][2],
                    losses: this.state.imTeamsArr[i][3],
                })
            }
        }
        else if (this.state.division === "main") {
            for (i = 0; i < this.state.mainTeamsArr.length; i++) {
                if (this.state.teamName === this.state.mainTeamsArr[i][1]) {
                    if (i > 31) {
                        this.setState ({ isInPlayoffs: notInPlayoffs + this.state.mainTeamsArr[i][2] + "-" + this.state.mainTeamsArr[i][3] + " with a seed of " + (i + 1) + "." });
                    }
                    else {
                        this.setState({ isInPlayoffs: inPlayoffs + this.state.mainTeamsArr[i][2] + "-" + this.state.mainTeamsArr[i][3] + " with a seed of " + (i + 1) + "." });
                    }
                    break;
                }
                this.setState({ 
                    wins: this.state.mainTeamsArr[i][2],
                    losses: this.state.mainTeamsArr[i][3],
                })
            }
        }
        else if (this.state.division === "advanced") {
            for (i = 0; i < this.state.advTeamsArr.length; i++) {
                if (this.state.teamName === this.state.advTeamsArr[i][1]) {
                    if (i > 15) {
                        this.setState ({ isInPlayoffs: notInPlayoffs + this.state.advTeamsArr[i][2] + "-" + this.state.advTeamsArr[i][3] + " with a seed of " + (i + 1) + "." });
                    }
                    else {
                        this.setState({ isInPlayoffs: inPlayoffs + this.state.advTeamsArr[i][2] + "-" + this.state.advTeamsArr[i][3] + " with a seed of " + (i + 1) + "." });
                    }
                    break;
                }
                this.setState({ 
                    wins: this.state.advTeamsArr[i][2],
                    losses: this.state.advTeamsArr[i][3],
                })
            }
        }
        if (document.getElementById("input").value === "") {
            this.setState({ isInPlayoffs: "" });
        }
    }
    
    
  render() {
    return (
      <div className='container pt-5'>
            <label>What division are you in?</label>
            <select 
                type='text'
                value={this.state.division}
                onChange={this.handleChange}
                name='division'
                className="form-select"
            >
                <option value='' selected disabled>Select division</option>
                <option value='open'>Open</option>
                <option value='intermediate'>Intermediate</option>
                <option value='main'>Main</option>
                <option value='advanced'>Advanced</option>
            </select>
            <h3 className="pt-3">{this.state.displayText}</h3>
            <span>Find your team here (type your team name or find your team): </span>
            <input 
            type="text" 
            className="form-control"
            onChange={this.handleChange} 
            list="teams"
            id="input"
            />
            <datalist id="teams"></datalist>
            <button 
            className="btn btn-primary mt-3"
            onClick={this.handleClick}
            >
                Check playoffs status
            </button>
            <p className="mt-2" id="isInPlayoffs">{this.state.isInPlayoffs}</p>
      </div>
    );
  }
}

export default ESEAWinsNeedForPlayoffs
