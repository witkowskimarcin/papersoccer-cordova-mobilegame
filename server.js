// server.js
var Server = require('ws').Server;
var port = process.env.PORT || 9030;
var ws = new Server({port: port});

console.log('START');

class Data{

    constructor(player, number, ballx, bally, bonus, edges){
        this.player=player; // number of player (1 or 2)
        this.number=number; // client id
        this.ballx=ballx;   // ball position on axis x
        this.bally=bally;   // ball position on axis y
        this.bonus=bonus;   // bonus point in game
        this.edges=edges;   // list of edges
        this.type ="data";  // type of data
    }
}

class Player{

    constructor(player){
        this.player=player;     // number of player (1 or 2)
        this.type="player";     // type of data
    }
}

class Information{

    constructor(number, msg){
        this.number=number; // client id
        this.msg=msg;       // message
        this.type="info";   // type of data
    }
}

let pair = [];  // single pair
let pairs = []; // list of pairs
let number = 0; // number of games

ws.on('connection', function(w){

    w.id=number+1;
    pair.push(w);

    console.log("Connected id: "+w.id);

    data = new Data(1,0.0,0.0,false,[]);

    player = null;
    if(pair.length%2!=0){
        player = 1;
    } else {
        player = 2;
        number += 1;
    }

    w.send(JSON.stringify(new Player(player))); // send number of player to client

    if(player==2){

        err=false;
        for(i=0;i<2;i++){
            if(err==false){
                pair[i].send(JSON.stringify(new Information(number,"ready")), function(e){
                    err = true;
                });   
            } else {
                pair[i].send(JSON.stringify(new Information(number,"close")));
            }
        }
        
        // handle the situation when any player disconnect
        if(err==true){
            number--;
            // send clone connection information
            for(i=0;i<2;i++){
                try{
                    pairs[number-1][i].send(JSON.stringify(new Information(number,"close")), function(ee){
                        // when error appear do nothing
                    });
                } catch(ex) {
                    // do nothing
                }
            }
        } else {
            pairs.push(pair); 
        }  
        pair = [];
    }

    // on receive message
    w.on('message', function(msg){
        data = JSON.parse(msg);

        // when server receive data from client sends it to second client
        if(data.type=="data"){
            number = data.number;

            // toggle a player when player made his move
            if(data.bonus==false){
                if(data.player==1) data.player = 2;
                else data.player = 1;
            }

            for(i=0;i<2;i++){
                pairs[number-1][i].send(JSON.stringify(data));
            }
        } else if (data.type=="info"){
            number = data.number;

            // send close connection information when the game ends
            if(data.msg=="close"){
                for(i=0;i<2;i++){

                    try{
                        pairs[number-1][i].send(JSON.stringify(new Information(number,"close")));
                    } catch (errr){
                        // do nothing
                    }
                }
            }
        }
    });

    w.on('close', function(code,msg) {
        for(i=0;i<2;i++){
            try{
                pairs[w.id-1][i].send(JSON.stringify(new Information(number,"close")));
            } catch (errr){
                // do nothing
            }
        }
    });
});