import { useLocation } from "react-router";

// Components
import FlagList from "../../components/FlagList";

function Home() {
    const search = new URLSearchParams(useLocation().search);

    return <FlagList search={search.get('search')} />
}

export default Home;