var Apple = {
    position: {x: -1, y: -1},
    sprite: TILE_SIZE * 5,

    generate: function ()
    {
        do
        {
            var collision = false;

            this.position.x = Math.floor(Math.random() * MAP_SIZE);
            this.position.y = Math.floor(Math.random() * MAP_SIZE);

            if (Snake.position.x == Apple.position.x &&
                Snake.position.y == Apple.position.y)
            {
                collision = true
            }

            Snake.segments.forEach(function (element)
            {
                if (element.x == Apple.position.x &&
                    element.y == Apple.position.y)
                {
                    collision = true;
                }
            });

            Map.obstacles.forEach(function (element)
            {
                if (element.x == Apple.position.x &&
                    element.y == Apple.position.y)
                {
                    collision = true;
                }
            });
        }
        while (collision);
    },

    draw: function ()
    {
        context.drawImage(spriteSheet,
            this.sprite, spriteSet * TILE_SIZE,
            TILE_SIZE, TILE_SIZE,
                this.position.x * TILE_SIZE, this.position.y * TILE_SIZE,
            TILE_SIZE, TILE_SIZE);
    },

    collected: function ()
    {
        if (this.position.x == Snake.position.x &&
            this.position.y == Snake.position.y)
        {
            return true;
        }
        else
        {
            return false;
        }
    }
};
