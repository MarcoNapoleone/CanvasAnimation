import {Point} from "./Point";


class CubicBezier {

    v0 = new Point(0, 0);
    v1 = new Point(0.2, 0);
    v2 = new Point(0.8, 1);
    v3 = new Point(1, 1);

    constructor(v1_x: number, v1_y: number, v2_x: number, v2_y: number) {
        this.v1.x = v1_x;
        this.v1.y = v1_y;
        this.v2.x = v2_x;
        this.v2.y = v2_y;
    }

    /**
     * return the vector over the curve at time t
     * @param t must be between 0 and 1
     */
    compute(t: number) {

        if (t < 0)
            return new Point(0, 0);
        else if (t > 1)
            return new Point(1, 1);
        else {
            // (1-u)^(3)a + 3(1-u)^(2)u*b + 3(1-u)u^(2)c + u^(3)d, 0 <= u <= 1
            return this.v0.times((1 - t) ** 3)
                .sum(this.v1.times(3 * (1 - t) ** 2 * t))
                .sum(this.v2.times(3 * (1 - t) * t ** 2))
                .sum(this.v3.times(t ** 3));
        }
    }
}


export default CubicBezier;