class canvasAnimation{
	constructor(containerId) {

		this.container;
		this.canvas;
		this.ctx;

		this.w;
		this.h;

		//used to stop the animation
		this.animationId;

		//time managment variables
		this.lastTime;
		this.deltaTime;
		this.progress;

		window.onload = () => {

			// find the container
			this.container = document.getElementById(containerId);
			
			// if it doesn't exist, create one and append to body
			if(this.container == undefined) {
				this.container = document.createElement("div");
				this.container.id = containerId;
				document.body.appendChild(this.container);
			}

			//create the canvas element and append to container 
			this.canvas = document.createElement("canvas");
			this.container.appendChild(this.canvas);

			this.ctx = this.canvas.getContext("2d");

			this.start();
		}
	}

	//loop function 
	run( timestamp ) {

		//if the last frame time is not set, set it
		if(this.lastTime == undefined){
			this.lastTime = timestamp;
		}

		//update time variables
		this.deltaTime = timestamp - this.lastTime;
		this.progress += this.deltaTime;
		this.lastTime = timestamp;

		//functions to override
		this.update();
		this.render();

		//loop if the animation ID is not undefined
		if(this.animationId != undefined){
			this.animationId = window.requestAnimationFrame(this.run.bind(this));
		}
	}

	//start the animation
	start(){
		this.progress = 0;

		this.setup();

		//we bind the this keyword to the run method so we can call the obj
		this.animationId = window.requestAnimationFrame(this.run.bind(this));
	}

	//stop the animation
	stop(){
		if(this.animationId != undefined){
			window.cancelAnimationFrame( this.animationId );
			//reset last time so if the animation is resumed the delta time
			//does not consider the time it was paused
			this.lastTime = undefined;
			this.animationId = undefined;
		}
	}

	//resume the animation
	resume(){
		if(this.animationId == undefined){
			this.animationId = window.requestAnimationFrame(this.run.bind(this));
		}
	}

	//restart the animation
	restart() {
		this.stop();
		this.start();
	}

	///////////////////////////////////////////////////////////////

	setWindowSize(){
		this.canvas.width = this.w = window.innerWidth;
		this.canvas.height = this.h = window.innerHeight;

		this.container.style.position = "absolute";
		this.container.style.top = 0;
		this.container.style.left = 0;

		this.container.parentElement.style.overflow = "hidden";
	}

	setSize(width, height) {

		//set dimensions
		this.canvas.width = this.w = width;
		this.canvas.height = this.h = height;

		//this.container.style.width = width;
		//this.container.style.height = height;
	}

	centerCanvas(){
		this.container.style.position = "absolute";
		this.container.style.top = "50%";
		this.container.style.left = "50%";
		this.container.style.transform = "translate(-50%, -50%)";
	}
};