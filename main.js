function zrespBlok(source,xBottom,xRight)
{
    const nE = document.createElement('img');
    console.log('Utworzono element:', nE);


    nE.style.width = '5%';
    nE.style.height= '5%';

    nE.src = source;

    nE.style.zIndex = 1;

    nE.style.position = 'absolute';
    nE.style.imageRendering = 'pixelated';

    nE.style.width = '10%'
    nE.style.height = '10%'





    var meowXbottom = ((xBottom * -1) + 9) * 10;
    var meowXright = ((xRight * -1) + 9) * 10;

    meowXbottom = meowXbottom.toString() + '%';
    meowXright = meowXright.toString() + '%';





    nE.style.bottom = meowXbottom;
    nE.style.right = meowXright;


    document.getElementById("bloki").appendChild(nE);
}

zrespBlok('txt/grass.png',2,2);