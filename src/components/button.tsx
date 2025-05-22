type ButtonType = "primary" | "secondary" | "tertiary";

export default function Button(
  { children, onClick, type = "primary" }: { children: React.ReactNode, onClick: () => void, type?: ButtonType }) {
  return (
    <button onClick={onClick} className={`bg-blue-500 text-white px-4 py-2 mt-5 rounded-md ${type === "primary" ? "bg-blue-500" : type === "secondary" ? "bg-gray-500" : "bg-red-500"}`}>
      {children}
    </button>
  );
}
