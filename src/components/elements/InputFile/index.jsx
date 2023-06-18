export default function InputFileComponent(props) {
  return (
    <>
      <input hidden id="file-attachment" accept="image/*" type="file" multiple onChange={props.onChange} />
      <label htmlFor="file-attachment">{props.children}</label>
    </>
  );
}
