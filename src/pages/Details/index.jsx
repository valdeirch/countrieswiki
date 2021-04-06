import { useParams } from "react-router";

// Components
import CountryDetails from "../../components/CountryDetails";

function Details() {
    const { id } = useParams();

    return <CountryDetails countryId={id} />
}

export default Details;