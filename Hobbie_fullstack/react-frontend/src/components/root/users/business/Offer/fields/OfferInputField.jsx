import React from "react";
import styles from "../../../../../../css/CreateOffer.module.css";

const OfferInputField = (props) => {
  return (
    <div className={styles.form_field_2}>
      <section className={styles.name_section}>
        <label htmlFor={props.name} className={styles.label_name}>
          <span>{props.label}</span>
        </label>
        <input
          defaultValue={props.defaultValue}
          onChange={props.onChange}
          placeholder={props.placeholder}
          className={styles.h_n}
          type={props.type}
          id={props.name}
          name={props.name}
        />
      </section>
      {props.error && (
        <small className={styles.errors_offer}>{props.error}</small>
      )}
    </div>
  );
};

export default OfferInputField;
