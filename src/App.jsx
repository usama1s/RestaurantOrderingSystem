//router
import { Router } from "./pages/Router";
import { Cart } from "./components/cart";
function App() {
  return (
    <>
      <Router />
      <Cart title={`Your Order`} />
    </>
  );
}

export default App;
