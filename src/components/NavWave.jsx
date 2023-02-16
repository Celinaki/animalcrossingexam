import React from "react"
const NavWave = () => {
    return(
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
        <defs>
          <linearGradient id="myGradient" gradientTransform="rotate(90)">
            <stop offset="0%" stop-color="#0CADE0" />
            <stop offset="100%" stop-color="#FFF3E8" />
          </linearGradient>
        </defs>
        <path fill="url(#myGradient)" fill-opacity="1" d="M0,256L24,240C48,224,96,192,144,186.7C192,181,240,203,288,218.7C336,235,384,245,432,224C480,203,528,149,576,149.3C624,149,672,203,720,197.3C768,192,816,128,864,122.7C912,117,960,171,1008,208C1056,245,1104,267,1152,261.3C1200,256,1248,224,1296,213.3C1344,203,1392,213,1416,218.7L1440,224L1440,0L1416,0C1392,0,1344,0,1296,0C1248,0,1200,0,1152,0C1104,0,1056,0,1008,0C960,0,912,0,864,0C816,0,768,0,720,0C672,0,624,0,576,0C528,0,480,0,432,0C384,0,336,0,288,0C240,0,192,0,144,0C96,0,48,0,24,0L0,0Z"></path>
      </svg>
    )
}
export default NavWave;