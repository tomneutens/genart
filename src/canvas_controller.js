import Point from "./graphics_lib/point.js"

class CanvasController {
    canvas = null;
    pointCloud = []
    constructor(canvasId){
        this.canvas = document.getElementById(canvasId);
        this.width = this.canvas.width;
        this.height = this.canvas.height;
        this.ctx = this.canvas.getContext("2d");
    }

    getWidth(){
        return this.width;
    }

    getHeight() {
        return this.height;
    }

    setSize(width, height){
        this.canvas.width = width; //document.width is obsolete
        this.canvas.height = height; //document.height is obsolete
        this.width = this.canvas.width;
        this.height = this.canvas.height;
    }

    paint(){
        this.ctx.fillStyle = 'hsl('+ 6 + ',95%,' + 0 + '%)';
        this.ctx.fillRect(0, 0, this.width, this.height);
        this.ctx.fillStyle = 'hsl('+ 6 + ',95%,' + 60 + '%)';
        this.pointCloud.forEach(point => {
            point.draw(this.ctx)
        })
        if (this.pointCloud.length > 3 && this.pointCloud.length%2==1){
            let startpoint = this.pointCloud[0]
            this.ctx.beginPath();
            this.ctx.strokeStyle = 'hsl('+ 360*Math.random() + ',100%,80.5%)';
            this.ctx.lineWidth = 4;
            this.ctx.moveTo(startpoint.getX(), startpoint.getY());
            for (let i = 1 ; i < this.pointCloud.length ; i+=2){
                this.ctx.quadraticCurveTo(this.pointCloud[i].getX(), 
                    this.pointCloud[i].getY(), 
                    this.pointCloud[i+1].getX(), 
                    this.pointCloud[i+1].getY());
                this.ctx.stroke();
            }
        }
        
    }

    setPointCloudDataData(pointCloud){
        this.pointCloud = pointCloud;
    }
}

export default CanvasController