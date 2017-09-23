/**
 * Created by Jia on 2017/9/23.
 */
class InputHandler {

    constructor(move) {
        this.move = move;
        this.handleKeyUp = this.handleKeyUp.bind(this);
        this.swipeDetector = new SwipeDetector(this.move);
    }

    registerListeners() {
        window.addEventListener("keyup", this.handleKeyUp)
        window.addEventListener('touchstart', this.swipeDetector.touchStartListener, false);
        window.addEventListener('touchend', this.swipeDetector.touchEndListener, false);
    }

    removeListeners() {
        window.removeEventListener("keyup", this.handleKeyUp);
        window.removeEventListener('touchstart', this.swipeDetector.touchStartListener, false);
        window.removeEventListener('touchend', this.swipeDetector.touchEndListener, false);
    }

    handleKeyUp(event) {
        switch (event.key) {
            case "ArrowLeft": {
                this.move(0); break;
            }
            case "ArrowUp": {
                this.move(1); break;
            }
            case "ArrowRight": {
                this.move(2); break;
            }
            case "ArrowDown": {
                this.move(3); break;
            }
            default: {
                break;
            }
        }
    }

}

class SwipeDetector {
    constructor(move) {
        this.move = move;
        this.startX = 0;
        this.startY = 0;
        this.threshold = 100; //required min distance traveled to be considered swipe
        this.restraint = 300; // maximum distance allowed at the same time in perpendicular direction
        this.allowedTime = 300; // maximum time allowed to travel that distance
        this.startTime = 0;
        this.touchStartListener = this.touchStartListener.bind(this);
        this.touchEndListener = this.touchEndListener.bind(this);
    }

    touchStartListener(e) {
        let touchobj = e.changedTouches[0];
        this.startX = touchobj.pageX;
        this.startY = touchobj.pageY;
        this.startTime = new Date().getTime(); // record time when finger first makes contact with surface
    }

    touchEndListener(e) {
        let touchobj = e.changedTouches[0];
        let distX = touchobj.pageX - this.startX; // get horizontal dist traveled by finger while in contact with surface
        let distY = touchobj.pageY - this.startY; // get vertical dist traveled by finger while in contact with surface
        let elapsedTime = new Date().getTime() - this.startTime; // get time elapsed
        if (elapsedTime <= this.allowedTime){ // first condition for a swipe met
            if (Math.abs(distX) >= this.threshold && Math.abs(distY) <= this.restraint){ // 2nd condition for horizontal swipe met
                distX < 0 ? this.move(0) : this.move(2); // if dist traveled is negative, it indicates left swipe
            }
            else if (Math.abs(distY) >= this.threshold && Math.abs(distX) <= this.restraint){ // 2nd condition for vertical swipe met
                distY < 0 ? this.move(1) : this.move(3); // if dist traveled is negative, it indicates up swipe
            }
        }
    }

}

export default InputHandler;