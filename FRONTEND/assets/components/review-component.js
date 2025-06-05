class ReviewComponent extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <div class="overlay">
        <div class="form-popup">
          <h2>Write a Review</h2>
          <label>Rate the product</label>
          <div class="stars" id="rating-stars">
            ${[1, 2, 3, 4, 5].map(i => `<span data-val="${i}">&#9733;</span>`).join('')}
          </div>

          <form id="form">
            <label>Name</label>
            <input type="text" id="name" placeholder="Your name ..." required />
            
            <label>Choose Room</label>
            <select id="roomType" required>
              <option>Twin Room</option>
              <option>Standard Room</option>
              <option>Promotion Room</option>
            </select>

            <label>Message</label>
            <textarea id="comment" placeholder="Write your review..." required></textarea>

            <div class="actions">
              <button type="submit" class="submit">Submit</button>
              <button type="button" id="cancelBtn" class="cancel">Cancel</button>
            </div>
          </form>
        </div>
      </div>
    `;

    const style = document.createElement('style');
    style.textContent = `
      .overlay {
        position: fixed;
        top: 0; left: 0; width: 100%; height: 100%;
        background: rgba(0,0,0,0.5);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 9999;
      }

      .form-popup {
        background: white;
        border-radius: 10px;
        padding: 30px;
        width: 350px;
        box-shadow: 0 4px 15px rgba(0,0,0,0.2);
        font-family: sans-serif;
      }

      h2 {
        margin-top: 0;
        margin-bottom: 20px;
        color: #333;
        text-align: center;
      }

      .stars {
        margin-bottom: 15px;
        text-align: center;
      }

      .stars span {
        font-size: 28px;
        cursor: pointer;
        color: #ccc;
        margin: 0 2px;
      }

      .stars .selected {
        color: #A17640;
      }

      label {
        display: block;
        margin-bottom: 8px;
        font-weight: bold;
        color: #555;
      }

      input, select, textarea {
        width: 100%;
        margin-bottom: 20px;
        padding: 10px;
        font-size: 16px;
        border-radius: 5px;
        border: 1px solid #ccc;
        box-sizing: border-box;
      }

      textarea {
        height: 100px;
        resize: vertical;
      }

      .actions {
        display: flex;
        justify-content: flex-end;
        gap: 10px;
        margin-top: 20px;
      }

      .submit {
        background-color: #A17640;
        color: white;
        padding: 10px 20px;
        border: none;
        border-radius: 5px;
        cursor: pointer;
        font-size: 16px;
      }

      .submit:hover {
        background-color: #8a6533;
      }

      .cancel {
        background: transparent;
        border: 1px solid #A17640;
        color: #A17640;
        padding: 10px 20px;
        border-radius: 5px;
        cursor: pointer;
        font-size: 16px;
      }

      .cancel:hover {
        background: #f5f5f5;
      }
    `;
    this.appendChild(style);

    let selectedRating = 0;
    const stars = this.querySelectorAll('#rating-stars span');
    stars.forEach((star, index) => {
      star.addEventListener('click', () => {
        selectedRating = parseInt(star.getAttribute('data-val'));
        stars.forEach((s, i) => {
          s.classList.toggle('selected', i < selectedRating);
        });
      });
    });

    this.querySelector('#form').addEventListener('submit', (e) => {
      e.preventDefault();

      if (selectedRating === 0) {
        alert('Please select a star rating!');
        return;
      }

      const review = {
        name: this.querySelector('#name').value,
        roomType: this.querySelector('#roomType').value,
        comment: this.querySelector('#comment').value,
        rating: selectedRating,
        date: new Date().toLocaleDateString('id-ID'),
      };

      document.dispatchEvent(new CustomEvent('review-submitted', { detail: review }));
      
      alert('Review submitted successfully!');
      
      this.remove();
    });

    this.querySelector('#cancelBtn').addEventListener('click', () => {
      this.remove();
    });
  }
}

customElements.define('review-component', ReviewComponent); 