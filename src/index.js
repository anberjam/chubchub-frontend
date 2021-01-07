
const divCake = document.querySelector('div#Cake.tabcontent')
const divPie = document.querySelector('div#Pie.tabcontent')
const divTart = document.querySelector('div#Tart.tabcontent')
const divOther = document.querySelector('div#Other.tabcontent')

function renderAllDesserts(dessertArray) {
    dessertArray.forEach(dessertObj => {
      renderOneDessert(dessertObj)
     
    })  
  }

function insertAfter(newNode, existingNode) {
  existingNode.parentNode.insertBefore(newNode, existingNode.nextSibling);
} 

function renderOneDessert(dessertObj) {
    const div = document.createElement("div")
    
  const img = document.createElement('img')
  img.src = dessertObj.picture
  img.className = 'dessert-picture'
  img.id = dessertObj.id
  img.addEventListener('click', function(event){
    const editDiv = document.createElement('div')
    
    editDiv.innerHTML =`
        <form class='edit-dessert-form' dessertId='edit-${dessertObj.id}'>
          <h3>Edit this Dessert</h3>
          <select name='category' class='update-category-${dessertObj.id}'>
            <option value="Pie">Pie</option>
            <option value="Cake">Cake</option>
            <option value="Tart">Tart</option>
            <option value="Other">Other</option>
            <br />
          </select>
          <input type="text" name="name" value="" placeholder="${dessertObj.name}" class="update-dessert-name-${dessertObj.id}" />
          <br />
          <input type="text" name="picture" value="" placeholder="${dessertObj.picture}" class="update-dessert-picture-${dessertObj.id}" />
          <br />
          <button type='button' dessertid='${dessertObj.id}' other='${dessertObj.id}' class='update-dessert-button'> Update this dessert</button>
          <button type='button' id='delete-${dessertObj.id}' dessertId='${dessertObj.id}' class='delete-dessert-button'> Delete this dessert</button>
        </form>`
    div.append(editDiv)
    const deleteButton = document.querySelector(`#delete-${dessertObj.id}`)
    
    deleteButton.addEventListener("click", function(event){
      // console.log('clicked')
      // console.log(event.target.id)
      // console.log(dessertObj.id)
      
      fetch(`http://localhost:3000/desserts/${dessertObj.id}`, { method: "DELETE" })
      .then(r => r.json())
      .then(console.log)
    })
        
 
  })
    
    div.innerHTML = `
    <h2 id='name-${dessertObj.id}'>${dessertObj.name}</h2>
    
    <button class="like-btn" id='like-btn-${dessertObj.id}'>Like ♡ </button>
    <button class="add-btn" id = ${dessertObj.id}> ADD TO FAVORITES </button>
    `
  //loop through div and adding the img after render
  for (i = 0; i < div.children.length; i++) {
    const node = div.children[i]; 
    if (node.id === `name-${dessertObj.id}`){
     insertAfter(img, node)
      break
    }
  }
    if (dessertObj.category=="Cake")
    {divCake.append(div)}
    else if (dessertObj.category=="Tart")
    {divTart.append(div)}
    else if (dessertObj.category=="Pie")
    {divPie.append(div)}
    else if (dessertObj.category=="Other")
    {divOther.append(div)}
  
  }



  
  fetch("http://localhost:3000/desserts")
    .then(r => r.json())
    .then(dessertArray => {
    
      renderAllDesserts(dessertArray)
    })


    //makes tabs clickable

    function openDessert(evt, cityName) {
        var i, tabcontent, tablinks;
        tabcontent = document.getElementsByClassName("tabcontent");
        for (i = 0; i < tabcontent.length; i++) {
          tabcontent[i].style.display = "none";
        }
        tablinks = document.getElementsByClassName("tablinks");
        for (i = 0; i < tablinks.length; i++) {
          tablinks[i].className = tablinks[i].className.replace(" active", "");
        }
        document.getElementById(cityName).style.display = "block";
        evt.currentTarget.className += " active";
      }
      
      // Get the element with id="defaultOpen" and click on it
      document.getElementById("defaultOpen").click();


      const nav = document.querySelector('nav')
      const dessertCollection = document.createElement("div")
      dessertCollection.className = "dessert-collection"
      nav.append(dessertCollection)
      dessertCollection.append(divCake)
      dessertCollection.append(divPie)
      dessertCollection.append(divTart)
      dessertCollection.append(divOther)


      const likeButton = document.querySelector('button.like-btn')




//favorites list
const favList = document.querySelector('div.favorite-list')
const favButton = document.querySelector('button.add-btn')


dessertCollection.addEventListener("click", function(event) {
  if (event.target.matches(".like-btn")) {
    const dessertId = event.target.id
    event.target.style.background = '#FF3333';
    
    //fetch dessert data and change likes to 1. also change color of like

    configObj = {method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({"likes": 1
    })}

    fetch(`http://localhost:3000/desserts/${dessertId}`, configObj)
    .then(r => r.json())
    .then(console.log)
  }})
      //make image clickable, when click, get edit form
      //fills the form
      //edit form submit, fetch data and patch it
      //after submit, closes the form
  dessertCollection.addEventListener("click", function(event) {
    if (event.target.matches(".update-dessert-button")) {
      const dessertId = event.target.attributes.dessertid.value;
      // console.log({ dessertId, event: event.target })

      const updateDessertForm = document.querySelector(`edit-${dessertId}`);
      
      const updateNameInput = document.querySelector(`.update-dessert-name-${dessertId}`)
      const updatePicture=document.querySelector(`.update-dessert-picture-${dessertId}`)
      const updateCategory=document.querySelector(`.update-category-${dessertId}`)
      
      // const updateName = updateNameInput.value
      
      console.log(updateCategory)
      const updateDessertObj = {
      "name": updateNameInput.value,
      "picture": updatePicture.value,
      "category": updateCategory.value,
        "likes": 0
      }

      configObj = {method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updateDessertObj) }
  
      fetch(`http://localhost:3000/desserts/${dessertId}`, configObj)
      .then(r => r.json())
      .then(console.log)
    }})

 

    //create a new favorite object

    // const newFav = {
    //   dessert_id: dessertId
    // }
    
    // fetch(`http://localhost:3000/favorites`, {
    //   method: 'POST',
    //   headers: { "content-type": "application/json"}, 
    //   body: JSON.stringify({newFav})
    // })
    // .then((res) => res.json())
    // .then((updatedFavs) => {console.log(updatedFavs)})
    // //create a method that adds fav to fav list

    //new dessert form
const newDessertForm = document.querySelector('.new-dessert-form')
const dessertFormDiv = document.querySelector('.dessert-form-div')
const url = 'http://localhost:3000/desserts'



newDessertForm.addEventListener('submit', function(event){
  event.preventDefault()

  const newDessertObj = {
    "name": event.target.name.value,
    "picture": event.target.picture.value,
      "category": event.target.category.value,
      "likes": 0
  }

  const config = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify(newDessertObj) }
    
    fetch(url, config)
    .then(r => r.json())
    .then(newDessertObject => {
     
      renderOneDessert(newDessertObject)
    })
  })






