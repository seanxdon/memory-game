const Card = ({ image, selected, onClick }) => {

    return (
        <div className="card">
            <div className={selected && 'selected'}>
                <img src={image} alt="card.face" className="card-face" />
                <img src="/assets/fireship.png" alt="card.back" className="card-back" onClick={onClick}/>
            </div>
        </div>    
    )
}

export default Card;