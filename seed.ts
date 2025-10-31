// import { connectDB } from './lib/db.js';
// import { Experience } from './lib/model.js';

// async function seed() {
//   await connectDB();
//   await Experience.deleteMany({});

//   await Experience.create([
//     {
//       title: 'Kayaking',
//       location: 'Udupi',
//       price: 999,
//       image: '/exp1.jpg',
//       description: 'Curated small-group experience. Certified guide. Safety first with gear included. Helmet and Life jackets along with an expert will accompany in kayaking.',
//       minAge: 10,
//       slots: [
//         { date: '2025-10-22', time: '07:00 am', totalSlots: 4 },
//         { date: '2025-10-22', time: '09:00 am', totalSlots: 2 },
//         { date: '2025-10-22', time: '11:00 am', totalSlots: 5 },
//         { date: '2025-10-22', time: '01:00 pm', totalSlots: 0 },
//         { date: '2025-10-23', time: '09:00 am', totalSlots: 10 },
//       ],
//     },
//     {
//       title: 'Trekking to Kodachadri Peak',
//       location: 'Shimoga',
//       price: 1499,
//       image: '/exp2.jpg',
//       description: 'Moderate trek through dense forests and misty hills. Includes packed lunch, guide, and transport from base camp.',
//       minAge: 12,
//       slots: [
//         { date: '2025-10-24', time: '06:00 am', totalSlots: 8 },
//         { date: '2025-10-25', time: '06:00 am', totalSlots: 6 },
//         { date: '2025-10-26', time: '06:00 am', totalSlots: 10 },
//       ],
//     },
//     {
//       title: 'Scuba Diving at Netrani Island',
//       location: 'Murudeshwar',
//       price: 3499,
//       image: '/exp3.jpg',
//       description: 'Discover underwater coral reefs with PADI-certified instructors. Includes boat ride, equipment, and 1 dive.',
//       minAge: 14,
//       slots: [
//         { date: '2025-10-23', time: '08:00 am', totalSlots: 5 },
//         { date: '2025-10-24', time: '08:00 am', totalSlots: 3 },
//         { date: '2025-10-25', time: '08:00 am', totalSlots: 7 },
//       ],
//     },
//     {
//       title: 'Paragliding Joyride',
//       location: 'Nandi Hills',
//       price: 2999,
//       image: '/exp4.jpg',
//       description: '10-15 minute tandem paragliding flight with certified pilots. Stunning aerial views of Bangalore outskirts.',
//       minAge: 16,
//       slots: [
//         { date: '2025-10-25', time: '06:30 am', totalSlots: 6 },
//         { date: '2025-10-25', time: '07:30 am', totalSlots: 4 },
//         { date: '2025-10-26', time: '06:30 am', totalSlots: 8 },
//       ],
//     },
//     {
//       title: 'Sunrise Yoga & Meditation',
//       location: 'Goa - Palolem Beach',
//       price: 799,
//       image: '/exp5.jpg',
//       description: 'Start your day with yoga on the beach. Led by experienced instructor. Mats and herbal tea included.',
//       minAge: 8,
//       slots: [
//         { date: '2025-10-22', time: '05:45 am', totalSlots: 15 },
//         { date: '2025-10-23', time: '05:45 am', totalSlots: 12 },
//         { date: '2025-10-24', time: '05:45 am', totalSlots: 18 },
//       ],
//     },
//     {
//       title: 'Wildlife Safari at Bandipur',
//       location: 'Bandipur National Park',
//       price: 2199,
//       image: '/exp6.jpg',
//       description: 'Jeep safari through tiger reserve. Expert naturalist on board. High chance of spotting elephants, deer, and big cats.',
//       minAge: 6,
//       slots: [
//         { date: '2025-10-23', time: '06:00 am', totalSlots: 10 },
//         { date: '2025-10-23', time: '03:00 pm', totalSlots: 8 },
//         { date: '2025-10-24', time: '06:00 am', totalSlots: 12 },
//       ],
//     },
//     {
//       title: 'Surfing Lessons for Beginners',
//       location: 'Mangalore - Sasihithlu Beach',
//       price: 1799,
//       image: '/exp7.jpg',
//       description: '2-hour surfing session with board and instructor. Learn basics in safe shallow waters.',
//       minAge: 10,
//       slots: [
//         { date: '2025-10-25', time: '07:00 am', totalSlots: 6 },
//         { date: '2025-10-25', time: '04:00 pm', totalSlots: 5 },
//         { date: '2025-10-26', time: '07:00 am', totalSlots: 8 },
//       ],
//     },
//     {
//       title: 'Heritage Walk in Mysore',
//       location: 'Mysore Palace Area',
//       price: 599,
//       image: '/exp8.jpg',
//       description: 'Guided walk through royal history, markets, and hidden lanes. Includes entry to select heritage sites.',
//       minAge: 5,
//       slots: [
//         { date: '2025-10-22', time: '09:00 am', totalSlots: 20 },
//         { date: '2025-10-23', time: '09:00 am', totalSlots: 18 },
//         { date: '2025-10-24', time: '04:00 pm', totalSlots: 15 },
//       ],
//     },
//     {
//       title: 'Hot Air Balloon Ride',
//       location: 'Hampi',
//       price: 11999,
//       image: '/exp9.jpg',
//       description: '60-minute sunrise balloon flight over UNESCO ruins. Champagne breakfast included post-flight.',
//       minAge: 12,
//       slots: [
//         { date: '2025-10-26', time: '05:30 am', totalSlots: 4 },
//         { date: '2025-10-27', time: '05:30 am', totalSlots: 3 },
//         { date: '2025-10-28', time: '05:30 am', totalSlots: 5 },
//       ],
//     },
//     {
//       title: 'Organic Farm Stay & Cooking Class',
//       location: 'Coorg',
//       price: 2499,
//       image: '/exp10.jpg',
//       description: 'Stay at a working coffee plantation. Learn to cook Coorgi cuisine using fresh farm produce. Overnight stay included.',
//       minAge: 8,
//       slots: [
//         { date: '2025-10-24', time: '11:00 am', totalSlots: 6 },
//         { date: '2025-10-25', time: '11:00 am', totalSlots: 4 },
//         { date: '2025-10-26', time: '11:00 am', totalSlots: 8 },
//       ],
//     },
//     {
//       title: 'Night Camping under Stars',
//       location: 'Sakleshpur',
//       price: 1899,
//       image: '/exp11.jpg',
//       description: 'Tented camp with bonfire, BBQ dinner, stargazing session, and morning birdwatching walk.',
//       minAge: 10,
//       slots: [
//         { date: '2025-10-25', time: '04:00 pm', totalSlots: 12 },
//         { date: '2025-10-26', time: '04:00 pm', totalSlots: 10 },
//       ],
//     },
//   ]);

//   console.log('Successfully seeded 11 experiences!');
//   process.exit();
// }

// seed().catch(err => {
//   console.error('Seeding failed:', err);
//   process.exit(1);
// });



////////

import { connectDB } from './lib/db.js';
import { Experience } from './lib/model.js';

async function seed() {
  await connectDB();
  await Experience.deleteMany({});

  await Experience.create([
    {
      title: 'Kayaking Adventure',
      location: 'Udupi',
      price: 999,
      image: '/exp1.jpg',
      description: 'Small-group kayaking with certified guides and all safety gear provided.',
      about: 'Scenic river routes, trained guides, and safety briefing. Minimum age 10.',
      minAge: 10,
      slots: [
        { date: '2025-11-02', time: '07:00 am', totalSlots: 4 },
        { date: '2025-11-03', time: '09:00 am', totalSlots: 0 },
        { date: '2025-11-04', time: '11:00 am', totalSlots: 5 },
        { date: '2025-11-05', time: '01:00 pm', totalSlots: 3 },
        { date: '2025-11-06', time: '09:00 am', totalSlots: 0 },
      ],
    },
    {
      title: 'Trekking to Kodachadri Peak',
      location: 'Shimoga',
      price: 1499,
      image: '/exp2.jpg',
      description: 'A thrilling trek through forests and misty hills with local guides.',
      about: 'Moderate difficulty trek through scenic landscapes. Minimum age 12.',
      minAge: 12,
      slots: [
        { date: '2025-11-02', time: '06:00 am', totalSlots: 8 },
        { date: '2025-11-03', time: '06:00 am', totalSlots: 6 },
        { date: '2025-11-04', time: '06:00 am', totalSlots: 0 },
        { date: '2025-11-05', time: '06:00 am', totalSlots: 5 },
        { date: '2025-11-06', time: '06:00 am', totalSlots: 0 },
      ],
    },
    {
      title: 'Scuba Diving at Netrani Island',
      location: 'Murudeshwar',
      price: 3499,
      image: '/exp3.jpg',
      description: 'Underwater coral exploration with PADI-certified instructors.',
      about: 'Boat transfer, professional gear, and underwater photography included.',
      minAge: 14,
      slots: [
        { date: '2025-11-02', time: '08:00 am', totalSlots: 5 },
        { date: '2025-11-03', time: '08:00 am', totalSlots: 0 },
        { date: '2025-11-04', time: '08:00 am', totalSlots: 7 },
        { date: '2025-11-05', time: '08:00 am', totalSlots: 3 },
        { date: '2025-11-06', time: '08:00 am', totalSlots: 0 },
      ],
    },
    {
      title: 'Paragliding Joyride',
      location: 'Nandi Hills',
      price: 2999,
      image: '/exp4.jpg',
      description: 'Experience the thrill of flying with certified paragliding pilots.',
      about: 'Tandem flight with experienced pilot. Includes helmet and safety briefing.',
      minAge: 16,
      slots: [
        { date: '2025-11-02', time: '06:30 am', totalSlots: 0 },
        { date: '2025-11-03', time: '07:00 am', totalSlots: 5 },
        { date: '2025-11-04', time: '06:30 am', totalSlots: 4 },
        { date: '2025-11-05', time: '07:30 am', totalSlots: 0 },
        { date: '2025-11-06', time: '06:30 am', totalSlots: 6 },
      ],
    },
    {
      title: 'Sunrise Yoga & Meditation',
      location: 'Goa - Palolem Beach',
      price: 799,
      image: '/exp5.jpg',
      description: 'Morning yoga and meditation session by the sea with herbal tea.',
      about: 'Relaxing start to your day with experienced yoga instructor on the beach.',
      minAge: 8,
      slots: [
        { date: '2025-11-02', time: '05:45 am', totalSlots: 15 },
        { date: '2025-11-03', time: '05:45 am', totalSlots: 0 },
        { date: '2025-11-04', time: '05:45 am', totalSlots: 10 },
        { date: '2025-11-05', time: '05:45 am', totalSlots: 0 },
        { date: '2025-11-06', time: '05:45 am', totalSlots: 13 },
      ],
    },
    {
      title: 'Wildlife Safari at Bandipur',
      location: 'Bandipur National Park',
      price: 2199,
      image: '/exp6.jpg',
      description: 'Jeep safari with naturalist guides through tiger reserve.',
      about: 'Includes entry tickets, expert guides, and comfortable safari vehicles.',
      minAge: 6,
      slots: [
        { date: '2025-11-02', time: '06:00 am', totalSlots: 0 },
        { date: '2025-11-03', time: '03:00 pm', totalSlots: 8 },
        { date: '2025-11-04', time: '06:00 am', totalSlots: 12 },
        { date: '2025-11-05', time: '03:00 pm', totalSlots: 0 },
        { date: '2025-11-06', time: '06:00 am', totalSlots: 11 },
      ],
    },
    {
      title: 'Surfing Lessons for Beginners',
      location: 'Mangalore - Sasihithlu Beach',
      price: 1799,
      image: '/exp7.jpg',
      description: '2-hour surfing session with personal instructor and board rental.',
      about: 'Learn basic surfing techniques in safe shallow waters. Fun for all ages.',
      minAge: 10,
      slots: [
        { date: '2025-11-02', time: '07:00 am', totalSlots: 0 },
        { date: '2025-11-03', time: '04:00 pm', totalSlots: 5 },
        { date: '2025-11-04', time: '07:00 am', totalSlots: 8 },
        { date: '2025-11-05', time: '04:00 pm', totalSlots: 0 },
        { date: '2025-11-06', time: '07:00 am', totalSlots: 7 },
      ],
    },
    {
      title: 'Night Camping under Stars',
      location: 'Sakleshpur',
      price: 1899,
      image: '/exp8.jpg',
      description: 'Tented camp with bonfire, BBQ dinner, and morning birdwatching walk.',
      about: 'Cozy tents, music, stargazing, and nature trails included. Perfect weekend escape.',
      minAge: 10,
      slots: [
        { date: '2025-11-02', time: '04:00 pm', totalSlots: 10 },
        { date: '2025-11-03', time: '04:00 pm', totalSlots: 0 },
        { date: '2025-11-04', time: '04:00 pm', totalSlots: 12 },
        { date: '2025-11-05', time: '04:00 pm', totalSlots: 0 },
        { date: '2025-11-06', time: '04:00 pm', totalSlots: 9 },
      ],
    },
  ]);

  console.log('✅ Successfully seeded 8 experiences with mixed available and full slots!');
  process.exit();
}

seed().catch(err => {
  console.error('❌ Seeding failed:', err);
  process.exit(1);
});
