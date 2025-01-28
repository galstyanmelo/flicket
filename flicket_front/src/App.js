// ** React Imports
import { Toaster } from "react-hot-toast";

// ** Custom Components
import { MovieInfo } from "./components/movie/Info";

// ** Prototypes
import "./utils/Prortotypes";


function App() {
  return (
    <div className="App">
      <MovieInfo />
      <Toaster position="top-center" reverseOrder={false} />
    </div>
  );
}

export default App;
