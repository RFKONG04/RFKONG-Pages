document.addEventListener('DOMContentLoaded', () => {
    let art;

    const IMAGE_CONFIG = {
        posterBasePath: "./pic/",
        pageBackground: "web.webp"
    };

    const movies = [
        {
            id: 1,
            title: "国家元首",
            year: 2025,
            duration: "1h 56min",
            genres: ["喜剧", "动作", "惊悚"],
            rating: 6.7,
            votes: "5.8K",
            description: "英国首相和美国总统因公开争执导致两国联盟面临危机。然而，在成为某个强大势力的袭击目标后，他们必须联手军情六处的一名精英特工，以挫败威胁整个自由世界的阴谋。",
            cast: [
                { name: "伊德瑞斯·艾尔巴" },
                { name: "约翰·塞纳" },
                { name: "佩丽冉卡·曹帕拉" },
                { name: "帕迪·康斯戴恩" },
                { name: "卡拉·古奇诺" }
            ],
            posterImage: "post.webp",
            trailerUrl: "https://lz.qaiu.top/d/ce/pan.huang1111.cn_s_oXG1PT8",
            subtitleUrl: 'srt/set.vtt'
        }
    ];

    const pageBackground = document.getElementById('page-background');
    const movieBackgroundImage = document.getElementById('movie-background-image');
    const movieTitle = document.getElementById('movie-title');
    const movieYear = document.getElementById('movie-year');
    const movieDuration = document.getElementById('movie-duration');
    const movieGenres = document.getElementById('movie-genres');
    const movieStars = document.getElementById('movie-stars');
    const movieRating = document.getElementById('movie-rating');
    const movieVotes = document.getElementById('movie-votes');
    const movieDescription = document.getElementById('movie-description');
    const movieCast = document.getElementById('movie-cast');
    const watchTrailerBtn = document.getElementById('watch-trailer-btn');
    const mainFooter = document.querySelector('main.content-wrapper > footer');

    const playerOverlay = document.getElementById('player-container-overlay');
    const closePlayerBtn = document.getElementById('close-player-btn');
    const playPageContent = document.querySelector('.play-page-content');
    const playMovieTitle = document.getElementById('play-movie-title');
    const playMovieDescription = document.getElementById('play-movie-description');

    function populateMovieData(movie) {
        const fullPosterUrl = `${IMAGE_CONFIG.posterBasePath}${movie.posterImage}`;

        movieBackgroundImage.style.backgroundImage = `url(${fullPosterUrl})`;
        movieTitle.textContent = movie.title;
        movieYear.textContent = movie.year;
        movieDuration.textContent = movie.duration;
        movieRating.textContent = `${movie.rating}/10`;
        movieVotes.textContent = movie.votes;
        movieDescription.textContent = movie.description;

        movieGenres.innerHTML = '';
        movie.genres.forEach(genre => {
            const genreTag = document.createElement('span');
            genreTag.className = 'genre-tag';
            genreTag.textContent = genre;
            movieGenres.appendChild(genreTag);
        });

        movieCast.innerHTML = '';
        movie.cast.forEach(actor => {
            const castNameTag = document.createElement('span');
            castNameTag.className = 'cast-name-tag';
            castNameTag.textContent = actor.name;
            movieCast.appendChild(castNameTag);
        });

        movieStars.innerHTML = '';
        const totalStars = 5;
        const filledStars = Math.round(movie.rating / 2);
        for (let i = 0; i < totalStars; i++) {
            const starSvg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
            starSvg.setAttribute("class", i < filledStars ? "star star-filled" : "star star-empty");
            starSvg.setAttribute("viewBox", "0 0 24 24");
            starSvg.innerHTML = `<path d="M12 2l2.4 7.4h7.6l-6 4.6 2.3 7-6.3-4.6-6.3 4.6 2.3-7-6-4.6h7.6z"/>`;
            movieStars.appendChild(starSvg);
        }

        watchTrailerBtn.onclick = () => {
            if (art) {
                art.destroy();
            }

            playMovieTitle.textContent = movie.title;
            playMovieDescription.textContent = movie.description;

            const footerClone = mainFooter.cloneNode(true);
            playPageContent.appendChild(footerClone);

            art = new Artplayer({
                container: '#artplayer-container',
                url: movie.trailerUrl,
                poster: fullPosterUrl,
                title: movie.title,
                theme: '#61a0ffff',
                playbackRate: true,
                screenshot: true,
                hotkey: true,
                fullscreen: true,
                pip: true,
                autoplay: false,
                autoSize: false,
                aspectRatio: true,
                fullscreenWeb: true,
                autoOrientation: true,
                setting: true,
                subtitle: {
                    type: 'vtt',
                    style: {
                        color: '#ffffff',
                        fontSize: '23px',
                    },
                },
                settings: [
                    {
                        html: '字幕',
                        width: 250,
                        tooltip: '请选择',
                        selector: [
                            {
                                default: true,
                                html: '<span style="color:gray">中英双语</span>',
                                url: movie.subtitleUrl,
                            },
                        ],
                        onSelect: function (item, $dom, event) {
                            art.subtitle.url = item.url;
                            return item.html;
                        }
                    }
                ]
            });

            playerOverlay.classList.add('show');
        };
    }

    function closePlayer() {
        playerOverlay.classList.remove('show');
        if (art) {
            art.destroy();
            art = null;
        }
        const clonedFooter = playPageContent.querySelector('footer');
        if (clonedFooter) {
            playPageContent.removeChild(clonedFooter);
        }
    }

    closePlayerBtn.onclick = closePlayer;

    if (movies.length > 0) {
        const firstMovie = movies[0];
        pageBackground.style.backgroundImage = `url(${IMAGE_CONFIG.posterBasePath}${IMAGE_CONFIG.pageBackground})`;
        populateMovieData(firstMovie);
    }
});

/* @RFKONG 2025 周周公益 */