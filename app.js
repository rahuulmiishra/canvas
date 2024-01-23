

const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');
canvas.width = 1179;
canvas.height  = 1375;

class Cell {
    constructor(effect, x,y, index) {
        this.effect = effect;
        this.x = x;
        this.y = y;
        this.index = index;
        this.positionX =   this.effect.height * 0.5;
        this.positionY = Math.random();
        this.speedX;
        this.speedY;
        this.width = this.effect.cellWidth;
        this.height = this.effect.cellHeight;
        this.image = document.getElementById('img');
        this.slideX  = 0;
        this.slideY  = 0;  
        this.vx = 0;
        this.vy = 0;
        this.ease =   0.01;
        this.friction = 0.8;
        this.randomize = Math.random() * 40 + 2;

        setTimeout(()=>{ this.start();}, this.index* 4)
    } 

    draw(context) {
        context.drawImage(this.image,this.x + this.slideX,this.y + this.slideY, this.width, this.height, this.positionX, this.positionY, this.width, this.height)
        context.lineWidth = 0.4;
        context.strokeRect(this.positionX,this.positionY, this.width, this.height);
    }

    start() {
        this.speedX = (this.x - this.positionX)/this.randomize;
        this.speedY = (this.y - this.positionY)/this.randomize;
    }

    update() {

    if(Math.abs(this.speedX )  > 0.01 || Math.abs(this.speedY )> 0.01) {
        this.speedX = (this.x - this.positionX)/this.randomize;
        this.speedY = (this.y - this.positionY)/this.randomize;
    
        this.positionX += this.speedX;
        this.positionY += this.speedY;
    
    }

  
      //  this.slideX  = Math.random()*10;
      const dx = this.effect.mouse.x - this.x;
      const dy = this.effect.mouse.y - this.y;

      
      const distance = Math.hypot(dx,dy);
      if(distance < this.effect.mouse.radius) {
        const angle  = Math.atan2(dy,dx);
        const force = distance/this.effect.mouse.radius;
        this.vx = force * Math.cos(angle);
        this.vy = force * Math.sin(angle);
      } else {
        this.vx = 0;
        this.vy = 0;
      }
      this.slideX += (this.vx *= this.friction)- this.slideX * this.ease;
      this.slideY += (this.vy *= this.friction) - this.slideY * this.ease;
    }

}

class Effect {
    constructor(canvas) {
        this.canvas = canvas;
        this.width = this.canvas.width;
        this.height = this.canvas.height;
        this.cellWidth = this.width/50;
        this.cellHeight = this.height/75;
        this.cell = new Cell(this, 0,0);

        this.imageGrid = [];
        this.createGrid();
        console.log(this.imageGrid);

        this.mouse = {
            x:undefined,
            y:undefined,
            radius: 100
        }

        this.canvas.addEventListener('mousemove', (e)=> {
            this.mouse.x = e.offsetX;
            this.mouse.y = e.offsetY;
        })

        this.canvas.addEventListener('mouseleave', (e)=> {
            this.mouse.x = undefined;
            this.mouse.y = undefined;
        })
     
    }

    createGrid() {
        console.log(this.height,this.canvas.height);
        let index = 0;
        for(let y=0;y<this.height; y+= this.cellHeight) {
            for(let x =0;x < this.width; x += this.cellWidth)
             {
                index++;
                this.imageGrid.unshift(new Cell(this,x,y ,index));
             }
        }
    }

    render(context) {
        
        this.imageGrid.forEach(cell => {
            cell.update();
             cell.draw(context);
        })
    }
}

const effect = new Effect(canvas);


function animate() {
    ctx.clearRect(0,0,canvas.width, canvas.height);
    effect.render(ctx);
    requestAnimationFrame(animate);
}

requestAnimationFrame(animate);