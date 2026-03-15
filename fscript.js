// Fake flight data
const dummyFlights = [
    { id: 1, airline: 'IndiGo', from: 'Delhi', to: 'Mumbai', time: '12:30', price: 6200 },
    { id: 2, airline: 'SpiceJet', from: 'Delhi', to: 'Mumbai', time: '14:45', price: 7200 },
  ];
  
  function searchFlights() {
    const from = document.getElementById("from").value;
    const to = document.getElementById("to").value;
    const depart = document.getElementById("depart").value;
    const resultContainer = document.getElementById("results");
  
    resultContainer.innerHTML = '';
  
    const matched = dummyFlights.filter(f => 
      f.from.toLowerCase().includes(from.toLowerCase()) &&
      f.to.toLowerCase().includes(to.toLowerCase())
    );
  
    matched.forEach(flight => {
      const div = document.createElement('div');
      div.className = 'flight-card';
      div.innerHTML = `
        <strong>${flight.airline}</strong><br>
        ${flight.from} → ${flight.to}<br>
        Time: ${flight.time} | Price: ₹${flight.price}<br>
        <button onclick='bookFlight(${JSON.stringify(flight.id)})'>Book</button>
      `;
      resultContainer.appendChild(div);
    });
  }
  
  function bookFlight(id) {
    const flight = dummyFlights.find(f => f.id === id);
    localStorage.setItem('selectedFlight', JSON.stringify(flight));
    window.location.href = "Fbooking.html";
  }
  
  // Booking Page Logic
  if (window.location.pathname.includes("Fbooking.html")) {
    const flight = JSON.parse(localStorage.getItem('selectedFlight'));
    document.getElementById("ticket-preview").innerHTML = `
      <h2>Booking: ${flight.airline}</h2>
      <p>${flight.from} → ${flight.to} at ${flight.time}</p>
      <p>Price: ₹${flight.price}</p>
    `;
  
    // Passenger input
    let passengerCount = 1;
    function renderPassengerInputs() {
      const container = document.getElementById("passengers");
      container.innerHTML = '';
      for (let i = 0; i < passengerCount; i++) {
        container.innerHTML += `
          <input type="text" placeholder="Passenger ${i+1} Name" /><br>
        `;
      }
    }
    window.addPassenger = function () {
      passengerCount++;
      renderPassengerInputs();
    }
    renderPassengerInputs();
  
    // Seat Map Logic
    const seatMap = document.getElementById("seat-map");
    const selectedSeatsDisplay = document.getElementById("selected-seats");
    const totalSeats = 30;
    let selectedSeats = [];
  
    for (let i = 1; i <= totalSeats; i++) {
      const btn = document.createElement("div");
      btn.className = "seat available";
      btn.textContent = i;
  
      // Randomly block some seats
      if (Math.random() < 0.2) {
        btn.className = "seat booked";
      } else {
        btn.addEventListener("click", () => {
          if (btn.classList.contains("selected")) {
            btn.classList.remove("selected");
            selectedSeats = selectedSeats.filter(s => s !== i);
          } else {
            btn.classList.add("selected");
            selectedSeats.push(i);
          }
          selectedSeatsDisplay.textContent = selectedSeats.join(", ");
        });
      }
  
      seatMap.appendChild(btn);
    }
  }
  window.onload = function () {
    const flight = JSON.parse(localStorage.getItem('selectedFlight'));
    if (flight) {
      document.getElementById('flightInfo').innerHTML = `
        <h2>Booking for: ${flight.flight}</h2>
        <p>From: ${flight.from}</p>
        <p>To: ${flight.to}</p>
        <p>Departure Time: ${flight.time}</p>
        <p>Seats Available: ${flight.seats}</p>
        <p>Price: ₹${flight.price}</p>
      `;
    }
  };
  