// Define DOM Elements
const topBar = document.querySelector('#top-bar');
const extColorBtns = document.querySelector('#exterior-buttons');
const intColorBtns = document.querySelector('#interior-buttons');
const extImg = document.querySelector('#exterior-image');
const intImg = document.querySelector('#interior-image');



// Handle Top Bar On-Scroll
const handleScroll = () => {

    // Set atTop to true if page scrolled to the top
    const atTop =  window.scrollY === 0;
    topBar.classList.toggle('visible-bar', atTop ); // if atTop is true
    topBar.classList.toggle('hidden-bar', !atTop ); // if atTop is false 

};

// Handle Color Selection
const handleColorBtnClick = (event) => {
    let button; // Initialize button
    console.log(event.target.tagName); // Log clicked tag name

    if(event.target.tagName === 'IMG'){
        // If img element is clicked, get closest button
        button = event.target.closest('button');

    } else if(event.target.tagName === 'BUTTON'){
        // If button element is clicked, get target 
        button = event.target;
    }

    if(button){

        // Get all buttons
        const buttons = event.currentTarget.querySelectorAll('button');

        // Remove existing .btn-selected class from buttons
        buttons.forEach((btn) => btn.classList.remove('btn-selected'));

        // Add .btn-selected class to target button
        button.classList.add('btn-selected');
        
    }
};

// Event Listeners
window.addEventListener('scroll', () => requestAnimationFrame(handleScroll)); 
/* The requestAnimationFrame() method is used to optimize the performance of the handleScroll function during a scroll event. 

Why requestAnimationFrame() is used:

    Smooth Performance:
        Scroll events fire multiple times per second, which can overwhelm the browser if a heavy function like handleScroll is directly invoked.
        requestAnimationFrame() ensures that handleScroll is executed just before the next screen repaint, which aligns the function execution with the browser's rendering cycle, avoiding unnecessary intermediate computations.

    Frame Rate Optimization:
        Modern browsers typically refresh at 60 frames per second (fps). Using requestAnimationFrame(), the function runs at this frequency or less, making it more efficient than running on every scroll event, which might trigger far more often.

    Avoid Dropped Frames:
        Without requestAnimationFrame(), executing a heavy function for every scroll event can cause frame drops, leading to a laggy or jittery experience. By syncing with the browser's rendering cycle, this issue is minimized.

    Better Resource Management:
        It ensures that the handleScroll function does not execute more often than necessary, thereby reducing CPU usage and conserving battery life on devices.

*/

// Listen for exterior color button click
extColorBtns.addEventListener('click', handleColorBtnClick);

// Listen for interior color button click
intColorBtns.addEventListener('click', handleColorBtnClick); 