// import { storageService } from './async-storage.service'
import { httpService } from "./http-service";
import { storageService } from "./storage-service";
// import { socketService, SOCKET_EVENT_USER_UPDATED } from './socket.service'

export const gameService = {
  getGames,
  getById,
  remove,
  update,
  getEmptyGig,
  save,
};

const GAMES_KEY = "gamesDB";

async function getGames(filterBy) {
  // return storageService.query('gig')
  // await new Promise(resolve =>  setTimeout(resolve,1500));

  let games = await httpService.get();
  storageService.store(GAMES_KEY, games);
  return games;
}

async function getById(gameId) {
  // const game = await storageService.get('game', gameId)
  // await new Promise(resolve =>  setTimeout(resolve,1500));
  const game = await httpService.get(`game/${gameId}`);
  return game;
}
function remove(gameId) {
  // return storageService.remove('gig', gameId)
  return httpService.delete(`game/${gameId}`);
}

async function update(game) {
  // await storageService.put('game', game)
  game = await httpService.put(`game/${game._id}`, game);
  // Handle case in which admin updates other game's details
  if (getLoggedinGame()._id === game._id) _saveLocalGame(game);
  return game;
}

function _saveLocalGame(game) {
  sessionStorage.setItem(STORAGE_KEY_LOGGEDIN_USER, JSON.stringify(game));
  return game;
}
async function save(game) {
  const savedGame = game;
  if (savedGame._id) {
    return await httpService.put(`game/${savedGame._id}`, savedGame);
  } else {
    return await httpService.post("game", savedGame);
  }
}

// import { storageService } from "./storage-service";
// import { asyncStorageService } from "./async-storage-service";
// import {utilService} from './util-service'

// export const gigService = {
//   query,
//   getById,
//     remove,
//     save,
//   getEmptyGig,
// };

// const KEY = "gigsDB";

// var gGigs = _createGigs();

// function query() {
//   return JSON.parse(JSON.stringify(gGigs));
// }

// function getById(id) {
//   return asyncStorageService.getById(KEY, id);
// }

// function save(gig) {
//   const gigToSave = JSON.parse(JSON.stringify(gig))
//   const savedGig = (gigToSave._id) ? _update(gigToSave) : _add(gigToSave)

//   storageService.store(KEY, gGigs)
//   return savedGig;
// }

// function remove(id) {
//   const idx = gTodos.findIndex(gig => gig._id === id)
//   gGigs.splice(idx, 1)
//   storageService.store(KEY, gGigs)
// }

// function _add(gig) {
//   gig._id = utilService.makeId()
//   gGigs.unshift(gig)
//   return gig
// }

// function _update(gig) {
//   const idx = gGigs.findIndex(currGig => currGig._id === gig._id)
//   gGigs.splice(idx, 1, gig)
//   return gig
// }

function getEmptyGig() {
  return {
    title: "",
    category: [],
    productImgs: [],
    description: "",
    price: null,
    daysToMake: "",
    loc: "",
    memberSince: "Jul 2021",
    avgResponceTime: "1 hour",
    lastDelivery: "1 week",
    rate: 0,
    about: "",
    owner: {
      _id: "623f4e421513c14a270f61a4",
      fullname: "frederickkessie",
      imgUrl:
        "https://fiverr-res.cloudinary.com/t_profile_original,q_auto,f_auto/attachments/profile/photo/4abf6f5b58e4d78cfb7c410cf8d7a9ac-1626111679444/4a04b77c-22ee-4ce8-b4be-747fd059e9ff.jpg",
      username: "guy123",
      level: "premium",
      reviewers: [],
    },
  };
}

// _createGigs();
// function _createGigs() {
//   let gigs = storageService.load(KEY);
//   if (!gigs || !gigs.length) {
//     gigs = [
//       {
//         "_id": "g101",
//         "title": "I will do hyper realistic pencil portrait by hand drawing",
//         "category": [
//           "marketing",
//           "logo",
//           "research and summeries"
//         ],
//         "productImgs": [
//           "https://fiverr-res.cloudinary.com/t_gig_cards_web,q_auto,f_auto/gigs/68762796/original/3e060210316e42972fbe0b478a67f315d3263a64.jpg",
//           "https://fiverr-res.cloudinary.com/t_gig_cards_web,q_auto,f_auto/gigs/132488260/original/955d6d66789bd57075f25da7de2b3a4233b2e26a.jpg",
//           "https://fiverr-res.cloudinary.com/t_gig_cards_web,q_auto,f_auto/gigs/99365338/original/cf8a3d6811de78361dd1bd896d10712ce97fd6f1.jpg",
//           "https://fiverr-res.cloudinary.com/t_gig_cards_web,q_auto,f_auto/gigs/125591662/original/8fe883adb620795bf7808202a13dc25525875109.png"
//         ],
//         "description": "Hello ! Much obliged for visiting my gig :)\nIn this gig I'm offering you an exceptionally 3 one of a kind, best and reasonable bundles.\nIn case you are thinking for giving somebody uncommon an extremely delightful, eye getting gift( hyper practical hand drawing pencil sketch picture)?\nKindly select the helpful bundle and submit your request at this moment and I'll give you an ideal picture sketch, hand drawing, practical drawing, pencil attracting high goal JPEG/PNG advanced document.\nI will give hand-drawn dark and White or hued reasonable pictures.\nSympathetically give me clear reference photograph however much as could be expected.\nThe material I utilized for Creating pencil representations are:\nDrawing materials: graphite pencil, charcoal, Bristol paper, mono eraser, brush, mixing stump, mechanical pencil, graphite powder and so on .\nYou can give me anything:\nPicture photographs\nFamily photographs\nCreature photographs\nAny item photographs\nScene photographs\nEngineering photographs\nAnything you envision\nKindly reach me prior to submitting your request! Much appreciated.\nI DO NOT DELIVER ORIGINAL PHYSICAL COPY BUT A HIGH RESOLUTION JPEG DIGITA",
//         "price": 16.84,
//         "daysToMake": 2,
//         "fullname": "frederickkessie",
//         "imgUrl": "https://fiverr-res.cloudinary.com/t_profile_original,q_auto,f_auto/attachments/profile/photo/4abf6f5b58e4d78cfb7c410cf8d7a9ac-1626111679444/4a04b77c-22ee-4ce8-b4be-747fd059e9ff.jpg",
//         "loc": "Ghana",
//         "memberSince": "Jul 2021",
//         "avgResponceTime": "1 hour",
//         "lastDelivery": "1 week",
//         "rate": 4.4,
//         "about": "Hi reader, thanks for your time. I'm an experienced young artist and i specialize in 3D animation, graphic designing and pencil Art. I'm familiar with word processing application. Kindly hit me up if if you need any of my services.",
//         "reviewers": [
//           {
//             "name": "tobiaspille300",
//             "country": "Thailand",
//             "flag": "https://fiverr-dev-res.cloudinary.com/general_assets/flags/1f1f9-1f1ed.png",
//             "review": "frederickkessie ist a super kind artist doing the process he was super professional and only took him 1 shot to deliver a perfect result ! Highly recommended work with this guy !",
//             "reviewedAt": "Published 2 months ago"
//           },
//           {
//             "name": "liam31",
//             "country": "United Kingdom",
//             "flag": "https://fiverr-dev-res.cloudinary.com/general_assets/flags/1f1ec-1f1e7.png",
//             "review": "I requested a slightly earlier delivery on this and once again Frederick came through and provided a fantastic delivery. Thanks so much!",
//             "reviewedAt": "Published 3 weeks ago"
//           },
//           {
//             "name": "liam31",
//             "country": "United Kingdom",
//             "flag": "https://fiverr-dev-res.cloudinary.com/general_assets/flags/1f1ec-1f1e7.png",
//             "review": "Frederick is amazing and extremely talented. This is the second time working with him and he has been a pleasure yet again!",
//             "reviewedAt": "Published 3 weeks ago"
//           },
//           {
//             "name": "larsonraz",
//             "country": "United States",
//             "flag": "https://fiverr-dev-res.cloudinary.com/general_assets/flags/1f1fa-1f1f8.png",
//             "review": "Very detailed",
//             "reviewedAt": "Published 1 week ago"
//           },
//           {
//             "name": "stevekaszycki",
//             "country": "United States",
//             "flag": "https://fiverr-dev-res.cloudinary.com/general_assets/flags/1f1fa-1f1f8.png",
//             "review": "very nice portrait, very good quality.",
//             "reviewedAt": "Published 2 weeks ago"
//           }
//         ],
//         "tags": [
//           {
//             "name": "pencil drawing"
//           },
//           {
//             "name": "realistic drawing"
//           },
//           {
//             "name": "hand drawing"
//           },
//           {
//             "name": "portrait drawing"
//           },
//           {
//             "name": "pencil sketch"
//           }
//         ]
//       },
//       {
//         "_id": "g102",
//         "image": "https://fiverr-res.cloudinary.com/t_gig_cards_web,q_auto,f_auto/gigs/197422311/original/1907136f4b9684daa164acfa5cfedc6035b771b1.jpg",
//         "title": "I will do hyper realistic pencil sketch portrait by hand drawing",
//         "category": [
//           "arts and crafts",
//           "data entry",
//           "research and summeries"
//         ],
//         "productImgs": [
//           "https://fiverr-res.cloudinary.com/t_gig_cards_web,q_auto,f_auto/gigs/103068639/original/6fc1138155083b9ffc1e14be3bb8e7036bee0356.jpg",
//           "https://fiverr-res.cloudinary.com/t_gig_cards_web,q_auto,f_auto/gigs/91164/original/7a37b6aeebd243f148e71ed76bd8120e88155471.jpg",
//           "https://fiverr-res.cloudinary.com/video/upload/t_gig_cards_web/yan7cajqzb88t9yjbgdi.png",
//           "https://fiverr-res.cloudinary.com/t_gig_cards_web,q_auto,f_auto/gigs/99365338/original/cf8a3d6811de78361dd1bd896d10712ce97fd6f1.jpg"
//         ],
//         "description": "Hey ! Thanks for visiting my gig :)\nIn this gig i'm offering you a very 3 unique, preferable and affordable packages.\nIf you are thinking for giving someone special a very beautiful, eye catching gift( hyper realistic hand drawing pencil sketch portrait)?\nPlease select the desirable package and place your order right now and i'll give you a perfect portrait sketch, hand drawing, realistic drawing,pencil drawing in high resolution JPEG/PNG digital file.\nI will provide hand-drawn black & White or colored realistic portraits.\nKindly provide me clear reference photo as much as possible.\nThe material I used for Creating pencil portraits are:\nDrawing materials: graphite pencil, charcoal, Bristol paper, tombomono eraser, brush, blending stump, mechanical pencil, graphite powder etc .\nYou can give me anything:\nPortrait photos\nFamily photos\nAnimal photos\nAny product photos\nLandscape photos\nArchitecture photos\nAnything you imagine\nPlease contact me before placing your order! Thanks.\nI DO NOT DELIVER ORIGINAL PHYSICAL COPY BUT A HIGH RESOLUTION JPEG DIGITAL FILE, IF YOU WANT THE ORIGINAL ONE THEN MESSAGE ME FOR DETAILS.\nFeel free to ask me anything! :)\nThank You...\nvividstore",
//         "price": 67.37,
//         "daysToMake": 3,
//         "fullname": "vividstore",
//         "imgUrl": "https://fiverr-res.cloudinary.com/t_profile_original,q_auto,f_auto/attachments/profile/photo/83cc7c97f9873bdb052590a94d32f84c-1576419363871/ed47443e-0f9b-42ab-beaf-ec0a0acccfe8.jpeg",
//         "loc": "Bangladesh",
//         "memberSince": "Dec 2019",
//         "avgResponceTime": "1 hour",
//         "lastDelivery": "about 16 hours",
//         "rate": 4.7,
//         "about": "Hello, this is Masuk, stand up for vividstore,I am a young and enthusiastic graphic artist and realistic pencil sketch artist. I am certified as graphic designer from George Washington University, USA. I have almost 11 years experience in this field since my university life. I really love to work with Adobe Illustrator, Adobe Photoshop, and so on as a full time online freelancer. And also passionate about sketching. Thank you.",
//         "tags": [
//           {
//             "name": "pencil drawing"
//           },
//           {
//             "name": "realistic drawing"
//           },
//           {
//             "name": "pencil portrait"
//           },
//           {
//             "name": "sketch"
//           },
//           {
//             "name": "pencil sketch"
//           }
//         ]
//       },
//       {
//         "_id": "g103",
//         "image": "https://fiverr-res.cloudinary.com/t_gig_cards_web,q_auto,f_auto/gigs/155512325/original/9d62fbdec2b0bffd0318f9af43c2de023b62f5f0.jpg",
//         "title": "I will draw a hyperrealistic portrait of face or entire body and animals",
//         "category": [
//           "arts and crafts",
//           "logo",
//           "arts and crafts"
//         ],
//         "productImgs": [
//           "https://fiverr-res.cloudinary.com/t_gig_cards_web,q_auto,f_auto/attachments/delivery/asset/907e9cc6a0dfc3023841f8c061af2d40-1612374611/Rig-Tours-10.jpg",
//           "https://fiverr-res.cloudinary.com/t_gig_cards_web,q_auto,f_auto/gigs/146428100/original/43a4e8ca36aee84bd3e2d9388f8e31f1adf3366e.png",
//           "https://fiverr-res.cloudinary.com/t_gig_cards_web,q_auto,f_auto/gigs/145155138/original/fb51086fd4e7fe74fe60f72015f07f3311224e14.png",
//           "https://fiverr-res.cloudinary.com/t_gig_cards_web,q_auto,f_auto/gigs/99066472/original/3d22deef9c60a97ff3acee145f22d5d077a16aa0.png"
//         ],
//         "description": "Desenho de lápis hiperrealista da sua foto, posso adicionar detalhes de fundo e personalizar o desenho do jeito que você quiser.",
//         "price": 202.11,
//         "daysToMake": 14,
//         "fullname": "andreacarvalho_",
//         "imgUrl": "https://fiverr-res.cloudinary.com/t_profile_original,q_auto,f_auto/attachments/profile/photo/5344c10fd4820db3626c4fc24968783d-1588608774469/1e4a3bd9-b71d-48ce-8ac0-0ff6d667caf4.jpeg",
//         "loc": "Brazil",
//         "memberSince": "May 2020",
//         "avgResponceTime": "1 hour",
//         "lastDelivery": "3 days",
//         "rate": 4.9,
//         "about": "Hello! I'm a brazilian artist specialized in hyperrealistic drawings and paintings of human figures and animals, i use a diversity of techniques like Oil painting, dry pastel drawing and pencil. I have over 30 years of experience, check out my portfolio.",
//         "reviewers": [
//           {
//             "name": "rachelrbarnes1",
//             "country": "United States",
//             "flag": "https://fiverr-dev-res.cloudinary.com/general_assets/flags/1f1fa-1f1f8.png",
//             "review": "Incredibly grateful for the amazing experience working with you . You are so talented and a kind soul! I highly recommend if you want high quality art to work with her every time",
//             "reviewedAt": "Published 1 month ago"
//           },
//           {
//             "name": "mark001994",
//             "country": "Austria",
//             "flag": "https://fiverr-dev-res.cloudinary.com/general_assets/flags/1f1e6-1f1f9.png",
//             "review": "The artist was very kind and polite also very fast at the communication. The delivery of the project was on time. And her work is worth the money. I'm really excited about the painting she did. I can truely recommend the Aritst and her work. Big Thanks! :)",
//             "reviewedAt": "Published 1 month ago"
//           },
//           {
//             "name": "thurstonrobby",
//             "country": "United States",
//             "flag": "https://fiverr-dev-res.cloudinary.com/general_assets/flags/1f1fa-1f1f8.png",
//             "review": "incredible on how precise that art is, picture perfect. 100% amazing job and I will use your services again ...",
//             "reviewedAt": "Published 3 weeks ago"
//           },
//           {
//             "name": "gavrielm",
//             "country": "Israel",
//             "flag": "https://fiverr-dev-res.cloudinary.com/general_assets/flags/1f1ee-1f1f1.png",
//             "review": "amazing saller and great work",
//             "reviewedAt": "Published 6 days ago"
//           },
//           {
//             "name": "garebear52",
//             "country": "United States",
//             "flag": "https://fiverr-dev-res.cloudinary.com/general_assets/flags/1f1fa-1f1f8.png",
//             "review": "Beautiful drawing! Just what I wanted.",
//             "reviewedAt": "Published 1 week ago"
//           }
//         ],
//         "tags": [
//           {
//             "name": "pencil"
//           },
//           {
//             "name": "drawing"
//           },
//           {
//             "name": "portrait"
//           },
//           {
//             "name": "realistic"
//           },
//           {
//             "name": "painting"
//           }
//         ]
//       },
//       {
//         "_id": "g104",
//         "image": "https://fiverr-res.cloudinary.com/t_gig_cards_web,q_auto,f_auto/gigs/207813409/original/9557f50a12d8fccb5c52fb65b35f91cc036f99c6.jpg",
//         "category": [
//           "data entry",
//           "marketing",
//           "arts and crafts"
//         ],
//         "productImgs": [
//           "https://fiverr-res.cloudinary.com/t_gig_cards_web,q_auto,f_auto/gigs/146428100/original/43a4e8ca36aee84bd3e2d9388f8e31f1adf3366e.png",
//           "https://fiverr-res.cloudinary.com/t_gig_cards_web,q_auto,f_auto/gigs/145155138/original/fb51086fd4e7fe74fe60f72015f07f3311224e14.png",
//           "https://fiverr-res.cloudinary.com/t_gig_cards_web,q_auto,f_auto/gigs/187680580/original/e03cbfb4c19b84d78b748678e1a917758d58b81a.jpg",
//           "https://fiverr-res.cloudinary.com/t_gig_cards_web,q_auto,f_auto/gigs/104176703/original/1e4f1323093a63a2beb0cc1ea4388fab6333799a.png"
//         ],
//         "subCategory": "Arts & Crafts",
//         "title": "I will write sociology,psychology and social sciences articles",
//         "description": "Hello, welcome to my Gig, I write sociology psychology and all social sciences content\nI am an expert writer who can help you with writing essays, research projects, and articles on criminology, sociology, and psychology. I gained so much experience over the time. i can handle papers from undergraduate all the way to PHD in criminology and sociology and psychology.\nI always strive to provide best quality to my clients and provide plagiarism-free work. I am also familiar with the following reference formats: APA, MLA, HARVARD, CHICAGO\nPlease contact me before placing an order, thank you.",
//         "price": 33.68,
//         "daysToMake": 3,
//         "fullname": "winny_writer",
//         "imgUrl": "https://fiverr-res.cloudinary.com/t_profile_original,q_auto,f_auto/attachments/profile/photo/e34531bf0bbed9d144dba7384f6473b6-1621577835789/60307055-cde9-4dc2-9e9e-4daa421991d3.jpg",
//         "loc": "Kenya",
//         "memberSince": "May 2021",
//         "avgResponceTime": "1 hour",
//         "lastDelivery": "about 21 hours",
//         "rate": 5,
//         "about": "My name is Mary , a graduate from Mount Kenya University, I am professional writer and my focus is to every single detail. I will transform your dream to reality. I am experienced in article, project/content writing for a couple of years. Furthermore, I have a long history of writing research-focused content and projects. My ultimate goal is to closely with my client to deliver quality and comprehensive project. Let's take your business to the next level. Thank you",
//         "reviewers": [
//           {
//             "name": "far832013",
//             "country": "Canada",
//             "flag": "https://fiverr-dev-res.cloudinary.com/general_assets/flags/1f1e8-1f1e6.png",
//             "review": "I had a bad experience…. The work doesn’t match the requirement at all. Although l sent a specific and detailed question, l received a general answer. Not recommend and will not deal again.",
//             "reviewedAt": "Published 2 months ago"
//           },
//           {
//             "name": "rehanmirdk",
//             "country": "Denmark",
//             "flag": "https://fiverr-dev-res.cloudinary.com/general_assets/flags/1f1e9-1f1f0.png",
//             "review": "She was excellent in communicating, using my references to write a proper academic paper in sociology, and finish in only 15 hours after getting questions. Most recommended seller!",
//             "reviewedAt": "Published 3 weeks ago"
//           },
//           {
//             "name": "raevyn22",
//             "country": "United States",
//             "flag": "https://fiverr-dev-res.cloudinary.com/general_assets/flags/1f1fa-1f1f8.png",
//             "review": "Exactly what I asked for",
//             "reviewedAt": "Published 8 hours ago"
//           },
//           {
//             "name": "raevyn22",
//             "country": "United States",
//             "flag": "https://fiverr-dev-res.cloudinary.com/general_assets/flags/1f1fa-1f1f8.png",
//             "review": "Always gets the job done",
//             "reviewedAt": "Published 1 day ago"
//           },
//           {
//             "name": "junyeongcho",
//             "country": "United States",
//             "flag": "https://fiverr-dev-res.cloudinary.com/general_assets/flags/1f1fa-1f1f8.png",
//             "review": "She could understand the contents and write well",
//             "reviewedAt": "Published 3 days ago"
//           }
//         ],
//         "tags": [
//           {
//             "name": "technical writing"
//           }
//         ]
//       },
//       {
//         "_id": "g105",
//         "image": "https://fiverr-res.cloudinary.com/t_gig_cards_web,q_auto,f_auto/gigs/207580502/original/6d05bb9cde191b9423733c6b49d0e11892e35ee0.jpg",
//         "category": [
//           "data entry",
//           "arts and crafts",
//           "research and summeries"
//         ],
//         "productImgs": [
//           "https://fiverr-res.cloudinary.com/t_gig_cards_web,q_auto,f_auto/gigs/68213576/original/175585d6eb852131867449d113e2c4ed75e67a13.png",
//           "https://fiverr-res.cloudinary.com/t_gig_cards_web,q_auto,f_auto/gigs/68213576/original/175585d6eb852131867449d113e2c4ed75e67a13.png",
//           "https://fiverr-res.cloudinary.com/t_gig_cards_web,q_auto,f_auto/gigs/132488260/original/955d6d66789bd57075f25da7de2b3a4233b2e26a.jpg",
//           "https://fiverr-res.cloudinary.com/t_gig_cards_web,q_auto,f_auto/gigs/32027980/original/afa3c1b5d7f58cee3c0c8c0639a5237075e565b9.jpg"
//         ],
//         "title": "I will do data entry, copy paste, web research as your VA",
//         "description": "Hello Sir/Ma'am,\nHave a cordial welcome to Rashin07’s outstanding services on Fiverr.\nAre you searching for a trustworthy virtual assistant for your projects regarding data entry? I’m here to help. I’m an enthusiastic, hard-working and detail-oriented working person who has developed a mature and responsible approach to any task that I undertake. With excellent teamwork, we always try to work with dedication to achieve a certain objective on time. We are always at your service to provide budget-friendly qualitative work. Check out the following services & Order Now.\nOur Services:\nWeb Research\nCopy Paste Jobs\nData Entry\nData Scraping\nData Conversion (PDF/Image to excel)\nProduct Listing\nShopify / Woo-commerce Product Entry\nLead Generation\nMS Excel (Data Cleaning/Formatting /Chart/Macro)\nManual Typing\nAnd more!\nOur Specialties:\n24/7 customer service\nUnlimited Revisions\nOn-time delivery\nWork efficiently\nPrompt response\nNOTE – Please contact me before placing an order. Feel free to discuss the project & set the right estimations for you.\nRegards\nRashin Faria\nData Entry | Copy Paste | Web Scraping | Web Research | Product Entry",
//         "price": 16.84,
//         "daysToMake": 1,
//         "fullname": "rashin07",
//         "imgUrl": "https://fiverr-res.cloudinary.com/t_profile_original,q_auto,f_auto/attachments/profile/photo/1fe02234f0b300905f098d1c2eef2599-1621414093019/30dd09bd-748a-49c0-b3bc-ee3071bdfadb.jpg",
//         "loc": "Bangladesh",
//         "memberSince": "Feb 2021",
//         "avgResponceTime": "1 hour",
//         "lastDelivery": "about 12 hours",
//         "rate": 4,
//         "about": "Hello! This is Rashin Faria, a Data Entry Specialist & Virtual Assistant at your service. I have excellent experience in Data Entry, Data Processing, Data Uploading, MS Word/Excel, Google Spreadsheet, PDF, Web Research, Ecommerce Product Entry, Data Scraping and others. With a 24/7 supporting team we work together for the betterment of the projects. We have extensive experience to do our project very fast and professionally. Client satisfaction is our first priority. Order Now! Regards Rashin Faria",
//         "reviewers": [
//           {
//             "name": "threeangelsuk",
//             "country": "United Kingdom",
//             "flag": "https://fiverr-dev-res.cloudinary.com/general_assets/flags/1f1ec-1f1e7.png",
//             "review": "Daisy accept the job. However, I think my job could have been done in the hours set and it was not. I would not use again from this experience.",
//             "reviewedAt": "Published 1 month ago"
//           },
//           {
//             "name": "kasper711",
//             "country": "Netherlands",
//             "flag": "https://fiverr-dev-res.cloudinary.com/general_assets/flags/1f1f3-1f1f1.png",
//             "review": "Clear communication, did the job!",
//             "reviewedAt": "Published 1 day ago"
//           },
//           {
//             "name": "jmorgenstern82",
//             "country": "New Zealand",
//             "flag": "https://fiverr-dev-res.cloudinary.com/general_assets/flags/1f1f3-1f1ff.png",
//             "review": "Provided exactly what was required, quickly, and with great communication. Thank you.",
//             "reviewedAt": "Published 2 days ago"
//           },
//           {
//             "name": "philipgrewin",
//             "country": "Sweden",
//             "flag": "https://fiverr-dev-res.cloudinary.com/general_assets/flags/1f1f8-1f1ea.png",
//             "review": "Great, faster than expected!",
//             "reviewedAt": "Published 4 days ago"
//           },
//           {
//             "name": "beanfiver",
//             "country": "United States",
//             "flag": "https://fiverr-dev-res.cloudinary.com/general_assets/flags/1f1fa-1f1f8.png",
//             "review": "Efficient! Great communicator! Highly recommended!",
//             "reviewedAt": "Published 1 week ago"
//           }
//         ],
//         "tags": [
//           {
//             "name": "web research"
//           },
//           {
//             "name": "manual typing"
//           },
//           {
//             "name": "data entry"
//           },
//           {
//             "name": "copy paste"
//           },
//           {
//             "name": "product listing"
//           }
//         ]
//       },
//       {
//         "_id": "g106",
//         "image": "https://fiverr-res.cloudinary.com/t_gig_cards_web,q_auto,f_auto/gigs/156250659/original/694e80206bfd8cebf4e950fd073d382ed0fcd20a.jpg",
//         "category": [
//           "research and summeries",
//           "research and summeries",
//           "research and summeries"
//         ],
//         "productImgs": [
//           "https://fiverr-res.cloudinary.com/t_gig_cards_web,q_auto,f_auto/gigs/132488260/original/955d6d66789bd57075f25da7de2b3a4233b2e26a.jpg",
//           "https://fiverr-res.cloudinary.com/images/t_main1,q_auto,f_auto,q_auto,f_auto/gigs/123518981/original/6b57c2c591ff0513ab3ca5bedaba7107114ff831/design-a-professional-signature-logo-in-24hrs.jpg",
//           "https://fiverr-res.cloudinary.com/t_gig_cards_web,q_auto,f_auto/gigs/91164/original/7a37b6aeebd243f148e71ed76bd8120e88155471.jpg",
//           "https://fiverr-res.cloudinary.com/images/t_main1,q_auto,f_auto,q_auto,f_auto/gigs3/123518981/original/110019e76de514a1dd1984d234c9fd477efd1e77/design-a-professional-signature-logo-in-24hrs.jpg"
//         ],
//         "title": "I will do data entry,web research and lead generation work in excel",
//         "description": "Looking for an experienced data entry expert? don't waste your time, just hire me and relax.\nWe are team of qualified professionals for guaranteed high quality work to our clients\nI will provide professional data entry work, data collecting from web, table graphs and all type of internet research like research related to businesses, companies information and enter into excel within fastest possible time.\nWhether you have big project like thousands of rows entries in excel or very tiny project like minutes of work, i'm here to provide you highly satisfied experience for your project.\nHere are the services we offer:\nData Entry\nWeb Research\nLead Generation\nCopy Paste Work\nCompanies Data Research\nInternet Research\nData Conversion into Excel\nTyping in Excel\nProperty Research\nCopy Paste Work\nPDF to Excel\nFormatting of excel sheets\nWhy hire me?\nGuaranteed quality work\nAll time communication during the project within Fiverr\nQuick Turnaround\nI will give my best and 100% to the project\nI can provide sample for the satisfaction before the order\nFeel free and don't hesitate to contact us for superior work\nNote: All communication and payment should be done via the fiverr platform.",
//         "price": 67.37,
//         "daysToMake": 1,
//         "fullname": "waqarcreatives",
//         "imgUrl": "https://fiverr-res.cloudinary.com/t_profile_original,q_auto,f_auto/attachments/profile/photo/7928a9bdb9e68c7dcc870f7dac91d92b-768025031598387384699/JPEG_20200826_012943_1616096493516260103.jpg",
//         "loc": "Pakistan",
//         "memberSince": "May 2019",
//         "avgResponceTime": "1 hour",
//         "lastDelivery": "3 days",
//         "rate": 5,
//         "about": "Hello fiverr community,my name is Muhammad Waqar and i'm here to help you with your lead generation, web research and data entry projects. We are a group of experts which work together for the betterment of the projects we take from our clients. So don't forget to reach out me for your next project. Thank you very much",
//         "reviewers": [
//           {
//             "name": "elliottbz",
//             "country": "United States",
//             "flag": "https://fiverr-dev-res.cloudinary.com/general_assets/flags/1f1fa-1f1f8.png",
//             "review": "He cared a lot and asked questions, which showed me he wants to give quality work. That was really appreciated.",
//             "reviewedAt": "Published 1 month ago"
//           },
//           {
//             "name": "jeradg21",
//             "country": "United States",
//             "flag": "https://fiverr-dev-res.cloudinary.com/general_assets/flags/1f1fa-1f1f8.png",
//             "review": "Muhammad was responsive and did a good job collecting the information for a very reasonable price. His English isn't perfect, but we didn't struggle to communicate. If you give good directions, you'll get good results.",
//             "reviewedAt": "Published 1 month ago"
//           },
//           {
//             "name": "dustinolsen1",
//             "country": "United States",
//             "flag": "https://fiverr-dev-res.cloudinary.com/general_assets/flags/1f1fa-1f1f8.png",
//             "review": "This was my second time working with waqarcreatives and I love the quickness and level of accuracy. If he doesn't understand something, he asks for clarification before starting the project.",
//             "reviewedAt": "Published 2 months ago"
//           },
//           {
//             "name": "kenneth8239",
//             "country": "United States",
//             "flag": "https://fiverr-dev-res.cloudinary.com/general_assets/flags/1f1fa-1f1f8.png",
//             "review": "Outstanding work. This is the 2nd project that WaqarCreatives completed for me, and I will be back to hire them again!",
//             "reviewedAt": "Published 1 week ago"
//           },
//           {
//             "name": "heirloomclean",
//             "country": "United States",
//             "flag": "https://fiverr-dev-res.cloudinary.com/general_assets/flags/1f1fa-1f1f8.png",
//             "review": "Super efficient - Does amazing work. Have several orders with this seller and they always perform. Thank you so much",
//             "reviewedAt": "Published 2 months ago"
//           }
//         ],
//         "tags": [
//           {
//             "name": "web research"
//           },
//           {
//             "name": "data entry"
//           },
//           {
//             "name": "lead generation"
//           },
//           {
//             "name": "data entry excel"
//           },
//           {
//             "name": "data entry typing"
//           }
//         ]
//       },
//       {
//         "_id": "g107",
//         "image": "https://fiverr-res.cloudinary.com/t_gig_cards_web,q_auto,f_auto/gigs/156250659/original/694e80206bfd8cebf4e950fd073d382ed0fcd20a.jpg",
//         "category": [
//           "data entry",
//           "arts and crafts",
//           "logo"
//         ],
//         "productImgs": [
//           "https://fiverr-res.cloudinary.com/t_gig_cards_web,q_auto,f_auto/attachments/delivery/asset/907e9cc6a0dfc3023841f8c061af2d40-1612374611/Rig-Tours-10.jpg",
//           "https://fiverr-res.cloudinary.com/t_gig_cards_web,q_auto,f_auto/gigs/6140105/original/8bd93aca256ce30d7c73209105b50e12b247f404.jpg",
//           "https://fiverr-res.cloudinary.com/t_gig_cards_web,q_auto,f_auto/gigs/91164/original/7a37b6aeebd243f148e71ed76bd8120e88155471.jpg",
//           "https://fiverr-res.cloudinary.com/t_gig_cards_web,q_auto,f_auto/gigs/85010751/original/e98fcdc7ab0538c8381eb99887b64dbe42a93caf.png"
//         ],
//         "title": "I will do data entry, copy paste and excel data entry work for you",
//         "description": "Hi, Welcome to my Gig page on Fiverr.com!\nNote: Please contact me first before placing an order to check the availability and price estimate of your project.\nDescription:\nDo you need a perfect and professional virtual assistant for Data Entry,Excel Data Entry, Copy Paste Work, Typing Work , Data mining, Data collection using MS Excel, MS Word, Google Spreadsheet or Google doc? Yes, you are in the right place. Please check out my expertise below and the gig extras I'm offering.\nData Entry\nCopy Paste Work\nExcel Data Entry\nProduct Listing\nShopify Product listing\nCRM Data Entry\nData Scraping\nData Conversion\nPDF to Excel or Word\nJPEG to Excel or Word\nTyping in Excel or Word\nBusiness Card Entry\nWordPress Data Entry\nE-commerce Products Listing\nWeb Research and Web Scrapping\nData Collection from Linkedln/Instagram\nProperty Research, Public Record Search\nReal Estate Research and Data Entry (Name, Email, Phone, Address, etc)\nWhy trust me?\nPositive Customer Reviews\nQuick Reply.\nOn-time delivery\nQuality Customer Support\nEfficient time of working\nP.S. - We don't deal with anything outside of Fiverr. Never share your personal information. Thanks!",
//         "price": 33.68,
//         "daysToMake": 1,
//         "fullname": "masum245",
//         "imgUrl": "https://fiverr-res.cloudinary.com/t_profile_original,q_auto,f_auto/attachments/profile/photo/8a1623fd3276ad7297d7647a8727bdf0-1589096119095/6c637953-9dc0-4c9c-b04d-c13c947fdc43.jpg",
//         "loc": "Bangladesh",
//         "memberSince": "Dec 2018",
//         "avgResponceTime": "1 hour",
//         "lastDelivery": "3 days",
//         "rate": 4.4,
//         "about": "I've been working as a Data entry operator for many years. I have a big team with so many professional people for managing data entry tasks. We believe that high quality and customer satisfaction is the most important thing for us. Feel free to drop a message for discussing your needs and objectives.",
//         "reviewers": [
//           {
//             "name": "rechtlogisch",
//             "country": "Germany",
//             "flag": "https://fiverr-dev-res.cloudinary.com/general_assets/flags/1f1e9-1f1ea.png",
//             "review": "There was no communication besides delivering. Receiving a short message with an estimate on delivery time would help to make the process more transparent. Otherwise it seems that the task was forgotten.",
//             "reviewedAt": "Published 2 months ago"
//           },
//           {
//             "name": "barcoxx",
//             "country": "United States",
//             "flag": "https://fiverr-dev-res.cloudinary.com/general_assets/flags/1f1fa-1f1f8.png",
//             "review": "Pros: Communication response time was amazing. Project delivered in the time promised. Quick Response to revision requests. Cons: Got a little bit impatient with me for asking for consecutive revisions, which was actually due to his own oversight, but it all worked out in the end.",
//             "reviewedAt": "Published 2 months ago"
//           },
//           {
//             "name": "teamcafelist",
//             "country": "Singapore",
//             "flag": "https://fiverr-dev-res.cloudinary.com/general_assets/flags/1f1f8-1f1ec.png",
//             "review": "Seller was committed to the task despite the scope stretching beyond the 2hours. He spent more time and completed the sheet, but was very nice about it. I had to tip him because the work done was definitely worth more. Despite having some inaccuracy and formatting issues, I think he did his best",
//             "reviewedAt": "Published 2 months ago"
//           },
//           {
//             "name": "brisbanerrr",
//             "country": "Singapore",
//             "flag": "https://fiverr-dev-res.cloudinary.com/general_assets/flags/1f1f8-1f1ec.png",
//             "review": "Seller went above and beyond, super fast and did much more work than we expected he would be able to get done within the allotted hours. Reordering immediately.",
//             "reviewedAt": "Published 1 month ago"
//           },
//           {
//             "name": "treydurden",
//             "country": "United States",
//             "flag": "https://fiverr-dev-res.cloudinary.com/general_assets/flags/1f1fa-1f1f8.png",
//             "review": "Masum really came through on this task, painful and time consuming, he stayed on it and made it happen. So Happy. Thank you a 1000 times.",
//             "reviewedAt": "Published 2 weeks ago"
//           }
//         ],
//         "tags": [
//           {
//             "name": "typing job"
//           },
//           {
//             "name": "excel data entry"
//           },
//           {
//             "name": "virtual assistant"
//           },
//           {
//             "name": "data entry"
//           },
//           {
//             "name": "copy paste"
//           }
//         ]
//       },
//       {
//         "_id": "g108",
//         "image": "https://fiverr-res.cloudinary.com/t_gig_cards_web,q_auto,f_auto/gigs/199776653/original/b710f145db1a54491e2d777831107c0174c78565.png",
//         "category": [
//           "marketing",
//           "research and summeries",
//           "logo"
//         ],
//         "productImgs": [
//           "https://fiverr-res.cloudinary.com/t_gig_cards_web,q_auto,f_auto/gigs/99066472/original/3d22deef9c60a97ff3acee145f22d5d077a16aa0.png",
//           "https://fiverr-res.cloudinary.com/images/t_main1,q_auto,f_auto,q_auto,f_auto/gigs3/123518981/original/110019e76de514a1dd1984d234c9fd477efd1e77/design-a-professional-signature-logo-in-24hrs.jpg",
//           "https://fiverr-res.cloudinary.com/t_gig_cards_web,q_auto,f_auto/gigs/162295509/original/81ad3690b23118c3da1461f15dfbb3046f0dcb3d.png",
//           "https://fiverr-res.cloudinary.com/t_gig_cards_web,q_auto,f_auto/gigs/187680580/original/e03cbfb4c19b84d78b748678e1a917758d58b81a.jpg"
//         ],
//         "title": "I will do excel data entry, copypaste, and any type of data entry",
//         "description": "I will do excel data entry, copy paste, and any type of data entry\nHello, Welcome to my Gig. Are you looking for a professional virtual assistant for, Excel Data Entry, Typing Work Copy Paste Work, Data Entry, Data collection, Data mining, using MS Word, MS Excel, Google doc, or Google Spreadsheet? Then, you are at the right place. Following are the services that I'm offering.\nExcel Data Entry\nCopy Paste Work\nShopify Product listing\nProduct Listing\nData Entry\nData Conversion\nData Scraping\nJPEG to Excel or Word\nPDF to Excel or Word\nTyping in Excel or Word\nWordPress Data Entry\nWeb Research and Web Scrapping\nE-commerce Products Listing\nProperty Research, Public Record Search\nData Collection from LinkedIn/Instagram\nReal Estate Research and Data Entry (Name, Email, Phone, Address, etc.)\nWhy chose me?\nExtra fast delivery\n100% Quality assurance\nlowest possible rates\nQuick Reply.\nUnlimited Revisions to make sure Maximum customer satisfaction\nData Security\nPlease contact me before placing an order and get my free consultancy about the project how to do it in the best possible way. Also If you need sample work Please feel free to demand.\nThanks & Regards,\nAbrar Hussain",
//         "price": 16.84,
//         "daysToMake": 1,
//         "fullname": "abrar_029",
//         "imgUrl": "https://fiverr-res.cloudinary.com/t_profile_original,q_auto,f_auto/attachments/profile/photo/798a61194492b92313c2f5b27d5397bb-1615924783131/a6a1c7f0-0cc0-4c50-95e1-2693d183ee1c.jpg",
//         "loc": "Pakistan",
//         "memberSince": "Feb 2021",
//         "avgResponceTime": "1 hour",
//         "lastDelivery": "1 day",
//         "rate": 4.4,
//         "about": "I'm glad you're here! My name is Abrar Hussain. I’m a professional Transcriptionist and data entry expert. I’ve a BS degree in Mechanical engineering. From last more than three years, I’ve been working as a Data entry operator and English language transcriptionist. To me, customer satisfaction and providing the best quality work are always my top priorities. I’m really good at MS Office and Transcript. Get yourselves a skillful creator and professional Assistant by simply contacting me. So, drop a message, and let's get started. I am also available for long term projects. Thanks!",
//         "reviewers": [
//           {
//             "name": "mac_x711",
//             "country": "Thailand",
//             "flag": "https://fiverr-dev-res.cloudinary.com/general_assets/flags/1f1f9-1f1ed.png",
//             "review": "As usual, Abrar has been totally amazing in every work that's assigned to him. Words can't be expressed how awesome he is in doing anything that's assigned of him. I'm just thankful that he's always there for me and he goes above and beyond on what I asked of him. He's simply the best. Looking forward to our next projects 😊😊",
//             "reviewedAt": "Published 1 month ago"
//           },
//           {
//             "name": "applist22",
//             "country": "Austria",
//             "flag": "https://fiverr-dev-res.cloudinary.com/general_assets/flags/1f1e6-1f1f9.png",
//             "review": "Abrar and his team did an amazing job. The communication was great and he was every time available to discuss the project and when problems popped up he was flexible and agile to solve them with great effort & motivation. He provided first-class delivery and project management skills and is a reliable partner for any kind of project! I will work with him in the near future again - was a great pleasure and I'm very satisfied!",
//             "reviewedAt": "Published 2 months ago"
//           },
//           {
//             "name": "brandersongroup",
//             "country": "United Kingdom",
//             "flag": "https://fiverr-dev-res.cloudinary.com/general_assets/flags/1f1ec-1f1e7.png",
//             "review": "I’ve worked with Abrar before, and once again he did a great job with what I’d asked him to do. Will definitely be working with him again.",
//             "reviewedAt": "Published 2 months ago"
//           },
//           {
//             "name": "schneida",
//             "country": "Austria",
//             "flag": "https://fiverr-dev-res.cloudinary.com/general_assets/flags/1f1e6-1f1f9.png",
//             "review": "It was a pleasure to work with Abrar and his team. He is fast responding and an awesome problem solver who always reaches the goals for his clients. He is on my shortlist for other jobs in the future for sure.",
//             "reviewedAt": "Published 1 month ago"
//           },
//           {
//             "name": "jarrodrandol238",
//             "country": "United States",
//             "flag": "https://fiverr-dev-res.cloudinary.com/general_assets/flags/1f1fa-1f1f8.png",
//             "review": "This is my second project with him. Delivered on time and exactly how I asked. I would hire him if he lived in Florida!!!",
//             "reviewedAt": "Published 2 days ago"
//           }
//         ],
//         "tags": [
//           {
//             "name": "excel data entry"
//           },
//           {
//             "name": "virtual assistant"
//           },
//           {
//             "name": "data entry"
//           },
//           {
//             "name": "copy paste"
//           },
//           {
//             "name": "typing jobs"
//           }
//         ]
//       },
//       {
//         "_id": "g109",
//         "category": [
//           "data entry",
//           "data entry",
//           "logo"
//         ],
//         "productImgs": [
//           "https://fiverr-res.cloudinary.com/t_gig_cards_web,q_auto,f_auto/gigs/103837432/original/9943dc7e5846e8fa3befd5b90b60dcf4f11bac7c.jpg",
//           "https://fiverr-res.cloudinary.com/t_gig_cards_web,q_auto,f_auto/gigs/132488260/original/955d6d66789bd57075f25da7de2b3a4233b2e26a.jpg",
//           "https://fiverr-res.cloudinary.com/t_gig_cards_web,q_auto,f_auto/gigs/4259374/original/9338a69d06a32a6434c3a493258eca38ad2611f0.png",
//           "https://fiverr-res.cloudinary.com/t_gig_cards_web,q_auto,f_auto/gigs/4259374/original/9338a69d06a32a6434c3a493258eca38ad2611f0.png"
//         ],
//         "image": "https://fiverr-res.cloudinary.com/t_gig_cards_web,q_auto,f_auto/gigs/3171448/original/a41a38f3733bb97279a49d1449f7337dece50693.jpg",
//         "title": "I will design 3 modern minimalist flat logo designs",
//         "subCategory": "Logo Design",
//         "description": "Hi there ! Thanks for stopping by !!\nA Team of Talented Graphic Designer with 8+ years of experience in Graphic Industry, expertise as Logo Maker, You'll get creative & AWESOME logo design for your business.\nMy portfolio : https://www.fiverr.com/users/design_desk/portfolio/NjFiYjE4NmMwZTgwMDUwMDAxZTMzMjJh\n★ Why Us? ★\nTalented Logo Maker Team\nFully custom made, creative, original, UNIQUE and AWESOME designs\nProfessional customer support 24/7\nHigh Quality work\n100% money back policy if not satisfied\n★ WHAT DO YOU GET? ★\n✔ Highly Professional, UNIQUE & High Quality designs\n✔ UNLIMITED revisions until u r 100% satisfied\n✔ Fast turn around time 24 to 48 hours only.\n✔ 100% original & unique vector design from Adobe Illustrator\n✔ Vector Source Files (scalable without any quality loss) (AI, EPS, PDF) for the final design ✔ PROFESSIONAL Communication & Outstanding Customer Support ✔ Guaranteed High Quality work\nIf you have any question,\nFeel free to★ Contact Me! ★I'll be happy to help !\nLet's get started!\n-Your Logo Maker",
//         "price": 33.68,
//         "daysToMake": 3,
//         "fullname": "design_desk",
//         "imgUrl": "https://fiverr-res.cloudinary.com/t_profile_original,q_auto,f_auto/attachments/profile/photo/044fb5914a845a4eb59fc2b69f7f7b32-1634120039750/4dbc2acb-7322-4cd0-9afb-e5190e8e8a0d.jpg",
//         "loc": "India",
//         "memberSince": "Jun 2014",
//         "avgResponceTime": "2 hours",
//         "lastDelivery": "about 3 hours",
//         "rate": 4.2,
//         "about": "Hello! My name is VD. I am a connoisseur of art and music. I love being around nature and my pets. I have a team of professional graphic designers with an experience of 8+ years. We specialize in logo designing. We're available exclusively on fiverr to rock your world with our designing skills. Come and experience it for yourself!",
//         "reviewers": [
//           {
//             "name": "airbornesnow",
//             "country": "United States",
//             "flag": "https://fiverr-dev-res.cloudinary.com/general_assets/flags/1f1fa-1f1f8.png",
//             "review": "The seller's communication was EXCELLENT and the service was exactly as described. When I wanted revisions, they did not hesitate to provide me with alterations of the design. Although they were nice and kind when I asked for the revisions, all the revisions were half a**ed and sloppy. Even when I provided a concept drawing for them to TRACE, the results were still not what I expected. Buyers BEWARE: The seller's communication is excellent, friendly, and VERY kind. However, if you ask for any revisions, the revisions you will receive will be sloppy and half-a**ed.",
//             "reviewedAt": "Published 4 days ago"
//           },
//           {
//             "name": "jacobmnb",
//             "country": "United Kingdom",
//             "flag": "https://fiverr-dev-res.cloudinary.com/general_assets/flags/1f1ec-1f1e7.png",
//             "review": "I thought this service was amazing, I bought the basic option just hoping for a basic logo, but the seller went above my expectations and provided me with a bunch of concepts that were better than I could have imagined, for £7.90 I think this service is a must-buy for anyone needing a professional-looking logo and not wanting to spend a huge amount",
//             "reviewedAt": "Published 2 months ago"
//           },
//           {
//             "name": "ashtonpeckham",
//             "country": "United States",
//             "flag": "https://fiverr-dev-res.cloudinary.com/general_assets/flags/1f1fa-1f1f8.png",
//             "review": "The seller was very responsive. We had revisions after the initial designs were delivered and the seller made them very quickly. The logo we selected is perfect for our current needs. Recommend including your vision in the initial request so you don't end up with ideas that you don't like. There were only 2 real contenders because the Fiverr site wouldn't allow me to attach my hand drawn idea. The paperclip icon was essentially rendered inactive, even after several attempts. This is no fault of the designers; i should have been even more descriptive with my request when I was unable to attach files.",
//             "reviewedAt": "Published 1 week ago"
//           },
//           {
//             "name": "borowski10",
//             "country": "United States",
//             "flag": "https://fiverr-dev-res.cloudinary.com/general_assets/flags/1f1fa-1f1f8.png",
//             "review": "Ultimately, I am very happy with the final logo I received. However, the seller's communication could have been better. There were a few times I asked for specific revisions and I was sent the same thing or something else that I didn't ask for. It took about 2 weeks for me to finally get what I was looking for. In the end, I got what I paid for and I am grateful for the service!",
//             "reviewedAt": "Published 2 days ago"
//           },
//           {
//             "name": "fowlplay_uk",
//             "country": "United Kingdom",
//             "flag": "https://fiverr-dev-res.cloudinary.com/general_assets/flags/1f1ec-1f1e7.png",
//             "review": "VD was great. I had a very specific design in mind already that I needed recreating professionally and they did not disappoint. Even when I started to get picky with the design, nothing I requested was ever too much trouble. We went through many revisions to get it to exactly how I wanted it and every interaction we had was effortless. This is the first project I'd commissioned so wasn't really sure on the correct etiquette, yet VD made things so easy for me. Can't recommend these guys enough for that",
//             "reviewedAt": "Published 2 months ago"
//           }
//         ],
//         "tags": [
//           {
//             "name": "minimalist"
//           },
//           {
//             "name": "flat"
//           },
//           {
//             "name": "logo design"
//           },
//           {
//             "name": "modern"
//           },
//           {
//             "name": "unique"
//           },
//           {
//             "name": "logo maker"
//           }
//         ]
//       },
//       {
//         "_id": "g110",
//         "category": [
//           "marketing",
//           "research and summeries",
//           "logo"
//         ],
//         "productImgs": [
//           "https://fiverr-res.cloudinary.com/t_gig_cards_web,q_auto,f_auto/gigs/4259374/original/9338a69d06a32a6434c3a493258eca38ad2611f0.png",
//           "https://fiverr-res.cloudinary.com/t_gig_cards_web,q_auto,f_auto/gigs/194009784/original/5d2ce9be504e32084e203aaf20151469c65107b3.jpg",
//           "https://fiverr-res.cloudinary.com/t_gig_cards_web,q_auto,f_auto/gigs/170694345/original/df363e7ac460d550b06dbaa484a60e72a53dd227.jpg",
//           "https://fiverr-res.cloudinary.com/t_gig_cards_web,q_auto,f_auto/gigs/103837432/original/9943dc7e5846e8fa3befd5b90b60dcf4f11bac7c.jpg"
//         ],
//         "image": "https://fiverr-res.cloudinary.com/t_gig_cards_web,q_auto,f_auto/gigs/3171448/original/a41a38f3733bb97279a49d1449f7337dece50693.jpg",
//         "title": "I will create modern unique and creative logo design",
//         "description": "Hi esteemed buyer!\nLooking for modern unique and creative 2d or 3d logo design? Yes, you're at the right place.\nHaving a vast experience with hundreds of satisfied customers across the globe, I extend my services to design modern unique and creative logo design to represent your brand idea in a befitting manner.\nWhat proves my individuality over others?\nQuick delivery, quality work and transforming your brain idea into a 3d creative unique and modern logo design are my attributes.\nMY GIG OFFERINGS ARE:\nBest customer care\nRevisions within 24 Hours\n100% satisfaction guaranteed\nModern unique and creative designing ideas\nLogically and aesthetically hypnotizing logos\n1 free revision after completion of order\nEditable and re-sizeable vector files\nFont download link included\nHigh resolution final files in zip\nNote: For Complex Illustrations and Mascots, please discuss in inbox before placing order! It is also not included in our packages.\nHave queries? Contact us in inbox anytime!\n★Hearing from you would be an absolute pleasure, Go ahead and ORDER NOW!★",
//         "price": 84.2,
//         "daysToMake": 2,
//         "fullname": "soduzai_gfx1",
//         "imgUrl": "https://fiverr-res.cloudinary.com/t_profile_original,q_auto,f_auto/attachments/profile/photo/a2dd1a0482bbfe54e61c6c2d6e64696e-1640431251801/943f73b5-dc43-4fe4-9728-9a58f0aafdbc.jpg",
//         "loc": "Pakistan",
//         "memberSince": "Oct 2017",
//         "avgResponceTime": "1 hour",
//         "lastDelivery": "about 25 minutes",
//         "rate": 5,
//         "about": "I am a professional graphics designer from PakIsTaN... Designing is not only my job, it's my Passion. All I need from you is a rough sketch of your idea. Then you can just relax and see the magic happening. Not only you'll get stunning and professional designs, but also you'll have top class custome",
//         "reviewers": [
//           {
//             "name": "devsreads",
//             "country": "United States",
//             "flag": "https://fiverr-dev-res.cloudinary.com/general_assets/flags/1f1fa-1f1f8.png",
//             "review": "Thank you SO MUCH to the seller. He was so patient and willing to work and correct as many times as we needed as some things got miscommunicated and he easily fixed them. Thank you!!!",
//             "reviewedAt": "Published 3 days ago"
//           },
//           {
//             "name": "raymondyslas",
//             "country": "United States",
//             "flag": "https://fiverr-dev-res.cloudinary.com/general_assets/flags/1f1fa-1f1f8.png",
//             "review": "This designer is awesome. I have got my idea materialised in an efficient manner and the way I wanted. Seeing this logo, I would say this is the best designer to do any kind of graphics work.",
//             "reviewedAt": "Published 1 month ago"
//           },
//           {
//             "name": "gbsol579",
//             "country": "United States",
//             "flag": "https://fiverr-dev-res.cloudinary.com/general_assets/flags/1f1fa-1f1f8.png",
//             "review": "This designer is so quick and efficient in his work. My order was delivered in few hours. The design is hypnotizing and truly reflects my business idea. Highly recommended!",
//             "reviewedAt": "Published 1 month ago"
//           },
//           {
//             "name": "antoniodixon65",
//             "country": "United States",
//             "flag": "https://fiverr-dev-res.cloudinary.com/general_assets/flags/1f1fa-1f1f8.png",
//             "review": "This is a really good design. The designer owes the skills needed to actually understand and then materailize a buyer's idea. Commendable and highly recommended.",
//             "reviewedAt": "Published 1 month ago"
//           },
//           {
//             "name": "allendrozdowski",
//             "country": "United States",
//             "flag": "https://fiverr-dev-res.cloudinary.com/general_assets/flags/1f1fa-1f1f8.png",
//             "review": "This designer has done a fantastic job. I like the design sense and colour combination of the designer. This is what I was looking for. I highly recommend him for graphics related work.",
//             "reviewedAt": "Published 1 month ago"
//           }
//         ],
//         "tags": [
//           {
//             "name": "modern logo"
//           },
//           {
//             "name": "creative logo"
//           },
//           {
//             "name": "logo design"
//           },
//           {
//             "name": "unique logo"
//           },
//           {
//             "name": "logo maker"
//           }
//         ]
//       },
//       {
//         "_id": "g111",
//         "category": [
//           "marketing",
//           "arts and crafts",
//           "logo"
//         ],
//         "productImgs": [
//           "https://fiverr-res.cloudinary.com/t_gig_cards_web,q_auto,f_auto/gigs/162295509/original/81ad3690b23118c3da1461f15dfbb3046f0dcb3d.png",
//           "https://fiverr-res.cloudinary.com/t_gig_cards_web,q_auto,f_auto/gigs/99365338/original/cf8a3d6811de78361dd1bd896d10712ce97fd6f1.jpg",
//           "https://fiverr-res.cloudinary.com/t_gig_cards_web,q_auto,f_auto/gigs/127707871/original/58036eaa037a90f7230bfc551916036a455c3e4b.jpg",
//           "https://fiverr-res.cloudinary.com/t_gig_cards_web,q_auto,f_auto/gigs/127707871/original/58036eaa037a90f7230bfc551916036a455c3e4b.jpg"
//         ],
//         "image": "https://fiverr-res.cloudinary.com/t_gig_cards_web,q_auto,f_auto/gigs/125798593/original/fea4f6af37e201fa9cb71a85583fedc171da2a26.jpg",
//         "title": "I will design 3 modern minimalist logo design",
//         "description": "ModernMarvel heartily welcomes you to Minimalist Modern Logo Design gig.\nWe are Brand Creators and professional business consultants. Each business has his own story to tell and having high recall value is prime purpose behind getting a LOGO. Thus, We believe in creating simple yet effective masterpiece which blown away your customers mind.\nYour idea of getting Modern memorable and attractive logo design is just one step away. So, Lets discuss and choose a best design for your business.\nOur recommendation BRANDING PACK @ $65 ONLY:\n5 BRANDED logos with minimal designs + vector source files\nAttractive Social media covers (FB + Twitter)\nProfessional stationery design (B card + letterhead)\nUnlimited revision rounds\nExclusive customer support\nRefund & Package selection guidelines:\nIf the designs are as per your initial shared brief, refund wont be a possible option. You can ask for revision if i missed out anything.\nMy samples are from my premium / standard package.\nWe are closed on Sunday.\nMy key skills:\nMinimalist Modern Logo Design | Minimal | Modern | Typography | Line art | Custom logo | Vintage |\nKeen to Get Started!",
//         "price": 50.52,
//         "daysToMake": 1,
//         "fullname": "modernmarvel",
//         "imgUrl": "https://fiverr-res.cloudinary.com/t_profile_original,q_auto,f_auto/attachments/profile/photo/d366617946e54cbc9aa114f27259e3ef-1552848300306/3c155f72-15c9-47d0-8f68-b75a519a7999.jpg",
//         "loc": "India",
//         "memberSince": "Mar 2019",
//         "avgResponceTime": "2 hours",
//         "lastDelivery": "about 22 minutes",
//         "rate": 5,
//         "about": "I am a professional artist having rich experience in hand sketched and digital artwork. I have served tons of businesses with smarter business solutions. I am here to get the global exposure and would like to contribute more towards our creative community. Thanks.",
//         "reviewers": [
//           {
//             "name": "bartstrijbos",
//             "country": "Netherlands",
//             "flag": "https://fiverr-dev-res.cloudinary.com/general_assets/flags/1f1f3-1f1f1.png",
//             "review": "Use your revisions and communication, and you will have something that works for you! I recommend modernmarvel for the price they ask! I did not know what to expect from my first buy on FIverr. The previews where what I was going for, so I thought why not give it a try. The initial delivery had two good concepts and three concepts I did not like. The two good concepts however, where not really what I wanted though. I submitted a revision proposal and hoped for the best. This is where this seller shines! From the initial designs, he worked quickly with every suggestion I made for revisions and was good in communication. I slowly saw my project evolving to something I love. Recommended!",
//             "reviewedAt": "Published 2 months ago"
//           },
//           {
//             "name": "v_winko33",
//             "country": "United States",
//             "flag": "https://fiverr-dev-res.cloudinary.com/general_assets/flags/1f1fa-1f1f8.png",
//             "review": "Working with this seller was a great experience in that he was quick to respond (considering the 11+ hr time zone difference), friendly, reliable, and professional. He created some concepts with literally no reference the first time around, and the second time around I gave him more of an idea of what I was looking for and found the ideal logo. You get what you pay for, and the price I think is a very good deal that's hard to find. Communication +asking questions is key to get all that you want and need from this great offer. Although I am satisfied with the logo, I probably would've liked something more like the work he shows in his second picture on his profile/gigs. I do recommend him!",
//             "reviewedAt": "Published 3 weeks ago"
//           },
//           {
//             "name": "brendanpaull",
//             "country": "Japan",
//             "flag": "https://fiverr-dev-res.cloudinary.com/general_assets/flags/1f1ef-1f1f5.png",
//             "review": "Seller was extremely communicative and always responded very quickly even on his/her day off (Sunday). While I got something that will get my started and I suppose I got what I paid for (the price was definitely quite low), I would be hard pressed to call the designs I got as \"modern\" or \"minimalist\" like the logo presented in the profile. They felt like clip-art from 10 to 15 years ago attached to my website name.",
//             "reviewedAt": "Published 1 month ago"
//           },
//           {
//             "name": "tracyblehm",
//             "country": "Canada",
//             "flag": "https://fiverr-dev-res.cloudinary.com/general_assets/flags/1f1e8-1f1e6.png",
//             "review": "I was a little nervous as I had never hired anyone before and have had bad experiences on other platforms. However this was absolutely marvelous. I loved the design. It was shocking how fast it was done and how amazing it turned out. I will definitely be hiring them again for my other projects that are coming up. Thank-you!!",
//             "reviewedAt": "Published 2 months ago"
//           },
//           {
//             "name": "jai_s22",
//             "country": "United States",
//             "flag": "https://fiverr-dev-res.cloudinary.com/general_assets/flags/1f1fa-1f1f8.png",
//             "review": "Using this service was a pretty decent experience. It took a bit longer than I wanted to finally get the final design. I had to go back and forth for a week trying to find the correct revision of the design. At first, I thought the experience of the designer was not the best due to finding some logos with minimal effort. Once I messaged the designer that I felt that the designs that they were producing were not satisfying me, they then were able to put a lot of effort into my ideas. I personally had to come up with the design of my logo instead of them using their experience and trusting them to come up with one themselves. Eventually, they did deliver so I am happy with the way it finished.",
//             "reviewedAt": "Published 2 weeks ago"
//           }
//         ],
//         "tags": [
//           {
//             "name": "modern logo"
//           },
//           {
//             "name": "custom logo"
//           },
//           {
//             "name": "logo design"
//           },
//           {
//             "name": "minimalist logo"
//           },
//           {
//             "name": "website logo"
//           },
//           {
//             "name": "logo maker"
//           }
//         ]
//       },
//       {
//         "_id": "g112",
//         "category": [
//           "logo",
//           "logo",
//           "logo"
//         ],
//         "productImgs": [
//           "https://fiverr-res.cloudinary.com/t_gig_cards_web,q_auto,f_auto/gigs/162295509/original/81ad3690b23118c3da1461f15dfbb3046f0dcb3d.png",
//           "https://fiverr-res.cloudinary.com/images/t_main1,q_auto,f_auto,q_auto,f_auto/gigs3/123518981/original/110019e76de514a1dd1984d234c9fd477efd1e77/design-a-professional-signature-logo-in-24hrs.jpg",
//           "https://fiverr-res.cloudinary.com/video/upload/t_gig_cards_web/k6gayzavecij4zskucom.png",
//           "https://fiverr-res.cloudinary.com/t_gig_cards_web,q_auto,f_auto/gigs/103837432/original/9943dc7e5846e8fa3befd5b90b60dcf4f11bac7c.jpg"
//         ],
//         "image": "https://fiverr-res.cloudinary.com/t_gig_cards_web,q_auto,f_auto/gigs/142024147/original/25c0cb214ccc1e1458cb975cddec0e3e348f75ee.jpg",
//         "title": "I will do professional modern business logo design with copyrights",
//         "subCategory": "Logo Design",
//         "description": "Greetings!! Welcome to Budding Solutions.\n\"Your one-stop-shop for all your graphic needs\"\nIf you are looking for a Modern and Professional Business logo design, then you are at the right place. We focus on creating simple yet effective designs that elevate your business outlook and leave an everlasting impression.\nWe stand out from our competition due to our best-in-class Customer Support and Quality Designs.\nWhy Us?\n✔ Combination of experience and creativity\n✔ Unique and original designs\n✔ Superior customer care and satisfaction\n✔ Transparent and High-resolution image types\n✔ Different types of source files (AI, EPS, PDF and SVG)\n✔ Complete Branding Guide\n✔ Unlimited revisions until you are 100% satisfied\n✔ Full Copyrights\nMASCOT DESIGNS ARE NOT INCLUDED IN BASIC OR STANDARD GIGS.\nTHE DESIGNS SHOWN ON THE PORTFOLIO ARE FROM STANDARD OR PREMIUM PACKS.\nLogo Design | Professional Logo | Modern Logo | Badge | Hand drawn | Feminine | Signature | Business Logo\nWe look forward to working with you. Please don't hesitate to reach out at any time with any questions.\nPlease review the FAQ section for further clarification.",
//         "price": 151.55,
//         "daysToMake": 2,
//         "fullname": "shailene_george",
//         "imgUrl": "https://fiverr-res.cloudinary.com/t_profile_original,q_auto,f_auto/attachments/profile/photo/3ec0d56f436079ef157dbcc1d21c4c62-1625030446037/1c926a30-7aa5-4de8-9a3b-6565be7ddd5b.jpg",
//         "loc": "Pakistan",
//         "memberSince": "Jun 2016",
//         "avgResponceTime": "1 hour",
//         "lastDelivery": "about 16 minutes",
//         "rate": 4.5,
//         "about": "Welcome to Budding Solutions. An agency of 15+ Graphic Designers with great expertise. We strive to provide unique & graphically rich designs with exceptional & lifetime customer service. Let us be your GO-TO option for your graphic design needs and you won't be disappointed.",
//         "reviewers": [
//           {
//             "name": "bossymouse",
//             "country": "Netherlands",
//             "flag": "https://fiverr-dev-res.cloudinary.com/general_assets/flags/1f1f3-1f1f1.png",
//             "review": "I'd recommend this seller. She was skilled and very communicative. Also I got tons of revisions as promised and always quickly. Sometimes it was hard to get her to polish the details as I intended, I think because of the language barrier, but if a revision turned out different than I expected she started working on it again without asking questions. Lastly she gave tips about branding when needed. To be honest I'm not quite sure if the social media kit and website optimized image were worth my money, because those were mostly the same image in different ratios. But I probably had unrealistic expectations. On the other hand the copyright document is very polished and accurate!",
//             "reviewedAt": "Published 1 week ago"
//           },
//           {
//             "name": "coastalcleaners",
//             "country": "United States",
//             "flag": "https://fiverr-dev-res.cloudinary.com/general_assets/flags/1f1fa-1f1f8.png",
//             "review": "I'm so grateful & thrilled that I can say, my experience was a sucess! I love my LOGO that Shailene created, I couldn't be happier! I reached out and let her know exactly what I needed, she promptly responded and made me an offer. I couldn't refuse, as she was more than willing to accommodate my budget. She sent me the drafts soon after, and I was pleased to see the results! I didn't need any revisions and I'm pleased to say that I've now got a NEW LOGO For my Brand/Company. I officially feel Accomplished! Thank you SO Much Shailene and Fiverr! You have made this journey so much lighter on my feet, and I would definitely recommend Shailene as an Artist and the Fiverr company!",
//             "reviewedAt": "Published 3 weeks ago"
//           },
//           {
//             "name": "ndethlefs",
//             "country": "United States",
//             "flag": "https://fiverr-dev-res.cloudinary.com/general_assets/flags/1f1fa-1f1f8.png",
//             "review": "This was the first time I've used Fiverr and was a little worried how it would go. This was by far the best experience I've had working with someone remote and at a fair price. shailene_george always got back to me right away. I couldn't be happier with my experience and will also being recommending George to anyone I can and using again when needed. 5 stars all the way here!",
//             "reviewedAt": "Published 3 weeks ago"
//           },
//           {
//             "name": "mrmikevh",
//             "country": "United States",
//             "flag": "https://fiverr-dev-res.cloudinary.com/general_assets/flags/1f1fa-1f1f8.png",
//             "review": "Shailene is awesome to work with. Very professional and attentive. She deliveries amazing work at a value you just can't find anywhere else. As a busy front-end developer, I find buying her premium GIG is the way to go. My clients are always blown away with her work. She has made me a customer for life with her work and her friendly personality. Thank you Shailene and bless you. Can't wait for our next GIG together.",
//             "reviewedAt": "Published 2 months ago"
//           },
//           {
//             "name": "j_powell23",
//             "country": "United States",
//             "flag": "https://fiverr-dev-res.cloudinary.com/general_assets/flags/1f1fa-1f1f8.png",
//             "review": "A friend of mine (Maximum Performance Productions) recommended Fiverr. I'm starting a new business and needed a design to catapult us to new heights. It didn't take long to find the right artist. Shallene was able to capture my idea and interpret it into the design that I am very pleased with. Her communication skills and response time are second to none. She is very informative and answered all my questions satisfactorily. Shallene performed her tasks timely and without delay. I am forever grateful for the outstanding designs she has provided and would highly recommend her to anyone. Thank You Shallene!",
//             "reviewedAt": "Published 1 week ago"
//           }
//         ],
//         "tags": [
//           {
//             "name": "modern logo"
//           },
//           {
//             "name": "logo"
//           },
//           {
//             "name": "custom logo"
//           },
//           {
//             "name": "creative logo"
//           },
//           {
//             "name": "professional logo"
//           },
//           {
//             "name": "logo maker"
//           }
//         ]
//       },
//       {
//         "_id": "g113",
//         "category": [
//           "data entry",
//           "marketing",
//           "marketing"
//         ],
//         "productImgs": [
//           "https://fiverr-res.cloudinary.com/t_gig_cards_web,q_auto,f_auto/gigs/621340/original/a5624b7fbe6e0ec37e94894fd3ea68251a0fae5c.png",
//           "https://fiverr-res.cloudinary.com/images/t_main1,q_auto,f_auto,q_auto,f_auto/gigs3/123518981/original/110019e76de514a1dd1984d234c9fd477efd1e77/design-a-professional-signature-logo-in-24hrs.jpg",
//           "https://fiverr-res.cloudinary.com/t_gig_cards_web,q_auto,f_auto/gigs/103837432/original/9943dc7e5846e8fa3befd5b90b60dcf4f11bac7c.jpg",
//           "https://fiverr-res.cloudinary.com/images/t_main1,q_auto,f_auto,q_auto,f_auto/gigs3/123518981/original/110019e76de514a1dd1984d234c9fd477efd1e77/design-a-professional-signature-logo-in-24hrs.jpg"
//         ],
//         "image": "https://fiverr-res.cloudinary.com/t_gig_cards_web,q_auto,f_auto/gigs/157827646/original/8f14f50a81ddd1a60b4af990ea5154a26975d150.jpg",
//         "title": "I will write you an attractive instagram bio",
//         "description": "The FIRST thing a potential follower sees on your page is your bio.\nStand out, and build trust with a bio that informs and captivates everyone who views it. This will not only attract new people to your page, but it will keep them there!\nYou've seen those profiles on Instagram that look amazing, and you deserve that for your business too.\nGet the Instagram bio you need, and with it, more followers and clients!\nWhat you'll receive:\n⭐ One unique, professionally designed bio\n⭐ A captivating layout that engages your viewers\n⭐ A call to action, if required\n⭐ 24 hour delivery\n⭐ 100% Satisfaction Guarantee\nLet's build you a great Instagram page that is sure to bring AND KEEP followers.\nIf you BUY a gig from me always feel free to request a revision if you need any part of your order revised. Thank you.",
//         "price": 50.52,
//         "daysToMake": 1,
//         "fullname": "bellavida123",
//         "imgUrl": "https://fiverr-res.cloudinary.com/t_profile_original,q_auto,f_auto/attachments/profile/photo/9e2d7f453419c08e138fbfe9e65347df-696051281638594671.588431/DD8E6DDC-C231-47D3-B61A-97274452D3BF",
//         "loc": "Jamaica",
//         "memberSince": "May 2018",
//         "avgResponceTime": "1 hour",
//         "lastDelivery": "about 23 hours",
//         "rate": 4.6,
//         "about": "Thanks for stopping by! I'm a Social Media Specialist with 8+ years experience. I can help with all your Social Media related tasks! Send me a message. Let's get it done!",
//         "reviewers": [
//           {
//             "name": "bswoll51",
//             "country": "United States",
//             "flag": "https://fiverr-dev-res.cloudinary.com/general_assets/flags/1f1fa-1f1f8.png",
//             "review": "She was amazing! Told me exactly when she would start. Got it done and over-delivered! Tips to grow my following and exclusive tailoring of my bio. She can call me The Terminator because I'll be back. 🤣",
//             "reviewedAt": "Published 1 month ago"
//           },
//           {
//             "name": "dawnmichaela",
//             "country": "United States",
//             "flag": "https://fiverr-dev-res.cloudinary.com/general_assets/flags/1f1fa-1f1f8.png",
//             "review": "My bio turned out better than I could have hoped for! She took all my words and ideas and turned it in to a clear and powerful bio. I highly recommend working with her. She is easy to communicate with, responds quickly, and got it done fast. I would definitely use her again.",
//             "reviewedAt": "Published 1 week ago"
//           },
//           {
//             "name": "iidark",
//             "country": "United Kingdom",
//             "flag": "https://fiverr-dev-res.cloudinary.com/general_assets/flags/1f1ec-1f1e7.png",
//             "review": "Wonderful working with this seller. The work is as promised and delivered on time and on point. I would definitely recommend their work, in fact I'm about to book another gig from them.",
//             "reviewedAt": "Published 2 weeks ago"
//           },
//           {
//             "name": "singh_manu1313",
//             "country": "New Zealand",
//             "flag": "https://fiverr-dev-res.cloudinary.com/general_assets/flags/1f1f3-1f1ff.png",
//             "review": "She is really good. I ordered two bio and both are amazing. Very easy to convey the message. And she did exactly what i was looking for. Definitely recommend",
//             "reviewedAt": "Published 1 week ago"
//           },
//           {
//             "name": "charliericeiii",
//             "country": "United States",
//             "flag": "https://fiverr-dev-res.cloudinary.com/general_assets/flags/1f1fa-1f1f8.png",
//             "review": "Thank you so much for creating my bios for me on my social media pages. We got it right how we wanted it to I appreciate that. God bless!",
//             "reviewedAt": "Published 3 weeks ago"
//           }
//         ],
//         "tags": [
//           {
//             "name": "bio"
//           },
//           {
//             "name": "instagram marketing"
//           },
//           {
//             "name": "instagram"
//           },
//           {
//             "name": "social media"
//           },
//           {
//             "name": "social network"
//           }
//         ]
//       },
//       {
//         "_id": "g114",
//         "category": [
//           "logo",
//           "research and summeries",
//           "research and summeries"
//         ],
//         "productImgs": [
//           "https://fiverr-res.cloudinary.com/images/t_main1,q_auto,f_auto,q_auto,f_auto/gigs/123518981/original/6b57c2c591ff0513ab3ca5bedaba7107114ff831/design-a-professional-signature-logo-in-24hrs.jpg",
//           "https://fiverr-res.cloudinary.com/t_gig_cards_web,q_auto,f_auto/gigs/162295509/original/81ad3690b23118c3da1461f15dfbb3046f0dcb3d.png",
//           "https://fiverr-res.cloudinary.com/images/t_main1,q_auto,f_auto,q_auto,f_auto/gigs/123518981/original/6b57c2c591ff0513ab3ca5bedaba7107114ff831/design-a-professional-signature-logo-in-24hrs.jpg",
//           "https://fiverr-res.cloudinary.com/images/t_main1,q_auto,f_auto,q_auto,f_auto/gigs/123518981/original/6b57c2c591ff0513ab3ca5bedaba7107114ff831/design-a-professional-signature-logo-in-24hrs.jpg"
//         ],
//         "image": "https://fiverr-res.cloudinary.com/video/upload/so_0.0,t_gig_cards_web/jylhbgosxfqilptpru24.png",
//         "title": "I will create an effective instagram hashtag growth strategy",
//         "description": "Why me?\nI have worked with Fortune 500 brands such as Adidas, L’Oreal, Xiaomi & Pfizer on numerous marketing and branding campaigns.\nI’ve successfully delivered 4000+ hashtag strategies with over 2600+ happy clients to help them achieve organic instagram growth.\nWhy my service?\nI will strategically research, analyze & handpick best-performing hashtags tailored to your Instagram account. I will teach you:\n✅ How you can effectively use hashtags to rank and grow organically\n✅ How to avoid bad hashtags to avoid negative growth\n✅ Stand out from your competition and increase your sales\n✅ How to increase traffic and conversion organically\n✅ Account optimization and posting secrets to gain new Instagram followers\nWhat will you get?\n✅ Data-backed high-ranking hashtags tailored to your niche and brand\n✅ Profile optimization so you can be discovered quickly\n✅ Personalized hashtag strategy to help you grow and increase your followers\n✅ Expert video guide to teach you to find high-ranking hashtags\n✅ Monthly newsletter based on Instagram's newest algorithm updates\n✅ Masters Course 2021/2022 (Platinum or Diamond Gig)",
//         "price": 50.52,
//         "daysToMake": 3,
//         "fullname": "tommysiu",
//         "imgUrl": "https://fiverr-res.cloudinary.com/t_profile_original,q_auto,f_auto/attachments/profile/photo/429c1a9395f66cd8a36b38028ff35aa6-1550219507580/db25059c-6725-4e49-bf82-fa4d2af0a780.jpg",
//         "loc": "Hong Kong",
//         "memberSince": "Aug 2016",
//         "avgResponceTime": "3 hours",
//         "lastDelivery": "about 1 hour",
//         "rate": 4.8,
//         "about": "Hello! My name is Tommy. I am a multi-displinary marketer with experience in both the Western and Chinese digital marketing landscape. I am passionate about crafting impactful experiences and digital marketing strategies at the intersection of brand and product. I have worked in London, Hong Kong and in Shanghai for companies such as the Adidas, L'Oreal, Pfizer and Danone I currently offer Instagram growth and TikTok marketing strategies on Fiverr",
//         "reviewers": [
//           {
//             "name": "jayebiz",
//             "country": "United States",
//             "flag": "https://fiverr-dev-res.cloudinary.com/general_assets/flags/1f1fa-1f1f8.png",
//             "review": "I am very new to organic growth and trying to work Instagram in the best way possible for my business. I found this seller on a whim and WOW. I know that a lot of his reviews say that he is amazing but I didn't expect nearly HALF of what I got. It was so good that I immediately printed it out and made it into my own little book to reference as I go through the process of building my Instagram audience. In all honesty, I think that he should charge way more for what he gives. I can't believe I got so much value at this very fair price! Thank you so much and I can't WAIT to implement your strategies starting TODAY!!",
//             "reviewedAt": "Published 2 months ago"
//           },
//           {
//             "name": "basayra",
//             "country": "United States",
//             "flag": "https://fiverr-dev-res.cloudinary.com/general_assets/flags/1f1fa-1f1f8.png",
//             "review": "I was very very skeptical. Since this is my 1st business. I truly appreciated I was able to communicate with him and let him know about my \"unique\" nitch. Before we even proceeded he asked for my Instagram to make sure he could provided the services I requested. I was not prepared for the the whole breakdown!! I am shocked as to how much information I received for the price. Not only did i receive information regarding hashtags, but when to post, what to write under the post, how to not repost to the same things to become saturated . I can't wait to implement this new information to my Gram. Sooooo yeah about my unique niche go follow @ba_sayra.",
//             "reviewedAt": "Published 1 month ago"
//           },
//           {
//             "name": "marialeeheller",
//             "country": "United States",
//             "flag": "https://fiverr-dev-res.cloudinary.com/general_assets/flags/1f1fa-1f1f8.png",
//             "review": "As other sellers described- the service is excellent, especially for the price. I did notice some spelling errors but that did not detract from the overall informative report. I am very pleased with the delivery and I learned A LOT. Also, the hashtags he provided were on point- very impressed. Let me preface this by saying that I had purchased similar hashtag research from another top seller on this platform and what I received was subpar. My business has elements of sustainability that I haven't pushed too much (because the 100% sustainable products haven't launched yet), but he picked up on it and delivered results that included this. 👏👏👏",
//             "reviewedAt": "Published 2 months ago"
//           },
//           {
//             "name": "soniabukh",
//             "country": "Italy",
//             "flag": "https://fiverr-dev-res.cloudinary.com/general_assets/flags/1f1ee-1f1f9.png",
//             "review": "Tommy is absolutely great! My expectations were high because of all the other excellent reviews, but wow he really does go above and beyond! I got the most basic hashtag strategy package and not only did he do a great job with it, he also included a lot of bonus information and tools. If you're tired of not knowing how Instagram works and trying random tactics hoping they'll work and get your account seen, let me offer you a suggestion: buy this gig! You won't regret it! I can't wait to start implementing all his great advice. P.S. Communication was great and delivery was on time!",
//             "reviewedAt": "Published 2 months ago"
//           },
//           {
//             "name": "ricarda20",
//             "country": "Germany",
//             "flag": "https://fiverr-dev-res.cloudinary.com/general_assets/flags/1f1e9-1f1ea.png",
//             "review": "Wow, I agree with everything everyone else said: Tommy overdelivers by far. What an amazing package. Thank you so much Tommy. It will take awhile to work through it but wow, I am speechless. To everyone who is considering using Tommy's service: DO IT!",
//             "reviewedAt": "Published 1 week ago"
//           }
//         ],
//         "tags": [
//           {
//             "name": "instagram hashtags"
//           },
//           {
//             "name": "instagram marketing"
//           },
//           {
//             "name": "instagram"
//           },
//           {
//             "name": "instagram growth"
//           }
//         ]
//       },
//       {
//         "_id": "g115",
//         "category": [
//           "logo",
//           "logo",
//           "research and summeries"
//         ],
//         "productImgs": [
//           "https://fiverr-res.cloudinary.com/t_gig_cards_web,q_auto,f_auto/gigs/145155138/original/fb51086fd4e7fe74fe60f72015f07f3311224e14.png",
//           "https://fiverr-res.cloudinary.com/t_gig_cards_web,q_auto,f_auto/gigs/145155138/original/fb51086fd4e7fe74fe60f72015f07f3311224e14.png",
//           "https://fiverr-res.cloudinary.com/video/upload/t_gig_cards_web/yan7cajqzb88t9yjbgdi.png",
//           "https://fiverr-res.cloudinary.com/t_gig_cards_web,q_auto,f_auto/gigs/68762796/original/3e060210316e42972fbe0b478a67f315d3263a64.jpg"
//         ],
//         "image": "https://fiverr-res.cloudinary.com/t_gig_cards_web,q_auto,f_auto/gigs/3171448/original/a41a38f3733bb97279a49d1449f7337dece50693.jpg",
//         "title": "I will do organic promotion and marketing for youtube monetization",
//         "subCategory": "Social Media Marketing",
//         "description": "Do you want to Monitize your YouTube Channel?\ni'm the best for digital media marketing, i will help you make youtube monetization\nSafe methods we use:\n· Web 2.0\n· iFrame Embedding\n· PPC advertising campaign\n· Do SEO friendly Video optimization\n· Will share video in Suggested & related videos\n· Add video in Niche related playlists for more impressions\nI strictly follow YT and Fiverr TOS so it means you will get organic You Tube Promotion for your channel monetization.\nREQUIREMENT:\nChannel Link\nWhat do you get from this gig?\n● Watch time boost\n● Compliance with YT TOS\n● Fully Organic And Real Traffic\n● 100% chances of monetization\n● Naturally helps in Video Ranking\nThink that your best friend is Elon Musk, and tomorrow morning you are asking him to post a post asking people to watch your vide0, probably you will get monetized in less than an hour!\nI do the same, just without Elon Musk :)",
//         "price": 101.04,
//         "daysToMake": 7,
//         "fullname": "farah_youtube",
//         "imgUrl": "https://fiverr-res.cloudinary.com/t_profile_original,q_auto,f_auto/attachments/profile/photo/5db4b0cccf5a3e138a9f57542175248c-1620011414308/8d7f7d68-efe9-465e-80d2-aedcc548efdb.JPG",
//         "loc": "Vietnam",
//         "memberSince": "Nov 2019",
//         "avgResponceTime": "1 hour",
//         "lastDelivery": "about 4 hours",
//         "rate": 4.9,
//         "about": "I am trained in online marketing, and I have studied SEO, Ads (Google, Facebook, Bing...), I have 6 years of experience in digital marketing, in which time working at fiverr is 3 years, with more than 2000 completed orders, the main work that I do is: - Youtube seo and promotion - SEO - Website traffics - Spotify promotion - Instagram promotion Contact me if you have any questions!",
//         "reviewers": [
//           {
//             "name": "tonyamajette",
//             "country": "United States",
//             "flag": "https://fiverr-dev-res.cloudinary.com/general_assets/flags/1f1fa-1f1f8.png",
//             "review": "The seller got me the promotion that I needed, however, she stated that I could contact her if I had any problems and I did and she was not helpful. This is my second gig with her and she was great at many things but not so much at helping me to understand or correct issues with the result of her efforts. I had planned to use her for many other gigs but in light of her response to my request for help, I cannot. I do recommend her for getting you the numbers that you need but if you are denied, do not expect any help from her to actually get passed the review process for monetization.",
//             "reviewedAt": "Published 1 month ago"
//           },
//           {
//             "name": "robertpetyko",
//             "country": "Hungary",
//             "flag": "https://fiverr-dev-res.cloudinary.com/general_assets/flags/1f1ed-1f1fa.png",
//             "review": "She delivered as promised. I was sceptical . I bought a smallest package. My watch hour went up. Also gained a lot of subscribers. Some been deleted. But what`s been promised been delivered. So well done !",
//             "reviewedAt": "Published 1 week ago"
//           },
//           {
//             "name": "brucefrausto893",
//             "country": "Thailand",
//             "flag": "https://fiverr-dev-res.cloudinary.com/general_assets/flags/1f1f9-1f1ed.png",
//             "review": "she increased my subscribers amount by a little over 1000 subscribers and over 4000 watch hours. I recommend to anyone who wants a boost for their channel.",
//             "reviewedAt": "Published 1 month ago"
//           },
//           {
//             "name": "vwgbooks",
//             "country": "United Kingdom",
//             "flag": "https://fiverr-dev-res.cloudinary.com/general_assets/flags/1f1ec-1f1e7.png",
//             "review": "The gig was good, nothing amazing. I didn't really notice any difference when using this gig. Watch time, subs didn't increase that much. I did order the lowest gig, so I wasn't expecting big numbers or anything. It was a good gig and the seller was easy to work with.",
//             "reviewedAt": "Published 2 weeks ago"
//           },
//           {
//             "name": "dulline",
//             "country": "Romania",
//             "flag": "https://fiverr-dev-res.cloudinary.com/general_assets/flags/1f1f7-1f1f4.png",
//             "review": "I just want to be short and clear she is the BEST ! Very happy and satisfied what she did to my youtube channel ! A lot of subscribers and more what she said and more watch hours.If you want to grow your youtube channel fast and organic 100% real she is the ONE who can do it ! Thank you very much Farah !",
//             "reviewedAt": "Published 2 weeks ago"
//           }
//         ],
//         "tags": [
//           {
//             "name": "youtube"
//           },
//           {
//             "name": "monetization"
//           },
//           {
//             "name": "youtube channel"
//           },
//           {
//             "name": "youtube promotion"
//           }
//         ]
//       },
//       {
//         "_id": "g116",
//         "category": [
//           "data entry",
//           "research and summeries",
//           "research and summeries"
//         ],
//         "productImgs": [
//           "https://fiverr-res.cloudinary.com/t_gig_cards_web,q_auto,f_auto/gigs/85010751/original/e98fcdc7ab0538c8381eb99887b64dbe42a93caf.png",
//           "https://fiverr-res.cloudinary.com/t_gig_cards_web,q_auto,f_auto/gigs/756993/original/25cb6cee0b0a3b28d3650b13b1dd6de4956e28c5.jpg",
//           "https://fiverr-res.cloudinary.com/t_gig_cards_web,q_auto,f_auto/gigs/68213576/original/175585d6eb852131867449d113e2c4ed75e67a13.png",
//           "https://fiverr-res.cloudinary.com/t_gig_cards_web,q_auto,f_auto/gigs/132488260/original/955d6d66789bd57075f25da7de2b3a4233b2e26a.jpg"
//         ],
//         "image": "https://fiverr-res.cloudinary.com/video/upload/so_1.760625,t_gig_cards_web/ffupfvrslj3mos2byhrh.png",
//         "title": "I will develop a content strategy for your brand or business",
//         "description": "Quality content, industry-specific keywords, and a social media plan will help your business and brand soar! I am a digital marketing strategist and content creator who is ready to help build your online presence.\nWhat you will get:\nAn evaluation of your current page(s) to identify your strengths and weaknesses\nA custom strategy specific to your brand, mission, and standards\nCustom designed graphics created for your target audience\nSEO optimized keywords to use in captions and as hashtags\nAround the clock customer service and communication to help you with anything and everything you need\nI am here to take your brand to the next level! Message me with any questions you have.",
//         "price": 151.55,
//         "daysToMake": 5,
//         "fullname": "mariarotunda",
//         "imgUrl": "https://fiverr-res.cloudinary.com/t_profile_original,q_auto,f_auto/attachments/profile/photo/d098c50d82476b11568f3a50111a8a89-1636128369729/ef737ebd-6908-47bc-be50-963dabe16d0e.jpg",
//         "loc": "United States",
//         "memberSince": "Jul 2020",
//         "avgResponceTime": "7 hours",
//         "lastDelivery": "1 week",
//         "rate": 5,
//         "about": "Hello! My name is Maria, and I am a digital marketer with over 3 years of experience working with diverse brands and businesses. I am well versed in everything marketing, SEO, graphic design, writing, and video editing. I am a one-stop shop for whatever you and your brand needs. I look to working with you!",
//         "reviewers": [
//           {
//             "name": "thaddeuswill410",
//             "country": "United States",
//             "flag": "https://fiverr-dev-res.cloudinary.com/general_assets/flags/1f1fa-1f1f8.png",
//             "review": "Omg, This seller was amazing and exactly what we needed.. We were kinda in a funk and need to be saved. She did just that with amazing energy, a wonderful attitude and passion for what she does. The strategy was perfect, Thanks again for bringing us great value.. Highly Suggested..",
//             "reviewedAt": "Published 2 weeks ago"
//           },
//           {
//             "name": "nickjuliano",
//             "country": "United States",
//             "flag": "https://fiverr-dev-res.cloudinary.com/general_assets/flags/1f1fa-1f1f8.png",
//             "review": "Excellent job! I’ve been using Fiverr for 3 years now and by far one of the best results/deliverables that I’ve gotten. The video describing what you did was a step above the rest. I’ll definitely be implementing your suggestions. I appreciate all of your hard work.",
//             "reviewedAt": "Published 1 month ago"
//           },
//           {
//             "name": "joshuanathan474",
//             "country": "United States",
//             "flag": "https://fiverr-dev-res.cloudinary.com/general_assets/flags/1f1fa-1f1f8.png",
//             "review": "Really smooth transaction. She went above and beyond in detail for the marketing / brand style guides. Looking to get more tasks completed with the Seller.",
//             "reviewedAt": "Published 2 months ago"
//           },
//           {
//             "name": "onyxwoman",
//             "country": "United States",
//             "flag": "https://fiverr-dev-res.cloudinary.com/general_assets/flags/1f1fa-1f1f8.png",
//             "review": "She did a really good job that prompted me to make some badly needed changes. The advice was really good. I especially liked the video input.",
//             "reviewedAt": "Published 1 month ago"
//           },
//           {
//             "name": "tcbrownvo",
//             "country": "United States",
//             "flag": "https://fiverr-dev-res.cloudinary.com/general_assets/flags/1f1fa-1f1f8.png",
//             "review": "Provided excellent service and good direction. Thank you.",
//             "reviewedAt": "Published 1 week ago"
//           }
//         ],
//         "tags": [
//           {
//             "name": "instagram marketing"
//           },
//           {
//             "name": "web marketing"
//           },
//           {
//             "name": "social media manager"
//           },
//           {
//             "name": "social marketers"
//           },
//           {
//             "name": "seo marketing"
//           }
//         ]
//       },
//       {
//         "_id": "g117",
//         "category": [
//           "research and summeries",
//           "marketing",
//           "arts and crafts"
//         ],
//         "productImgs": [
//           "https://fiverr-res.cloudinary.com/t_gig_cards_web,q_auto,f_auto/gigs/621340/original/a5624b7fbe6e0ec37e94894fd3ea68251a0fae5c.png",
//           "https://fiverr-res.cloudinary.com/t_gig_cards_web,q_auto,f_auto/gigs/756993/original/25cb6cee0b0a3b28d3650b13b1dd6de4956e28c5.jpg",
//           "https://fiverr-res.cloudinary.com/t_gig_cards_web,q_auto,f_auto/gigs/103068639/original/6fc1138155083b9ffc1e14be3bb8e7036bee0356.jpg",
//           "https://fiverr-res.cloudinary.com/t_gig_cards_web,q_auto,f_auto/gigs/85010751/original/e98fcdc7ab0538c8381eb99887b64dbe42a93caf.png"
//         ],
//         "image": "https://fiverr-res.cloudinary.com/t_gig_cards_web,q_auto,f_auto/gigs/222820209/original/50b95e0afd209c75fa3693b835fd0db671249736.png",
//         "title": "I will perform research on any subject matter for you",
//         "description": "I have over 5 years of experience conducting high-quality, detailed research throughout my Master of Science by Research degree and PhD programme.\nThe training and projects I have undertaken in my degrees have given me the ability to efficiently source key information. In particular, the niche research required for academic theses has made me proficient at sourcing the most relevant details.\nFurthermore, I have learned how to synthesise a lot of information in a short period of time, incorporate it into further research, and write what I have learned into top-quality publications. This allows me to pinpoint the most important information and produce concise, detailed summaries.\nI will provide a document in whichever format you require (e.g. Word.docx, Adobe.pdf) complete with a detailed summary, references and links should you wish to conduct further research. If you would like me to conduct follow-up research based on what I have provided, please do not hesitate to get in touch for discounted rates.\n<---- PLEASE NOTE: I will not write academic articles, essays or papers. ---->\nPLEASE GET IN TOUCH BEFORE ORDERING TO DISCUSS YOUR REQUIREMENTS.",
//         "price": 202.07,
//         "daysToMake": 4,
//         "fullname": "struhenderson",
//         "imgUrl": "https://fiverr-res.cloudinary.com/t_profile_original,q_auto,f_auto/attachments/profile/photo/eb6eef20969192eca1d8b1301e91cb4f-1630440851285/60f03cc4-71f2-437b-a241-f9423b6e2728.jpg",
//         "loc": "United Kingdom",
//         "memberSince": "Aug 2021",
//         "avgResponceTime": "2 hours",
//         "lastDelivery": "4 days",
//         "rate": 4.4,
//         "about": "I am a current Doctoral Researcher with a strong research and scientific history, having published academic papers and presented at numerous international conferences. I have a BSc (Hons), a MScR, and have nearly finished my PhD. My experience has given me excellent research and written communication skills, as well as knowledge of how to present and illustrate data digitally. I am highly experienced in the use of the Microsoft Office and Adobe suite of apps. Outside of my career I am very interested in applying my scientific training to aspects of fitness and nutrition.",
//         "reviewers": [
//           {
//             "name": "veeg10",
//             "country": "Jordan",
//             "flag": "https://fiverr-dev-res.cloudinary.com/general_assets/flags/1f1ef-1f1f4.png",
//             "review": "Amazing work! Every word is unique and all ideas were related to the research even though, the research question had some complexity. He even went extra miles and Straun is very genuine with great communication. I recommend Straun to anyone seeking for an excellent, clear research. THANKS! I am keen to see the next research!",
//             "reviewedAt": "Published 2 months ago"
//           },
//           {
//             "name": "schapes47",
//             "country": "Netherlands",
//             "flag": "https://fiverr-dev-res.cloudinary.com/general_assets/flags/1f1f3-1f1f1.png",
//             "review": "Struan´s research is outstanding. Meticulous work and a stellar ability to synthesize information in the shortest amount of time. The price is also very fair taking the quality of the research into consideration. Can only recommend and if I ever need assistance in research I know whom to work with again!",
//             "reviewedAt": "Published 3 weeks ago"
//           },
//           {
//             "name": "harrybenham228",
//             "country": "United Kingdom",
//             "flag": "https://fiverr-dev-res.cloudinary.com/general_assets/flags/1f1ec-1f1e7.png",
//             "review": "Once again, Struan exceeded expectations and delivered an excellent research review. He implements a lot of referencing, proving his depth of research- I will definitely work with him again, thank you!",
//             "reviewedAt": "Published 2 months ago"
//           },
//           {
//             "name": "harrybenham228",
//             "country": "United Kingdom",
//             "flag": "https://fiverr-dev-res.cloudinary.com/general_assets/flags/1f1ec-1f1e7.png",
//             "review": "Struan's work is exceptional! His communication, service and final delivery were of the highest quality and even better than expected. I will definitely choose him for research work again!",
//             "reviewedAt": "Published 2 months ago"
//           },
//           {
//             "name": "bossbroc",
//             "country": "United States",
//             "flag": "https://fiverr-dev-res.cloudinary.com/general_assets/flags/1f1fa-1f1f8.png",
//             "review": "My absolute go-to researcher!",
//             "reviewedAt": "Published 3 hours ago"
//           }
//         ],
//         "tags": [
//           {
//             "name": "online research"
//           },
//           {
//             "name": "research"
//           },
//           {
//             "name": "internet researcher"
//           }
//         ]
//       },
//       {
//         "_id": "g118",
//         "category": [
//           "arts and crafts",
//           "marketing",
//           "logo"
//         ],
//         "productImgs": [
//           "https://fiverr-res.cloudinary.com/t_gig_cards_web,q_auto,f_auto/gigs/125591662/original/8fe883adb620795bf7808202a13dc25525875109.png",
//           "https://fiverr-res.cloudinary.com/t_gig_cards_web,q_auto,f_auto/gigs/104176703/original/1e4f1323093a63a2beb0cc1ea4388fab6333799a.png",
//           "https://fiverr-res.cloudinary.com/t_gig_cards_web,q_auto,f_auto/gigs/99365338/original/cf8a3d6811de78361dd1bd896d10712ce97fd6f1.jpg",
//           "https://fiverr-res.cloudinary.com/t_gig_cards_web,q_auto,f_auto/gigs/170694345/original/df363e7ac460d550b06dbaa484a60e72a53dd227.jpg"
//         ],
//         "image": "https://fiverr-res.cloudinary.com/t_gig_cards_web,q_auto,f_auto/gigs/217276086/original/6a004b8b82868ab02836bdfcb42c4a0e4b042f87.png",
//         "title": "I will provide quality essays research and summaries on any topic",
//         "description": "GET CUSTOM ORDERS, QUALITY WORK, AND AN AMAZING EXPERIENCE\nIf you're looking for a professional researcher and a committed writer for all your writing needs, click on this gig because I can't wait to work with YOU.\nI am an expert writer with over 8 years' experience. I guarantee quality, original content written from scratch, plagiarism free, and delivered within the shortest time possible. My main areas of expertise are\nResearch\nEnglish\nHistory\nBusiness\nPsychology\nnursing, arts\nEducation\nCriminal justice\nSociology\nSupply chain\nLogistics\nCase studies\nMarketing\nSummary Writing\nI will offer YOU:\n100% Plagiarism free content\nTimely turnaround\nTop-notch grammar\nWell researched and referenced content\n24/7 Customer support\nKindly contact me before placing an order.\nPS: Custom orders also available upon request",
//         "price": 67.36,
//         "daysToMake": 1,
//         "fullname": "victoriaeva610",
//         "imgUrl": "https://fiverr-res.cloudinary.com/t_profile_original,q_auto,f_auto/attachments/profile/photo/34a47e49caa09a703d81ef0621ad0ac1-1626197544385/3cb9eb7a-2163-4722-a1b0-0ddb9eb04d4e.png",
//         "loc": "Kenya",
//         "memberSince": "Jul 2021",
//         "avgResponceTime": "1 hour",
//         "lastDelivery": "about 16 hours",
//         "rate": 4.4,
//         "about": "I am an enthusiastic and proficient writer with 4+ years of research related experience. My journey in the writing industry kicked off at the University where I did countless research and gained more experience. I will assist you with any kind of research and solve your different business needs. Please reach out for excellent and timely work.",
//         "reviewers": [
//           {
//             "name": "isabellaava851",
//             "country": "United States",
//             "flag": "https://fiverr-dev-res.cloudinary.com/general_assets/flags/1f1fa-1f1f8.png",
//             "review": "The seller went above and beyond and highly recommend u look no further. Her ability to create such detailed projects has convinced me that she is the best at what she does and will work with her again and again.",
//             "reviewedAt": "Published 3 weeks ago"
//           },
//           {
//             "name": "lincoingabriel",
//             "country": "United States",
//             "flag": "https://fiverr-dev-res.cloudinary.com/general_assets/flags/1f1fa-1f1f8.png",
//             "review": "This seller was extremely communicative, which I really appreciated. The seller was prompt with the delivery and the work was professionally done! I would highly recommend and use the services again!",
//             "reviewedAt": "Published 3 weeks ago"
//           },
//           {
//             "name": "tiffanyhaddish",
//             "country": "United States",
//             "flag": "https://fiverr-dev-res.cloudinary.com/general_assets/flags/1f1fa-1f1f8.png",
//             "review": "Awesome at communication and writing. Really sweet and understanding, goes above and beyond to assure customer satisfaction!! 5 out of 5 recommend!!!",
//             "reviewedAt": "Published 3 weeks ago"
//           },
//           {
//             "name": "loganmax688",
//             "country": "United States",
//             "flag": "https://fiverr-dev-res.cloudinary.com/general_assets/flags/1f1fa-1f1f8.png",
//             "review": "a great buyer with great understanding on the task, I will definitely come again and again, I am really impressed.",
//             "reviewedAt": "Published 3 weeks ago"
//           },
//           {
//             "name": "candiceaponte",
//             "country": "United States",
//             "flag": "https://fiverr-dev-res.cloudinary.com/general_assets/flags/1f1fa-1f1f8.png",
//             "review": "She got me my assignment back in 6 hours. Thank you so much",
//             "reviewedAt": "Published 7 hours ago"
//           }
//         ],
//         "tags": [
//           {
//             "name": "reports"
//           },
//           {
//             "name": "articles"
//           },
//           {
//             "name": "internet researcher"
//           },
//           {
//             "name": "summaries"
//           }
//         ]
//       },
//       {
//         "_id": "g119",
//         "category": [
//           "logo",
//           "marketing",
//           "research and summeries"
//         ],
//         "productImgs": [
//           "https://fiverr-res.cloudinary.com/t_gig_cards_web,q_auto,f_auto/gigs/194009784/original/5d2ce9be504e32084e203aaf20151469c65107b3.jpg",
//           "https://fiverr-res.cloudinary.com/t_gig_cards_web,q_auto,f_auto/gigs/132488260/original/955d6d66789bd57075f25da7de2b3a4233b2e26a.jpg",
//           "https://fiverr-res.cloudinary.com/t_gig_cards_web,q_auto,f_auto/gigs/68213576/original/175585d6eb852131867449d113e2c4ed75e67a13.png",
//           "https://fiverr-res.cloudinary.com/t_gig_cards_web,q_auto,f_auto/gigs/91164/original/7a37b6aeebd243f148e71ed76bd8120e88155471.jpg"
//         ],
//         "image": "https://fiverr-res.cloudinary.com/t_gig_cards_web,q_auto,f_auto/gigs/210082068/original/f1d222ff641f41a63cce8235a6a5128f05b477bc.jpg",
//         "title": "I will deliver quality case study analysis, articles, research and summaries",
//         "description": "Hi, thank you for clicking my gig.\nKindly contact me before placing an order to discuss the requirements and check for availability.\nAre you looking for a professional for your essays, articles, case study, reflections, summary and research work? Then look no further, you are on the right PLACE.\nI am here to provide you with high-quality and professional services. I have been in the writing industry for over six years. As a researcher, I have a keen interest in identifying major problems and proposing better solutions/recommendations against them.\nWhat you will get from this gig?\nUnique and creative content\nOn-time delivery\nEngaging content\nWell researched and quality work\n100% plagiarism-free\nN/B: I OFFER SERVICES ACCORDING TO FIVERR TERMS OF SERVICE (TOS).",
//         "price": 33.68,
//         "daysToMake": 2,
//         "fullname": "angela_637",
//         "imgUrl": "https://fiverr-res.cloudinary.com/t_profile_original,q_auto,f_auto/attachments/profile/photo/03e667c26a63c20863e016917c423eb0-1622910916319/85930fed-bb45-4b01-b117-3913f19b77d7.PNG",
//         "loc": "Kenya",
//         "memberSince": "Apr 2021",
//         "avgResponceTime": "1 hour",
//         "lastDelivery": "about 2 hours",
//         "rate": 4.9,
//         "about": "I am a professional and diligent writer with more than 6 years experience as a freelance writer. My goal is your satisfaction and to deliver work that you will appreciate. Writing is my passion and I aim to do excellent work for all my clients that will meet the set goals and standards.",
//         "reviewers": [
//           {
//             "name": "myaznd",
//             "country": "United States",
//             "flag": "https://fiverr-dev-res.cloudinary.com/general_assets/flags/1f1fa-1f1f8.png",
//             "review": "Her work is absolutely amazing ! Delivered on time and very accommodating . would definitely recommend . I will be reaching out again .",
//             "reviewedAt": "Published 1 month ago"
//           },
//           {
//             "name": "evanclark",
//             "country": "United States",
//             "flag": "https://fiverr-dev-res.cloudinary.com/general_assets/flags/1f1fa-1f1f8.png",
//             "review": "excellent experience. Angela delivered exactly what she said she would. Very thorough and High quality of service and communication. will definitely work with again!",
//             "reviewedAt": "Published 2 months ago"
//           },
//           {
//             "name": "ronneishapicket",
//             "country": "United States",
//             "flag": "https://fiverr-dev-res.cloudinary.com/general_assets/flags/1f1fa-1f1f8.png",
//             "review": "Didn’t need any modifications was absolutely perfect ! Got me an A so I highly recommend! And will be shopping in the future",
//             "reviewedAt": "Published 1 month ago"
//           },
//           {
//             "name": "klemicha",
//             "country": "Austria",
//             "flag": "https://fiverr-dev-res.cloudinary.com/general_assets/flags/1f1e6-1f1f9.png",
//             "review": "Angela did a great job in a short time, understood the task easily, communicated well & has good language skills. Thanks a lot :)",
//             "reviewedAt": "Published 1 week ago"
//           },
//           {
//             "name": "whatsrealeasy",
//             "country": "United States",
//             "flag": "https://fiverr-dev-res.cloudinary.com/general_assets/flags/1f1fa-1f1f8.png",
//             "review": "great work on the research",
//             "reviewedAt": "Published 4 days ago"
//           }
//         ],
//         "tags": [
//           {
//             "name": "research and summary"
//           },
//           {
//             "name": "case study"
//           },
//           {
//             "name": "research"
//           },
//           {
//             "name": "summary"
//           },
//           {
//             "name": "articles"
//           }
//         ]
//       },
//       {
//         "_id": "g120",
//         "category": [
//           "data entry",
//           "data entry",
//           "research and summeries"
//         ],
//         "productImgs": [
//           "https://fiverr-res.cloudinary.com/t_gig_cards_web,q_auto,f_auto/gigs/146428100/original/43a4e8ca36aee84bd3e2d9388f8e31f1adf3366e.png",
//           "https://fiverr-res.cloudinary.com/t_gig_cards_web,q_auto,f_auto/gigs/162295509/original/81ad3690b23118c3da1461f15dfbb3046f0dcb3d.png",
//           "https://fiverr-res.cloudinary.com/t_gig_cards_web,q_auto,f_auto/gigs/125591662/original/8fe883adb620795bf7808202a13dc25525875109.png",
//           "https://fiverr-res.cloudinary.com/t_gig_cards_web,q_auto,f_auto/gigs/621340/original/a5624b7fbe6e0ec37e94894fd3ea68251a0fae5c.png"
//         ],
//         "image": "https://fiverr-res.cloudinary.com/t_gig_cards_web,q_auto,f_auto/gigs/232972469/original/679ec7f5d8e49604c2290664620969803d96f7c7.jpg",
//         "title": "I will do market research, business research, swot analysis, and competitive analysis",
//         "description": "Hello Fiverr Community,\nThis is Layee, A professional Business Consultant.\nBefore venturing in to any field in the business sector, it’s important to carry out a prior study, and carry out market research on that particular business.\nI will carry out a comprehensive market research for you, and come up with a detailed market research report.\nThe Market Research Report will cover the following areas depending on the package & availability of information: -\n· Market Research\n· Competitor analysis\n· Industry analysis\n· Product Research\n· Market Segmentation\n· Porter's Five Forces Analysis\n· Pestle Analysis\n· Market Trends\n· Market Drivers\n· Marketing Mix\n· Market Size\n· Total Available Market (TAM)\n· Demographics\n· SWOT Analysis\n· Market Growth\n· Marketing Options\n· Marketing Strategies\n· Future Markets\n· Web Research\n· Business Plan (Gig Extra)\nAnd Many More….\nThe success of your business is my primary objective/priority, and will offer all these services so that you are able to achieve your business objectives easily, and on time (or",
//         "price": 168.39,
//         "daysToMake": 1,
//         "fullname": "layee84",
//         "imgUrl": "https://fiverr-res.cloudinary.com/t_profile_original,q_auto,f_auto/attachments/profile/photo/b398d51589f16ed08ca0510c2c5edbe2-1636020659427/ecb5ae5e-d22a-47bc-bd9f-e7b2f99c0994.jpg",
//         "loc": "Kenya",
//         "memberSince": "Nov 2021",
//         "avgResponceTime": "1 hour",
//         "lastDelivery": "4 days",
//         "rate": 2.4,
//         "about": "Hi, my name is Lay. I'm a professional writer in Microsoft word, excel, PowerPoint expert with years of experience. Through my time of work, I have been able to manage tasks such as document formatting & editing, designing, cleanup, and typing of documents for both individual firms and local governments, having worked that long I'm proficient and have the capacity in executing tasks involved in different fields requested by the client. Welcome, let us work together. regards, Troyeb84.",
//         "reviewers": [
//           {
//             "name": "njameshoward",
//             "country": "United States",
//             "flag": "https://fiverr-dev-res.cloudinary.com/general_assets/flags/1f1fa-1f1f8.png",
//             "review": "Great communication and speed",
//             "reviewedAt": "Published 2 weeks ago"
//           },
//           {
//             "name": "lucasnowak224",
//             "country": "Pakistan",
//             "flag": "https://fiverr-dev-res.cloudinary.com/general_assets/flags/1f1f5-1f1f0.png",
//             "review": "Brilliant communication, time management and highly appreciate the hardwork and input.",
//             "reviewedAt": "Published 1 month ago"
//           },
//           {
//             "name": "lucasnowak224",
//             "country": "Pakistan",
//             "flag": "https://fiverr-dev-res.cloudinary.com/general_assets/flags/1f1f5-1f1f0.png",
//             "review": "Met tight deadline with great communication and cooperation.",
//             "reviewedAt": "Published 4 weeks ago"
//           },
//           {
//             "name": "muradyoussef",
//             "country": "Austria",
//             "flag": "https://fiverr-dev-res.cloudinary.com/general_assets/flags/1f1e6-1f1f9.png",
//             "review": "verrrrrrrrrrrrrrrry gooooooooooooooooood",
//             "reviewedAt": "Published 2 months ago"
//           },
//           {
//             "name": "cantillo16",
//             "country": "Costa Rica",
//             "flag": "https://fiverr-dev-res.cloudinary.com/general_assets/flags/1f1e8-1f1f7.png",
//             "review": "Excellent service",
//             "reviewedAt": "Published 2 months ago"
//           }
//         ],
//         "tags": [
//           {
//             "name": "competitive analysis"
//           },
//           {
//             "name": "business research"
//           },
//           {
//             "name": "market research"
//           },
//           {
//             "name": "reports"
//           },
//           {
//             "name": "swot analysis"
//           }
//         ]
//       }
//     ]
//     storageService.store(KEY, gigs);
//   }
//   return gigs;
// }
