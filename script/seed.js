/**
 * Welcome to the seed file! This seed file uses a newer language feature called...
 *
 *                  -=-= ASYNC...AWAIT -=-=
 *
 * Async-await is a joy to use! Read more about it in the MDN docs:
 *
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function
 *
 * Now that you've got the main idea, check it out in practice below!
 */
const db = require('../server/db')
const {User, Product, Category, Purchase, Order, Review } = require('../server/db/models')

async function seed () {
  await db.sync({force: true})
  console.log('db synced!')
  // Whoa! Because we `await` the promise that db.sync returns, the next line will not be
  // executed until that promise resolves!

  const users = await Promise.all([
    User.create({name: 'Cody', email: 'cody@email.com', password: '123', admin: true}),
    User.create({name: 'Murphy', email: 'murphy@email.com', password: '123', admin: false}),
    User.create({name: 'Jen', email: 'jen@email.com', password: '123', admin: false}),
    User.create({name: 'Melissa', email: 'melissa@email.com', password: '123', admin: false}),
    User.create({name: 'Doug', email: 'doug@email.com', password: '123', admin: false}),
    User.create({email: 'john@email.com', password: '123', admin: false})
  ])

  const categories = await Promise.all([
    Category.create({ name: 'office'}),
    Category.create({ name: 'school' }),
    Category.create({ name: 'fancy' }),
    Category.create({ name: 'meh quality' }),
    Category.create({ name: 'kids' }),
    Category.create({ name: 'crafts' }),
    Category.create({ name: 'home'})
  ])

  const purchases = await Promise.all([
    Purchase.create({ quantity: 7, price: 5.00 }),
    Purchase.create({ quantity: 2, price: 3.00 }),
    Purchase.create({ quantity: 5, price: 1.00 }),
    Purchase.create({ quantity: 10, price: 3.00 }),
    Purchase.create({ quantity: 2, price: 10.00 }),
    Purchase.create({ quantity: 3, price: 10.00 }),
    Purchase.create({ quantity: 5, price: 7.00 })
  ])

  const orders = await Promise.all([
    //processing, cancelled, completed, created
    Order.create({ status: 'created', subTotal: 5.00, address: "1 Dreary Lane", email: 'cody@email.com'  }),
    Order.create({ status: 'processing', subTotal: 10.00, address: "1 Dreary Lane", email: 'cody@email.com' }),
    Order.create({ status: 'completed', subTotal: 15.00, address: "2 Dreary Lane", email: 'murphy@email.com' }),
    Order.create({ status: 'cancelled', subTotal: 20.00, address: "2 Dreary Lane", email: 'murphy@email.com' }),
    Order.create({ status: 'created', subTotal: 25.00, address: "3 Dreary Lane", email: 'jen@email.com' }),
    Order.create({ status: 'created', subTotal: 30.00, address: "3 Dreary Lane", email: 'jen@email.com' }),
    Order.create({ status: 'created', subTotal: 35.00, address: "4 Dreary Lane", email: 'melissa@email.com' })
  ])

  const reviews = await Promise.all([
    //processing, cancelled, completed, created
    Review.create({ title: 'THIS SUX', stars: 0, content: 'THE WORST PAPER EVER IM SO PISSED' }),
    Review.create({ title: 'THIS SUX', stars: 4, content: 'THE WORST PAPER EVER IM SO PISSED' }),
    Review.create({ title: 'THIS SUX', stars: 0, content: 'THE WORST PAPER EVER IM SO PISSED' }),
    Review.create({ title: 'THIS SUX', stars: 5, content: 'It is ok. I do not hate this paper.' }),
    Review.create({ title: 'THIS SUX', stars: 1, content: 'THE WORST PAPER EVER IM SO PISSED' }),
    Review.create({ title: 'THIS SUX', stars: 2, content: 'THE WORST PAPER EVER IM SO PISSED' }),
    Review.create({ title: 'THIS SUX', stars: 0, content: 'THE WORST PAPER EVER IM SO PISSED' })
  ])

  const products = await Promise.all([
    Product.create({
      title: 'Ancient Scroll',
      description: "You can't put a price on this historic artifact -- just kidding, we did!",
      photos:	[ 'https://i.imgur.com/OvVthL2.jpg', 'https://i.imgur.com/9rmk1Ml.jpg'],	price: 1000.00,
      quantity:	0,
      available:	false
    }),
    Product.create({
      title: 'Computer Paper',
      description: "The most boring item on this site.",
      photos: ['https://i.imgur.com/uv7DLI5.jpg', 'https://i.imgur.com/n7LPaL6.jpg'], price: 25.00,
      quantity: 0,
      available: false
    }),
    Product.create({
      title: 'Construction Paper',
      description: "Grab a glue stick and some safety scissors, it's time to embrace your inner child.",
      photos: 	['https://i.imgur.com/2vRTWnV.jpg', 'https://i.imgur.com/O18ppFm.jpg'],
      price: 25.00,
      quantity:	0,
      available:	false
    }),
    Product.create({
      title: 'Edible Paper',
      description: 'This paper is the perfect solution for stress eaters.',
      photos:	['https://i.imgur.com/3mHn0qQ.jpg', 'https://i.imgur.com/CmjAHfJ.jpg'],
      price:	100.00,
      quantity:	250,
      available:	true
    }),
    Product.create({
      title: 'Gift Bag',
      description: "Wrapping a gift is hard; take the easy way out with a gift bag.",
      photos:['https://i.imgur.com/IE100PN.jpg', 'https://i.imgur.com/njCzwLj.jpg'],
      price:	100.00,
      quantity:	250,
      available: true
    }),
    Product.create({
      title: 'Glitter Paper',
      description: "Guaranteed to get glitter on every single item in your home.",
      photos:	['https://i.imgur.com/iey99yx.jpg', 'https://i.imgur.com/Vdfc1Pp.jpg'],
      price:	300.00,
      quantity:	100,
      available: true
    }),
    Product.create({
      title: 'Graph Paper',
      description:	'What are you, a nerdy software engineer?',
      photos: ['https://i.imgur.com/VQSYwH9.jpg', 'https://i.imgur.com/ECQ97DF.jpg'],
      price:	25.00,
      quantity:	100,
      available:	true
    }),
    Product.create({
      title: 'Handmade Paper',
      description: 'This one-of-a-kind artisan paper is delicately crafted by Brooklyn hipsters.',
      photos:	['https://i.imgur.com/UqiasWq.jpg', 'https://i.imgur.com/E9pxFte.jpg'],
      price:	300.00,
      quantity:	100,
      available: true
    }),
    Product.create({
      title: 'Huge Paper',
      description: 'This paper is huge. HUGE. Warning: May make small hands appear even smaller.',
      photos:	['https://i.imgur.com/N8EODil.jpg', 'https://i.imgur.com/zY6heIE.jpg'],
      price:	500.00,
      quantity:	75,
      available: true
    }),
    Product.create({
      title: 'Invisible Paper',
      description:	"When this paper arrives in the mail, you're going to have to trust us that it's in the box. Final sale.",
      photos: ['https://i.imgur.com/lHm1wSe.jpg', 'https://i.imgur.com/h3FHoiW.jpg'],
      price:	0.00,
      quantity:	75,
      available: true
    }),
    Product.create({
      title: 'Lined Paper',
      description: "It's paper...with lines. What else do you need to know?",
      photos:	['https://i.imgur.com/86NxGNZ.jpg', 'https://i.imgur.com/HLrWB2n.png'],
      price:	25.00,
      quantity:	100,
      available: true
    }),
    Product.create({
      title: 'Loose Leaf Paper',
      description:	'Stock up on loose leaf for your Lisa Frank Trapper Keeper.',
      photos:	['https://i.imgur.com/pk9NW9d.jpg', 'https://i.imgur.com/GXqLgqi.jpg'],
      price:	25.00,
      quantity:	500,
      available: true
    }),
    Product.create({
      title: 'Newspaper',
      description: 'Get a subscription to the failing New York Times.',
      photos: ['https://i.imgur.com/qxPbQUu.jpg', 'https://i.imgur.com/4NRUluq.jpg'],
      price: 25.00,
      quantity:	100,
      available: true
    }),
    Product.create({
      title: 'Organic Paper',
      description: 'Is Gwyneth Paltrow your life coach? This is the paper for you.',
      photos:	['https://i.imgur.com/uYtrdKG.jpg', 'https://i.imgur.com/qbjTNvz.jpg'],
      price:	45.00,
      quantity:	80,
      available: true
    }),
    Product.create({
      title: 'Origami Paper',
      description: "You'll never be able to fold this paper into what you want, but have fun trying.",
      photos:	['https://i.imgur.com/6KDQOai.png', 'https://i.imgur.com/AObxKo1.jpg'],
      price:	75.00,
      quantity:	80,
      available: true
    }),
    Product.create({
      title: 'Paper Flower',
      description: 'Real talk: These flowers will live longer than you will.',
      photos:	['https://i.imgur.com/DFHqRyK.jpg', 'https://i.imgur.com/JrHJbp4.jpg'],	price: 100.00,
      quantity:	300,
      available: true
    }),
    Product.create({
      title: 'Paper Holder',
      description: 'Some plebians call these envelopes.',
      photos:	['https://i.imgur.com/nNarJnQ.jpg', 'https://i.imgur.com/fOyo5Ro.jpg'],
      price: 50.00,
      quantity:	300,
      available: true
    }),
    Product.create({
      title: 'Paper Plane',
      description:	'Just like the paper planes you made as a kid, except this one will actually fly.',
      photos:	['https://i.imgur.com/PfjpoL6.jpg', 'https://i.imgur.com/c2U6aL5.jpg'],
      price:	3.00,
      quantity:	300,
      available: true
    }),
    Product.create({
      title: 'Paper Shredder',
      description:	'You want to destroy paper? Why are you even on this site? Monster.',
      photos:	['https://i.imgur.com/Vj3ij3w.jpg', 'https://i.imgur.com/Sip6zot.jpg'],
      price:	5000.00,
      quantity:	230,
      available: true
    }),
    Product.create({
      title: 'Paper Weight',
      description:	'May require two people to lift. Shipping is extra.',
      photos:	['https://i.imgur.com/7WHa7W2.png', 'https://i.imgur.com/rlLzmcF.jpg'],
      price:	45.00,
      quantity:	100,
      available: true
    }),
    Product.create({
      title: 'Parchment Paper',
      description:	'For people who are too lazy to wash dishes.',
      photos:	['https://i.imgur.com/0Rxx91A.jpg', 'https://i.imgur.com/BPvIIdP.jpg'],
      price:	75.00,
      quantity:	100,
      available: true
    }),
    Product.create({
      title: 'Photo Paper',
      description:	"Oh so you're too cool for Instagram, huh?",
      photos:	['https://i.imgur.com/mjp74DC.jpg', 'https://i.imgur.com/cOXO0gv.jpg'],
      price:	80.00,
      quantity:	85,
      available: true
    }),
    Product.create({
      title: 'Scented Paper',
      description:	'Scents include lavender, vanilla, coconut, grass, or manure and are chosen at random.',
      photos:	['https://i.imgur.com/yKjoXGU.jpg', 'https://i.imgur.com/XXxAMnh.jpg'],
      price:	100.00,
      quantity:	200,
      available: true
    }),
    Product.create({
      title: 'Scrap Paper',
      description:	"If you can't figure out how to make your own scrap paper, we'll gladly charge you for ours.",
      photos:	['https://i.imgur.com/IYe80IP.jpg', 'https://i.imgur.com/eGTlPXk.jpg'],
      price:	2.00,
      quantity:	200,
      available: true
    }),
    Product.create({
      title: 'Scrapbook Paper',
      description: "Put on your yoga pants and grab a pumpkin spice latte because it's scrapbooking time!",
      photos:	['https://i.imgur.com/kURirfG.jpg', 'https://i.imgur.com/GlE1Uce.jpg'],
      price:	45.00,
      quantity:	80,
      available: true
    }),
    Product.create({
      title: 'Self-Destructing Paper',
      description:	'Like Snapchat, but less trendy.',
      photos:	['https://i.imgur.com/KGwIP6q.jpg', 'https://i.imgur.com/tfVceQd.jpg'],
      price:	7000.00,
      quantity: 80,
      available: true
    }), Product.create({
      title: 'Sketch Paper',
      description: "Pretend you're Jack Dawson with this sketch paper (and then tell Rose to move over because there's definitely room on that door for both of you).",
      photos:	['https://i.imgur.com/3iK3Arn.jpg', 'https://i.imgur.com/3DauglF.jpg'],
      price:	25.00,
      quantity:	80,
      available: true
    }),
    Product.create({
      title: 'Tissue Paper',
      description:	'Like wrapping paper, but worse.',
      photos:	['https://i.imgur.com/riqOeBc.jpg', 'https://i.imgur.com/fTq8kmU.jpg'],
      price:	25.00,
      quantity:	90,
      available: true
    }),
    Product.create({
      title: 'Toilet Paper',
      description:	"If you don't know what this is, we can't help you.",
      photos: ['https://i.imgur.com/FQCC7Be.jpg', 'https://i.imgur.com/HmTyWPT.jpg'],
      price:	100.00,
      quantity:	100,
      available: true
    }),
    Product.create({
      title: 'Wrapping Paper',
      description:	'Make even the worst gift look better with this fancy wrapping paper.',
      photos:	['https://i.imgur.com/dSuXEbc.jpg', 'https://i.imgur.com/l9bhSxc.png'],
      price:	100.00,
      quantity:	80,
      available: true
    })
  ])
  // Wowzers! We can even `await` on the right-hand side of the assignment operator
  // and store the result that the promise resolves to in a variable! This is nice!
  console.log(`seeded ${users.length} users, ${products.length} products, ${categories.length} categories, ${orders.length} orders, ${reviews.length} reviews, ${purchases.length} purchases`)
  console.log(`seeded successfully`)
}

// Execute the `seed` function
// `Async` functions always return a promise, so we can use `catch` to handle any errors
// that might occur inside of `seed`
seed()
  .catch(err => {
    console.error(err.message)
    console.error(err.stack)
    process.exitCode = 1
  })
  .then(() => {
    console.log('closing db connection')
    db.close()
    console.log('db connection closed')
  })

/*
 * note: everything outside of the async function is totally synchronous
 * The console.log below will occur before any of the logs that occur inside
 * of the async function
 */
console.log('seeding...')
