console.log('script.js LOADED');
var guitars = [];

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
			guitars = JSON.parse(xhr.responseText);
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
			gcon.id = 'guitar_' + g.id;
			
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
			gEdit.id = 'editGuitarIcon';
			gEdit.title = 'Edit this guitar';
			gEdit.addEventListener('click', editGuitarCB);
			gIcons.appendChild(gEdit);
			
			let gRem = document.createElement('img');
			gRem.src = 'images/delete.png';
			gRem.id = 'deleteGuitarIcon';
			gRem.title = 'Delete this guitar';
			gRem.addEventListener('click', deleteGuitarCB);
			gIcons.appendChild(gRem);
			
			gimgdiv.appendChild(gimg);  // attach img element to image div
			gcon.appendChild(gimgdiv);  // attach image div to guitar-container
			gcon.appendChild(gtxt);    // attach text to guitar-container
			gcon.appendChild(gIcons);
			ultimateGcon.appendChild(gcon); // attach guitar-container to guitars-container
		}
		
	}
	
}

let editGuitarCB = function(e) {
		e.preventDefault();
		let guitarId = e.target.parentNode.parentNode.id;
		console.log(guitarId);
		let GIDArray = guitarId.split("_");
		console.log(GIDArray[1]);
		guitarId = GIDArray[1];
		
		
		let currentGuitar = guitars[guitarId - 1];
		console.log(currentGuitar);
		
		let gCon = document.getElementById('guitar_' + guitarId); // find current guitar-container to edit
		console.log('first child element: ' + gCon.firstElementChild.nextElementSibling);
		gCon.firstElementChild.nextElementSibling.remove();	// remove it
		// gCon = document.createElement('div');  // create a new one
		// gCon.className = 'guitar-container';
		
		// change icons
		gCon.lastElementChild.remove();
		let editIconsDiv = document.createElement('div');
		editIconsDiv.className = 'icons';
		let saveIcon = document.createElement('img');
			saveIcon.src = 'images/save.png';
			saveIcon.id = 'saveEditedGuitar';
			saveIcon.title = 'Update guitar info';
			// FIXME saveIcon.addEventListener('click', updateGuitarCB);
			editIconsDiv.appendChild(saveIcon);
			
		let cancelIcon = document.createElement('img');
			cancelIcon.src = 'images/cancel.png';
			cancelIcon.id = 'cancelEditingGuitar';
			cancelIcon.title = 'Cancel';
			// FIXME cancelIcon.addEventListener('click', cancelGuitarEditCB);
			editIconsDiv.appendChild(cancelIcon);
		
		gCon.appendChild(editIconsDiv);
		
		
		let gText = document.createElement('div');
		gText.className = 'text';
		
		// construct the form
		let gForm = document.createElement('form');
		
		let makeText = document.createElement('h2');
		makeText.textContent = 'Make: ';
		makeText.style.margin = 0;
		makeText.style.display = 'inline';
		
		let makeInput = document.createElement('input');
		makeInput.type = 'text';
		makeInput.value = currentGuitar.make;
		
		gForm.appendChild(makeText);
		gForm.appendChild(makeInput); // attach make input to the form
		
		let makeBr = document.createElement('br');
		gForm.appendChild(makeBr);      // line break before next input
		
		let modelText = document.createElement('h2');
		modelText.textContent = 'Model: ';
		modelText.style.margin = 0;
		modelText.style.display = 'inline';
		
		let modelInput = document.createElement('input');
		modelInput.type = 'text';
		modelInput.value = currentGuitar.model;
		
		gForm.appendChild(modelText);
		gForm.appendChild(modelInput); // attach model input to the form
		
		let modelBr = document.createElement('br');
		gForm.appendChild(modelBr);      // line break before next input
		
		let yearText = document.createElement('h2');
		yearText.textContent = 'Year: ';
		yearText.style.margin = 0;
		yearText.style.display = 'inline';
		gForm.appendChild(yearText);
		
		let yearInput = document.createElement('select');
		yearInput.id = 'year-select';
		yearInput.name = 'year';
		gForm.appendChild(yearInput);
		for (let i = 1900; i < 2024; i++) {
			let yearOption = document.createElement('option');
			yearOption.textContent = i;
			yearOption.value = i;
			if (i === currentGuitar.year) {
				console.log('i matches year: ' + i);
				yearOption.selected = true;
			}
			yearInput.appendChild(yearOption);
		}
		
		let yearBr = document.createElement('br');
		gForm.appendChild(yearBr);      // line break before next input
		
		let colorText = document.createElement('h2');
		colorText.textContent = 'Color: ';
		colorText.style.margin = 0;
		colorText.style.display = 'inline';
		
		let colorInput = document.createElement('input');
		colorInput.type = 'text';
		colorInput.value = currentGuitar.color;
		
		gForm.appendChild(colorText);
		gForm.appendChild(colorInput);
		let colorBr = document.createElement('br');
		gForm.appendChild(colorBr);
		
		let scaleText = document.createElement('h2');
		scaleText.textContent = 'Scale length: ';
		scaleText.style.margin = 0;
		scaleText.style.display = 'inline';
		
		let scaleInput = document.createElement('input');
		scaleInput.type = 'text';
		scaleInput.value = currentGuitar.scaleLength;
		
		gForm.appendChild(scaleText);
		gForm.appendChild(scaleInput);
		let scaleBr = document.createElement('br');
		gForm.appendChild(scaleBr);
		
		
		gText.appendChild(gForm); // attach form text area;
		gCon.appendChild(gText);  // attach text area to guitar-container
		// document.getElementById('guitars-container').appendChild(gCon); // attach guitar-container to guitars-container
		
		let fretsText = document.createElement('h2');
		fretsText.textContent = 'Number of frets: ';
		fretsText.style.margin = 0;
		fretsText.style.display = 'inline';
		gForm.appendChild(fretsText);
		
		let fretsInput = document.createElement('select');
		fretsInput.id = 'frets-select';
		fretsInput.name = 'frets';
		gForm.appendChild(fretsInput);
		for (let i = 19; i < 28; i++) {
			let fretsOption = document.createElement('option');
			fretsOption.textContent = i;
			fretsOption.value = i;
			if (i === currentGuitar.numberOfFrets) {
				console.log('i matches number of frets: ' + i);
				fretsOption.selected = true;
			}
			fretsInput.appendChild(fretsOption);
		}
		
		gForm.appendChild(fretsText);
		gForm.appendChild(fretsInput);
		let fretsBr = document.createElement('br');
		gForm.appendChild(fretsBr);
		
		let caseText = document.createElement('h2');
		caseText.textContent = 'Has a case: ';
		caseText.style.margin = 0;
		caseText.style.display = 'inline';
		gForm.appendChild(caseText);
		
		let caseInput = document.createElement('fieldset');
		gForm.appendChild(caseInput);
		
		let caseYesInput = document.createElement('input');
		caseYesInput.type = 'radio';
		caseYesInput.id = 'case-yes';
		caseYesInput.name = 'hasCase';
		caseYesInput.value = true;
		if (currentGuitar.hasCase === true) {
			caseYesInput.checked = true;
		}
		
		let caseYesInputLabel = document.createElement('label');
		caseYesInputLabel.for = caseYesInput.id;
		caseYesInputLabel.textContent = 'Yes';
		console.log('label.for = ' + caseYesInputLabel.for);
		
		caseInput.appendChild(caseYesInput);
		caseInput.appendChild(caseYesInputLabel);
		
		let caseNoInput = document.createElement('input');
		caseNoInput.type = 'radio';
		caseNoInput.id = 'case-no';
		caseNoInput.name = 'hasCase';
		caseNoInput.value = false;
		if (currentGuitar.hasCase === false) {
			caseYesInput.checked = true;
		}
		
		let caseNoInputLabel = document.createElement('label');
		caseNoInputLabel.for = caseNoInput.id;
		caseNoInputLabel.textContent = 'No';
		console.log('label.for = ' + caseNoInputLabel.for);
		
		caseInput.appendChild(caseNoInput);
		caseInput.appendChild(caseNoInputLabel);
		let caseBr = document.createElement('br');
		gForm.appendChild(caseBr);
		
		let bridgeText = document.createElement('h2');
		bridgeText.textContent = 'Bridge type: ';
		bridgeText.style.margin = 0;
		bridgeText.style.display = 'inline';
		
		let bridgeInput = document.createElement('select');
		bridgeInput.id = 'bridge-select';
		bridgeInput.name = 'bridge';
		gForm.appendChild(bridgeInput);
		
			let bridgeOptionTOM = document.createElement('option');
			bridgeOptionTOM.textContent = 'Tune-O-Matic';
			bridgeOptionTOM.value = 'Tune-O-Matic';
			if ('Tune-O-Matic' === currentGuitar.bridge) {
				bridgeOptionTOM.selected = true;
			}
			bridgeInput.appendChild(bridgeOptionTOM);
			
			let bridgeOptionFloyd = document.createElement('option');
			bridgeOptionFloyd.textContent = 'Floyd Rose';
			bridgeOptionFloyd.value = 'Floyd Rose';
			if ('Floyd Rose' === currentGuitar.bridge) {
				bridgeOptionFloyd.selected = true;
			}
			bridgeInput.appendChild(bridgeOptionFloyd);
			
			let bridgeOption3 = document.createElement('option');
			bridgeOption3.textContent = '3-Saddle';
			bridgeOption3.value = '3-Saddle';
			if ('3-Saddle' === currentGuitar.bridge) {
				bridgeOption3.selected = true;
			}
			bridgeInput.appendChild(bridgeOption3);
		
		gForm.appendChild(bridgeText);
		gForm.appendChild(bridgeInput);
		let bridgeBr = document.createElement('br');
		gForm.appendChild(bridgeBr);
		
		let tuningText = document.createElement('h2');
		tuningText.textContent = 'Current tuning: ';
		tuningText.style.margin = 0;
		tuningText.style.display = 'inline';
		gForm.appendChild(tuningText);
		
		let tuningInput = document.createElement('select');
		tuningInput.id = 'tuning-select';
		tuningInput.name = 'tuning';
		gForm.appendChild(tuningInput);
		
			let tuningOptionE = document.createElement('option');
			tuningOptionE.textContent = 'E Standard';
			tuningOptionE.value = 'E Standard';
			if ('E Standard' === currentGuitar.tuning.name) {
				tuningOptionE.selected = true;
			}
			tuningInput.appendChild(tuningOptionE);
			
			let tuningOptionEb = document.createElement('option');
			tuningOptionEb.textContent = 'Eb Standard';
			tuningOptionEb.value = 'Eb Standard';
			if ('Eb Standard' === currentGuitar.tuning.name) {
				tuningOptionEb.selected = true;
			}
			tuningInput.appendChild(tuningOptionEb);
			
			let tuningOptionD = document.createElement('option');
			tuningOptionD.textContent = 'D Standard';
			tuningOptionD.value = 'D Standard';
			if ('D Standard' === currentGuitar.tuning.name) {
				tuningOptionD.selected = true;
			}
			tuningInput.appendChild(tuningOptionD);
			
			let tuningOptionCsharp = document.createElement('option');
			tuningOptionCsharp.textContent = 'C# Standard';
			tuningOptionCsharp.value = 'C# Standard';
			if ('C# Standard' === currentGuitar.tuning.name) {
				tuningOptionCsharp.selected = true;
			}
			tuningInput.appendChild(tuningOptionCsharp);
			
			
		

	/*
	document.querySelectorAll('.guitar-container').forEach(function(a){
		a.remove()
	})
	*/
	console.log('in editGuitarCB()');
}

let deleteGuitarCB = function(e) {
		e.preventDefault();

	/*
	document.querySelectorAll('.guitar-container').forEach(function(a){
		a.remove()
	})
	*/
	console.log('in deleteGuitarCB()');
}

