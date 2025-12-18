const http = require("http"); // no extra libraries

const TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImlhdCI6MTc2NTc5MTg5MSwiZXhwIjoxNzY1Nzk1NDkxfQ.EcL2_yvmTL0RtkprKX4SvUVtGwdmprdwJGwWOFRFzbg"; // <-- REQUIRED
const API_PATH = "/api/products";

const products = [
  {
    name: "iPhone 15 Pro",
    description: "Apple flagship phone with A17 chip",
    price: 129999,
    imageUrl: "https://store.storeimages.cdn-apple.com/4668/as-images.apple.com/is/iphone-15-pro-black-titanium",
    stock: 10,
  },
  {
    name: "Samsung Galaxy S24 Ultra",
    description: "Samsung flagship with Snapdragon Gen 3",
    price: 119999,
    imageUrl: "https://images.samsung.com/is/image/samsung/p6pim/in/sm-s928bzkgins/gallery",
    stock: 12,
  },
  {
    name: "MacBook Air M2",
    description: "Apple MacBook with M2 chip",
    price: 114999,
    imageUrl: "https://store.storeimages.cdn-apple.com/4668/as-images.apple.com/is/macbook-air-m2-midnight",
    stock: 8,
  },
  {
    name: "Sony WH-1000XM5",
    description: "Noise cancelling wireless headphones",
    price: 29999,
    imageUrl: "https://www.sony.co.in/image/wh1000xm5.jpg",
    stock: 20,
  },
  {
    name: "Apple Watch Series 9",
    description: "Smartwatch with health tracking",
    price: 45999,
    imageUrl: "https://store.storeimages.cdn-apple.com/4668/as-images.apple.com/is/apple-watch-series-9",
    stock: 15,
  },
  {
    name: "iPad Pro 11-inch",
    description: "Powerful tablet with M2 chip",
    price: 81999,
    imageUrl: "https://store.storeimages.cdn-apple.com/4668/as-images.apple.com/is/ipad-pro-11",
    stock: 9,
  },
  {
    name: "Logitech MX Master 3S",
    description: "Advanced wireless mouse",
    price: 9999,
    imageUrl: "https://resource.logitech.com/mx-master-3s.jpg",
    stock: 25,
  },
  {
    name: "Keychron K2 Mechanical Keyboard",
    description: "Wireless mechanical keyboard",
    price: 8999,
    imageUrl: "https://cdn.shopify.com/keychron-k2.jpg",
    stock: 30,
  },
  {
    name: "Sony PlayStation 5",
    description: "Next-gen gaming console",
    price: 54999,
    imageUrl: "https://gmedia.playstation.com/is/image/SIEPDC/ps5-console",
    stock: 5,
  },
  {
    name: "Xbox Series X",
    description: "Powerful gaming console",
    price: 52999,
    imageUrl: "https://assets.xbox.com/xbox-series-x.jpg",
    stock: 6,
  },

  // ---- remaining 10 ----
  {
    name: "AirPods Pro (2nd Gen)",
    description: "Wireless earbuds with ANC",
    price: 24999,
    imageUrl: "https://store.storeimages.cdn-apple.com/4668/as-images.apple.com/is/airpods-pro",
    stock: 20,
  },
  {
    name: "OnePlus 12",
    description: "High performance Android phone",
    price: 64999,
    imageUrl: "https://image01.oneplus.net/oneplus12.jpg",
    stock: 18,
  },
  {
    name: "JBL Charge 5",
    description: "Portable Bluetooth speaker",
    price: 14999,
    imageUrl: "https://in.jbl.com/charge-5.jpg",
    stock: 22,
  },
  {
    name: "Canon EOS R10",
    description: "Mirrorless camera for creators",
    price: 88999,
    imageUrl: "https://in.canon/media/eos-r10.jpg",
    stock: 6,
  },
  {
    name: "Dell XPS 13",
    description: "Premium ultrabook",
    price: 99999,
    imageUrl: "https://i.dell.com/sites/csimages/App-Merchandizing_Images/all/xps-13-9315-laptop.jpg",
    stock: 7,
  },
  {
    name: "Samsung 55-inch 4K TV",
    description: "Crystal UHD Smart TV",
    price: 55999,
    imageUrl: "https://images.samsung.com/is/image/samsung/55inch-tv",
    stock: 10,
  },
  {
    name: "Amazon Echo (5th Gen)",
    description: "Smart speaker with Alexa",
    price: 10499,
    imageUrl: "https://m.media-amazon.com/echo-5.jpg",
    stock: 25,
  },
  {
    name: "Google Nest Hub",
    description: "Smart display",
    price: 8999,
    imageUrl: "https://store.google.com/nest-hub.jpg",
    stock: 12,
  },
  {
    name: "Mi Smart Band 8",
    description: "Fitness tracker",
    price: 3999,
    imageUrl: "https://i01.appmifile.com/mi-band-8.jpg",
    stock: 40,
  },
  {
    name: "HP Pavilion Gaming Laptop",
    description: "Gaming laptop with RTX graphics",
    price: 89999,
    imageUrl: "https://ssl-product-images.www8-hp.com/pavilion-gaming.jpg",
    stock: 5,
  },
];

function addProduct(product) {
  return new Promise((resolve, reject) => {
    const data = JSON.stringify(product);

    const options = {
      hostname: "localhost",
      port: 5000,
      path: API_PATH,
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Content-Length": Buffer.byteLength(data),
        Authorization: `Bearer ${TOKEN}`,
      },
    };

    const req = http.request(options, (res) => {
      let body = "";
      res.on("data", (chunk) => (body += chunk));
      res.on("end", () => {
        resolve(JSON.parse(body));
      });
    });

    req.on("error", reject);
    req.write(data);
    req.end();
  });
}

(async () => {
  for (const product of products) {
    try {
      const result = await addProduct(product);
      console.log("Added:", result.product?.name || result.message);
    } catch (err) {
      console.error("Error:", err.message);
    }
  }
})();
