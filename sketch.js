var paddle1, paddle2;
var paddleY = 200;
var gameState = 0;
var database;
var submit, input;
var count = 0;

function setup() {
  createCanvas(600, 400);
  database = firebase.database();
  paddle1 = createSprite(20, 200, 10, 100);
  paddle2 = createSprite(580, 200, 10, 100);

  submit = createButton("Submit");
  submit.position(265, 290);
  submit.width = 100;
  submit.height = 50;
  submit.visible = false;

  input = createInput("Name");
  input.visible = false;
  input.position(220, 200);

}

function submitPressed() {
  submit.mousePressed(() => {
    if (input != null && input != '') {
      if (count <= 2) {
        count += 1;
      }
      updatePlayerCount();
      database.ref("players/player" + (count)).update({
        name: input.value(),
      });
    }
  })
}

function updatePlayerCount() {
  database.ref('/').update({
    playerCount: count
  })
}

function readPlayerCount() {
  database.ref('playerCount').on('value', function(data) {
    count = data.val();
  })
}

function updatePosition() {
  database.ref('players/player1').update({
    posY : paddle1.position.y
  })
  database.ref('players/player2').update({
    posY : paddle2.position.y
  })
}

function showForm() {
  paddle1.visible = false;
  paddle2.visible = false;
  submit.visible = true;
  input.visible = true;

  submitPressed();
}

function hideForm() {
  paddle1.visible = true;
  paddle2.visible = true;
  submit.visible = false;
  input.visible = false;
  submit.position(800, 600);
  input.position(800, 600);
}

function movePaddle() {
  if (keyDown("UP") && paddle1.position.y > 5 && paddle1.position.y <= 400) {
    paddle1.position.y -= 10;
  }
  if (keyDown("DOWN")) {
    paddle1.position.y += 10;
}}

function draw() {
  background('black');

  if (count == 2) {
    gameState = 1
  }

  if (gameState == 0) {
    showForm();
  }
  if (gameState == 1) {
    hideForm();
    movePaddle();
    updatePosition();
  }

  readPlayerCount();

  drawSprites();
}
