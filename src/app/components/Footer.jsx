import React from 'react'
import { Link } from 'react-router-dom'
import SVG from 'react-inlinesvg'

class Footer extends React.Component {
  render(){
    return  (
      <footer>
        <div className="main-footer">
          <div className="logo">
            <h5>Logo</h5>
          </div>
          <div className="about">
            <h5>Contacts</h5>
          </div>
          <div className="image_copyrights">
            <h5>Image copyrights</h5>
            <div><a target="_blank" href="https://fontawesome.com/" title="Fontawesome">Fontawesome</a></div>
            <div><a target="_blank" href="https://www.freepik.com/" title="Freepik">Freepik</a></div>
            <div>from <a target="_blank" href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a> is licensed by <a href="http://creativecommons.org/licenses/by/3.0/" title="Creative Commons BY 3.0" target="_blank">CC 3.0 BY</a></div>
        </div>
        </div>
        <div className="copyright">
          <p>© 2020 La Pizza Bomba! works for you since 2010. All rights reserved</p>  
        </div>
      </footer>
    )
  }
}
export default Footer