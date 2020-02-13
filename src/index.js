import ReactDOM from "react-dom";
import "./index.css";
import router from "./router.js";
import * as serviceWorker from "./serviceWorker.js";

const routes = router();

ReactDOM.render(routes, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
