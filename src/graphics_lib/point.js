class Point{
    x = 0;
    y = 0;

    constructor(x, y){
        this.x = x;
        this.y = y;
    }

    getEuclideanDistanceTo(point){
        return Math.sqrt((this.x - point.x)**2 + (this.y - point.y)**2);
    }

    normalizeX(normOffset, normDivider, normMultiplier){
        this.x = (this.x-normOffset)/normDivider * normMultiplier;
    }

    normalizeY(normOffset, normDivider, normMultiplier){
        this.y = (this.y-normOffset)/normDivider * normMultiplier;
    }

    moveCloserTo(otherPoint, maxX=1000000, maxY=1000000){
        let [deltaX, deltaY] = this.calculateUnitMovement(otherPoint)
        this.x += deltaX
        this.y += deltaY
        if (this.x > maxX){
            this.x = maxX
        }
        if (this.y > maxY){
            this.y = maxY
        }
    }

    moveAwayFrom(otherPoint, maxX=1000000, maxY=1000000){
        let [deltaX, deltaY] = this.calculateUnitMovement(otherPoint)
        this.x -= deltaX
        this.y -= deltaY
        if (this.x > maxX){
            this.x = maxX
        }
        if (this.y > maxY){
            this.y = maxY
        }
    }

    calculateUnitMovement(otherPoint){
        let tangent = this.calculateTangent(otherPoint);
        let deltaX = Math.sqrt(1/(1+tangent*tangent))
        let deltaY = tangent*deltaX
        return [deltaX, deltaY]
    }
    calculateTangent(otherPoint){
        return (otherPoint.getY() - this.getY())/(otherPoint.getX() - this.getX())
    }
    /**
     * @brief draws the point using a specific context
     * @param {*} ctx 2D canvas drawing context
     * @param {*} diameter diameter of the point to draw
     */
    draw(ctx, diameter=5, offset=0){
        ctx.beginPath();
        ctx.arc(this.x + offset, this.y + offset, diameter, 0, 360);
        ctx.closePath();
        ctx.stroke();
        ctx.fill();
    }

    getX(){
        return this.x;
    }

    setX(x){
        this.x = x;
    }

    getY(){
        return this.y;
    }

    setY(y){
        this.y = y;
    }
}

export default Point;
