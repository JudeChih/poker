$(document).ready(function(){
    
    $("#show").addClass("disabled");
    $("#change").addClass("disabled");
    
    // 發牌後加入選牌的元素
    $("body").on("click","#give",function(){
        $("#player2 div").removeClass('cardBack2');
        showPlayer2Cards();
        $("#change").addClass("disabled");
        $(this).addClass("disabled");
        $("#change").removeClass("disabled");
        $("body").on("click","#player2 div",function(){
            $("#player2 div").removeClass('changeCard');
            $("#player2 div").addClass('cardBG');
            $("#player2 div div").removeClass('changeCard');
            $("#player2 div div").addClass('cardBG');
            $(this).find("div").removeClass('cardBG');
            $(this).find("div").addClass('changeCard');
            $(this).removeClass('cardBG');
            $(this).addClass('changeCard');
            
        });
    }); 
      
    // 換牌
    $("body").on("click","#change",function(){
        x = $(".changeCard").attr("data-card");
        var id = $(".changeCard").attr("id");
        $("#"+ id + " div:even").removeClass("shade");
        $("#"+ id + " div:even").removeClass("heart");
        $("#"+ id + " div:even").removeClass("diamond");
        $("#"+ id + " div:even").removeClass("club");
        $("#"+ id + " div:even").addClass(check(ss.changeCard.c11.flower));
        $("#"+ id + " div:odd").text(ss.changeCard.c11.number);      
        $("#show").removeClass("disabled");
        $(this).addClass("disabled");
        $("#player2 div").removeClass('changeCard');
        $("#player2 div").addClass('final');
        compare();
    });
    
    // 攤牌
    $("body").on("click","#show",function(){
        var player1Point;
        var player2Point;
        showPlayer1Cards();
        $(this).addClass("disabled");
        $("#player1 div").removeClass('cardBack2');
        var aa = result();
        alert(aa);
        location.reload();
    });
    
    // 新的一局
    $("body").on("click","#new",function(){
        location.reload();
    });
    
    var ss = poker();
    var flowerArray;
    var numberArray;
    var x;

    function poker(){

        // 隨機從0~51取出10個不同的數並且丟入一個空陣列
        var uniqueRandoms = [];
        var numRandoms = 52;
        var cardnumber = [];
        var makeUniqueRandom = function () {
            // refill the array if needed
            if (!uniqueRandoms.length) {
                for (var i = 0; i < numRandoms; i++) {
                    uniqueRandoms.push(i);
                }
            }
            var index = Math.floor(Math.random() * uniqueRandoms.length);
            var val = uniqueRandoms[index];

            // now remove that value from the array
            uniqueRandoms.splice(index, 1);

            return val;

        };

        for (var i = 0; i < 11; i++){
            var rand = makeUniqueRandom();
            cardnumber.push(rand);   
        };
        console.log(cardnumber);

        for (var j = 5 ; j > 0 ; j--){
            for ( var k = 0 ; k < 4 ; k++){
                if((cardnumber[k] % 13)+1 > (cardnumber[k+1] % 13)+1 ){
                    var a = cardnumber[k];
                    cardnumber[k] = cardnumber[k+1];
                    cardnumber[k+1] = a ;
                };
            };
        }; 

        for (var l = 5 ; l > 0 ; l--){
            for (var m = 5 ; m < 9 ; m++){
                if((cardnumber[m] % 13)+1 > (cardnumber[m+1] % 13)+1 ){
                    var b = cardnumber[m];
                    cardnumber[m] = cardnumber[m+1];
                    cardnumber[m+1] = b ;
                };
            };
        };

        console.log(cardnumber);

        var c1_f = Math.floor(cardnumber[0]/13);
        var c1_n = (cardnumber[0] % 13)+1;
        var c1 = {"flower":c1_f ,"number":c1_n};

        var c2_f = Math.floor(cardnumber[1]/13);
        var c2_n = (cardnumber[1] % 13)+1;
        var c2 = {"flower":c2_f ,"number":c2_n};

        var c3_f = Math.floor(cardnumber[2]/13);
        var c3_n = (cardnumber[2] % 13)+1;
        var c3 = {"flower":c3_f ,"number":c3_n};

        var c4_f = Math.floor(cardnumber[3]/13);
        var c4_n = (cardnumber[3] % 13)+1;
        var c4 = {"flower":c4_f ,"number":c4_n};

        var c5_f = Math.floor(cardnumber[4]/13);
        var c5_n = (cardnumber[4] % 13)+1;
        var c5 = {"flower":c5_f ,"number":c5_n};

        var c6_f = Math.floor(cardnumber[5]/13);
        var c6_n = (cardnumber[5] % 13)+1;
        var c6 = {"flower":c6_f ,"number":c6_n};

        var c7_f = Math.floor(cardnumber[6]/13);
        var c7_n = (cardnumber[6] % 13)+1;
        var c7 = {"flower":c7_f ,"number":c7_n};

        var c8_f = Math.floor(cardnumber[7]/13);
        var c8_n = (cardnumber[7] % 13)+1;
        var c8 = {"flower":c8_f ,"number":c8_n};

        var c9_f = Math.floor(cardnumber[8]/13);
        var c9_n = (cardnumber[8] % 13)+1;
        var c9 = {"flower":c9_f ,"number":c9_n};

        var c10_f = Math.floor(cardnumber[9]/13);
        var c10_n = (cardnumber[9] % 13)+1;
        var c10 = {"flower":c10_f ,"number":c10_n};

        var c11_f = Math.floor(cardnumber[10]/13);
        var c11_n = (cardnumber[10] % 13)+1;
        var c11 = {"flower":c11_f ,"number":c11_n};

        n = {"player1" : {c1, c2, c3, c4, c5}, "player2" : {c6, c7, c8, c9, c10}, "changeCard" : {c11}};
        return n
    };

    // 檢查花色的function
    function check(n){
        var self = this;
        if( n == 0 ){
            return 'spade' ;
        }else if( n == 1 ){
            return 'heart' ;
        }else if( n == 2 ){
            return 'diamond' ;    
        }else if( n == 3 ){
            return 'club' ;
        }
    };
    
    // 把花色跟數字都編成陣列方便比較
    function compare(){
        // 把每張牌的花色存成變數
        flowerArray = [ss.player1.c1.flower ,ss.player1.c2.flower ,ss.player1.c3.flower ,ss.player1.c4.flower ,ss.player1.c5.flower ,
                       ss.player2.c6.flower ,ss.player2.c7.flower ,ss.player2.c8.flower ,ss.player2.c9.flower ,ss.player2.c10.flower];
        numberArray = [ss.player1.c1.number ,ss.player1.c2.number ,ss.player1.c3.number ,ss.player1.c4.number ,ss.player1.c5.number ,
                       ss.player2.c6.number ,ss.player2.c7.number ,ss.player2.c8.number ,ss.player2.c9.number ,ss.player2.c10.number];

        // 換牌後更改裡陣列裡的值
        numberArray[x] = ss.changeCard.c11.number;
        flowerArray[x] = ss.changeCard.c11.flower;

        // 排列numberArray[]裡的大小順序
        for (var j = 5 ; j > 0 ; j--){
            for ( var k = 0 ; k < 4 ; k++){
                if(numberArray[k] > numberArray[k+1]){
                    var a = numberArray[k];
                    numberArray[k] = numberArray[k+1];
                    numberArray[k+1] = a ;
                };
            };
        }; 

        for (var l = 5 ; l > 0 ; l--){
            for (var m = 5 ; m < 9 ; m++){
                if(numberArray[m] > numberArray[m+1]){
                    var b = numberArray[m];
                    numberArray[m] = numberArray[m+1];
                    numberArray[m+1] = b ;
                };
            };
        };

        // 排列flowerArray[]裡的大小順序
        for (var n = 5 ; n > 0 ; n--){
            for ( var o = 0 ; o < 4 ; o++){
                if(flowerArray[o] > flowerArray[o+1]){
                    var c = flowerArray[o];
                    flowerArray[o] = flowerArray[o+1];
                    flowerArray[o+1] = c ;
                };
            };
        }; 

        for (var p = 5 ; p > 0 ; p--){
            for (var q = 5 ; q < 9 ; q++){
                if(flowerArray[q] > flowerArray[q+1]){
                    var d = flowerArray[q];
                    flowerArray[q] = flowerArray[q+1];
                    flowerArray[q+1] = d ;
                };
            };
        };
    };

    // player1的排組顯示
    function showPlayer1Cards(){
        $("#player1 img").css("display","none");
        $("#p1_card1 div:even").addClass(check(ss.player1.c1.flower));
        $("#p1_card2 div:even").addClass(check(ss.player1.c2.flower));
        $("#p1_card3 div:even").addClass(check(ss.player1.c3.flower));
        $("#p1_card4 div:even").addClass(check(ss.player1.c4.flower));
        $("#p1_card5 div:even").addClass(check(ss.player1.c5.flower));
        $("#p1_card1 div:odd").text(ss.player1.c1.number);
        $("#p1_card2 div:odd").text(ss.player1.c2.number);
        $("#p1_card3 div:odd").text(ss.player1.c3.number);
        $("#p1_card4 div:odd").text(ss.player1.c4.number);
        $("#p1_card5 div:odd").text(ss.player1.c5.number);
    };

    // player2的排組顯示
    function showPlayer2Cards(){
        $("#player2 img").css("display","none");
        $("#p2_card1 div:even").addClass(check(ss.player2.c6.flower));
        $("#p2_card2 div:even").addClass(check(ss.player2.c7.flower));
        $("#p2_card3 div:even").addClass(check(ss.player2.c8.flower));
        $("#p2_card4 div:even").addClass(check(ss.player2.c9.flower));
        $("#p2_card5 div:even").addClass(check(ss.player2.c10.flower));
        $("#p2_card1 div:odd").text(ss.player2.c6.number);
        $("#p2_card2 div:odd").text(ss.player2.c7.number);
        $("#p2_card3 div:odd").text(ss.player2.c8.number);
        $("#p2_card4 div:odd").text(ss.player2.c9.number);
        $("#p2_card5 div:odd").text(ss.player2.c10.number);

    };

    // 判斷雙方大小
    function result(){
        var play1point = getpoint(0);
        var play2point = getpoint(5);
        var final;
        if(play1point > play2point){
            final = "你輸了，對方牌組比你大。";
        }
        else if(play1point < play2point){
            final = "你贏了，恭喜啊!!";
        }
        else{
            final = "雙方平手，下一場祝你好運。";
        }    
        return final;
    };

    // 判斷牌組大小
    function getpoint(i){
        // 判斷滿足五個同花色的條件
        if(flowerArray[i] == flowerArray[i+1] && flowerArray[i+1] == flowerArray[i+2] && flowerArray[i+2] == flowerArray[i+3] && flowerArray[i+3] == flowerArray[i+4]){
            // 判斷同花順
            if(numberArray[i] == (numberArray[i+1]-1) && (numberArray[i+1]-1) == (numberArray[i+2]-2) && (numberArray[i+2]-2) == (numberArray[i+3]-3) && (numberArray[i+3]-3) == (numberArray[i+4]-4)){
                return 9 ;
            }
            // 判斷同花
            else{
                return 6 ;    
            }    
        }
        // 判斷鐵支
        else if((numberArray[i] == numberArray[i+1] && numberArray[i+1] == numberArray[i+2] && numberArray[i+2] == numberArray[i+3]) || (numberArray[i+1] == numberArray[i+2] && numberArray[i+2] == numberArray[i+3] && numberArray[i+3] == numberArray[i+4])){
            return 8 ;
        }
        // 判斷滿足三條的條件
        else if((numberArray[i] == numberArray[i+1] && numberArray[i+1] == numberArray[i+2]) || (numberArray[i+1] == numberArray[i+2] && numberArray[i+2] == numberArray[i+3]) || (numberArray[i+2] == numberArray[i+3] && numberArray[i+3]== numberArray[i+4])){
            // 判斷葫蘆
            if(numberArray[i] == numberArray[i+1] || numberArray[i+3] == numberArray[i+4]){
                return 7 ;
            }
            // 判斷三條
            else{
                return 4 ;
            }   
        }
        // 判斷順子
        else if(numberArray[i] == (numberArray[i+1]-1) && (numberArray[i+1]-1) == (numberArray[i+2]-2) && (numberArray[i+2]-2)== (numberArray[i+3]-3) && (numberArray[i+3]-3) == (numberArray[i+4]-4)){
            return 5 ;
        }
        // 判斷滿足一對一樣的的條件
        else if(numberArray[i] == numberArray[i+1] || numberArray[i+1] == numberArray[i+2] || numberArray[i+2] == numberArray[i+3] || numberArray[3] == numberArray[4]){
            // 判斷兩對 第一種條件
            if(numberArray[i] == numberArray[i+1] && numberArray[i+2] == numberArray[i+3]){
                return 3 ;
            }
            // 判斷兩對 第二種條件
            else if(numberArray[i+1] == numberArray[i+2] && numberArray[i+3] == numberArray[i+4]){
                return 3 ;
            }
            // 判斷兩對 第三種條件
            else if(numberArray[i] == numberArray[i+1] && numberArray[i+3] == numberArray[i+4]){
                return 3 ;
            }
            // 判斷一對
            else{
                return 2 ;
            }
        }
        // 特殊判斷AKQJ10的順子和同花順
        else if(numberArray[i] == 1 && numberArray[i+1] == 10 && numberArray[i+2] == 11 && numberArray[i+3] == 12 && numberArray[i+4] == 13){
            // 判斷同花大順
            if(flowerArray[i] == flowerArray[i+1] && flowerArray[i+1] == flowerArray[i+2] && flowerArray[i+2] == flowerArray[i+3] && flowerArray[i+3] == flowerArray[i+4]){
                return 10 ;
            }
            // 判斷大順
            else{
                return 5 ;
            }
        }
        // 判斷散牌
        else{
            return 1 ;
        }
    };
});
    



