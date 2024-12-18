// Define DOM Elements
const topBar = document.querySelector('#top-bar');
const extColorBtns = document.querySelector('#exterior-buttons');
const intColorBtns = document.querySelector('#interior-buttons');
const extImg = document.querySelector('#exterior-image');
const intImg = document.querySelector('#interior-image');
const wheelBtns = document.querySelector('#wheel-buttons');
const performanceBtn = document.querySelector('#performance-btn');
const totalPriceOutput = document.querySelector('#total-price');
const fullSelfDriveOption = document.querySelector('#full-self-driving-checkbox');
const accessoryCheckBoxes = document.querySelectorAll('.accessory-form-checkbox');
const downPayOutput = document.querySelector('#down-payment');
const monthlyPayOutput = document.querySelector('#monthly-payment');


// Globals

const basePrice = 52490;
let currentPrice = basePrice;

let selectedColor = 'Stealth Grey';


// Options

const selectedOptions = {
    'Performance Wheels': false,
    'Performance Package': false,
    'Full Self-Driving': false,
};

const pricing = {
    'Performance Wheels': 2500,
    'Performance Package': 5000,
    'Full Self-Driving': 8500,
    'Accessories': {
        'Center Console Trays': 35,
        'Sunshade': 105,
        'All-Weather Interior Liners': 225,
    }
};


const updateTotalPrice = () => {

    // Reset Current Price to Base Price
    currentPrice = basePrice;

    // Performance Wheels Option
    if(selectedOptions['Performance Wheels']){

        // If 'Performance Wheels' option is selected
        // Append 'Performance Wheels' price to current price
        currentPrice += pricing['Performance Wheels'];
    }

    // Performance Package Option
    if(selectedOptions['Performance Package']){

        // If 'Performance Package' option is selected
        // Append 'Performance Package' price to current price
        currentPrice += pricing['Performance Package'];
    }

    // Full Self-Driving Option
    if(selectedOptions['Full Self-Driving']){

        // If 'Full Self-Driving' option is selected
        // Append 'Full Self-Driving' price to current price
        currentPrice += pricing['Full Self-Driving'];
    }

    // Accessory Checkboxes
    accessoryCheckBoxes.forEach((checkbox) => {

        // Extract current accessory's label
        const accessoryLabel = checkbox
        .closest('label')  // Find the nearest <label> ancestor
        .querySelector('span') // Select only the first <span> element
        .textContent.trim(); // Get span text

    // Get price of current accessory 
    const accessoryPrice = pricing['Accessories'][accessoryLabel];

    // Add to current price if current accessory is selected
    if(checkbox.checked){
                currentPrice += accessoryPrice;
            }

    });

    // Update Total Price in UI
    totalPriceOutput.textContent = `$${currentPrice.toLocaleString()}`;

    // Calculate & Output down pay
    updatePaymentBreakdown();
};

// Update Payment Breakdown based on Current Price
const updatePaymentBreakdown = () => {

    // Calculate Down Payment
    const downPay = currentPrice * 0.1;
    downPayOutput.textContent = `$${downPay.toLocaleString()}`;

    // Calculate loan details (assuming 60-month & 3% interest rate)
    const loanMonths = 60;
    const interestRate = 0.03;
    const loanAmount = currentPrice - downPay;
    const monthlyInterestRate = interestRate / 12;

    // Calculate Monthly Payment with Formula 
    const monthlyPay = (loanAmount * (monthlyInterestRate * 
                            Math.pow(1 + monthlyInterestRate, loanMonths))) / 
                                (Math.pow(1 + monthlyInterestRate, loanMonths) - 1);
                            /* Math.pow() calculates the power of a number by raising a base to an exponent. 
                                Math.pow(base, exponent);  
                            */

    /* calculates the monthly payment for a loan, commonly referred to as an EMI (Equated Monthly Installment).  
    
    How It Works:

        Numerator:
        loanAmount × (monthlyInterestRate × (1 + monthlyInterestRate) ^ loanMonths)

            This calculates the growth of the principal amount due to compound interest over the loan term.

        Denominator:
        (1 + monthlyInterestRate) ^ loanMonths − 1

            This adjusts for the effect of the periodic payments reducing the outstanding principal over time.

        Result: 
        The division of the numerator by the denominator gives the fixed monthly payment amount.
    
    */

    // Output Monthly Payment
    monthlyPayOutput.textContent = `$${monthlyPay
                                        .toFixed(2) // Add 2 decimal places
                                        .toLocaleString()}`; // Format with 1000 separators


};

// Handle Top Bar On-Scroll
const handleScroll = () => {

    // Set atTop to true if page scrolled to the top
    const atTop =  window.scrollY === 0;
    topBar.classList.toggle('visible-bar', atTop ); // if atTop is true
    topBar.classList.toggle('hidden-bar', !atTop ); // if atTop is false 
};

// Image Mapping

// exteriorImages Array 
// Key 'alt name' : Value 'image location'
const exteriorImages = {
    'Stealth Grey':'images/model-y-stealth-grey.jpg',
    'Pearl White':'images/model-y-pearl-white.jpg',
    'Deep Blue':'images/model-y-deep-blue-metallic.jpg',
    'Solid Black':'images/model-y-solid-black.jpg',
    'Ultra Red':'images/model-y-ultra-red.jpg',
    'Quicksilver':'images/model-y-quicksilver.jpg',
}

// interiorImages Array 
const interiorImages = {
    Dark: './images/model-y-interior-dark.jpg',
    Light: './images/model-y-interior-light.jpg',
}

// Handle Color Selection
const handleColorBtnClick = (event) => {
    let button; // Initialize button
    console.log(event.target.tagName); // Log clicked tag name

    if(event.target.tagName === 'IMG'){
        // If img element is clicked, 
        // find the nearest button ancestor
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

        // Change Exterior Image
        if(event.currentTarget === extColorBtns){

            // If #extColorBtns element clicked
            // Get clicked button's color
            selectedColor = button.querySelector('img').alt;

            // Update External Image
            updateExtImage();
        }

        // Change Interior Image
        if(event.currentTarget === intColorBtns){
            // If #intColorBtns element clicked
            // Get clicked button's color
            const color = button.querySelector('img').alt;

        // Select interior image from array
            intImg.src = interiorImages[color];
        }
        
    }
};

// Update Exterior Image based on Color & Wheels
const updateExtImage = () => {

    // If 'Performance Wheels' option is true,
    // Set performanceSuffix to '-performance', otherwise to empty string
    const performanceSuffix = selectedOptions['Performance Wheels'] ? '-performance' :'';

    const colorKey = selectedColor in exteriorImages ? selectedColor : 'Stealth Grey';
        /* The expression 'selectedColor in exteriorImages' evaluates to true if selectedColor matches one of the keys in exteriorImages. Otherwise, colorKey is set to 'Stealth Grey'. */ 

    // Select Exterior Image based on Selected Color & Performance Suffix
    extImg.src = exteriorImages[colorKey].replace('.jpg', `${performanceSuffix}.jpg`)

}

// Wheel Selection
const handleWheelBtnClick = (event) => {
    if(event.target.tagName === 'BUTTON'){
        // If button element is clicked,
        // Get wheel buttons
        const buttons = document.querySelectorAll('#wheel-buttons button');

        // Loop Through buttons and Remove existing classes
        buttons.forEach((btn) => btn.classList.remove('bg-gray-700', 'text-white')); 

        // Add Removed classes to target button
        event.target.classList.add('bg-gray-700', 'text-white');

        // Set 'Performance Wheels' option to True
        // if target button text include 'Performance'
       selectedOptions['Performance Wheels'] = event.target.textContent.includes('Performance');

        // Update Exterior Image
        updateExtImage();

        // Get Total Price
        updateTotalPrice();
        
    }
};

// Performance Package Selection
const handlePerformanceBtnClick = () => {

    // isSelected is set to True if .bg-gray-700 class was added
    const isSelected = performanceBtn.classList.toggle('bg-gray-700');
    performanceBtn.classList.toggle('text-white');
    /* The .toggle() method, used on the classList property, adds or 
        removes a class from an element's list of classes. 
        
        Here's how it works:
        Behavior of .toggle():

        1. If the class is not present on the element:
            The method adds the specified class.

        2. If the class is already present on the element:
            The method removes the specified class.
            
        Optional Return Value:

        The method also returns a boolean:

            true if the class was added.
            false if the class was removed.
        */

    // Update Selected Options
    // Select option based if isSelected is True
    selectedOptions['Performance Package'] = isSelected;

    // Get Total Price
    updateTotalPrice();

};

// Full Self-Driving Selection
const fullSelfDriveMode = () => {

    // Select 'Full Self-Driving' option if
    // fullSelfDriveOption is checked
    selectedOptions['Full Self-Driving'] = fullSelfDriveOption.checked;

    // Get Total Price
    updateTotalPrice();

};

// Intialize updateTotalPrice()
updateTotalPrice();

// Event Listeners

// Listen for change events in accessory check boxes
accessoryCheckBoxes.forEach((checkbox) => {
    checkbox.addEventListener('change', () => updateTotalPrice())
});

// Listen for Scroll Event in Window
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

// Listen for wheel buttons click
wheelBtns.addEventListener('click', handleWheelBtnClick);

// Listen for performance button click
performanceBtn.addEventListener('click', handlePerformanceBtnClick);

// Listen for fullSelfDriveOption checkbox change
fullSelfDriveOption.addEventListener('change', fullSelfDriveMode);

