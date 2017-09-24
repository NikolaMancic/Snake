const MAP_SIZE = 15;    // map width in tiles
const TILE_SIZE = 42;

var canvas;
var context;

var spriteSheet;
var spriteSet;

var score;

var lastFrame;
var elapsed;

var playing;

// audio
var menuSong = document.getElementById('menu');
menuSong.addEventListener('ended', function ()
{
    menuSong.play();
}, false);

var forestSong = document.getElementById('forestSong');
forestSong.addEventListener('ended', function()
{
    forestSong.play();
}, false);
