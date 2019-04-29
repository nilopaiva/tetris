class Game{
    constructor(){
        this.score = 0;
        this.points = [];
        this.points[0] = 500;
        this.indexPiece = -1;
        this.piece = [];
        this.form = [];
        this.initialize();
    }

    initialize(){
        for(var i=0; i<999; i++) {
            this.piece[i] = new Array;
        }
        this.create_any_form();
    }

    create_any_form(){
        this.indexPiece += 1;
        let n = Math.floor(Math.random() * (5 - 1)) + 1;
        if(n==0){
            this.create_elle();
        }else if(n==1){
            this.create_squad();
        }else if(n==2){
            this.create_lightning();
        }else if(n==3){
            this.create_row();
        }else{
            this.create_spacecraft();
        }
    }

    update(){
        this.clearCanvas();
        this.fallPiece(); // verifica se a peça pode descer (verifica para cada sub-peça de peça)
        this.draw_stopped_pieces(); // Redesenha as peças que não podem mais descer
    }

    fallPiece(){
        if(this.piece[this.indexPiece][0].canFall(this.points) 
        && this.piece[this.indexPiece][1].canFall(this.points) 
        && this.piece[this.indexPiece][2].canFall(this.points) 
        && this.piece[this.indexPiece][3].canFall(this.points)){
            for(let i=0;i<=3;i++){
                this.piece[this.indexPiece][i].fall();     
            }
        }else{ 
            for(let i=0;i <= this.indexPiece;i++){
                for(let k=0;k<=3;k++){
                    if(this.points.indexOf(this.piece[i][k].y) === -1){
                        this.points.push(this.piece[i][k].y);  
                    }
                }
            } 
            if(Math.min.apply(null, this.points) != 0){
                this.create_any_form();
                this.score += 1;
                document.querySelector('#score').innerHTML = "Score: "+this.score;
            }else{
                for(let k=0;k<=3;k++){
                    this.piece[this.indexPiece][k].render();
                }
            }
        }
    }

    draw_stopped_pieces(){
        for(let i=0;i <= this.indexPiece-1;i++){
            for(let k=0;k<=3;k++){
                this.piece[i][k].render();
            }
        }
    }

    create_elle(){
        for(let i=0;i<=3;i++){
            if(i == 3){
                this.piece[this.indexPiece][i] = new Block(2*25,25);
            }else{
                this.piece[this.indexPiece][i] = new Block(i*25,0);
            }
        }
    }

    clearCanvas(){
        context.clearRect(0, 0, 250, 500);
    }

    create_squad(){
        for(let i=0;i<=3;i++){
            if(i==0){
                this.piece[this.indexPiece][i] = new Block(0,0)
            }else if(i==1){
                this.piece[this.indexPiece][i] = new Block(25,0);
            }else if(i==2){
                this.piece[this.indexPiece][i] = new Block(0,25);
            }else if(i==3){
                this.piece[this.indexPiece][i] = new Block(25,25);
            }
        }
    }

    create_lightning(){
        for(let i=0;i<=3;i++){
            if(i==1){
                this.piece[this.indexPiece][i] = new Block(0,25);
            }else if(i==2){
                this.piece[this.indexPiece][i] = new Block(1*25,25);
            }else if(i==3){
                this.piece[this.indexPiece][i] = new Block(1*25,50);
            }else{
                this.piece[this.indexPiece][i] = new Block(0,0);
            }
        }
    }

    create_spacecraft(){
        for(let i=0;i<=3;i++){
            if(i == 3){
                this.piece[this.indexPiece][i] = new Block(1*25,25);
            }else{
                this.piece[this.indexPiece][i] = new Block(i*25,0);
            }
        }
    }

    create_row(){
        for(let i=0;i<=3;i++){
            this.piece[this.indexPiece][i] = new Block(i*25,0);
        }       
    }
}

let game = new Game();
setInterval(function(){game.update();}, updateTime);