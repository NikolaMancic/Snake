function goToMapEditor()
{
    while (ui.firstChild)
        ui.removeChild(ui.firstChild);

    while (container.firstChild)
        container.removeChild(container.firstChild);

    helpText.innerHTML = 'Click on a tile to toggle between an empty space and an obstacle';
    continueButton.innerHTML = 'Continue';
    ui.appendChild(Title);
    ui.appendChild(helpText);
    ui.appendChild(continueButton);
    ui.appendChild(backButton);

    continueButton.removeEventListener('click', goToMapEditor, false);
    continueButton.addEventListener('click', startGame, false);
    backButton.removeEventListener('click', goToStageSelection, false);
    backButton.addEventListener('click', goToTileSelection, false);

    Map.reset('custom');

    for(var row = 0; row < MAP_SIZE; row++)
    {
        var rowDiv = document.createElement('div');
        container.appendChild(rowDiv);

        for(var col = 0; col < MAP_SIZE; col++)
        {
            var tile = document.createElement('span');
            tile.className = 'tile';

            var xid;
            if (col < 10)
            {
                xid = ' ' + col;
            }
            else
            {
                xid = col.toString();
            }

            var yid;
            if (row< 10)
            {
                yid = ' ' + row;
            }
            else
            {
                yid = row.toString();
            }

            tile.id = xid + yid;
            tile.style.backgroundImage =
                'url(sprites/'+ tileSets[spriteSet].UiElement.id + '/empty.png)';
            tile.addEventListener('click', eventTileClicked, false);
            rowDiv.appendChild(tile);
        }
    }
}

function eventTileClicked()
{
    var x = this.id.substring(0, 2).trim();
    var y = this.id.substring(2, 4).trim();

    if(Map.tiles[x][y] == 1)
    {
        Map.tiles[x][y] = 0;
        this.style.backgroundImage =
            'url(sprites/'+ tileSets[spriteSet].UiElement.id + '/empty.png)';
    }
    else
    {
        Map.tiles[x][y] = 1;
        this.style.backgroundImage =
            'url(sprites/'+ tileSets[spriteSet].UiElement.id + '/obstacle.png)';
    }
}
