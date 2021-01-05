


const div1 = document.querySelector("div.info")

function renderAlldesserts(dessertArray) {
    dessertArray.forEach(dessertObj => {
      renderOneDessert(dessertObj)
    })  
  }

function renderOneDessert(dessertObj) {
console.log(dessertObj.name)

    const div = document.createElement("div")
   
    
    div.innerHTML = `
    <h2>${dessertObj.name}</h2>
    <img src="${dessertObj.picture}" class="dessert-picture" />
    <li>${dessertObj.likes} Likes</li>
    <button class="like-btn" data-id="${dessertObj.likes}">Like <3</button>
    `
    div1.append(div)

    
  }
  

  
  fetch("http://localhost:3000/desserts")
    .then(r => r.json())
    .then(dessertArray => {
      console.log(dessertArray)
    
      renderAlldesserts(dessertArray)
    })


// desserts =
// [
//     {name: "Apple & Blackberry Crumble",
// picture:"https:\/\/www.themealdb.com\/images\/media\/meals\/xvsurr1511719182.jpg",
// category: "Other",
// likes: 0  
// },