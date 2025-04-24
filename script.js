// ———————————————————————————————————
// LIVE FEED
// ———————————————————————————————————
const feedData = [
  'Alice volunteered 5h at park cleanup.',
  'Bob donated $20 to reforestation.',
  'Cara pledged to reduce plastic use.'
];
document.getElementById('add-feed').addEventListener('click', ()=>{
  const msg=feedData[Math.floor(Math.random()*feedData.length)];
  const div=document.createElement('div'); div.className='feed-item'; div.textContent=msg;
  const container=document.getElementById('feed-container'); container.prepend(div);
});


// Wait for the entire DOM to load
document.addEventListener("DOMContentLoaded", function () {
  // Initialize AOS (Animation On Scroll)
  AOS.init();

  // 1. Smooth scroll to a section by ID
  window.scrollToSection = function(id) {
    document.getElementById(id).scrollIntoView({ behavior: 'smooth' });
  };

  // 2. Toggle the mobile menu
  window.toggleMenu = function() {
    const navbar = document.getElementById("navbar");
    navbar.classList.toggle("show");
  };

  // 3. Accordion toggle functionality
  const accordionBtns = document.querySelectorAll('.accordion-btn');
  accordionBtns.forEach(btn => {
    btn.addEventListener('click', function () {
      this.classList.toggle('active');
      const content = this.nextElementSibling;
      if (content.style.maxHeight) {
        content.style.maxHeight = null;
      } else {
        content.style.maxHeight = content.scrollHeight + 'px';
      }
    });
  });

  // 4. Image comparison slider
  const compareSlider = document.querySelector('.slider');
  const beforeImage = document.querySelector('.img-compare-before');

  if (compareSlider && beforeImage) {
    compareSlider.addEventListener('input', (e) => {
      beforeImage.style.width = `${e.target.value}%`;
    });
  }

  // 5. Chart.js Pie Chart
  const ctx = document.getElementById('wasteChart').getContext('2d');
  new Chart(ctx, {
    type: 'pie',
    data: {
      labels: ['Recycled', 'Composted', 'Landfilled', 'Incinerated'],
      datasets: [{
        data: [40, 25, 20, 15],
        backgroundColor: ['#66bb6a', '#aed581', '#ffcc80', '#ef5350'],
      }]
    },
    options: {
      responsive: true,
      plugins: {
        legend: {
          position: 'bottom',
        },
        title: {
          display: true,
          text: 'Global Waste Management Distribution'
        }
      }
    }
  });

  // 6. Tabbed Navigation Logic
  const tabs = document.querySelectorAll('.tab-button');
  const tabContents = document.querySelectorAll('.tab-content');

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(btn => btn.classList.remove('active'));
      tabContents.forEach(content => content.style.display = 'none');
      tab.classList.add('active');
      const targetTab = tab.getAttribute('data-tab');
      document.getElementById(targetTab).style.display = 'block';
    });
  });

  // 7. Chart.js Bar Chart (Technological Trends)
  const techCtx = document.getElementById('techChart').getContext('2d');
  if (techCtx) {
    new Chart(techCtx, {
      type: 'bar',
      data: {
        labels: ['AI', 'Blockchain', 'IoT', 'Biotech', 'Quantum Computing'],
        datasets: [{
          label: 'Technological Innovations (2025)',
          data: [80, 65, 70, 85, 90], // Change these values as per your data
          backgroundColor: ['#66bb6a', '#ff7043', '#42a5f5', '#ffca28', '#ab47bc'],
        }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: 'bottom',
          },
          title: {
            display: true,
            text: 'Tech Innovation Trends'
          }
        },
        scales: {
          y: {
            beginAtZero: true,
          }
        }
      }
    });
  }

  // 8. Basic Carousel Functionality
  const carouselItems = document.querySelectorAll('.carousel-item');
  let currentIndex = 0;

  function nextSlide() {
    carouselItems[currentIndex].classList.remove('active');
    currentIndex = (currentIndex + 1) % carouselItems.length;
    carouselItems[currentIndex].classList.add('active');
  }

  setInterval(nextSlide, 3000); // Change slide every 3 seconds
});

// Carbon Footprint Calculator Logic
document.querySelector('#carbon-calculate').addEventListener('click', function () {
  const energyUse = parseFloat(document.querySelector('#energy-use').value);
  const transportation = parseFloat(document.querySelector('#transportation').value);

  if (isNaN(energyUse) || isNaN(transportation)) {
    alert('Please enter valid numbers!');
  } else {
    const carbonFootprint = (energyUse * 0.92) + (transportation * 0.2); // Example calculation
    document.querySelector('#carbon-result').innerHTML = `Your estimated carbon footprint is: ${carbonFootprint.toFixed(2)} kg CO2 per month.`;
  }
});

function animateCounters() {
  const counters = document.querySelectorAll(".count");
  counters.forEach(counter => {
    const updateCount = () => {
      const target = +counter.getAttribute("data-target");
      const current = +counter.innerText;
      const increment = target / 100;

      if (current < target) {
        counter.innerText = Math.ceil(current + increment);
        setTimeout(updateCount, 20);
      } else {
        counter.innerText = target;
      }
    };

    updateCount();
  });
}

document.addEventListener("DOMContentLoaded", animateCounters);

document.addEventListener("DOMContentLoaded", function () {
  function animateCounter(element, target, duration = 3000) {
    let start = 0;
    const increment = target / (duration / 16);
    const updateCounter = () => {
      start += increment;
      if (start < target) {
        element.textContent = Math.floor(start).toLocaleString();
        requestAnimationFrame(updateCounter);
      } else {
        element.textContent = target.toLocaleString();
      }
    };
    updateCounter();
  }

  function runAllCounters() {
    const counters = document.querySelectorAll(".impact-count");
    counters.forEach(counter => {
      const target = parseInt(counter.getAttribute("data-target"));
      animateCounter(counter, target);
    });
  }

  // Optional button trigger
  const startBtn = document.getElementById("start-impact");
  if (startBtn) {
    startBtn.addEventListener("click", runAllCounters);
  }

  // Scroll-based trigger
  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        runAllCounters();
        observer.disconnect(); // only once
      }
    });
  }, { threshold: 0.4 });

  const impactSection = document.querySelector("#impact-stats");
  if (impactSection) observer.observe(impactSection);
});


document.addEventListener('DOMContentLoaded', function () {
  const sdgCards = document.querySelectorAll('.sdg-card');

  sdgCards.forEach(card => {
    card.addEventListener('click', () => {
      const sdg = card.getAttribute('data-sdg');
      alert(`Viewing impact data for SDG Goal ${sdg}`);
    });
  });
});

let totalHours = 0;

function logVolunteerHours() {
  document.getElementById('log-hours').style.display = 'block';
}

function submitVolunteerHours() {
  const hours = parseInt(document.getElementById('hours').value);
  if (!isNaN(hours) && hours > 0) {
    totalHours += hours;
    document.getElementById('total-hours').innerText = totalHours;
    document.getElementById('log-hours').style.display = 'none';
  } else {
    alert('Please enter a valid number of hours.');
  }
}

// Sample data to store volunteers and their hours
let volunteers = [
  { name: "John Doe", hours: 50 },
  { name: "Jane Smith", hours: 30 },
  { name: "Michael Brown", hours: 40 }
];

// Function to update the volunteer dashboard
function updateDashboard() {
  // Calculate total volunteer hours and total number of volunteers
  let totalHours = 0;
  volunteers.forEach(volunteer => {
    totalHours += volunteer.hours;
  });
  const totalVolunteers = volunteers.length;

  // Update the DOM elements with current data
  document.getElementById('total-hours').textContent = `${totalHours} hours`;
  document.getElementById('volunteers-count-num').textContent = `${totalVolunteers} volunteers`;

  // Update the list of top volunteers (sorted by hours)
  const topVolunteersList = document.getElementById('top-volunteers-list');
  topVolunteersList.innerHTML = ''; // Clear the list
  const sortedVolunteers = volunteers.sort((a, b) => b.hours - a.hours); // Sort by hours in descending order

  sortedVolunteers.slice(0, 5).forEach(volunteer => {
    const li = document.createElement('li');
    li.textContent = `${volunteer.name} - ${volunteer.hours} hours`;
    topVolunteersList.appendChild(li);
  });
}

// Add volunteer hours form submission handler
document.getElementById('volunteer-form').addEventListener('submit', function(event) {
  event.preventDefault(); // Prevent form submission from reloading the page
  
  const name = document.getElementById('volunteer-name').value;
  const hours = parseInt(document.getElementById('volunteer-hours').value, 10);

  if (name && hours) {
    // Add the new volunteer data to the array
    volunteers.push({ name, hours });

    // Reset the form fields
    document.getElementById('volunteer-name').value = '';
    document.getElementById('volunteer-hours').value = '';

    // Update the dashboard with the new data
    updateDashboard();
  } else {
    alert("Please enter both name and hours.");
  }
});

// Initial call to display the data on load
updateDashboard();


// Sample data for pledges
let pledges = [
  { name: "John Doe", pledge: "I will reduce my plastic use and recycle more." },
  { name: "Jane Smith", pledge: "I commit to planting 10 trees this year." },
  { name: "Michael Brown", pledge: "I will switch to sustainable energy sources in my home." }
];

// Function to update the pledge wall
function updatePledgeWall() {
  const pledgeList = document.getElementById('pledge-list');
  pledgeList.innerHTML = ''; // Clear the list
  
  pledges.forEach(pledge => {
    const div = document.createElement('div');
    div.classList.add('pledge-item');
    div.innerHTML = `<strong>${pledge.name}</strong>: <p>${pledge.pledge}</p>`;
    pledgeList.appendChild(div);
  });
}

// Handle form submission for adding a new pledge
document.getElementById('pledge-form').addEventListener('submit', function(event) {
  event.preventDefault(); // Prevent form from reloading the page
  
  const name = document.getElementById('pledge-name').value;
  const pledgeText = document.getElementById('pledge-text').value;

  if (name && pledgeText) {
    // Add the new pledge to the pledges array
    pledges.push({ name, pledge: pledgeText });

    // Clear the form fields
    document.getElementById('pledge-name').value = '';
    document.getElementById('pledge-text').value = '';

    // Update the pledge wall to include the new pledge
    updatePledgeWall();
  } else {
    alert("Please enter both your name and pledge.");
  }
});

// Initial call to display the pledges
updatePledgeWall();



