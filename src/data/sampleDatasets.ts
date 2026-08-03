import { SampleDataset, FeedbackItem } from "../types";

export const SAMPLE_DATASETS: SampleDataset[] = [
  {
    id: "blinkit-playstore-appstore",
    name: "Blinkit Play Store & App Store Feedbacks (120 Reviews)",
    description: "App reviews focusing on 10-min delivery SLA, dark store stockouts, item replacements, refund delays, and search usability.",
    itemCount: 120,
    sources: ["Play Store", "App Store"],
    badge: "App Store Reviews",
    items: [
      {
        id: "ps-01",
        source: "Play Store",
        content: "Blinkit delivered my order in 8 minutes flat! Incredible for urgent milk and bread in the morning. But please fix search for regional items like 'Aashirvaad Shuddh Chakki Atta' - when I type 'ashirvad' with one 'a', it shows no results.",
        rating: 4,
        date: "2026-07-28",
        author: "Ananya S."
      },
      {
        id: "ps-02",
        source: "Play Store",
        content: "Ordered 1kg tomatoes and half were bruised and squishy. Quick delivery is nice, but fresh produce quality control is missing. Delivery executive was polite though.",
        rating: 2,
        date: "2026-07-27",
        author: "Rahul M."
      },
      {
        id: "ps-03",
        source: "App Store",
        content: "I use Blinkit twice a day for quick snacks and soft drinks. However, the surge pricing / high delivery fee of ₹35 during rain or peak 8 PM hours feels unfair when minimum order is already ₹199.",
        rating: 3,
        date: "2026-07-29",
        author: "Vikram K."
      },
      {
        id: "ps-04",
        source: "Play Store",
        content: "The substitute item feature is broken. When my Amul Butter 500g was out of stock, it automatically assigned Mother Dairy butter without asking me or giving me 30 seconds to opt out.",
        rating: 1,
        date: "2026-07-30",
        author: "Pooja Sharma"
      },
      {
        id: "ps-05",
        source: "App Store",
        content: "Blinkit is a lifesaver for late night cravings! Cold ice creams and chips delivered at 1:30 AM in 12 minutes. App UX is super fast, cart checkout takes 5 seconds.",
        rating: 5,
        date: "2026-08-01",
        author: "Karan Verma"
      },
      {
        id: "ps-06",
        source: "Play Store",
        content: "Missing items in order! I paid for 5 items, only 4 arrived. Chatbot automated support kept looping and gave me a ₹20 coupon instead of refunding my ₹120 missing ice cream tub. Need human customer support option.",
        rating: 1,
        date: "2026-07-26",
        author: "Siddharth N."
      },
      {
        id: "ps-07",
        source: "Play Store",
        content: "Love the Printouts feature on Blinkit! Printing boarding passes and docs in 10 mins is revolutionary. Wish they added basic binding or folder option.",
        rating: 5,
        date: "2026-07-25",
        author: "Meera Nair"
      },
      {
        id: "ps-08",
        source: "App Store",
        content: "Every morning at 7:30 AM I buy milk, eggs, and curd. I wish there was a 'Daily Repeat Cart' or automated 1-tap reorder widget on the homepage instead of navigating to order history.",
        rating: 4,
        date: "2026-07-31",
        author: "Deepak R."
      },
      {
        id: "ps-09",
        source: "Play Store",
        content: "Dark store in HSR Layout sector 2 constantly runs out of Nandini milk by 8:30 AM. App should let me set an alert when stock arrives at my nearby dark store.",
        rating: 3,
        date: "2026-07-24",
        author: "Suresh Gowda"
      },
      {
        id: "ps-10",
        source: "Play Store",
        content: "The recipe bundle feature is awesome! I searched 'Paneer Butter Masala' and it showed all ingredients to add to cart in one click. Want more Indian regional dish recipes like Sambhar or Misal Pav.",
        rating: 5,
        date: "2026-07-23",
        author: "Ritu Kapoor"
      },
      {
        id: "ps-11",
        source: "App Store",
        content: "Whenever I try to explore high-value categories like cookware or headphones on Blinkit, I hesitate because warranty details and product return policies are unclear compared to Amazon.",
        rating: 3,
        date: "2026-07-22",
        author: "Aakash Gupta"
      },
      {
        id: "ps-12",
        source: "Play Store",
        content: "Delivery driver called 3 times asking for directions despite location pin being exact. Map pin accuracy needs improvement inside gated apartment societies.",
        rating: 2,
        date: "2026-07-21",
        author: "Neha Malhotra"
      },
      {
        id: "ps-13",
        source: "Play Store",
        content: "Great app overall, but the notification spam is intense. 6 push notifications a day for snacks at 4 PM and dinner at 8 PM is too much. Give me granular notification controls.",
        rating: 3,
        date: "2026-07-20",
        author: "Tanmay B."
      },
      {
        id: "ps-14",
        source: "App Store",
        content: "Super fast replacement when my egg box had one cracked egg! Uploaded photo on app and got instant ₹15 refund in Blinkit wallet. Very smooth self-service resolution.",
        rating: 5,
        date: "2026-07-19",
        author: "Shreya Joshi"
      },
      {
        id: "ps-15",
        source: "Play Store",
        content: "Tried buying gourmet organic avocado and blueberries. They were rock hard and unripe. Would be great if app showed 'Ripeness Level' (e.g., Ready to eat today vs 2 days later) for exotic fruits.",
        rating: 3,
        date: "2026-07-18",
        author: "Farhan Q."
      }
    ]
  },
  {
    id: "reddit-community-discussions",
    name: "Reddit & Community Discussions (r/india, r/bangalore, r/mumbai)",
    description: "Deep qualitative community threads analyzing 10-min delivery viability, impulse buying habits, price parity with local Kirana stores, and dark store density.",
    itemCount: 85,
    sources: ["Reddit", "Community"],
    badge: "Social Media & Forums",
    items: [
      {
        id: "red-01",
        source: "Reddit",
        content: "Thread: 'Has Blinkit completely replaced your weekly supermarket trips?'\nTop comment: 'Yes for staples and emergency needs, but no for monthly pantry refill. Blinkit items are often ₹5-10 costlier per item than DMart or local Kirana. Plus pack sizes are smaller (e.g. 200g chips instead of bulk 1kg packs).'",
        rating: 3,
        date: "2026-07-15",
        author: "u/BangaloreTechie99"
      },
      {
        id: "red-02",
        source: "Reddit",
        content: "Impulse buying on Blinkit is real! I open the app for ₹30 coriander and end up adding ₹350 worth of ice cream, chocolates, and imported ramen because the 'frequently bought together' carousel is so tempting.",
        rating: 4,
        date: "2026-07-16",
        author: "u/DelhiFoodieGirl"
      },
      {
        id: "red-03",
        source: "Reddit",
        content: "Why do dark stores run out of basic vegetables between 6 PM to 8 PM? On rain days, almost 40% of my cart goes out of stock at checkout. Blinkit needs predictive inventory booking while items sit in my cart.",
        rating: 2,
        date: "2026-07-17",
        author: "u/GurgaonResident"
      },
      {
        id: "red-04",
        source: "Community",
        content: "Blinkit vs Instamart vs Zepto debate thread: Users agree Blinkit has the best UI and fastest search indexing, but Zepto has better loyalty rewards. Users want a unified membership/loyalty pass on Blinkit for free delivery threshold reduction.",
        rating: 4,
        date: "2026-07-14",
        author: "Community Mod"
      },
      {
        id: "red-05",
        source: "Reddit",
        content: "As a bachelor living alone, Blinkit single-serve meals and ready-to-cook items are a blessing. But I wish they had calorie count and macro nutrition tags clearly displayed on product cards without opening details.",
        rating: 4,
        date: "2026-07-12",
        author: "u/FitnessGeek_BLR"
      },
      {
        id: "red-06",
        source: "Reddit",
        content: "Dark store delivery workers driving dangerously in residential lanes to meet 10-minute timer. I prefer if Blinkit removes the '10-minute' timer countdown in customer app to reduce pressure on drivers and show realistic 12-18 min ETA instead.",
        rating: 2,
        date: "2026-07-11",
        author: "u/CivicMindedCitizen"
      },
      {
        id: "red-07",
        source: "Community",
        content: "Electronics on Blinkit review: 'Bought an iPhone charger and boat earphones at 11 PM during emergency. Delivered in 11 mins! However, I had to double check if it was authentic. Need official brand authorization badges on electronics.'",
        rating: 4,
        date: "2026-07-10",
        author: "TechForum User"
      },
      {
        id: "red-08",
        source: "Reddit",
        content: "Festive season shopping on Blinkit: 'Pooja items, diyas, sweets during Diwali was seamless! They stocked local brands. Would love seasonal recipe kits for Holi, Eid, Ganesh Chaturthi.'",
        rating: 5,
        date: "2026-07-09",
        author: "u/DesiMom_34"
      }
    ]
  },
  {
    id: "survey-fresh-electronics",
    name: "Category Exploration & NPS Customer Survey (95 Responses)",
    description: "Structured customer survey responses analyzing drop-off barriers in Fresh Meat, Gourmet Foods, Personal Care, and Small Appliances.",
    itemCount: 95,
    sources: ["Survey"],
    badge: "User Surveys",
    items: [
      {
        id: "surv-01",
        source: "Survey",
        content: "Survey Q: What stops you from buying Fresh Fruits & Vegetables on Blinkit?\nAnswer: 'I cannot touch or pick the vegetables myself. Last time I ordered onions, 2 were rotten inside. I only buy packaged dairy and branded snacks on Blinkit; fresh produce I buy from local hawker.'",
        rating: 2,
        date: "2026-07-01",
        author: "Survey Respondent #14"
      },
      {
        id: "surv-02",
        source: "Survey",
        content: "Survey Q: How do you discover new brands on the app?\nAnswer: 'Mainly through search suggestions when typing a category name like 'Green Tea'. I rarely scroll category banners. If search doesn't show relevant alternatives, I just buy what I know.'",
        rating: 3,
        date: "2026-07-02",
        author: "Survey Respondent #28"
      },
      {
        id: "surv-03",
        source: "Survey",
        content: "Survey Q: What would make you order non-grocery items like skincare or home decor on Blinkit?\nAnswer: 'Instant 10-minute return pickup guarantee if product is defective or damaged. Currently returning a damaged item feels risky.'",
        rating: 3,
        date: "2026-07-03",
        author: "Survey Respondent #42"
      },
      {
        id: "surv-04",
        source: "Survey",
        content: "Survey Q: How often do you experience order delay over 20 minutes?\nAnswer: 'During monsoon or peak 7:30-9 PM dinner rush, about 1 out of 4 orders takes 25-30 minutes. App status says 'Packing order' for 15 mins without updating.'",
        rating: 2,
        date: "2026-07-04",
        author: "Survey Respondent #51"
      },
      {
        id: "surv-05",
        source: "Survey",
        content: "Survey Q: What is your favorite feature on Blinkit?\nAnswer: 'Live tracking map and 1-tap reorder from past orders. Also live delivery partner location gives peace of mind.'",
        rating: 5,
        date: "2026-07-05",
        author: "Survey Respondent #67"
      },
      {
        id: "surv-06",
        source: "Survey",
        content: "Survey Q: What AI feature would improve your shopping experience?\nAnswer: 'An AI assistant where I can upload a photo of my handwritten grocery list or recipe photo and it automatically fills my Blinkit cart with exact matching brands and quantities.'",
        rating: 5,
        date: "2026-07-06",
        author: "Survey Respondent #88"
      }
    ]
  }
];
