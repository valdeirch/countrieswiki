import { useCallback, useEffect, useState } from "react";
import { useQuery, gql, useLazyQuery } from '@apollo/client';
import { Col, Row } from "react-bootstrap";
import InfiniteScroll from 'react-infinite-scroller';

// Components
import { FlagCard } from "../FlagCard";

const COUNTRIES = gql`
query Countries($first: Int) {
    Country(first: $first) {
        alpha3Code
        name
        capital
        flag {
            svgFile
        }
    }
}
`;

const GET_COUNTRIES = gql`
query GetCountries($country: String!) {
        Country(name: $country){
            alpha3Code
            name
            capital
            flag {
                svgFile
            }
        }
    }
`;

function FlagList({ search = '' }) {
    const [countries, setCountries] = useState({Country: []});
    const [pagination, setPagination] = useState(25);
    const [canLoadMore, setCanLoadMore] = useState(false);
    const { loading, data } = useQuery(COUNTRIES, {variables: {first: pagination}});
    
    const [getCountry, { loading: filterLoading, data: dtFilter }] = useLazyQuery(GET_COUNTRIES);

    const loadMore = useCallback(() => {
        if(!loading) {
            setCanLoadMore(false);
            setPagination(pagination + 25);
        }
    }, [loading, pagination])

    useEffect(() => {
        if(search && search !== '') {
            getCountry({ variables: { country: search }});
        }
    }, [dtFilter, getCountry, search])

    useEffect(() => {
        if(search && search !== '') {
            setCountries(dtFilter)
        }
    }, [dtFilter, search])

    useEffect(() => {
        console.log('data', data)
        console.log('search', search)
        if(data?.Country.length > 0 && (!search || search === '')) {
            setCountries(data);
            setCanLoadMore(true);
        }
    }, [data, search])

    return (
        <InfiniteScroll
            pageStart={0}
            loadMore={() => loadMore()}
            hasMore={canLoadMore}
        >
            <Row className="justify-center">
                {countries?.Country.length > 0 && 
                    countries.Country.map((country) => (
                        <Col key={country.alpha3Code}>
                            <FlagCard country={country} />
                        </Col>
                    ))
                }
            </Row>
        </InfiniteScroll>
    )
}

export default FlagList;
    