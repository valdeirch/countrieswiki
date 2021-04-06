import { Container } from './styles';

function CardInfo({ Icon, title, value}) {
    return (
        <Container>
            <Icon size={36} />
            <p className="title">{title}: </p>
            <p>{value}</p>
        </Container>
    )
}

export default CardInfo;