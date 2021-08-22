(function () {
window.addEventListener('DOMContentLoaded', () => {
  const canvas = document.getElementById('canvas');
  const ctx = canvas.getContext('2d');
  const result = {
    win: null,
    Front: 0,
    Back: 0,
    log: []
  };
  const rouletteInfos = [{ name: 'Back', color: 'red' }, { name: 'Front', color: 'blue' }];

  drawRoulette(rouletteInfos);
  setEventListener();

  function drawRoulette(rouletteInfos) {
    ctx.translate(500, 500);
    rouletteInfos.forEach(function(rouletInfo, index) {
      ctx.beginPath();
      ctx.arc(0, 0, 300, 0, (360/rouletteInfos.length)*(Math.PI/180), false);
      ctx.lineTo(0, 0);
      ctx.closePath();
      ctx.fillStyle = rouletInfo.color;
      ctx.fill();
      ctx.fillStyle = 'white';
      ctx.textAlign = 'left';
      ctx.font = '30px sanserif';
      ctx.fillText(rouletInfo.name, 50, 50);
      ctx.rotate((360/rouletteInfos.length)*(Math.PI/180));
    });
  }

  function setEventListener() {
    let random = 0;

    document.querySelector('#canvas').addEventListener('click', function() {
      random += Math.random()*360 + 720;
      playRoulette(random);
    });

    document.querySelector('button').addEventListener('click', function() {
      initResult(result);
      const numOfRoulette = parseInt(document.querySelector('input').value);

      [...Array(numOfRoulette).keys()].forEach(function() {
        random += Math.random()*360 + 720;
        if (random % 360 > 270 || random % 360 <= 90) {
          ++result.Front;
          result.log.push('Front');
        } else {
          ++result.Back;
          result.log.push('Back');
        }
      });

      if (result.Front > result.Back) {
        result.win = 'Front';
      } else if (result.Front < result.Back) {
        result.win = 'Back';
      }

      const winRate = document.createElement('span');
      winRate.innerHTML = `${!!result.win 
        ? `${result.win} win<br/>win rate : ${(100 * result[result.win]/numOfRoulette).toFixed(2)}%` 
        : 'Draw'}`;
      document.querySelector('.result').appendChild(winRate);
      playRoulette(random);

      function initResult(result) {
        random = 0;
        result.win = null;
        result.Front = 0;
        result.Back = 0;
        result.log = [];
        const oldWinRate = document.querySelector('span');
        !!oldWinRate && oldWinRate.parentElement.removeChild(oldWinRate);
      }
    });

    function playRoulette(random) {
      document.querySelector('#canvas').style.webkitTransition = 'ease-in-out 5s';
      document.querySelector('#canvas').style.webkitTransform = `rotate(${random}deg)`;
    }
  }
});
})();