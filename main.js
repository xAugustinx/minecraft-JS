var bloki = [];


const blokiObracalne = ['txt/dirt.png','txt/stone.png'];

for (let y = 0; y < 10; y++) {
    bloki[y] = []; 
}

var punktStartuTrawy = 6;

var xRenderowania = 0;

var xGracza = 4;

function zrespBlok(source)
{
    const nE = document.createElement('img');

    nE.src = source;

    nE.style.zIndex = 1;

    nE.style.position = 'absolute';
    nE.style.imageRendering = 'pixelated';

    

    //if (blokiObracalne.includes(source))
    //{
    //    nE.style.transform = 'rotate(' + (Math.floor(Math.random() * 4) * 90) + 'deg)';
    //}

    nE.style.width = '10%'
    nE.style.height = '10%'


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


function generowanieSwiata()
{
    for (var i = 0; i < 10; i++)
    {
        bloki[i][xRenderowania] = -1;
    }

    punktStartuTrawy = punktStartuTrawy + Math.floor(Math.random() * 4) - 2;

    if (punktStartuTrawy > 8) {punktStartuTrawy = 7;}
    else if (punktStartuTrawy < 4 ) { punktStartuTrawy = 3; }

    console.log(punktStartuTrawy);

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

}

document.addEventListener('keydown', klawiszKlikniety);

function klawiszKlikniety()
{
    if (event.key === 'a') { xGracza--; }
    else if (event.key === 'd') { xGracza++; }

    generowanieSwiata();
    renderowanie();
}

for (var meow = 0; meow < 10; meow++) {generowanieSwiata();}
renderowanie();


