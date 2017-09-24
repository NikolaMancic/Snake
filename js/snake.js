var Snake = {
    position: {x: -1, y: -1},
    sprite: -1,  // current sprite (x coordinate in sheet.png)

    // x coordinates for snake sprites in sheet.png.
    // left, up, right, down, body
    sprites: [0, TILE_SIZE, TILE_SIZE * 2, TILE_SIZE * 3, TILE_SIZE * 4],

    direction: -1,
    turned: false,

    segments: [],

    timeSinceLastFrame: -1,
    timePerFrame: -1,

    reset: function ()
    {
        this.position.x = 7;
        this.position.y = 7;

        this.sprite = TILE_SIZE;
        this.direction = 38;  // up

        this.timeSinceLastFrame = 0;
        this.timePerFrame = 200;

        this.segments = [];
    },

    getSprite: function ()
    {
        switch (this.direction)
        {
            case 37:  // left
                this.sprite = this.sprites[0];
                break;
            case 38:  // up
                this.sprite = this.sprites[1];
                break;
            case 39:  // right
                this.sprite = this.sprites[2];
                break;
            case 40:  // down
                this.sprite = this.sprites[3];
                break;
        }

        return this.sprite;
    },

    draw: function ()
    {
        context.drawImage(spriteSheet,
            this.getSprite(), spriteSet * TILE_SIZE,
            TILE_SIZE, TILE_SIZE,
                this.position.x * TILE_SIZE, this.position.y * TILE_SIZE,
            TILE_SIZE, TILE_SIZE);
    },

    timeToMove: function ()
    {
        return this.timeSinceLastFrame > this.timePerFrame;
    },

    move: function ()
    {
        switch (this.direction)
        {
            case 37:  // left
                this.position.x--;
                break;
            case 38:  // up
                this.position.y--;
                break;
            case 39:  // right
                this.position.x++;
                break;
            case 40: // down
                this.position.y++;
                break;
        }

        if (this.position.x > MAP_SIZE - 1) this.position.x = 0;
        if (this.position.y > MAP_SIZE - 1) this.position.y = 0;
        if (this.position.x < 0) this.position.x = MAP_SIZE - 1;
        if (this.position.y < 0) this.position.y = MAP_SIZE - 1;
    },

    turn: function (e)
    {
        if (Snake.turned == false)
        {
            switch (e.keyCode)
            {
                case 37:
                    e.preventDefault();
                    if (Snake.direction != 39)
                    {
                        Snake.direction = 37;
                        Snake.turned = true;
                    }
                    break;
                case 38:
                    e.preventDefault();
                    if (Snake.direction != 40)
                    {
                        Snake.direction = 38;
                        Snake.turned = true;
                    }
                    break;
                case 39:
                    e.preventDefault();
                    if (Snake.direction != 37)
                    {
                        Snake.direction = 39;
                        Snake.turned = true;
                    }
                    break;
                case 40:
                    e.preventDefault();
                    if (Snake.direction != 38)
                    {
                        Snake.direction = 40;
                        Snake.turned = true;
                    }
                    break;
            }
        }
    },

    // Snake's body
    addSegment: function ()
    {
        this.segments.unshift({x: this.position.x, y: this.position.y});
    },

    moveSegments: function ()
    {
        if (this.segments.length >= 1)
        {
            this.segments.unshift({x: this.position.x, y: this.position.y});
            this.segments.pop();
        }
    },

    drawSegments: function ()
    {
        this.segments.forEach(function (element)
        {
            context.drawImage(spriteSheet,
                Snake.sprites[4], spriteSet * TILE_SIZE,
                TILE_SIZE, TILE_SIZE,
                    element.x * TILE_SIZE, element.y * TILE_SIZE,
                TILE_SIZE, TILE_SIZE);
        });
    },

    colliding: function ()
    {
        var collision = false;

        this.segments.forEach(function (element)
        {
            if (element.x == Snake.position.x &&
                element.y == Snake.position.y)
            {
                collision = true;
            }
        });

        Map.obstacles.forEach(function (element)
        {
            if (element.x == Snake.position.x &&
                element.y == Snake.position.y)
            {
                collision = true;
            }
        });

        return collision;
    }
};
