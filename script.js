let xp=0;
let gold=50;
let health=100;
let currentWeapon=0;
let fighting;
let monsterHealth;
let inventory=["stick"];
const button1=document.querySelector("#button1");
const button2=document.querySelector("#button2");
const button3=document.querySelector("#button3");
const text=document.querySelector("#text");
const xpText=document.querySelector("#xpText");
const healthText=document.querySelector("#healthText");
const goldText=document.querySelector("#goldText");
const monsterNameText=document.querySelector("#monsterName");
const monsterHealthText=document.querySelector("#monsterHealth");
const dragon=document.querySelector(".dragon");
const locations=[
  {
    name:"town square",
    "button text":["Go to Store", "Go to Cave", "Fight Dragon"],
    "button functions":[goStore, goCave, fightDragon],
     text:'You are in the "Town Square". Start your journey or Continue.'
  },
  {
    name:"store",
    "button text":["Buy 10 Health (10 Gold)", "Buy new Weapon (30 Gold)", "Go to Town Square"],
      "button functions":[buyHealth, buyWeapon, goTown],
       text:'You entered the Store.'
    },
  {
  name:"cave",
  "button text":["Fight Slime", "Fight Fanged Beast", "Go to Town Square"],
    "button functions":[fightSlime, fightBeast, goTown],
     text:'You entered the Cave. Get Ready to Fight some Monsters!'
  },
  {
  name:"fight",
  "button text":["Attack", "Dodge", "Run(Lose 15 Health 10 gold)"],
    "button functions":[attack, dodge, run],
     text:'You are Fighting with a Monster!!'
  },
  {
  name:"kill monster",
  "button text":["Go to Town Square", "Go to Town Square", "Go to Town Square"],
    "button functions":[goTown, goTown, easterEgg],
     text:'The Monster screams "Arghhhh!!" as it dies. You gained XP and Gold. Go back to Town Square.'
  },
  {
  name:"win",
    "button text":["Replay?", "Replay?", "Replay?"],
      "button functions":[restart, restart, restart],
       text:'You Defeated the Dragon. YOU WIN THE GAME!!'
  },
  {
  name:"lose",
    "button text":["Replay?", "Replay?", "Replay?"],
      "button functions":[restart, restart, restart],
       text:'You Died! Start Again...'
  },
  {
  name:"easter egg",
    "button text":["2", "8","Go to Town Square"],
      "button functions":[pickTwo, pickEight, goTown],
       text:'You found a Secret Game. Pick a number from the above. Ten numbers will be randomly chosen from 0-10. If the number you choe matches one of the 10 randomly generated numbers, you win! Else you will lose 10 health! BE CAREFUL.'
  }
];
const weapons=[
  {
    name:"stick",
    power:5
  },
  {
    name:"dagger",
    power:30
  },
  {
    name:"claw hammer",
    power:50
  },
  {
    name:"sword",
    power:100
  }
];
const monsters=[
  {
    name:"Slime",
    level:2,
    health:15
  },
  {
    name:"Fanged Beast",
    level:8,
    health:80
  },
  {
    name:"Dragon",
    level:20,
    health:300
  }
];
//initializing the buttons
button1.onclick = goStore;
button2.onclick = goCave;
button3.onclick = fightDragon;
function update(locations)
{
  monsterStats.style.display="none";
  button1.innerText=locations["button text"][0];
  button2.innerText=locations["button text"][1];
  button3.innerText=locations["button text"][2];
  button1.onclick=locations["button functions"][0];
  button2.onclick=locations["button functions"][1];
  button3.onclick=locations["button functions"][2];
  text.innerText=locations.text;
}
function goTown()
{
  update(locations[0]);
}
function goStore()
{
  update(locations[1]);
}
function goCave()
{
  update(locations[2]);
}
function buyHealth()
{
  if(gold>=10)
  {
    gold-=10;
    health+=10;
    goldText.innerText=gold;
    healthText.innerText=health;
  }
  else
  {
    text.innerText="You do not have enough gold to buy Health."
  }
}
function buyWeapon()
{
  if(currentWeapon<weapons.length-1)
  {
    if(gold>=30)
    {
      gold-=30;
      currentWeapon++;
      let newWeapon=weapons[currentWeapon].name;
      text.innerText="You have a new Weapon: "+newWeapon+"!";
      inventory.push(newWeapon); //adding new element to the array
      text.innerText+="In your Inventory you have: " + inventory;
      goldText.innerText=gold;
    }
    else
    {
      text.innerText="You do not have enough gold yo buy a new Weapon.";
    }
  }
  else
  {
    text.innerText="You already have the most powerful Weapon!";
    button2.innerText="Sell weapon for 15 Gold";
    button2.onclick=sellWeapon;
  }
}
function sellWeapon()
{
  if(inventory.length>1)
  {
    gold+=15;
    goldText.innerText=gold;
    let currentWeapon=inventory.shift(); //removing 1st element of the array
    text.innerText="You sold a "+currentWeapon+".";
    text.innerText+="In your inventory you have: "+inventory;
  }
  else
  {
    text.innerText="Do not sell your only Weapon!";
  }
}
function fightSlime()
{
  fighting =0;
  goFight();
}
function fightBeast()
{
  fighting =1;
  goFight();
}
function fightDragon()
{
  fighting =2;
  goFight();
}
function goFight()
{
  update(locations[3]);
  monsterHealth=monsters[fighting].health;
  monsterStats.style.display="block";
  monsterNameText.innerText=monsters[fighting].name;
  monsterHealthText.innerText=monsterHealth;
}
function attack()
{
  text.innerText="The "+monsters[fighting].name+"!";
  text.innerText+="You attack it with your "+weapons[currentWeapon].name+"!";
  if(isMonsterHit())
  {
    health-=getMonsterAttackValue(monsters[fighting].level);
  }
  else
  {
    text.innerText+="You Miss! Try Again!";
  }
    monsterHealth-=weapons[currentWeapon].power+Math.floor(Math.random()*xp+1);
    healthText.innerText=health;
    monsterHealthText.innerText=monsterHealth;
    if(health<=0)
    {
      lose();
    }
    else if(monsterHealth<=0)
    {
      if(fighting===2)
      {
        winGame();
      }
      else
      {
        defeatMonster();
      }
    }

  if(Math.random()<=0.1 && inventory.length!==1)
  {
     text.innerText+="Your "+inventory.pop()+" broke!"; //deleting last element of the array
     currentWeapon--;
  }
}
function getMonsterAttackValue(level)
{
  let hit=(level*5)-(Math.floor(Math.random()*xp));
  return hit;
}
function isMonsterHit()
{
  return Math.random()>.2 || health<20;
}
function defeatMonster()
{
  gold+=Math.floor(monsters[fighting].level*6.5);
  xp+=monsters[fighting].level;
  goldText.innerText=gold;
  xpText.innerText=xp;
  update(locations[4]);
}
function dodge()
{
  text.innerText="You dodged the attack from the "+monsters[fighting].name+"!";
  text.innerText+="This is Your Chance, now Fight Back!";
}
function run()
{
  health-=15;
  gold-=10;
  healthText.innerText=health;
  goldText.innerText=gold;
  goTown();
}
function lose()
{
  update(locations[6]);
}
function win()
{
  update(locations[5]);
}
function restart()
{
  xp=0;
  health=100;
  gold=50;
  currentWeapon=0;
  inventory=["stick"];
  goldText.innerText=gold;
  healthText.innerText=health;
  xpText.innerText=xp;
  goTown();
}
function easterEgg()
{
  update(locations[7]);
}
function pickTwo()
{
  pick(2);
}
function pickEight()
{
  pick(8);
}
function pick(guess)
{
  let numbers=[]; //empty array declaration
  while(numbers.length<10)
    {
      numbers.push(Math.floor(Math.random()*11));
    }
  text.innerText = "You picked "+ guess+". Here are the random numbers:\n";
  for(let i=0; i<10; i++)
    {
      text.innerText+=numbers[i]+"\n";
    }
  if(numbers.indexOf(guess)!==-1)
  {
    text.innerText="Right! You win 20 Gold!";
    gold+=20;
    goldText.innerText=gold;
  }
  else
  {
    text.innerText="Wrong! You lose 10 Health!";
    health-=10;
    healthText.innerText=health;
    if(health<=0)
      lose();
  }
}

