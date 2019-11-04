class Vertex2f {
    constructor(x,y) {
      this.x = x;
      this.y = y;
    }

    static smaller(c1, c2) {
        if (c1.x < c2.x) return true;
        else if (c1.x == c2.x)
        {
            if (c1.y < c2.y) return true;
        }
        return false;
    }
}

class Edge{
    constructor(begin, end) {
        if (Vertex2f.smaller(begin,end)) {
            this.begin = begin;
            this.end = end;
        }
        else {
            this.begin = end;
            this.end = begin;
        }
    }

    // constructor(obj) {
    //     obj && Object.assign(this, obj);
    // }

    pointExists(xx,yy){
        if(this.begin.x==xx&&this.begin.y==yy) return true;
        else if(this.end.x==xx&&this.end.y==yy) return true;
        return false;
    }

    static equals(e1, e2)
    {
        if(e1.begin.x==e2.begin.x && e1.begin.y==e2.begin.y)
        {
            if(e1.end.x==e2.end.x && e1.end.y==e2.end.y)
            {
                return true;
            }
        }
        return false;
    }
}

class Data{

    constructor(player, number, ballx, bally, bonus, edges){
        this.player=player;
        this.number=number;
        this.ballx=ballx;
        this.bally=bally;
        this.bonus=bonus;
        this.edges=edges;
        this.type ="data";
    }
}

class Information{

    constructor(number, msg){
        this.number=number;
        this.msg=msg;
        this.type="info";
    }
}

let edges = [];
let multiply = 30.0;
let number = -1;

function initEdges(){

    edges = [];

    // top
    edges.push(new Edge(new Vertex2f(3, 1), new Vertex2f(3, 2)));
    edges.push(new Edge(new Vertex2f(3, 2), new Vertex2f(3, 3)));
    edges.push(new Edge(new Vertex2f(3, 3), new Vertex2f(3, 4)));
    edges.push(new Edge(new Vertex2f(3, 4), new Vertex2f(3, 5)));
    edges.push(new Edge(new Vertex2f(3, 5), new Vertex2f(3, 6)));
    edges.push(new Edge(new Vertex2f(3, 6), new Vertex2f(3, 7)));
    edges.push(new Edge(new Vertex2f(3, 7), new Vertex2f(3, 8)));
    edges.push(new Edge(new Vertex2f(3, 8), new Vertex2f(3, 9)));

    // bottom
    edges.push(new Edge(new Vertex2f(15, 1), new Vertex2f(15, 2)));
    edges.push(new Edge(new Vertex2f(15, 2), new Vertex2f(15, 3)));
    edges.push(new Edge(new Vertex2f(15, 3), new Vertex2f(15, 4)));
    edges.push(new Edge(new Vertex2f(15, 4), new Vertex2f(15, 5)));
    edges.push(new Edge(new Vertex2f(15, 5), new Vertex2f(15, 6)));
    edges.push(new Edge(new Vertex2f(15, 6), new Vertex2f(15, 7)));
    edges.push(new Edge(new Vertex2f(15, 7), new Vertex2f(15, 8)));
    edges.push(new Edge(new Vertex2f(15, 8), new Vertex2f(15, 9)));

    // left
    edges.push(new Edge(new Vertex2f(3, 1), new Vertex2f(4, 1)));
    edges.push(new Edge(new Vertex2f(4, 1), new Vertex2f(5, 1)));
    edges.push(new Edge(new Vertex2f(5, 1), new Vertex2f(6, 1)));
    edges.push(new Edge(new Vertex2f(6, 1), new Vertex2f(7, 1)));
    edges.push(new Edge(new Vertex2f(7, 1), new Vertex2f(8, 1)));
    edges.push(new Edge(new Vertex2f(8, 1), new Vertex2f(9, 1)));
    edges.push(new Edge(new Vertex2f(9, 1), new Vertex2f(10, 1)));
    edges.push(new Edge(new Vertex2f(10, 1), new Vertex2f(11, 1)));
    edges.push(new Edge(new Vertex2f(11, 1), new Vertex2f(12, 1)));
    edges.push(new Edge(new Vertex2f(12, 1), new Vertex2f(13, 1)));
    edges.push(new Edge(new Vertex2f(13, 1), new Vertex2f(14, 1)));
    edges.push(new Edge(new Vertex2f(14, 1), new Vertex2f(15, 1)));

    // right
    edges.push(new Edge(new Vertex2f(3, 9), new Vertex2f(4, 9)));
    edges.push(new Edge(new Vertex2f(4, 9), new Vertex2f(5, 9)));
    edges.push(new Edge(new Vertex2f(5, 9), new Vertex2f(6, 9)));
    edges.push(new Edge(new Vertex2f(6, 9), new Vertex2f(7, 9)));
    edges.push(new Edge(new Vertex2f(7, 9), new Vertex2f(8, 9)));
    edges.push(new Edge(new Vertex2f(8, 9), new Vertex2f(9, 9)));
    edges.push(new Edge(new Vertex2f(9, 9), new Vertex2f(10, 9)));
    edges.push(new Edge(new Vertex2f(10, 9), new Vertex2f(11, 9)));
    edges.push(new Edge(new Vertex2f(11, 9), new Vertex2f(12, 9)));
    edges.push(new Edge(new Vertex2f(12, 9), new Vertex2f(13, 9)));
    edges.push(new Edge(new Vertex2f(13, 9), new Vertex2f(14, 9)));
    edges.push(new Edge(new Vertex2f(14, 9), new Vertex2f(15, 9)));

    // bramka top
    edges.push(new Edge(new Vertex2f(2, 4), new Vertex2f(3, 4)));
    edges.push(new Edge(new Vertex2f(2, 6), new Vertex2f(3, 6)));
    edges.push(new Edge(new Vertex2f(2, 4), new Vertex2f(2, 5)));
    edges.push(new Edge(new Vertex2f(2, 5), new Vertex2f(2, 6)));

    // bramka bottom
    edges.push(new Edge(new Vertex2f(15, 4), new Vertex2f(16, 4)));
    edges.push(new Edge(new Vertex2f(15, 6), new Vertex2f(16, 6)));
    edges.push(new Edge(new Vertex2f(16, 4), new Vertex2f(16, 5)));
    edges.push(new Edge(new Vertex2f(16, 5), new Vertex2f(16, 6)));
}

function drawEdges(ctx){
    for(i=0;i<edges.length;i++){
        ctx.fillStyle="#ffffff"; 
        ctx.beginPath();
        ctx.moveTo(multiply*edges[i].begin.x,multiply*edges[i].begin.y);
        ctx.lineTo(multiply*edges[i].end.x,multiply*edges[i].end.y);
        ctx.stroke();
    }
}

var joyX = 50;
var joyY = 450;
var joyRadius = 50;

let player = 0;
let ready = false;
let end = false;

function animation(){
    draw();
    // setTimeout(animation,10);
}

function drawField(ctx){
    ctx.fillStyle = 'rgba(10, 220, 10, 1.0)';
    ctx.beginPath();
    ctx.rect(0,0,canvas.width,canvas.height);
    ctx.fill();
}

function drawBall(ctx){
    ctx.fillStyle = 'white';
    ctx.beginPath();
    console.log("TUTAJ: "+ball.x+" "+ball.y);
    ctx.ellipse(ball.x*multiply, ball.y*multiply, 2*ball.r, 2*ball.r, Math.PI * .25, 0, 2*Math.PI);
    ctx.fill();
}

function drawMessage(ctx, mess){
    ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
    ctx.beginPath();
    ctx.rect(0,0,canvas.width,canvas.height);
    ctx.fill();

    ctx.fillStyle = "black";
    ctx.font = "30px Times Roman";
    ctx.fillText(mess, 0, canvas.height/2.0);

    ctx.strokeStyle = "white";
    ctx.font = "30px Times Roman";
    ctx.lineWidth = 3;
    ctx.strokeText(mess, 0, canvas.height/2.0);
}

function draw(){
    ctx.clearRect(0,0,canvas.width,canvas.height);

    drawField(ctx);
    
    ctx.translate((canvas.width/2)+150, (canvas.height/2)-270);
    ctx.rotate((90.0*Math.PI)/180.0);
    drawEdges(ctx);
    drawBall(ctx);
    ctx.rotate((-90.0*Math.PI)/180.0);
    ctx.translate(-((canvas.width/2)+150), -((canvas.height/2)-270));

    if(end==true){
        if(won==true){
            drawMessage(ctx, "You won, tap to play next game");
        } else {
            drawMessage(ctx, "You lost, tap to play next game");
        }
    } else if(close==true){
        drawMessage(ctx, "Second player disconnected, tap to reconnect");
    } else if(ready==false){
        drawMessage(ctx, "Wait for second player");
    }

    console.log("Gracz: "+player);
}

function getMousePos(canvas, evt) {
    var rect = canvas.getBoundingClientRect();
    var x = (evt.clientX - rect.left);
    var y = (evt.clientY - rect.top);

    x = x - (canvas.width/2.0);
    y = y - (canvas.height/2.0);
    y *= -1.0;
    a = y/x;

    console.log("X:"+x+" Y:"+y+" a:"+a);

    if(x>=0 && y>=0){

        if(a>-0.5578 && a<=0.5578){
            console.log("PRAWO");
            makeMove('a');
        } else if (a>0.5578 && a<=22.5882){
            console.log("GORAPRAWO");
            makeMove('q');
        } else {
            console.log("GORA");
            makeMove('w');
        }

    } else if(x<0 && y>=0) {
        if(a<0.5578 && a>=-0.5578){
            console.log("LEWO");
            makeMove('d');
        } else if (a<-0.5578 && a>-22.5882){
            console.log("GORALEWO");
            makeMove('e');
        }else {
            console.log("GORA");
            makeMove('w');
        }
    } else if(x>=0 && y<0) {
        if(a>-0.5578 && a<=0.5578){
            console.log("PRAWO");
            makeMove('a');
        } else if (a<-0.5578 && a>-22.5882){
            console.log("DOLPRAWO"); 
            makeMove('z');
        }else {
            console.log("DOL");
            makeMove('x');            
        }

    } else if(x<0 && y<0) {
        if(a>-0.5578 && a<=0.5578){
            console.log("LEWO");
            makeMove('d');
        } else if (a>0.5578 && a<=22.5882){
            console.log("DOLLEWO");
            makeMove('c');
        }else {
            console.log("DOL");
            makeMove('x');
        }
    }
}

function makeMove(key)
{
    flaga = true;
    next = false;
    dodatkowy_ruch = false;
    next_x = 0;
    next_y = 0;

    console.log(edges.length)

    switch (key)
    {
        case 'w':
        {
            for (i = 0; i < edges.length; ++i)
            {
                if (Edge.equals(edges[i],
                        new Edge(new Vertex2f(ball.x, ball.y), new Vertex2f(ball.x - 1, ball.y))))
                {
                    flaga = false;
                    console.log("Nie mozesz zrobic takiego ruchu");
                    break;
                }
            }
            if (flaga)
            {
                if (ball.x - 1 >= 3 || (ball.x - 1 >= 2 && (ball.y == 4 || ball.y == 5 || ball.y == 6)))
                {
                    next_x = ball.x - 1;
                    next_y = ball.y;
                    next = true;
                }
                else
                {
                    console.log("Nie mozesz zrobic takiego ruchu");
                }
            }
            break;
        }
        case 'x':
        {
            for (i = 0; i < edges.length; ++i)
            {
                if (Edge.equals(edges[i],
                        new Edge(new Vertex2f(ball.x, ball.y), new Vertex2f(ball.x + 1, ball.y ))))
                {
                    flaga = false;
                    console.log("Nie mozesz zrobic takiego ruchu");

                    break;
                }
            }
            if (flaga)
            {
                if (ball.x + 1 <= 15 || (ball.x + 1 <= 16 && (ball.y == 4 || ball.y == 5 || ball.y == 6)))
                {
                    next_x = ball.x + 1;
                    next_y = ball.y;
                    next = true;
                }
                else
                {
                    console.log("Nie mozesz zrobic takiego ruchu");
                }
            }
            break;
        }

        case 'a':
        {
            for (i = 0; i < edges.length; ++i)
            {
                if (Edge.equals(edges[i],
                        new Edge(new Vertex2f(ball.x, ball.y),
                                new Vertex2f(ball.x, ball.y - 1)))
                        || ball.y - 1 < 1 )
                {
                    flaga = false;
                    console.log("Nie mozesz zrobic takiego ruchu");

                    break;
                }
            }
            if (flaga)
            {
                next_x = ball.x;
                next_y = ball.y - 1;
                next = true;
            }
            break;
        }
        case 'd':
        {
            for (i = 0; i < edges.length; ++i)
            {
                if (Edge.equals(edges[i],
                        new Edge(new Vertex2f(ball.x, ball.y), new Vertex2f(ball.x, ball.y + 1))) || ball.y + 1 > 9)
                {
                    flaga = false;
                    console.log("Nie mozesz zrobic takiego ruchu");

                    break;
                }
            }
            if (flaga)
            {
                next_x = ball.x;
                next_y = ball.y + 1;
                next = true;
            }
            break;
        }

        case 'q':
        {
            for (i = 0; i < edges.length; ++i)
            {
                if (Edge.equals(edges[i],
                        new Edge(new Vertex2f(ball.x, ball.y), new Vertex2f(ball.x - 1, ball.y - 1)))
                        || ball.y - 1 < 1 || !(ball.x - 1 >= 3 || (ball.x - 1 >= 2
                        && (ball.y == 4 || ball.y == 5 || ball.y == 6))))
                {
                    flaga = false;
                    console.log("Nie mozesz zrobic takiego ruchu");

                    break;
                }
            }
            if (flaga)
            {
                next_x = ball.x - 1;
                next_y = ball.y - 1;
                next = true;
            }
            break;
        }

        case 'e':
        {
            for (i = 0; i < edges.length; ++i)
            {
                if (Edge.equals(edges[i],
                        new Edge(new Vertex2f(ball.x, ball.y), new Vertex2f(ball.x - 1, ball.y + 1)))
                        || ball.y + 1 > 9 || !(ball.x - 1 >= 3 || (ball.x - 1 >= 2
                        && (ball.y == 4 || ball.y == 5 || ball.y == 6))))
                {
                    flaga = false;
                    console.log("Nie mozesz zrobic takiego ruchu");

                    break;
                }
            }
            if (flaga)
            {
                next_x = ball.x - 1;
                next_y = ball.y + 1;
                next = true;
            }
            break;
        }
        case 'z':
        {
            for (i = 0; i < edges.length; ++i)
            {
                if (Edge.equals(edges[i],
                        new Edge(new Vertex2f(ball.x, ball.y), new Vertex2f(ball.x + 1, ball.y - 1)))
                        || ball.y - 1 < 1 || !(ball.x + 1 <= 15
                        || (ball.x + 1 <= 16 && (ball.y == 4 || ball.y == 5 || ball.y == 6))))
                {
                    flaga = false;
                    console.log("Nie mozesz zrobic takiego ruchu");
                    break;
                }
            }
            if (flaga)
            {
                next_x = ball.x + 1;
                next_y = ball.y - 1;
                next = true;
            }
            break;
        }
        case 'c':
        {
            for (i = 0; i < edges.length; ++i)
            {
                if (Edge.equals(edges[i],
                        new Edge(new Vertex2f(ball.x, ball.y), new Vertex2f(ball.x + 1, ball.y + 1)))
                        || ball.y + 1 > 9 || !(ball.x + 1 <= 15 || (ball.x + 1 <= 16
                        && (ball.y == 4 || ball.y == 5 || ball.y == 6))))
                {
                    flaga = false;
                    console.log("Nie mozesz zrobic takiego ruchu");
                    break;
                }
            }
            if (flaga)
            {
                next_x = ball.x + 1;
                next_y = ball.y + 1;
                next = true;
            }
            break;
        }
    }
    if (next)
    {
        // console.log("NEXT");

        edges.push(new Edge(new Vertex2f(ball.x, ball.y), new Vertex2f(next_x, next_y)));
        ball.x = next_x;
        ball.y = next_y;
        toogle();
        for (i = 0; i < edges.length - 1; ++i)
        {
            if (edges[i].pointExists(ball.x, ball.y))
            {
                dodatkowy_ruch = true;
            }
        }
        if (dodatkowy_ruch)
        {
            toogle();
            console.log("Dodatkowy ruch dla "+player);
        }

        data = new Data(yourplayer,number,ball.x,ball.y,dodatkowy_ruch,edges);
        connection.send(JSON.stringify(data)); 
        whoWon();
        // draw();
    }
}

function whoWon() {
    if (ball.x == 2 && (ball.y == 4 || ball.y == 5 || ball.y == 6)) {
        console.log("Wygral gracz 1");
        end = true;
        ready = false;
        if(yourplayer==1){
            won = true;
        } else {
            won = false;
        }
    } else if (ball.x == 16 && (ball.y == 4 || ball.y == 5 || ball.y == 6)) {
        console.log("Wygral gracz 2");
        end = true;
        ready = false;
        if(yourplayer==2){
            won = false;
        } else {
            won = true;
        }
    }
}
function toogle(){
    if(player==0) player=1;
    else if(player==1) player=0;
}

//--------------------------------------------//
// MAIN
//--------------------------------------------//

var connection = null;
function connectToServer(){

    // CONNECT TO SERVER
    connection = new WebSocket('ws://localhost:9030');

    // Open connection
    connection.onopen = function () {
        console.log('Connected');

        // Log messages from the server
        connection.onmessage = function (e) {
            console.log("ONMESSAGE");
            console.log('message from server', e.data);
            d = JSON.parse(e.data);
            console.log('message from server', d.type);

                if(d.type=="player"){
                    yourplayer = d.player;
                    player = 1;
                    close=false;
                } else if(d.type=="info"){
                    if(d.msg=="ready"){
                        ready=true;
                        number=d.number;
                        console.log("NUMBER "+number);
                    } else if(d.msg=="close"){
                        ready=false;
                        close=true;
                        connection.close(1000,number+"");
                        connection = null;
                    }
                } else if(d.type=="data"){
                    player = d.player;
                    console.log("Current player: "+player);
                    edges = [];

                    for(i=0;i<d.edges.length;i++){
                        edges.push(new Edge(new Vertex2f(d.edges[i].begin.x, d.edges[i].begin.y), new Vertex2f(d.edges[i].end.x, d.edges[i].end.y)));
                    }
                    ball.x = d.ballx;
                    ball.y = d.bally;
                    whoWon();
                }
                draw();
        };
    };

    // Log errors
    connection.onerror = function (error) {
        console.error('WebSocket Error ' + error);
    };

    connection.onclose = function (code, msg) {
        console.log("Close: "+code+" "+msg);
        connection.send(new Information(number,"close")); 
    };
}

connectToServer();

// CANVAS

var canvas = null;
var ctx = null;

function drawCanvas(){
    canvas = document.getElementById('mycanvas');
    ctx = canvas.getContext('2d');
    ctx.canvas.width  = window.innerWidth;
    ctx.canvas.height = window.innerHeight;
    // multiply = canvas.height/16.0;
    
    ball = {
        x:9,
        y:5,
        r:5,
        vx:1,
        vy:1,
    }

    initEdges();
}

drawCanvas();

canvas.addEventListener("click", function(evt){
    if(yourplayer==player&&ready==true){
        getMousePos(canvas, evt);
    } else if (close==true){
        connectToServer();
        close=false;
        drawCanvas();
        draw();
    } else if(end==true){
        connectToServer();
        close=false;
        end=false;
        drawCanvas();
        draw();
    }
});

animation();

//--------------------------------------------//
// !MAIN
//--------------------------------------------//