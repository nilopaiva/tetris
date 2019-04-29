class Block{
    constructor(posX, posY){
        this.block(posX, posY);
    }

    block(posX, posY){
        let ctx = context;
        this.x = posX;
        this.y = posY;
        ctx.fillRect(this.x, this.y, 25, 25);
        //ctx.stroke();
    }

    positionX(){
        return this.x;
    }

    positionY(){
        return this.y;
    }
    /*-----------------------------------
     Verifica se block pode descer
    /*-----------------------------------*/
    canFall(p){ // aqui apenas estou verificando o Y por enquanto (tenho que verifica ro X tbm)
        for(let i=0;i<=p.length;i++){
            if(this.y+25 >= p[i])
                return false;
        }
        return true;
    }

    fall() {
        let ctx = context;
        this.y += 25;
        ctx.fillRect(this.x, this.y, 25, 25);
        
        ctx.stroke();
    }

    render() {
        let ctx = context;
        ctx.fillRect(this.x, this.y, 25, 25);
        ctx.stroke();       
    }

    /*-----------------------------------
     Verifica se block pode se mover para os lados
    /*-----------------------------------*/
    canMove(){
        if(this.x >= 0 && this.x < 250)
            return true;
        else
            return false;    
    }
}