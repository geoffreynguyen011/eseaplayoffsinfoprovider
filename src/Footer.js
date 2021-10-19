import React from 'react'
import logo from './esea-logo.png'
import github from './github.png'


function Footer() {
    const logoStyle = {
        maxWidth: 50,
        maxHeight: 50,
    };
    return (
        <div className='footer'>
            <ul className='inline'>
                <div className="container">
                    <li>
                        <a href='https://github.com/geoffreynguyen011/eseaplayoffsinfo'>
                            <img src={github} alt={github} style={logoStyle} />
                        </a>
                    </li>
                    <li>
                        <a href='https://play.esea.net'>
                            <img src={logo} alt={logo} style={logoStyle}/>
                        </a>
                    </li>
                </div>
            </ul>
        </div>
    )
}

export default Footer