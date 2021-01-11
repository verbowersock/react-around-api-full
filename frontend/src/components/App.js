import React from 'react'
import Header from './Header.js';
import Footer from './Footer.js';
import Main from './Main.js';
import PopupWithImage from './ImagePopup';
import { api } from "../utils/api.js";
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddNewCardPopup from './AddNewCardPopup';
import {Route, Switch, useHistory, withRouter } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute'
import Login from './Login'
import Register from './Register'
import InfoToolTip from './InfoTooltip'
import * as auth from '../utils/auth.js';



function App() {
  const [isEditProfilePopupOpen, setEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState(null);
  const [currentUser, setCurrentUser] = React.useState(null);
  const [cards, setCards] = React.useState([]);
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [isInfoToolTipOpen, setInfoToolTipOpen] = React.useState(false);
  const [tooltipType, setTooltipType] = React.useState('');
  const [userEmail, setUserEmail] = React.useState("");
  const [userPassword, setUserPassword] = React.useState("");
  const [userRegistered, setUserRegistered] = React.useState(false);
  const token = localStorage.getItem('jwt')



  const history = useHistory({forceRefresh:true});
  

  React.useEffect(() => {
    api
      .getInitialCards(token)
      .then((result) => {
        result = Array.from(result);
        setCards(result)
      })
      .catch((err) => {
        console.log(err);
      });
  }, [loggedIn]);

  function handleCardLike(card) {
    const isLiked = card.likes.some(i => i === currentUser._id);
    api.addLike(card._id, isLiked, token)
    .then((newCard) => {
      const newCards = cards.map((c) => c._id === card._id ? newCard: c);
      setCards(newCards);
    })
    .catch ((error) => {
      console.log(error)
    })
  }

  function handleCardDelete(card) {
    api.deleteCard(card._id, token)
    .then(() => {
      const newCards = cards.filter((c) => c._id !== card._id);
      setCards(newCards);
  })
  .catch ((error) => {
    console.log(error)
  })
}

function handleEditAvatarClick () {
  setEditAvatarPopupOpen(true);
}

function handleEditProfileClick () {
  setEditProfilePopupOpen(true);
}

function handleAddPlaceClick () {
  setAddPlacePopupOpen(true);
}

function closeAllPopups () {
  setEditAvatarPopupOpen(false);
  setEditProfilePopupOpen(false);
  setAddPlacePopupOpen(false);
  setSelectedCard(null)
  setInfoToolTipOpen(false)
}

function handleCardClick(card) {
  setSelectedCard(card)
}

function handleUpdateUser({name, about}) {
  api.updateUserInfo({name, about}, token)
  .then((data)=> {
    setCurrentUser(data);
  })
  .catch ((error) => {
    console.log(error)
  })
  closeAllPopups();
}

function handleUpdateAvatar({avatar}) {
  api.updateAvatar(avatar.current.value, token)
  .then((data) => {
  setCurrentUser(data);
})
  .catch ((error) => {
  console.log(error)
})
  closeAllPopups();  
}

function handleToolTip(type) {
  setTooltipType(type);
  setInfoToolTipOpen(true);
}

function handleAddPlaceSubmit({title, url}) {
  api.postNewCard({title, url}, token).then((data) => {
    setCards([data, ...cards])
  })
  .catch ((error) => {
    console.log(error)
  })
  closeAllPopups();
}

function resetForm () {
  setUserEmail('');
  setUserPassword('');
}

function handleRegistration() {
    auth.register(userEmail, userPassword)
      .then((res) => {
        if (!res) {
          handleToolTip('fail');
          resetForm();
          throw new Error(`400 - one of the fields was filled in incorrectly`);
        }
        })
        .then((res) => {
          setUserRegistered(true);
          history.push('/login');
          return res;
        })
        .then((res) => {
          handleToolTip('success');
          return res;
        })
      .then(resetForm)
      .catch(err => {
        console.log(err)
      });
  }

  function handleLogin() {
    auth
      .authorize(userEmail, userPassword)
      .then((res) => {
        if (!userEmail || !userPassword) { 
          handleToolTip('fail');
          resetForm(); 
          throw new Error('400 - one or more of the fields were not provided');
        }
        else if (!res) {
          handleToolTip('fail');
          resetForm(); 
          throw new Error('401 - Email or password are incorrect');
        }
      })
      .then(() => {
        setLoggedIn(true)

      })
      .then(() => {
        history.push('/');
       
      })
      .catch((err) => console.log(err.message));
  };
  
  function handleSignOut () {
    localStorage.removeItem('jwt');
    setLoggedIn(false);
    history.push('/login');
  }

  React.useEffect(() => {
    
    if (token) {
      auth
        .checkToken(token)
        .then((res) => {
          setLoggedIn(true);
          setUserEmail(res.email);
        })
        .then(()=> 
        history.push("/"))
        .catch((err) => {
          console.log(err);
        });
    } else {
      setLoggedIn(false);
    }
  },[history]);
  

React.useEffect(() => {
  api
    .getUserInfo(token)
    .then((result) => {
      setCurrentUser(result);
    })
    .catch((err) => {
      console.log(err);
    });
}, [token]);

  return (
    <CurrentUserContext.Provider value = {currentUser}>
        <div className = "page">
      <Header 
        userEmail={userEmail}
        loggedIn={loggedIn}
        onSignOut = {handleSignOut}
      />
      <Switch>
      <Route exact path="/login">
            <Login 
             userEmail = {userEmail}
             setUserEmail = {setUserEmail}
             userPassword = {userPassword}
             setUserPassword = {setUserPassword}
             onSubmit={handleLogin}
            />
            <InfoToolTip
              isOpen={isInfoToolTipOpen}
              onClose={closeAllPopups}
              tooltipType = {tooltipType}
              loggedIn={loggedIn}
            />
      </Route>
      <Route exact path="/signup">
        <Register 
          userEmail = {userEmail}
          setUserEmail = {setUserEmail}
          userPassword = {userPassword}
          setUserPassword = {setUserPassword}
          onSubmit={handleRegistration}
        />
        <InfoToolTip
              isOpen={isInfoToolTipOpen}
              onClose={closeAllPopups}
              loggedIn={loggedIn}
              tooltipType = {tooltipType}
            />
      </Route>
      <Route path="/">
      
      <EditProfilePopup
        isOpen={isEditProfilePopupOpen} 
        onClose={closeAllPopups}
        onUpdateUser={handleUpdateUser}
      /> 
      <AddNewCardPopup
        isOpen={isAddPlacePopupOpen}
        onClose={closeAllPopups}
        onAddCard={handleAddPlaceSubmit}
      />
      <EditAvatarPopup 
        isOpen = {isEditAvatarPopupOpen}
        onClose={closeAllPopups}
        onUpdateAvatar={handleUpdateAvatar}
        />
      <PopupWithImage 
        onClose = {closeAllPopups}
        card = {selectedCard}/>         
       <ProtectedRoute 
            path="/" 
            loggedIn={loggedIn} 
            component={Main} 
            onEditProfile = {handleEditProfileClick}
            onAddPlace = {handleAddPlaceClick}
            onEditAvatar = {handleEditAvatarClick}
            onCardClick = {handleCardClick}
            cards={cards}
            onCardDelete = {handleCardDelete}
            onCardLike={handleCardLike}/>    
      <Footer />
      </Route>
      </Switch> 
    </div>
    </CurrentUserContext.Provider>  
  );
}

export default App;
