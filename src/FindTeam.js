import React from "react"
import text from "./newData.txt";

class FindTeam extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            teamName: ""
        }
        this.handleChange = this.handleChange.bind(this)
    }

    handleChange(event) {
        this.setState({ teamName: event.target.value })
    }

    render() {
        var array = [];
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
                    array.push(team);
                }
            }
            array = array.sort((a, b) => {
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
        return (
            <div class="container pt-5">
                <input 
                type="text" 
                className="form-control"
                onChange={this.handleChange} 
                />
            </div>
        )
    }
}

export default FindTeam;