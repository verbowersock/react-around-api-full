import React from 'react';
import PopupWithForm from './PopupWithForm';

function AddNewCardPopup (props) {

    const [title, setTitle] = React.useState("")
    const [url, setUrl] = React.useState("")
    
    function handleTitleChange(e) {
        setTitle(e.target.value)
    }
    
    function handleUrlChange(e) {
        setUrl(e.target.value)
    }

    function handleSubmit(e) {
        e.preventDefault();
        props.onAddCard({
          title,
          url,
        })
        setUrl('')
        setTitle('')
      }

    return(
        <PopupWithForm
          onClose = {props.onClose}
          onSubmit = {handleSubmit}
          titleCentered = {false}
          overlay = {true}
          closeButton = {true}
          name="add" 
          title = "New Place" 
          isOpen = {props.isOpen}>
            <input type="text" placeholder="Title" id="title-input" value={title} required minLength={1} maxLength={30} name="name" className="popup__field popup__field_title" onChange={handleTitleChange}/>
            <span className="popup__input-error" id="title-input-error" />
            <input type="url" placeholder="Image Link" id="link-input" value={url} name="link" required className="popup__field popup__field_link" onChange={handleUrlChange}/>
            <span className="popup__input-error" id="link-input-error" />
            <input
            type="submit"
            className="popup__save"
            aria-label="Save"
            defaultValue="Save"
          />
      </PopupWithForm>
    )
}

export default AddNewCardPopup