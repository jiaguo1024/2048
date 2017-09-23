/**
 * Created by Jia on 2017/9/23.
 */

import Hammer from "hammerjs";

class InputHandler {

    constructor(move) {
        this.move = move;
        this.handleKeyDown = this.handleKeyDown.bind(this);
        this.handleSwipe = this.handleSwipe.bind(this);
        this.hammer = new Hammer(document);
        this.hammer.get('swipe').set({ direction: Hammer.DIRECTION_VERTICAL });
    }

    registerListeners() {
        window.addEventListener("keyup", this.handleKeyDown)
        this.hammer.on('swipeleft swiperight swipeup swipedown', this.handleSwipe);
    }

    removeListeners() {
        window.removeEventListener("keydown", this.handleKeyDown);
        this.hammer.off('swipeleft swiperight swipeup swipedown', this.handleSwipe)
    }

    handleKeyDown(event) {
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

    handleSwipe(event) {
        switch (event.type) {
            case "swipeleft": {
                this.move(0); break;
            }
            case "swipeup": {
                this.move(1); break;
            }
            case "swiperight": {
                this.move(2); break;
            }
            case "swipedown": {
                this.move(3); break;
            }
            default: {
                break;
            }
        }
    }
}

export default InputHandler;