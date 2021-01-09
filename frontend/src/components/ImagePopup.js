function PopupWithImage(props) {
    return (
      <div className={`popup popup_image ${props.card ? "" : "popup_hidden"}`}>
        <div className="popup__content popup__content_fullscreen">
          <button
            name="close_button"
            className="popup__close popup__close_image"
            aria-label="Close popup"
            onClick={props.onClose}
          >
          </button>
          <img
            className="images__picture images__picture_fullscreen"
            src={props.card ? props.card.link : ""}
            alt={props.card ? props.card.name: ""}
          />
          <p className="images__text images__text_fullscreen">
            {props.card ? props.card.name: ""}
          </p>
        </div>
      </div>
    );
  }
  export default PopupWithImage;