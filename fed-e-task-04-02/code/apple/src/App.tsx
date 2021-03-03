import "./style/App.css";
import AppleBasket from "./component/AppleBasket";
import { Provider } from "mobx-react";
import appleStore from "./store/apple";

function App() {
  return (
    <Provider appleStore={appleStore}>
      <div className="App">
        <AppleBasket />
      </div>
    </Provider>
  );
}

export default App;
