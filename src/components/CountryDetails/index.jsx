import { useEffect, useState, useCallback } from "react";
import { useQuery, gql} from "@apollo/client";
import { Col, Row } from "react-bootstrap";
import { FcGlobe, FcConferenceCall, FcFlowChart, FcLandscape } from "react-icons/fc";

// Styles
import './styles.css';

// Components
import Map from "../Map";
import CardInfo from "./CardInfo";

// Loaders
import FlagLoader from "../../loaders/FlagLoader";

const GET_COUNTRY = gql`
query GetCountries($alpha3Code: String!) {
        Country(alpha3Code: $alpha3Code){
            name
            capital
            area
            population
            topLevelDomains {
                name
            }
            flag {
                svgFile
            }
        }
    }
`;

function CountryDetails({countryId}) {
    const [country, setCountry] = useState(null);
    const [loading, setLoading] = useState(true);

    const { data } = useQuery(GET_COUNTRY, { variables: { alpha3Code: countryId || '' }});

    useEffect(() => {
        if(data) {
            setCountry(data?.Country[0]);
        }
        return () => setCountry(null);
    }, [data]);

    const handleLoading = useCallback(() => {
        setTimeout(() => {
          setLoading(false);
        }, 100);
    }, []);

    return (
        <Row className="py-3">
            <Col xs={12} md={6} className="d-flex justify-center">
                <img 
                    style={{ display: loading ? "none" : "block" }}
                    src={country?.flag?.svgFile} 
                    alt="Country flag"
                    onLoad={handleLoading} 
                />
                {loading && 
                    <FlagLoader style={{ width: '100%', height: '100%' }} />
                }
            </Col>
            <Col xs={12} md={6} className="d-flex flex-column justify-content-between">
                <h1 className="text-center mt-4 mt-md-0">{country?.name}</h1>
                <CardInfo Icon={FcGlobe} title="Capital" value={country?.capital} />
                <CardInfo Icon={FcLandscape} title="Area" value={`${new Intl.NumberFormat('en-US').format(country?.area)} km²`} />
                <CardInfo Icon={FcConferenceCall} title="Population" value={new Intl.NumberFormat('en-US').format(country?.population)} />
                <CardInfo Icon={FcFlowChart} title="Top-level Domain" value={country?.topLevelDomains[0]?.name} />
            </Col>
            <Col xs={12}>
                <Map countryId={countryId} />
            </Col>
        </Row>
    );
}

export default CountryDetails;