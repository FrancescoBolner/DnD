// Global variables

// Constant
const domain = "DnD_";
const cage = 365;
const vcolor = "--td-background-color";
const dcolor = "rgb(0, 255, 0)";

// Set nplayer
var nplayer = getCookieValue(1, "General");
if(nplayer == "")
    nplayer = 7; // Chage to 0

// Set nlist
var nlists = getCookieValue(1, "General");
if(nlists == "")
    nlists = 5; // Chage to 0

// Create the lists
var idlist = [];
var checkBoxTypes = [];
for(let player = 1; player <= nplayer; player++) {
    idlist.push(1);
    checkBoxTypes.push("PlayerSpell" + player);
}


// Website Load

function onLoad() { // Col cazzo che sistomo questo ora (lo faccio domani)
    // Random background
    document.body.style.backgroundImage = 'url("File/Sfondo/Sfondo' + Math.floor(Math.random() * 4 + 1) + '.png")';

    // Combact List
    
    let cookie;
    let cookieboss;
    let cookiesplit;

    for(let lists = 1; lists <= nlists; lists++) {
        cookie = getCookie("CombactList" + lists);
        if(cookie != "") {
            cookie = parseInt(cookie);
            document.getElementById("CombactList" + lists).style.display = "inline-block";

            for(let player = nplayer + 1; player >= 1; player--) {
                if(getCookieValue(1, "PlayerBox" + player) != "")
                    document.getElementById("PlayerSelect" + player).textContent = getCookieValue(1, "PlayerBox" + player);
              
                if(cookie % 10) {
                    if(getCookie("BossName" + lists) != "") {
                        cookieboss = getCookie("BossName" + lists);
                        cookiesplit = cookieboss.split('-');
                    }

                    if(player != 8) {
                        if(getCookieValue(1, "PlayerBox" + player) != "") {
                            document.getElementById("selector" + lists + player).innerHTML = "<div>&equiv;</div>" + getCookieValue(1, "PlayerBox" + player);
                        }
                        else {
                            document.getElementById("selector" + lists + player).innerHTML = "<div>&equiv;</div>Player " + player;
                        }
                    } else if(getCookie("BossName" + lists) != "" && cookiesplit[1] != "undefined")
                        document.getElementById("selector" + lists + player).innerHTML = '<div>&equiv;</div><input type="text" placeholder="Extra Boss" value="' + cookiesplit[1] + '" onkeypress="saveBossName(this, 2, 5)"></input>';

                    if(getCookie("BossName" + lists) != "" && cookiesplit[0] != "undefined")
                        document.getElementById("bossselector" + lists).value = cookiesplit[0];

                    document.getElementById("selector" + lists + player).style.display = "block";
                } else {
                    document.getElementById("selector" + lists + player).style.display = "none";
                }

                cookie = parseInt(cookie / 10);
            }
        } else
            document.getElementById("CombactList" + lists).style.display = "none";
    }

    // Player Box

    let nspell;
    let nspellused;

    for(let player = 1; player <= nplayer; player++) {
        cookie = getCookie("PlayerBox" + player);
        if(cookie != "") {
            document.getElementById("PlayerBox" + player).style.display = "inline-block";

            document.getElementById("PlayerName" + player).textContent = getCookieValue(1, "PlayerBox" + player); // 1 = name; 2 = MaxHP; 3 = HP; 4 = Spell; 5 = UsedSpell

            document.getElementById("PlayerHPBar" + player).max = getCookieValue(2, "PlayerBox" + player);
            document.getElementById("PlayerHPBar" + player).value = getCookieValue(3, "PlayerBox" + player);
            document.getElementById("PlayerShow" + player).textContent = getCookieValue(3, "PlayerBox" + player);
            document.getElementById("PlayerHPSet" + player).value = getCookieValue(2, "PlayerBox" + player);

            var green = Number(document.getElementById("PlayerHPBar" + player).value) / Number(document.getElementById("PlayerHPBar" + player).max) * 255;
            var red = 255 - green;
            document.getElementById("PlayerHPBar" + player).style.setProperty("--td-background-color", "rgb(" + red + ", " + green + ", 0)");

            nspell = getCookieValue(4, "PlayerBox" + player);
            for(var i = idlist[player - 1]; i <= nspell; i++)
                addSpell(player);

            nspellused = Number(getCookieValue(5, "PlayerBox" + player));
            for(var i = 1; i <= nspellused; i++)
                document.getElementById("PlayerSpell" + player + "-" + i).checked = 1;
        }
    }
}


// Combact List

$( function() {
    $( "#sortable1, #sortable2, #sortable3, #sortable4, #sortable5" ).sortable({
      connectWith: ".connectedSortable"
    }).disableSelection();
});


$( function() {
    $( "#sortable" ).sortable();
    $( "#sortable" ).disableSelection();
});


let items = document.querySelectorAll("#items-list > li");
items.forEach((item) => {
    $(item).prop("draggable", true);
    item.addEventListener("dragstart", dragStart);
    item.addEventListener("drop", dropped);
    item.addEventListener("dragenter", cancelDefault);
    item.addEventListener("dragover", cancelDefault);
});


function dragStart(e) {
    var index = $(e.target).index();
    e.dataTransfer.setData("text/plain", index);
}


function dropped(e) {
    cancelDefault(e);

    // get new and old index
    let oldIndex = e.dataTransfer.getData("text/plain");
    let target = $(e.target);
    let newIndex = target.index();

    // remove dropped items at old place
    let dropped = $(this).parent().children().eq(oldIndex).remove();

    // insert the dropped items at new place
    if (newIndex < oldIndex) {
        target.before(dropped);
    } else {
        target.after(dropped);
    }
}


function cancelDefault(e) {
    e.preventDefault();
    e.stopPropagation();
    return false;
}


function combactList() {
    const extrabossid = nplayer + 1;
    const extrabossselector = document.getElementById("Player" + extrabossid);
    let cookie = ""; // Create the coockie value
    let CombactListN, playername, playerselector, extrabosslist;

    for(let lists = 1; lists <= nlists; lists++) { // For each list
        CombactListN = document.getElementById("CombactList" + lists);

        if(CombactListN.style.display != "inline-block") { // If the list doesn't exist
            for (let player = 1; player <= nplayer; player++) {
                playername = getCookieValue(1, "PlayerBox" + player);
                playerlist = document.getElementById("selector" + lists + player);
                playerselector = document.getElementById("Player" + player);

                if(playerselector.checked) { // If player checked show player
                    if(playername != "") // If named chage name
                        playerlist.innerHTML = "<div>&equiv;</div>" + playername;
                    else
                        playerlist.innerHTML = "<div>&equiv;</div>Player " + player;
                    cookie += "1";
                } else {
                    playerlist.style.display = "none";
                    cookie += "0";
                }
            }

            // Extra boos
            extrabosslist = document.getElementById("selector" + lists + extrabossid);
            if(extrabossselector.checked) {
                extrabosslist.style.display = "block";
                cookie += "1";
            } else {
                extrabosslist.style.display = "none";
                cookie += "0";
            }

            CombactListN.style.display = "inline-block"; // Show the list
            setCookie("CombactList" + lists, cookie, 365); // Set the coockie
            break; // Exit the for loop
        }
    }
}


function combactListClose(list) { // Close the list
    document.getElementById(list).style.display = "none";

    // Set coockies
    setCookie(list, "", 365);
    setCookie("BossName" + list.slice(-1), "", 365);
}


function combactListName() { // Set player names
    let coockie;
    let playerlist, playerselect;

    for(let lists = 1; lists <= nlists; lists++) { // For each list
        for (let player = nplayer; player >= 1; player--) { // For each player
            coockie = getCookieValue(1, "PlayerBox" + player);
            playerlist = document.getElementById("selector" + lists + player);
            playerselect = document.getElementById("PlayerSelect" + player);

            if(coockie != "") { // If the coockie exist set the names
                playerlist.innerHTML = "<div>&equiv;</div>" + coockie;
                playerselect.textContent = coockie;
            }
            else { // Set the defoult name
                playerlist.innerHTML = "<div>&equiv;</div>Player " + player;
                playerselect.textContent = "Player " + player;
            }
        }
    }
}


function saveBossName(imput, type, list) { // Seve the boss name
    const cookie = getCookie("BossName" + list);
    let cookieSplit = cookie.split('-');

    // Set the name
    cookieSplit[type - 1] = imput.value;

    // Create the cookies
    setCookie("BossName" + list, cookieSplit[0] + "-" + cookieSplit[1], 365);
}


// Player

function playerGenerator() { // Create a new player
    const PlayerHP = document.getElementById("PlayerHP").value;
    const PlayerName1 = document.getElementById("PlayerName").value;
    const PlayerSpell = document.getElementById("PlayerSpell").value;
    let nspell;
    let PlayerBox, PlayerName, PlayerHPBar, PlayerShow, PlayerHPSet;

    if(PlayerName1 != "" && PlayerHP > 0 && PlayerSpell >= 0 && PlayerSpell <= 9) { // Check parameter
        for(let player = 1; player <= nplayer; player++) { // For each player box
            PlayerBox = document.getElementById("PlayerBox" + player);

            if(PlayerBox.style.display != "inline-block") { // If playerbox not exist
                PlayerName = document.getElementById("PlayerName" + player);
                PlayerHPBar = document.getElementById("PlayerHPBar" + player);
                PlayerShow = document.getElementById("PlayerShow" + player)
                PlayerHPSet = document.getElementById("PlayerHPSet" + player);

                // Set player name
                PlayerName.textContent = PlayerName1;

                // Set the player value
                PlayerHPBar.max = PlayerHP;
                PlayerHPBar.value = PlayerHP;
                PlayerHPBar.style.setProperty(vcolor, dcolor);

                // Set HP
                PlayerShow.textContent = PlayerHP;
                PlayerHPSet.value = PlayerHP;

                // Set spell checkbox
                nspell = PlayerSpell;
                for(var i = 1; i <= nspell; i++)
                    addSpell(player);
                document.getElementById("AddSpell" + player).style.display = "inline-block"; // Show add sell button

                // Show the player box
                PlayerBox.style.display = "inline-block";

                // Set coockies
                setCookie("PlayerBox" + player, PlayerName1 + "-" + PlayerHP + "-" + PlayerHP + "-" + PlayerSpell + "-0", 365);
                break; // End the for loop
            }
        }
        combactListName(); // Set the combact list names
    }
}


function addHP(player) { // Add hp
    const PlayerHPBar = document.getElementById("PlayerHPBar" + player);
    const PlayerHP = document.getElementById("PlayerHP" + player);
    const PlayerShow = document.getElementById("PlayerShow" + player);

    // Set bar value
    PlayerHPBar.value = Number(PlayerHPBar.value) + Number(PlayerHP.value);
    PlayerShow.textContent = PlayerHPBar.value;

    // Set colors
    var green = Number(PlayerHPBar.value) / Number(PlayerHPBar.max) * 255;
    var red = 255 - green;
    PlayerHPBar.style.setProperty("--td-background-color", "rgb(" + red + ", " + green + ", 0)");

    // Set coockies
    setCookieValue(PlayerHPBar.value, 3, "PlayerBox" + player);
}


function subtractHP(player) { // Subtract hp
    const PlayerHPBar = document.getElementById("PlayerHPBar" + player);
    const PlayerHP = document.getElementById("PlayerHP" + player);
    const PlayerShow = document.getElementById("PlayerShow" + player);

    // Set bar value
    PlayerHPBar.value = Number(PlayerHPBar.value) - Number(PlayerHP.value);
    PlayerShow.textContent = PlayerHPBar.value;

    // Set colors
    var green = Number(PlayerHPBar.value) / Number(PlayerHPBar.max) * 255;
    var red = 255 - green;
    PlayerHPBar.style.setProperty("--td-background-color", "rgb(" + red + ", " + green + ", 0)");

    // Set coockies
    setCookieValue(PlayerHPBar.value, 3, "PlayerBox" + player);
}


function changeMaxHP(player) { // Set max hp
	const newmaxhp = document.getElementById("PlayerHPSet" + player).value;
    const PlayerHPBar = document.getElementById("PlayerHPBar" + player);
    const green = Number(PlayerHPBar.value) / Number(PlayerHPBar.max) * 255;
    const red = 255 - green;

	PlayerHPBar.max = newmaxhp; // Set bar max hp
    PlayerHPBar.style.setProperty("--td-background-color", "rgb(" + red + ", " + green + ", 0)"); // Set bar color

    // Reset hp if hp > newmaxhp
    if(Number(PlayerHPBar.value) >= Number(newmaxhp)) {
        PlayerHPBar.value = newmaxhp;
        document.getElementById("PlayerShow" + player).textContent = newmaxhp;
        setCookieValue(newmaxhp, 3, "PlayerBox" + player); // Set coockies
    }

    // Set coockies
    setCookieValue(newmaxhp, 2, "PlayerBox" + player);
}


function addSpell(player) { // Add one spell checkbox
    // Create an "checkbox" node
    const node = document.createElement('input');
    node.type = "checkbox";

    // Set the class/id
    node.classList.add("PlayerSpell" + player);
    node.id = "PlayerSpell" + player + "-" + idlist[player - 1];
    idlist[player - 1]++; // Set the id value

    // Create a text node
    const textnode = document.createTextNode("");

    // Append the text node to the "li" node
    node.appendChild(textnode);

    // Append the "li" node to the list
    document.getElementById("SpellCount" + player).appendChild(node);

    // Set the coockie
    setCookieValue(idlist[player - 1] - 1, 4, "PlayerBox" + player);

    // Hide the addSpell button after 10
    if(idlist[player - 1] > 10)
        document.getElementById("AddSpell" + player).style.display = "none";

    checkBoxTypes.forEach((item) => { // Set the checkbox
        var elements = document.getElementsByClassName(item);
        for (let i = 0; i < elements.length; i++) {
          elements[i].onclick = function() {
            setCheckedBoxes(this.id, i);
          }
        }
    });
}


function resetSpell(player) { // Remove all spell box
    document.getElementById("SpellCount" + player).innerHTML = ""; // Clear the children
    document.getElementById("AddSpell" + player).style.display = "inline-block"; // Show the add button

    // Reset the id value
    idlist[player - 1] = 1;

    // Set coockies
    setCookieValue(0, 4, "PlayerBox" + player);
    setCookieValue(0, 5, "PlayerBox" + player);
}


function setCheckedBoxes(object, allchecks) { // Set checkboxes
    let objsplit = object.split('-');
    for (var i = 1; i <= allchecks; i++) {
        document.getElementById(objsplit[0] + '-' + i).checked = (i <= objsplit[1]);
    }
    setCookieValue(objsplit[1], 5, "PlayerBox" + objsplit[0].slice(-1));
}


function riposoLungo(player) { // Reset player box
    const PlayerHPBar = document.getElementById("PlayerHPBar" + player);
    const PlayerShow = document.getElementById("PlayerShow" + player);
    const PlayerHPSet = document.getElementById("PlayerHPSet" + player);
    const nspellused = Number(getCookieValue(5, "PlayerBox" + player));

    PlayerHPBar.value = PlayerHPBar.max; // Set max hp bar
    PlayerShow.textContent = PlayerHPBar.max; // Set max hp number
    PlayerHPBar.style.setProperty(vcolor, dcolor); // Set color
    PlayerHPSet.value = PlayerHPBar.max;

    // Reser spell used
    for(let i = 1; i <= nspellused; i++)
        document.getElementById("PlayerSpell" + player + "-" + i).checked = 0; // Set the checkbox

    // Reset the cookies
    setCookieValue(PlayerHPBar.max, 3, "PlayerBox" + player);
    setCookieValue(0, 5, "PlayerBox" + player);
}


function playerBoxClose(player) { // Close player box
    document.getElementById(player).style.display = "none"; // Remove the box

    // Clear the spell
    idlist[player.slice(-1) - 1] = 1;
    document.getElementById("SpellCount" + player.slice(-1)).innerHTML = "";

    setCookie(player, "", 365);
    combactListName(); // Set comact list names
}


// Cookie

function setCookie(cname, cvalue, exdays) { // Create the cookie
	const d = new Date();
	d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
	let expires = "expires=" + d.toUTCString();
	document.cookie = domain + cname + "=" + cvalue + ";" + expires + ";path=/";
}


function getCookie(cname) { // Get the cookie
	let name = domain + cname + "=";
	let ca = document.cookie.split(';');
	for (let i = 0; i < ca.length; i++) {
		let c = ca[i];
		while (c.charAt(0) == ' ') {
			c = c.substring(1);
		}
		if (c.indexOf(name) == 0) {
			return c.substring(name.length, c.length);
		}
	}
	return "";
}


function getCookieValue(position, cname) { // "PlayerBox" + player  :  1 = name; 2 = MaxHP; 3 = HP; 4 = Spell; 5 = UsedSpell
    const cookie = getCookie(cname);
    let csplit;
    let value;

    // Estract the information
    if(cookie != "") {
        csplit = cookie.split('-');
        value = csplit[position - 1];
    } else
        value = "";

    return value; // Return notthing if empty
}


function setCookieValue(value, position, cname) { // "PlayerBox" + player  :  1 = name; 2 = MaxHP; 3 = HP; 4 = Spell; 5 = UsedSpell
    const cookie = getCookie(cname);
    let csplit = cookie.split('-'); // Split the cookie
    let cvalue;

    // Reset the id value
    csplit[position - 1] = value;

    // Recreate the cookie
    cvalue = csplit[0];
    for (let i = 1; i < csplit.length; i++) {
        cvalue += "-" + csplit[i];
    }

    setCookie(cname, cvalue, cage); // Set the cookie
}
