import React from 'react'
import SVG from 'react-inlinesvg'

export default function Footer(){
  return  (
    <footer>
      <div className="main-footer">
        <div className="d-flex align-items-center">
          <div><SVG className="logo mr-2" src="/public/images/logo.svg" /></div>
          <h3>La Pizza Bomba!</h3>
        </div>
        <div className="about">
          <h5>Contacts</h5>
          <div>Our phone: <a href="tel:71234567890">+7(123)456-78-90</a></div>
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