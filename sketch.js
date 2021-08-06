var score = 0;
var balloon,balloonImg;
var ball,ballImg;
var obstacle,obstacleImg;
var backGroundImg,bg;
var obstacle1,obstacleImg1;
var obstacle2,obstacleImg2;
var blockGroup,beeGroup,planeGroup;
var gameState = "PLAY";
var gameOver,gameOverImg;
var restart,restartImg;

function preload(){

    balloonImg = loadImage("Images/Balloon.png");
    ballImg = loadImage("Images/Ball.png");
    obstacleImg = loadImage("Images/Block.png");
    backGroundImg = loadImage("Images/Skybg.png");
    obstacleImg1 = loadImage("Images/bee.png");
    obstacleImg2 = loadImage("Images/aeroplane.png");
    gameOverImg = loadImage("Images/gameOver.png");
    restartImg = loadImage("Images/restart.png");
    
}

function setup(){

    createCanvas(displayWidth,displayHeight);


    score = 0

     bg = createSprite(displayWidth/2,displayHeight/2,50,50);
    bg.addImage(backGroundImg);

    balloon = createSprite(displayWidth/2,displayHeight-220,20,20);
    balloon.addImage(balloonImg);
    balloon.scale = 0.5;
    //balloon.debug = true;
    balloon.setCollider("rectangle",-16,0,170,350);

    ball = createSprite(displayWidth/2,displayHeight/3,10,10);
    ball.addImage(ballImg);
    ball.scale = 0.3;

    gameOver = createSprite(displayWidth/2,displayHeight/2,10,10);
    gameOver.addImage(gameOverImg);
    gameOver.visible = false;

    restart = createSprite(displayWidth/2,displayHeight/2.5,10,10);
    restart.addImage(restartImg);
    restart.visible = false;

    blockGroup = new Group();
    beeGroup = new Group();
    planeGroup = new Group();



}

function draw(){

    background(0);

    if(gameState === "PLAY"){

    bg.velocityY = 3;
    bg.scale = 4.4;


    if(bg.y>displayHeight/0.9){

        bg.y = 300;
    }

    ball.x = mouseX;
    ball.y = mouseY;

    score = score + Math.round(getFrameRate()/60);

    if(balloon.isTouching(blockGroup) || balloon.isTouching(beeGroup) || balloon.isTouching(planeGroup) ){

        gameState = "END"
    }

    ball.displace(beeGroup);
    ball.displace(planeGroup);
    ball.displace(blockGroup);

   // if(ball.isTouching(blockGroup)){

      //  blockGroup[0].velocityY = 0;
     //  blockGroup.setVelocityXEach(10);

   //    console.log("HI");
   // }
    

        
    


    spawnBlocks();
    
}

    if(gameState === "END"){

        gameOver.visible = true;
        restart.visible = true;
        bg.velocityY = 0;
        blockGroup.setVelocityYEach(0);
        planeGroup.setVelocityXEach(0);
        beeGroup.setVelocityYEach(0);

        if(mousePressedOver(restart)){

            gameState = "PLAY";

            blockGroup.destroyEach();
            beeGroup.destroyEach();
            planeGroup.destroyEach();

            gameOver.visible = false;
            restart.visible = false;

            score = 0;
        }


        
    }

    drawSprites();

    fill("black");
   stroke(100);
   textSize(35);
   text("SCORE : "+ score , 30,40);
}

function spawnBlocks(){

    if(frameCount%30 === 0){

        obstacle = createSprite(0,0,10,10);
        obstacle.x = Math.round(random(displayWidth-1200,displayWidth-100));
        obstacle.y = Math.round(random(10,40));
        obstacle.addImage(obstacleImg);
        obstacle.velocityY = 8;
        obstacle.scale = 0.1;

        blockGroup.add(obstacle);
        
    }

    if(frameCount%70 === 0){

        obstacle1 = createSprite(0,0,10,10);
        obstacle1.x = Math.round(random(displayWidth-1200,displayWidth-100));
        obstacle1.y = Math.round(random(10,40));
        obstacle1.addImage(obstacleImg1);
        obstacle1.velocityY = 10;
        obstacle1.scale = 0.2;

        beeGroup.add(obstacle1);
        
    }

    if(frameCount%1000 === 0){

        obstacle2 = createSprite(0,0,10,10);
        obstacle2.x = Math.round(random(displayWidth-10,displayWidth-10));
        obstacle2.y = Math.round(random(displayHeight-800,displayHeight-80));
        obstacle2.addImage(obstacleImg2);
        obstacle2.velocityX = -12;
        obstacle2.scale = 1;

        planeGroup.add(obstacle2);
        
    }
}


