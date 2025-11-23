import { Button } from "@repo/ui/button";
import "@repo/ui/styles.css";

const App = () => {
  return (
    <Button variant="default" onClick={() => alert("Hello from your web app!")}>
      Click me
    </Button>
  );
};

export default App;
