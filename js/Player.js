class Player{

    constructor(name, numOfCards, gameDeck, money, bet){

        this.name = name;
        this.numOfCards = numOfCards;
        this.gameDeck = gameDeck;
        this.hand = [];
        this.money = money;
        this.bet = bet;
        console.log("Pelaaja on luotu: "+ name);
    }

    ShowHand(){
        for(var i = 0; i<this.hand.length; i++){

            console.log("Kortti kädessä " + i + "on: " + this.hand[i] + 
            "Tekstinä: " + this.ConvertCardToText(this.hand[i]));
            document.getElementById("card"+i).innerHTML = "<img src=\"./images/"+(this.hand[i]+1)+".png\">";
        }
    }

    ConvertCardToText(card){

        var suit;
        var number; 

        if(card <= 12){
            suit = "Pata";
            number = card + 1;
        }else if(card <= 25){
            suit = "Ruutu";
            number = card - 12;

        }else if(card <= 38){
            suit = "Risti";
            number = card - 25;

        }else{
            suit = "Hertta";
            number = card - 38;

        }
        return suit + " " + number;
    }

    ChangeCards(cards){

        // cards arvo on esim. 1,2,4
        console.log("Vaihdettavat kortit ovat: " + cards);
        var nums =  cards.split(',');
        console.log("Taulukon pituus: " + nums.length);

        var i = 0;
        while(i<nums.length){


            var cardValue = deck.GetCard();
            console.log("Vedettiin kortti: " + cardValue+ " " + 
            this.ConvertCardToText(cardValue));

            if(deck.takenCards.includes(cardValue) == false){

                console.log("Kortti käteen");
                this.hand[nums[i]] = cardValue;
                deck.takenCards.push(cardValue);
                i++;
            }else{

                console.log("Kortti oli jo vedetty");

            }
            // Hetaan yksittäinen satunnainen korttinumero GetCard() metodista
            // Kirjoitetaan logiin mikä kortti juuri vedettiin. Myös tekstinä
            // Tarkastetaan onko kortti jo vedettyjen korttien taulukossa
            // Jos ei ole, laitetaan kortti pelaajan käteen this.hand[nums[i]]
            // Laitetaan koritti myös vedettyjen korttien taulukkon
            // kasvatetaan i++


        } // while loppuu
        this.ShowHand();
        this.CheckResults();
        // näytetään pelaajan käsi  this.ShowHand();
        // tarkastetaan tulokset (Tehdään yhdessä)
    } 

    CheckResults(){

        var winnings = 0;
        var resultDone = false; 
        console.log("Tarkastetaan tulokset panoksella: " + this.bet);
        // Laitetaan kortit numerojärjestykseen kädessä
        this.hand.sort(function(a,b){return a-b});
        // Käydään läpi hand taulukko
        for(var i = 0; i<this.hand.length; i++){

            console.log("Kortti kädessä" + i + "on: " + this.hand[i] + "Tekstinä: " + 
            this.ConvertCardToText(this.hand[i]));
        }

        // Tarkastetaan onko kädessä väri
        if(resultDone == false && this.GetSuit(this.hand[0]) == this.GetSuit(this.hand[1]) && 
        this.GetSuit(this.hand[1]) == this.GetSuit(this.hand[2]) && 
        this.GetSuit(this.hand[2]) == this.GetSuit(this.hand[3]) &&
        this.GetSuit(this.hand[3]) == this.GetSuit(this.hand[4]))
        {
            console.log("SINULLA ON VÄRI");
            winnings = this.bet * 6;
            resultDone = true; 
        }

        // Tarkastetaan onko kädessä suora
        var straightHand = [];

        for(var i = 0; i<this.hand.length; i++){

            straightHand.push(this.GetNumber(this.hand[i]));
        }
        straightHand.sort(function(a,b){return a-b});

        if(resultDone == false && straightHand[0] - straightHand[1] == -1 &&
        straightHand[1] - straightHand[2] == -1 &&
        straightHand[2] - straightHand[3] == -1 &&
        straightHand[3] - straightHand[4] == -1)
        {
            console.log("SINULLA ON SUORA");
            winnings = this.bet * 4;
            resultDone = true; 
        }

        // Tarkastetaan parit, kolmoset ja neloset

        var pairHand = [];

        for(var i = 0; i<this.hand.length; i++){

            pairHand.push(this.GetNumber(this.hand[i]));
        }
        console.log(pairHand);
        var duplicates = this.FindDuplicateInHand(pairHand);
        // duplicate = [4,8]
        console.log(duplicates);
        var count = 0; // paljonko on ensimmäistä lukua 
        var count2 = 0; // paljonko on toista lukua
        for(var i = 0; i < pairHand.length; ++i){
            if(duplicates[0] == pairHand[i] && duplicates.length > 0){
                count++;
            }
            if(duplicates[1] == pairHand[i] && duplicates.length > 1){
                count2++;
            }
        }
        console.log("Toista numeroa on: " + count + " ja toista: " + count2);
        // Tarkastetaan neloset, täyskäsi, kolmoset, kaksi paria ja pari

        //Ilmoittaa mitä voitit
        let winPar = document.getElementById("voittoKäsi")

        if(resultDone == false){
            if(count == 4){
                console.log("Neljä samaa");
                winnings = this.bet * 20;
                winPar.textContent = `Sait neljä samaa! Voitit ${winnings} €`;
            }else if(count >= 2 && count2 >= 2){
                if(count == 3 || count2 == 3){
                    console.log("Täyskäsi");
                    winnings = this.bet * 9;
                    winPar.textContent = `Sait täyskädellä voiton! Voitit ${winnings} €`;
                }else{
                    console.log("Kaksi paria");
                    winnings = this.bet * 3;
                    winPar.textContent = `Sait kaksi paria! Voitit ${winnings} €`;
                }
            }else if(count == 3 || count2 == 3){
                console.log("Kolme samaa");
                winnings = this.bet * 4;
                winPar.textContent = `Sait kolme samaa! Voitit ${winnings} €`;
            }
            else if(count == 2 || count2 == 2){
                    console.log("Pari");
                    winnings = this.bet * 1;
                    winPar.textContent = `Sait parin! Voitit ${winnings} €`;
            }else{
                console.log("Ei ole mitään");
                winnings = 0;
                winPar.textContent = "Ei voittoa tällä kertaa.";
            }
        }// resultsDone päättyy


        
        var currentMoney = this.money;
        this.money += winnings;
        console.log("WINNINGS: " + winnings);
      //  document.getElementById("money").innerHTML = this.money;
        
        var newMoney = Number(currentMoney + winnings);
        console.log("NEWMONEY: " + newMoney);
        var interval = setInterval(function() {
            console.log("RAHAA: " + Number(player.money));
            document.getElementById("money").innerHTML = currentMoney;
            if (currentMoney >= newMoney)
            {
                this.money = currentMoney;
                console.log("RAHATILANNE" + this.money);
                clearInterval(interval);
            }
            currentMoney++;
        }, 30);
        
    }

    FindDuplicateInHand(arra1) {
        var object = {};
        var result = [];

        arra1.forEach(function (item) {
          if(!object[item]){
            object[item] = 0;
          }
            object[item] += 1;
     
        })

        for (var prop in object) {
           if(object[prop] >= 2) {
               result.push(prop);
           }
        }
        return result;
    }

    GetSuit(card){

        var suit;
        if(card <= 12){
            suit = "Pata";     
        }else if(card <= 25){
            suit = "Ruutu";
        }else if(card <= 38){
            suit = "Risti";
        }else{
            suit = "Hertta";
        }
        return suit;
    }

    GetNumber(card){
        var number; 

        if(card <= 12){
            number = card + 1;
        }else if(card <= 25){
            number = card - 12;
        }else if(card <= 38){
            number = card - 25;
        }else{
            number = card - 38;
        }
        return Number(number);
    }
}