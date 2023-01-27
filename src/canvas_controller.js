import Point from "./graphics_lib/point.js"

class CanvasController {
    canvas = null;
    pointCloud = []
    pointCloudHistory = []
    drawingOffset = 0;
    constructor(canvasId, drawingOffset=0){
        this.canvas = document.getElementById(canvasId);
        this.width = this.canvas.width;
        this.height = this.canvas.height;
        this.ctx = this.canvas.getContext("2d");
        this.drawingOffset = drawingOffset;
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

    paintBackground(){
        this.ctx.fillStyle = 'hsl('+ 6 + ',95%,' + 0 + '%)';
        this.ctx.fillRect(0, 0, this.width, this.height);
    }

    paintPointCloud(pointCloud, drawLines=false, pointHue=5, pointLightness=60, pointSaturation=95, pointDiameter = 15){
        this.ctx.fillStyle = 'hsl('+ pointHue + ',' + pointSaturation + '%,' + pointLightness + '%)';
        this.ctx.lineWidth = 0;
        pointCloud.forEach(point => {
            point.draw(this.ctx, pointDiameter, this.drawingOffset)
            pointHue+=5;
            this.ctx.fillStyle = 'hsl('+ pointHue + ',' + pointSaturation + '%,' + pointLightness + '%)';
        })
        if (drawLines){
            if (pointCloud.length > 1){
                let startpoint = pointCloud[0]
                this.ctx.beginPath();
                let randomHue = 0//360*Math.random()
                let lightness = 100;
                this.ctx.strokeStyle = 'hsl('+ randomHue + ',' + lightness + '%,80.5%)';
                this.ctx.lineWidth = 4;
                this.ctx.moveTo(startpoint.getX() + this.drawingOffset, startpoint.getY() + this.drawingOffset);
                for (let i = 1 ; i < pointCloud.length ; i++){
                    this.ctx.lineTo(pointCloud[i].getX() + this.drawingOffset, pointCloud[i].getY() + this.drawingOffset)
                    /*this.ctx.quadraticCurveTo(this.pointCloud[i].getX(), 
                        this.pointCloud[i].getY(), 
                        this.pointCloud[i+1].getX(), 
                        this.pointCloud[i+1].getY());*/
                    this.ctx.stroke();
                    lightness -= (50/pointCloud.length);
                    randomHue+=5;
                    this.ctx.strokeStyle = 'hsl('+ randomHue + ',' + lightness + '%,80.5%)';
                }
            }
        }
    }

    paint(){
        this.paintBackground();
        this.paintPointCloud(this.pointCloud)
        /*let huesatlight = 80
        let pointDiameter = 5;
        for (let pointCloud of this.pointCloudHistory){
            this.paintPointCloud(pointCloud, false, 60, 80, huesatlight, pointDiameter )
            huesatlight+=20/this.pointCloudHistory.length
            pointDiameter-=4/this.pointCloudHistory.length
        }*/
    }

    setPointCloudDataData(pointCloud){
        // Add to history
        if (this.pointCloud.length > 0){
            this.pointCloudHistory.push(this.pointCloud)
        }
        this.pointCloud = pointCloud;
    }
}

export default CanvasController