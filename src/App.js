import "./App.css";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchData } from "./actions";
import Sales from "./components/Sales";
import Headline from "./components/Headline";
import Product from "./components/Product";
import Table from "./components/Table";
function App() {
  const data = useSelector((state) => state.data);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchData());
  }, []);

  return (
    <div className="App">
      <Headline />
      {data.loaded && (
        <div className="content">
          <Product data={data.state[0]} />
          <div className="right-content">
          <Sales data={data.state[0]} />
          <Table data={data.state[0]}/>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
