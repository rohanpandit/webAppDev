var countries = ["algeria", "angola", "bantu", "benin", "botswana", "burkina faso", "burundi", "bushman", "bushongo", "cameroon", "canary islands", "cape verde", "central african republic", "dahomean", "egypt", "eritrea", "ethiopia", "gabon", "gambia", "ghana", "gold coast", "guinea", "hottentot", "ivory coast", "kenya", "lesotho", "liberia", "libya", "madagascar", "malawi", "mali", "mande", "mauritania", "mauritius", "mbundu", "mende", "morocco", "mozambique", "namibia", "niger", "nigeria", "pygmy", "republic of chad", "republic of djibouti", "republic of equatorial guinea", "republic of guinea-bissau", "republic of sao tome and principe", "republic of seychelles", "rwanda", "semitic", "senegal", "sierra leone", "somalia", "south africa", "south sudan", "sudan", "swaziland", "tanzania", "togo", "tunisia", "uganda", "union of the comoros", "yao", "zaire", "zambia", "zimbabwe", "zulu"];

var abbreviations = ["AL", "AN", "BA", "BE", "BT", "BF", "BR", "BU", "BH", "CR", "CI", "CV", "CA", "DH", "EG", "ER", "ET", "GB", "GA", "GH", "GC", "GU", "HO", "IC", "KY", "LE", "LI", "LB", "MD", "MW", "ML", "MN", "MU", "MA", "MB", "ME", "MR", "MZ", "NM", "NG", "NI", "PY", "CH", "RD", "RE", "RG", "RS", "SY", "RW", "SE", "SN", "SL", "SO", "SA", "SS", "SU", "SW", "TA", "TO", "TN", "UG", "UC", "YA", "ZA", "ZM", "ZI", "ZU"];

var entered = [];
var pressed = false;
var m = 5;
var s = 0;
var left = true;
$('#start').focus();

$('#score').html(entered.length + '/' + countries.length);
document.getElementById('input').disabled = true;

$('#start').click( function() {
    console.log("starting");
    start();
    document.getElementById('input').disabled = false;
    $('#input').prop("placeholder", "Now enter an African country...");
    $('#input').focus();
});

$('#stop').click( function() {
    stop();
});

$('#input').keypress(function (e) {
 var key = e.which;
 if(key == 13)  // the enter key code
  {
    check($('#input').val());
    return false;  
  }
}); 

$('#input').keyup(function (e) {
    check($('#input').val());
});

$('#enter').click( function() {
    check($('#input').val());
});

function start(){
                if(pressed == false){
					restart();
					clock = setInterval("stopWatch()", 1000);
					pressed = true;
				}
}


function stopWatch(){
				if( entered.length == 50 || ( m == 0 && s == 0 ) ){
					stop();
				} else if(s == 0){
					m--;
					s = 59;
                    console.log(m+" "+s);
					$("#time").html(m+":"+s);
				}
				else{
					s--;
					$("#time").html(m+":"+s);
                    if(s<10){
                        $("#time").html(m+":0" + s);
                    }
				}
			}
    
function stop(){	
    if(pressed){
        if(countries.length == entered.length){
            console.log("you win");
        }
        else{
            console.log("you lose");
            for (var i = 0; i < countries.length; i++) {
                if(entered.indexOf(i) < 0){	
                    if(left){
                        $("#enteredLeft").append("<div style='float:right'>" + countries[i].caps() + "</div>");
                        left = false;
                    } else {
                        $("#enteredRight").append("<div style='float:left'>" + countries[i].caps() + "</div>");
                        left = true;
                    }
                        
                }
            }
            
        }
        window.clearInterval(clock);
        entered = [];
        pressed = false;
    }
}

function restart(){
    m = 5;
    s = 0;
    $("#time").html( m+":0"+s );
    $('#enteredLeft').html( "" );
}


function check(answer){
    if(answer.length > 1){
        answer = answer.trim();
        var check = answer.toLowerCase();
        indexAbb = abbreviations.indexOf(answer);
        index = countries.indexOf(check);
        index = Math.max(index, indexAbb);
        console.log(answer);
        if(index > -1){     //check if is a country
            if(entered.indexOf(index) < 0){ //check if not already entered
                console.log("correct!");
                entered.push(index);
                $('#score').html(entered.length + '/' + countries.length);
                if(left){
                    $('#enteredLeft').append("<div style='float:right; clear:both'>" + countries[index].caps() + "</div>");
                    left = false;
                }
                else{
                    $('#enteredRight').append("<div style='float:left; clear:both'>" + countries[index].caps() + "</div>");
                    left = true;
                }
                $('#input').val('');
                
                if(countries.length == entered.length){                    
                    stop();
                }
                
                checkVictory()
                
            } else {
                console.log("already entered");
            }
        }
    }
}

function checkVictory(){
    if(entered.length > countries * 0.5){
    }
}

String.prototype.caps = function() {
    return this.charAt(0).toUpperCase() + this.slice(1);
}


    
