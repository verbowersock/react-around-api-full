function PopupWithForm(props) {
  const isOpen = props.isOpen ? "" : "popup_hidden";
  const overlay = props.overlay ? "popup":""
  const closeButton = props.closeButton ? "":"popup__close_hidden"
  const titleCentered = props.titleCentered ? "popup__title_centered":""
  return (
    <div className={`${overlay} popup_form popup_form-${props.name} ${isOpen}`}>
      <div className="popup__content">
        <form className={`popup__form popup__form_${props.name}`} noValidate onSubmit={props.onSubmit}>
          <button
            name="close_button"
            className={`popup__close popup__close_form-${props.name} ${closeButton}`}
            type="reset"
            aria-label="Close"
            onClick={props.onClose}
          >
          </button>
          <h2 className={`popup__title ${titleCentered}`}>{props.title}</h2>
          {props.children}
        </form>
      </div>
    </div>
  );
}
export default PopupWithForm;


