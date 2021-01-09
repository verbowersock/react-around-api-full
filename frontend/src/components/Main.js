import React from "react";
import { CurrentUserContext } from '../contexts/CurrentUserContext'
import Card from "./Card";

function Main(props) {
  const currentUser = React.useContext(CurrentUserContext)

  return (
    <main className="main-content">
      <section className="profile">
        <img className="profile__image" src={currentUser && currentUser.avatar} alt="profile pic"/>
        <div className="profile__overlay" onClick={props.onEditAvatar}>
          <button
            className="profile__overlay_button"
            aria-label="change avatar"
            
          />
        </div>
        <div className="profile__description">
          <div className="profile__name">
            <h1 className="profile__text">{currentUser && currentUser.name}</h1>
            <button
              className="profile__edit"
              aria-label="Edit profile"
              onClick={props.onEditProfile}
            />
          </div>
          <p className="profile__occupation">{currentUser && currentUser.about}</p>
        </div>
        <button
          className="profile__add"
          aria-label="Add image"
          onClick={props.onAddPlace}
        />
      </section>
      <section className="images">
      <ul className="images__list">
        {props.cards.map((card) => (
          <Card 
            key={card._id} 
            card={card} 
            onCardClick={props.onCardClick} 
            onCardLike = {props.onCardLike}
            onCardDelete = {props.onCardDelete}
            />
        ))}
      </ul>
    </section>                
    </main>
  );
}

export default Main;
