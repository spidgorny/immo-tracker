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
