const PLAYER_LIVES = 7
const CARDS_COUNT = 16

const section = document.querySelector(".cards-container")
const playerLivesCount = document.querySelector(".player-lives-count")
const livesContainer = document.querySelector(".lives")
const restartButton = document.querySelector(".restart-button")

playerLivesCount.textContent = PLAYER_LIVES

restartButton.addEventListener("click", () => restart("Go again."))

const getCardsData = () => {
    return [
        {imgSrc: "./images/C_Sharp_Icon.png", name: "csharp"},
        {imgSrc: "./images/Go-Logo.png", name: "golang"},
        {imgSrc: "./images/Java_logo.png", name: "java"},
        {imgSrc: "./images/Kotlin_Icon.png", name: "kotlin"},
        {imgSrc: "./images/Python-logo.png", name: "python"},
        {imgSrc: "./images/Ruby_logo.png", name: "ruby"},
        {imgSrc: "./images/Rust_logo.png", name: "rust"},
        {imgSrc: "./images/Typescript_logo.png", name: "typescript"},

        {imgSrc: "./images/C_Sharp_Icon.png", name: "csharp"},
        {imgSrc: "./images/Go-Logo.png", name: "golang"},
        {imgSrc: "./images/Java_logo.png", name: "java"},
        {imgSrc: "./images/Kotlin_Icon.png", name: "kotlin"},
        {imgSrc: "./images/Python-logo.png", name: "python"},
        {imgSrc: "./images/Ruby_logo.png", name: "ruby"},
        {imgSrc: "./images/Rust_logo.png", name: "rust"},
        {imgSrc: "./images/Typescript_logo.png", name: "typescript"},
    ]
}

const randomizeCards = () => {
    const cardsData = getCardsData()
    cardsData.sort(() => Math.random() - 0.5)

    return cardsData
}

const cardGenerator = () => {
    const cards = randomizeCards()

    cards.forEach((card) => {
        const cardContainer = document.createElement("div")
        const faceContainer = document.createElement("img")
        const backContainer = document.createElement("div")
    
        cardContainer.classList = "card"
        faceContainer.classList = "face"
        backContainer.classList = "back"

        faceContainer.src = card.imgSrc
        cardContainer.setAttribute("name", card.name)
        
        cardContainer.appendChild(faceContainer)
        cardContainer.appendChild(backContainer)

        cardContainer.addEventListener("click", (e) => {
            cardContainer.classList.toggle("toggle-card")
            checkCards(e)
        })

        section.appendChild(cardContainer)
    })
}

const checkCards = (e) => {
    const clickedCard = e.target
    clickedCard.classList.add("flipped")

    const flippedCards = document.querySelectorAll(".flipped")
    const toggledCards = document.querySelectorAll(".toggle-card")

    if(flippedCards.length === 2) {
        const firstCard = flippedCards[0].getAttribute("name") 
        const secondCard = flippedCards[1].getAttribute("name")

        if(firstCard === secondCard) {
            guessRight(flippedCards)
        } else {
            guessWrong(flippedCards)
        }
    }

    if(toggledCards.length === CARDS_COUNT) {
        restart("You won.")
    }
}

const guessRight = (flippedCards) => {
    flippedCards.forEach((card) => {
        card.classList.remove("flipped")
        card.style.pointerEvents = "none"
    })
}

const guessWrong = (flippedCards) => {
    flippedCards.forEach((card) => {
        card.classList.remove("flipped")

        setTimeout(() => {
            card.classList.remove("toggle-card")
        }, 600)
    })

    updatePlayerLivesCount()
}

const updatePlayerLivesCount = () => {
    if(+playerLivesCount.textContent === 0) {
        restart("You lost. Try again.")
    } else {
        if(playerLivesCount.textContent <= 3) {
            livesContainer.style.color = "#BF0603"
        }

        playerLivesCount.textContent -= 1
    }
}

const restart = (text) => {
    let cardsData = randomizeCards()
    let faces = document.querySelectorAll(".face")
    let cards = document.querySelectorAll(".card")

    section.style.pointerEvents = "none"

    cardsData.forEach((card, idx) => {
        cards[idx].classList.remove("toggle-card")

        setTimeout(() => {
            cards[idx].style.pointerEvents = "all"
            cards[idx].setAttribute("name", card.name)
    
            faces[idx].src = card.imgSrc

            section.style.pointerEvents = "all"
        }, 1000)
 
    })

    alert(text)

    playerLivesCount.textContent = PLAYER_LIVES
    livesContainer.style.color = "#09BC8A"
}

cardGenerator()