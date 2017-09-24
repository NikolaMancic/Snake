var domBody = document.getElementById('body');
var decor = document.getElementById('decor');

var container = document.getElementById('container');
var ui = document.getElementById('ui');

var Title = document.createElement('h1');
Title.innerHTML = 'Snake';
Title.id = 'title';

var helpText = document.createElement('p');

var continueButton = document.createElement('h2');
continueButton.innerHTML = 'Continue';
continueButton.id = 'continue';

var backButton = document.createElement('h2');
backButton.innerHTML = 'Back';
backButton.id = 'back';

var selectedStage = 'clear';
var selectedSheet = 'grass';
spriteSet = 0;

var currentSelection;

function goToStageSelection()
{
    menuSong.play();
    forestSong.pause();

    while (ui.firstChild)
        ui.removeChild(ui.firstChild);

    while (container.firstChild)
        container.removeChild(container.firstChild);

    currentSelection = [];

    stages.forEach(function (element)
    {
        element.addUiElement();
        currentSelection.push(element);
    });

    helpText.innerHTML = 'Chose a map or create your own';
    continueButton.innerHTML = 'Continue';

    ui.appendChild(Title);
    ui.appendChild(helpText);
    ui.appendChild(continueButton);

    stageSelected();

    continueButton.removeEventListener('click', startGame, false);
    continueButton.removeEventListener('click', goToMapEditor, false);
    continueButton.addEventListener('click', goToTileSelection, false);
    backButton.removeEventListener('click', goToStageSelection, false);
}

function stageSelected()
{
    if (this.id)
        selectedStage = this.id;

    currentSelection.forEach(function(element)
    {
        if(element.UiElement.id == selectedStage)
        {
            element.UiElement.className = 'selectedStage';
        }
        else
        {
            element.UiElement.className = 'stageSelect';
        }
    });
}

function goToTileSelection()
{
    while (ui.firstChild)
        ui.removeChild(ui.firstChild);

    while (container.firstChild)
        container.removeChild(container.firstChild);

    currentSelection = [];

    tileSets.forEach(function(element)
    {
        element.addUiElement();
        currentSelection.push(element);
    });

    helpText.innerHTML = 'Select a tile set';
    continueButton.innerHTML = 'Continue';
    ui.appendChild(Title);
    ui.appendChild(helpText);
    ui.appendChild(continueButton);
    ui.appendChild(backButton);

    tileSetSelected();

    continueButton.removeEventListener('click', goToTileSelection, false);
    if (selectedStage == 'custom')
    {
        continueButton.addEventListener('click', goToMapEditor, false);
    }
    else
    {
        continueButton.addEventListener('click', startGame, false);
    }
    backButton.removeEventListener('click', goToTileSelection, false);
    backButton.addEventListener('click', goToStageSelection, false);
}

function tileSetSelected()
{
    if(this.id)
        selectedSheet = this.id;

    if (selectedSheet == 'random')
    {
        spriteSet = Math.floor(Math.random() * (tileSets.length - 1));
        domBody.style.backgroundImage =
            'url(sprites/' + tileSets[spriteSet].UiElement.id + '/background.png)';
        decor.style.backgroundImage =
            'url(sprites/' + tileSets[spriteSet].UiElement.id + '/snake.png)';
    }
    else
    {
        domBody.style.backgroundImage = 'url(sprites/' + selectedSheet + '/background.png)';
        decor.style.backgroundImage = 'url(sprites/' + selectedSheet + '/snake.png)';
        for (var i = 0; i < tileSets.length; i++)
        {
            if (tileSets[i].UiElement.id == selectedSheet)
            {
                spriteSet = i;
            }
        }
    }

    currentSelection.forEach(function(element)
    {
        if(element.UiElement.id == selectedSheet)
        {
            element.UiElement.className = 'selectedSheet';
        }
        else
        {
            element.UiElement.className = 'sheetSelect';
        }
    });
}

domBody.style.backgroundImage = 'url(sprites/' + selectedSheet + '/background.png)';
decor.style.backgroundImage = 'url(sprites/' + selectedSheet + '/snake.png)';

goToStageSelection();
