// Lumina Towers - Interactive Application Engine

// Global State
let currentFloor = 5;
let selectedFlatId = null;
let currentSlideIndex = 0;
let galleryTimer = null;
let flatsData = [];

// Predefined configurations for 2 BHK layouts
const flatConfigurations = [
    {
        typeKey: 'urban',
        name: '2 BHK Urban Suite',
        area: '1,050 Sq Ft',
        carpet: '860 Sq Ft',
        basePrice: 285000,
        view: 'City East Skyline',
        parking: '1 Stilt Space',
        description: 'Compact and functional layout tailored for modern professionals, optimizing sunlit space and urban panoramas.',
        blueprintSvg: `
            <svg viewBox="0 0 400 300" width="100%" height="100%" style="background:#090a0f; border-radius:8px;">
                <!-- Grid Lines -->
                <defs>
                    <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
                        <path d="M 20 0 L 0 0 0 20" fill="none" stroke="rgba(255,255,255,0.03)" stroke-width="1"/>
                    </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#grid)" />
                <!-- Walls -->
                <path d="M 40 40 L 360 40 L 360 260 L 40 260 Z" fill="none" stroke="#636a7e" stroke-width="4" stroke-linejoin="round"/>
                <!-- Internal Dividers -->
                <path d="M 200 40 L 200 260 M 40 150 L 200 150 M 200 130 L 360 130" fill="none" stroke="#636a7e" stroke-width="3" />
                <path d="M 280 130 L 280 260" fill="none" stroke="#636a7e" stroke-width="3" />
                <!-- Labels -->
                <text x="120" y="95" fill="#f1f3f9" font-size="12" font-family="sans-serif" font-weight="bold" text-anchor="middle">LIVING ROOM</text>
                <text x="120" y="210" fill="#f1f3f9" font-size="11" font-family="sans-serif" text-anchor="middle">MASTER BEDROOM</text>
                <text x="280" y="90" fill="#f1f3f9" font-size="11" font-family="sans-serif" text-anchor="middle">BEDROOM 2</text>
                <text x="240" y="195" fill="#f1f3f9" font-size="10" font-family="sans-serif" text-anchor="middle">KITCHEN</text>
                <text x="325" y="195" fill="#f1f3f9" font-size="10" font-family="sans-serif" text-anchor="middle">TOILET</text>
                <!-- Balcony -->
                <rect x="40" y="15" width="100" height="25" fill="rgba(212,175,55,0.1)" stroke="#d4af37" stroke-width="1.5" stroke-dasharray="4" />
                <text x="90" y="31" fill="#d4af37" font-size="9" font-family="sans-serif" font-weight="bold" text-anchor="middle">SUN BALCONY</text>
                <!-- Architectural Symbols (Bed, Sofa outline) -->
                <rect x="50" y="180" width="50" height="60" rx="3" fill="none" stroke="#d4af37" stroke-width="1" opacity="0.4" />
                <rect x="290" y="55" width="40" height="50" rx="3" fill="none" stroke="#d4af37" stroke-width="1" opacity="0.4" />
                <path d="M 80 110 L 80 140 M 80 140 L 110 140" fill="none" stroke="#d4af37" stroke-width="1" opacity="0.4"/>
            </svg>`
    },
    {
        typeKey: 'comfort',
        name: '2 BHK Comfort Living',
        area: '1,150 Sq Ft',
        carpet: '950 Sq Ft',
        basePrice: 310000,
        view: 'Central Landscape Gardens',
        parking: '1 Stilt Space',
        description: 'Vastu-compliant architectural structure featuring cross-ventilation, overlooking the beautifully landscaped grounds.',
        blueprintSvg: `
            <svg viewBox="0 0 400 300" width="100%" height="100%" style="background:#090a0f; border-radius:8px;">
                <rect width="100%" height="100%" fill="url(#grid)" />
                <!-- Exterior Wall -->
                <path d="M 40 40 L 360 40 L 360 260 L 40 260 Z" fill="none" stroke="#636a7e" stroke-width="4" stroke-linejoin="round"/>
                <!-- Internal Dividers -->
                <path d="M 180 40 L 180 260 M 40 160 L 180 160 M 180 140 L 360 140 M 270 140 L 270 260" fill="none" stroke="#636a7e" stroke-width="3" />
                <!-- Labels -->
                <text x="110" y="100" fill="#f1f3f9" font-size="12" font-family="sans-serif" font-weight="bold" text-anchor="middle">LIVING & DINING</text>
                <text x="110" y="210" fill="#f1f3f9" font-size="11" font-family="sans-serif" text-anchor="middle">MASTER BEDROOM</text>
                <text x="270" y="90" fill="#f1f3f9" font-size="11" font-family="sans-serif" text-anchor="middle">BEDROOM 2</text>
                <text x="225" y="200" fill="#f1f3f9" font-size="10" font-family="sans-serif" text-anchor="middle">KITCHEN</text>
                <text x="315" y="200" fill="#f1f3f9" font-size="10" font-family="sans-serif" text-anchor="middle">TOILET</text>
                <!-- Balconies -->
                <rect x="40" y="15" width="90" height="25" fill="rgba(212,175,55,0.1)" stroke="#d4af37" stroke-width="1.5" stroke-dasharray="4" />
                <rect x="180" y="15" width="60" height="25" fill="rgba(212,175,55,0.1)" stroke="#d4af37" stroke-width="1.5" stroke-dasharray="4" />
                <text x="85" y="31" fill="#d4af37" font-size="9" font-family="sans-serif" font-weight="bold" text-anchor="middle">GARDEN BALCONY</text>
                <text x="210" y="31" fill="#d4af37" font-size="8" font-family="sans-serif" text-anchor="middle">BALCONY 2</text>
                <!-- Bed Layouts -->
                <rect x="50" y="185" width="50" height="55" fill="none" stroke="#d4af37" stroke-width="1" opacity="0.4" />
                <rect x="290" y="60" width="40" height="50" fill="none" stroke="#d4af37" stroke-width="1" opacity="0.4" />
            </svg>`
    },
    {
        typeKey: 'deluxe',
        name: '2 BHK Deluxe Executive',
        area: '1,250 Sq Ft',
        carpet: '1,020 Sq Ft',
        basePrice: 345000,
        view: 'Sunrise Boulevard & Plaza',
        parking: '1 Reserved Basment Bay',
        description: 'Spacious layout with double washrooms, separate dining alcove, walk-in closets, and wide sun-drenched balconies.',
        blueprintSvg: `
            <svg viewBox="0 0 400 300" width="100%" height="100%" style="background:#090a0f; border-radius:8px;">
                <rect width="100%" height="100%" fill="url(#grid)" />
                <!-- Exterior Wall -->
                <path d="M 30 40 L 370 40 L 370 260 L 30 260 Z" fill="none" stroke="#636a7e" stroke-width="4" stroke-linejoin="round"/>
                <!-- Internal Dividers -->
                <path d="M 220 40 L 220 260 M 30 140 L 220 140 M 220 120 L 370 120 M 300 120 L 300 260" fill="none" stroke="#636a7e" stroke-width="3" />
                <path d="M 120 140 L 120 260" fill="none" stroke="#636a7e" stroke-width="3" />
                <!-- Labels -->
                <text x="125" y="90" fill="#f1f3f9" font-size="12" font-family="sans-serif" font-weight="bold" text-anchor="middle">LIVING & LOUNGE</text>
                <text x="75" y="200" fill="#f1f3f9" font-size="11" font-family="sans-serif" text-anchor="middle">MASTER BED</text>
                <text x="170" y="200" fill="#f1f3f9" font-size="10" font-family="sans-serif" text-anchor="middle">WALK-IN</text>
                <text x="295" y="80" fill="#f1f3f9" font-size="11" font-family="sans-serif" text-anchor="middle">BEDROOM 2</text>
                <text x="260" y="190" fill="#f1f3f9" font-size="10" font-family="sans-serif" text-anchor="middle">KITCHEN</text>
                <text x="335" y="190" fill="#f1f3f9" font-size="10" font-family="sans-serif" text-anchor="middle">BATH 2</text>
                <!-- Balconies -->
                <rect x="30" y="12" width="110" height="28" fill="rgba(212,175,55,0.1)" stroke="#d4af37" stroke-width="1.5" stroke-dasharray="4" />
                <rect x="220" y="12" width="80" height="28" fill="rgba(212,175,55,0.1)" stroke="#d4af37" stroke-width="1.5" stroke-dasharray="4" />
                <!-- Beds -->
                <rect x="40" y="205" width="45" height="45" fill="none" stroke="#d4af37" stroke-width="1" opacity="0.4" />
                <rect x="310" y="55" width="40" height="45" fill="none" stroke="#d4af37" stroke-width="1" opacity="0.4" />
            </svg>`
    },
    {
        typeKey: 'executive',
        name: '2 BHK Horizon Penthouse',
        area: '1,380 Sq Ft',
        carpet: '1,120 Sq Ft',
        basePrice: 385000,
        view: 'Panoramic City Horizon',
        parking: '1 EV Charger Enabled Bay',
        description: 'Elite layout on premium top floors. Massive wrap-around private deck, modular kitchen utility zone, and dual vanity washrooms.',
        blueprintSvg: `
            <svg viewBox="0 0 400 300" width="100%" height="100%" style="background:#090a0f; border-radius:8px;">
                <rect width="100%" height="100%" fill="url(#grid)" />
                <!-- Exterior Wall -->
                <path d="M 30 30 L 370 30 L 370 270 L 30 270 Z" fill="none" stroke="#636a7e" stroke-width="4" stroke-linejoin="round"/>
                <!-- Dividers -->
                <path d="M 230 30 L 230 270 M 30 130 L 230 130 M 230 130 L 370 130 M 300 130 L 300 270" fill="none" stroke="#636a7e" stroke-width="3" />
                <path d="M 130 130 L 130 270" fill="none" stroke="#636a7e" stroke-width="3" />
                <!-- Labels -->
                <text x="130" y="80" fill="#f1f3f9" font-size="13" font-family="sans-serif" font-weight="bold" text-anchor="middle">GRAND LIVING HALL</text>
                <text x="80" y="200" fill="#f1f3f9" font-size="11" font-family="sans-serif" text-anchor="middle">MASTER SUITE</text>
                <text x="180" y="200" fill="#f1f3f9" font-size="11" font-family="sans-serif" text-anchor="middle">LUXE BATH</text>
                <text x="300" y="80" fill="#f1f3f9" font-size="11" font-family="sans-serif" text-anchor="middle">BEDROOM 2</text>
                <text x="265" y="195" fill="#f1f3f9" font-size="10" font-family="sans-serif" text-anchor="middle">KITCHEN</text>
                <text x="335" y="195" fill="#f1f3f9" font-size="10" font-family="sans-serif" text-anchor="middle">BATH 2</text>
                <!-- Wide Wrap-Around Deck -->
                <path d="M 30 15 L 370 15 L 385 30 L 385 270" fill="none" stroke="#d4af37" stroke-width="1.5" stroke-dasharray="4" />
                <rect x="30" y="5" width="340" height="15" fill="rgba(212,175,55,0.1)" stroke="#d4af37" stroke-width="1.5" stroke-dasharray="3" />
                <text x="200" y="14" fill="#d4af37" font-size="8" font-family="sans-serif" font-weight="bold" text-anchor="middle">PANORAMIC SKY DECK</text>
                <!-- Furniture placement -->
                <rect x="40" y="210" width="50" height="50" fill="none" stroke="#d4af37" stroke-width="1" opacity="0.4" />
                <rect x="310" y="60" width="45" height="45" fill="none" stroke="#d4af37" stroke-width="1" opacity="0.4" />
            </svg>`
    }
];

// Initialize and Generate 40 Flats data (5 Floors x 8 Flats)
function initializeFlatsData() {
    flatsData = [];
    
    // Status distribution mapping
    // Floor 5 will have more reserved/sold (exclusivity), floors 1-3 will be standard
    const flatStatusMapping = {
        1: ['available', 'available', 'sold', 'available', 'reserved', 'sold', 'available', 'available'],
        2: ['available', 'sold', 'sold', 'available', 'available', 'reserved', 'available', 'sold'],
        3: ['reserved', 'available', 'available', 'sold', 'available', 'sold', 'available', 'available'],
        4: ['available', 'available', 'sold', 'reserved', 'available', 'available', 'sold', 'reserved'],
        5: ['available', 'reserved', 'sold', 'available', 'sold', 'reserved', 'available', 'available']
    };

    for (let floor = 1; floor <= 5; floor++) {
        for (let unit = 1; unit <= 8; unit++) {
            const flatNumber = floor * 100 + unit;
            
            // Choose configuration based on flat number index
            // Unit 1-2: Urban, Unit 3-4: Comfort, Unit 5-6: Deluxe, Unit 7-8: Executive (Penthouse)
            let configIndex = 0;
            if (unit === 3 || unit === 4) configIndex = 1;
            else if (unit === 5 || unit === 6) configIndex = 2;
            else if (unit === 7 || unit === 8) configIndex = 3;
            
            const config = flatConfigurations[configIndex];
            
            // Incremental pricing based on floors (higher floor = higher premium)
            const floorPremium = (floor - 1) * 7500;
            const finalPrice = config.basePrice + floorPremium;
            
            const status = flatStatusMapping[floor][unit - 1];

            flatsData.push({
                id: flatNumber,
                floor: floor,
                unit: unit,
                name: `${config.name} #${flatNumber}`,
                type: config.name,
                area: config.area,
                carpet: config.carpet,
                price: finalPrice,
                view: config.view,
                parking: config.parking,
                description: config.description,
                status: status,
                blueprint: config.blueprintSvg
            });
        }
    }
}

// Render the grid of flats for the active floor
function renderFloorGrid(floorNum) {
    const gridContainer = document.getElementById('floor-layout-container');
    const floorTitle = document.getElementById('floor-plan-title');
    
    // Clear grid
    gridContainer.innerHTML = '';
    
    // Set floor title
    const floorDescriptions = {
        1: "Floor 1 (Garden Terrace Residences)",
        2: "Floor 2 (Standard Premium Residences)",
        3: "Floor 3 (Standard Premium Residences)",
        4: "Floor 4 (Premium Executive Residences)",
        5: "Floor 5 (Horizon Penthouse Suites)"
    };
    floorTitle.textContent = floorDescriptions[floorNum];
    
    // Filter flats for active floor
    const currentFlats = flatsData.filter(flat => flat.floor === parseInt(floorNum));
    
    currentFlats.forEach(flat => {
        const card = document.createElement('div');
        card.className = `flat-card state-${flat.status}`;
        card.id = `flat-card-${flat.id}`;
        card.setAttribute('data-id', flat.id);
        
        card.innerHTML = `
            <div class="flat-card-header">
                <span class="flat-number-label">${flat.id}</span>
                <span class="flat-tag">${flat.status}</span>
            </div>
            <div class="flat-card-body">
                <div class="flat-type-label">${flat.type}</div>
                <div class="flat-price-label">${formatCurrency(flat.price)}</div>
            </div>
        `;
        
        // Add Event Listeners
        card.addEventListener('mouseenter', () => handleFlatHover(flat));
        card.addEventListener('mouseleave', handleFlatHoverLeave);
        card.addEventListener('click', () => handleFlatClick(flat));
        
        gridContainer.appendChild(card);
    });
}

// Flat interactions handlers
function handleFlatHover(flat) {
    const previewCard = document.getElementById('flat-preview-card');
    const placeholder = document.getElementById('preview-placeholder-text');
    const details = document.getElementById('preview-details-content');
    
    // Update labels
    document.getElementById('prev-flat-id').textContent = `Residence ${flat.id}`;
    document.getElementById('prev-flat-type').textContent = flat.type;
    document.getElementById('prev-flat-area').textContent = flat.area;
    document.getElementById('prev-flat-view').textContent = flat.view;
    document.getElementById('prev-flat-price').textContent = formatCurrency(flat.price);
    
    const statusBadge = document.getElementById('prev-flat-status');
    statusBadge.textContent = flat.status;
    statusBadge.className = `status-badge ${flat.status}`;
    
    // Transition classes
    placeholder.classList.add('hidden');
    details.classList.remove('hidden');
    
    // Set temp selected ID for "View details" button inside preview
    previewCard.setAttribute('data-target-flat', flat.id);
}

function handleFlatHoverLeave() {
    // Keep the details displayed of the last hovered or selected unit, do not clear instantly
}

function handleFlatClick(flat) {
    // If flat is sold out, show alert toast instead of opening modal
    if (flat.status === 'sold') {
        showToast("This residence is sold out. Select an available flat to view blueprints and enquire.", "warning");
        return;
    }
    
    // Save state
    selectedFlatId = flat.id;
    
    // Highlight flat card active state
    document.querySelectorAll('.flat-card').forEach(c => c.classList.remove('active-selected'));
    const activeCard = document.getElementById(`flat-card-${flat.id}`);
    if (activeCard) activeCard.classList.add('active-selected');
    
    // Open detailed Modal
    openDetailedModal(flat);
}

// Open and populate blueprint detail modal
function openDetailedModal(flat) {
    const modal = document.getElementById('flat-detail-modal');
    
    // Update elements
    document.getElementById('modal-flat-id').textContent = `Residence ${flat.id}`;
    document.getElementById('modal-flat-id-label').textContent = flat.id;
    document.getElementById('modal-flat-type').textContent = flat.type;
    document.getElementById('modal-flat-area').textContent = flat.area;
    document.getElementById('modal-flat-carpet').textContent = flat.carpet;
    document.getElementById('modal-flat-view').textContent = flat.view;
    document.getElementById('modal-flat-price').textContent = formatCurrency(flat.price);
    
    const modalStatus = document.getElementById('modal-flat-status');
    modalStatus.textContent = flat.status;
    modalStatus.className = `status-badge ${flat.status}`;
    
    // Set SVG blueprint
    const svgHolder = document.getElementById('blueprint-svg-holder');
    svgHolder.innerHTML = flat.blueprint;
    
    // Configure enquiry triggers
    const enquiryBtn = document.getElementById('btn-modal-enquire');
    enquiryBtn.onclick = () => {
        closeModal();
        prefillContactForm(flat.id);
        const contactSection = document.getElementById('contact');
        if (contactSection) {
            contactSection.scrollIntoView({ behavior: 'smooth' });
        }
    };
    
    const calcBtn = document.getElementById('btn-modal-calc');
    calcBtn.onclick = () => {
        closeModal();
        prefillMortgageCalculator(flat.id);
        const calcSection = document.getElementById('calculator');
        if (calcSection) {
            calcSection.scrollIntoView({ behavior: 'smooth' });
        }
    };

    // Open Modal Overlay
    modal.classList.add('open');
    document.body.style.overflow = 'hidden'; // Lock background scroll
}

function closeModal() {
    const modal = document.getElementById('flat-detail-modal');
    modal.classList.remove('open');
    document.body.style.overflow = ''; // Unlock scroll
}

// Pre-fill Forms functions
function prefillContactForm(flatId) {
    const dropdown = document.getElementById('form-unit-interest');
    if (dropdown) {
        dropdown.value = flatId;
    }
    const messageInput = document.getElementById('form-message');
    if (messageInput) {
        messageInput.value = `Hello, I am interested in booking a site tour for the 2 BHK unit Residence ${flatId}. Please let me know available slots.`;
    }
}

function prefillMortgageCalculator(flatId) {
    const calcSelector = document.getElementById('calc-flat-selector');
    if (calcSelector) {
        calcSelector.value = flatId;
        // Trigger select change handler to recalculate inputs
        handleCalculatorFlatSelect(flatId);
    }
}

// Mortgage Calculator Core Calculations
function setupMortgageCalculator() {
    const priceSlider = document.getElementById('input-purchase-price');
    const downSlider = document.getElementById('input-down-payment');
    const interestSlider = document.getElementById('input-interest-rate');
    const termSlider = document.getElementById('input-loan-term');
    
    const priceVal = document.getElementById('val-purchase-price');
    const downVal = document.getElementById('val-down-payment');
    const interestVal = document.getElementById('val-interest-rate');
    const termVal = document.getElementById('val-loan-term');

    // Populate dropdown with available units
    const calcSelector = document.getElementById('calc-flat-selector');
    
    // Sort flats by ID ascending
    const sortedFlats = [...flatsData].sort((a,b) => a.id - b.id);
    sortedFlats.forEach(flat => {
        if (flat.status !== 'sold') {
            const opt = document.createElement('option');
            opt.value = flat.id;
            opt.textContent = `Residence ${flat.id} - ${flat.type} (${formatCurrency(flat.price)})`;
            calcSelector.appendChild(opt);
        }
    });

    // Event listener for dropdown selection
    calcSelector.addEventListener('change', (e) => {
        if (e.target.value !== 'custom') {
            handleCalculatorFlatSelect(e.target.value);
        }
    });

    // Main recalculate function
    function updateCalculations() {
        const price = parseInt(priceSlider.value);
        const downPayment = parseInt(downSlider.value);
        const annualRate = parseFloat(interestSlider.value);
        const termYears = parseInt(termSlider.value);

        // Update Slider Labels
        priceVal.textContent = formatCurrency(price);
        interestVal.textContent = `${annualRate}%`;
        termVal.textContent = `${termYears} Years`;

        // Validation: Down payment can't exceed purchase price
        // Set maximum range dynamically
        downSlider.max = price - 10000;
        if (downPayment >= price) {
            downSlider.value = price * 0.2;
        }
        
        // Calculate dynamic down payment percentage label
        const downPct = Math.round((downSlider.value / price) * 100);
        downVal.textContent = `${formatCurrency(downSlider.value)} (${downPct}%)`;

        // Calculation variables
        const principal = price - downSlider.value;
        const monthlyRate = annualRate / 12 / 100;
        const totalPayments = termYears * 12;

        let monthlyPayment = 0;
        if (monthlyRate === 0) {
            monthlyPayment = principal / totalPayments;
        } else {
            monthlyPayment = principal * (monthlyRate * Math.pow(1 + monthlyRate, totalPayments)) / (Math.pow(1 + monthlyRate, totalPayments) - 1);
        }

        const totalCostOfLoan = monthlyPayment * totalPayments;
        const totalInterestPaid = totalCostOfLoan - principal;

        // Render Outputs
        document.getElementById('calc-monthly-payment').textContent = formatCurrency(Math.round(monthlyPayment));
        document.getElementById('calc-loan-amount').textContent = formatCurrency(principal);
        document.getElementById('calc-total-interest').textContent = formatCurrency(Math.round(totalInterestPaid));
        document.getElementById('calc-total-payment').textContent = formatCurrency(Math.round(totalCostOfLoan));
    }

    // Add slider input change listeners
    priceSlider.addEventListener('input', () => {
        calcSelector.value = 'custom'; // Switch to custom if manual adjustments
        updateCalculations();
    });
    downSlider.addEventListener('input', updateCalculations);
    interestSlider.addEventListener('input', updateCalculations);
    termSlider.addEventListener('input', updateCalculations);

    // Initial update run
    updateCalculations();
}

function handleCalculatorFlatSelect(flatId) {
    const flat = flatsData.find(f => f.id === parseInt(flatId));
    if (flat) {
        const priceSlider = document.getElementById('input-purchase-price');
        const downSlider = document.getElementById('input-down-payment');
        
        // Set values
        priceSlider.value = flat.price;
        // Default 20% down payment
        downSlider.max = flat.price - 10000;
        downSlider.value = Math.round(flat.price * 0.2);
        
        // Fire input event
        priceSlider.dispatchEvent(new Event('input'));
    }
}

// Portfolio Slideshow Gallery
function setupGallerySlider() {
    const slidesContainer = document.getElementById('gallery-slides-container');
    const slides = document.querySelectorAll('.gallery-slide');
    const dotsContainer = document.getElementById('slider-dots-container');
    const prevBtn = document.getElementById('slider-prev-btn');
    const nextBtn = document.getElementById('slider-next-btn');
    
    if (!slidesContainer) return;

    // Refresh Dots Click handlers
    const dots = document.querySelectorAll('.slider-dot');
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            goToSlide(index);
            resetSliderTimer();
        });
    });

    prevBtn.addEventListener('click', () => {
        goToPrevSlide();
        resetSliderTimer();
    });

    nextBtn.addEventListener('click', () => {
        goToNextSlide();
        resetSliderTimer();
    });

    function goToSlide(index) {
        slides.forEach(slide => slide.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active'));
        
        currentSlideIndex = index;
        slides[currentSlideIndex].classList.add('active');
        dots[currentSlideIndex].classList.add('active');
    }

    function goToNextSlide() {
        let index = currentSlideIndex + 1;
        if (index >= slides.length) index = 0;
        goToSlide(index);
    }

    function goToPrevSlide() {
        let index = currentSlideIndex - 1;
        if (index < 0) index = slides.length - 1;
        goToSlide(index);
    }

    // Auto rotate slides
    function startSliderTimer() {
        galleryTimer = setInterval(goToNextSlide, 6000);
    }

    function resetSliderTimer() {
        clearInterval(galleryTimer);
        startSliderTimer();
    }

    // Initialize auto play
    startSliderTimer();
}

// Global UI Form submissions and Event Listeners
function setupGlobalEvents() {
    // Header scrolled transformation
    const header = document.getElementById('main-header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
        
        // Update Nav Menu active section indicator
        updateActiveNavSection();
    });

    // Hero scroll down button
    const scrollBtn = document.getElementById('hero-scroll-btn');
    if (scrollBtn) {
        scrollBtn.addEventListener('click', () => {
            const visualizerSection = document.getElementById('visualizer');
            if (visualizerSection) {
                visualizerSection.scrollIntoView({ behavior: 'smooth' });
            }
        });
    }

    // Mobile navigation drawer toggle
    const menuToggle = document.getElementById('mobile-menu-toggle');
    const mobileDrawer = document.getElementById('mobile-drawer-menu');
    
    if (menuToggle && mobileDrawer) {
        menuToggle.addEventListener('click', () => {
            menuToggle.classList.toggle('active');
            mobileDrawer.classList.toggle('open');
            document.body.classList.toggle('no-scroll');
        });

        // Close mobile drawer on link clicks
        const mobLinks = document.querySelectorAll('.mobile-nav-link');
        mobLinks.forEach(link => {
            link.addEventListener('click', () => {
                menuToggle.classList.remove('active');
                mobileDrawer.classList.remove('open');
                document.body.classList.remove('no-scroll');
            });
        });
    }

    // Modal Close Triggers
    const closeModalBtn = document.getElementById('modal-close-trigger');
    const modalOverlay = document.getElementById('flat-detail-modal');
    
    if (closeModalBtn) closeModalBtn.addEventListener('click', closeModal);
    if (modalOverlay) {
        modalOverlay.addEventListener('click', (e) => {
            if (e.target === modalOverlay) closeModal();
        });
    }

    // Populate contact dropdown selector list with non-sold flats
    const contactSelector = document.getElementById('form-unit-interest');
    if (contactSelector) {
        // Sort flats by ID ascending
        const sortedFlats = [...flatsData].sort((a,b) => a.id - b.id);
        sortedFlats.forEach(flat => {
            if (flat.status !== 'sold') {
                const opt = document.createElement('option');
                opt.value = flat.id;
                opt.textContent = `Residence ${flat.id} (Floor ${flat.floor})`;
                contactSelector.appendChild(opt);
            }
        });
    }

    // Contact/Booking Form Submission
    const contactForm = document.getElementById('booking-request-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const selectedUnit = contactSelector.value;
            const name = document.getElementById('form-name').value;
            const unitText = selectedUnit === 'none' ? 'General Consultation' : `Residence ${selectedUnit}`;

            // Reset form
            contactForm.reset();
            
            // Toast Success
            showToast(`Thank you, ${name}! Your viewing request for ${unitText} has been registered. An advisor will contact you within 2 hours.`, "success");
        });
    }

    // Mortgage Apply Form Submission Button
    const applyMortgageBtn = document.getElementById('btn-calc-apply');
    if (applyMortgageBtn) {
        applyMortgageBtn.addEventListener('click', () => {
            const selectValue = document.getElementById('calc-flat-selector').value;
            let targetMsg = "General Finance Inquiry";
            if (selectValue !== 'custom') {
                targetMsg = `Residence ${selectValue}`;
                prefillContactForm(selectValue);
            }
            
            // Scroll to contact form
            const contactSection = document.getElementById('contact');
            if (contactSection) {
                contactSection.scrollIntoView({ behavior: 'smooth' });
                showToast(`Mortgage application pre-filled for ${targetMsg}. Please fill your contact details to submit quote request.`, "success");
            }
        });
    }

    // Quick Action button in Hover preview
    const viewFlatDetailsBtn = document.getElementById('btn-view-flat-details');
    if (viewFlatDetailsBtn) {
        viewFlatDetailsBtn.addEventListener('click', () => {
            const previewCard = document.getElementById('flat-preview-card');
            const flatId = previewCard.getAttribute('data-target-flat');
            if (flatId) {
                const flat = flatsData.find(f => f.id === parseInt(flatId));
                if (flat) handleFlatClick(flat);
            }
        });
    }

    // Floor Selector buttons
    const floorButtons = document.querySelectorAll('.floor-btn');
    floorButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            floorButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            currentFloor = btn.getAttribute('data-floor');
            renderFloorGrid(currentFloor);
        });
    });
}

// Active Nav highlight indicator on scroll
function updateActiveNavSection() {
    const sections = ['hero', 'visualizer', 'amenities', 'calculator', 'gallery', 'contact'];
    const navLinks = document.querySelectorAll('.nav-link');
    
    let scrollPosition = window.scrollY + 100;
    
    sections.forEach(secId => {
        const el = document.getElementById(secId);
        if (el) {
            const top = el.offsetTop;
            const height = el.offsetHeight;
            
            if (scrollPosition >= top && scrollPosition < top + height) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${secId}`) {
                        link.classList.add('active');
                    }
                });
            }
        }
    });
}

// Custom Premium Toast Notification System
function showToast(message, type = "success") {
    const toast = document.getElementById('notification-toast');
    const toastMsg = document.getElementById('toast-message-text');
    
    // Set text
    toastMsg.textContent = message;
    
    // Update theme
    if (type === "warning") {
        toast.style.background = "#f59e0b";
        toast.style.boxShadow = "0 10px 25px rgba(245, 158, 11, 0.3)";
    } else {
        toast.style.background = "#10b981";
        toast.style.boxShadow = "0 10px 25px rgba(16, 185, 129, 0.3)";
    }
    
    // Show Toast
    toast.classList.add('show');
    
    // Auto hide
    setTimeout(() => {
        toast.classList.remove('show');
    }, 4500);
}

// Helper: Format price value to local dollar representation
function formatCurrency(number) {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        maximumFractionDigits: 0
    }).format(number);
}

// Application Startup
document.addEventListener('DOMContentLoaded', () => {
    initializeFlatsData();
    
    // Render initial grid (Floor 5 Penthouse active by default)
    renderFloorGrid(currentFloor);
    
    // Setup controls
    setupMortgageCalculator();
    setupGallerySlider();
    setupGlobalEvents();
});
