const eventContainers = [...document.querySelectorAll('.event-container')];
const nxtBtn = [...document.querySelectorAll('.nxt-btn')];
const preBtn = [...document.querySelectorAll('.pre-btn')];

eventContainers.forEach((item, i) => {
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
};

//Fetch the data from the API
async function fetchEvents() {
    await fetch('events.json')
        .then((response) => {
            if (!response.ok) {
                throw new Error('Network response was not okay');
            }
            return response.json();
        })
        .then((data) => {
            events = data
            document.querySelector('.event-container').innerHTML = data.map(loadEvents).join('');
        })
        .catch((error) => {
            console.error('There is a problem with the fetch operation:', error);
        });
} fetchEvents();