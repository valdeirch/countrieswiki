import { useEffect, useState, useCallback } from "react";
import { useQuery, gql} from "@apollo/client";
import { Col, Form, Button, Row } from "react-bootstrap";
import { FcGlobe, FcConferenceCall, FcFlowChart, FcLandscape } from "react-icons/fc";
import { FiEdit } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";

// Styles
import './styles.css';

// Components
import Map from "../Map";
import CardInfo from "./CardInfo";

// Loaders
import FlagLoader from "../../loaders/FlagLoader";
import { editData } from "../../store/modules/country/actions";

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
    const editedCountries = useSelector((state) => state.country.countries);
    const dispatch = useDispatch();

    const [country, setCountry] = useState(null);
    const [loading, setLoading] = useState(true);
    const [editing, setEditing] = useState(false);

    const { data } = useQuery(GET_COUNTRY, { variables: { alpha3Code: countryId || '' }});

    useEffect(() => {
        let edited = null;
        if(editedCountries.length > 0) {
            edited = editedCountries.find((c) => c.countryId === countryId);
        } 
        
        if(edited) {
            setCountry(edited);
        } else if(data) {
                setCountry({...data?.Country[0], topLevelDomain: data?.Country[0].topLevelDomains[0].name});
        }

        return () => setCountry(null);
    }, [countryId, data, editedCountries]);

    const handleLoading = useCallback(() => {
        setTimeout(() => {
          setLoading(false);
        }, 100);
    }, []);

    const cancelEdition = useCallback(() => {
        setEditing(false);
    }, []);

    const saveCountryData = useCallback((event) => {
        event.preventDefault();
        const { 
            name, 
            capital, 
            area, 
            population, 
            topLevelDomain
        } = event.target.elements;

        const data = {
            countryId,
            flag: country?.flag,
            name: name.value, 
            capital: capital.value, 
            area: area.value, 
            population: population.value, 
            topLevelDomain: topLevelDomain.value, 
        };

        dispatch(editData(data));

        setEditing(false);
    }, [country, countryId, dispatch]);

    return (
        <Row className="py-3 details">
            <Col xs={12} md={6} className="d-flex justify-center">
                <img 
                    style={{ display: loading ? "none" : "block" }}
                    src={country?.flag?.svgFile} 
                    alt="Country flag"
                    onLoad={handleLoading} 
                    className="flag-details"
                />
                {loading && 
                    <FlagLoader style={{ width: '100%', height: '100%' }} />
                }
            </Col>
            {!editing &&
                (
                    <Col xs={12} md={6} className="d-flex flex-column justify-content-between">
                        <h1 className="text-center mt-4 mt-md-0">{country?.name}</h1>
                        <CardInfo Icon={FcGlobe} title="Capital" value={country?.capital} />
                        <CardInfo Icon={FcLandscape} title="Area" value={`${new Intl.NumberFormat('en-US').format(country?.area)} km²`} />
                        <CardInfo Icon={FcConferenceCall} title="Population" value={new Intl.NumberFormat('en-US').format(country?.population)} />
                        <CardInfo Icon={FcFlowChart} title="Top-level Domain" value={country?.topLevelDomain} />
                        {!editing &&
                            <button className="mt-4 mt-md-0 edit" onClick={() => setEditing(true)}>
                                <FiEdit size={36} color="white" />
                            </button>
                        }
                    </Col>
                )
            }
            {editing &&
                (
                    <Col xs={12} md={6} className="d-flex flex-column justify-content-between">
                        <Form onSubmit={saveCountryData}>
                            <Form.Group controlId="name">
                                <Form.Label>Name</Form.Label>
                                <Form.Control 
                                    type="text" 
                                    placeholder="Enter country name" 
                                    defaultValue={country?.name}
                                />
                            </Form.Group>
                            
                            <Form.Group controlId="capital">
                                <Form.Label>Capital</Form.Label>
                                <Form.Control 
                                    type="text" 
                                    placeholder="Enter country capital" 
                                    defaultValue={country?.capital}
                                />
                            </Form.Group>
                            
                            <Form.Group controlId="area">
                                <Form.Label>Area</Form.Label>
                                <Form.Control 
                                    type="text" 
                                    placeholder="Enter country Area" 
                                    defaultValue={country?.area}
                                />
                            </Form.Group>

                            <Form.Group controlId="population">
                                <Form.Label>Population</Form.Label>
                                <Form.Control 
                                    type="text" 
                                    placeholder="Enter Population" 
                                    defaultValue={country?.population}
                                />
                            </Form.Group>

                            <Form.Group controlId="topLevelDomain">
                                <Form.Label>Top Level Domain</Form.Label>
                                <Form.Control 
                                    type="text" 
                                    placeholder="Enter Top Level Domain" 
                                    defaultValue={country?.topLevelDomain}
                                />
                            </Form.Group>

                            <div className="buttons">
                                <Button 
                                    variant="success" 
                                    type="submit"
                                >
                                    Save
                                </Button>

                                <Button 
                                    variant="primary"
                                    onClick={() => cancelEdition()}
                                >
                                    Cancel
                                </Button>
                            </div>
                            </Form>
                    </Col>
                )
            }
            <Col xs={12}>
                <Map countryId={countryId} />
            </Col>
        </Row>
    );
}

export default CountryDetails;