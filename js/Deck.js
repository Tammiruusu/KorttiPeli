class Deck{

    constructor(){

       // this.deckCards = [0,1,2,13,14,15,16];
        
        this.deckCards = [0,1,2,3,4,5,6,7,8,9,10,
            11,12,13,14,15,16,17,18,19,20,
            21,22,23,24,25,26,27,28,29,30,
            31,32,33,34,35,36,37,38,39,40,
            41,42,43,44,45,46,47,48,49,50,51];


        this.takenCards = [];
        console.log("Pakka luotu");

    }

    Deal(amount, player){

        console.log("Jaetaan " + amount + "korttia pelaajalle " + player.name);
        // Ota deckCards taulukosta satunnaisesti kortteja amount arvon verran.
        // Tarkasta onko jo otettu kortti takenCard taulukossa.
        // Jos on, ota uusi satunnainen kortti. 
        // Jos ei, laita kortti player objektin hand[] taulukkomuuttujaan
        // Ja lisää vedetty kortti takenCard taulukkoon. 
        // Kerro konsolissa mikä kortti vedettiin

        var i = 0;
        while(i < amount){

            var cardValue = this.deckCards[Math.floor(this.deckCards.length * Math.random())];

            

            if(this.takenCards.includes(cardValue))
            {
                console.log("Kortti " + cardValue + 
                "oli jo vedetty. Arvotaan kortti uudestaan");

            }else{
                console.log("Kortti, jonka sait käteen on: " + cardValue);
                player.hand[i] = cardValue;
                this.takenCards.push(cardValue);
                i++;
            }
        }
        // Halutaan näyttää pelaajan käsi hand[]
        player.ShowHand();
    }

    GetCard(){

        // GetCard palauttaa satunnaisen luvun Deckin arvoista. 
        var card = this.deckCards[Math.floor(this.deckCards.length * Math.random())];
        return card; 

    }

}