function insertNewPost(dName, dBreed, dPrice, dGender, dDescription, dUrl) {
    var postContext = {
      name: dName,
      breed: dBreed,
      price: dPrice,
      gender: dGender,
      description: dDescription,
      url: dUrl
    };
  
    var postCard = Handlebars.templates.post(postContext);
    var postContainer = document.querySelector(".post-container");
    postContainer.insertAdjacentHTML('beforeend', postCard);
}

function showCreateDogModal() {
  var modalBackdrop = document.getElementById('modal-backdrop');
  var addDogModal = document.getElementById('create-dog-modal');

  modalBackdrop.classList.remove('hidden');
  addDogModal.classList.remove('hidden');
}

function showAdoptDogModal() {
  var modalBackdrop = document.getElementById('modal-backdrop');
  var adoptDogModal = document.getElementById('adopt-dog-modal');

  modalBackdrop.classList.remove('hidden');
  adoptDogModal.classList.remove('hidden');
}

function clearPostModalTextInputs() {
  document.getElementById('dog-name').value = "";
  document.getElementById('dog-breed').value = "";
  document.getElementById('dog-price').value = "";
  document.getElementById('dog-gender').value = "";
  document.getElementById('dog-description').value = "";
  document.getElementById('dog-url').value = "";
}

function clearAdoptModalTextInputs() {
  document.getElementById('dog-name-to-adopt').value = "";
}

function hidePostModal() {
  var modalBackdrop = document.getElementById('modal-backdrop');
  var addDogModal = document.getElementById('create-dog-modal');

  modalBackdrop.classList.add('hidden');
  addDogModal.classList.add('hidden');

  clearPostModalTextInputs();
}

function hideAdoptModal() {
  var modalBackdrop = document.getElementById('modal-backdrop');
  var adoptDogModal = document.getElementById('adopt-dog-modal');

  modalBackdrop.classList.add('hidden');
  adoptDogModal.classList.add('hidden');

  clearAdoptModalTextInputs();
}

function addDog() {
  var dogName = document.getElementById('dog-name').value;
  var dogBreed = document.getElementById('dog-breed').value;
  var dogPrice = document.getElementById('dog-price').value;
  var dogGender = document.getElementById('dog-gender').value;
  var dogDescription = document.getElementById('dog-description').value;
  var dogUrl = document.getElementById('dog-url').value;

  var request = new XMLHttpRequest();
  var url = '/addDog';
  request.open('POST', url);

  var requestBody = JSON.stringify({
    name: dogName,
    breed: dogBreed,
    price: dogPrice,
    gender: dogGender,
    description: dogDescription,
    url: dogUrl
  });

  request.addEventListener('load', function(event) {
    if (event.target.status === 200) {
      var postContext = {
        name: dName,
        breed: dBreed,
        price: dPrice,
        gender: dGender,
        description: dDescription,
        url: dUrl
      };  
      var postCard = Handlebars.templates.post(postContext);
      var postContainer = document.querySelector(".post-container");    //not working
      postContainer.insertAdjacentHTML('beforeend', postCard);
    } else {
      alert("error adding dog: " + event.target.response);
    }
  });
  hidePostModal();
  request.setRequestHeader('Content-Type', 'application/json');
  request.send(requestBody);
}

function adoptDog (){
  var dogName = document.getElementById('dog-name-to-adopt').value;
  var request = new XMLHttpRequest();
  var url = '/adoptDog';
  request.open('POST', url);

  var requestBody = JSON.stringify({
    name: dogName
  });

  request.addEventListener('load', function(event){
    if(event.target.status === 200) {
      
    }else {
      alert("error adopting dog: " + event.target.response);
    }
  });
  
  hideAdoptModal();
  request.setRequestHeader('Content-Type', 'application/json');
  request.send(requestBody);
}


var postDog = document.getElementById('post-dog-button');
if (postDog) {
  postDog.addEventListener('click', showCreateDogModal);
}

var submitDogButton = document.querySelector(".modal-accept-button");
if (submitDogButton) {
  submitDogButton.addEventListener('click', addDog)
}

var cancelButton = document.querySelector(".modal-cancel-button");
if (cancelButton) {
  cancelButton.addEventListener('click', hidePostModal);
}

var exitModalButton = document.querySelector(".modal-close-button");
if (exitModalButton) {
  exitModalButton.addEventListener('click', hidePostModal);
}

var adoptDogNav = document.getElementById('adopt-dog-button');
if (adoptDogNav) {
  adoptDogNav.addEventListener('click', showAdoptDogModal);
}

var adoptDogAcceptButton = document.getElementById('adopt-dog-accept');
if (adoptDogAcceptButton) {
  adoptDogAcceptButton.addEventListener('click', adoptDog);
}
