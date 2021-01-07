
const divCake = document.querySelector('div#Cake.tabcontent')
const divPie = document.querySelector('div#Pie.tabcontent')
const divTart = document.querySelector('div#Tart.tabcontent')
const divOther = document.querySelector('div#Other.tabcontent')

function renderAllDesserts(dessertArray) {
    dessertArray.forEach(dessertObj => {
      renderOneDessert(dessertObj)
     
    })  
  }

  
function renderOneDessert(dessertObj) {
    const div = document.createElement("div")

    

    
    div.innerHTML = `
    <h2>${dessertObj.name}</h2>
    <img src="${dessertObj.picture}" class="dessert-picture"/>
    
    <button class="like-btn" id=${dessertObj.id} style= "background: rgb(51,255,211)">Like ♡ </button>
    <button class="add-btn" id = ${dessertObj.id}> ADD TO FAVORITES </button>
    `


    



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

  //    const specificAddButton = event.target
//      const closest = specificAddButton.closest("div")
//       const omg = closest.querySelector("img")
//       const omgName = closest.querySelector("h2")
//      let omgNameText = omgName.innerText 
//       const nameTextA = document.createElement("a")
    
    
//       const omgPicLink = omg.src
       const specificAddButtonId = event.target.id
//       const favoriteMenuSpot = document.querySelector("div.scrollmenu")
//     const addFavPic = document.createElement("img")
//     const addFavPicDiv = document.createElement("a")


//     addFavPic.src = `${omgPicLink}`

//     nameTextA.innerHTML = `${omgNameText} <br> <img src="${omgPicLink}"><br>
//     <button class="delete-fav-btn"> Delete Favorite </button>
//     `
   
    
// favoriteMenuSpot.append(nameTextA)

    

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

        // const closestImage = specificAddButton.closest("img")
        // console.log(closestImage)



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
      // .then(r => r.json())
      // .then(
        

        

  }



})







//render one fav
//render all fav
//get fetch favorites 





// function renderAllFavorites(favoriteArray){
//   favoriteArray.forEach(favoriteObj => {
//     renderOneFavorite(favoriteObj) 
   
//   })  
// }



// function renderOneFavorite(favoriteObj){

// }



// fetch("http://localhost:3000/favorites")
// .then(r => r.json())
// .then(favoriteArray => {

//   renderAllFavorites(favoriteArray)
// })

    
   






