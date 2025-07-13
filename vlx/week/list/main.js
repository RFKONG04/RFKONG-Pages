// @RFKONG VLX Weekly list
const movieData = [
    {
        id: 1,
        title: "白蛇：浮生",
        imageUrl: "https://free-img.400040.xyz/4/2025/07/13/68738ec1c44b1.webp",
        director: "陈健喜 / 李佳锴",
        year: "2024",
        genre: "喜剧 / 爱情 / 动画 / 奇幻",
        rating: "7.0"
    },
    {
        id: 2,
        title: "荒野机器人",
        imageUrl: "https://free-img.400040.xyz/4/2025/07/13/68738ec343fdb.webp",
        director: "克里斯·桑德斯",
        year: "2024",
        genre: "科幻 / 动画 / 冒险",
        rating: "8.1"
    },
    {
        id: 3,
        title: "海蒂和爷爷",
        imageUrl: "https://free-img.400040.xyz/4/2025/07/13/68738ec496ceb.webp",
        director: "阿兰·葛斯彭纳",
        year: "2015",
        genre: "剧情 / 家庭 / 冒险",
        rating: "9.3"
    },
    {
        id: 4,
        title: "猫猫的奇幻漂流",
        imageUrl: "https://free-img.400040.xyz/4/2025/07/13/68738ec2ac850.webp",
        director: "金兹·兹巴洛迪斯",
        year: "2024",
        genre: "动画 / 奇幻 / 冒险",
        rating: "8.4"
    },
    {
        id: 5,
        title: "毒液：最后一舞",
        imageUrl: "https://free-img.400040.xyz/4/2025/07/13/68738ec51809c.webp",
        director: "凯莉·马塞尔",
        year: "2024",
        genre: "动作 / 科幻 / 惊悚 / 冒险",
        rating: "6.2"
    },
    {
        id: 6,
        title: "年会不能停！",
        imageUrl: "https://free-img.400040.xyz/4/2025/07/13/68738ec63b0c4.webp",
        director: "董润年",
        year: "2023",
        genre: "剧情 / 喜剧",
        rating: "8.1"
    },
    {
        id: 7,
        title: "好东西",
        imageUrl: "https://free-img.400040.xyz/4/2025/07/13/68738ec6cf39d.webp",
        director: "邵艺辉",
        year: "2024",
        genre: "剧情 / 爱情",
        rating: "8.9"
    },
    {
        id: 8,
        title: "“骗骗”喜欢你",
        imageUrl: "https://free-img.400040.xyz/4/2025/07/13/68738ec5ad8f3.webp",
        director: "苏彪",
        year: "2024",
        genre: "喜剧 / 爱情",
        rating: "6.4"
    },
    {
        id: 9,
        title: "哪吒之魔童降世",
        imageUrl: "https://free-img.400040.xyz/4/2025/07/13/68738ec0e76ec.webp",
        director: "饺子",
        year: "2019",
        genre: "剧情 / 喜剧 / 动画 / 奇幻",
        rating: "8.4"
    },
    {
        id: 10,
        title: "刺猬索尼克3",
        imageUrl: "https://free-img.400040.xyz/4/2025/07/13/68738f1f009ef.webp",
        director: "杰夫·福勒",
        year: "2024",
        genre: "喜剧 / 动作 / 科幻 / 动画",
        rating: "6.2"
    },
    {
        id: 11,
        title: "电幻国度",
        imageUrl: "https://free-img.400040.xyz/4/2025/07/13/68738f1cb818f.webp",
        director: "乔·罗素 / 安东尼·罗素",
        year: "2025",
        genre: "剧情 / 喜剧 / 动作 / 科幻 / 冒险",
        rating: "6.0"
    },
    {
        id: 12,
        title: "射雕英雄传：侠之大者",
        imageUrl: "https://free-img.400040.xyz/4/2025/07/13/68738f2008926.webp",
        director: "徐克",
        year: "2025",
        genre: "武侠",
        rating: "5.2"
    },
    {
        id: 13,
        title: "熊出没·重启未来",
        imageUrl: "https://free-img.400040.xyz/4/2025/07/13/68738f1ee417c.webp",
        director: "林永长 / 瞿才佳",
        year: "2025",
        genre: "剧情 / 喜剧 / 科幻 / 动画",
        rating: "7.1"
    },
    {
        id: 14,
        title: "唐探1900",
        imageUrl: "https://free-img.400040.xyz/4/2025/07/13/68738f1f89654.webp",
        director: "陈思诚 / 戴墨",
        year: "2025",
        genre: "喜剧 / 动作 / 悬疑",
        rating: "6.5"
    },
    {
        id: 15,
        title: "陈翔六点半之疯狂代号",
        imageUrl: "https://free-img.400040.xyz/4/2025/07/13/68738f1d77584.webp",
        director: "陈翔",
        year: "2025",
        genre: "喜剧 / 动作",
        rating: "6.7"
    },
    {
        id: 16,
        title: "国家元首",
        imageUrl: "https://free-img.400040.xyz/4/2025/07/13/68738f1e373a0.webp",
        director: "伊利亚·奈舒勒",
        year: "2025",
        genre: "喜剧 / 动作 / 惊悚",
        rating: "6.7"
    }
];
movieData.sort((a, b) => a.id - b.id);
function createMovieSlides() {
    const container = document.getElementById('movie-container');
    movieData.forEach(movie => {
        const slide = document.createElement('div');
        slide.className = 'swiper-slide';
        slide.style.backgroundImage = `url(${movie.imageUrl})`;
        const infoDiv = document.createElement('div');
        infoDiv.className = 'movie-info';
        const titleElement = document.createElement('h2');
        titleElement.textContent = movie.title;
        infoDiv.appendChild(titleElement);
        infoDiv.innerHTML += `
            <span class="director" title="导演">导演: ${movie.director}</span>
            <span class="year" title="年份">年份: ${movie.year}</span>
            <span class="genre" title="类型">类型: ${movie.genre}</span>
            <span class="rating" title="评分">评分: ${movie.rating}</span>
        `;
        slide.appendChild(infoDiv);
        container.appendChild(slide);
    });
}
document.addEventListener('DOMContentLoaded', function () {
    createMovieSlides();
    var swiper = new Swiper(".swiper", {
        effect: "coverflow",
        loop: true,
        grabCursor: true,
        centeredSlides: true,
        slidesPerView: "1",
        mousewheel: true,
        autoplay: {
            delay: 5000,
            disableOnInteraction: false
        },
        coverflowEffect: {
            rotate: 40,
            stretch: -10,
            depth: 80,
            modifier: 1,
            slideShadows: true
        },
        pagination: {
            el: ".swiper-pagination",
            clickable: true
        },
        breakpoints: {
            320: {
                slidesPerView: 1.1,
                spaceBetween: 8,
                coverflowEffect: {
                    rotate: 15,
                    stretch: -5,
                    depth: 40,
                    modifier: 1
                }
            },
            480: {
                slidesPerView: 1.3,
                spaceBetween: 12,
                coverflowEffect: {
                    rotate: 20,
                    stretch: -8,
                    depth: 60,
                    modifier: 1
                }
            },
            768: {
                slidesPerView: 1.8,
                spaceBetween: 18,
                coverflowEffect: {
                    rotate: 30,
                    stretch: -10,
                    depth: 70,
                    modifier: 1
                }
            },
            992: {
                slidesPerView: 2.5,
                spaceBetween: 22,
                coverflowEffect: {
                    rotate: 35,
                    stretch: -12,
                    depth: 80,
                    modifier: 1
                }
            },
            1200: {
                slidesPerView: 3,
                spaceBetween: 25
            },
            1400: {
                slidesPerView: 3.5,
                spaceBetween: 28
            }
        }
    });
});