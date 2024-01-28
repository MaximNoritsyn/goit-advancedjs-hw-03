import { fetchBreeds, fetchCatByBreed } from './js/cat-api'
import iziToast from 'izitoast'
import "izitoast/dist/css/iziToast.min.css";
import './css/slimselect.css'
import SlimSelect from 'slim-select'

const selectors = {
    breeds: document.querySelector('select.breed-select'),
    catInfo: document.querySelector('div.cat-info'),
    loader: document.querySelector('span.loader')
}



// markups
function markupBreedOption(breeds) {
    return breeds.map(
        breed => `<option value="${breed.id}">${breed.name}</option>`
    ).join('')
}

function markupCatInfo(cat) {
    return `
    <div class="cat-row">
        <img src="${cat.url}" alt="${cat.breeds[0].name}" width="300px" heigth="200px">
        <div class="cat-text-block">
            <h2>${cat.breeds[0].name}</h2>
            <p>${cat.breeds[0].description}</p>
            <strong>Temperament:</strong> ${cat.breeds[0].temperament}<br>
        </div>
    </div>
    `
}



// functions
function loadingStatus(isLoading) {
    if (isLoading) {
        selectors.loader.classList.remove('hidden')
        selectors.breeds.classList.add('hidden')
    } else {
        selectors.loader.classList.add('hidden')
        selectors.breeds.classList.remove('hidden')
    }
}

function sendError() {
  iziToast.error({
    message: 'Oops! Something went wrong! Try reloading the page!',
    position: "topCenter",
    transitionIn: 'fadeInDown'
  });
}



// event handlers
function handleBreedChange(event) {
    const breedId = event.target.value
    selectors.catInfo.innerHTML = ''
    loadingStatus(true)
    fetchCatByBreed(breedId).then(
        data => {
            loadingStatus(false)
            selectors.catInfo.innerHTML = markupCatInfo(data[0])
        }
    )
    .catch(
        error => {
            console.error(error)
            loadingStatus(false)
            sendError()
        }
    )

}



// main code
loadingStatus(true)

fetchBreeds()
    .then(
        data => {
            loadingStatus(false)
            selectors.breeds.innerHTML = markupBreedOption(data)
            new SlimSelect({
                select: selectors.breeds,
                settings: {
                    contentLocation: document.getElementById('local')
                }
            })
        }
    )
    .catch(
        error => {
            loadingStatus(false)
            console.error(error)
            sendError()
        }
    )

selectors.breeds.addEventListener('change', handleBreedChange)