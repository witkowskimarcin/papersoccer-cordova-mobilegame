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

let edges = [];
let multiply = 30.0;

function initEdges(){

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

function animation(){
    draw();
    // setTimeout(animation,10);
}

function drawField(ctx){
    ctx.fillStyle = 'green';
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

function draw(){
    ctx.clearRect(0,0,canvas.width,canvas.height);

    drawField(ctx);
    
    ctx.translate((canvas.width/2)+150, (canvas.height/2)-270);
    ctx.rotate((90.0*Math.PI)/180.0);
    drawEdges(ctx);
    drawBall(ctx);
    ctx.rotate((-90.0*Math.PI)/180.0);
    ctx.translate(-((canvas.width/2)+150), -((canvas.height/2)-270));

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

        whoWon();
        draw();
    }
}

function whoWon() {
    if (ball.x == 2 && (ball.y == 4 || ball.y == 5 || ball.y == 6)) {
        // if (player == 0) {
            console.log("Wygral gracz 1");
        // } else {
            
        // }
    } else if (ball.x == 16 && (ball.y == 4 || ball.y == 5 || ball.y == 6)) {
        // if (player == 1) {
            console.log("Wygral gracz 2");
        // } else {

        // }
    }
}
function toogle(){
    if(player==0) player=1;
    else if(player==1) player=0;
}

//--------------------------------------------//
// MAIN
//--------------------------------------------//

initEdges();

var canvas = document.getElementById('mycanvas');
var ctx = canvas.getContext('2d');

ball = {
    // x:canvas.width/2.0,
    // y:canvas.height/2.0,
    x:9,
    y:5,
    r:5,
    vx:1,
    vy:1,
}

canvas.addEventListener("click", function(evt){
    getMousePos(canvas, evt);
});

animation();

//--------------------------------------------//
// !MAIN
//--------------------------------------------//