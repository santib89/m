import "./Button.css";

export function Button({ onClick, label }) {
  return (
    <button className="button" onClick={onClick}>
      {label}
    </button>
  );
}
