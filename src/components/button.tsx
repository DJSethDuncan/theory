type ButtonType = "primary" | "secondary" | "tertiary";

export default function Button(
  { 
    children,
    onClick,
    type = "primary",
    disabled = false
  }: { 
    children: React.ReactNode,
    onClick: () => void,
    type?: ButtonType,
    disabled?: boolean
}) {
  return (
    <button onClick={onClick} disabled={disabled} className={`px-4 py-2 mt-5 rounded-md ${type === "primary" ? "bg-blue-500 text-white" : type === "secondary" ? "bg-gray-500 text-gray-400" : "bg-red-500 text-white"}`}>
      {children}
    </button>
  );
}
