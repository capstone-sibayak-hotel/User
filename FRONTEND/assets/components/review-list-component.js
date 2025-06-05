class ReviewListComponent extends HTMLElement {
  async connectedCallback() {
    this.innerHTML = `
      <div class="review-list">
        <h2>Customer Reviews</h2>
        <div id="reviews-container"></div>
      </div>
    `;

    const style = document.createElement('style');
    style.textContent = `
      .review-list {
        padding: 20px;
        max-width: 800px;
        margin: 0 auto;
      }

      .review-item {
        background: white;
        border-radius: 8px;
        padding: 20px;
        margin-bottom: 20px;
        box-shadow: 0 2px 4px rgba(0,0,0,0.1);
      }

      .review-header {
        display: flex;
        justify-content: space-between;
        margin-bottom: 10px;
      }

      .review-name {
        font-weight: bold;
        color: #333;
      }

      .review-date {
        color: #666;
        font-size: 0.9em;
      }

      .review-rating {
        color: #A17640;
        margin-bottom: 10px;
      }

      .review-room {
        color: #666;
        font-style: italic;
        margin-bottom: 10px;
      }

      .review-comment {
        color: #444;
        line-height: 1.5;
      }

      .stars {
        color: #A17640;
      }
    `;
    this.appendChild(style);

    await this.loadReviews();
  }

  async loadReviews() {
    try {
      const response = await fetch('http://localhost:3000/api/reviews');
      if (!response.ok) {
        throw new Error('Failed to fetch reviews');
      }

      const reviews = await response.json();
      const container = this.querySelector('#reviews-container');
      
      // Clear existing reviews
      container.innerHTML = '';
      
      // Sort reviews by date (newest first)
      reviews.sort((a, b) => new Date(b.date) - new Date(a.date));
      
      reviews.forEach(review => {
        const reviewElement = document.createElement('div');
        reviewElement.className = 'review-item';
        reviewElement.innerHTML = `
          <div class="review-header">
            <span class="review-name">${review.username}</span>
            <span class="review-date">${review.date}</span>
          </div>
          <div class="review-rating">
            <span class="stars">${'★'.repeat(review.rating)}${'☆'.repeat(5-review.rating)}</span>
          </div>
          <div class="review-room">Room: ${review.roomType}</div>
          <div class="review-comment">${review.comment}</div>
        `;
        container.appendChild(reviewElement);
      });
    } catch (error) {
      console.error('Error loading reviews:', error);
      this.querySelector('#reviews-container').innerHTML = '<p>Failed to load reviews. Please try again later.</p>';
    }
  }
}

customElements.define('review-list-component', ReviewListComponent); 