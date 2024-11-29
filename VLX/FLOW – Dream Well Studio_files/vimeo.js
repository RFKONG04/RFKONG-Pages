    document.addEventListener('DOMContentLoaded', () => {
        const playButton = document.getElementById('trailer');
        const popup = document.getElementById('popup');
        const closeButton = document.getElementById('closeButton');
        const vimeoEmbed = document.getElementById('vimeoEmbed');
    
        playButton.addEventListener('click', () => {
            // Set the Vimeo embed URL
            vimeoEmbed.src = `http://wanyue-cloud.xbjstd.cn:5212/f/RM1HJ/inf.html`;
    
            // Show the popup
            popup.style.display = 'flex';
    
            // Disable scrolling
            document.body.style.overflow = 'hidden';
        });
    
        closeButton.addEventListener('click', () => {
            // Hide the popup and stop the video
            popup.style.display = 'none';
            vimeoEmbed.src = '';
    
            // Re-enable scrolling
            document.body.style.overflow = '';
        });
    
        // Close popup if clicking outside the content
        popup.addEventListener('click', (event) => {
            if (event.target === popup) {
                popup.style.display = 'none';
                vimeoEmbed.src = '';
    
                // Re-enable scrolling
                document.body.style.overflow = '';
            }
        });
    });
    