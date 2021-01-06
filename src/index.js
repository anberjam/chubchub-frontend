
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
    <img src="${dessertObj.picture}" class="dessert-picture" />
    
    <button class="like-btn" id=${dessertObj.id}>Like ♡ </button>
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


    
   






