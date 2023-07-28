import AppRoutes from "./routes/AppRoutes";
import { LoadScript } from "@react-google-maps/api";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import "./App.css";

function App() {
  return (
    <Provider store={store}>
      <LoadScript googleMapsApiKey={process.env.GOOGLE_MAP_API_KEY}>
        <div className="App">
          <AppRoutes />
        </div>
      </LoadScript>
    </Provider>
  );
}

export default App;
