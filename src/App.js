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
//Plusieurs variables sont crées en utilisant la fonctionnalité React useState:
// - cards va etre utiliser pour initialiser la partie et générer le deck de carte aléatoirement, l'état est nécessaire pour
// actualiser les valeurs aléatoires en direct et de générer des decks différents à chaque création de nouvelle partie
// - turn pour actualiser la valeur du nombre de tentative en direct, l'état est nécessaire pour l'actualisation (sinon la valeur
// de tour affichée resterait à 0 sur le navigateur malgré une valeur active en console)
// - choiceone et choicetwo car leur état vont etre utiliser pour empecher d'autre action entre le 1er et 2ème clic et après le 2ème 
//clic (par ex retourner plus deux cartes)
// La fonction shuffledcard est la fonction qui va permettre d'incrémenter la variable cards en liste d'objets cardImages.
//La fonction prend la liste d'image et la place dans un array d'objet. Une seconde copie de la liste est insérée dans
// l'array d'objet. Sur cet array est appliquée la méthode sort prenant en entrée une fonction qui génère des chiffre entre -0.5 et 0.5
// et vont permettre de trier les images selon le chiffre attribué à chaque image.
// La méthode map  est appliquée dans un second temp à l'array d'objet. Cette méthode permet de sélectionner chaque élément de l'array
// et de lui appliquer une fonction pour chaque élément. La méthode prend pour entrée l'objet card et génère une liste d'objet
//card et attribue pour chaque objet card un attribut supplémentaire ID. La liste va ensuite définir la valeur de la variable cards.
//Toutes les variables utilisant useState sont réiinistialisés pour redémarrer une partie dans des conditions normales.
//La fonction handlechoice prend pour entrée card et vérifie si la ChoiceOne à une valeur non nulle. Ce test logique permet de 
//s'assurer de l'état de sélection du binome de carte (1ere ou 2ème sélection).
// UseEffect est utilisé pour réaliser des actions spécifiques lors certaines fonctions sont utilisées. UseEffect va etre utiliser
//dans les cas suivants: 
// -  Usage des fonctions choiceOne et choinceTwo. L'action spécifiée est alors la comparaison entre choiceOne et choiceTwo lorsque
//ces deux dernières ont une valeur non nulle. Dans le cas positif, la valeur de la variable cards va etre actualiser à travers l'usage de 
//la fonctionnalité de usestate. Cette modification porte sur l'attribut match de l'objet card, le fixant après modification à
// "true". Cette modification est rendue possible à travers la navigation dans la liste d'objet prevCards et d'appliquer sur chaque
//objet card de la liste prevCard une vérification entre l'objet card de la liste prevCard avec la valeur rendu par la fonction choiceOne.
//Une variable useState est utilisée pour désactiver la fonction handleclik(confère le fichier SingleCard) et empecher les interactions
//avec les autres cartes pendant la vérification entre choiceOne et choiceTwo.
//La fonction app retourne l'affichage du code html: titre, bouton, carte. Pour afficher les cartes, le programme navigue dans la liste
//d'objet cards à  travers la méthode map, prend pour entrée une fonction qui génère un objet SingleCard. Les différents attributs
// de card sont précisés pour pouvoir ultérieurement etre utiliser par la fonction SingleCard.