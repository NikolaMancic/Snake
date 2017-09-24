var TileSet = function(name)
{
    this.name = name;
    this.imageURL = 'url(sprites/' + name + '/preview.png)';
};

TileSet.prototype.addUiElement = function()
{
    this.UiElement = document.createElement('div');
    this.UiElement.addEventListener('click', tileSetSelected, false);
    this.UiElement.id = this.name;
    this.UiElement.className = 'sheetSelect';
    this.UiElement.style.backgroundImage = this.imageURL;

    container.appendChild(this.UiElement);
};

var tileSets = [];

var grassSet = new TileSet('grass');
tileSets.push(grassSet);

var snowSet = new TileSet('snow');
tileSets.push(snowSet);

var desertSet = new TileSet('desert');
tileSets.push(desertSet);

var randomSet = new TileSet('random');
tileSets.push(randomSet);
