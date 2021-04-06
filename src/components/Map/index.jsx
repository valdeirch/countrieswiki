import { useEffect, useState } from 'react';
import { useQuery, gql } from '@apollo/client';
import GoogleMapReact from 'google-map-react';

// Components
import Marker from "./Marker";

const GET_COUNTRY = gql`
    query GetCountries($alpha3Code: String!) {
        Country(alpha3Code: $alpha3Code){
            location {
                latitude
                longitude
            }
            flag {
                svgFile
            }
        }
    }
`;

const Map = ({countryId}) => {
    const [country, setCountry] = useState({
        center: {
            lat: 0,
            lng: 0
        },
        zoom: 1
    });

    const { data } = useQuery(GET_COUNTRY, { variables: { alpha3Code: countryId || '' }});
    
    useEffect(() => {
        if(data) {
            const locationData = data.Country[0];
            setCountry({...locationData, center: {
                lat: locationData.location.latitude,
                lng: locationData.location.longitude
            }});
        }
    }, [data])

    return(
        <div className="mt-3" style={{ height: '100vh', width: '100%' }}>
            <GoogleMapReact
                bootstrapURLKeys={{ key: "AIzaSyCigIaRj40rgY38KdWHCCL2UJiR26YrpVY" }}
                center={country.center}
                defaultZoom={country.zoom}
            >
                <Marker
                    lat={country?.center?.lat}
                    lng={country?.center?.lng}
                    icon={country?.flag?.svgFile}
                />
            </GoogleMapReact>
        </div>
    )
}

export default Map;