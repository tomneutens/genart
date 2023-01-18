import Point from "./graphics_lib/point.js"
import tsnejs from "./t-sne.js"

class DataProcController {
    distanceMatrix = [];
    maxX = 0;
    maxY = 0;
    pointCloud = [];
    numIterations = 1000;
    constructor(maxX, maxY){
        this.maxX = maxX;
        this.maxY = maxY;
    }

    setMaxX(maxX){
        this.maxX = maxX;
    }

    setMaxY(maxY){
        this.maxY = maxY;
    }

    getPointCloudTSne(distanceMatrix){
        this.pointCloud = []
        let opt = {}
        opt.epsilon = 10;
        opt.perplexity = 10;
        opt.dim = 2;
        let tsne = new tsnejs.tSNE(opt);
        tsne.initDataDist(distanceMatrix);
        for (let k = 0 ; k < 500 ; k++){
            tsne.step();
        }
        let embedding = tsne.getSolution();
        embedding.forEach(coord => {
            this.pointCloud.push(new Point(coord[0], coord[1]))
        })
        console.log("PointCloud", this.pointCloud)
        this.pointCloud = this.normalizePoints();
        console.log("Normalized PointCloud: ", this.pointCloud)
        return this.pointCloud
    }

    getPointCloud(distanceMatrix){
        this.pointCloud = []
        let startPoint = this.getRandomPoint()
        this.pointCloud.push(startPoint)
        for (let distIndex = 1 ; distIndex < distanceMatrix.length ; distIndex++){
            let distanceToOtherPoints = distanceMatrix[distIndex].slice(0, distIndex)
            this.addPoint(distanceToOtherPoints)
        }
        this.pointCloud = this.normalizePoints();
        return this.pointCloud
    }

    normalizePoints(){
        let maxX = -1000000;
        let maxY = -1000000;
        let minX = 1000000;
        let minY = 1000000;
        this.pointCloud.forEach(point => {
            if (point.getX() > maxX){
                maxX = point.getX()
            }
            if (point.getY() > maxY){
                maxY = point.getY()
            }
            if (point.getX() < minX){
                minX = point.getX()
            }
            if (point.getY() < minY){
                minY = point.getY();
            }
        });
        console.log("minmaxies: ", maxX, maxY, minX, minY)
        let normalizedPoints = []
        this.pointCloud.forEach(point => {
            let normPoint = new Point(point.getX(), point.getY())
            normPoint.normalizeX(minX, maxX - minX, this.maxX);
            normPoint.normalizeY(minY, maxY - minY, this.maxY);
            normalizedPoints.push(normPoint)
        })
        return normalizedPoints
    }

    addPoint(distanceToOtherPoints){
        let point = this.getRandomPoint();
        for (let iter = 0 ; iter < this.numIterations ; iter++){
            for (let distIndex = 0 ; distIndex < distanceToOtherPoints.length ; distIndex++){
                let desiredDistance = distanceToOtherPoints[distIndex];
                let currentDistance = point.getEuclideanDistanceTo(this.pointCloud[distIndex])
                if (currentDistance > desiredDistance){
                    point.moveCloserTo(this.pointCloud[distIndex], this.maxX, this.maxY)
                } else if (currentDistance < desiredDistance){
                    point.moveAwayFrom(this.pointCloud[distIndex], this.maxX, this.maxY)
                } else {
                    // don't move the point
                }
            }
        }
        this.pointCloud.push(point);
    }

    getRandomPoint(){
        return new Point(Math.random() * this.maxX, Math.random() * this.maxY)
    }

}

export default DataProcController;