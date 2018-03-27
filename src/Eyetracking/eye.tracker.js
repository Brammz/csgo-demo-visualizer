export default class EyeTracker {

    constructor(setPrediction) {
        this.setPrediction = setPrediction;
        this.init = this.init.bind(this);
        this.update = this.update.bind(this);
    }

    init() {
        window.webgazer.setRegression('ridge').setTracker('clmtrackr').begin();
        setInterval(this.update, 100);
    }

    update() {
        let prediction = window.webgazer.getCurrentPrediction();
        if (prediction) {
            let {x, y} = prediction;
            this.setPrediction(x, y);
        }
    }

}
