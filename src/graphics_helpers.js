class GraphicsHelpers {
    constructor(){

    }

    tileDrawing(tileWidth, tileHeight, cvWidth, cvHeight, tileDrawingFunc){
        for (let col = 0 ; col < cvWidth / tileWidth ; col++){
            for (let row = 0 ; row < cvHeight / tileHeight ; row++){
                tileDrawingFunc(col * tileWidth, row * tileHeight, tileWidth, tileHeight);
            }
        }
    }

    drawSquareTile(x, y, tileWidth, tileHeight, offset, ctx){
        ctx.fillStyle = 'hsl('+ 360*Math.random() + ',95%,80.5%)';
        ctx.fillRect(x + offset, y + offset, tileWidth - (2*offset), tileHeight - (2*offset));
    }

    drawBesierCurveTileQuad(x, y, tileWidth, tileHeight, ctx){
        ctx.beginPath();
        ctx.strokeStyle = 'hsl('+ 360*Math.random() + ',95%,80.5%)';
        ctx.moveTo(x, y);
        ctx.quadraticCurveTo(x + (tileWidth/2), y + tileHeight, x + tileWidth, y);
        ctx.stroke();
    }

    drawBesierCurveTileCub(x, y, tileWidth, tileHeight, ctx){
        let randOffset = Math.random()*tileHeight * 0.5;
        let starpoint = new Point(x, y);
        let cp1 = new Point(x + (tileWidth/3), y + tileHeight - randOffset);
        let cp2 = new Point(x + 2*tileWidth/3, y + randOffset);
        let endpoint = new Point(x + tileWidth, y + tileHeight);
        ctx.beginPath();
        ctx.strokeStyle = 'hsl('+ 360*Math.random() + ',100%,80.5%)';
        ctx.lineWidth = 4;
        ctx.moveTo(starpoint.getX(), starpoint.getY());
        ctx.bezierCurveTo(cp1.getX(), cp1.getY(), cp2.getX(), cp2.getY(), endpoint.getX(), endpoint.getY());
        ctx.stroke();
    }

    drawRandomLinesTile(x, y, tileWidth, tileHeight, numLines, ctx){
        numLines += Math.random()*10 - 5;// Math.sin(x)*5 + Math.sin(y)*5;
        ctx.beginPath();
        for (let line = 0 ; line < numLines ; line++){
            let startpoint = new Point(x + Math.random()*tileWidth, y + Math.random()*tileHeight);
            let endpoint = new Point(x + Math.random()*tileWidth, y + Math.random()*tileHeight); 
            ctx.moveTo(startpoint.getX(), startpoint.getY());
            ctx.lineTo(endpoint.getX(), endpoint.getY());
        }
        ctx.stroke();
    }
    
}