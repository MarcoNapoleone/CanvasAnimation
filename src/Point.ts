class Point {

    x: number = 0;
    y: number = 0;

    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }

    sum(...points: Point[]) {
        return points.reduce((acc, v1) => {
                return new Point(acc.x + v1.x, acc.y + v1.y);
            }, this
        )
    }

    times(scalar: number) {
        return new Point(this.x * scalar, this.y * scalar)
    }

    dot(v1: Point) {
        return this.x * v1.x + this.y * v1.y;
    }


}

export {Point};