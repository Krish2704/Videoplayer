window.addEventListener('load',function(){
	video = document.getElementById('video');
	video.load();
	playButton = document.getElementById('playButton');
	soundButton = document.getElementById('soundButton');
	progressBar = document.getElementById('progressbar');
	progress = document.getElementById('progress');
	timeBar = document.getElementById('timeBar');
	soundBar = document.getElementById('soundBar');
	sound = document.getElementById('sound');
	fullScreen = document.getElementById('fullScreen');
	screenButton = document.getElementById('screenButton');
	pauseScreen = document.getElementById('screen');
	var flag=0;
	video.addEventListener('canplay',function(){
		/*video.addEventListener('click',function(){
			if(flag==0)
			{
				video.pause();
				flag=1;
			}
			else{
				video.play();
				flag=0;
			}
		},false);*/
		updatePlayer();
		playButton.addEventListener('click',function(){
			if(video.paused)
			{
					video.play();
					playButton.src="images/pause.png";
					update = setInterval(updatePlayer,30);
					pauseScreen.style.display = 'none';
			}
			else
			{
				video.pause();
				playButton.src="images/play.png";
				window.clearInterval(update);
				pauseScreen.style.display = 'block';
			}
		},false);
		progress.addEventListener('click',function(){
			//to calculate the width based on the mouselocation.
			var mousePosition = event.pageX - progress.offsetLeft;
			var width = window.getComputedStyle(progress).getPropertyValue('width');
			width = parseFloat(width.substr(0 , width.length - 2));
			video.currentTime = (mousePosition/width)*video.duration;
			updatePlayer();
		},false);
		soundButton.addEventListener('click',function(){
			if(!video.muted)
				{
					video.muted = true;
					soundButton.src = "images/mute.png";
					sound.style.display = 'none';
				}
			else
				{
					video.muted = false;
					soundButton.src = "images/sound.png";
					sound.style.display = 'block';
				}
		},false);
		soundBar.addEventListener('click',function(){
			var mousePosition = event.pageX - soundBar.offsetLeft;
			var width = window.getComputedStyle(soundBar).getPropertyValue('width');
			width = parseFloat(width.substr(0 , width.length - 2));
			video.volume = (mousePosition/width);
			sound.style.width = video.volume * 100 + '%';
			video.muted = false;
			soundButton.src = "images/sound.png";
			sound.style.display = 'block';
		},false);
		fullScreen.addEventListener('click',function(){
			if(video.requestFullScreen)
				video.requestFullScreen();
			else if(video.webkitRequestFullScreen)
				video.webkitRequestFullScreen();
			else if(video.mozRequestFullScreen)
				video.mozRequestFullScreen();
			else if(video.msRequestFullScreen)
				video.msRequestFullScreen();
		},false);
		// this function for screenbutton is same as playbutton. Update it later.
		screenButton.addEventListener('click',function(){
			if(video.paused)
			{
					video.play();
					playButton.src="images/pause.png";
					update = setInterval(updatePlayer,30);
					pauseScreen.style.display = 'none';
					screenButton.src = "images/play.png";	
			}
			else
			{
				video.pause();
				playButton.src="images/play.png";
				window.clearInterval(update);
				pauseScreen.style.display = 'block';
				screenButton.src = "images/play.png";
			}
		},false);
	},false);
},false);

function updatePlayer(){
	var percentage = (video.currentTime/video.duration)*100;
	progressBar.style.width = percentage + '%';
	timeBar.innerHTML = getUpdatedTime();
	if(video.ended)
	{
		playButton.src="images/replay.png";
		window.clearInterval(update);
		pauseScreen.style.display = 'block';
		screenButton.src = "images/replay.png";
	}
	else if(video.paused)
	{
		playButton.src = "images/play.png";
		screenButton.src = "images/play.png";
	}
}

function getUpdatedTime(){
	var seconds = Math.round(video.currentTime);
	var minutes = Math.floor(seconds/60);
	var totalSeconds = Math.round(video.duration);
	var totalMinutes = Math.floor(totalSeconds/60);
	if(minutes>0)
	seconds-=minutes*60;
	if(totalMinutes>0)
	totalSeconds-=totalMinutes*60;
	if(seconds.toString().length===1)
		seconds= '0' + seconds;
	if(minutes.toString().length===1)
		minutes = '0' + minutes;
	return minutes + ':' + seconds + '/' + totalMinutes + ':' +totalSeconds;
}