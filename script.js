const imageContainer = document.getElementById('image-container')
const loader = document.getElementById('loader')

let ready = false
let imagesLoaded = 0
let totalImages = 0
let photosArray = []

// unsplash API
const count = 30
const apiKey = 'yB14xQFZRqpr8NrkyoT47iL-i6OsYWdNgd87T0SAUTQ'
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}` 

// Check if all images were loaded
function imageLoaded(){
imagesLoaded++
console.log(imagesLoaded)
if(imagesLoaded === totalImages) {
    ready=true
    loader.hidden=true
    
}
}

//Helper function to set  attributes on DOM  Elements
function setAttributes(element, attributes){
for (const key in attributes){
    element.setAttribute(key,attributes[key])
}
}

//create elements for links and photos
function displayPhotos() {
    imagesLoaded=0
    totalImages = photosArray.length
    console.log("Total Images =",totalImages)
//Run function for each object in photosArray
    photosArray.forEach((photo) =>  {
        //create <a> to link to unspash 
        const item = document.createElement('a')
        setAttributes(item, {
            href:photo.links.html,
            target:'_blank',
          })

        //create <img> for photo
        const img= document.createElement('img')
        setAttributes(img, {
            src:photo.urls.regular,
            alt:photo.alt_description,
            title:photo.alt_description,
        })
        // Event Listener,check when each is finished loading
        img.addEventListener('load', imageLoaded)

        //put <img> inside <a> tag, then put both inside our imageContainer
        item.appendChild(img)
        imageContainer.appendChild(item)
    })
}


 // Get photos from API
async function getPhotos(){
    try {
     const response = await fetch(apiUrl)
     photosArray = await response.json()
    displayPhotos()
     
    } catch (error) {
        console.log('My gosh there is a problem', error)
    }
}

//check to see if scrolling near bottom of page, load more photos
window.addEventListener('scroll', ()=>{
    if(window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready){
            ready=false;
            getPhotos()
            
    }
})

// load
getPhotos()

