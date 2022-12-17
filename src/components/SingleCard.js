import './SingleCard.css'

export default function SingleCard({ card, handleChoice, flipped, disabled }) {

  const handleClick = () => {
    if (!disabled) {
      handleChoice(card)
    }
  }

  return (
    <div className="card">
      <div className={flipped ? "flipped" : ""}>
        <img className="front" src={card.src} alt="card front" />
        <img className="back" src="/img/cover.png" onClick={handleClick} alt="cover" />
      </div>
    </div>
  )
}

//Commentaires
//La fonction gère l'affichage de l'animation des cartes sur la page HTML. Les attributs card, handlChoice, flipped, disabled
//sont définis par la fonction app et réutilisés par la function singlecard.