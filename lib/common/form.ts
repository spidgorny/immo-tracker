export function getFormData(form) {
  const elements = form.elements as HTMLFormControlsCollection;
  // console.log(elements);
  const values = Array.from(elements).map((x: HTMLFormElement) => [
    x.name ?? x.id,
    x.value,
  ]);
  // console.log(values);
  return Object.fromEntries(values.filter((x) => x[0]));
}

export function clearForm(form) {
  const elements = form.elements as HTMLFormControlsCollection;
  Array.from(elements).forEach(
    (x: HTMLFormElement) => (x.value = x.defaultValue)
  );
}

import { useState } from "react";

export function getFormDataNew(form) {
  return Object.fromEntries(new FormData(form).entries());
}

export function useFormState(defaultSet = {}) {
  const [state, setState] = useState(defaultSet);

  const setField = (key, val) => {
    setState({
      ...state,
      [key]: val,
    });
  };

  return { formData: state, setField };
}
