
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
    <div>${dessertObj.likes} Likes</div>
    <button class="like-btn" data-id="${dessertObj.likes}">Like <3</button>
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


  //like button
  const likeButton = document.querySelectorAll('button.like-btn')

