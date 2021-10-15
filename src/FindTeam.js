import React from "react"
import text from "./newData.txt";

class FindTeam extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            teamName: "",
            array: [],
            isInPlayoffs: "",
            wins: 0,
            losses: 0
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleClick = this.handleClick.bind(this)
    }

    handleChange(event) {
        this.setState({ teamName: event.target.value })
    }

    handleClick() {
        for (var i = 0; i < this.state.array.length; i++) {
            if (this.state.teamName === this.state.array[i][1]) {
                if (i > 127) {
                    this.setState ({ 
                        wins: this.state.array[i][2],
                        losses: this.state.array[i][3],
                        isInPlayoffs: "You are currently not in the standing for playoffs. Your record is " + this.state.array[i][2] + "-" + this.state.array[i][3] + "."
                    });
                }
                else {
                    this.setState({ 
                        wins: this.state.array[i][2],
                        losses: this.state.array[i][3],
                        isInPlayoffs: "You are currently in the standing for playoffs. Your record is " + this.state.array[i][2] + "-" + this.state.array[i][3] + "."
                    });
                }
            }
        }
    }

    componentDidMount() {
        var tempArray = []
        fetch(text)
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
            
            var teams = document.getElementById("teams");
            // console.log(tempArray.length);
            for (var i = 0; i < tempArray.length; i++) {
                var option = document.createElement("option");
                option.value = tempArray[i][1];
                teams.appendChild(option);
                // console.log(tempArray[i]);
            }
            this.setState({
                array: tempArray
            });
        })
    }

    render() {
        return (
            <div class="container pt-5">
                <h3>Find your team here: </h3>
                <input 
                type="text" 
                className="form-control"
                onChange={this.handleChange} 
                list="teams"
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
        )
    }
}

export default FindTeam;