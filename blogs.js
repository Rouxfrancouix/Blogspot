// Sample blog data (in a real application, this would come from a backend)
const blogData = [
    {
        id: 1,
        title: "The Future of Digital PR in 2024",
        category: "digital-pr",
        date: "2024-03-15",
        excerpt: "Explore the latest trends and innovations shaping the future of digital public relations...",
        image: "https://source.unsplash.com/400x300/?digital-marketing",
        author: {
            name: "Sarah Johnson",
            image: "https://source.unsplash.com/200x200/?portrait-1"
        },
        stats: {
            views: 1234,
            comments: 56
        }
    },
    // Add more blog entries here (50+ entries)
];

// Function to generate blog cards
function generateBlogCards(blogs) {
    const blogsGrid = document.querySelector('.blogs-grid');
    blogsGrid.innerHTML = '';

    blogs.forEach(blog => {
        const blogCard = document.createElement('article');
        blogCard.className = 'blog-card';
        blogCard.innerHTML = `
            <div class="blog-image">
                <img src="${blog.image}" alt="${blog.title}">
                <span class="blog-category">${blog.category.replace('-', ' ')}</span>
            </div>
            <div class="blog-content">
                <div class="blog-date">${formatDate(blog.date)}</div>
                <h3 class="blog-title">${blog.title}</h3>
                <p class="blog-excerpt">${blog.excerpt}</p>
                <div class="blog-meta">
                    <div class="blog-author">
                        <img src="${blog.author.image}" alt="${blog.author.name}" class="author-image">
                        <span class="author-name">${blog.author.name}</span>
                    </div>
                    <div class="blog-stats">
                        <span><i class="fas fa-eye"></i>${blog.stats.views}</span>
                        <span><i class="fas fa-comments"></i>${blog.stats.comments}</span>
                    </div>
                </div>
            </div>
        `;
        blogsGrid.appendChild(blogCard);
    });
}

// Format date
function formatDate(dateString) {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
}

// Filter and sort functionality
const categoryFilter = document.getElementById('category-filter');
const sortBy = document.getElementById('sort-by');

function filterAndSortBlogs() {
    let filteredBlogs = [...blogData];

    // Apply category filter
    const selectedCategory = categoryFilter.value;
    if (selectedCategory !== 'all') {
        filteredBlogs = filteredBlogs.filter(blog => blog.category === selectedCategory);
    }

    // Apply sorting
    const sortValue = sortBy.value;
    switch (sortValue) {
        case 'latest':
            filteredBlogs.sort((a, b) => new Date(b.date) - new Date(a.date));
            break;
        case 'oldest':
            filteredBlogs.sort((a, b) => new Date(a.date) - new Date(b.date));
            break;
        case 'popular':
            filteredBlogs.sort((a, b) => b.stats.views - a.stats.views);
            break;
    }

    generateBlogCards(filteredBlogs);
}

// Event listeners for filters
categoryFilter.addEventListener('change', filterAndSortBlogs);
sortBy.addEventListener('change', filterAndSortBlogs);

// Pagination functionality
const pageNumbers = document.querySelector('.page-numbers');
const prevPage = document.querySelector('.prev-page');
const nextPage = document.querySelector('.next-page');
let currentPage = 1;
const blogsPerPage = 9;

function updatePagination(totalBlogs) {
    const totalPages = Math.ceil(totalBlogs / blogsPerPage);
    pageNumbers.innerHTML = '';

    for (let i = 1; i <= totalPages; i++) {
        const pageNumber = document.createElement('span');
        pageNumber.textContent = i;
        if (i === currentPage) {
            pageNumber.classList.add('active');
        }
        pageNumber.addEventListener('click', () => {
            currentPage = i;
            filterAndSortBlogs();
            updatePagination(totalBlogs);
        });
        pageNumbers.appendChild(pageNumber);
    }
}

prevPage.addEventListener('click', () => {
    if (currentPage > 1) {
        currentPage--;
        filterAndSortBlogs();
        updatePagination(blogData.length);
    }
});

nextPage.addEventListener('click', () => {
    const totalPages = Math.ceil(blogData.length / blogsPerPage);
    if (currentPage < totalPages) {
        currentPage++;
        filterAndSortBlogs();
        updatePagination(blogData.length);
    }
});

// Search functionality
const searchInput = document.querySelector('.search-bar input');
const searchButton = document.querySelector('.search-bar button');

function searchBlogs() {
    const searchTerm = searchInput.value.trim().toLowerCase();
    if (searchTerm) {
        const filteredBlogs = blogData.filter(blog => 
            blog.title.toLowerCase().includes(searchTerm) ||
            blog.excerpt.toLowerCase().includes(searchTerm) ||
            blog.author.name.toLowerCase().includes(searchTerm)
        );
        generateBlogCards(filteredBlogs);
    } else {
        filterAndSortBlogs();
    }
}

searchButton.addEventListener('click', searchBlogs);
searchInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        searchBlogs();
    }
});

// Initialize the page
document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu functionality
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navMenu = document.querySelector('.nav-menu');

    mobileMenuBtn.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        const icon = mobileMenuBtn.querySelector('i');
        icon.classList.toggle('fa-bars');
        icon.classList.toggle('fa-times');
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!navMenu.contains(e.target) && !mobileMenuBtn.contains(e.target)) {
            navMenu.classList.remove('active');
            const icon = mobileMenuBtn.querySelector('i');
            icon.classList.add('fa-bars');
            icon.classList.remove('fa-times');
        }
    });

    // Close mobile menu when clicking on a link
    const navLinks = document.querySelectorAll('.nav-menu a');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            const icon = mobileMenuBtn.querySelector('i');
            icon.classList.add('fa-bars');
            icon.classList.remove('fa-times');
        });
    });

    // Filter functionality
    const filterButtons = document.querySelectorAll('.filter-btn');
    const blogCards = document.querySelectorAll('.blog-card');

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            button.classList.add('active');

            const filterValue = button.getAttribute('data-filter');

            blogCards.forEach(card => {
                if (filterValue === 'all' || card.getAttribute('data-category') === filterValue) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });

    // Pagination functionality
    const paginationButtons = document.querySelectorAll('.pagination-btn');
    const itemsPerPage = 9;
    const totalItems = blogCards.length;
    const totalPages = Math.ceil(totalItems / itemsPerPage);

    function showPage(pageNumber) {
        const start = (pageNumber - 1) * itemsPerPage;
        const end = start + itemsPerPage;

        blogCards.forEach((card, index) => {
            if (index >= start && index < end) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });

        // Update active state of pagination buttons
        paginationButtons.forEach(btn => {
            btn.classList.remove('active');
            if (btn.textContent === pageNumber.toString()) {
                btn.classList.add('active');
            }
        });
    }

    // Initialize first page
    showPage(1);

    // Add click event to pagination buttons
    paginationButtons.forEach(button => {
        button.addEventListener('click', () => {
            const pageNumber = parseInt(button.textContent);
            if (!isNaN(pageNumber)) {
                showPage(pageNumber);
            }
        });
    });

    // Search functionality
    const searchInput = document.querySelector('.search-bar input');
    const searchButton = document.querySelector('.search-bar button');

    searchButton.addEventListener('click', () => {
        const searchTerm = searchInput.value.trim().toLowerCase();
        if (searchTerm) {
            blogCards.forEach(card => {
                const title = card.querySelector('h3').textContent.toLowerCase();
                const content = card.querySelector('p').textContent.toLowerCase();
                if (title.includes(searchTerm) || content.includes(searchTerm)) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        } else {
            showPage(1); // Reset to first page if search is cleared
        }
    });

    searchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            searchButton.click();
        }
    });
}); 