window.addEventListener('load', function() {
  var ul = document.getElementById('bannerList');
  ul.style.left = 0 + 'px';
  ul.style.padding = 0;
  var isMove = false;

  var bannerList;
  var bannerElList = [];
  var oReq = new XMLHttpRequest();

  var currentCnt = 0;
  var maxCnt = 3;
  oReq.addEventListener("load", reqListener);
  oReq.open("GET", "../../list.json");
  oReq.send();

  var nextBtn = document.getElementById('nextBtn');
  var prevBtn = document.getElementById('prevBtn');

  function reqListener() {
    bannerList = JSON.parse(oReq.response).list
    console.log(bannerList)
    init()
  }

  function init() {
    for (var i = 0; i < bannerList.length; i++) {
      var li = document.createElement('li');
      li.style.position = 'absolute';
      li.style.left = 300 * i + 'px';

      var img = document.createElement('img');
      img.src = bannerList[i];

      li.append(img);
      ul.append(li);

      bannerElList.push(li);
    }
    nextBtn.addEventListener('click', nextMove);
    prevBtn.addEventListener('click', prevMove);
  }

  function nextMove() {
    console.log('next')
    move('next')
  }

  function prevMove() {
    console.log('prev')
    move('prev')
  }

  function move(type) {
    if (isMove) return;
    if (type === 'next') {
      var currentEl = bannerElList[currentCnt];
      var nextEl
      if (currentCnt + 1 < maxCnt) {
        nextEl = bannerElList[currentCnt + 1]
      } else {
        nextEl = bannerElList[0]
      }
      // 포지션셋팅
      nextEl.style.left = 300 + 'px';

      var positon = 0;
      // 애니메이션 처리.
      var interval = setInterval(function () {
        isMove = true;
        if (positon + 10 <= 300) {
          positon += 10;
          currentEl.style.left = positon * -1 + 'px';
          nextEl.style.left = 300 - positon + 'px';
        } else {
          clearInterval(interval);
          isMove = false;
        }
      }, 10);

      if (currentCnt + 1 < maxCnt) {
        currentCnt++;
      } else {
        currentCnt = 0;
      }
    } else {
      var currentEl = bannerElList[currentCnt];
      var nextEl
      if (currentCnt - 1 >= 0) {
        nextEl = bannerElList[currentCnt - 1]
      } else {
        nextEl = bannerElList[maxCnt - 1]
      }
      // 포지션셋팅
      nextEl.style.left = -300 + 'px';

      var positon = 0;
      // 애니메이션 처리.
      var interval = setInterval(function () {
        isMove = true;
        if (positon + 10 <= 300) {
          positon += 10;
          currentEl.style.left = positon + 'px';
          nextEl.style.left = -300 + positon + 'px';
        } else {
          clearTimeout(interval);
          isMove = false;
        }
      }, 10);

      if (currentCnt - 1 >= 0) {
        currentCnt--;
      } else {
        currentCnt = maxCnt - 1;
      }
    }
    // console.log(currentCnt);
  }
});
