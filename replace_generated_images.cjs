const fs = require('fs');
let data = fs.readFileSync('src/data.ts', 'utf8');

const interiors = [
    'https://images.unsplash.com/photo-1497935586351-b67a49e012bf?w=800&q=80',
    'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=800&q=80',
    'https://images.unsplash.com/photo-1600093463592-8e36ae95ef56?w=800&q=80',
    'https://images.unsplash.com/photo-1525610553991-2bede1a236e2?w=800&q=80',
    'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&q=80',
    'https://images.unsplash.com/photo-1463797221720-6b07e6426c24?w=800&q=80',
    'https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=800&q=80',
    'https://images.unsplash.com/photo-1508424757105-b6d5ad9329d0?w=800&q=80',
    'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=800&q=80',
    'https://images.unsplash.com/photo-1559925393-8be0ec4767c8?w=800&q=80'
];

const food = [
    'https://images.unsplash.com/photo-1481833761820-0509d3217039?w=800&q=80',
    'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=800&q=80',
    'https://images.unsplash.com/photo-1497515114629-f71d768fd07c?w=800&q=80',
    'https://images.unsplash.com/photo-1511920170033-f8396924c348?w=800&q=80',
    'https://images.unsplash.com/photo-1453614512568-c4024d13c247?w=800&q=80',
    'https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=800&q=80',
    'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=800&q=80',
    'https://images.unsplash.com/photo-1513283250266-932baf9b8eec?w=800&q=80'
];

let intIdx = 0;
let foodIdx = 0;

function getNextInterior() {
    const img = interiors[intIdx % interiors.length];
    intIdx++;
    return img;
}

function getNextFood() {
    const img = food[foodIdx % food.length];
    foodIdx++;
    return img;
}

// Regex to find image: "/images/xyz.png"
data = data.replace(/"image": "\/images\/([a-zA-Z0-9_]+)\.png"/g, (match, filename) => {
    if (filename.includes('food') || filename.includes('matilda') || filename.includes('pancakes') || filename.includes('croissant')) {
        return `"image": "${getNextFood()}"`;
    }
    return `"image": "${getNextInterior()}"`;
});

// Regex to find "/images/xyz.png" in arrays
data = data.replace(/"\/images\/([a-zA-Z0-9_]+)\.png"/g, (match, filename) => {
    if (filename.includes('menu') || filename.includes('zmt_') || filename.includes('generic_logo')) {
        return match; // Don't replace menu cards, logos, or zomato default icons
    }
    if (filename.includes('food') || filename.includes('matilda') || filename.includes('pancakes') || filename.includes('croissant')) {
        return `"${getNextFood()}"`;
    }
    return `"${getNextInterior()}"`;
});

fs.writeFileSync('src/data.ts', data);
console.log('Successfully replaced all placeholder generated images with Unsplash stock photography!');
