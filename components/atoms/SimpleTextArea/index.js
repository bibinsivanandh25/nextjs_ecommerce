const TextArea = ({ placeholder = "Description", rows = 4 }) => {
  return (
    <textarea
      placeholder={placeholder}
      rows={rows}
      className="w-100 px-2 rounded textArea"
    />
  );
};
export default TextArea;
