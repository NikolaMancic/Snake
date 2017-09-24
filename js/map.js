var Map = {

    empty: TILE_SIZE * 6,
    obstacle: TILE_SIZE * 7,

    tiles: [],
    obstacles: [],

    reset: function (mapType)
    {
        this.tiles = new Array(MAP_SIZE);
        for (var i = 0; i < MAP_SIZE; i++)
        {
            this.tiles[i] = new Array(MAP_SIZE);
        }

        for (var row = 0; row < MAP_SIZE; row++)
        {
            for (var col = 0; col < MAP_SIZE; col++)
            {
                this.tiles[row][col] = 0;
            }
        }

        switch (mapType)
        {
            case 'tennis':
                for (var i = 2; i <= 12; i++)
                {
                    this.tiles[8][i] = 1;
                }
                break;
            case 'box':
                this.tiles[2][2] = 1;
                this.tiles[3][2] = 1;
                this.tiles[4][2] = 1;
                this.tiles[2][3] = 1;
                this.tiles[2][4] = 1;

                this.tiles[12][2] = 1;
                this.tiles[11][2] = 1;
                this.tiles[10][2] = 1;
                this.tiles[12][3] = 1;
                this.tiles[12][4] = 1;

                this.tiles[2][10] = 1;
                this.tiles[2][11] = 1;
                this.tiles[2][12] = 1;
                this.tiles[3][12] = 1;
                this.tiles[4][12] = 1;

                this.tiles[12][12] = 1;
                this.tiles[11][12] = 1;
                this.tiles[10][12] = 1;
                this.tiles[12][11] = 1;
                this.tiles[12][10] = 1;
                break;
        }

    },

    findObstacles: function ()
    {
        this.obstacles = [];
        for (var row = 0; row < MAP_SIZE; row++)
        {
            for (var col = 0; col < MAP_SIZE; col++)
            {
                if (this.tiles[row][col] == 1)
                {
                    this.obstacles.unshift({x: row, y: col});
                }
            }
        }
    },

    draw: function ()
    {
        var sprite;
        for (var row = 0; row < MAP_SIZE; row++)
        {
            for (var col = 0; col < MAP_SIZE; col++)
            {
                if (this.tiles[row][col] == 0)
                {
                    sprite = this.empty;
                }
                else
                {
                    sprite = this.obstacle;
                }

                context.drawImage(spriteSheet,
                    sprite, spriteSet * TILE_SIZE,
                    TILE_SIZE, TILE_SIZE,
                        row * TILE_SIZE, col * TILE_SIZE,
                    TILE_SIZE, TILE_SIZE);
            }
        }
    }
};
