const fs = require('fs');

const populateImageData = (start, end) => {
  const result = [];
  for (let i = start; i < end; i += 1) {
    let rows = [];
    for (let j = 0; j < 5; j += 1) {
      rows.push([i, j, `https://s3-us-west-1.amazonaws.com/imagesrapidretail/${Math.floor(Math.random() * 1000)}.jpg`].join(','));
    }
    rows = rows.join('\n');
    result.push(rows);
  }
  return result.join('\n') + '\n';
};

const genders = ['Men', 'Women', 'Girls'];
const categories = ['Tops', 'Bottoms', 'Swim'];
const type = ['Pants', 'Shorts', 'Shirts'];

const populateProductsData = (start, end) => {
  const result = [];
  for (let i = start; i < end; i += 1) {
    result.push([
      i,
      genders[Math.floor(Math.random() * 3)],
      categories[Math.floor(Math.random() * 3)],
      type[Math.floor(Math.random() * 3)],
    ].join(','));
  }
  return result.join('\n') + '\n';
};

let start = 1;
let end = 100001;

while (start < 10000001) {
  let imageResults = populateImageData(start, end);
  let productsResults = populateProductsData(start, end);

  fs.appendFileSync('./images_seed.csv', imageResults);
  fs.appendFileSync('./products_seed.csv', productsResults);
  console.log('Wrote 100k to File');

  imageResults = '';
  productsResults = '';
  start += 100000;
  end += 100000;
}

