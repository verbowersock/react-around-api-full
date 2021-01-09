import React from 'react'
import { CurrentUserContext } from '../contexts/CurrentUserContext'

function Card(props) {

  const currentUser = React.useContext(CurrentUserContext)
  const isOwned = currentUser && props.card.owner._id === currentUser._id;
  const cardDeleteButtonClassName = 
    `images__delete  ${isOwned ? ``: `images__delete_hidden`}`;
  

  const isLiked = props.card.likes.some(i=> currentUser && i._id === currentUser._id);
  
  
  const cardLikeButtonClassName = `images__like-button  ${isLiked ? `images__like-button_active`: ``}`

  function handleLikeClick() {
    props.onCardLike(props.card)
  }

  function handleDeleteClick(){
    props.onCardDelete(props.card)
  }

  
  function handleCardClick (event) {
    //this is the only way i could make this work. event.preventDefault doesn't work here and I don't know why. If you have any better suggestion, I'm all ears but I spent hours scouring google and stackoverflow and this is the only solution that stopped the event from firing)
    if (event.target.localName !== "button"){
      props.onCardClick(props.card);
    }
  }
    return (
      <li className="images__card">
        <div
          className="images__picture"
          style={{ backgroundImage: `url(${props.card.link})` }}
          onClick={handleCardClick}>
          <button 
            className={cardDeleteButtonClassName} 
            aria-label="Delete image" 
            onClick={handleDeleteClick}></button>
        </div>
        <div className="images__caption">
          <p className="images__text">{props.card.name}</p>
          <div className="images__like">
            <button
              className={cardLikeButtonClassName}
              aria-label="Like image"
              onClick = {handleLikeClick}
            ></button>
            <span className="images__like-count">{props.card.likes.length}</span>
          </div>
        </div>
      </li>
    );
  }
  export default Card;