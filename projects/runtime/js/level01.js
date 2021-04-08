var level01 = function (window) {

    window.opspark = window.opspark || {};

    var draw = window.opspark.draw;
    var createjs = window.createjs;

    window.opspark.runLevelInGame = function(game) {
        // some useful constants 
        var groundY = game.groundY;

        // this data will allow us to define all of the
        // behavior of our game
        var levelData = {
            "name": "Robot Romp",
            "number": 1, 
            "speed": -3,
            "gameItems": [
                { "type": "sawblade", "x": 500, "y": groundY - 120},
                { "type": "sawblade", "x": 800, "y": groundY - 120},
                { "type": "sawblade", "x": 1000, "y": groundY - 30},
                { "type": "reward", "x": 600, "y": groundY - 50},
                { "type": "enemy", "x": 800, "y": groundY - 100},
            ]
        };
        window.levelData = levelData;
        // set this to true or false depending on if you want to see hitzones
        game.setDebugMode(false);

        // TODO 6 and on go here
        // BEGIN EDITING YOUR CODE HERE
        function createSawBlade(x, y){
            var hitZoneSize = 25;
            var damageFromObstacle = 10;
            var sawBladeHitZone = game.createObstacle(hitZoneSize, damageFromObstacle);
            sawBladeHitZone.x = x;
            sawBladeHitZone.y = y;
            game.addGameItem(sawBladeHitZone); 
            var obstacleImage = draw.bitmap('img/sawblade.png');
            sawBladeHitZone.addChild(obstacleImage);
            obstacleImage.x = -1 * hitZoneSize;
            obstacleImage.y = -1 * hitZoneSize;  
        }

        for (var i = 0; i < levelData.gameItems.length; i++){
            var gameItemObject = levelData.gameItems[i];
            if (gameItemObject.type === 'sawblade'){
                createSawBlade(gameItemObject.x, gameItemObject.y);
            }
            if (gameItemObject.type === 'reward'){
                createReward(gameItemObject.x, gameItemObject.y);
            }
            if (gameItemObject.type === 'enemy'){
                createEnemy(gameItemObject.x, gameItemObject.y);
            }
        }
        

        function createEnemy(x, y){
            var enemy = game.createGameItem('enemy',25);
            var redSquare = draw.rect(50,50,'blue');
            redSquare.x = -25;
            redSquare.y = -25;
            enemy.addChild(redSquare);

            enemy.x = x;
            enemy.y = y;

            game.addGameItem(enemy);

            enemy.velocityX = -1;

            enemy.rotationalVelocity = 10;

            enemy.onPlayerCollision = function(){
                console.log('The enemy has hit Halle');
                game.changeIntegrity(-10);
                enemy.shrink();
            }

            enemy.onProjectileCollision = function(){
                console.log('Halle has hit the enemy');
                game.increaseScore(100);
                enemy.shrink();
            }
        }
        
        function createReward(x,y) {
            var reward = game.createGameItem('reward',25);
            var blueSphere = draw.sphere(50,50,'blue');
            blueSphere.x = -25;
            blueSphere.y = -25;
            reward.addChild(blueSphere);

            reward.x = x;
            reward.y = y;

            game.addGameItem(reward);

            reward.onPlayerCollision = function(){
                console.log('Halle has gathered the reward');
                game.changeIntegrity(-10);
                reward.fadeOut();
            }

        }
        // DO NOT EDIT CODE BELOW HERE
    }
};

// DON'T REMOVE THIS CODE //////////////////////////////////////////////////////
if((typeof process !== 'undefined') &&
    (typeof process.versions.node !== 'undefined')) {
    // here, export any references you need for tests //
    module.exports = level01;
}