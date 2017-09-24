function startGame()
{
    menuSong.pause();
    forestSong.play();

    while (ui.firstChild)
        ui.removeChild(ui.firstChild);

    while (container.firstChild)
        container.removeChild(container.firstChild);

    continueButton.innerHTML = 'Restart';

    ui.appendChild(Title);
    ui.appendChild(helpText);
    ui.appendChild(continueButton);
    ui.appendChild(backButton);

    backButton.removeEventListener('click', goToTileSelection, false);
    backButton.addEventListener('click', goToStageSelection, false);

    canvas = document.createElement('canvas');
    canvas.id = 'canvas';
    canvas.width = '630';
    canvas.height = '630';
    container.appendChild(canvas);
    context = canvas.getContext('2d');

    spriteSheet = new Image();
    spriteSheet.src = 'sprites/sheet.png';

    score = 0;
    helpText.innerHTML = 'Score: <span id="score">' + score + '</span>';

    if(selectedStage != 'custom') Map.reset(selectedStage);
    Map.findObstacles();

    Apple.generate();
    Snake.reset();

    playing = true;

    window.addEventListener('keydown', Snake.turn, false);

    lastFrame = Date.now();
    requestAnimationFrame(loop);
}

function loop()
{
    context.clearRect(0, 0, canvas.width, canvas.height);

    elapsed = Date.now() - lastFrame;
    Snake.timeSinceLastFrame += elapsed;
    lastFrame = Date.now();

    if (Snake.timeToMove())
    {
        Snake.moveSegments();
        Snake.move();
        Snake.turned = false;
        Snake.timeSinceLastFrame = 0;

        if (Snake.colliding())
        {
            playing = false;
        }

        if (Apple.collected())
        {
            Snake.addSegment();
            score++;
            helpText.innerHTML = 'Score: <span id="score">' + score + '</span>';

            if (score == 10)
                Snake.timePerFrame = 125;
            else if (score == 20)
                Snake.timePerFrame = 75;

            Apple.generate();
        }
    }

    Map.draw();
    Snake.drawSegments();
    Snake.draw();
    Apple.draw();
    if (playing)
    {
        requestAnimationFrame(loop);
    }
    else
    {
        helpText.innerHTML = 'GAME OVER!<br>Final score: <span id="score">' + score + '</span>.<br>Try again!';
    }
}
