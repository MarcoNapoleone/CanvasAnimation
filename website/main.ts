import {Point} from "../src/Point";
import CubicBezier from "../src/CubicBezier";

let canvas = document.querySelector<HTMLCanvasElement>("#cartesian-plane");
let context = canvas.getContext("2d");


const grip1 = document.getElementById("v1");
const grip2 = document.getElementById("v2");

let curve = new CubicBezier(.7, .3, .3, .7);
const canvasLength = Math.min(canvas.height, canvas.width);

requestAnimationFrame(() => drawCurve(curve.v1.times(canvasLength), curve.v2.times(canvasLength)));

function drawCurve(point1: Point, point2: Point) {

    context.clearRect(0, 0, canvas.width, canvas.height);

    const p0 = new Point(0, canvas.height);
    const p3 = new Point(canvas.width, 0);
    drawLine(p0, p3, [2, 2]);
    drawLine(p0, new Point(point1.x, canvas.height - point1.y), [2, 2]);
    drawLine(p3,new Point(point2.x, canvas.height - point2.y), [2, 2]);

    context.beginPath();
    context.moveTo(0, canvas.height);
    context.bezierCurveTo(point1.x, canvasLength - point1.y, point2.x, canvasLength - point2.y, canvas.width, 0);
    context.strokeStyle = "#1d3557";
    context.lineWidth = 6;
    context.stroke();
    context.closePath();
    requestAnimationFrame(() => drawCurve(curve.v1.times(canvasLength), curve.v2.times(canvasLength)));
}

dragElement(grip1);
dragElement(grip2);

function dragElement(element: HTMLElement) {

    let moveX = 0, moveY = 0, posX = 0, posY = 0;
    element.onmousedown = dragMouseDown;

    function dragMouseDown(ev: MouseEvent) {

        ev.preventDefault();

        // get the mouse cursor position at startup:
        posX = ev.clientX;
        posY = ev.clientY;
        document.onmouseup = closeDragElement;
        // call a function whenever the cursor moves:
        document.onmousemove = elementDrag;
    }

    function elementDrag(ev: MouseEvent) {

        ev.preventDefault();
        // calculate the new cursor position:
        moveX = posX - ev.clientX;
        moveY = posY - ev.clientY;
        posX = ev.clientX;
        posY = ev.clientY;
        // set the element's new position:
        element.style.top = (element.offsetTop - moveY) + "px";
        element.style.left = (element.offsetLeft - moveX) + "px";

        curve = new CubicBezier(grip1.offsetLeft / canvas.width,
            (canvas.height - grip1.offsetTop) / canvas.height,
            grip2.offsetLeft / canvas.width,
            (canvas.height - grip2.offsetTop) / canvas.height
        );
    }

    function closeDragElement() {

        /* stop moving when mouse button is released:*/
        document.onmouseup = null;
        document.onmousemove = null;
    }
}

function drawLine(p1: Point, p2: Point, dash?: [number, number]) {

    context.beginPath();
    context.setLineDash(dash);
    context.moveTo(p1.x, p1.y);
    context.lineTo(p2.x, p2.y);
    context.strokeStyle = "#457B9DEB";
    context.lineWidth = 2;
    context.stroke();
    context.closePath();
    context.setLineDash([]);
}



