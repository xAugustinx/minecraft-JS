var bloki = [];


const blokiObracalne = ['txt/dirt.png'];

for (let y = 0; y < 10; y++) {
    bloki[y] = []; 
}

var punktStartuTrawy = 6;

var xRenderowania = 0;

var xGracza = 4;
var yGracza;

function zrespBlok(source)
{
    const nE = document.createElement('img');

    nE.src = source;

    nE.style.zIndex = 1;

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

function upadek()
{
    if (bloki[yGracza][xGracza] == -1)
    {
        yGracza++;
        return true;
    }
    else { return false;}
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
        else
        {
            bloki[i][xRenderowania] = zrespBlok('txt/dirt.png');
        } 
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


function klawiszKlikniety()
{

    if (event.key == 'a') 
    { 
        if (bloki[yGracza-1][xGracza -1] == -1 && bloki[yGracza-2][xGracza -1] == -1) {xGracza--;}
    }
    else if (event.key == 'd') 
    {
        if (bloki[yGracza-1][xGracza +1] == -1 && bloki[yGracza-2][xGracza +1] == -1) {xGracza++;}
    }
    else if (event.key == 'w') 
    {
        console.log('Skok!');
        setTimeout(() => {yGracza--; renderowanie();}, 500);
    }

    for (var i = 0; i < 10; i++) {
        if (!upadek()) {break;}
    }

    generowanieSwiata();
    renderowanie();
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


renderowanie();




