class BookingComponent extends HTMLElement {
  connectedCallback() {
    const selectedRoom = JSON.parse(localStorage.getItem('selectedRoom')) || {
      name: 'Twin Room',
      image: 'assets/image/Twin Room.jpg',
      price: 'Rp 300.000'
    };

    this.innerHTML = `
      <div class="booking-container">
        <div class="form-section">
          <h2>Booking Summary</h2>
          <label>Check-in: <input type="date" id="checkin" required /></label>
          <label>Check-out: <input type="date" id="checkout" required /></label>

          <h2>Personal Details</h2>
          <label>Gender:
            <select id="gender" required>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
          </label>
          <label>First Name: <input type="text" id="firstName" required /></label>
          <label>Last Name: <input type="text" id="lastName" required /></label>
          <label>Phone Number: <input type="tel" id="phone" required /></label>
          <div class="form-row">
            <input type="text" id="country" placeholder="Country" required />
            <input type="text" id="city" placeholder="City" required />
          </div>
        </div>
        <div class="summary-section">
          <img src="${selectedRoom.image}" alt="${selectedRoom.name}" class="room-image">
          <h3>${selectedRoom.name}</h3>
          <p><strong>Price Details</strong></p>
          <p class="price">${selectedRoom.price}/night</p>
          <button class="booking-btn">BOOKING</button>
        </div>
      </div>
    `;

    const style = document.createElement('style');
    style.textContent = `
      .booking-container {
        display: flex;
        gap: 2rem;
        padding: 2rem;
        max-width: 1200px;
        margin: 0 auto;
      }

      .form-section {
        flex: 1;
        padding: 2rem;
        background: #fff;
        border-radius: 10px;
        box-shadow: 0 2px 10px rgba(0,0,0,0.1);
      }

      .form-section h2 {
        margin-bottom: 1.5rem;
      }

      .summary-section {
        flex: 1;
        padding: 2rem;
        background: #fff;
        border-radius: 10px;
        box-shadow: 0 2px 10px rgba(0,0,0,0.1);
      }

      .room-image {
        width: 100%;
        object-fit: contain;
        border-radius: 8px;
        margin-bottom: 1rem;
      }

      label {
        display: block;
        margin-bottom: 1rem;
      }

      input, select {
        width: 100%;
        padding: 8px;
        margin-top: 4px;
        border: 1px solid #ddd;
        border-radius: 4px;
      }

      .form-row {
        display: flex;
        gap: 1rem;
      }

      .booking-btn {
        width: 100%;
        padding: 12px;
        background: #A17640;
        color: white;
        border: none;
        border-radius: 4px;
        cursor: pointer;
        font-size: 1.1rem;
        margin-top: 1rem;
      }

      .booking-btn:hover {
        background: #8a6533;
      }

      .price {
        color: #333;
        font-size: 1.2rem;
        font-weight: 700;
        margin: 1rem 0;
      }
    `;
    this.appendChild(style);

    this.querySelector('.booking-btn').addEventListener('click', () => {
      const data = {
        name: `${this.querySelector('#firstName').value} ${this.querySelector('#lastName').value}`,
        gender: this.querySelector('#gender').value,
        phone: this.querySelector('#phone').value,
        city: this.querySelector('#city').value,
        country: this.querySelector('#country').value,
        checkIn: this.querySelector('#checkin').value,
        checkOut: this.querySelector('#checkout').value,
        roomType: selectedRoom.name,
        roomPrice: selectedRoom.price,
        status: 'Pending'
      };

      document.dispatchEvent(new CustomEvent('booking-submitted', { detail: data }));
      
      alert('Booking submitted successfully!');
      
      this.querySelectorAll('input, select').forEach(input => input.value = '');
    });
  }
}

customElements.define('booking-component', BookingComponent); 