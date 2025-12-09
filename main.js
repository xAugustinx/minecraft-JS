var bloki = [];


var aktualneBloki = [];


const blokiObracalne = ['txt/dirt.png'];

for (let y = 0; y < 10; y++) {
    bloki[y] = []; 
}

var punktStartuTrawy = 6;

var xRenderowania = 0;

var xGracza = 4;
var yGracza;


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

    xPointer = 4;
    yPointer = yGracza;
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

function upadek()
{
    var mango = Math.round(yGracza);

    if (mango == yGracza)
    {
        yGracza = Math.round(yGracza);
    }

    console.log(yGracza);

    if (bloki[yGracza][xGracza] == -1)
    {
        yGracza++;
        return true;
    }
    else { return false;}
}

function upadek2()
{
    if (bloki[Math.round(yGracza)][xGracza] == -1)
    {
        return true;
    }
    else { return false;}
}

document.addEventListener('keydown', klawiszKlikniety);

function klawiszKlikniety()
{
    if (Math.floor(yGracza) != yGracza)
    {
        yGracz = Math.floor(yGracza) -1;
    }


    yGracza = Math.round(yGracza);

    if (event.key == 'a')  {  if (bloki[yGracza-1][xGracza -1] == -1 && bloki[yGracza-2][xGracza -1] == -1) {xGracza--;} usuwaniePointera();}
    else if (event.key == 'd')  { if (bloki[yGracza-1][xGracza +1] == -1 && bloki[yGracza-2][xGracza +1] == -1) {xGracza++;} usuwaniePointera(); }
    else if (event.key == 'w') 
    {
        usuwaniePointera();

        console.log('Skok!');
        for (var i = 0; i < 10; i++) 
        {
            setTimeout(() => { yGracza  = yGracza - 0.10; renderowanie();}, i * 30);
        }
        
        if (upadek2())
        {
            for (var i = 0; i < 10; i++) 
            {
                setTimeout(() => { yGracza  = yGracza + 0.10; renderowanie();}, i * 30 + 150);
            }
        }    
    }

    else if (event.key ==  'ArrowLeft')
    {
        xPointer++;
        zmienianiePozycjiPointera(yPointer, xPointer);
    }
    else if (event.key == 'ArrowRight')
    {
        xPointer--;
        zmienianiePozycjiPointera(yPointer, xPointer);
    }
    else if (event.key == 'ArrowUp')
    {
        yPointer--;
        zmienianiePozycjiPointera(yPointer, xPointer);
    }
    else if (event.key == 'ArrowDown')
    {
        yPointer++;
        zmienianiePozycjiPointera(yPointer, xPointer);
    }
    else if (event.key == 'Enter')
    {
        console.log('Umieszczanie bloku na pozycji: ' + yPointer + ', ' + ((xPointer * -1) + 9));
        bloki[yPointer][(xPointer * -1) + 9 + xGracza -4 ] = zrespBlok('txt/dirt.png');

    }




    while (true) {
        if (!upadek()) {break;}
    }

    generowanieSwiata();
    renderowanie();
}
function klikniecieMysza()
{
    const xClient = event.clientX;
    const yClient = event.clientY;
}

//poStarcie
for (var meow = 0; meow < 10; meow++) {
    generowanieSwiata(); 
    //console.log('Start trawy ' + meow + ': ' + punktStartuTrawy);
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
klawiszKlikniety();

renderowanie();




