import "@repo/ui/styles.css";

const App = () => {
  return (
    <button
      className="bg-primary text-white px-4 py-2 rounded-md"
      onClick={() => alert("Hello from your web app!")}
    >
      <span>Click me</span>
    </button>
  );
};

export default App;
