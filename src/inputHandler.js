/**
 * Created by Jia on 2017/9/23.
 */
class InputHandler {

    constructor(move) {
        this.move = move;
        this.handleKeyDown = this.handleKeyDown.bind(this);
    }

    registerListeners() {
        window.addEventListener("keyup", this.handleKeyDown)
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

    removeListeners() {
        window.removeEventListener("keydown", this.handleKeyDown);
    }
}

export default InputHandler;