document.addEventListener("DOMContentLoaded", function () {
  /* use this image as background https://cdn.pixabay.com/photo/2016/09/08/12/00/stars-1654074_960_720.jpg */
  document.body.style.backgroundImage =
    "url('https://cdn.pixabay.com/photo/2016/09/08/12/00/stars-1654074_960_720.jpg')";
  /* use this as intro image https://res.cloudinary.com/ashutosh-shrivastava/image/upload/v1674873596/space-game/intro_rlunsr.png */
  var introImage = document.createElement("img");
  introImage.src =
    "https://res.cloudinary.com/ashutosh-shrivastava/image/upload/v1674873596/space-game/intro_rlunsr.png";
  document.body.appendChild(introImage);
  /* center align it and remove this intro image after 2 sec */
  introImage.style.margin = "auto";
  introImage.style.display = "block";
  setTimeout(function () {
    document.body.removeChild(introImage);
  }, 2000);
  /* Display this image as spaceship https://res.cloudinary.com/ashutosh-shrivastava/image/upload/v1674873508/space-game/spaceship-png-icon-17267_tjl9jt.png  make it small and place it at the bottom */
  var spaceship = document.createElement("img");
  spaceship.src =
    "https://res.cloudinary.com/ashutosh-shrivastava/image/upload/v1674873508/space-game/spaceship-png-icon-17267_tjl9jt.png";
  spaceship.style.width = "50px";
  spaceship.style.position = "absolute";
  spaceship.style.bottom = "0";
  spaceship.style.left = "50%";
  spaceship.style.transform = "translateX(-50%)";
  document.body.appendChild(spaceship);
  /* make spaceship image move left or right with mouse movement  . keep "Y" constant and "X" = mouseX */
  document.body.onmousemove = function (e) {
    spaceship.style.left = e.clientX + "px";
  };
  /* disable x scroll */
  document.body.style.overflowX = "hidden";
  /* when space bar key is pressed display this bullet image https://res.cloudinary.com/ashutosh-shrivastava/image/upload/v1674873628/space-game/bullet_kjvxhs.png at the spaceship location , make bullet size small and then move bullet image  from Y=0 to Y= max . make it look like spaceship is firing bullets. */
  document.body.onkeydown = function (e) {
    if (e.keyCode === 32) {
      var bullet = document.createElement("img");
      bullet.src =
        "https://res.cloudinary.com/ashutosh-shrivastava/image/upload/v1674873628/space-game/bullet_kjvxhs.png";
      bullet.style.width = "10px";
      bullet.style.position = "absolute";
      bullet.style.bottom = "0";
      bullet.style.left = spaceship.style.left;
      bullet.style.transform = "translateX(-50%)";
      document.body.appendChild(bullet);
      var bulletInterval = setInterval(function () {
        bullet.style.bottom = parseInt(bullet.style.bottom) + 10 + "px";
        if (parseInt(bullet.style.bottom) > window.innerHeight) {
          clearInterval(bulletInterval);
          document.body.removeChild(bullet);
        }
      }, 100);
    }
  };
  /* Use this as enemy image : https://res.cloudinary.com/ashutosh-shrivastava/image/upload/v1674873628/space-game/enemy_c7xhyu.png and create enemy every 4 sec location y=0 and x= random and move it down with speed */
  var enemyInterval = setInterval(function () {
    var enemy = document.createElement("img");
    enemy.src =
      "https://res.cloudinary.com/ashutosh-shrivastava/image/upload/v1674873628/space-game/enemy_c7xhyu.png";
    enemy.style.width = "50px";
    enemy.style.position = "absolute";
    enemy.style.top = "0";
    enemy.style.left = Math.random() * window.innerWidth + "px";
    document.body.appendChild(enemy);
    var enemyInterval = setInterval(function () {
      enemy.style.top = parseInt(enemy.style.top) + 10 + "px";
      if (parseInt(enemy.style.top) > window.innerHeight) {
        clearInterval(enemyInterval);
        document.body.removeChild(enemy);
      }
    }, 100);
  }, 4000);
  /* disable y scroll */
  document.body.style.overflowY = "hidden";
  /* Add collision detection method for bullet and enemy , if enemy and bullet image overlap , then remove that enemy image and increase score by 1 */
  var score = 0;
  var scoreElement = document.createElement("div");
  scoreElement.innerHTML = "Score: " + score;
  scoreElement.style.position = "absolute";
  scoreElement.style.top = "0";
  scoreElement.style.right = "0";
  document.body.appendChild(scoreElement);
  var collisionInterval = setInterval(function () {
    var enemies = document.getElementsByTagName("img");
    for (var i = 0; i < enemies.length; i++) {
      var enemy = enemies[i];
      if (enemy.src.indexOf("enemy") !== -1) {
        var bullets = document.getElementsByTagName("img");
        for (var j = 0; j < bullets.length; j++) {
          var bullet = bullets[j];
          if (bullet.src.indexOf("bullet") !== -1) {
            if (collision(enemy, bullet)) {
              document.body.removeChild(enemy);
              document.body.removeChild(bullet);
              score++;
              scoreElement.innerHTML = "Score: " + score;
            }
          }
        }
      }
    }
  }, 100);
  /* collision is not defined */
  function collision(enemy, bullet) {
    var enemyRect = enemy.getBoundingClientRect();
    var bulletRect = bullet.getBoundingClientRect();
    return !(
      enemyRect.top > bulletRect.bottom ||
      enemyRect.right < bulletRect.left ||
      enemyRect.bottom < bulletRect.top ||
      enemyRect.left > bulletRect.right
    );
  }
  /* Display score on left top side in white color with 2rem font size */
  scoreElement.style.color = "white";
  scoreElement.style.fontSize = "2rem";

  /* when enemy position is bottom=0 display game over */
  var gameOverInterval = setInterval(function () {
    var enemies = document.getElementsByTagName("img");
    for (var i = 0; i < enemies.length; i++) {
      var enemy = enemies[i];
      if (enemy.src.indexOf("enemy") !== -1) {
        //   console.log(enemy.style.top);
        //   console.log(window.innerHeight - 10);
        if (parseInt(enemy.style.top) >= window.innerHeight - 10) {
          clearInterval(enemyInterval);
          clearInterval(collisionInterval);
          clearInterval(gameOverInterval);
          var gameOver = document.createElement("div");
          gameOver.innerHTML = "Game Over";
          gameOver.style.color = "white";
          gameOver.style.fontSize = "2rem";
          gameOver.style.position = "absolute";
          gameOver.style.top = "50%";
          gameOver.style.left = "50%";
          gameOver.style.transform = "translate(-50%, -50%)";
          document.body.appendChild(gameOver);
        }
      }
    }
  }, 100);
});
