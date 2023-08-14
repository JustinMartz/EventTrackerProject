console.log('script.js LOADED');
var guitars = [];

window.addEventListener('load', function(e) {
	console.log('page LOADED');
	init();
});

function init() {
	console.log('in init()');
	
	document.getElementById('addNewGuitar').addEventListener('click', displayAddGuitarCB);
	document.getElementById('colorSearch').addEventListener('click', colorSearchCB);
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
		let gCounter = 0;
		for (let g of guitars) {
			// make guitar-container div
			let gcon = document.createElement('div');
			gcon.className = 'guitar-container';
			gcon.id = 'guitar_' + gCounter;
			gCounter++;
			
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
			
			let idInput = document.createElement('input');
			idInput.type = 'hidden';
			idInput.id = gcon.id + 'dbId';
			idInput.value = g.id;
			gIcons.appendChild(idInput);
			
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
		
		
		let currentGuitar = guitars[guitarId];
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
			saveIcon.addEventListener('click', updateGuitarCB);
			editIconsDiv.appendChild(saveIcon);
			
		let cancelIcon = document.createElement('img');
			cancelIcon.src = 'images/cancel.png';
			cancelIcon.id = 'cancelEditingGuitar';
			cancelIcon.title = 'Cancel';
			cancelIcon.addEventListener('click', cancelGuitarEditCB);
			editIconsDiv.appendChild(cancelIcon);
		
		let gText = document.createElement('div');
		gText.className = 'text';
		gCon.appendChild(gText);
		
		// construct the form
		let gForm = document.createElement('form');
		gForm.id = gCon.id + '_form';
		
		let idInput = document.createElement('input');
		idInput.type = 'hidden';
		idInput.id = 'guitar_' + guitarId + 'dbId';
		idInput.value = currentGuitar.id;
		gForm.appendChild(idInput);
		
		let makeText = document.createElement('h2');
		makeText.textContent = 'Make: ';
		makeText.style.margin = 0;
		makeText.style.display = 'inline';
		
		let makeInput = document.createElement('input');
		makeInput.type = 'text';
		makeInput.value = currentGuitar.make;
		makeInput.id = 'editMake';
		
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
		modelInput.id = 'editModel';
		
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
		yearInput.id = 'editYear';
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
		colorInput.id = 'editColor';
		
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
		scaleInput.id = 'editScale';
		
		gForm.appendChild(scaleText);
		gForm.appendChild(scaleInput);
		let scaleBr = document.createElement('br');
		gForm.appendChild(scaleBr);
		
		let fretsText = document.createElement('h2');
		fretsText.textContent = 'Number of frets: ';
		fretsText.style.margin = 0;
		fretsText.style.display = 'inline';
		gForm.appendChild(fretsText);
		
		let fretsInput = document.createElement('select');
		fretsInput.name = 'frets';
		fretsInput.id = 'editFrets';
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
		
		caseInput.appendChild(caseNoInput);
		caseInput.appendChild(caseNoInputLabel);
		let caseBr = document.createElement('br');
		gForm.appendChild(caseBr);
		
		let bridgeText = document.createElement('h2');
		bridgeText.textContent = 'Bridge type: ';
		bridgeText.style.margin = 0;
		bridgeText.style.display = 'inline';
		
		let bridgeInput = document.createElement('select');
		bridgeInput.id = 'editBridge';
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
		tuningInput.id = 'editTuning';
		tuningInput.name = 'tuning';
		gForm.appendChild(tuningInput);
		
			let tuningOptionE = document.createElement('option');
			tuningOptionE.textContent = 'E Standard';
			tuningOptionE.value = 1;
			if ('E Standard' === currentGuitar.tuning.name) {
				tuningOptionE.selected = true;
			}
			tuningInput.appendChild(tuningOptionE);
			
			let tuningOptionEb = document.createElement('option');
			tuningOptionEb.textContent = 'Eb Standard';
			tuningOptionEb.value = 2;
			if ('Eb Standard' === currentGuitar.tuning.name) {
				tuningOptionEb.selected = true;
			}
			tuningInput.appendChild(tuningOptionEb);
			
			let tuningOptionD = document.createElement('option');
			tuningOptionD.textContent = 'D Standard';
			tuningOptionD.value = 3;
			if ('D Standard' === currentGuitar.tuning.name) {
				tuningOptionD.selected = true;
			}
			tuningInput.appendChild(tuningOptionD);
			
			let tuningOptionCsharp = document.createElement('option');
			tuningOptionCsharp.textContent = 'C# Standard';
			tuningOptionCsharp.value = 4;
			if ('C# Standard' === currentGuitar.tuning.name) {
				tuningOptionCsharp.selected = true;
			}
			tuningInput.appendChild(tuningOptionCsharp);
			
		gText.appendChild(gForm);
		gCon.appendChild(gText);
		gCon.appendChild(editIconsDiv);
		
	console.log('in editGuitarCB()');
}

let deleteGuitarCB = function(e) {
	e.preventDefault();
	//get guitarId by grabbing guitar.id from page
	console.log('in deleteGuitarCB()');
	let guitarId = e.target.parentElement.parentElement.id;
	console.log('guitarId: ' + guitarId);
	let realId = document.getElementById(guitarId + 'dbId').value;
	console.log('actual id in db: ' + realId);
	let GIDArray = guitarId.split("_");
	guitarId = GIDArray[1];
	console.log(guitarId);
	let result = confirm('Are you sure you want to delete the ' + guitars[guitarId].make + ' ' + guitars[guitarId].model + '?');
	if (result === true) {
		sendDelete(realId);
	}

	console.log('in deleteGuitarCB()');
}

let cancelGuitarEditCB = function(e) {
	e.preventDefault();
	let guitarId = e.target.parentElement.parentElement.id;
	let GIDArray = guitarId.split("_");
	guitarId = GIDArray[1];
	refreshGuitar(guitarId);
}

function refreshGuitar(guitarId) {
	let g = guitars[guitarId];
	
	let gCon = document.getElementById('guitar_' + guitarId); // find current guitar-container to edit
	console.log(gCon.id);
	gCon.firstElementChild.remove();							// remove image area
	gCon.firstElementChild.remove();		// remove text area
	gCon.firstElementChild.remove();		// remove icons area
	
	// make image div
	let gImgDiv = document.createElement('div');
	gImgDiv.className = 'image';
	
	let gImg = document.createElement('img');
	gImg.src = 'images/' + g.imageUrl;
	gImgDiv.appendChild(gImg);
	gCon.appendChild(gImgDiv);
	
	
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
			caseH2.textContent = g.hasCase === true ? 'Has a case' : 'Does not have a case';
			gtxt.appendChild(caseH2);
			// make li for bridge
			let bridgeH2 = document.createElement('h2');
			bridgeH2.textContent = g.bridge + ' bridge';
			gtxt.appendChild(bridgeH2);
			// make li for tuning
			console.log('*** tuning: ' + g.tuning.id);
			let tuningName;
			switch (parseInt(g.tuning.id)) {
				case 1:
				tuningName = 'E Standard';
				break;
				case 2:
				tuningName = 'Eb Standard';
				break;
				case 3:
				tuningName = 'D Standard';
				break;
				case 4:
				tuningName = 'C# Standard';
				break;
				
			}
			let tuningH2 = document.createElement('h2');
			tuningH2.textContent = 'Currently tuned to ' + tuningName;
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
			
			gCon.appendChild(gtxt);    // attach text to guitar-container
			gCon.appendChild(gIcons);
	
}

let updateGuitarCB = function(e) {
	e.preventDefault();
	let guitarId = e.target.parentElement.parentElement.id;
	let formId = guitarId + '_form';
	let form = document.getElementById(formId);
	let GIDArray = guitarId.split("_");
	guitarId = GIDArray[1];
	console.log('getting form');
	console.log(form);
	let id = document.getElementById('guitar_' + guitarId + 'dbId');
	console.log(id);
	let make = form.editMake.value;
	let model = form.editModel.value;
	let year = form.editYear.value;
	let color = form.editColor.value;
	let scaleLength = form.editScale.value;
	let numberOfFrets = form.editFrets.value;
	let hasCase = form.querySelector('input[name = hasCase]:checked').value === 'true' ? true : false;
	let imageUrl = guitars[guitarId].imageUrl;
	let bridge = form.editBridge.value;
	let tuning = form.editTuning.value;
	
	console.log(make);
	console.log(model);
	console.log(year);
	console.log(color);
	console.log(scaleLength);
	console.log(numberOfFrets);
	console.log(hasCase);
	console.log(bridge);
	console.log(tuning);
	// FIXME verify data
	let guitar = {
		id: parseInt(id.value),
		make: make,
		model: model,
		year: parseInt(year),
		color: color,
		scaleLength: parseFloat(scaleLength),
		numberOfFrets: parseInt(numberOfFrets),
		hasCase: hasCase,
		imageUrl: imageUrl,
		bridge: bridge,
		tuning: {id: tuning}
	}
	sendUpdate(guitar, guitarId);
}

function sendUpdate(guitar, guitarId) {
	console.log(guitar);
	let xhr = new XMLHttpRequest();
	xhr.open('PUT', 'api/guitars/' + guitar.id, true);

	xhr.setRequestHeader("Content-type", "application/json");

	xhr.onreadystatechange = function() {
  		if (xhr.readyState === 4 ) {
    		if ( xhr.status == 200 || xhr.status == 201 ) { // Ok or Created
      			let data = JSON.parse(xhr.responseText);
      			guitars[guitarId] = data;
      			refreshGuitar(guitarId);
    		} else {
      			console.error("POST request failed.");
      			console.error(xhr.status + ': ' + xhr.responseText);
      			alert("Update failed!");
      			// FIXME repopulate guitar-container with original guitar
      			displayGuitars();
    		}
  		}
	};

	let guitarJson = JSON.stringify(guitar);

	xhr.send(guitarJson);
}

function sendDelete(guitarId) {
	let xhr = new XMLHttpRequest();
	xhr.open('DELETE', 'api/guitars/' + guitarId, true);
	xhr.send(null);	


	xhr.onreadystatechange = function() {
  		if (xhr.readyState === 4 ) {
			  console.log('xhr.status: ' + xhr.status);
    		if ( xhr.status === 204) {
				console.log('we are in the true block');
				location.reload();      			
    		} else {
      			alert('Deletion failed!');
    		}
  		}
	};

}

let displayAddGuitarCB = function(e) {
	console.log('in addGuitarCB()');
	let ultimateGcon = document.getElementById('guitars-container');
	// get number from id of last div
	let divs = document.getElementsByClassName('guitar-container');
	console.log(divs);
	let nums = [];
	let i = 0;
	for (let gc of divs) {
		nums[i] = parseInt(gc.id.charAt(gc.id.length - 1));
		i++;
	}
	// for (let gc of divs) { gc.style.display = 'none'; }
	nums.sort();
	console.log(nums);
	let lastId = nums[nums.length - 1];
	let newId = lastId + 1;
	console.log(lastId);
	// remove all guitar-container divs
	// create new guitar-container div with form data and append it to ultimategcon
	let newCon = document.createElement('div');
	newCon.className = 'guitar-container';
	newCon.id = 'guitar_' + newId;
	
	// make image div
	let gImgDiv = document.createElement('div');
	gImgDiv.className = 'image';
	// make img element
	let gImg = document.createElement('img');
	gImg.src = 'images/question-mark.gif';
	gImgDiv.appendChild(gImg);
	newCon.appendChild(gImgDiv);

	
	// add icons
	let newIconsDiv = document.createElement('div');
	newIconsDiv.className = 'icons';
	
	let saveIcon = document.createElement('img');
	saveIcon.src = 'images/save.png';
	saveIcon.id = 'addGuitar';
	saveIcon.title = 'Add this guitar';
	saveIcon.addEventListener('click', sendAddCB);
	newIconsDiv.appendChild(saveIcon);
			
	let cancelIcon = document.createElement('img');
	cancelIcon.src = 'images/cancel.png';
	cancelIcon.id = 'cancelAddingGuitar';
	cancelIcon.title = 'Cancel';
	// FIXME cancelIcon.addEventListener('click', cancelGuitarAddCB);
	newIconsDiv.appendChild(cancelIcon);
	
	// add form
	let gText = document.createElement('div');
	gText.className = 'text';
	newCon.appendChild(gText);
		
	// construct the form
	let gForm = document.createElement('form');
	gForm.id = newCon.id + '_form';
		
	let makeText = document.createElement('h2');
	makeText.textContent = 'Make: ';
	makeText.style.margin = 0;
	makeText.style.display = 'inline';
		
	let makeInput = document.createElement('input');
	makeInput.type = 'text';
	makeInput.id = 'newMake';
		
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
	modelInput.id = 'newModel';
		
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
	yearInput.id = 'newYear';
	yearInput.name = 'year';
	gForm.appendChild(yearInput);
	for (let i = 1900; i < 2024; i++) {
		let yearOption = document.createElement('option');
		yearOption.textContent = i;
		yearOption.value = i;
		if (i === 2023) {
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
	colorInput.id = 'newColor';
		
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
	scaleInput.id = 'newScale';
		
	gForm.appendChild(scaleText);
	gForm.appendChild(scaleInput);
	
	let scaleBr = document.createElement('br');
	gForm.appendChild(scaleBr);
	
	let fretsText = document.createElement('h2');
	fretsText.textContent = 'Number of frets: ';
	fretsText.style.margin = 0;
	fretsText.style.display = 'inline';
	gForm.appendChild(fretsText);
		
	let fretsInput = document.createElement('select');
	fretsInput.name = 'frets';
	fretsInput.id = 'newFrets';
	gForm.appendChild(fretsInput);
	for (let i = 19; i < 28; i++) {
		let fretsOption = document.createElement('option');
		fretsOption.textContent = i;
		fretsOption.value = i;
		if (i === 22) {
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
		
	let caseYesInputLabel = document.createElement('label');
	caseYesInputLabel.for = caseYesInput.id;
	caseYesInputLabel.textContent = 'Yes';
		
	caseInput.appendChild(caseYesInput);
	caseInput.appendChild(caseYesInputLabel);
		
	let caseNoInput = document.createElement('input');
	caseNoInput.type = 'radio';
	caseNoInput.id = 'case-no';
	caseNoInput.name = 'hasCase';
	caseNoInput.value = false;
		
	let caseNoInputLabel = document.createElement('label');
	caseNoInputLabel.for = caseNoInput.id;
	caseNoInputLabel.textContent = 'No';
		
	caseInput.appendChild(caseNoInput);
	caseInput.appendChild(caseNoInputLabel);
	
	let caseBr = document.createElement('br');
	gForm.appendChild(caseBr);
	
	let bridgeText = document.createElement('h2');
	bridgeText.textContent = 'Bridge type: ';
	bridgeText.style.margin = 0;
	bridgeText.style.display = 'inline';
		
	let bridgeInput = document.createElement('select');
	bridgeInput.id = 'newBridge';
	bridgeInput.name = 'bridge';
	gForm.appendChild(bridgeInput);
		
	let bridgeOptionTOM = document.createElement('option');
	bridgeOptionTOM.textContent = 'Tune-O-Matic';
	bridgeOptionTOM.value = 'Tune-O-Matic';
	bridgeOptionTOM.selected = true;
	bridgeInput.appendChild(bridgeOptionTOM);
			
	let bridgeOptionFloyd = document.createElement('option');
	bridgeOptionFloyd.textContent = 'Floyd Rose';
	bridgeOptionFloyd.value = 'Floyd Rose';
	bridgeInput.appendChild(bridgeOptionFloyd);
			
	let bridgeOption3 = document.createElement('option');
	bridgeOption3.textContent = '3-Saddle';
	bridgeOption3.value = '3-Saddle';
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
	tuningInput.id = 'newTuning';
	tuningInput.name = 'tuning';
	gForm.appendChild(tuningInput);
		
	let tuningOptionE = document.createElement('option');
	tuningOptionE.textContent = 'E Standard';
	tuningOptionE.value = 1;
	tuningOptionE.selected = true;
	tuningInput.appendChild(tuningOptionE);
			
	let tuningOptionEb = document.createElement('option');
	tuningOptionEb.textContent = 'Eb Standard';
	tuningOptionEb.value = 2;
	tuningInput.appendChild(tuningOptionEb);
			
	let tuningOptionD = document.createElement('option');
	tuningOptionD.textContent = 'D Standard';
	tuningOptionD.value = 3;
	tuningInput.appendChild(tuningOptionD);
			
	let tuningOptionCsharp = document.createElement('option');
	tuningOptionCsharp.textContent = 'C# Standard';
	tuningOptionCsharp.value = 4;
	tuningInput.appendChild(tuningOptionCsharp);
	
	let tuningBr = document.createElement('br');
	gForm.appendChild(tuningBr);
	
	let uploadText = document.createElement('h2');
	uploadText.textContent = 'Image file: ';
	uploadText.style.margin = 0;
	uploadText.style.display = 'inline';
	gForm.appendChild(uploadText);
	
	let uploadInput = document.createElement('input');
	uploadInput.type = 'text'
	uploadInput.id = 'newImage';
	uploadInput.name = 'image';
	gForm.appendChild(uploadInput);
	
	gText.appendChild(gForm);			// attach form to text div
	newCon.appendChild(newIconsDiv); // attach icons div to container
	ultimateGcon.appendChild(newCon);	// attach text div to container div
	
	ultimateGcon.scrollTo({
		top: ultimateGcon.scrollHeight,
 		behavior: 'smooth'
	});	
}

let sendAddCB = function(e) {
	e.preventDefault();
	let guitarId = e.target.parentElement.parentElement.id;
	let formId = guitarId + '_form';
	let form = document.getElementById(formId);
	let GIDArray = guitarId.split("_");
	guitarId = GIDArray[1];
	let make = form.newMake.value;
	let model = form.newModel.value;
	let year = form.newYear.value;
	let color = form.newColor.value;
	let scaleLength = form.newScale.value;
	let numberOfFrets = form.newFrets.value;
	let hasCase = form.querySelector('input[name = hasCase]:checked').value === 'true' ? true : false;
	let imageUrl = form.newImage.value;
	let bridge = form.newBridge.value;
	let tuning = form.newTuning.value;
	
	console.log(make);
	console.log(model);
	console.log(newTuning);
	
	// FIXME verify data
	let guitar = {
		make: make,
		model: model,
		year: parseInt(year),
		color: color,
		scaleLength: parseFloat(scaleLength),
		numberOfFrets: parseInt(numberOfFrets),
		hasCase: hasCase,
		imageUrl: imageUrl,
		bridge: bridge,
		tuning: {id: tuning}
	}
	
	sendAdd(guitar, guitarId);
}

function sendAdd(guitar, guitarId) {
	console.log(guitar);
	let xhr = new XMLHttpRequest();
	xhr.open('POST', 'api/guitars', true);

	xhr.setRequestHeader("Content-type", "application/json");

	xhr.onreadystatechange = function() {
  		if (xhr.readyState === 4 ) {
    		if ( xhr.status == 200 || xhr.status == 201 ) { // Ok or Created
      			let data = JSON.parse(xhr.responseText);
      			guitars.push(data);
      			refreshGuitar(guitarId);
    		} else {
      			console.error("POST request failed.");
      			console.error(xhr.status + ': ' + xhr.responseText);
      			alert("Create failed!");
      			// FIXME repopulate guitar-container with original guitar
      			displayGuitars();
    		}
  		}
	};

	let guitarJson = JSON.stringify(guitar);

	xhr.send(guitarJson);
}

let colorSearchCB = function(e) {
	e.preventDefault();
	console.log('in colorSearch');
	console.log(e.target.parentElement.parentElement.searchKeyword.value);
	
	let keyword = e.target.parentElement.parentElement.searchKeyword.value;
	
	let xhr = new XMLHttpRequest();
	xhr.open('GET', 'api/guitars/color/', true);

	xhr.setRequestHeader("Content-type", "application/json");

	xhr.onreadystatechange = function() {
  		if (xhr.readyState === 4 ) {
    		if ( xhr.status == 200 || xhr.status == 201 ) { // Ok or Created
      			let data = JSON.parse(xhr.responseText);
      			guitars.push(data);
      			refreshGuitar(guitarId);
    		} else {
      			console.error("POST request failed.");
      			console.error(xhr.status + ': ' + xhr.responseText);
      			alert("Create failed!");
      			// FIXME repopulate guitar-container with original guitar
      			displayGuitars();
    		}
  		}
	};

	let guitarJson = JSON.stringify(guitar);

	xhr.send(guitarJson);
}