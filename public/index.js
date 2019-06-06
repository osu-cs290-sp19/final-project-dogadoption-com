function insertNewPost(dName, dBreed, dPrice, dGender, dDescription) {
    var postContext = {
      name: dName,
      breed: dBreed,
      price: dPrice,
      gender: dGender,
      description: dDescription
    };
  
    var postCard = Handlebars.templates.post(postContext);
    var postContainer = document.querySelector(".post-container");
    console.log("dd", twitCard);
    postContainer.insertAdjacentHTML('beforeend', postCard);
  }