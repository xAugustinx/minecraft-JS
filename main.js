var bloki = [];

var activeJump = false;

var zaczecieKopania = false;

var aktualneBloki = [];

var wybranyBlokLiczba = 0;

for (let y = 0; y < 10; y++) {
    bloki[y] = [];
    for (let x = 0; x < 10; x++) {
        bloki[y][x] = -1;
    }
}



var liczby = ['0','1','2','3','4','5','6','7','8','9'];

var blokiWszystkie = ['dirt.png','coal.png','stone.png','grass.png']
var iloscBlokow = [0,0,0,0];
var czasWykopywaniaBlokow = [500, 2000, 2000, 500]

class ekwipunek
{
    constructor()
    {
        this.dirt = 0;
        this.grass = 0;
        this.stone = 0;
        this.coal = 0;
    }
}

var eq = new ekwipunek();


const blokiObracalne = ['txt/dirt.png'];

for (let y = 0; y < 10; y++) {
    bloki[y] = []; 
}

var punktStartuTrawy = 6;

var xRenderowania = 0;

var xGracza = 4;
var yGracza;

const obiektPointer = document.getElementById('pointer');
var pointerX = 0;
var pointerY = 0;


function zrespBlok(source, y, x)
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

function divBlokiNaZero()
{
    const mango = document.getElementById('bloki');
    mango.innerHTML = '';
}

function dodawanieDoDivaBlokow(mango, xBottom, xRight)
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

function zmienianiePozycjiPointera(y,x)
{
    var myPointer = document.getElementById('pointer');

    myPointer.style.visibility = 'visible';

    var newX = x * -1 + 9;
    var newY = y * -1 + 9;

    myPointer.style.bottom = (newY * 10).toString() + '%';
    myPointer.style.left = (newX * 10).toString() + '%';

}

function usuwaniePointera()
{
    var myPointer = document.getElementById('pointer');
    myPointer.style.visibility = 'hidden';

    xPointer = 5;
    yPointer = yGracza-1;
}


function generowanieSwiata()
{
    for (var i = 0; i < 10; i++)
    {
        bloki[i][xRenderowania] = -1;
    }

    punktStartuTrawy = punktStartuTrawy + Math.floor(Math.random() * 4) - 2;

    if (punktStartuTrawy > 8) {punktStartuTrawy = 7;}
    else if (punktStartuTrawy < 4 ) { punktStartuTrawy = 3; }

    poczotekYGracza = punktStartuTrawy;

    var punktStone = punktStartuTrawy + 2 + Math.floor(Math.random() * 3);


    bloki[punktStartuTrawy][xRenderowania] = zrespBlok('txt/grass.png');

    var czyStone = false;
    

    for (var i = punktStartuTrawy+1; i < 10; i++)
    {
        if (i >= punktStone) 
        {
            var losowaWartosc = Math.floor(Math.random() * 100);

            if (losowaWartosc > 97) {bloki[i][xRenderowania] = zrespBlok('txt/coal.png');   }
            else {bloki[i][xRenderowania] = zrespBlok('txt/stone.png');}
        }
        else { bloki[i][xRenderowania] = zrespBlok('txt/dirt.png'); } 
    }
    xRenderowania++;
}

function renderowanie()
{
    divBlokiNaZero();

    for (var y = 0; y < 10; y++)
    {
        for (var x = 0; x < 10; x++)
        {
            if (bloki[y][x+xGracza - 4] !== -1)
            {
                dodawanieDoDivaBlokow(bloki[y][x+xGracza - 4],y,x );
            }
        }
    }
    const gracz = document.getElementById('gracz');

    gracz.style.bottom = (yGracza * -1 +10) * 10 + '%';
    gracz.style.left = '40%';

}

document.addEventListener('keydown', klawiszKlikniety);


function upadek(mango)
{
    var sumerZmienna = 0;
    if (mango === undefined) {sumerZmienna = 0;}
    else {sumerZmienna = mango;}
    
    yGracza = Math.round(yGracza);
    

    if (bloki[yGracza][xGracza] == -1)
    {
        for (var i = 0; i < 10; i++)                                                    //
        {                          
            var czyKontynulowacSpadek = true;                                                    //
            setTimeout(() => { if ( bloki[Math.trunc(yGracza)][xGracza] != -1) { czyKontynulowacSpadek = false;} if (czyKontynulowacSpadek) { yGracza  = yGracza + 0.10;}  renderowanie();}, i * 10);    // czemu ten fragment crushuje strone
        }                                                                                //  
        setTimeout(() => {yGracza = Math.round(yGracza); return true;}, 10 * 10);
    }
    else { return false;}
}

function czyBlokGraniczyZPowietrzem(y,x)
{
    if (bloki[y+1][x] == -1 || bloki[y-1][x] == -1 || bloki[y][x+1] == -1 || bloki[y][x-1] == -1){return true;}
    return false;
}

function czyBlokGraniczyZInnymBlokiem(y,x)
{
    if (bloki[y+1][x] != -1 || bloki[y-1][x] != -1 || bloki[y][x+1] != -1 || bloki[y][x-1] != -1){return true;}
    return false;
}


function klawiszKlikniety()
{

    if (Math.floor(yGracza) != yGracza)
    {
        yGracz = Math.floor(yGracza) -1;
    }


    yGracza = Math.round(yGracza);

    if (event.key == 'a')  {  if (bloki[yGracza-1][xGracza -1] == -1 && bloki[yGracza-2][xGracza -1] == -1) {xGracza--;} usuwaniePointera();}
    else if (event.key == 'd')  { if (bloki[yGracza-1][xGracza +1] == -1 && bloki[yGracza-2][xGracza +1] == -1) {xGracza++;} usuwaniePointera(); }

    console.log(bloki[yGracza -3][xGracza]);
    console.log(yGracza-3 + ' ' + xGracza);

     if (event.key == 'w' && activeJump == false && bloki[yGracza -3][xGracza] == -1) 
    {
        
        usuwaniePointera();

        activeJump = true;
        setTimeout(() => { activeJump = false; renderowanie();}, 11 * 30 + 10 * 10)

        for (var i = 0; i < 11; i++) 
        {
            setTimeout(() => { yGracza  = yGracza - 0.10; renderowanie();}, i * 30);
        }
        
        yGracza = Math.round(yGracza);

        setTimeout(() => {upadek(); renderowanie()}, 500);
    }

    else if (event.key ==  'ArrowLeft')
    {
        if (xPointer < 9 && obiektPointer.style.visibility !== 'hidden' ) {xPointer++;}
        zmienianiePozycjiPointera(yPointer, xPointer);
    }
    else if (event.key == 'ArrowRight')
    {
        if (xPointer > 0 && obiektPointer.style.visibility !== 'hidden') {xPointer--;}
        zmienianiePozycjiPointera(yPointer, xPointer);
    }
    else if (event.key == 'ArrowUp')
    {
        if (yPointer > 0 && obiektPointer.style.visibility !== 'hidden') {yPointer--;} 
        zmienianiePozycjiPointera(yPointer, xPointer);
    }
    else if (event.key == 'ArrowDown')
    {
        if (yPointer < 9 && obiektPointer.style.visibility !== 'hidden') {yPointer++;}
        zmienianiePozycjiPointera(yPointer, xPointer);
    }
    else if (event.key == 'Enter'  )
    {

        //console.log(czyBlokGraniczyZInnymBlokiem(yPointer,(xPointer * -1) + 9 + xGracza -4));

        console.log('o ten jest sprawdzany :' + bloki[yPointer][(xPointer * -1) + 9 + xGracza -4]  )

        if (bloki[yPointer][(xPointer * -1) + 9 + xGracza -4 ] == -1 && zaczecieKopania === false && czyBlokGraniczyZInnymBlokiem(yPointer,(xPointer * -1) + 9 + xGracza -4)) //problematyczny fragment ostatni &&
        {
            if (iloscBlokow[wybranyBlokLiczba] > 0)
            {
                iloscBlokow[wybranyBlokLiczba]--;

                bloki[yPointer][(xPointer * -1) + 9 + xGracza -4 ] = zrespBlok('txt/' + blokiWszystkie[wybranyBlokLiczba]);
            }

        }
        else if (zaczecieKopania == false && czyBlokGraniczyZPowietrzem(yPointer,(xPointer * -1) + 9 + xGracza -4))
        {
            zaczecieKopania = true;

            var czasOczekiwania = 0;
            
            console.log(bloki[yPointer][(xPointer * -1) + 9 + xGracza -4 ].style.backgroundImage);
            
            //tutaj

            for (var licznik = 0; licznik < blokiWszystkie.length; licznik++)
            {
                var nameOf = 'url("txt/' + blokiWszystkie[licznik] + '")';
                if (bloki[yPointer][(xPointer * -1) + 9 + xGracza -4 ].style.backgroundImage === nameOf )
                {
                    
                    czasOczekiwania =  czasWykopywaniaBlokow[licznik];

                    iloscBlokow[licznik]++;
                    
                    var zapisanyTutajPointer = yPointer;
                    var zapisanyTutajPointer2 = (xPointer * -1) + 9 + xGracza -4 ;


                    setTimeout(() => { bloki[zapisanyTutajPointer][zapisanyTutajPointer2] = -1; renderowanie(); zaczecieKopania = false;}, czasOczekiwania);
                    break;
                }
            }

            console.log(eq.dirt);

        }
    }

    for (var i = 0; i < 10; i++)
    {
        if (i < 6) {upadek();}

        if (event.key === liczby[i])
        {
            wybranyBlokLiczba = parseInt(event.key);
        }

    }


    generowanieSwiata();
    yGracz = Math.round(yGracza);
    renderowanie();
}
//poStarcie
for (var meow = 0; meow < 10; meow++) {
    generowanieSwiata(); 
    if (meow === 4) 
    {
        yGracza = punktStartuTrawy;
    }
}

//worldBorder
for (var y = 0; y < 10; y++) 
{
    bloki[y][3] = zrespBlok('txt/bedrock.png');
}

renderowanie();




