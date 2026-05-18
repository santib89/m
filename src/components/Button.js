import "./Button.css";

export function Button({ onClick, label, className = "", disabled = false, type = "button", ...props }) {
  return (
    <button
      type={type}
      className={["button", className].filter(Boolean).join(" ")}
      onClick={onClick}
      disabled={disabled}
      {...props}
    >
      {label}
    </button>
  );
}
