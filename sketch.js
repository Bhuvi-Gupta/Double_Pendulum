const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
let engine;
let world;
var ball;
var ground;
var con;
var ball2;
var con2;
function setup() {
  createCanvas(800,600);
  engine = Engine.create();
  
  world = engine.world;
  var ball_options = {
    restitution: 0.8//bouncing
  }
  var roof_options={
		isStatic:true			
	}

	roof = Bodies.rectangle(400,100,20,10,roof_options);
    World.add(world,roof);
    
  ball = Bodies.circle(200,50,10,ball_options);//n the setup function, in sketh.js, using the Bodies.circle function we create the ball. And after createion, we give restitution property to it.
  World.add(world,ball);//After creating a body, we add it to the world.

  ball2 = Bodies.circle(350,10,12,ball_options);
  World.add(world,ball2);
  
  con = Matter.Constraint.create({//Name spacing contraint also allowed(name spacing is when we use matter.constraint as var)
          pointA:{x:400,y:100},//This is a constraint between a point and a body. Point is given by the vector(coordinates in {}) and body is the ball
          bodyB:ball,
          pointB:{x:0,y:0},
          length:100,
          stiffness:0.1//increase will decrease swing
        });
  
      World.add(world,con);
      
  //2nd constraint      
   con2 = Matter.Constraint.create({
          bodyA:ball,//constraint between two bodies(balls)
          pointA:{x:0,y:0},
          bodyB:ball2,
          pointB:{x:0,y:0},
          length:100,
          stiffness:0.1
        });
      World.add(world,con2);
  
  rectMode(CENTER);
  ellipseMode(RADIUS);
}

function draw() {
  background(51);
  
  Engine.update(engine);
  ellipse(ball.position.x,ball.position.y,10);//In the draw funtion, we draw the ball body using ellipse function.
  ellipse(ball2.position.x,ball2.position.y,12);
  rect(roof.position.x,roof.position.y,50,20);
  push();
  strokeWeight(2);//boldness
  stroke(255);//color
  line(con.pointA.x,con.pointA.y,ball.position.x,ball.position.y);
  strokeWeight(2);//boldness
  stroke("red");//color
  line(ball.position.x,ball.position.y,ball2.position.x,ball2.position.y);
  pop();
  fill("white")
  stroke(0)
  textSize(16)
  text("At smaller angles, the double pendulum works on the principle of sine and cosine*. At larger angles, the ",10, 500)
  text("first pendulum is dragging a weight along with it until the momentum slows down.",10, 520)
  text("*(in trigonometry)Sine is the ratio of opposide upon hypotenuse. Cosine is the ratio of adjacent side upon", 10, 555)
  text(" hypotenuse.", 10, 575)
  textSize(18)
  text("Double Pendulum", 340, 60)
  text("Press space to see functioning", 10, 20)
}

function keyPressed()
{
  if(keyCode==32)//keyCode is a number for each key on the keyboard. Key Codes: https://forums.tumult.com/uploads/db2156/original/2X/b/b4bb199b1f5402595884ff9fa06e2d65fcdeaa6d.png
    {
      Matter.Body.applyForce(ball,{x:0,y:0},{x:0.05,y:0});//Matter.Body.applyForce(body, position, force) Applies a force to a body from a given world-space position, including resulting torque. Parameters body Body position Vector force Vector
    }
}

