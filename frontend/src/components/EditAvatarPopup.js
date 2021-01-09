import React from 'react';
import PopupWithForm from './PopupWithForm';

function EditAvatarPopup (props) {

    const avatarRef = React.useRef('')

    function handleSubmit(e) {
        e.preventDefault();
        props.onUpdateAvatar({
            avatar: avatarRef
      });
    }

    return(
    <PopupWithForm
        onClose = {props.onClose}
        name="avatar" 
        titleCentered = {false}
        overlay = {true}
        title = "Change profile picture"
        closeButton = {true} 
        isOpen = {props.isOpen}
        onSubmit = {handleSubmit}> 
          <input 
            type="url" 
            placeholder="Avatar Link" 
            id="link-input" 
            name="link" 
            required 
            className="popup__field popup__field_link" 
            ref={avatarRef}/>
          <span 
            className="popup__input-error" 
            id="link-input-error" />
          <input 
            type="submit" 
            className="popup__save" 
            aria-label="Save" 
            defaultValue="Save"
      />
      </PopupWithForm>
    ) 
}
export default EditAvatarPopup