const productContainers = [...document.querySelectorAll('.event-container')];
const nxtBtn = [...document.querySelectorAll('.nxt-btn')];
const preBtn = [...document.querySelectorAll('.pre-btn')];

productContainers.forEach((item, i) => {
    let containerDimensions = item.getBoundingClientRect();
    let containerWidth = containerDimensions.width;

    nxtBtn[i].addEventListener('click', () => {
        item.scrollLeft += containerWidth;
    })

    preBtn[i].addEventListener('click', () => {
        item.scrollLeft -= containerWidth;
    })
})

function loadEvents(review) {
    return (`
        <div class="event-card">
            <div class="event-image">
                <span class="date-tag">
                    <p>${review.month}</p>
                    <p>${review.date}</p>
                </span>
                <img src="${review.image}" class="event-thumb" alt="event-image">
                <button class="card-btn">Book Now</button>
            </div>
        </div>
    `)
}

//1. Fetch the data from the API
async function fetchProducts() {
    await fetch('events.json')
        .then((response) => {
            if (!response.ok) {
                throw new Error('Network repsonse was not okay');
            }
            return response.json();
        })
        .then((data) => {
            events = data
            console.log(events);
            //2. Parse the data and create the 'event' divs
            document.querySelector('.event-container').innerHTML = data.map(loadEvents).join('');
        })
        .catch((error) => {
            console.error('There is a problem with the fetch operation:',
                error);
        });
}
fetchProducts();