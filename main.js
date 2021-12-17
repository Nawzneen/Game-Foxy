const canvas = document.querySelector("canvas");
canvas.width = 1000;
canvas.height = 600;
const ctx = canvas.getContext("2d");
let points = document.querySelector("#points");
const popUp = document.querySelector(".div-center");
const restartBtn = document.querySelector("#restart-button");
const lastResult = document.querySelector("#last-result");
const heartImg = document.querySelector("#heart-img");
const heartThree = document.getElementById("heartThree");
const heartTwo = document.getElementById("heartTwo");
const heartOne = document.getElementById("heartOne");

let bonusPoints = 0;
let initialPoint = 0;
// speed of the game and frames
let gameSpeed = 5;
let gameFrame = 0;
let animationFrame = 0;
let gameOver = false;
let heart = 3;
// Background images
const backgroundImage1 = new Image();
backgroundImage1.src = "./backgroundLayers/layer-1.png";
const backgroundImage2 = new Image();
backgroundImage2.src = "./backgroundLayers/layer-2.png";
const backgroundImage3 = new Image();
backgroundImage3.src = "./backgroundLayers/layer-3.png";
const backgroundImage4 = new Image();
backgroundImage4.src = "./backgroundLayers/layer-4.png";
const backgroundImage5 = new Image();
backgroundImage5.src = "./backgroundLayers/layer-5.png";
let imageX = 0;
let x2 = 2400;

// const playerImage = new Image();
// playerImage.src = "./character images/STAND STILL.png";

var jumpSound = new Audio(
  "./sound/mixkit-player-jumping-in-a-video-game-2043.wav"
);

const slider = document.getElementById("slider");
slider.value = gameSpeed;
const showGameSpeed = document.getElementById("showGameSpeed");
showGameSpeed.innerHTML = gameSpeed;

slider.addEventListener("change", function (e) {
  gameSpeed = e.target.value;
  showGameSpeed.innerHTML = gameSpeed;
});

class Layer {
  constructor(image, speedModifier) {
    this.x = 0;
    this.y = 0;
    this.width = 2000;
    this.height = 600;
    this.x2 = this.width;
    this.image = image;
    this.speedModifier = speedModifier;
    this.speed = gameSpeed * this.speedModifier;
  }
  update() {
    this.speed = gameSpeed * this.speedModifier;
    if (this.x <= -this.width) {
      this.x = this.width + this.x2 - this.speed;
    }
    if (this.x2 <= -this.width) {
      this.x2 = this.width + this.x - this.speed;
    }
    this.x = Math.floor(this.x - this.speed);
    this.x2 = Math.floor(this.x2 - this.speed);
  }
  draw() {
    ctx.drawImage(this.image, this.x, this.y, this.width, this.height);

    ctx.drawImage(this.image, this.x2, this.y, this.width, this.height);
  }
}

const layer1 = new Layer(backgroundImage1, 0.1);
const layer2 = new Layer(backgroundImage2, 0.4);
const layer3 = new Layer(backgroundImage3, 0.6);
const layer4 = new Layer(backgroundImage4, 0.8);
const layer5 = new Layer(backgroundImage5, 1);

const layersArrey = [layer1, layer2, layer3, layer4, layer5];

// DIFFERENT CLASSES
class Test {
  constructor(x, y) {
    this.image = new Image();
    this.image.src = "./character images/animation.png";

    this.x = x;
    this.y = y;
    this.foxWidth = 1041.6;
    this.foxHeight = 1041.6;
    this.height = 160;
    this.width = 160;
    this.radius = this.width / 2;
    this.frameX = 0;
    this.frameY = 0;

    // // jump configuration
    this.jumpCounter = 0;
    this.hasJumped = false;
    this.i = 31;
    this.j = 1;
    // // Spin Animation
    // this.spin = 0;
    // // 360 degree rotation in 64frames
    // this.spinIncrement = 360 / 64;
  }
  update() {
    if (!this.hasJumped && gameFrame % 5 === 0) {
      this.frameY = 0;
      if (this.frameX < 7) {
        this.frameX++;
      } else {
        this.frameX = 0;
      }
    } else if (this.hasJumped) {
      this.frameY = 1;
      if (gameFrame % 5 === 0) {
        if (this.frameX < 5) {
          this.frameX++;
        } else {
          this.frameX = 0;
        }
      }
    }
    // if (!this.hasJumped) {
    //   frameY = 0;
    // }
  }
  draw() {
    this.jump();
    // ctx.strokeRect(this.x, this.y, this.width - 20, this.height - 20); (TBD)
    // drawing a circle to examine the distance
    ctx.beginPath();
    ctx.arc(
      this.radius + this.x,
      this.radius + this.y,
      this.radius,
      0,
      Math.PI * 2,
      true
    );
    // ctx.fill();
    ctx.drawImage(
      this.image,
      this.frameX * this.foxWidth,
      this.frameY * this.foxHeight,
      this.foxWidth,
      this.foxHeight,
      this.x,
      this.y,
      this.width,
      this.height
    );
  }
  jump() {
    // let frame = 0;
    // const test = 4;

    if (this.hasJumped) {
      if (this.jumpCounter < 31) {
        // player jumping upward
        this.y = this.y - this.i;
        this.i -= 1;
      } else if (this.jumpCounter > 30 && this.jumpCounter < 36) {
        this.y += 0;
      } else if (this.jumpCounter > 35 && this.jumpCounter < 67) {
        // Player Going Down
        this.y = this.y + this.j;
        this.j += 1;
      }
      // this.rotation();
      // End
      if (this.jumpCounter >= 67) {
        this.i = 30;
        this.j = 0;
        // this.counterRotation();
        // this.spin = 0;
        this.hasJumped = false;
      }
    }
    this.jumpCounter++;
  }
  // rotation() {}
}

// class Player {
//   constructor(x, y, radius, color, velocity) {
//     const playerImage = new Image();
//     playerImage.src = "./character images/STAND STILL.png";
//     this.image = playerImage;

//     this.x = x;
//     this.y = y;
//     this.radius = radius;
//     this.color = color;
//     this.velocity = velocity;
//     // jump configuration
//     this.jumpHeight = 1;
//     this.hasJumped = false;
//     this.jumpCounter = 0;
//     this.i = 31;
//     this.j = 1;
//     // Spin Animation
//     this.spin = 0;
//     // 360 degree rotation in 64frames
//     this.spinIncrement = 360 / 64;
//   }
//   rotation() {
//     let offSetXPosition = this.x;
//     let offSetYPosition = this.y;
//     ctx.translate(offSetXPosition, offSetYPosition);
//     // convert degrees into radians
//     ctx.rotate((this.spin * Math.PI) / 180);
//     ctx.rotate((this.spinIncrement * Math.PI) / 180);
//     ctx.translate(-offSetXPosition, -offSetYPosition);
//     // number of iteration in jump 360/20 = 4.5
//     this.spin += this.spinIncrement;
//   }
//   counterRotation() {
//     // rotate back, so it doesnt interfer with jump
//     let offSetXPosition = this.x;
//     let offSetYPosition = this.y;
//     ctx.translate(offSetXPosition, offSetYPosition);
//     ctx.rotate((-this.spin * Math.PI) / 180);
//     ctx.translate(-offSetXPosition, -offSetYPosition);
//   }

//   jump() {
//     // let frame = 0;
//     // const test = 4;

//     if (this.hasJumped) {
//       // console.log(this.jumpCounter);

//       if (this.jumpCounter < 31) {
//         // player jumping upward

//         this.y = this.y - this.i;
//         this.i -= 1;
//       } else if (this.jumpCounter > 30 && this.jumpCounter < 36) {
//         this.y += 0;
//       } else if (this.jumpCounter > 35 && this.jumpCounter < 67) {
//         // Player Going Down

//         this.y = this.y + this.j;
//         this.j += 1;
//       }
//       this.rotation();
//       // End
//       if (this.jumpCounter >= 67) {
//         this.i = 30;
//         this.j = 0;
//         this.counterRotation();
//         this.spin = 0;
//         // this.jumpCounter = 0;
//         this.hasJumped = false;
//       }
//     }
//     this.jumpCounter++;
//   }

//   draw() {
//     this.jump();
//     // ctx.drawImage(playerImage, 0, 0);
//     ctx.beginPath();
//     ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, true); // Outer circle
//     ctx.moveTo(this.x + 35, this.y);
//     ctx.arc(this.x, this.y, this.radius - 15, 0, Math.PI, false); // Mouth (clockwise)
//     ctx.moveTo(this.x - 10, this.y - 10);
//     ctx.arc(this.x - 15, this.y - 10, this.radius - 45, 0, Math.PI * 2, true); // Left eye
//     ctx.moveTo(this.x + 20, this.y - 10);
//     ctx.arc(this.x + 15, this.y - 10, this.radius - 45, 0, Math.PI * 2, true); // Right eye
//     ctx.stroke();
//     ctx.fillStyle = this.color;
//     // ctx.fill();
//     // reset the rotation so rotation of other element is unchanged
//     if (this.hasJumped) this.counterRotation();
//   }
//   update() {
//     // this.x = this.x + 100;
//   }
// }

class Enemy {
  constructor(x, y, velocity) {
    this.image = new Image();
    this.image.src = "./character images/animation.png";
    this.x = x;
    this.y = y;

    // this.color = color;
    this.velocity = velocity;
    this.enemyWidth = 1041.6;
    this.enemyHeight = 1041.6;
    this.height = 100;
    this.width = 100;
    this.radius = this.width / 2;
    this.frameX = 0;
    this.frameY = 0;
  }
  draw() {
    // console.log(gameFrame);
    ctx.beginPath();
    // ctx.strokeRect(this.x + 20, this.y, 60, this.height);
    // ctx.arc(
    //   this.x + this.radius,
    //   this.y + this.radius,
    //   this.radius,
    //   0,
    //   Math.PI * 2,
    //   true
    // );
    // ctx.fill();
    ctx.drawImage(
      this.image,
      this.frame * this.enemyWidth,
      4 * this.enemyHeight,
      this.enemyWidth,
      this.enemyHeight,
      this.x,
      this.y,
      this.width,
      this.height
    );

    // ctx.beginPath();
    // ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, true);
    // ctx.fillStyle = this.color;
    // ctx.fill();
  }
  update() {
    this.x = this.x - this.velocity;
    if (gameFrame % 11 === 0) {
      if (this.frame < 4) {
        this.frame++;
      } else {
        this.frame = 0;
      }
    }
  }
}
class Bonus {
  constructor(x, y, velocity) {
    this.image = new Image();
    this.image.src = "./character images/animation.png";
    this.x = x;
    this.y = y;
    this.velocity = velocity;
    this.bonusWidth = 1041.6;
    this.bonusHeight = 1041.6;
    this.height = 80;
    this.width = 80;
    this.radius = this.width / 2;
    this.frame = 0;
  }
  update() {
    // this.draw();
    this.x = this.x - this.velocity;

    if (gameFrame % 6 === 0) {
      if (this.frame < 5) {
        this.frame++;
      } else {
        this.frame = 0;
      }
    }
  }
  draw() {
    // drawing a circle to examine the distance
    ctx.beginPath();
    ctx.arc(
      this.radius + this.x,
      this.radius + this.y,
      this.radius,
      0,
      Math.PI * 2,
      true
    );
    // ctx.fill();
    ctx.drawImage(
      this.image,
      this.frame * this.bonusWidth,
      2 * this.bonusHeight,
      this.bonusWidth,
      this.bonusHeight,
      this.x,
      this.y,
      this.width,
      this.height
    );

    // ctx.beginPath();
    // ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, true);
    // ctx.fillStyle = this.color;
    // ctx.fill();
  }
}

const friction = 0.9;
class Particle {
  constructor(x, y, radius, color, velocity) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = color;
    this.velocity = velocity;
    this.alpha = 1;
  }
  draw() {
    ctx.save();
    ctx.globalAlpha = this.alpha;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    ctx.fillStyle = this.color;
    ctx.fill();
    ctx.restore();
  }
  update() {
    this.draw();
    this.velocity.y *= friction;
    this.velocity.x *= friction;
    this.x = this.x + this.velocity.x;
    this.y = this.y + this.velocity.y;
    this.alpha -= 0.01;
  }
}

const x = canvas.width / 4;
const y = canvas.height - 240;

let test = new Test(0, y);
// Create Player
const enemyRadius = 10;
// Create array of Enemies
let enemies = [];
let bonuses = [];
let particles = [];

// Start of Creating random enemies
function createEnemies() {
  let velocity = gameSpeed;
  console.log(gameSpeed);
  // let randomRadius = Math.random() * 30;
  enemies.push(new Enemy(canvas.width - 10, y + 40, velocity));
}

function enemyLoop() {
  var t = 3000 + Math.random() * 10000;
  if (animationFrame % 1800 == 0) {
    t = t - 1000;
  }
  // console.log(t);
  setTimeout(function () {
    createEnemies();
    enemyLoop();
  }, t);
}

// function createEnemies() {
//   var t = 3000 + Math.random() * 1000;
//   setIntervals(() => {
//     enemies.push(
//       new Enemy(canvas.width - 10, canvas.height - 10, 10, "black", velocity)
//     );
//   }, t);
// }

// END of Creating random enemies

function createBonuses() {
  let velocity = gameSpeed;
  bonuses.push(
    new Bonus(canvas.width - 200 + 100, canvas.height - 500 + 100, velocity)
  );
}
function BonusesLoop() {
  var t = 10000 + Math.random() * 10000;
  setTimeout(function () {
    createBonuses();
    BonusesLoop();
  }, t);
}

const foxWidth = 1250;
const foxHeight = 1250;
let frameX = 0;
let frameY = 0;
let animationSpeed = 0;
const staggerFrames = 8;

let animationID;
function animate() {
  animationID = requestAnimationFrame(animate);
  animationFrame++;

  if (animationFrame % 1800 == 0) {
    gameSpeed++;
    showGameSpeed.innerHTML = gameSpeed;
  }
  // console.log(ctx);
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  gameFrame++;
  layersArrey.forEach((item) => {
    item.draw();
    item.update();
  });

  let position = Math.floor(animationSpeed / staggerFrames) % 8;
  frameX = foxWidth * position;
  // ctx.drawImage(playerAnimationImage, 0, 0);
  // ctx.drawImage(
  //   playerAnimationImage,
  //   frameX,
  //   frameY * foxHeight,
  //   foxWidth,
  //   foxHeight,
  //   0,
  //   canvas.height - 250,
  //   200,
  //   200
  // );
  if (animationSpeed % staggerFrames == 0) {
    if (frameX < 7) frameX += 1;
    else frameX = 0;
  }
  animationSpeed++;
  test.update();
  test.draw();

  // to draw the particles when explodes
  particles.forEach((particle, index) => {
    if (particle.alpha <= 0) {
      particles.splice(index, 1);
    } else {
      particle.update();
    }
  });
  // player.draw();
  enemies.forEach((enemy, index) => {
    enemy.draw();
    enemy.update();

    // why do we write settimeout with 0 on start??????//** */
    // remove the enemy from array, when leaving the screen

    if (enemy.x + enemy.radius < 0) {
      enemies.splice(index, 1);
    }

    // Defeat (Enemy and Test hits) END GAME
    const dist1 = Math.hypot(
      test.x + test.radius - enemy.x - enemy.radius,
      test.y + test.radius - enemy.y - enemy.radius
    );

    if (dist1 - enemy.radius - test.radius + 35 < 0) {
      enemies.splice(index, 1);
      for (let i = 0; i < 60 * 2; i++) {
        particles.push(
          new Particle(
            test.x + test.width,
            test.y + test.height / 2,
            Math.random() * 10,
            "orange",
            {
              x: (Math.random() - 0.5) * 10,
              y: (Math.random() - 0.5) * 10,
            }
          )
        );
      }

      if (heart > 0) {
        if (heart === 3) {
          for (let i = 0; i < 60 * 2; i++) {
            particles.push(
              new Particle(
                heartThree.x + heartThree.width,
                heartThree.y + heartThree.height / 2,
                Math.random() * 3,
                "red",
                {
                  x: (Math.random() - 0.5) * 5,
                  y: (Math.random() - 0.5) * 5,
                }
              )
            );
          }

          heartThree.remove();
          heart--;
        } else if (heart === 2) {
          for (let i = 0; i < 60 * 2; i++) {
            particles.push(
              new Particle(
                heartTwo.x + heartTwo.width,
                heartTwo.y + heartTwo.height / 2,
                Math.random() * 2,
                "red",
                {
                  x: (Math.random() - 0.5) * 3,
                  y: (Math.random() - 0.5) * 3,
                }
              )
            );
          }

          heartTwo.remove();
          heart--;
        } else if (heart === 1) {
          for (let i = 0; i < 60 * 2; i++) {
            particles.push(
              new Particle(
                heartOne.x + heartOne.width,
                heartOne.y + heartOne.height / 2,
                Math.random() * 2,
                "red",
                {
                  x: (Math.random() - 0.5) * 3,
                  y: (Math.random() - 0.5) * 3,
                }
              )
            );
          }
          heartOne.remove();
          heart--;
        }
      } else if (heart === 0) {
        cancelAnimationFrame(animationID);
        // alert("you have lost");
        gameOver = true;
        popUp.style.display = "flex";
        lastResult.innerHTML = points.innerHTML;
        clearInterval(refreshIntervalId);
        health = 2;
      }
    }

    // Defeat (Enemy and Player hits)
    // const dist = Math.hypot(player.x - enemy.x, player.y - enemy.y);
    // if (dist - player.radius - enemy.radius < 0) {
    //   // player.update();
    //   cancelAnimationFrame(animationID);
    //   popUp.style.display = "flex";

    //   // alert("you have lost");
    // }
  });

  bonuses.forEach((bonus, index) => {
    bonus.draw();
    bonus.update();

    const dist = Math.hypot(test.x - bonus.x, test.y - bonus.y);
    // const dist2 = Math.hypot(player.x - bonus.x, player.y - bonus.y);

    // bonuses leaving the canvas
    if (bonus.x + bonus.radius + 200 < 0) {
      bonuses.splice(index, 1);
    }
    // Bonus and test hit

    if (dist - test.radius - bonus.radius < 0) {
      bonuses.splice(index, 1);
      bonusPoints += 20;
      for (let i = 0; i < 100 * 2; i++) {
        particles.push(
          new Particle(
            test.x + bonus.width,
            test.y + bonus.height / 2,
            Math.random() * 2,
            "white",
            {
              x: (Math.random() - 0.5) * 50,
              y: (Math.random() - 0.5) * 50,
            }
          )
        );
      }
    }
    // bonuses leaving the canvas
    // if (dist2 - player.radius - bonus.radius < 0) {
    //   bonuses.splice(index, 1);
    //   bonusPoints += 200;
    //   // points.innerHTML += bonusPoints;
    //   // add sound
    //   // add to the points
    // }
  });
}
enemyLoop();
BonusesLoop();
animate();

// Call Jump Animation
addEventListener("keyup", (event) => {
  if (event.code === "Space") {
    if (!test.hasJumped) {
      // sound of jump
      jumpSound.play();
      // player.jumpCounter = 0;
      // player.hasJumped = true;
      jumpSound.play();
      test.jumpCounter = 0;
      test.hasJumped = true;
    }
  }
});
// result
var refreshIntervalId = setInterval(() => {
  initialPoint++;
  points.innerHTML = initialPoint * 10 + bonusPoints;
}, 1000);

// restart buttom
restartBtn.addEventListener("click", (event) => {
  window.location.reload();
  // restart the game (add later)
});
