import logo from "../Images/logo.svg";
import {Link, useLocation} from 'react-router-dom'

function Header(props) {

  const location = useLocation();
  
    let properties = {text:"", route: "", email: ""}
    properties = getProperties()

    function getProperties(){
    if (location.pathname === "/signup") { 
      properties.text ="Log in"
      properties.route = "/signin"
      properties.email = ""
    }
    else if (location.pathname === "/signin") {
      properties.text ="Sign up"
      properties.route = "/signup"
      properties.email = ""
    }
    else {
      properties.text ="Log out"
      properties.email = props.userEmail
      properties.route = '/signin'
    }
    return properties
  }

  return (
    <>
    <header className="header">
      <img className="header__logo" src={logo} alt="Around the US logo" />
      <div className="header__email">

    {properties.email}
    
    <Link to = {properties.route} className={`header__link `+ (location.pathname === "/signup"||location.pathname ==="/signin" ? '':'header__link_logged-in')} onClick = {location.pathname === "/"?props.onSignOut:null}> 
    {properties.text}
    </Link>
    </div>
    </header>
    </>
  );
}

export default Header;