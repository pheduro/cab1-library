/* ============================================================
   Editable content for the Cabancalan I ES Library website.
   Photos are loaded from the shared Google Drive folder.
   TO USE LOCAL PHOTOS INSTEAD: download them into /images and
   change the `src()` helper below to return "images/" + name.
   ============================================================ */

const DRIVE_IMG = (id, w = 1200) => `https://drive.google.com/thumbnail?id=${id}&sz=w${w}`;

/* Hero slideshow photos (Drive file IDs) */
const HERO_IDS = [
  "1WoeyGSGFF5Kz5gPhu3LcdKjKUZyEPM_8", // lib1
  "1_79HZ__CMOJ8QJNDazKHxoBqwaELF8jE", // lib2
  "166q12aVnlEf9nmhSbrLcUtYzraygzcm6", // front
  "1sLZUXUanx4STewWT8zKIk-VfVZNFrDmN", // front 2
  "1zxCOaR-6sSBNfpgFt5aapxdd1DKackih"  // lib3
];

/* Gallery photos (Drive file IDs) */
const GALLERY_IDS = [
  "1WoeyGSGFF5Kz5gPhu3LcdKjKUZyEPM_8","1_79HZ__CMOJ8QJNDazKHxoBqwaELF8jE","1zxCOaR-6sSBNfpgFt5aapxdd1DKackih",
  "1jyZJhKFe1FPvV2ocvgGyT386c5_K2f2_","1XXlxpiFS3hb7x0BvLlNvd6iqzfKhM8BC","166q12aVnlEf9nmhSbrLcUtYzraygzcm6",
  "1sLZUXUanx4STewWT8zKIk-VfVZNFrDmN","1A0e6bg_gl7V82yAKWLsSiQBU7TKPgGsd","1mCF60oNa5QpMNYnYEI0He2DUuFNSD6nM",
  "1j75yzptfnAG8socBUyH9uIZ9ZSII2Jb6","15a92_ot2hEfKdjvH4_WPnbyKpYutN-pj","13a1IxJ13NiRagiUGQFqamoPyFMmGQkzv",
  "1KKUHkmb6NzxTvwHUnLGCxTFvsucsTT5s","11Eug7fbFcmj5ABXH8ekO6qgAkvSdUAYE","16gVhzOBxBDSHPGZhu5HhpBz0OwmJaxW6",
  "1g3xF66erwgweJA-skHGlzcuvCPiH64ZF","172aX9xfPQ24ndqUK0TBWYu8xqGq7688T","1TYd-btqLzWM_mlwGQPLl8lqcHQzXWhOD",
  "1En0D2G8tIgI_wIiUecbKfRinuR3vVBjX","1e62IC6Mi7KRtxO-URXWw0D1BqdGhpnaH","1VwnsYjWYZytRxdJ7LKJHOJD6uXEgEkM9",
  "1TUgm38jA-X1XR8ssdTkoXojptPflYHMT","1EdpkQG47rKqnlnZ5fonfElvAscPnHk8S","1v-P3Dh17KzL5zFw4NqpBf1ulMJeMD9jB",
  "1cef3HabPWB_GNSz-GcKWIei5_1bMKiQN","1vmUp7b5j7wWfzT1JSp23D8PXGU09gY1P","1aJkOXt8ybG4Ii_JA02-Z-kf2PmRAipYc",
  "1v28c93HjI9ZHiIhR3XhC21QK_9FlOBb2","1DQ8SPi2LuzQhnkf4mK0MjOQjJ5Q7pMkR","1tqenvO8EeNy4wRykVu1YeXn-7THDh9wV",
  "15KN2YTnAHd5NmpvjjDo0b5b4tVCJHdzI","19c4p_AyF_Jfp7v3E2VV77Ey6gElIijtJ","1QwwuLG36hN5sy0uRpbp7UrnGT8HOg9uh",
  "1vGfgiDLYl4PyS3lVzwQaMLWDgwG4jfwZ"
];

const QUOTES = [
  "Literacy is so important to our lives that it's difficult to fathom not being able to do it.",
  "A reader lives a thousand lives before he dies.",
  "Today a reader, tomorrow a leader.",
  "Drop everything and read!",
  "Every book is a doorway to a new world."
];

/* Reading programs (from the SY 2026–2027 Reading Plan) */
const PROGRAMS = [
  {n:1,icon:"📖",name:"DEAR – Drop Everything and Read",grades:"K–6",freq:"Weekly",
   what:"Learners choose a book and read independently for 10–15 minutes, then record it in a reading log.",
   result:"Stronger reading habits and regular library use."},
  {n:2,icon:"⭐",name:"Book of the Week",grades:"K–6",freq:"Weekly",
   what:"One featured book each week with a picture walk, vocabulary activity, guided reading and reflection.",
   result:"More interest in books and better vocabulary and comprehension."},
  {n:3,icon:"🪑",name:"Read-Aloud Corner",grades:"K–3",freq:"2× a month",
   what:"Teachers, the library coordinator or volunteers read stories aloud while learners predict, answer and retell.",
   result:"Better listening, oral language and love of stories."},
  {n:4,icon:"🤝",name:"Buddy Reading",grades:"All",freq:"Monthly",
   what:"Older learners read with younger partners, asking questions and retelling together.",
   result:"Confidence, fluency and peer support."},
  {n:5,icon:"🔎",name:"Book Detective",grades:"2–6",freq:"Monthly",
   what:"Learners take on “missions” to find information in library books and record what they discover.",
   result:"Skill in locating and using information from print resources."},
  {n:6,icon:"🎤",name:"Read and Tell",grades:"2–6",freq:"Monthly",
   what:"Learners read a text, then share the title, characters or topic, key events, favorite part and what they learned.",
   result:"Comprehension, summarizing and speaking skills."},
  {n:7,icon:"🗺️",name:"Story Map Challenge",grades:"3–6",freq:"Monthly",
   what:"After reading a story, learners map its characters, setting, problem, events, solution and lesson.",
   result:"Deeper understanding of how stories are built."},
  {n:8,icon:"🌱",name:"Little Readers’ Corner",grades:"K–3",freq:"2–3× a week",
   what:"Phonics and word games, echo and choral reading, and short-text practice for emerging readers.",
   result:"Better word recognition, fluency and confidence."},
  {n:9,icon:"🏫",name:"One Grade, One Story",grades:"All",freq:"Once a quarter",
   what:"Every grade level reads a common story with activities suited to its level; outputs are displayed in the library.",
   result:"A school-wide reading culture."},
  {n:10,icon:"🛂",name:"Library Reading Passport",grades:"K–6",freq:"Whole year",
   what:"Learners record the books they read, write or draw a short response, and earn recognition for reading milestones.",
   result:"Steady reading motivation all year long."}
];

/* Calendar of activities (from the SY 2026–2027 Library Calendar) */
const CALENDAR = [
  {m:"JUL",name:"July",items:[["Week 1","Inventory of library materials"],["Week 2","Library set-up"]]},
  {m:"AUG",name:"August",items:[["Week 1","Library orientation – Kindergarten"],["Week 2","Library orientation – Grade 1"],["Week 3","Library orientation – Grade 2"],["Week 4","Library orientation – Grade 3"]]},
  {m:"SEP",name:"September",items:[["Week 1","Library orientation – Grade 4"],["Week 2","Library orientation – Grade 5"],["Week 3","Library orientation – Grade 6"],["Week 4","Library orientation – newly hired teachers"]]},
  {m:"OCT",name:"October – Reading Month",items:[["Week 1","Orientation on Reading Month activities"],["Weeks 2–4","Reading Month celebration activities"]]},
  {m:"NOV",name:"November – Reading Month",items:[["Week 1","Orientation on Reading Month activities"],["Weeks 2–4","Reading Month celebration activities"]]},
  {m:"DEC",name:"December",items:[["All month","Library services and reading activities led by the librarian"]]},
  {m:"JAN",name:"January",items:[["All month","Learners do research, read story books and study online with library support"]]},
  {m:"FEB",name:"February",items:[["All month","Learners do research, read story books and study online with library support"]]},
  {m:"MAR",name:"March",items:[["All month","Learners do research, read story books and study online with library support"]]},
  {m:"APR",name:"April",items:[["Week 1","Inventory of books"],["Weeks 2–4","Library closing activities"]]}
];

/* Downloadable / viewable resources (Google Drive links) */
const RESOURCES = [
  {type:"pdf",title:"Library Brochure (2026)",desc:"Services, library profile, resources, legal bases and rules at a glance.",
   url:"https://drive.google.com/file/d/1DpTvZc19QbFrtjTkzYqPrl4K_j5WGYx9/view"},
  {type:"doc",title:"Library Implementation Plan SY 2026–2027",desc:"Rationale, objectives and the three-term plan for building a functional School Library and Learning Resource Center.",
   url:"https://drive.google.com/file/d/1nkCWAUz2HbYo4oXb_CcZPqg_Hx-B4Or8/view"},
  {type:"doc",title:"School Library Reading Plan SY 2026–2027",desc:"The ten reading activities, term focus, monitoring indicators and success measures.",
   url:"https://drive.google.com/file/d/1FGnEJ9ZMYEioTHK34CRrFijpGwhacGG1/view"},
  {type:"doc",title:"Reading Activities Implementation Matrix",desc:"Objectives, target learners, schedules and expected outcomes of every reading activity.",
   url:"https://drive.google.com/file/d/1Uo6QgnpuE4GGfAiCsy0r0iBPgJ0VOWJu/view"},
  {type:"doc",title:"Calendar of Library Activities SY 2026–2027",desc:"Month-by-month and week-by-week schedule of orientations, Reading Month and more.",
   url:"https://drive.google.com/file/d/19vDkUHxcZnD6b7VgGiSmzi9SK60RdWsv/view"}
];
