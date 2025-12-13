var bloki = [];

var activeJump = false;

var zaczecieKopania = false;

var aktualneBloki = [];

var wybranyBlokLiczba = 0;

var wysokoscSwiataY = 30;
var szerokoscRenderowania = 10;

var czyJestwTrakcieUpadku = false;
var wartoscZwracanaPrzezUpadek = 0;

var biome = Math.floor(Math.random() * 2 );

for (let y = 0; y < wysokoscSwiataY; y++) {
    bloki[y] = [];
    for (let x = 0; x < 10; x++) {
        bloki[y][x] = -1;
    }
}

var drzewoGeneration = [0, 0, 0, 0];

var blokiWszystkie = ['dirt.png','coal.png','stone.png','grass.png','wood.png','leav.png','sand.png']
var iloscBlokow = [0,0,0,0,0,0,0];
var czasWykopywaniaBlokow = [500, 2000, 2000, 500,750,0,500]

var eqBar = ['grass.png','dirt.png','coal.png','stone.png','wood.png','leav.png'];
var liczby = ['0','1','2','3','4','5','6','7','8','9'];
const blokiObracalne = ['txt/dirt.png','txt/sand.png'];
for (let y = 0; y < 10; y++) {
    bloki[y] = []; 
}

var punktStartuTrawy = 6;
var xGenerowania = 0;
var xGracza = 4;
var yGracza;
const obiektPointer = document.getElementById('pointer');
var pointerX = 0;
var pointerY = 0;

function odrywanieCzesciDziesietnej(x)
{ return x - Math.trunc(x);}

function getIndexOf(z,b)  // nie
{
    for (var meow = 0; meow < z.length; meow++)
    {
        if (z[meow] == b)
        {
            return meow;
        }
    }
    return -1;
}

function zrespBlok(source, y, x) // nie
{
    const nE = document.createElement('button');
    nE.yMeow = y;
    nE.xMeow = x;
    nE.src = source;
    nE.style.zIndex = 1;
    nE.style.backgroundImage = 'url(' + source + ')';
    nE.style.backgroundSize = 'contain';
    nE.style.border = 'none';
    nE.style.position = 'absolute';
    nE.style.imageRendering = 'pixelated';
    nE.style.width = '10%'
    nE.style.height = '10%'
    var czyObracalny = false;
    for (var i = 0; i < blokiObracalne.length; i++)
    {
        if (source == blokiObracalne[i]) 
        {
            nE.style.transform = 'rotate(' + (Math.floor(Math.random() * 4) * 90) + 'deg)';
        }
    }        
    return nE;
}

function divBlokiNaZero() // nie
{
    const mango = document.getElementById('bloki');
    mango.innerHTML = '';
}

function dodawanieDoDivaBlokow(mango, xBottom, xRight) // nie
{
    var nE = mango;
    var meowXbottom = ((xBottom * -1) + 9) * 10;
    var meowXright = ((xRight * -1) + 9) * 10;
    meowXbottom = meowXbottom.toString() + '%';
    meowXright = meowXright.toString() + '%';
    nE.style.bottom = meowXbottom;
    nE.style.right = meowXright;
    document.getElementById("bloki").appendChild(nE);
}

function zmienianiePozycjiPointera(y,x) // nie
{
    var myPointer = document.getElementById('pointer');
    myPointer.style.visibility = 'visible';
    var newX = x * -1 + 9;
    var newY = y * -1 + 9;
    myPointer.style.bottom = (newY * 10).toString() + '%';
    myPointer.style.left = (newX * 10).toString() + '%';
}

function usuwaniePointera() // nie
{
    var myPointer = document.getElementById('pointer');
    myPointer.style.visibility = 'hidden';
    xPointer = 5;
    yPointer = 5;
}

function czyUjemna(x) // nie
{
    if (x < 0) {return true;}
    return false;
}

function generowanieSwiata() // nie
{
    var blokiBiomow = ['txt/grass.png','txt/sand.png']
    var blokiBiomow2 = ['txt/dirt.png','txt/sand.png']
    if (Math.floor(Math.random() * 100) < 5)
    {
        biome = Math.floor(Math.random() * 2 );
    }
    for (var i = 0; i < 30; i++)
    {bloki[i][xGenerowania] = -1;}

    if (drzewoGeneration[2] <= 0 ) {punktStartuTrawy = punktStartuTrawy + Math.floor(Math.random() * 4) - 2; }
    if (punktStartuTrawy > 9) {punktStartuTrawy = 8;}
    else if (punktStartuTrawy < 5 ) { punktStartuTrawy = 4; }

    poczotekYGracza = punktStartuTrawy;
    var punktStone = punktStartuTrawy + 2 + Math.floor(Math.random() * 3);
    bloki[punktStartuTrawy][xGenerowania] = zrespBlok(blokiBiomow[biome]);
    var czyStone = false;
    
    for (var i = punktStartuTrawy+1; i < wysokoscSwiataY; i++)
    {
        if (i >= punktStone) 
        {
            var losowaWartosc = Math.floor(Math.random() * 100);

            if (losowaWartosc > 97) {bloki[i][xGenerowania] = zrespBlok('txt/coal.png');   }
            else {bloki[i][xGenerowania] = zrespBlok('txt/stone.png');}
        }
        else { bloki[i][xGenerowania] = zrespBlok(blokiBiomow2[biome]); } 
    }
    if (drzewoGeneration[2] <= 0 )
    {
        if (Math.floor(Math.random() * 100) < 4 && biome == 0)
        {
            drzewoGeneration[2] = 4;
            drzewoGeneration[3] = punktStartuTrawy -1 ;
        }
    }
    else
    {
        var liczbaMango = 3;
        if (drzewoGeneration[2] == 2)
        {
            bloki[ drzewoGeneration[3]][xGenerowania] = zrespBlok('txt/wood.png');
            liczbaMango++;
        }
        for (var liscie = 1; liscie < liczbaMango; liscie++)
        {
            if (czyUjemna(drzewoGeneration[3] - liscie)) {break;}
            bloki[ drzewoGeneration[3] - liscie][xGenerowania] = zrespBlok('txt/leav.png');
        }
    }
    drzewoGeneration[2]--;
    xGenerowania++;
}

function renderowanie() // potencjalnie
{
    divBlokiNaZero();

    for (var y = 0; y < 11; y++)
    {
        for (var x = 0; x < 10; x++)
        {
            if (y + Math.round(yGracza) - 4 >= 0 && y + Math.round(yGracza) - 4 <= 29)
            {
                if (bloki[y+ Math.round(yGracza) - 4 ][x+xGracza - 4] !== -1 )
                {
                    dodawanieDoDivaBlokow(bloki[y + Math.round(yGracza) - 4 ][x+xGracza - 4],y + odrywanieCzesciDziesietnej(yGracza),x );
                }
            }
        }
    }
    const gracz = document.getElementById('gracz');
    gracz.style.left = '40%';
}

document.addEventListener('keydown', function(event)  {
    klawiszKlikniety(event.key, 0);
});


var dSGB = [[0,1],[0,-1],[1,0],[-1,0]];
function czyBlokGraniczyZPowietrzem(y,x) //nie
{   
    for (var meow = 0; meow < 4; meow++)
    {
        if ( y + dSGB[meow][0] < 0 || y + dSGB[meow][0] > wysokoscSwiataY - 1 || x + dSGB[meow][1] > xGracza + 5  ) {}
        else if (bloki[y + dSGB[meow][0]  ] [x + dSGB[meow][1]] == -1)
        {
            return true;
        }
    }
    return false;
}
function czyBlokGraniczyZInnymBlokiem(y,x) //nie
{
    for (var meow = 0; meow < 4; meow++)
    {
        if ( y + dSGB[meow][0] < 0 || y + dSGB[meow][0] > wysokoscSwiataY - 1 || x + dSGB[meow][1] > xGracza + 5  ) {}
        else if (bloki[y + dSGB[meow][0]  ] [x + dSGB[meow][1]] != -1)  {return true;}
    }
    return false;
}

function klawiszKlikniety(klawiszMeow, literacja)
{
    if (Math.floor(yGracza) != yGracza)
    {yGracza = Math.floor(yGracza) -1;}
    yGracza = Math.round(yGracza);

    if (klawiszMeow == 'a')  {  if (bloki[yGracza-1][xGracza -1] == -1 && bloki[yGracza-2][xGracza -1] == -1) {xGracza--;} usuwaniePointera();}
    else if (klawiszMeow == 'd')  { if (bloki[yGracza-1][xGracza +1] == -1 && bloki[yGracza-2][xGracza +1] == -1) {xGracza++;} usuwaniePointera(); }

    else if (klawiszMeow == 'w') 
    {
        usuwaniePointera();
        if (yGracza -3 < 0) { skok(); }
        else if (activeJump == false && bloki[yGracza -3][xGracza] == -1) {skok();}
    }
    else if (klawiszMeow ==  'ArrowLeft')
    {if (xPointer < 9 && obiektPointer.style.visibility !== 'hidden' ) {xPointer++;}
        zmienianiePozycjiPointera(yPointer, xPointer);}
    else if (klawiszMeow == 'ArrowRight')
    {if (xPointer > 0 && obiektPointer.style.visibility !== 'hidden') {xPointer--;}zmienianiePozycjiPointera(yPointer, xPointer);}
    else if (klawiszMeow == 'ArrowUp')
    {if (yPointer > 0 && obiektPointer.style.visibility !== 'hidden') {yPointer--;} 
        zmienianiePozycjiPointera(yPointer, xPointer);}
    else if (klawiszMeow == 'ArrowDown')
    {if (yPointer < 9 && obiektPointer.style.visibility !== 'hidden') {yPointer++;}
    zmienianiePozycjiPointera(yPointer, xPointer);}
    else if (klawiszMeow == 'Enter'  )
    {
        if (bloki[yPointer + yGracza -4 ][(xPointer * -1) + 9 + xGracza -4 ] == -1 && zaczecieKopania === false ) 
        {
            if (czyBlokGraniczyZInnymBlokiem(yPointer + yGracza -4 ,(xPointer * -1) + 9 + xGracza -4))
            {
                if (iloscBlokow[wybranyBlokLiczba] > 0 )
                {
                    iloscBlokow[wybranyBlokLiczba]--;
                    bloki[yPointer + yGracza -4 ][(xPointer * -1) + 9 + xGracza -4 ] = zrespBlok('txt/' + blokiWszystkie[wybranyBlokLiczba]);
                }
            }
        }
        else if (zaczecieKopania == false && czyBlokGraniczyZPowietrzem(yPointer + yGracza -4 ,(xPointer * -1) + 9 + xGracza -4))
        {
            zaczecieKopania = true;
            var czasOczekiwania = 0;
            for (var licznik = 0; licznik < blokiWszystkie.length; licznik++)
            {
                var nameOf = 'url("txt/' + blokiWszystkie[licznik] + '")';
                if (bloki[yPointer + yGracza -4 ][(xPointer * -1) + 9 + xGracza -4 ].style.backgroundImage === nameOf )
                { 
                    czasOczekiwania =  czasWykopywaniaBlokow[licznik];
                    iloscBlokow[licznik]++;
                    var zapisanyTutajPointer = yPointer + yGracza -4 ;
                    var zapisanyTutajPointer2 = (xPointer * -1) + 9 + xGracza -4 ;
                    setTimeout(() => { bloki[zapisanyTutajPointer][zapisanyTutajPointer2] = -1;  zaczecieKopania = false; sprawdzanieIleUpadku(); renderowanie();}, czasOczekiwania);
                    break;
                }
            }
        }
    }
    else if (klawiszMeow == 'g')
    {
        for (var meow = 0; meow < czasWykopywaniaBlokow.length; meow++)
        {
            czasWykopywaniaBlokow[meow] = 100;
        }
    }
    for (var i = 0; i < 10; i++)
    {
        if (klawiszMeow === liczby[i])
        {
            wybranyBlokLiczba = parseInt(klawiszMeow);
            wybranyBlokLiczba = getIndexOf(blokiWszystkie, eqBar[wybranyBlokLiczba])
        }
    }
    yGracza = Math.round(yGracza);
    sprawdzanieIleUpadku();
    generowanieSwiata();
    yGracza = Math.round(yGracza);
    renderowanie();

}
function sprawdzanieIleUpadku()
{
    yGracza = Math.round(yGracza);
    var iloscBlokowUpadku = 0;
    while (true)
    {
        if (bloki[ yGracza + iloscBlokowUpadku ][xGracza] == -1)
        {iloscBlokowUpadku++;}
        else {break;}
    }
    
    console.log('meow ' +  iloscBlokowUpadku);

    for (var meow = 1; meow < iloscBlokowUpadku+1; meow++)
    {
        for (var licznikFajny = 1; licznikFajny < 11; licznikFajny++)
        {
            setTimeout(() => { yGracza += 0.10; renderowanie();},   meow * (licznikFajny/10) * 30);
        }
        
    }

    setTimeout(() => { yGracza = Math.round(yGracza); renderowanie();}, iloscBlokowUpadku * 30 + 1);


}

function skok()
{
        setTimeout(() => { activeJump = false; renderowanie();}, 11 * 30 + 10 * 10)
        
        setTimeout(() => { yGracza  = yGracza - 1; renderowanie();}, 1 * 30);
        
        yGracza = Math.round(yGracza);
        setTimeout(() => {sprawdzanieIleUpadku(); renderowanie()}, 500);
}

function upadek(mango) //tak
{
    yGracza = Math.round(yGracza);
    if (bloki[yGracza][xGracza] == -1)
    {
        for (var i = 0; i < 10; i++)                                                    //
        {                          
            var czyKontynulowacSpadek = true;                                                    //
            setTimeout(() => { if ( bloki[Math.trunc(yGracza)][xGracza] != -1) { czyKontynulowacSpadek = false;} if (czyKontynulowacSpadek) { yGracza  = yGracza + 0.10;}  renderowanie();}, i * 10);    // czemu ten fragment crushuje strone
        }                                                                                //  
        setTimeout(() => {yGracza = Math.round(yGracza);  }, 10 * 10);
    } 
}
//poStarcie
for (var meow = 0; meow < 10; meow++) {
    generowanieSwiata(); 
    if (meow === 4) 
    {
        yGracza = punktStartuTrawy;
        document.getElementById('gracz').style.top = (punktStartuTrawy * 10 - 20)  + '%';
    }
}
sprawdzanieIleUpadku();
for (var y = 0; y < 30; y++)  { bloki[y][3] = zrespBlok('txt/bedrock.png');}
renderowanie();