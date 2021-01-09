import React from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import PopupWithForm from './PopupWithForm';

function EditProfilePopup (props) {
const [name, setName] = React.useState("")
const [description, setDescription] = React.useState("")
const currentUser = React.useContext(CurrentUserContext);

React.useEffect(() => {
    setName(currentUser && currentUser.name);
    setDescription(currentUser && currentUser.about)
}, [currentUser])

function handleNameChange(e) {
    setName(e.target.value)
}

function handleDescriptionChange(e) {
    setDescription(e.target.value)
}

function handleSubmit(e) {
  e.preventDefault();
  props.onUpdateUser({
    name,
    about: description,
  })
}

  return(
    <PopupWithForm 
      onClose = {props.onClose}
      name="edit" 
      title = "Edit Profile" 
      closeButton = {true}
      overlay = {true}
      titleCentered = {false}
      isOpen = {props.isOpen}
      onSubmit = {handleSubmit}
      >
        <input type="text" 
          placeholder="Name" 
          id="name-input" 
          className="popup__field popup__field_name" 
          name="name" 
          value = {name || ""} 
          required minLength={2} 
          maxLength={40} 
          onChange = {handleNameChange}/>
        <span className="popup__input-error" id="name-input-error" />
        <input type="text" 
          placeholder="About" 
          id="about-input" 
          className="popup__field popup__field_about" 
          name="about" 
          value = {description || ""} 
          required minLength={2} 
          maxLength={200} 
          onChange = {handleDescriptionChange}/>
        <span className="popup__input-error" id="about-input-error" /> 
        <input
          type="submit"
          className="popup__save"
          aria-label="Save"
          defaultValue="Save"
      />
    </PopupWithForm>
  )
}
export default EditProfilePopup