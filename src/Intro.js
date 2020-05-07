import React from 'react'

function Intro() {
    return (
        <div>
            <header>
                <h1>Welcome to the ESEA Playoffs Information Website!</h1>
                <h1>This website is made to give a general probability of whether you made playoffs or not.</h1>
                <h2>All of the information on this website is based off of previous seasons; this is ENTIRELY independent of ESEA.</h2>
                <h3>Current season: season 34</h3>
                <a
                    className="ESEA"
                    href="https://play.esea.net"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    ESEA Website
                </a>
            </header>
        </div>
    )
}

export default Intro
