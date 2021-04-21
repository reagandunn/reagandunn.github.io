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
                { "type": "sawblade", "x": 1800, "y": groundY - 10},
                { "type": "sawblade", "x": 400, "y": groundY + 10},
                { "type": "sawblade", "x": 900, "y": groundY - 120},
                { "type": "enemy", "x": 400, "y": groundY - 30},
                { "type": "enemy", "x": 1000, "y": groundY - 30},
                { "type": "enemy", "x": 1500, "y": groundY - 40},
                { "type": "enemy", "x": 800, "y": groundY - 10},
                { "type": "enemy", "x": 2000, "y": groundY - 10},
                { "type": "enemy", "x": 1000, "y": groundY - 10},
                { "type": "reward", "x": 500, "y": groundY - 150},
                { "type": "reward", "x": 1500, "y": groundY - 150},
                { "type": "reward", "x": 1800, "y": groundY - 150},
            ]
        };

         for (var i = 0; i < levelData.gameItems.length; i++){
                var gameItemObject = levelData.gameItems[i];
                if (gameItemObject.type === 'sawblade'){
                    createSawBlade(gameItemObject.x, gameItemObject.y);
                } else if (gameItemObject.type === 'trap'){
                    createTrap(gameItemObject.x, gameItemObject.y);
                } else if (gameItemObject.type === 'enemy'){
                    createEnemy(gameItemObject.x, gameItemObject.y)
                } else {
                    createReward(gameItemObject.x, gameItemObject.y)
                }
            }
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

        function createEnemy(x, y){
            var obj = game.createGameItem('enemy',25);
            var enemy = draw.bitmap('img/enemy.png');
            enemy.x = -45;
            enemy.y = -70;
            enemy.scaleX = 1; 
            enemy.scaleY = 1; 
            obj.addChild(enemy);

            obj.x = x;
            obj.y = y;

            game.addGameItem(obj);

            obj.velocityX = -1;

            obj.onPlayerCollision = function(){
                console.log('The monster has hit Halle');
                game.changeIntegrity(-10);
                obj.fadeOut();
            }

            obj.onProjectileCollision = function(){
                console.log('Halle has hit the monster');
                game.increaseScore(100);
                obj.shrink();
            }
        }
        
        function createTrap(x,y) {
            var traps = game.createGameItem('traps', 25);
            var trap = draw.bitmap('img/traps.png')
            trap.x = -40; 
            trap.y = -40;
            trap.scaleX = 0.04; 
            trap.scaleY = 0.04;
            traps.addChild(trap);

            traps.x = x; 
            traps.y = y; 

            game.addGameItem(traps);

            traps.velocityX = -1;

            traps.onPlayerCollision = function(){
                console.log('Halle was caught in the trap');
                game.changeIntegrity(10);
                traps.fadeOut();

                
            traps.onProjectileCollision = function(){
                console.log('Halle has escaped the trap');
                game.increaseScore(100);
                trap.shrink();
                }
            }
        }

        function createReward(x,y) {
            var rewards = game.createGameItem('reward', 25);
            var reward = draw.bitmap('img/reward.png');
            reward.x = -40;
            reward.y = -40;
            reward.scaleX = .5; 
            reward.scaleY = .5;
            rewards.addChild(reward);

            rewards.x = x; 
            rewards.y = y; 

            game.addGameItem(rewards);

            rewards.velocityX = -1;

            rewards.onPlayerCollision = function(){
                console.log('Halle has gathered the reward');
                game.increaseScore(100);
                rewards.fadeOut();
            }
        }

        createReward(300, 300);

           
        // DO NOT EDIT CODE BELOW HERE
    }
};

// DON'T REMOVE THIS CODE //////////////////////////////////////////////////////
if((typeof process !== 'undefined') &&
    (typeof process.versions.node !== 'undefined')) {
    // here, export any references you need for tests //
    module.exports = level01;
}