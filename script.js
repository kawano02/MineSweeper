$(function() {

  //右クリック禁止
  document.body.oncontextmenu = function () {return false;}

  //サウンドの設定
  let missSound = new Audio('sound/explosion.mp3');
  missSound.playbackRate = 1.5;

  function rand(num) {
    return Math.floor(Math.random() * num);
  }

  let cellArray = [];
  let bomRandNum;
  let bomArray = [];

  //ボムの個数
  let bomQuantity = 13;
  let flagCount = 0;

  $("#flagCount").text(bomQuantity);

  let allCellId;
  let allCell;

  for(let i = 1; i <= 9; i++) {
    for(let j = 1; j<= 9; j++) {
      cellArray.push(i * 10 + j);
    }
  }

  let clearJudgeArray = cellArray;
  let clearJudge;

  // ゲーム終了後にボタンを押せなくする用
  let gameEnd = 0;

  for(let i=0;i<cellArray.length;i++) {
    allCell = document.getElementById("cell" + cellArray[i]);
    allCell.insertAdjacentHTML("afterbegin", "<img src='image/bom.png'>");
    allCell.insertAdjacentHTML("beforeend", "<img src='image/flag.png'>");
  }

  //スタートの時に押したマスと周りのマス
  let startCellArray = [];
  let startDeleteIndex;
  let startCount = 0;
  let startCell;
  let startCellNum;
  let startCellId;
  let cellDocumentId;

  let cellSurroundArray = [];
  let surroundCellPlace;
  let bomCount = 0;

  let selectCellId;
  let selectCell;

  let bomPlace;

  let blankCellArray = [];
  let fullCellArray = [];

  let clearPoint = 0;

  $(".cell").on("click",function() {

    if(gameEnd == 0) {

      if (startCount == 0) {
        startCellId = this.id;
        startCell = document.getElementById(startCellId);
        startCellNum = Number(startCellId.substr(4, 2));


        startCellArray.push(startCellNum);

        if(startCellNum % 10 == 1) {
          startCellArray.push(startCellNum + 1);
          if(startCellNum < 20) {
            startCellArray.push(startCellNum + 10);
            startCellArray.push(startCellNum + 11);
          } else if(startCellNum > 90) {
            startCellArray.push(startCellNum - 10);
            startCellArray.push(startCellNum - 9);
          } else {
            startCellArray.push(startCellNum - 10);
            startCellArray.push(startCellNum - 9);
            startCellArray.push(startCellNum + 10);
            startCellArray.push(startCellNum + 11);
          }
        } else if(startCellNum % 10 == 9) {
          startCellArray.push(startCellNum - 1);
          if(startCellNum < 20) {
            startCellArray.push(startCellNum + 9);
            startCellArray.push(startCellNum + 10);
          } else if(startCellNum > 90) {
            startCellArray.push(startCellNum - 11);
            startCellArray.push(startCellNum - 10);
          } else {
            startCellArray.push(startCellNum - 11);
            startCellArray.push(startCellNum - 10);
            startCellArray.push(startCellNum + 9);
            startCellArray.push(startCellNum + 10);
          }
        } else {
          startCellArray.push(startCellNum - 1);
          startCellArray.push(startCellNum + 1);
          if(startCellNum < 20) {
            startCellArray.push(startCellNum + 9);
            startCellArray.push(startCellNum + 10);
            startCellArray.push(startCellNum + 11);
          } else if(startCellNum > 90) {
            startCellArray.push(startCellNum - 11);
            startCellArray.push(startCellNum - 10);
            startCellArray.push(startCellNum - 9);
          } else {
            startCellArray.push(startCellNum - 11);
            startCellArray.push(startCellNum - 10);
            startCellArray.push(startCellNum - 9);
            startCellArray.push(startCellNum + 9);
            startCellArray.push(startCellNum + 10);
            startCellArray.push(startCellNum + 11);
          }
        }

        cellArray = [];
        for(let i = 1; i <= 9; i++) {
          for(let j = 1; j<= 9; j++) {
            cellArray.push(i * 10 + j);
          }
        }

        for(let i=0; i < startCellArray.length; i++) {
          startDeleteIndex = cellArray.indexOf(startCellArray[i]);
          cellArray.splice(startDeleteIndex, 1);
        }

        for(let i=0;i<bomQuantity;i++) {
          bomRandNum = rand(cellArray.length);
          bomArray.push(cellArray[bomRandNum]);
          cellArray.splice(bomRandNum, 1);
        }

        //爆弾があるセルにクラス追加
        for(let i = 0;i < bomArray.length; i++) {
          bomPlace = document.getElementById("cell" +bomArray[i]);
          bomPlace.classList.add("bom");
        }
      
        for(let i=0; i<startCellArray.length; i++) {
          cellArray.push(startCellArray[i]);
        }

        for(let i=0; i < cellArray.length; i++) {
          if(cellArray[i] % 10 == 1) {
            cellSurroundArray.push(cellArray[i] + 1);
            if(cellArray[i] < 20) {
              cellSurroundArray.push(cellArray[i] + 10);
              cellSurroundArray.push(cellArray[i] + 11);
            } else if(cellArray[i] > 90) {
              cellSurroundArray.push(cellArray[i] - 10);
              cellSurroundArray.push(cellArray[i] - 9);
            } else {
              cellSurroundArray.push(cellArray[i] - 10);
              cellSurroundArray.push(cellArray[i] - 9);
              cellSurroundArray.push(cellArray[i] + 10);
              cellSurroundArray.push(cellArray[i] + 11);
            }
          } else if(cellArray[i] % 10 == 9) {
            cellSurroundArray.push(cellArray[i] - 1);
            if(cellArray[i] < 20) {
              cellSurroundArray.push(cellArray[i] + 9);
              cellSurroundArray.push(cellArray[i] + 10);
            } else if(cellArray[i] > 90) {
              cellSurroundArray.push(cellArray[i] - 11);
              cellSurroundArray.push(cellArray[i] - 10);
            } else {
              cellSurroundArray.push(cellArray[i] - 11);
              cellSurroundArray.push(cellArray[i] - 10);
              cellSurroundArray.push(cellArray[i] + 9);
              cellSurroundArray.push(cellArray[i] + 10);
            }
          } else {
            cellSurroundArray.push(cellArray[i] - 1);
            cellSurroundArray.push(cellArray[i] + 1);
            if(cellArray[i] < 20) {
              cellSurroundArray.push(cellArray[i] + 9);
              cellSurroundArray.push(cellArray[i] + 10);
              cellSurroundArray.push(cellArray[i] + 11);
            } else if(cellArray[i] > 90) {
              cellSurroundArray.push(cellArray[i] - 11);
              cellSurroundArray.push(cellArray[i] - 10);
              cellSurroundArray.push(cellArray[i] - 9);
            } else {
              cellSurroundArray.push(cellArray[i] - 11);
              cellSurroundArray.push(cellArray[i] - 10);
              cellSurroundArray.push(cellArray[i] - 9);
              cellSurroundArray.push(cellArray[i] + 9);
              cellSurroundArray.push(cellArray[i] + 10);
              cellSurroundArray.push(cellArray[i] + 11);
            }
          }
      
          for(let j=0; j<cellSurroundArray.length;j++) {
            surroundCellPlace = document.getElementById("cell" + cellSurroundArray[j]);
      
            if(surroundCellPlace.classList.contains("bom")) {
              bomCount++;
            }
          }
      
          cellDocumentId = document.getElementById("cell" + cellArray[i]);
          
          if(bomCount == 0) {
            //0の時
            cellDocumentId.insertAdjacentHTML("beforeend", "<p></p>");
          } else {
            cellDocumentId.insertAdjacentHTML("beforeend", "<p>" + bomCount + "</p>");
          }
      
          //初期化
          cellSurroundArray = [];
          bomCount = 0;
        }
        startCount++;
      }

      //ここから開くコマンド

      selectCellId = this.id;
      selectCell = document.getElementById(selectCellId);

      if($("#" + selectCellId + " img:nth-child(2)").css('visibility') =='visible') {
      } else {
        if(selectCell.classList.contains("bom")) {
          $("#" + selectCellId + " img:nth-child(1)").css({'visibility' : 'visible'});
        } else {
          $("#" + selectCellId + " p").css({'visibility' : 'visible'});
        };
    
        $("#" + selectCellId).css({'background-color' : 'white'});
    
        clearPoint = 0;
    
        for(let i=0; i<clearJudgeArray.length; i++) {
          clearJudge = document.getElementById("cell" + clearJudgeArray[i]);
          if(clearJudge.style.backgroundColor == 'white'){
            clearPoint++;
          }
        }
    
        // ゲームクリアしたか確認
        if(selectCell.classList.contains("bom")) {
        } else {
          if(clearPoint == 81 - bomQuantity) {
            $("#clear-message").css({'display' : 'block'});
            gameEnd = 1;
          }
        }
    
        if($("#" + selectCellId + " p").text() == "") {
    
          if(selectCell.classList.contains("bom")) {
            //ゲームオーバー
            gameEnd = 1;

            missSound.pause();
            missSound.currentTime = 0.2;  
            missSound.play();

            $("#miss-message").css({'display' : 'block'});

            for(let i=0; i<clearJudgeArray.length; i++) {
              clearJudge = document.getElementById("cell" + clearJudgeArray[i]);
              if(clearJudge.classList.contains("bom")){
                if($("#cell" + clearJudgeArray[i] + " img:nth-child(2)").css('visibility') == 'hidden') {
                  $("#cell" + clearJudgeArray[i] + " img:nth-child(1)").css({'visibility':'visible'});
                }
              }
            }
            
          } else {
            
            blankCellArray.push(Number(selectCellId.substr(4, 2)));
    
          //空きマスがなくなるまで
    
            for(let i=0; i < blankCellArray.length; i++) {
              if(blankCellArray[i] % 10 == 1) {
                cellSurroundArray.push(blankCellArray[i] + 1);
                if(blankCellArray[i] < 20) {
                  cellSurroundArray.push(blankCellArray[i] + 10);
                  cellSurroundArray.push(blankCellArray[i] + 11);
                } else if(blankCellArray[i] > 90) {
                  cellSurroundArray.push(blankCellArray[i] - 10);
                  cellSurroundArray.push(blankCellArray[i] - 9);
                } else {
                  cellSurroundArray.push(blankCellArray[i] - 10);
                  cellSurroundArray.push(blankCellArray[i] - 9);
                  cellSurroundArray.push(blankCellArray[i] + 10);
                  cellSurroundArray.push(blankCellArray[i] + 11);
                }
              } else if(blankCellArray[i] % 10 == 9) {
                cellSurroundArray.push(blankCellArray[i] - 1);
                if(blankCellArray[i] < 20) {
                  cellSurroundArray.push(blankCellArray[i] + 9);
                  cellSurroundArray.push(blankCellArray[i] + 10);
                } else if(blankCellArray[i] > 90) {
                  cellSurroundArray.push(blankCellArray[i] - 11);
                  cellSurroundArray.push(blankCellArray[i] - 10);
                } else {
                  cellSurroundArray.push(blankCellArray[i] - 11);
                  cellSurroundArray.push(blankCellArray[i] - 10);
                  cellSurroundArray.push(blankCellArray[i] + 9);
                  cellSurroundArray.push(blankCellArray[i] + 10);
                }
              } else {
                cellSurroundArray.push(blankCellArray[i] - 1);
                cellSurroundArray.push(blankCellArray[i] + 1);
                if(blankCellArray[i] < 20) {
                  cellSurroundArray.push(blankCellArray[i] + 9);
                  cellSurroundArray.push(blankCellArray[i] + 10);
                  cellSurroundArray.push(blankCellArray[i] + 11);
                } else if(blankCellArray[i] > 90) {
                  cellSurroundArray.push(blankCellArray[i] - 11);
                  cellSurroundArray.push(blankCellArray[i] - 10);
                  cellSurroundArray.push(blankCellArray[i] - 9);
                } else {
                  cellSurroundArray.push(blankCellArray[i] - 11);
                  cellSurroundArray.push(blankCellArray[i] - 10);
                  cellSurroundArray.push(blankCellArray[i] - 9);
                  cellSurroundArray.push(blankCellArray[i] + 9);
                  cellSurroundArray.push(blankCellArray[i] + 10);
                  cellSurroundArray.push(blankCellArray[i] + 11);
                }
              }
    
              for(let j=0;j < cellSurroundArray.length; j++) {
                if($("#cell" + cellSurroundArray[j] + " p").text() == "") {
                  //空白セル
                  if(blankCellArray.includes(cellSurroundArray[j])) {
                  } else {
                    blankCellArray.push(cellSurroundArray[j]);
                    $("#cell" + cellSurroundArray[j] + " p").css({'visibility' : 'visible'});
                    $("#cell" + cellSurroundArray[j]).css({'background-color' : 'white'});
                  }
                } else {
                  if(fullCellArray.includes(cellSurroundArray[j])) {
                  } else {
    
                    if($("#cell" + cellSurroundArray[j]).css('background-color') == 'white'){} else {
                    }
                    fullCellArray.push(cellSurroundArray[j]);
                    $("#cell" + cellSurroundArray[j] + " p").css({'visibility' : 'visible'});
                    $("#cell" + cellSurroundArray[j]).css({'background-color' : 'white'});
                  }
                }
              }
            }
            cellSurroundArray = [];
            blankCellArray = [];
          }
        }
      }

    } 

  })

  //ここから旗を立てるコマンド

  $(".cell").on("contextmenu",function() {

    if(gameEnd == 0) {

      selectCellId = this.id;
      selectCell = document.getElementById(selectCellId);

      if(selectCell.style.backgroundColor == "white") {
      } else {
        if($("#" + selectCellId + " img:nth-child(2)").css("visibility") == "visible") {
          $("#" + selectCellId + " img:nth-child(2)").css({'visibility' : 'hidden'});
          flagCount--;
        } else {
          if(selectCell.style.backgroundColor !== "white") {
            $("#" + selectCellId + " img:nth-child(2)").css({'visibility' : 'visible'});
          }
          flagCount++;
        }
        $("#flagCount").text(bomQuantity - flagCount);
      }

    }

  })


})