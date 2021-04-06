import { useCallback, useState } from "react";
import { Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";

// Styles
import "./styles.css";

// Loaders
import FlagLoader from "../../loaders/FlagLoader";

export function FlagCard({ country }) {
    const { name, capital, flag, alpha3Code } = country;

    const [loading, setLoading] = useState(true);

    const handleLoading = useCallback(() => {
        setTimeout(() => {
          setLoading(false);
        }, 100);
    }, []);

    return (
        <Card style={{ width: '18rem' }} className="mx-auto mt-3">
            <Card.Img 
                style={{ display: loading ? "none" : "block" }}
                variant="top" 
                src={flag.svgFile} 
                className="flag" 
                onLoad={handleLoading}
            />
            {loading && 
                <FlagLoader className="flag" />
            }
            <Card.Body>
                <Card.Title className="text-center">{name}</Card.Title>
                <Card.Text className="text-center">{capital}</Card.Text>
                <Link to={`/details/${alpha3Code}`}>
                    <Button variant="primary" className="btn-lg btn-block">Details</Button>
                </Link>
            </Card.Body>
        </Card>
    )
}