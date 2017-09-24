var Stage = function(name)
{
    this.name = name;
    this.imageURL = 'url(sprites/stages/' + name + '.png)';
};

Stage.prototype.addUiElement = function ()
{
    this.UiElement = document.createElement('div');
    this.UiElement.addEventListener('click', stageSelected, false);
    this.UiElement.id = this.name;
    this.UiElement.className = 'stageSelect';
    this.UiElement.style.backgroundImage = this.imageURL;

    container.appendChild(this.UiElement);
};

var stages = [];

var clearStage = new Stage('clear');
stages.push(clearStage);

var boxStage = new Stage('box');
stages.push(boxStage);

var tennisStage = new Stage('tennis');
stages.push(tennisStage);

var customStage = new Stage('custom');
stages.push(customStage);
