class HeaderComponent extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
            <style>
                @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;700&family=Great+Vibes&display=swap');
                
                header {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    padding: 1rem 2rem;
                    background-color: white;
                    position: fixed;
                    width: 100%;
                    top: 0;
                    z-index: 1000;
                    box-shadow: 0 2px 5px rgba(0,0,0,0.1);
                    box-sizing: border-box;
                }
                .logo {
                    font-family: 'Great Vibes', cursive;
                    font-size: 2rem;
                    color: #333;
                    text-decoration: none;
                }
                nav {
                    display: flex;
                    gap: 2rem;
                }
                nav a {
                    text-decoration: none;
                    color: #333;
                    font-weight: 500;
                    transition: color 0.3s;
                    font-family: 'Montserrat', sans-serif;
                }
                nav a:hover {
                    color: #666;
                }
                .sign-in-btn {
                    background-color: #A17640;
                    color: white;
                    padding: 0.5rem 1rem;
                    border-radius: 5px;
                    text-decoration: none;
                    transition: background-color 0.3s;
                    font-family: 'Montserrat', sans-serif;
                    font-weight: 500;
                }
                .sign-in-btn:hover {
                    background-color: #8a6533;
                }
            </style>
            <header>
                <a href="index.html" class="logo">Sibayak Multi</a>
                <nav>
                    <a href="index.html#">Home</a>
                    <a href="index.html#about">About</a>
                    <a href="index.html#room">Rooms</a>
                    <a href="index.html#service">Service</a>
                    <a href="review.html">Review</a>
                </nav>
                <a href="login.html" class="sign-in-btn">SIGN IN</a>
            </header>
        `;
    }
}

customElements.define('header-component', HeaderComponent); 