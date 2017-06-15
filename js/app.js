// Enemies our player must avoid
var Enemy = function (locX, locY) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images

    this.sprite = 'images/enemy-bug.png';

    this.locX = locX;
    this.locY = locY;
    this.x = locX * 101;
    this.y = locY * 83 - 20;

    // speed values that vary with horizontal level
    this.speed = 150; // default value
    if (locY == 1) {
        this.speed = 250;
    } else if (locY == 2) {
        this.speed = 200;
    } else if (locY == 3) {
        this.speed = 150;
    }

};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function (dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x += (this.x + this.speed) * dt;
    if (this.x > ctx.canvas.width) {
        this.x = -100;
    }

    /**
     * This section determines which block the enemy is in and then use that locX to check if the player
     * is in the same block
     * if he is, then he loses a point if he has any and resets his location to the starting point
     */

    if (this.x < 101) {
        this.locX = 0;
    } else if (this.x < 101 * 2 && this.x >= 101) {
        this.locX = 1;
    } else if (this.x < 101 * 3 && this.x >= 101 * 2) {
        this.locX = 2;
    } else if (this.x < 101 * 4 && this.x >= 101 * 3) {
        this.locX = 3;
    } else if (this.x < 101 * 5 && this.x >= 101 * 4) {
        this.locX = 4;
    }

    if (this.locX == player.locX && this.y == (player.locY * 83 - 20)) {
        console.log("crash");
        player.locX = 2;
        player.locY = 5;
        player.x = player.locX * 101;
        player.y = player.locY * 83 - 30;
        if (player.score > 0) {
            player.score--;
        }
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function () {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};


// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function (locX, locY) {
    /**
     * initialization of player image, position and score
     */
    this.sprite = 'images/char-boy.png';
    this.locX = locX;
    this.locY = locY;
    this.x = locX * 101;
    this.y = locY * 83 - 30;
    this.score = 0;
};

Player.prototype.update = function (dt) {
    /**
     * check if player has reached the water then resets the game and add a point to his/her score
     */
    if (this.locY == 0) {
        this.locX = 2;
        this.locY = 5;
        this.x = this.locX * 101;
        this.y = this.locY * 83 - 30;
        this.score++;
    }
};
Player.prototype.render = function () {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);

    /**
     * This draws the score text at the top left of the canvas .. green text with black stroke
     */
    ctx.fillStyle = "#fff"; // white
    ctx.fillRect(0, 0, 130, 40);
    ctx.font = 'bold 20pt impact';
    ctx.fillStyle = '#5FC148'; // green
    ctx.fillText("SCORE:  " + this.score, 0, 30);
    ctx.lineWidth = 1.5;
    ctx.strokeStyle = "#000"; // black
    ctx.strokeText("SCORE:  " + this.score, 0, 30);

};
Player.prototype.handleInput = function (key) {

    /**
     * Check for user key press and move the player accordingly
     */

    if (key == 'up' && this.locY > 0) {
        this.locY--;
    } else if (key == 'down' && this.locY < 5) {
        this.locY++;
    } else if (key == 'left' && this.locX > 0) {
        this.locX--;
    } else if (key == 'right' && this.locX < 4) {
        this.locX++;
    }

    this.x = this.locX * 101;
    this.y = this.locY * 83 - 30;
};


// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

var allEnemies = [new Enemy(0, 1), new Enemy(2, 2), new Enemy(3, 3), new Enemy(1, 1)];
var player = new Player(2, 5);

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function (e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});