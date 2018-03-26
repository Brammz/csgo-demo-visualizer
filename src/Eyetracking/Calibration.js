import React, {Component} from 'react';
import './style.css';
import './bootstrap.css';
import $ from 'jquery';
import swal from 'sweetalert';
import {sleep} from './utility.js';
import EyeTracker from './eye.tracker';
import image from './webgazer.png';

let pointCalibrate = 0;
let calibrationPoints = {};
let xPast50 = new Array(50);
let yPast50 = new Array(50);

class Calibration extends Component {

    constructor(props) {
        super(props);
        this.setup = this.setup.bind(this);
        this.checkIfReady = this.checkIfReady.bind(this);
        this.restart = this.restart.bind(this);
        this.clearCalibration = this.clearCalibration.bind(this);
        this.popUpInstruction = this.popUpInstruction.bind(this);
        this.clearCanvas = this.clearCanvas.bind(this);
        this.showCalibrationPoint = this.showCalibrationPoint.bind(this);
        this.startMeasurement = this.startMeasurement.bind(this);
        this.afterMeasurement = this.afterMeasurement.bind(this);
        this.calculateAverage = this.calculateAverage.bind(this);
        this.calculatePrecision = this.calculatePrecision.bind(this);
        this.calculatePrecisionPercentages = this.calculatePrecisionPercentages.bind(this);
        this.store_points = this.store_points.bind(this);
        this.get_points = this.get_points.bind(this);
        this.done = this.done.bind(this);
        this.startCalibration = this.startCalibration.bind(this);
        this.startStoringAndDrawing = this.startStoringAndDrawing.bind(this);
        this.stopStoringAndDrawing = this.stopStoringAndDrawing.bind(this);
        this.storeAndDrawPoint = this.storeAndDrawPoint.bind(this);
        this.drawPoint = this.drawPoint.bind(this);
        this.state = {
            setup: false
        };
        this.storingAndDrawing = false;
        this.k = 0;
    }

    startCalibration() {
        this.eyeTracker = new EyeTracker(this.props.setEyeTrackingPredictionMethod);
        this.eyeTracker.init();
        $('.helpBtn').hide();
    }

    componentDidMount() {

        setTimeout(this.checkIfReady,100);

        this.clearCanvas();
        let calibrationThis = this;
        $(".Calibration").click((clicked) => { // click event on the calibration buttons
            let clickedElement = clicked.currentTarget;
            let id = $(clickedElement).attr('id');

            if (!calibrationPoints[id]){ // initialises if not done
                calibrationPoints[id] = 0;
            }
            calibrationPoints[id]++; // increments values

            if (calibrationPoints[id] === 5){ //only turn to yellow after 5 clicks
                $(clickedElement).css('background-color','yellow');
                $(clickedElement).prop('disabled', true); //disables the button
                pointCalibrate++;
            }else if (calibrationPoints[id] < 5){
                //Gradually increase the opacity of calibration points when click to give some indication to user.
                let opacity = 0.2 * calibrationPoints[id] + 0.2;
                $(clickedElement).css('opacity',opacity);
            }

            //Show the middle calibration point after all other points have been clicked.
            if (pointCalibrate === 8){
                $("#Pt5").show();
            }

            if (pointCalibrate >= 9){ // last point is calibrated
                //using jquery to grab every element in Calibration class and hide them except the middle point.
                $(".Calibration").hide();
                $("#Pt5").show();

                // clears the canvas
                let canvas = document.getElementById("plotting_canvas");
                canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height);

                // notification for the measurement process
                swal({
                    title: "Calculating measurement",
                    text: "Please don't move your mouse & stare at the middle dot for the next 5 seconds. This will allow us to calculate the accuracy of our predictions.",
                    closeOnEsc: false,
                    allowOutsideClick: false,
                    closeModal: true
                }).then( isConfirm => {
                    // makes the variables true for 5 seconds & plots the points
                    $(document).ready(calibrationThis.startMeasurement);
                });
            }
        });
    }

    componentWillReceiveProps(nextProps) {
        let {
            x,
            y
        } = this.props;
        if (this.storingAndDrawing && this.k < 50 && (x !== nextProps.x || y !== nextProps.y)) {
            this.storeAndDrawPoint(nextProps.x, nextProps.y, this.k);
            this.k++;
        }
    }

    storeAndDrawPoint(x, y, k) {
        this.store_points(x, y, k);
        this.drawPoint(x, y);
    }

    drawPoint(x, y) {
        let ctx = document.getElementById("plotting_canvas").getContext('2d');
        ctx.fillStyle = 'blue';
        ctx.beginPath();
        ctx.arc(x, y, 5, 0, Math.PI * 2, true);
        ctx.fill();
    }

    startMeasurement() {
        this.startStoringAndDrawing(); // start storing and drawing the prediction points
        sleep(5000).then(() => {
            this.stopStoringAndDrawing(); // stop storing and drawing the prediction points
            let past50 = this.get_points(); // retrieve the stored points
            let precision_measurement = this.calculatePrecision(past50);
            let accuracyLabel = "<a>Accuracy | "+precision_measurement+"%</a>";
            document.getElementById("Accuracy").innerHTML = accuracyLabel; // Show the accuracy in the nav bar.
            swal({
                title: "Your accuracy measure is " + precision_measurement + "%",
                allowOutsideClick: false,
                buttons: {
                    cancel: "Recalibrate",
                    confirm: true,
                }
            }).then(this.afterMeasurement);
        });
    }

    afterMeasurement(isConfirm) {
        if (isConfirm){
            //clear the calibration & hide the last middle button
            this.clearCanvas();
        } else {
            //use restart function to restart the calibration
            this.clearCalibration();
            this.clearCanvas();
            this.showCalibrationPoint();
        }
    }

    checkIfReady() {
        if (window.webgazer.isReady())
            this.setup();
        else
            setTimeout(this.checkIfReady, 100);
    }

    setup() {
        this.setState({setup: true});

        //Set up video variable to store the camera feedback
        let video = document.getElementById('webgazerVideoFeed');

        //Position the camera feedback to the top left corner.
        video.style.display = 'block';
        video.style.position = 'fixed';
        video.style.top = '0px';
        video.style.left = '0px';

        //Set up the video feedback box size
        video.width = 320;
        video.height = 240;
        video.style.margin = '0px';
        video.style.background = '#222222';
        window.webgazer.params.imgWidth = 320;
        window.webgazer.params.imgHeight = 240;

        //Set up the main canvas. The main canvas is used to calibrate the webgazer.
        let overlay = document.createElement('canvas');
        overlay.id = 'overlay';

        //Setup the size of canvas
        overlay.style.position = 'fixed';
        overlay.width = 320;
        overlay.height = 240;
        overlay.style.top = '0px';
        overlay.style.left = '0px';
        overlay.style.margin = '0px';

        //Draw the face overlay on the camera video feedback
        let faceOverlay = document.createElement('face_overlay');
        faceOverlay.id = 'faceOverlay';
        faceOverlay.style.position = 'fixed';
        faceOverlay.style.top = '59px';
        faceOverlay.style.left = '107px';
        faceOverlay.style.border = 'solid';

        document.body.appendChild(overlay);
        document.body.appendChild(faceOverlay);

        let cl = window.webgazer.getTracker().clm;

        // This function draw the face of the user frame.
        function drawLoop() {
            window.requestAnimFrame(drawLoop);
            overlay.getContext('2d').clearRect(0,0,320,240);
            if (cl.getCurrentPosition()) {
                cl.draw(overlay);
            }
        }
        drawLoop();
    }

    restart() {
        document.getElementById("Accuracy").innerHTML = '<a>Not yet Calibrated</a>';
        this.clearCalibration();
        this.popUpInstruction();
    }

    clearCalibration() {
        window.localStorage.clear();
        $(".Calibration").css('background-color','red');
        $(".Calibration").css('opacity',0.2);
        $(".Calibration").prop('disabled',false);

        calibrationPoints = {};
        pointCalibrate = 0;
    }

    popUpInstruction() {
        this.clearCanvas();
        swal({
            title:"Calibration",
            text: "Please click on each of the 9 points on the screen. You must click on each point 5 times till it goes yellow. This will calibrate your eye movements.",
            buttons:{
                cancel: false,
                confirm: true
            }
        }).then(isConfirm => {
            this.showCalibrationPoint();
        });
    }

    clearCanvas() {
        $(".Calibration").hide();
        let canvas = document.getElementById("plotting_canvas");
        canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height);
    }

    showCalibrationPoint() {
        $(".Calibration").show();
        $("#Pt5").hide(); // initially hides the middle button
    }

    calculatePrecision(past50Array) {
        let windowHeight = $(window).height();
        let windowWidth = $(window).width();

        // Retrieve the last 50 gaze prediction points
        let x50 = past50Array[0];
        let y50 = past50Array[1];

        // Calculate the position of the point the user is staring at
        let staringPointX = windowWidth / 2;
        let staringPointY = windowHeight / 2;

        let precisionPercentages = new Array(50);
        this.calculatePrecisionPercentages(precisionPercentages, windowHeight, x50, y50, staringPointX, staringPointY);
        let precision = this.calculateAverage(precisionPercentages);

        // Return the precision measurement as a rounded percentage
        return Math.round(precision);
    };

    calculatePrecisionPercentages(precisionPercentages, windowHeight, x50, y50, staringPointX, staringPointY) {
        for (let x = 0; x < 50; x++) {
            // Calculate distance between each prediction and staring point
            let xDiff = staringPointX - x50[x];
            let yDiff = staringPointY - y50[x];
            let distance = Math.sqrt((xDiff * xDiff) + (yDiff * yDiff));

            // Calculate precision percentage
            let halfWindowHeight = windowHeight / 2;
            let precision = 0;
            if (distance <= halfWindowHeight && distance > -1) {
                precision = 100 - (distance / halfWindowHeight * 100);
            } else if (distance > halfWindowHeight) {
                precision = 0;
            } else if (distance > -1) {
                precision = 100;
            }

            // Store the precision
            precisionPercentages[x] = precision;
        }
    }

    calculateAverage(precisionPercentages) {
        let precision = 0;
        for (let x = 0; x < 50; x++) {
            precision += precisionPercentages[x];
        }
        precision = precision / 50;
        return precision;
    }

    startStoringAndDrawing(){
        this.storingAndDrawing = true;
    }

    stopStoringAndDrawing(){
        this.storingAndDrawing = false;
        this.k = 0;
    }

    store_points(x, y, k) {
        xPast50[k] = x;
        yPast50[k] = y;
    }

    get_points() {
        let past50 = new Array(2);
        past50[0] = xPast50;
        past50[1] = yPast50;
        return past50;
    }

    done() {
        $("#webgazerVideoFeed").hide();
        $("#overlay").hide();
        $("#faceOverlay").hide();
        this.props.stopCalibratingMethod();
    }

    render() {
        return (
            <div
                key={'calibrationContainer'}
            >
                <canvas
                    key={'plotting_canvas'}
                    id={'plotting_canvas'}
                    width={window.innerWidth}
                    height={window.innerHeight}
                    style={{
                        cursor: 'crosshair',
                        position: this.state.setup ? 'fixed' : null
                    }}
                />
                <nav
                    key={'webgazerNavbar'}
                    id={'webgazerNavbar'}
                    className={'navbar navbar-default navbar-fixed-top'}
                >
                    <div className={'container-fluid'}>
                        <div
                            key={'navbarHeader'}
                            className={'navbar-header'}
                        >
                            <button
                                type={'button'}
                                className={'navbar-toggle'}
                                data-toggle={'collapse'}
                                data-target={'#myNavbar'}
                            >
                                <span key={'span1'} className={'icon-bar'}/>
                                <span key={'span2'} className={'icon-bar'}/>
                                <span key={'span3'} className={'icon-bar'}/>
                            </button>
                        </div>
                        <div
                            key={'collapseNavbar'}
                            className={'collapse navbar-collapse'}
                            id={'myNavbar'}
                        >
                            <ul
                                key={'ul1'}
                                className={'nav navbar-nav'}
                            >
                                <li
                                    key={'accuracy'}
                                    id="Accuracy"
                                >
                                    <a>
                                        Not yet Calibrated
                                    </a>
                                </li>
                                <li
                                    key={'restart'}
                                    onClick={this.restart}
                                >
                                    <a href="#">
                                        Recalibrate
                                    </a>
                                </li>
                                <li
                                    key={'done'}
                                    onClick={this.done}
                                >
                                    <a href="#">
                                        Done
                                    </a>
                                </li>
                            </ul>
                            <ul
                                key={'ul2'}
                                className={'nav navbar-nav navbar-right'}
                            >
                                <li>
                                    <button
                                        className={'helpBtn'}
                                        data-toggle={'modal'}
                                        data-target={'#helpModal'}
                                        onClick={this.startCalibration}
                                    >
                                        <a
                                            href={'#'}
                                            data-toggle={'modal'}
                                            data-targert={'#'}
                                        >
                                            Start
                                        </a>
                                    </button>
                                </li>
                            </ul>
                        </div>
                    </div>
                </nav>
                <div
                    key={'calibrationDiv'}
                    className={'calibrationDiv'}
                >
                    <input type={'button'} key={'Pt1'} id={'Pt1'} className={'Calibration'}/>
                    <input type={'button'} key={'Pt2'} id={'Pt2'} className={'Calibration'}/>
                    <input type={'button'} key={'Pt3'} id={'Pt3'} className={'Calibration'}/>
                    <input type={'button'} key={'Pt4'} id={'Pt4'} className={'Calibration'}/>
                    <input type={'button'} key={'Pt5'} id={'Pt5'} className={'Calibration'}/>
                    <input type={'button'} key={'Pt6'} id={'Pt6'} className={'Calibration'}/>
                    <input type={'button'} key={'Pt7'} id={'Pt7'} className={'Calibration'}/>
                    <input type={'button'} key={'Pt8'} id={'Pt8'} className={'Calibration'}/>
                    <input type={'button'} key={'Pt9'} id={'Pt9'} className={'Calibration'}/>
                </div>
                <div
                    key={'helpModal'}
                    id={'helpModal'}
                    className={'modal fade'}
                    role={'dialog'}
                >
                    <div className={'modal-dialog'}>
                        <div className={'modal-content'}>
                            <div
                                key={'modalBody'}
                                className={'modal-body'}
                            >
                                <img src={image} width={'100%'} height={'100%'} alt={'webgazer demo instructions'}/>
                            </div>
                            <div
                                key={'modalFooter'}
                                className={'modal-footer'}
                            >
                                <button
                                    key={'closeBtn'}
                                    id={'closeBtn'}
                                    type={'button'}
                                    className={'btn btn-default'}
                                    data-dismiss={'modal'}
                                >
                                    Close
                                </button>
                                <button
                                    key={'restartBtn'}
                                    type={'button'}
                                    className={'btn btn-primary'}
                                    data-dismiss={'modal'}
                                    onClick={this.restart}
                                >
                                    Calibrate
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Calibration;
