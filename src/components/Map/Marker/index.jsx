import './styles.css';

const Marker = ({icon}) => {
    return (
        <div className="marker">
            <img src={icon} alt="icon"/>
        </div>
    )
}

export default Marker;