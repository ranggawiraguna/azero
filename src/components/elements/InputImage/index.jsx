export default function InputImageComponent(props) {
  return (
    <>
      <input hidden id="image-attachment" accept="image/*" type="file" multiple onChange={props.onChange} />
      <label htmlFor="image-attachment">{props.children}</label>
    </>
  );
}
