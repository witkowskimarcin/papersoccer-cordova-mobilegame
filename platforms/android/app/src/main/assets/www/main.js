let IP = "192.168.43.3";
// let IP = "pappersoccer.herokuapp.com";
let PORT = "3000";
// let IP = "localhost";
//let IP = "10.16.4.183";
let ADDRESS = "ws://"+IP+":"+PORT+"/";
// let ADDRESS = "wss://"+IP;

// COLORS
let FIELD_COLOR = "rgba(10, 220, 10, 1.0)";
let MYGATE_COLOR = "#0000FF";
let ENEMYGATE_COLOR = "#FF0000";
let EDGE_COLOR = "white";
let BALL_COLOR = "#FFFFFF";
let BG_COLOR = "#374140";
let TEXT_COLOR = "#FFFFFF";
let MESSAGE_COLOR = "rgba(0, 0, 0, 0.5)";

let edges = [];
let multiply = 30.0;
let number = -1;

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

class Ball{
    constructor(x,y,r){
        this.x=x;
        this.y=y;
        this.r=r;
        this.width=2.0*this.r;
        this.height=2.0*this.r;
        this.intervalTime = 100;
        this.numberOfSteps = 10;
        this.stepSize = 0.2;

        if (this.stepSize > 0) // image is pulsating between original size to a larger size
        {
            this.incrementing = true;
        }
        else // image is pulsating between original size to a larger size
        {
            this.incrementing = false;
        }

        this.centreX = this.x + this.r;
        this.centreY = this.y + this.r;
        this.currentStep = 0;
    }

    updateState()
    {
        // console.log("updateState()");
        if (this.stepSize > 0) // image pulses into a bigger image
        {
            if (this.incrementing) // incrementing to increase size of original image
            {
                this.currentStep++;
                if (this.currentStep === this.numberOfSteps)
                {
                    this.incrementing = false;
                }
            }
            else // drecrementing to return to original image size
            {
                this.currentStep--;
                if (this.currentStep === 0)
                {
                    this.incrementing = true;
                }
            }
        }
        else // image pulses into a smaller image
        {
            if (!this.incrementing) // drecrementing to decrease size of original image
            {
                this.currentStep++;
                if (this.currentStep === this.numberOfSteps)
                {
                    this.incrementing = true;
                }
            }
            else // drecrementing to return to original image size
            {
                this.currentStep--;
                if (this.currentStep === 0)
                {
                    this.incrementing = false;
                }
            }
        }
    }

    render(ctx){
        ctx.fillStyle = BALL_COLOR;
        ctx.save();
        ctx.beginPath();
        // console.log("TUTAJ: "+ball.x+" "+ball.y);
        // ctx.ellipse(ball.x*multiply, ball.y*multiply, 2*ball.r, 2*ball.r, Math.PI * .25, 0, 2*Math.PI);
        var newWidth = this.width + (this.currentStep * this.stepSize);
        var newHeight = this.height + (this.currentStep * this.stepSize);
        // var newR = newWidth/2.0;
        var newR = this.r  + (this.currentStep * this.stepSize);
        var newX = ((this.x)*multiply) - (this.currentStep * this.stepSize) / 2;
        var newY = ((this.y)*multiply) - (this.currentStep * this.stepSize) / 2;
        // ctx.ellipse(newX, newY, newWidth, newHeight, Math.PI * .25, 0, 2*Math.PI);
        // ctx.ellipse(newX+(newR/2), newY+(newR/2), 2*newR, 2*newR, Math.PI * .25, 0, 2*Math.PI);
        ctx.ellipse(newX+(this.r/2), newY+(this.r/2), 2*newR, 2*newR, Math.PI * .25, 0, 2*Math.PI);
        // ctx.ellipse(newX, newY, 2*newR, 2*newR, Math.PI * .25, 0, 2*Math.PI);
        ctx.fill();
        ctx.restore();
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

    ctx.fillStyle = color1;
    ctx.beginPath();
    ctx.rect(2.0*multiply,4.0*multiply,1.0*multiply,2.0*multiply);
    ctx.fill();

    ctx.fillStyle = color2;
    ctx.beginPath();
    ctx.rect(15.0*multiply,4.0*multiply,1.0*multiply,2.0*multiply);
    ctx.fill();

    for(i=0;i<edges.length;i++){
        ctx.beginPath();
        ctx.moveTo(multiply*edges[i].begin.x,multiply*edges[i].begin.y);
        ctx.lineTo(multiply*edges[i].end.x,multiply*edges[i].end.y);
        ctx.strokeStyle=EDGE_COLOR;
        ctx.stroke();
    }
}

var joyX = 50;
var joyY = 450;
var joyRadius = 50;

let player = 0;
let yourplayer = -1;
let ready = false;
let end = false;
let conError = false;

function drawField(ctx){
    // ctx.fillStyle = 'rgba(10, 220, 10, 1.0)';
    ctx.fillStyle = FIELD_COLOR;
    ctx.beginPath();
    ctx.rect(0,0,canvas.width,canvas.height);
    ctx.fill();

    color1 = null;
    color2 = null;

    if(yourplayer==1){
        color1=ENEMYGATE_COLOR;
        color2=MYGATE_COLOR;
    } else {
        color1=MYGATE_COLOR;
        color2=ENEMYGATE_COLOR;
    }

//    ctx.fillStyle="white";
//    ctx.beginPath();
//    ctx.moveTo(0.0,0.33*canvas.height);
//    ctx.lineTo(canvas.width,0.66*canvas.height);
//    ctx.stroke();
//
//    ctx.fillStyle="white";
//    ctx.beginPath();
//    ctx.moveTo(0.0,0.66*canvas.height);
//    ctx.lineTo(canvas.width,0.33*canvas.height);
//    ctx.stroke();
//
//    ctx.fillStyle="white";
//    ctx.beginPath();
//    ctx.moveTo(0.33*canvas.width,0.0);
//    ctx.lineTo(0.66*canvas.width,canvas.height);
//    ctx.stroke();
//
//    ctx.fillStyle="white";
//    ctx.beginPath();
//    ctx.moveTo(0.33*canvas.width,canvas.height);
//    ctx.lineTo(0.66*canvas.width,0.0);
//    ctx.stroke();

//--------------------------

    // ctx.fillStyle="white";
    // ctx.beginPath();
    // ctx.moveTo(canvas.width/2.0,canvas.height/2.0);
    // ctx.lineTo(0.0,0.33*canvas.height);
    // ctx.stroke();

    // ctx.fillStyle="white";
    // ctx.beginPath();
    // ctx.moveTo(canvas.width/2.0,canvas.height/2.0);
    // ctx.lineTo(0.0,0.66*canvas.height);
    // ctx.stroke();

    // ctx.fillStyle="white";
    // ctx.beginPath();
    // ctx.moveTo(canvas.width/2.0,canvas.height/2.0);
    // ctx.lineTo(0.33*canvas.width,0.0);
    // ctx.stroke();

    // ctx.fillStyle="white";
    // ctx.beginPath();
    // ctx.moveTo(canvas.width/2.0,canvas.height/2.0);
    // ctx.lineTo(0.66*canvas.width,0.0);
    // ctx.stroke();

//    ctx.fillStyle="white";
//    ctx.beginPath();
//    ctx.moveTo(canvas.width/2.0,canvas.height/2.0);
//    ctx.lineTo(0.33*canvas.width,0.33*canvas.height);
//    ctx.stroke();
//
//    ctx.fillStyle="white";
//    ctx.beginPath();
//    ctx.moveTo(canvas.width/2.0,canvas.height/2.0);
//    ctx.lineTo(0.66*canvas.width,0.33*canvas.height);
//    ctx.stroke();
//
//    ctx.fillStyle="white";
//    ctx.beginPath();
//    ctx.moveTo(canvas.width/2.0,canvas.height/2.0);
//    ctx.lineTo(0.33*canvas.width,0.66*canvas.height);
//    ctx.stroke();
//
//    ctx.fillStyle="white";
//    ctx.beginPath();
//    ctx.moveTo(canvas.width/2.0,canvas.height/2.0);
//    ctx.lineTo(0.66*canvas.width,0.66*canvas.height);
//    ctx.stroke();


}

function drawMessage(ctx, mess, shift=0, without_rect=false){

    if(!without_rect){
        ctx.fillStyle = MESSAGE_COLOR;
        ctx.beginPath();
        ctx.rect(0,0,canvas.width,canvas.height);
        ctx.fill();
    }

    ctx.fillStyle = "black";
    ctx.font = "30px Times Roman";
    ctx.fillText(mess, 0, (canvas.height+shift)/2.0);

    ctx.strokeStyle = "white";
    ctx.font = "30px Times Roman";
    ctx.lineWidth = 3;
    ctx.strokeText(mess, 0, (canvas.height+shift)/2.0);
}

function draw(){
    ctx.clearRect(0,0,canvas.width,canvas.height);
    drawField(ctx);
    ctx.fillStyle = TEXT_COLOR;
    ctx.font = "20px Times Roman";

    if(end==true){
        if(won==true){
            drawMessage(ctx, "You won,");
            drawMessage(ctx, "tap to play next game",100,true);
        } else {
            drawMessage(ctx, "You lost,");
            drawMessage(ctx, "tap to play next game",100,true);
        }
    } else if(close==true){
        drawMessage(ctx, "Second player disconnected,");
        drawMessage(ctx, "tap to find another",100,true);
    } else if(ready==false){
        drawMessage(ctx, "Wait for second player");
    } else if(conError==true || !connection){
        drawMessage(ctx, "Connection error,");
        drawMessage(ctx, "tap to reconnect",100,true);
    } else {

        ctx.translate((canvas.width/2)+150, (canvas.height/2)-270);
        ctx.rotate((90.0*Math.PI)/180.0);
        // ctx.fillStyle=EDGE_COLOR;
        drawEdges(ctx);
        ball.render(ctx);
        ctx.rotate((-90.0*Math.PI)/180.0);
        ctx.translate(-((canvas.width/2)+150), -((canvas.height/2)-270));
    
        if(player==yourplayer){
            ms = "Your move";
        } else {
            ms = "Wait for move";
        }
        ctx.fillText(ms, canvas.width/2-100, canvas.height/2-250);
    }

    // console.log("Gracz: "+player);
}

function getMousePos(canvas, evt) {
    var rect = canvas.getBoundingClientRect();
    var x = (evt.clientX - rect.left);
    var y = (evt.clientY - rect.top);

    x = x - (canvas.width/2.0);
    y = y - (canvas.height/2.0);
    y *= -1.0;
    a = y/x;

    // y = ax+b

    function fun_cursor(X) { return (y/x)*X;}

    function fun2(X) { return (canvas.height/(0.33*canvas.width))*X;}
    function fun22(X) { return (0.0/(0.66*canvas.width))*X;}

    function fun1(X) { return (canvas.height/(0.66*canvas.width))*X;}
    function fun11(X) { return (0.0/(0.33*canvas.width))*X;}

    function fun3(X) { return ((0.33*canvas.height)/(canvas.width))*X;}
    function fun33(X) { return ((0.66*canvas.height)/(0.0))*X;}

    function fun4(X) { return ((0.66*canvas.height)/(canvas.width))*X;}
    function fun44(X) { return ((0.33*canvas.height)/(0.0))*X;}
    

    // console.log("X:"+x+" Y:"+y+" a:"+a);

    if(x>=0 && y>=0){
        // console.log("1 QUATER "+fun_cursor(x));
        // console.log("fun4: "+fun4(x));
        // console.log("fun2: "+fun2(x));

        if(fun_cursor(x)<fun4(x)){
            // console.log("RIGHT");
            makeMove('a');
        } else if (fun_cursor(x)>=fun4(x)&&fun_cursor(x)<=fun2(x)){
            // console.log("UPRIGHT");
            makeMove('q');
        } else {
            // console.log("UPPER");
            makeMove('w');
        }
    }
    else if(x<0 && y>=0) {
        // console.log("2 QUATER "+fun_cursor(x));
        // console.log("fun3: "+fun3(x));
        // console.log("fun1: "+fun1(x));
        // x*=-1.0;
        if(fun_cursor(x)<(fun3(x)*-1.0)){
            // console.log("LEFT");
            makeMove('d');
        } else if (fun_cursor(x)>=(fun3(x)*-1.0)&&fun_cursor(x)<=(fun1(x)*-1.0)){
            // console.log("UPLEFT");
            makeMove('e');
        } else {
            // console.log("UPPER");
            makeMove('w');
        }
    }
    else if(x>=0 && y<0) {
        // console.log("4 QUATER "+fun_cursor(x));
        // console.log("fun4: "+fun4(x));
        // console.log("fun2: "+fun2(x));
        if(fun_cursor(x)>(fun4(x)*-1.0)){
            // console.log("RIGHT");
            makeMove('a');
        } else if (fun_cursor(x)<=(fun4(x)*-1.0)&&fun_cursor(x)>=(fun2(x)*-1.0)){
            // console.log("DOWNRIGHT");
            makeMove('z');
        } else {
            // console.log("DOWN");
            makeMove('x');
        }
    } 
    else if(x<0 && y<0) {
        // console.log("3 QUATER "+fun_cursor(x));
        // console.log("fun4: "+fun4(x));
        // console.log("fun2: "+fun2(x));
        if(fun_cursor(x)>(fun4(x))){
            // console.log("LEFT");
            makeMove('d');
        } else if (fun_cursor(x)<=(fun4(x))&&fun_cursor(x)>=(fun2(x))){
            // console.log("DOWNLEFT");
            makeMove('c');
        } else {
            // console.log("DOWN");
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

const time = setInterval(function() {
    if(player==yourplayer)
        ball.updateState();
    draw();
}, 100);

//--------------------------------------------//
// MAIN
//--------------------------------------------//

var canvas = null;
var ctx = null;
var connection = null;

function main(){

function connectToServer(){

    // CONNECT TO SERVER
    connection = new WebSocket(ADDRESS);

    // Open connection
    connection.onopen = function () {
        console.log('Connected');

        // Log messages from the server
        connection.onmessage = function (e) {
            // console.log("ONMESSAGE");
            // console.log('message from server', e.data);
            d = JSON.parse(e.data);
            // console.log('message from server', d.type);

                if(d.type=="player"){
                    yourplayer = d.player;
                    player = 1;
                    close=false;
                } else if(d.type=="info"){
                    if(d.msg=="ready"){
                        ready=true;
                        number=d.number;
                        // console.log("NUMBER "+number);
                    } else if(d.msg=="close"){
                        ready=false;
                        close=true;
                        connection.close(1000,number+"");
                        connection = null;
                    }
                } else if(d.type=="data"){
                    player = d.player;
                    // console.log("Current player: "+player);
                    edges = [];

                    for(i=0;i<d.edges.length;i++){
                        edges.push(new Edge(new Vertex2f(d.edges[i].begin.x, d.edges[i].begin.y), new Vertex2f(d.edges[i].end.x, d.edges[i].end.y)));
                    }
                    ball.x = d.ballx;
                    ball.y = d.bally;
                    whoWon();
                }
                // draw();
        };
    };

    // Log errors
    connection.onerror = function (error) {
        console.error('WebSocket Error ' + error);
        conError=true;
        ready=false;
        connection=null;
        // close=true;
    };

    connection.onclose = function (code, msg) {
        console.log("Close: "+code+" "+msg);
        ready=false;
        close=true;
        if(connection)
            connection.send(new Information(number,"close")); 
        connection = null;
    };
}

connectToServer();

// CANVAS

function drawCanvas(){
    canvas = document.getElementById('mycanvas');
    ctx = canvas.getContext('2d');
    ctx.canvas.width  = window.innerWidth;
    ctx.canvas.height = window.innerHeight;    
    //    ctx.canvas.width  = 400;
    //    ctx.canvas.height = 600;
    // multiply = canvas.height/16.0;

    ball = new Ball(9,5,5);

    initEdges();
}

drawCanvas();

canvas.addEventListener("click", function(evt){
    if(yourplayer==player&&ready==true){
        getMousePos(canvas, evt);
    } else if (close==true){
        connectToServer();
        close=false;
        end=false;
        conError=false;
        drawCanvas();
    } else if(end==true){
        connectToServer();
        close=false;
        end=false;
        conError=false;
        drawCanvas();
    } else if(conError==true){
        connectToServer();
        close=false;
        end=false;
        conError=false;
        drawCanvas();       
    } 
    else if(typeof connection === 'undefined'){
        connectToServer();
        close=false;
        end=false;
        conError=false;
        drawCanvas();       
    }
});

}

//--------------------------------------------//
// !MAIN
//--------------------------------------------//

window.addEventListener("load", onDeviceReady);           // needed for websites
document.addEventListener("deviceready", onDeviceReady);  // needed for Cordova mobile apps

function onDeviceReady() {
    // Now safe to use device APIs
    main();
}

// main();