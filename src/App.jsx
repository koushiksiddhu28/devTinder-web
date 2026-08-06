import { BrowserRouter, Route, Routes } from "react-router";
import Body from "./Body";
import Login from "./Login";

function App() {
  return (
    <>
      <BrowserRouter basename="/">
        <Routes>
          <Route
            path="/"
            element={
              <div>
                <Body />
              </div>
            }
          >
            <Route path="/login" element={<Login />} />
          </Route>
        </Routes>
      </BrowserRouter>
      {/* <Navbar /> */}
    </>
  );
}

export default App;
