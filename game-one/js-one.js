/*
Game: Rock, Paper, Scissors, Lizard, Spock
The Mission

Make a Rock, Paper, Scissors, Lizard, Spock game. It's like Rock, Paper, Scissors, but more fun!
Must-have features

    Have five buttons that the player can press to change their pick
    Have another button to let the computer pick one
    Show the winner
    Let the player know if they won or not (no alert box)
    Have a reset button

Nice-to-have features

    Nice graphics
    Simulate the computer thinking/working by using a timeout
    Let the player input using a text field
    Show what the player picked by highlighting the correct button
    Add more options (but avoid using 100 if statements)
    Add complex rules
*/
/*Scissors cuts Paper
Paper covers Rock
Rock crushes Lizard
Lizard poisons Spock
Spock smashes Scissors
Scissors decapitates Lizard
Lizard eats Paper
Paper disproves Spock
Spock vaporizes Rock
(and as it always has) Rock crushes Scissors*/


//used variables on this page. 
//some constants for tailwind classes
//also uses localstorage variables 'spent' and 'balance', and 'game1unlock' for the unlocks in this game

let playerpick, rand, computerpick, choices, score, stakes, drakewins

const buttonclass = "relative inline-flex items-center mb-1 px-4 py-2 border border-transparent text-lg leading-5 font-medium rounded-md text-grey-900 bg-orange-500 hover:bg-indigo-400 focus:outline-none focus:shadow-outline-indigo focus:border-indigo-600 active:bg-indigo-600 transition duration-150 ease-in-out"
const buttonhighlightclass  = "relative inline-flex items-center mb-1 px-4 py-2 border border-transparent text-lg leading-5 font-bold rounded-md text-grey-900 bg-orange-100 hover:bg-indigo-100 transition duration-150 ease-in-out"

score = 0;
drakewins = 0;

$("balance").innerText = "Balance:" + Number(localStorage.getItem("balance"));

//this function is used to shorten the whole getElementById method
function $(x) {return document.getElementById(x);}

//this function is used to change the class of a target element
function newclass(a, b) 
{$(a).removeAttribute("class"); 
 $(a).setAttribute("class",b)}

//hide the element to buy more coins at first

$("pay10").hidden = 1

//playerpick buttons, two creatures are hidden in the beginning

$('rock').onclick = () => {
    reset();
    playerpick = "rock";
    newclass('rock',buttonhighlightclass);
}
$('paper').onclick = () => {
    reset();
    playerpick = "paper";
    $('paper').setAttribute("class", buttonhighlightclass);
}
$('scissors').onclick = () => {
    reset();
    playerpick = "scissors";
    $('scissors').setAttribute("class", buttonhighlightclass);
}
$('lizard').onclick = () => {
    reset();
    playerpick = "lizard";
    $('lizard').setAttribute("class", buttonhighlightclass);
}
$('spock').onclick = () => {
    reset();
    playerpick = "spock";
    $('spock').setAttribute("class", buttonhighlightclass);
}

$('secret').onclick = () => {
    if (localStorage.getItem("game1unlock") > 0)
    {reset();
    playerpick = "drake";
    $('secret').setAttribute("class", buttonhighlightclass);
    $("play1").hidden = 1;
    $("play5").hidden = 1;
    $("play100").hidden = 0
    }
}

$('supersecret').onclick = () => {
    if (localStorage.getItem("game1unlock") > 1)
    {reset();
    playerpick = "wizard";;
    $('supersecret').setAttribute("class", buttonhighlightclass);
    $("play1").hidden = 1;
    $("play5").hidden = 0;
    $("play100").hidden = 0}
}

//play buttons with different stakes

$('play1').onclick = () => {
    if (Number(localStorage.getItem("balance")) >= 1)
    {if (playerpick != undefined) {
        stakes = 1;
        compare()
    } else {
        $("playerpick").innerText = "Please make your pick."}}
    else
    {$("playerpick").innerText = "Not enough balance.";
    $("pay10").hidden = 0
    }
}

$('play5').onclick = () => {
    if (Number(localStorage.getItem("balance")) >= 5)
    {if (playerpick != undefined) {
        stakes = 5;
        compare()
    } else {
        $("playerpick").innerText = "Please make your pick."}}
    else
    {$("playerpick").innerText = "Not enough balance.";
    $("pay10").hidden = 0
    }
}

$('play100').onclick = () => {
    if (Number(localStorage.getItem("balance")) >= 100)
    {if (playerpick != undefined) {
        stakes = 100;
        compare()
    } else {
        $("playerpick").innerText = "Please make your pick."}}
    else
    {$("playerpick").innerText = "Not enough balance.";
    $("pay100").hidden = 0
    }
}

//visible if balance is too low. Adds coins (and also tracks amount spent).

$('pay10').onclick = () => {
localStorage.setItem("balance", Number(localStorage.getItem("balance")) + 10);
localStorage.setItem("spent", Number(localStorage.getItem("spent")) + 10);
$("balance").innerText = "Balance:" + Number(localStorage.getItem("balance"));
$("playerpick").innerText = "Added 10 coins to balance.";
$("pay10").hidden = 1}

$('pay100').onclick = () => {
    localStorage.setItem("balance", Number(localStorage.getItem("balance")) + 100);
    localStorage.setItem("spent", Number(localStorage.getItem("spent")) + 100);
    $("balance").innerText = "Balance:" + Number(localStorage.getItem("balance"));
    $("playerpick").innerText = "Added 100 coins to balance.";
    $("pay100").hidden = 1}

//resets the score of the game

$('reset').onclick = () => {
    score = 0;
    $("score").innerText = "Score reset to 0";
    reset()
}

function reset() {
    $('rock').setAttribute("class",buttonclass);
    $('paper').setAttribute("class",buttonclass);
    $('scissors').setAttribute("class",buttonclass);
    $('lizard').setAttribute("class",buttonclass);
    $('spock').setAttribute("class",buttonclass);
    $('secret').setAttribute("class",buttonclass);
    $('supersecret').setAttribute("class",buttonclass);
    $("play1").hidden = 0;
    $("play5").hidden = 0;
    $("play100").hidden = 1
    playerpick = undefined
}

//the possible combinations
//rock: 0 paper: 1 scissors: 2 lizard: 3 spock: 4 drake: 5 wizard: 6

choices = ["rock", "paper", "scissors", "lizard", "spock", "drake", "wizard"]
rockarray = [
    ["The two rocks hit eachother and nothing happens.",0],
    ["Your rock is wrapped in paper and suffocates. It's a special rock, with lungs.",-1],
    ["Your rock smashes the scissors.",+1],
    ["Your rock stone-cold squashes the lizard to a pulp.",+1],
    ["Your rock is vaporized by Spock.",-1]
]
paperarray = [
    ["Your paper covers the rock. It gets published in a leading geology journal.",+1],
    ["Two papers. That's a brochure. I mean a tie.",0],
    ["Your paper is cut to shreds by the scissors.",-1],
    ["Your paper is eaten by the lizard.",-1],
    ["Your paper refutes the Spock. Take that!",+1],
]
scissorsarray = [
    ["Your scissors are smashed by the rock.",-1],
    ["Your scissors cut up the paper.",+1],
    ["Have you ever made a tie with two scissors? You have now.",0],
    ["Your scissors decapitated the lizard!",+1],
    ["Your scissors are crushed by mister Spock.",-1]
]
lizardarray = [
    ["Ssss. Your lizard is sssquashed by a big rock.",-1],
    ["Yummy. Your lizard ate the paper :).",+1],
    ["Swish! Your lizard is cut in half by the scissors. Can lizards grow back half their body or only their tails?",-1],
    ["Oh nice! Another lizard. Hello fellow lizard. It's a tie.",0],
    ["Hehe >:) Your lizard poisoned the spock.",+1]
]
spockarray = [
    ["Your Spock vaporizes the rock! Don't fock with the Spock, rock.",+1],
    ["Your Spock is disproven by the paper. You wither away in shame.",-1],
    ["Your Spock smashes the scissors! Spocktastic!",+1],
    ["Spock was poisoned by the computer's lizard. Who knew reptiles were its weakness?",-1],
    ["Spocks don't take issue with eachother. It's a tie.",0]
]
drakearray = [
    ["The high stake fire-breathing drake tries to burn the rock! The rock doesn't care about fire. The drake collapses, exhausted.",-1],
    ["The high stake fire-breathing drake burns the paper! That was easy.",+1],
    ["The high stake fire-breathing drake had its wings cut off by the scissors.",-1],
    ["The high stake fire-breathing drake impresses the tiny lizard! It surrenders to its mightier reptilian kin.",+1],
    ["The high stake fire-breathing drake and Spock respect eachother as rational beings. They both walk out in peace.",0]
]  
wizardarray = [
    ["The wizard encounters a rock. The wizard ponders on the things this rock has seen. The rock has existed for billions of years, the wizard's life of centuries is merely a blink of an eye. The wizard feels small and insignificant. The rock is not hindered by such feelings. It will continue rocking on until the end of time, maybe as sand or magma but then as a rock again. You win this one, rock.",-1],
    ["The wizard encounters a paper. It is a bank statement. The wizard realizes that in all his years in wizarding school, he only learned about monsters, the dark arts and similarly arcane topics. His spelling and mathematics skills are terrible. He suddenly feels doubt about his education. Will he ever fit in this world? The wizard retreats introspectively.",-1],
    ["The computer uses scissors against the wizard. The wizard's hat is cut off. It contained all his magical powers. He is no longer a wizard, just a weeping hobo.",-1],
    ["The wizard sees a lizard. Hey, that rhymes! Wizard, lizard, gizzard. He thinks of a song but it's quite hard to write one. He hasn't realized the lizard bit him and one month later the wizard's leg has to be amputated. It was gangrene.",-1],
    ["Spock is a man of science. He tells the wizard that magic doesn't exist. It's true. The wizard is exposed for the charlatan he is. How sad.",-1]
]

//wait then see who wins and adds to score and balance

timeout = (ms) => {return new Promise(resolve => setTimeout(resolve, ms))}

async function compare() {
    $("computerpick").innerText = "Ready...";
    $("playerpick").innerText = "Ready...";
    await timeout(500);

    $("computerpick").innerText = "Set...";
    $("playerpick").innerText = "Set...";
    await timeout(500);

    rand = Math.floor(Math.random() * 5);

    //if the player's balance and the stakes are high, give the casino a little help
    if (localStorage.getItem("balance") > (Math.random() * 200 - stakes*10))
    {switch(playerpick)
        {case "rock": if (rand == 2 || rand == 3){rand = Math.floor(Math.random() * 5)}; break;
         case "paper": if (rand == 0 || rand == 4){rand = Math.floor(Math.random() * 5)}; break;
         case "scissors": if (rand == 1 || rand == 3){rand = Math.floor(Math.random() * 5)}; break;
         case "lizard": if (rand == 1 || rand == 4){rand = Math.floor(Math.random() * 5)}; break;
         case "spock": if (rand == 0 || rand == 2){rand = Math.floor(Math.random() * 5)}; break;
         case "drake": if (rand == 1 || rand == 3){rand = Math.floor(Math.random() * 5)}; break;
        }
    }

    //count drakewins
    if ((playerpick == "drake") && (rand == 1 || rand == 3) && localStorage.getItem("game1unlock") < 2)
    {drakewins += 1; $("supersecret").innerHTML = ">Win another " + (5-drakewins) + " times with the </br> drake to game1unlock."};

    //compare computerpick and playerpick and choose the result out of the arrays
    computerpick = choices[rand];
    $("computerpick").innerText = computerpick;
    $("playerpick").innerText = playerpick;
    await timeout(500);
    
    switch (playerpick) {
        case "rock":
            $("winnermsg").innerText = rockarray[rand][0]; score += rockarray[rand][1]*stakes; 
            localStorage.setItem("balance", Number(localStorage.getItem("balance")) + rockarray[rand][1]*stakes);
            break;
        case "paper":
            $("winnermsg").innerText = paperarray[rand][0]; score += paperarray[rand][1]*stakes;
            localStorage.setItem("balance", Number(localStorage.getItem("balance")) + paperarray[rand][1]*stakes);
            break;
        case "scissors":
            $("winnermsg").innerText = scissorsarray[rand][0]; score += scissorsarray[rand][1]*stakes;
            localStorage.setItem("balance", Number(localStorage.getItem("balance")) + scissorsarray[rand][1]*stakes);
            break;
        case "lizard":
            $("winnermsg").innerText = lizardarray[rand][0]; score += lizardarray[rand][1]*stakes;
            localStorage.setItem("balance", Number(localStorage.getItem("balance")) + lizardarray[rand][1]*stakes);
            break;
        case "spock":
            $("winnermsg").innerText = spockarray[rand][0]; score += spockarray[rand][1]*stakes;
            localStorage.setItem("balance", Number(localStorage.getItem("balance")) + spockarray[rand][1]*stakes);
            break;
        case "drake":
            $("winnermsg").innerText = drakearray[rand][0]; score += drakearray[rand][1]*stakes;
            localStorage.setItem("balance", Number(localStorage.getItem("balance")) + drakearray[rand][1]*stakes);
            break;
        case "wizard":
            $("winnermsg").innerText = wizardarray[rand][0]; score += wizardarray[rand][1]*stakes;
            localStorage.setItem("balance", Number(localStorage.getItem("balance")) + wizardarray[rand][1]*stakes);
            break;
        }
    
        if (score >= 27) {game1unlock(1)};
        if (drakewins >= 5) {game1unlock(2)};
        $("score").innerText = "Score: " + score;
        $("balance").innerText = "Balance: " + Number(localStorage.getItem("balance"));
}

//game1unlock secret creatures

if (localStorage.getItem("game1unlock") > 0)
{game1unlock(localStorage.getItem("game1unlock"))}

function game1unlock(level) {
    if (localStorage.getItem("game1unlock") == null || localStorage.getItem("game1unlock") == 1 || localStorage.getItem("game1unlock") == 0)
     {localStorage.setItem("game1unlock", level)}
     level = localStorage.getItem("game1unlock")

     if (level > 0)
        {$("secret").innerHTML = "High stake </br> fire breathing drake"; $("supersecret").hidden = false}
     if (level > 1)
        {$("supersecret").innerHTML = "Weeping </br> wizard"}
    }