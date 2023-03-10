import { useState, useEffect } from 'react'
import './App.css'
import SingleCard from './components/SingleCard'

const cardImages = [
  { "src": "/img/helmet-1.png", matched: false },
  { "src": "/img/potion-1.png", matched: false },
  { "src": "/img/ring-1.png", matched: false },
  { "src": "/img/scroll-1.png", matched: false },
  { "src": "/img/shield-1.png", matched: false },
  { "src": "/img/sword-1.png", matched: false },
]

function App() {
  const [cards, setCards] = useState([])
  const [turns, setTurns] = useState(0)
  const [choiceOne, setChoiceOne] = useState(null)
  const [choiceTwo, setChoiceTwo] = useState(null)
  const [disabled, setDisabled] = useState(false)

  // shuffle cards for new game
  const shuffleCards = () => {
    const shuffledCards = [...cardImages, ...cardImages]
      .sort(() => Math.random() - 0.5)
      .map(card => ({ ...card, id: Math.random() }))
      
    setChoiceOne(null)
    setChoiceTwo(null)
    setCards(shuffledCards)
    setTurns(0)
  }

  // handle a choice
  const handleChoice = (card) => {
    console.log(card)
    choiceOne ? setChoiceTwo(card) : setChoiceOne(card)
  }

  // compare 2 selected cards
  useEffect(() => {
    if (choiceOne && choiceTwo) {
      setDisabled(true)

      if (choiceOne.src === choiceTwo.src) {
        setCards(prevCards => {
          return prevCards.map(card => {
            if (card.src === choiceOne.src) {
              return { ...card, matched: true }
            } else {
              return card
            }
          })
        })
        resetTurn()
      } else {
        setTimeout(() => resetTurn(), 1000)
      }

    }
  }, [choiceOne, choiceTwo])

  // reset choices & increase turn
  const resetTurn = () => {
    setChoiceOne(null)
    setChoiceTwo(null)
    setTurns(prevTurns => prevTurns + 1)
    setDisabled(false)
  }

  // start new game automagically
  useEffect(() => {
    shuffleCards()
  }, [])

  return (
    <div className="App">
      <h1>Magic Match</h1>
      <button onClick={shuffleCards}>New Game</button>

      <div className="card-grid">
        {cards.map(card => (
          <SingleCard 
            key={card.id}
            card={card}
            handleChoice={handleChoice}
            flipped={card === choiceOne || card === choiceTwo || card.matched}
            disabled={disabled}
          />
        ))}
      </div>

      <p>Turns: {turns}</p>
    </div>
  );
}

export default App

//Commentaires
//Plusieurs variables sont cr??es en utilisant la fonctionnalit?? React useState:
// - cards va etre utiliser pour initialiser la partie et g??n??rer le deck de carte al??atoirement, l'??tat est n??cessaire pour
// actualiser les valeurs al??atoires en direct et de g??n??rer des decks diff??rents ?? chaque cr??ation de nouvelle partie
// - turn pour actualiser la valeur du nombre de tentative en direct, l'??tat est n??cessaire pour l'actualisation (sinon la valeur
// de tour affich??e resterait ?? 0 sur le navigateur malgr?? une valeur active en console)
// - choiceone et choicetwo car leur ??tat vont etre utiliser pour empecher d'autre action entre le 1er et 2??me clic et apr??s le 2??me 
//clic (par ex retourner plus deux cartes)
// La fonction shuffledcard est la fonction qui va permettre d'incr??menter la variable cards en liste d'objets cardImages.
//La fonction prend la liste d'image et la place dans un array d'objet. Une seconde copie de la liste est ins??r??e dans
// l'array d'objet. Sur cet array est appliqu??e la m??thode sort prenant en entr??e une fonction qui g??n??re des chiffre entre -0.5 et 0.5
// et vont permettre de trier les images selon le chiffre attribu?? ?? chaque image.
// La m??thode map  est appliqu??e dans un second temp ?? l'array d'objet. Cette m??thode permet de s??lectionner chaque ??l??ment de l'array
// et de lui appliquer une fonction pour chaque ??l??ment. La m??thode prend pour entr??e l'objet card et g??n??re une liste d'objet
//card et attribue pour chaque objet card un attribut suppl??mentaire ID. La liste va ensuite d??finir la valeur de la variable cards.
//Toutes les variables utilisant useState sont r??iinistialis??s pour red??marrer une partie dans des conditions normales.
//La fonction handlechoice prend pour entr??e card et v??rifie si la ChoiceOne ?? une valeur non nulle. Ce test logique permet de 
//s'assurer de l'??tat de s??lection du binome de carte (1ere ou 2??me s??lection).
// UseEffect est utilis?? pour r??aliser des actions sp??cifiques lors certaines fonctions sont utilis??es. UseEffect va etre utiliser
//dans les cas suivants: 
// -  Usage des fonctions choiceOne et choinceTwo. L'action sp??cifi??e est alors la comparaison entre choiceOne et choiceTwo lorsque
//ces deux derni??res ont une valeur non nulle. Dans le cas positif, la valeur de la variable cards va etre actualiser ?? travers l'usage de 
//la fonctionnalit?? de usestate. Cette modification porte sur l'attribut match de l'objet card, le fixant apr??s modification ??
// "true". Cette modification est rendue possible ?? travers la navigation dans la liste d'objet prevCards et d'appliquer sur chaque
//objet card de la liste prevCard une v??rification entre l'objet card de la liste prevCard avec la valeur rendu par la fonction choiceOne.
//Une variable useState est utilis??e pour d??sactiver la fonction handleclik(conf??re le fichier SingleCard) et empecher les interactions
//avec les autres cartes pendant la v??rification entre choiceOne et choiceTwo.
//La fonction app retourne l'affichage du code html: titre, bouton, carte. Pour afficher les cartes, le programme navigue dans la liste
//d'objet cards ??  travers la m??thode map, prend pour entr??e une fonction qui g??n??re un objet SingleCard. Les diff??rents attributs
// de card sont pr??cis??s pour pouvoir ult??rieurement etre utiliser par la fonction SingleCard.