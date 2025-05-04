// DOM Elements
const baseSizeInput = document.getElementById('base-size');
const scaleRatioSelect = document.getElementById('scale-ratio');
const previewItems = document.querySelectorAll('.preview-item');
const moodInput = document.getElementById('mood-input');
const suggestFontsButton = document.getElementById('suggest-fonts');
const headingFontSpan = document.getElementById('heading-font');
const bodyFontSpan = document.getElementById('body-font');

// Font combinations based on mood
const fontCombinations = {
    calm: {
        heading: 'Playfair Display',
        body: 'Open Sans'
    },
    bold: {
        heading: 'Anton',
        body: 'Roboto'
    },
    playful: {
        heading: 'Quicksand',
        body: 'Comfortaa'
    },
    professional: {
        heading: 'Montserrat',
        body: 'Open Sans'
    },
    elegant: {
        heading: 'Playfair Display',
        body: 'Lora'
    },
    modern: {
        heading: 'Poppins',
        body: 'Inter'
    },
    friendly: {
        heading: 'Nunito',
        body: 'Source Sans Pro'
    },
    creative: {
        heading: 'Bebas Neue',
        body: 'Roboto'
    },
    minimal: {
        heading: 'Raleway',
        body: 'Work Sans'
    },
    tech: {
        heading: 'Space Grotesk',
        body: 'IBM Plex Sans'
    }
};

// Default fonts
let currentHeadingFont = 'Inter';
let currentBodyFont = 'Inter';

// Type scale calculation function
function calculateTypeScale(baseSize, ratio) {
    return {
        h1: baseSize * Math.pow(ratio, 5),
        h2: baseSize * Math.pow(ratio, 4),
        h3: baseSize * Math.pow(ratio, 3),
        h4: baseSize * Math.pow(ratio, 2),
        h5: baseSize * ratio,
        h6: baseSize,
        p: baseSize
    };
}

// Update preview elements with new sizes
function updateTypeScale() {
    const baseSize = parseFloat(baseSizeInput.value);
    const scaleRatio = parseFloat(scaleRatioSelect.value);
    
    // Calculate new sizes
    const sizes = calculateTypeScale(baseSize, scaleRatio);
    
    // Update each preview element
    previewItems.forEach(item => {
        const element = item.querySelector('h1, h2, h3, h4, h5, h6, p');
        const tagName = element.tagName.toLowerCase();
        const size = sizes[tagName];
        
        // Apply the new size
        element.style.fontSize = `${size}px`;
        
        // Update the preview label with the calculated size
        const label = item.querySelector('.preview-label');
        const originalLabel = label.textContent;
        label.textContent = `${originalLabel} (${Math.round(size * 10) / 10}px)`;
    });
}

// Load Google Fonts
function loadGoogleFonts(headingFont, bodyFont) {
    // Remove any existing Google Fonts links
    const existingLinks = document.querySelectorAll('link[href*="fonts.googleapis.com"]');
    existingLinks.forEach(link => link.remove());

    // Create new link for fonts
    const fontFamilies = [headingFont, bodyFont].join('&family=');
    const link = document.createElement('link');
    link.href = `https://fonts.googleapis.com/css2?family=${fontFamilies}:wght@400;500;600;700&display=swap`;
    link.rel = 'stylesheet';
    document.head.appendChild(link);
}

// Update fonts in preview
function updateFonts(headingFont, bodyFont) {
    // Update heading elements
    document.querySelectorAll('.preview-item h1, .preview-item h2, .preview-item h3, .preview-item h4, .preview-item h5, .preview-item h6').forEach(element => {
        element.style.fontFamily = `'${headingFont}', sans-serif`;
    });

    // Update paragraph elements
    document.querySelectorAll('.preview-item p').forEach(element => {
        element.style.fontFamily = `'${bodyFont}', sans-serif`;
    });

    // Update display
    headingFontSpan.textContent = headingFont;
    bodyFontSpan.textContent = bodyFont;
}

// Suggest fonts based on mood
function suggestFonts() {
    const mood = moodInput.value.toLowerCase().trim();
    let suggestedFonts;

    // Find matching mood or use default
    for (const [key, fonts] of Object.entries(fontCombinations)) {
        if (mood.includes(key)) {
            suggestedFonts = fonts;
            break;
        }
    }

    // If no match found, use default
    if (!suggestedFonts) {
        suggestedFonts = fontCombinations.modern;
    }

    // Load and apply new fonts
    loadGoogleFonts(suggestedFonts.heading, suggestedFonts.body);
    updateFonts(suggestedFonts.heading, suggestedFonts.body);
}

// Add event listeners
baseSizeInput.addEventListener('input', updateTypeScale);
scaleRatioSelect.addEventListener('change', updateTypeScale);
suggestFontsButton.addEventListener('click', suggestFonts);

// Initialize
updateTypeScale();
loadGoogleFonts(currentHeadingFont, currentBodyFont);
