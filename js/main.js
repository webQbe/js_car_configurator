// Define DOM Elements
const topBar = document.querySelector('#top-bar');

// Handle Top Bar On-Scroll
const handleScroll = () => {

    // Set atTop to true if page scrolled to the top
    const atTop =  window.scrollY === 0;
    topBar.classList.toggle('visible-bar', atTop ); // if atTop is true
    topBar.classList.toggle('hidden-bar', !atTop ); // if atTop is false 

};

// Event Listeners
window.addEventListener('scroll', () => requestAnimationFrame(handleScroll)); /* The requestAnimationFrame() method is used to optimize the performance of the handleScroll function during a scroll event. 

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