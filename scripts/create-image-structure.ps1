# Create main directories
New-Item -ItemType Directory -Force -Path @(
    "public/images",
    "public/images/products",
    "public/images/testimonials",
    "public/images/heritage",
    "public/images/blog",
    "public/images/team",
    "public/images/instagram"
)

# Create placeholder files
$files = @(
    "public/images/jewelry-1.jpg",
    "public/images/jewelry-2.jpg",
    "public/images/jewelry-3.jpg",
    "public/images/jewelry-4.jpg",
    "public/images/jewelry-5.jpg",
    "public/images/jewelry-6.jpg",
    "public/images/collection-rings.jpg",
    "public/images/collection-necklaces.jpg",
    "public/images/collection-earrings.jpg",
    "public/images/products/ring-1.jpg",
    "public/images/products/ring-2.jpg",
    "public/images/products/necklace-1.jpg",
    "public/images/products/necklace-2.jpg",
    "public/images/products/earrings-1.jpg",
    "public/images/products/bracelet-1.jpg",
    "public/images/testimonials/customer-1.jpg",
    "public/images/heritage/craft-1.jpg",
    "public/images/heritage/craft-2.jpg",
    "public/images/heritage/craft-3.jpg",
    "public/images/heritage/craft-4.jpg",
    "public/images/blog/layering-necklaces.jpg",
    "public/images/blog/diamond-clarity.jpg",
    "public/images/blog/spring-trends.jpg",
    "public/images/team/emma.jpg",
    "public/images/team/michael.jpg",
    "public/images/team/sophie.jpg",
    "public/images/instagram/post-1.jpg",
    "public/images/instagram/post-2.jpg",
    "public/images/instagram/post-3.jpg",
    "public/images/instagram/post-4.jpg",
    "public/images/instagram/post-5.jpg",
    "public/images/instagram/post-6.jpg"
)

foreach ($file in $files) {
    New-Item -ItemType File -Force -Path $file
}

Write-Host "Directory structure and placeholder files created successfully!" 