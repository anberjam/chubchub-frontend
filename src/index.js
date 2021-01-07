
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
    div.className = 'dessert-container'
    const img = document.createElement('img')
    img.src = dessertObj.picture
    img.className = 'dessert-picture'
    div.id = `dessert-${dessertObj.id}`
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
    
    <button class="like-btn" id=${dessertObj.id} style= "background: rgb(51,255,211)">Like ♡ </button>
    <button class="add-btn" id = ${dessertObj.id}> ADD TO FAVORITES </button>
    `

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



dessertCollection.addEventListener("click", function(event) {
  if (event.target.matches(".like-btn")) {
    const dessertId = event.target.id
    const specificLikeButton = event.target
    specificLikeButton.style = "background: rgb(255,33,33)" 
    
    
    //fetch dessert data and change likes to 1. also change color of like

    configObj = {method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({"likes": 1
    })}


    

    fetch(`http://localhost:3000/desserts/${dessertId}`, configObj)
    .then(r => r.json())
    .then(updatedDessert =>     {
    
    
  }
    )
  }
  else if (event.target.matches(".add-btn")) {


       const specificAddButtonId = event.target.id


    

    const newFavObj = {
      dessert_id: specificAddButtonId
    }

    const config = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify(newFavObj)
    }

    fetch("http://localhost:3000/favorites", config)
    .then(r => r.json())
    .then(newFav => { 

      const specificAddButton = event.target
     const closest = specificAddButton.closest("div")
      const omg = closest.querySelector("img")
      const omgName = closest.querySelector("h2")
     let omgNameText = omgName.innerText 
      const nameTextA = document.createElement("a")
      nameTextA.id = `${newFav.id}`
    
    
      const omgPicLink = omg.src
      const specificAddButtonId = event.target.id
      const favoriteMenuSpot = document.querySelector("div.scrollmenu")
    const addFavPic = document.createElement("img")
 


    addFavPic.src = `${omgPicLink}`

    nameTextA.innerHTML = `${omgNameText} <br> <img src="${omgPicLink}"><br>
    <button class="delete-fav-btn"> Delete Favorite </button>
    `
   
    
favoriteMenuSpot.append(nameTextA)





    })
  }

})


//delete button in favorites list

const favListSection = document.querySelector("div.favorite-list")

favListSection.addEventListener("click", function(event){

  if (event.target.matches(".delete-fav-btn")) { 
    const thisButton = event.target
    const closestA = thisButton.closest("a")
    const specificFavId = closestA.id
    closestA.remove()


    fetch(`http://localhost:3000/favorites/${specificFavId}`, { method: "DELETE" })   

  }

})

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
          
          const thisDessertDiv = document.querySelector(`#dessert-${dessertId}`)
          fetch(`http://localhost:3000/desserts/${dessertId}`, configObj)
          .then(r => r.json())
          .then(newDessertObject => {
            
            thisDessertDiv.children[1].src = newDessertObject.picture
            thisDessertDiv.children[0].textContent = newDessertObject.name
            
          })
        }})
        
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
    






