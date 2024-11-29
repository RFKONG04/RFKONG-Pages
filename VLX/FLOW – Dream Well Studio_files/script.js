    // Function to hide the loader and restore scrolling
    function hideLoader() {
        const loader = document.getElementById('loader');

        // Start fading out the loader
        loader.style.opacity = '0';

        // Wait for the opacity transition to complete
        setTimeout(function() {
            // Hide the loader completely
            loader.style.display = 'none';

            // Restore scrolling after loader is hidden
            document.body.style.overflow = 'auto';
        }, 500); // Wait for the 500ms transition to finish
    }

    // Wait for the page to fully load
    window.onload = function() {
        // Disable scrolling while loader is visible
        document.body.style.overflow = 'hidden';

        // Hide the loader after 3 seconds
        setTimeout(hideLoader, 2000); // Initial delay (3000ms or 3 seconds)
    };


        function updateElementStyles() {
            // Select all images with the classes "cat" and "city"
            const images = document.querySelectorAll('.cat, .city'); 
            const logo = document.querySelector('.logo');
        
            // Define transition ranges for image bottom values
            const minWidth = 600;  // Minimum width (px) for transition
            const midWidth = 1200; // Midpoint for transition (px)
            const maxWidth = 1710; // Maximum width (px) for transition
        
            // Get the current window width
            const currentWidth = window.innerWidth;
        
            // Ensure currentWidth is within the minWidth and maxWidth range
            const clampedWidth = Math.max(minWidth, Math.min(maxWidth, currentWidth));
        
            images.forEach(img => {
                const isCat = img.classList.contains('cat');
                const isCity = img.classList.contains('city');
        
                let maxBottom;
                let minBottom;
                let bottomValue;
        
                if (isCat) {
                    if (clampedWidth > midWidth) {
                        // For widths greater than 1200px
                        img.style.top = '25vh';   // Fixed top position
                        img.style.bottom = '0';   // Stick to the bottom
                        return; // Skip further calculations as `top` is set
                    } else {
                        // Transition from 1200px to 600px
                        img.style.top = 'auto'; // Remove the top positioning
                        maxBottom = -28;   // Bottom value at 1200px and below
                        minBottom = -1;  // Bottom value at 600px (in vh)
                        bottomValue = ((clampedWidth - minWidth) / (midWidth - minWidth)) * (maxBottom - minBottom) + minBottom;
                        img.style.bottom = bottomValue + 'vh';
                    }
                } else if (isCity) {
                    // Transition from 600px to 1710px
                    maxBottom = -31; // Maximum bottom value (in vh) for .city
                    minBottom = 8;   // Minimum bottom value (in vh) for .city
                    bottomValue = ((clampedWidth - minWidth) / (maxWidth - minWidth)) * (maxBottom - minBottom) + minBottom;
                    img.style.bottom = bottomValue + 'vh';
                }
            });
        
            if (logo) {
                let logoWidth;
                if (clampedWidth <= midWidth) {
                    // Transition from 600px to 1200px
                    const logoMinWidth = 70; // Width at 600px (percentage)
                    const logoMidWidth = 25; // Width at 1200px (percentage)
                    logoWidth = ((clampedWidth - minWidth) / (midWidth - minWidth)) * (logoMidWidth - logoMinWidth) + logoMinWidth;
                } else {
                    // Transition from 1200px to 1710px
                    const logoMidWidth = 25; // Width at 1200px (percentage)
                    const logoMaxWidth = 20; // Width at 1710px (percentage)
                    logoWidth = ((clampedWidth - midWidth) / (maxWidth - midWidth)) * (logoMaxWidth - logoMidWidth) + logoMidWidth;
                }
        
                // Set the new width value in percentage
                logo.style.width = logoWidth + '%';
            }
        }
        
        // Add event listeners for initial load and window resize
        window.addEventListener('load', updateElementStyles);
        window.addEventListener('resize', updateElementStyles);