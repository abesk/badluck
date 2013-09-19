var dataCanvas = document.getElementById('data');
var dataCtx = dataCanvas.getContext('2d');

var axl = [
    "           si i si i i ",
    "        si  si   si is ",
    "         si si   si s i",
    "       si sisfttcccs is",
    "        si sitocccocis ",
    "         siftcccccccs  ",
    "    kk    sstcccsscc   ",
    "   kkkkk    ftcccccc   ",
    " llllllllllllfttccc    ",
    "ffttcccccccccccct      ",
    " ffftcctttttccct       ",
    "   ffftffc  ttt        ",
    "     ff fc  fc         ",
    "        fc  fc         ",
    "        fc  fc         "
];

var axlRun =[
    "     ff fc  fc         ",
    "       fc  fc          ",
    "      fc  fc           "
];

var colorMap ={
    s: "rgb(170, 0,0)",
    i : "rgb(237, 28, 36)",
    f: "rgb(140, 0, 140)",
    t : "rgb(193, 0, 193)",
    c :   "rgb(217, 0, 217)",
    o : "rgb(0,0,0)",
    k : "rgb(253, 132, 255)",
    l: "rgb(255, 70, 255)"

}


var map = [
    "#####################################################################",
    "#####################################################################",
    "#                            ###                                   ##",
    "#                            ###                                   ##",
    "#                            ###                                   ##",
    "#                            ###                                   ##",
    "#                            ###                                   ##",
    "#                             ####                                 ##",
    "#                  ##            #H##                              ##",
    "##########         ############    ##H##                           ##",
    "#                                                                  ##",
    "#                       ##############################  #############",
    "################       ###############################  #############",
    "################HHHH   #      #    H                               ##",
    "#                      #      #    H                               ##",
    "#                      #      #    H                               ##",
    "#                             #    H                               ##",
    "#                      HHH         H                               ##",
    "#                      #           H                               ##",
    "#                      #      #    H                               ##",
    "#                      #   ####    H                               ##",
    "#                      #   HHH#    H                               ##",
    "#                      #      #    H                               ##",
    "#                      #      #    H                               ##",
    "#                      #      #    HHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHH##",
    "#                      #      #    H                               ##",
    "#                      #      #    H                               ##",
    "#                      #      #    H                               ##",
    "#                      #HHH   #    H                               ##",
    "#                      #      #    H                               ##",
    "#                      #      #    H                               ##",
    "#                      #      #    H                               ##",
    "#                      #      #    H                               ##",
    "#                      #      #    H                               ##",
    "#                      #      #                                    ##",
    "#                      #   HHH#                                    ##",
    "#                      #      #                                    ##",
    "#                      #      #                                    ##",
    "#                      #      #                                    ##",
    "#                      #HHH   #                                    ##",
    "#                             #                                    ##",
    "#########H##############      ###########                          ##",
    "#                 #####       ###########                          ##",
    "#                             ###########                          ##",
    "#                      #      ###########HHHHHHHHHHHHHHHHHHHHHH    ##",
    "#####################################################  ##########  ##",
    "##########################################                #######  ##",
    "#################################################  ##############  ##",
    "#                                                                  ##",
    "#                             ####                                 ##",
    "#     ########## ####            ####                              ##",
    "##########         ############    #####                           ##",
    "#####################################################################",
    "#####################################################################"

];

for(var run = 0; run <=1; run++){

    for (var up = 0; up <=1; up++){
        for (var left = 0; left <=1 ; left++){
            for(var y = 0; y < axl.length - run*axlRun.length; y++){
                for(var x = 0; x < axl[y].length; x++){
                    if(axl[y][x]!= " "){
                        dataCtx.fillStyle = colorMap[axl[y][x]];
                        posX = x;
                        posY = y;
                        if(left > 0){
                            posX = axl[y].length -x -1;
                        }
                        if(up > 0){
                            posY = axl.length -y - 1;
                        }
                        dataCtx.fillRect(posX*2 + left * 64 ,posY*2 + up * 30 + 60*run, 2, 2);
                    }


                }
            }
            if(run > 0) {
            for(var y =0; y < axlRun.length; y++){
                for(var x = 0; x < axl[y].length; x++){
                    if(axlRun[y][x]!= " "){
                        dataCtx.fillStyle = colorMap[axlRun[y][x]];
                        posX = x;
                        posY = y + axl.length - axlRun.length;
                        if(left > 0){
                            posX = axl[y].length -x -1;
                        }
                        if(up > 0){
                            posY = axl.length - posY - 1;
                        }
                        dataCtx.fillRect(posX*2 + left * 64 ,posY*2 + up * 30 + 60*run, 2, 2);
                    }


                }
            }
            }


        }
    }

}



//for(var y = 0; y < axl.length; y++){
//    for(var x = 0; x < axl[y].length; x++){
//        if(axl[y][x]!= " "){
//            dataCtx.fillStyle = colorMap[axl[y][x]];
//            posX = x;
//            posY = y;
////            if(hero.scaleX < 0){
////                posX = axl[y].length -x -1;
////            }
////            if(gravityDirection < 0){
////                posY = axl.length -y - 1;
////            }
//            dataCtx.fillRect(posX*2,posY*2, 2, 2);
//        }
//
//
//    }
//}
//
//for(var y = 0; y < axl.length; y++){
//    for(var x = 0; x < axl[y].length; x++){
//        if(axl[y][x]!= " "){
//            dataCtx.fillStyle = colorMap[axl[y][x]];
//            posX = axl[y].length -x -1;
//            posY = y;
////            if(hero.scaleX < 0){
////                posX = axl[y].length -x -1;
////            }
////            if(gravityDirection < 0){
////                posY = axl.length -y - 1;
////            }
//            dataCtx.fillRect(posX*2 + 64 ,posY*2 , 2, 2);
//        }
//
//
//    }
//}
