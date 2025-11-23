import "@repo/ui/styles.css";

const App = () => {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Users Management</h1>
      <div className="space-y-2">
        <div className="p-4 border rounded-md">
          <h2 className="font-semibold">User 1</h2>
          <p className="text-sm text-gray-600">user1@example.com</p>
        </div>
        <div className="p-4 border rounded-md">
          <h2 className="font-semibold">User 2</h2>
          <p className="text-sm text-gray-600">user2@example.com</p>
        </div>
      </div>
    </div>
  );
};

export default App;

