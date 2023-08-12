console.log('script.js LOADED');

window.addEventListener('load', function(e) {
	console.log('page LOADED');
	
	init();
});

function init() {
	console.log('in init()');
	loadGuitars();
}

function loadGuitars() {
	let xhr = new XMLHttpRequest();
	xhr.open('GET', 'api/guitars');
	xhr.onreadystatechange = function() {
		if (xhr.readyState === 4 && xhr.status === 200) {
			// do stuff
			let guitars = JSON.parse(xhr.responseText);
			console.log(guitars);
			displayGuitars(guitars);
		} else {
			// display error on page
		}
	};
	
	xhr.send();
}

function displayGuitars(guitars) {
	if (guitars && Array.isArray(guitars)) {
		let ultimateGcon = document.getElementById('guitars-container');
		for (let g of guitars) {
			// make guitar-container div
			let gcon = document.createElement('div');
			gcon.className = 'guitar-container';
			
			// make image div
			let gimgdiv = document.createElement('div');
			gimgdiv.className = 'image';
			// make img element
			let gimg = document.createElement('img');
			gimg.src = 'images/' + g.imageUrl;
			
			// make guitar-text div
			let gtxt = document.createElement('div');
			gtxt.className = 'text';
			let gh1 = document.createElement('h1');
			gh1.textContent = g.make + ' ' + g.model;
			gtxt.appendChild(gh1);
			
			
			// make li for year
			let yearH2 = document.createElement('h2');
			yearH2.textContent = g.year;
			gtxt.appendChild(yearH2);
			// make li for color
			let colorH2 = document.createElement('h2'); // FIXME addEventListener searchByColor
			colorH2.textContent = g.color;
			gtxt.appendChild(colorH2);
			// make li for scale length
			let scaleH2 = document.createElement('h2');
			scaleH2.textContent = g.scaleLength + '" scale length';
			gtxt.appendChild(scaleH2);
			// make li for frets
			let fretsH2 = document.createElement('h2');
			fretsH2.textContent = g.numberOfFrets + ' frets';
			gtxt.appendChild(fretsH2);
			// make li for hasCase
			let caseH2 = document.createElement('h2');
			caseH2.textContent = g.hasCase === true ? 'Has a case' : 'Does not have case';
			gtxt.appendChild(caseH2);
			// make li for bridge
			let bridgeH2 = document.createElement('h2');
			bridgeH2.textContent = g.bridge + ' bridge';
			gtxt.appendChild(bridgeH2);
			// make li for tuning
			let tuningH2 = document.createElement('h2');
			tuningH2.textContent = 'Currently tuned to ' + g.tuning.name;
			gtxt.appendChild(tuningH2);
			// make h2 for setup
			let setupH2 = document.createElement('h2'); // FIXME addEventListener displaySetupById
			setupH2.textContent = 'Last setup: ' + g.setup;
			gtxt.appendChild(setupH2);
			
			
			
			// make icons div
			let gIcons = document.createElement('div');
			gIcons.className = 'icons';
			
			let gEdit = document.createElement('img');
			gEdit.src = 'images/edit.png';
			gIcons.appendChild(gEdit);
			let gRem = document.createElement('img');
			gRem.src = 'images/delete.png';
			gIcons.appendChild(gRem);
			
			
			
			gimgdiv.appendChild(gimg);  // attach img element to image div
			gcon.appendChild(gimgdiv);  // attach image div to guitar-container
			gcon.appendChild(gtxt);    // attach text to guitar-container
			gcon.appendChild(gIcons);
			ultimateGcon.appendChild(gcon); // attach guitar-container to guitars-container
		}
		
	}
}

