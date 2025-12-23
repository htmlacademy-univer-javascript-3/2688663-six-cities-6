import MainScreen from "../../pages/main/main";

type AppProps = {
    offers_count: number;
}


function App({offers_count}: AppProps) {
    return <MainScreen offers_count={offers_count} />;
}


export default App;