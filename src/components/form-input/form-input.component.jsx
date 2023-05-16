import "./form-input.styles.scss";

const FormInput = ({ label, ...otherProps }) => {
  return (
    <div className="group">
      <input className="form-input" {...otherProps} />
      {/* If label exists, render it */}
      {label && (
        <label
          className={`${
            otherProps.value.length ? "shrink" : ""
          } form-input-label`}
          // If use has typed something into the field
          // Make label smaller, otherwise normal size
        >
          {label}
        </label>
      )}
    </div>
  );
};

export default FormInput;
