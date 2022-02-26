import { Provider } from "react-redux";
import App from "../components/App/App";
import { store } from "../toolkitRedux";

const index = () => {
    return (
        <>
        <Provider store={store}>
            <App />
        </Provider>
        </>
    );
};

export default index;