// Course content for the "Digital Course Playbook" — text lessons rendered the
// same way as the candlestick Foundations (headings, examples, takeaways).
// Plain data, safe to import anywhere.

import type { FoundationLesson } from "./courseContent";

// Reuse the Foundation lesson shape { slug, title, tagline, minutes, sections[], takeaways[] }.
export const PLAYBOOK_MODULES: FoundationLesson[] = [
  {
    slug: "the-opportunity",
    title: "Why a digital course is the best first business",
    tagline: "The model: build once, sell infinitely.",
    minutes: 6,
    sections: [
      {
        heading: "Build once, sell forever",
        body: "A digital product has no inventory, no staff, and no shipping. You create the asset one time and every future sale is almost pure margin. That's the whole magic — your income stops being tied to the hours in your day and starts compounding while you sleep.",
        example: "It costs the same to sell your course to the 10th student as to the 10,000th — effectively ₹0. Compare that to a café, where every extra customer needs more ingredients, staff, and space.",
      },
      {
        heading: "Why now specifically",
        body: "Two forces just collided. First, cheap targeted attention — Instagram and Facebook let you put an offer in front of exactly the right person for a few rupees. Second, AI — the thing that used to require a whole production team (writing, designing, structuring a course) now takes one motivated person a weekend. The barrier to entry has never been lower.",
      },
      {
        heading: "You don't need a huge audience",
        body: "You need a real problem, a clear solution, and a way to reach a few thousand of the right people. That's a system, not luck — and a system can be copied. Everything in this course is that system, broken into steps you do with your laptop open.",
      },
    ],
    takeaways: [
      "A digital product is built once and sold infinitely — near-100% margin.",
      "Cheap ads + AI have made this the easiest it has ever been to start.",
      "You need the right few thousand people, not a massive audience.",
    ],
  },
  {
    slug: "find-your-niche",
    title: "Find a niche that's painful, specific & pays",
    tagline: "The overlap of what you know and what people will pay for.",
    minutes: 7,
    sections: [
      {
        heading: "The three-circle test",
        body: "The best niche sits where three circles overlap: something you KNOW (a skill, job, or hobby), something people STRUGGLE with (a real frustration), and something they'll PAY to fix (tied to money, career, health, or status). Miss any one circle and the product struggles.",
        example: "\"Personal finance for beginners\" hits all three: you can learn it, people feel dumb about money, and it's literally about money. \"My favourite movies\" hits only one — interesting, but nobody pays to fix it.",
      },
      {
        heading: "Narrow beats broad",
        body: "A specific promise to a specific person out-sells a general one every time. \"Budgeting\" is vague. \"Budgeting for your first salary\" speaks directly to a 24-year-old who just started their job — and they instantly think \"that's me.\" The riches are in the niches.",
      },
      {
        heading: "Use AI to generate ideas",
        body: "Don't stare at a blank page. Feed AI your skills and let it propose ranked course ideas with the exact problem each one solves and who'd buy it. You stay the judge; AI is the brainstorm partner that never runs dry.",
        example: "Prompt: \"You are a digital-product strategist. Here's what I know: [skills]. Give me 10 specific, beginner-friendly course ideas. For each: the painful problem it solves, the ideal buyer, why they'd pay instead of watching free YouTube, and a demand score 1–10. Rank them for a first-time creator in India.\"",
      },
    ],
    takeaways: [
      "Pick a topic you know, people struggle with, and will pay to fix.",
      "Narrow, specific promises convert far better than broad ones.",
      "Let AI brainstorm and rank ideas — you make the final call.",
    ],
  },
  {
    slug: "validate-demand",
    title: "Prove people want it before you build it",
    tagline: "One day of validation saves a month of wasted building.",
    minutes: 6,
    sections: [
      {
        heading: "Three free demand signals",
        body: "Before building anything, look for proof: (1) Are people asking about this in YouTube comments, Reddit, Quora, or Instagram? Real questions mean real demand. (2) Is anyone already selling something similar? Competition is proof of a paying market, not a reason to quit. (3) Will a handful of people say \"take my money\" when you describe it? Words are cheap; a click or a pre-order is a vote.",
      },
      {
        heading: "The green-light rule",
        body: "If you can find real people asking the question, a competitor already selling a solution, and even 10 people who'd pre-order — build it. That's more validation than most businesses ever get before they launch.",
        example: "You post \"thinking of making a beginner budgeting course — would you want this?\" and 30 people reply yes and 8 ask when it's out. That's your green light.",
      },
    ],
    takeaways: [
      "Validate with real questions, existing competitors, and pre-interest.",
      "Competition means the market pays — it's a good sign.",
      "Ten genuine \"take my money\" replies is enough to start building.",
    ],
  },
  {
    slug: "curriculum-with-ai",
    title: "Let AI architect your entire curriculum",
    tagline: "A whole course structure in one prompt — then you refine.",
    minutes: 7,
    sections: [
      {
        heading: "The Curriculum Architect prompt",
        body: "This is where AI feels like magic. Describe your learner and the transformation you promise, and ask for a module-by-module structure. In seconds you get a logical outline that would take an expert days to plan.",
        example: "\"You are an expert instructional designer. Design a complete beginner course on [topic] for [specific learner]. Produce a 6-module curriculum. For each module: a benefit-driven title, 3–5 lessons, the one transformation the learner gets, and a practical action or worksheet. Keep language simple and jargon-free. End with a capstone project.\"",
      },
      {
        heading: "Your judgement is the last 20%",
        body: "Don't accept the first draft blindly. Read it as the expert-in-progress you are: cut fluff, reorder for flow, and add your own stories and examples. AI gives you 80% in 80 seconds — your experience supplies the crucial last 20% that makes it yours.",
      },
      {
        heading: "Structure for momentum",
        body: "Front-load a quick win so students feel progress in the first lesson. Order modules so each builds on the last, and end every module with something the learner DOES. A course that makes people act feels ten times more valuable than one they only watch.",
      },
    ],
    takeaways: [
      "One prompt gives you a full module-by-module curriculum.",
      "Edit it with your own judgement, stories, and examples.",
      "Front-load a quick win and make every module end in action.",
    ],
  },
  {
    slug: "write-lessons-with-ai",
    title: "Turn the outline into clear, warm lessons",
    tagline: "Scripts you can read, record, or drop into a workbook.",
    minutes: 7,
    sections: [
      {
        heading: "The Lesson Writer prompt",
        body: "Feed the curriculum back one lesson at a time and ask for a script in a specific structure: Hook → Why it matters → The method step by step → A worked example → One action to take now. Ask for simple language and a relatable example with real numbers.",
        example: "\"You are a friendly teacher writing for absolute beginners. Write the full script for the lesson '[lesson title]'. Structure: hook, why it matters, method step by step, a worked example with real figures, one action now. ~700 words, warm, no jargon. End with a one-line summary they can screenshot.\"",
      },
      {
        heading: "Never publish raw AI text",
        body: "Read every line aloud. Cut anything that sounds robotic, fact-check every number, and add one real detail only you could know. Authenticity is the one thing AI can't fake for you — and it's exactly what makes students trust you.",
      },
      {
        heading: "Guardrails",
        body: "Don't give regulated financial, medical, or legal advice. Teach frameworks and general education, add a plain disclaimer, and keep the tone of a helpful friend rather than a textbook.",
      },
    ],
    takeaways: [
      "Generate lesson scripts one at a time with a clear structure.",
      "Always edit, fact-check, and add your own voice before publishing.",
      "Stay educational; avoid regulated advice and add a disclaimer.",
    ],
  },
  {
    slug: "slides-and-packaging",
    title: "Make it look like a premium product",
    tagline: "Slides, worksheets, and a cover — in an afternoon.",
    minutes: 6,
    sections: [
      {
        heading: "Generate slides & worksheets",
        body: "People judge quality by presentation. Turn each lesson script into a slide outline and a one-page worksheet with AI, then build the visuals in Canva or Gamma. A consistent 2–3 colour palette across everything instantly signals \"premium.\"",
        example: "\"Turn this lesson into a 10-slide outline (punchy titles, 2–3 bullets each) plus a one-page worksheet with 4 fill-in-the-blank prompts that make the learner apply it to their own situation.\"",
      },
      {
        heading: "Worksheets are secret weapons",
        body: "A course that makes students DO something feels far more valuable than one they just watch — and it slashes refund requests. Add one worksheet, checklist, or template to every module.",
      },
    ],
    takeaways: [
      "AI drafts slides and worksheets; Canva/Gamma make them look pro.",
      "Keep a consistent 2–3 colour palette throughout.",
      "Add one \"do this\" worksheet per module to boost perceived value.",
    ],
  },
  {
    slug: "record-or-faceless",
    title: "Record it — or go completely faceless",
    tagline: "You never have to show your face if you don't want to.",
    minutes: 5,
    sections: [
      {
        heading: "Pick the format that fits you",
        body: "All of these sell: a polished PDF/workbook (lowest effort, no face), slides + voiceover (the great default, no face), a screen recording (perfect for software), or a talking-head video (best for personal brand). Buyers pay for the transformation, not your production budget.",
      },
      {
        heading: "Start simplest, upgrade later",
        body: "Launch as slides + voiceover or a clean PDF. It's faster and cheaper, and you can reinvest revenue into better production once money is coming in. Done and selling beats perfect and unreleased.",
        example: "A phone mic in a quiet room plus free editing tools like CapCut is genuinely enough to start. Many six-figure courses began exactly there.",
      },
    ],
    takeaways: [
      "Faceless formats (PDF, slides + voice, screen capture) sell just fine.",
      "Buyers care about the outcome, not your camera.",
      "Start with the simplest format and upgrade with revenue.",
    ],
  },
  {
    slug: "offer-and-pricing",
    title: "Wrap it into an offer people can't scroll past",
    tagline: "Same content, better packaging, far more sales.",
    minutes: 7,
    sections: [
      {
        heading: "You sell the promise, not the file",
        body: "A course is a file. An offer is a promise. Give it a benefit-driven name, a one-line big promise, and a couple of cheap-to-add bonuses (templates, checklists) that raise perceived value without raising your cost.",
        example: "\"Personal Finance 101\" is a file. \"Take control of your money in 30 days — even starting from zero\" is an offer.",
      },
      {
        heading: "Anchor high, sell low",
        body: "Show a real value price struck through next to your launch price. A ₹199 course next to a struck-through ₹1,999 feels like a steal. Add \"one-time, lifetime access\" to kill subscription anxiety, and use honest urgency (a launch window or a rising price) to give a reason to act now.",
      },
      {
        heading: "Price low and high-volume for your first product",
        body: "For a first launch, a low price removes the \"should I?\" and builds a buyer list fast. That list — your happiest customers — is worth more than the first sale, because the real money is in the second product you sell them later.",
      },
    ],
    takeaways: [
      "Sell a named promise with bonuses, not just a file.",
      "Anchor a struck-through value price above your launch price.",
      "Go low-price/high-volume first to build a valuable buyer list.",
    ],
  },
  {
    slug: "host-and-payments",
    title: "Host it and get paid — automatically",
    tagline: "A customer pays at 2 a.m. and gets instant access.",
    minutes: 6,
    sections: [
      {
        heading: "Where to host",
        body: "Don't overthink it. Gumroad or Graphy get you selling today with zero code. A payment page (Razorpay/Instamojo) plus an email delivery works too. A custom site gives the most control and margin — do that once you're consistently profitable. If you're stuck choosing, pick the simplest option and launch; a live course on a 'good enough' platform earns money, a perfect platform you're still researching earns ₹0.",
      },
      {
        heading: "Get paid, then deliver instantly",
        body: "Use Razorpay/Instamojo for India (UPI, cards, netbanking) or Stripe/PayPal globally. Automate delivery so the buyer gets access the moment payment clears, and always capture their email — that list is your most valuable asset for product #2.",
      },
      {
        heading: "The trust checklist",
        body: "Before taking real money: a fair refund policy (it actually increases sales), basic Terms and Privacy pages (AI drafts these in minutes), a real contact method, and — critically — test the full flow yourself by paying ₹1 and confirming access lands correctly.",
      },
    ],
    takeaways: [
      "Start on Gumroad/Graphy; go custom once profitable.",
      "Automate delivery and always capture the buyer's email.",
      "Add refund/terms/contact and test a ₹1 purchase before launch.",
    ],
  },
  {
    slug: "landing-page-that-converts",
    title: "Build a landing page that turns visitors into buyers",
    tagline: "One page, one job: make the sale.",
    minutes: 7,
    sections: [
      {
        heading: "The anatomy of a converting page",
        body: "In order: a hero with one bold promise and one button; the pain named so they think \"that's me\"; what's inside (the transformation, module by module); proof (reviews, screenshots, wins); the price with an anchor; an FAQ that kills the top objections; and a final CTA. On mobile, keep a sticky buy button so 'buy' is always one tap away.",
      },
      {
        heading: "Let AI write it, then you sharpen it",
        body: "Give AI your offer and audience and it drafts the whole page — headlines, bullets, testimonials scaffold, FAQ, and CTA. Then you edit for truth and voice. Copy is where sales are won or lost, so read every line aloud and cut the hype.",
        example: "\"You are a direct-response copywriter. Write a mobile-first landing page for my course [offer] for [audience] at [price]. Give 3 pain-driven headlines, a 2-line sub-promise, 6 outcome bullets, 3 testimonial templates, an FAQ answering the 5 biggest objections, and a final CTA. Warm, confident, zero hype.\"",
      },
      {
        heading: "Mobile-first, always",
        body: "The vast majority of buyers arrive on their phones from Instagram. If the page isn't fast and beautiful on a phone, nothing else matters. Design for mobile first and check load speed.",
      },
    ],
    takeaways: [
      "Follow the hero → pain → inside → proof → price → FAQ → CTA structure.",
      "AI drafts the copy; you edit for truth, voice, and zero hype.",
      "Design and test for mobile first — that's where buyers are.",
    ],
  },
  {
    slug: "traffic-and-ads",
    title: "Turn ads into a predictable sales machine",
    tagline: "Put ₹1 in, get more than ₹1 back — then turn it up.",
    minutes: 7,
    sections: [
      {
        heading: "The only ad math you need",
        body: "If ₹1 of ad spend reliably returns more than ₹1 in profit, you have a money machine. Your whole job becomes: find one profitable ad, then spend more on it. Everything else is optimisation.",
      },
      {
        heading: "Test small, scale winners",
        body: "Start with a modest daily budget across 3–5 different creatives — you're buying data, not sales yet. Give each a few days so the algorithm can learn, kill the losers, move budget to the winner, then scale it up gradually (~20–30% at a time) so the algorithm doesn't reset.",
        example: "Expect to lose a little at first — those first ads buy lessons. Once one creative is profitable, the economics flip and that's when you pour fuel on it.",
      },
      {
        heading: "Generate creatives with AI, refresh weekly",
        body: "The hook is 80% of an ad. Use AI to generate dozens of angles — fear of running out of money, a relatable story, a surprising fact, a myth-buster, a quick win — and test them. Ads fatigue, so a steady stream of fresh hooks keeps your cost per sale low.",
      },
    ],
    takeaways: [
      "Find one ad where ₹1 in returns more than ₹1 out, then scale it.",
      "Test many creatives small; kill losers, scale winners slowly.",
      "Generate hooks with AI and refresh creatives every week.",
    ],
  },
  {
    slug: "track-and-optimize",
    title: "Track everything and convert more",
    tagline: "If you can't see the leak, you can't plug it.",
    minutes: 6,
    sections: [
      {
        heading: "Watch four numbers weekly",
        body: "Measure the funnel: how many visitors and from which source; how many engage/scroll; how many click buy; and how many actually pay. When you can see exactly where people drop off, growth stops being luck and becomes repair work.",
      },
      {
        heading: "The conversion fixes that pay for themselves",
        body: "Doubling conversion is like doubling your ad budget for free. The big levers: a sharper pain-driven headline, a visible price anchor above the fold, a sticky mobile buy button, social proof near the price, honest urgency, and a fast mobile experience.",
        example: "Changing only the headline — not the product — often moves conversion more than any other single edit. Words do the heavy lifting.",
      },
    ],
    takeaways: [
      "Track visitors → engagement → clicks → buyers by source every week.",
      "Fix the biggest leak each week: usually the headline or the price position.",
      "Better conversion multiplies every rupee you already spend on traffic.",
    ],
  },
  {
    slug: "scale-and-compound",
    title: "Scale to a full-time income & compound",
    tagline: "One product starts it; a ladder scales it.",
    minutes: 6,
    sections: [
      {
        heading: "The revenue is just three numbers",
        body: "Revenue = Traffic × Conversion% × Price. You're never 'trying to make a big number' — you're improving three small ones. Turn any single dial and revenue rises; improve all three and it compounds.",
        example: "38,000 visitors × 6% buy × ₹200 ≈ ₹4.6 lakh. Lift traffic to 50k, conversion to 8%, and price to ₹260 and the same funnel roughly doubles.",
      },
      {
        heading: "Build the ladder",
        body: "Your first product's real job is to find buyers. Reinvest early profit into ads that work, email your buyer list value then offers, and add the next rung: an advanced course, a bundle, templates, or coaching. Your happiest customers are who you'll sell product #2 to.",
      },
      {
        heading: "Avoid the momentum-killers",
        body: "The quiet killers: perfectionism, too broad a topic, building before validating, no tracking, a weak headline, quitting ads too early, and publishing raw AI output. But the biggest mistake of all is waiting to feel 'ready.' You become ready by starting badly and improving fast.",
      },
    ],
    takeaways: [
      "Revenue = Traffic × Conversion × Price — improve one dial at a time.",
      "Reinvest profit, build your list, and add a second product.",
      "Don't wait to feel ready — start, then improve weekly.",
    ],
  },
  {
    slug: "ai-prompt-library",
    title: "The AI Prompt Library — 15 niches, ready to use",
    tagline: "Detailed, copy-paste prompts for 15 different course niches.",
    minutes: 12,
    sections: [
      {
        heading: "How to use this library",
        body: "Below are 15 popular course niches, each with three detailed, copy-paste prompts: one to design the curriculum, one to write a sample lesson, and one to sell it (landing page or ad). Pick the niche closest to yours, copy the prompts into ChatGPT or Claude, and swap the [brackets] for your own details. Even if your exact topic isn't listed, the closest niche's prompts adapt in seconds.",
      },
      {
        heading: "The prompting formula behind every one",
        body: "Notice the shape they all share: a ROLE ('act as an instructional designer'), your AUDIENCE (who it's for), the GOAL (what you want), and the FORMAT (how the answer should come back). Steal that structure for anything — then push the model: 'make it simpler', 'give me 5 more', 'sound less salesy'. You direct; it drafts.",
      },
    ],
    takeaways: [
      "Each niche below has 3 detailed prompts: curriculum, lesson, and sales.",
      "Swap the [brackets] for your details and paste into ChatGPT or Claude.",
      "Every prompt follows Role + Audience + Goal + Format — reuse that shape.",
    ],
  },
  {
    slug: "launch-checklist",
    title: "Your 14-day launch checklist",
    tagline: "Tick one box a day and go live in two weeks.",
    minutes: 5,
    sections: [
      {
        heading: "Days 1–7 · Idea & build",
        body: "Days 1–2: run the niche + validation prompts, pick one painful topic, write your big promise. Days 3–7: generate and edit the curriculum, write the lessons, build slides/workbook, add a worksheet per module, and lock a name, price, and bonuses. By day 7 you have a finished, named, priced product — ahead of 95% of people who only ever think about it.",
      },
      {
        heading: "Days 8–14 · Host, launch & optimise",
        body: "Days 8–10: upload to your host, connect payments with auto-delivery, build the landing page (hero → proof → price → CTA), add refund/terms/contact, and test a ₹1 purchase. Days 11–14: set up tracking, generate 3–5 ad creatives, launch a small daily budget, and announce to any audience you have. Then, ongoing: weekly, kill losing ads, scale winners, fix the biggest funnel leak, and email your buyers value plus the next offer.",
      },
    ],
    takeaways: [
      "Week 1: idea, validate, build, name & price the product.",
      "Week 2: host, page, payments, tracking, and launch ads.",
      "Ongoing: optimise weekly and start planning product #2.",
    ],
  },
];

export const PLAYBOOK_BY_SLUG: Record<string, FoundationLesson> = Object.fromEntries(
  PLAYBOOK_MODULES.map((m) => [m.slug, m])
);

// ── The 15-niche AI prompt library ────────────────────────────────
export interface NichePrompt {
  label: string; // e.g. "Curriculum"
  goal: string; // one-line what it does
  prompt: string; // the full copy-paste prompt
}
export interface NicheSet {
  niche: string;
  audience: string;
  price: string; // suggested launch price idea
  prompts: NichePrompt[];
}

// Helper to keep the data compact.
const n = (niche: string, audience: string, price: string, prompts: NichePrompt[]): NicheSet => ({
  niche,
  audience,
  price,
  prompts,
});
const p = (label: string, goal: string, prompt: string): NichePrompt => ({ label, goal, prompt });

export const NICHE_PROMPTS: NicheSet[] = [
  n(
    "Personal Finance for Beginners",
    "22–30 year-olds in their first job, anxious about money",
    "₹199–₹499",
    [
      p("Curriculum", "Design the full course structure",
        "You are an expert personal-finance educator and instructional designer. Design a complete beginner course titled \"Personal Finance for Beginners: From First Salary to First Investment.\" Learner: a 24-year-old with their first job, zero finance knowledge, easily overwhelmed. Goal: confidently budget, save, clear debt, and make one safe first investment. Produce a 6-module curriculum. For each module: a benefit-driven title, 3–5 lesson titles, the one transformation the learner gets, and a practical worksheet. Use simple, warm, jargon-free language and Indian rupee examples. End with a capstone \"12-month money plan\" project."),
      p("Sample lesson", "Write one lesson script",
        "You are a friendly money teacher writing for absolute beginners. Write the full script for the lesson \"The 50/30/20 Budget That Actually Sticks.\" Structure: hook, why it matters, the method step by step, a worked example using a ₹30,000 salary, and one action to take now. ~700 words, no jargon (explain any term in one line). End with a one-line summary the learner can screenshot. Keep it encouraging and non-preachy. Add a one-line disclaimer that this is education, not financial advice."),
      p("Sell it", "Write the landing-page hero + ad",
        "You are a direct-response copywriter. Write sales copy for a ₹299 course \"Personal Finance for Beginners\" aimed at 22–30 y/o Indians in their first job. Give: (1) 3 pain-driven headlines (e.g. salary vanishing by the 20th), (2) a 2-line sub-promise, (3) 6 outcome bullets, (4) a 15-second Instagram Reel script with a scroll-stopping hook. Tone: warm, confident, zero hype. Simple English with light Hindi is fine."),
    ]
  ),
  n(
    "Instagram Growth for Creators",
    "Small creators & local businesses stuck under 1,000 followers",
    "₹499–₹999",
    [
      p("Curriculum", "Design the full course structure",
        "You are an Instagram growth strategist and course designer. Design a beginner-to-intermediate course \"Instagram Growth That Actually Works (No Bots, No Luck).\" Learner: a small creator or local business owner stuck under 1,000 followers, posting inconsistently. Goal: a repeatable content + growth system that reliably adds engaged followers and DMs. Produce a 6-module curriculum with benefit-driven titles, 3–5 lessons each, the transformation per module, and a practical action. Cover hooks, Reels, profile optimisation, a content calendar, and turning followers into customers. End with a 30-day posting plan."),
      p("Sample lesson", "Write one lesson script",
        "Write the full lesson script for \"7 Reel Hooks That Stop the Scroll.\" Audience: beginner creators. Structure: hook, why the first 3 seconds decide everything, the 7 hook formulas with a real example line for each, a mini-exercise to write 3 hooks for their niche, and one action now. ~700 words, practical and energetic. End with a screenshot-able summary."),
      p("Sell it", "Write the landing-page hero + ad",
        "You are a direct-response copywriter. Write sales copy for a ₹699 course on Instagram growth for creators/small businesses under 1,000 followers. Provide 3 pain-driven headlines, a 2-line sub-promise, 6 outcome bullets, and a 20-second Reel ad script whose hook calls out the frustration of posting with no growth. Warm, punchy, no hype."),
    ]
  ),
  n(
    "Excel & Spreadsheets for Professionals",
    "Office workers and freelancers who feel slow in Excel",
    "₹399–₹799",
    [
      p("Curriculum", "Design the full course structure",
        "You are an Excel trainer and instructional designer. Design a practical course \"Excel for Real Work: From Slow to Skilled in 10 Hours.\" Learner: an office worker or freelancer who uses Excel but feels slow and unsure. Goal: confidently clean data, use key formulas, build a dashboard, and automate repetitive tasks. Produce a 6-module curriculum with benefit-driven titles, 3–5 hands-on lessons each, the transformation per module, and a downloadable practice file idea. Prioritise the 20% of features used 80% of the time (VLOOKUP/XLOOKUP, pivot tables, IF, charts). End with a real-world dashboard project."),
      p("Sample lesson", "Write one lesson script",
        "Write the full lesson script for \"Pivot Tables in 10 Minutes.\" Audience: beginners who avoid pivot tables. Structure: hook, why pivots save hours, step-by-step with a sample sales dataset, a common mistake to avoid, and one action now (build a pivot from their own data). ~700 words, screen-recording friendly. End with a summary line."),
      p("Sell it", "Write the landing-page hero + ad",
        "Write sales copy for a ₹599 practical Excel course for working professionals. Give 3 pain-driven headlines (e.g. spending hours on tasks that should take minutes), a 2-line sub-promise, 6 outcome bullets, and a 15-second ad script. Confident, benefit-led, no hype."),
    ]
  ),
  n(
    "Home Cooking & Meal Prep",
    "Busy beginners who want to cook healthy food fast",
    "₹299–₹599",
    [
      p("Curriculum", "Design the full course structure",
        "You are a home-cook educator and course designer. Design a beginner course \"Cook Simple, Eat Well: 30-Minute Meals & Weekly Prep.\" Learner: a busy beginner who can barely cook and eats too much takeout. Goal: cook tasty, healthy meals fast and prep a week of food in a couple of hours. Produce a 6-module curriculum with benefit-driven titles, 3–5 lessons each, the transformation per module, and a downloadable recipe card idea. Cover kitchen basics, 10 core recipes, batch prep, and smart grocery shopping. End with a 7-day meal-prep plan."),
      p("Sample lesson", "Write one lesson script",
        "Write the full lesson script for \"The 2-Hour Sunday Prep That Feeds You All Week.\" Audience: busy beginners. Structure: hook, why prepping once saves the week, the step-by-step prep flow, a sample menu with a shopping list, and one action now. ~700 words, warm and doable. End with a summary."),
      p("Sell it", "Write the landing-page hero + ad",
        "Write sales copy for a ₹399 home-cooking + meal-prep course for busy beginners. Provide 3 pain-driven headlines (e.g. tired of expensive unhealthy takeout), a 2-line sub-promise, 6 outcome bullets, and a 15-second Reel ad script showing the before/after of a fridge full of prepped meals. Friendly, appetising, no hype."),
    ]
  ),
  n(
    "Digital Art with AI Tools",
    "Hobbyists who want to create and sell AI-assisted art",
    "₹499–₹1,499",
    [
      p("Curriculum", "Design the full course structure",
        "You are a digital-art educator familiar with AI image tools. Design a course \"Create & Sell AI Art (Faceless).\" Learner: a hobbyist with no drawing skills who wants to make striking visuals and earn from them. Goal: generate professional-looking art with AI, refine it, and sell prints/designs online. Produce a 6-module curriculum with benefit-driven titles, 3–5 lessons each, the transformation per module, and a practical exercise. Cover prompting for images, styles, editing/upscaling, building a portfolio, and print-on-demand/marketplaces. End with a first-listing project."),
      p("Sample lesson", "Write one lesson script",
        "Write the full lesson script for \"Prompting for Stunning Images: The 4-Part Formula.\" Audience: beginners to AI art. Structure: hook, why prompt structure matters, the 4-part formula (subject, style, lighting, detail) with example prompts, an exercise to generate 3 variations, and one action now. ~700 words, visual and practical. End with a summary."),
      p("Sell it", "Write the landing-page hero + ad",
        "Write sales copy for a ₹999 course on creating and selling AI art, faceless. Give 3 curiosity/pain headlines, a 2-line sub-promise, 6 outcome bullets, and a 20-second Reel ad script that shows jaw-dropping AI visuals with a 'you made this in minutes' hook. Exciting but honest, no hype."),
    ]
  ),
  n(
    "Fitness & Home Workouts",
    "Beginners who want to get fit at home with no equipment",
    "₹399–₹999",
    [
      p("Curriculum", "Design the full course structure",
        "You are a certified-style fitness coach and course designer (educational, not medical advice). Design a beginner course \"Fit at Home: No Gym, No Equipment, 20 Minutes a Day.\" Learner: a busy beginner intimidated by gyms. Goal: build a sustainable home-workout habit, get stronger, and feel more energetic. Produce a 6-module curriculum with benefit-driven titles, 3–5 lessons each, the transformation per module, and a practical routine. Cover form basics, a progressive 4-week plan, mobility, and habit-building. Add a clear 'consult a doctor first' disclaimer. End with a 30-day plan."),
      p("Sample lesson", "Write one lesson script",
        "Write the full lesson script for \"The 20-Minute Full-Body Routine (No Equipment).\" Audience: total beginners. Structure: hook, why 20 minutes is enough to start, the routine step by step with form cues and rest, an easier + harder variation, and one action now. ~700 words, encouraging. Include a safety note. End with a summary."),
      p("Sell it", "Write the landing-page hero + ad",
        "Write sales copy for a ₹499 home-workout course for beginners, no equipment. Provide 3 pain-driven headlines (e.g. no time, no gym, no idea where to start), a 2-line sub-promise, 6 outcome bullets, and a 15-second Reel ad script. Motivating, realistic, no hype or medical claims."),
    ]
  ),
  n(
    "English Speaking & Communication",
    "Learners who can read English but freeze when speaking",
    "₹399–₹899",
    [
      p("Curriculum", "Design the full course structure",
        "You are an English-communication coach and course designer. Design a course \"Speak English with Confidence.\" Learner: someone who understands English but hesitates and freezes when speaking, especially at work or interviews. Goal: think and speak in English fluently in everyday and professional situations. Produce a 6-module curriculum with benefit-driven titles, 3–5 lessons each, the transformation per module, and a speaking exercise. Cover mindset/fear, everyday phrases, pronunciation basics, workplace/interview English, and daily practice habits. End with a 30-day speaking challenge."),
      p("Sample lesson", "Write one lesson script",
        "Write the full lesson script for \"Stop Translating in Your Head: Think Directly in English.\" Audience: hesitant speakers. Structure: hook, why translating slows you down, the technique step by step, a 5-minute daily drill, and one action now. ~700 words, warm and confidence-building. End with a summary."),
      p("Sell it", "Write the landing-page hero + ad",
        "Write sales copy for a ₹599 spoken-English confidence course. Give 3 pain-driven headlines (e.g. you know the words but freeze when it's time to speak), a 2-line sub-promise, 6 outcome bullets, and a 20-second Reel ad script. Empathetic, encouraging, no hype."),
    ]
  ),
  n(
    "Freelancing & Getting Clients",
    "Skilled people who want to start freelancing and land clients",
    "₹499–₹1,499",
    [
      p("Curriculum", "Design the full course structure",
        "You are a freelancing coach and course designer. Design a course \"Land Your First 5 Freelance Clients.\" Learner: someone with a skill (design, writing, dev, etc.) who wants to freelance but doesn't know how to get clients. Goal: package a service, find leads, pitch, and close paying clients. Produce a 6-module curriculum with benefit-driven titles, 3–5 lessons each, the transformation per module, and a practical action. Cover niche/offer, portfolio, where to find clients, cold outreach, proposals/pricing, and delivering + getting referrals. End with a 30-day client-getting plan."),
      p("Sample lesson", "Write one lesson script",
        "Write the full lesson script for \"The Cold Message That Actually Gets Replies.\" Audience: beginner freelancers. Structure: hook, why most outreach fails, the message framework with a fill-in template, a good vs bad example, and one action now (send 5 messages). ~700 words, practical. End with a summary."),
      p("Sell it", "Write the landing-page hero + ad",
        "Write sales copy for a ₹999 course on landing your first freelance clients. Provide 3 pain-driven headlines (e.g. talented but no clients), a 2-line sub-promise, 6 outcome bullets, and a 15-second ad script. Confident, action-oriented, no hype."),
    ]
  ),
  n(
    "Stock Market & Investing Basics",
    "Complete beginners who want to start investing safely",
    "₹299–₹799",
    [
      p("Curriculum", "Design the full course structure",
        "You are an investing educator and course designer (educational only, not investment advice). Design a beginner course \"Investing Basics: Start Safely from Zero.\" Learner: a complete beginner nervous about the stock market. Goal: understand how markets, index funds, and SIPs work, and make a first safe, long-term investment. Produce a 6-module curriculum with benefit-driven titles, 3–5 lessons each, the transformation per module, and a practical action. Cover risk, compounding, index funds vs stocks, SIPs, common mistakes, and a simple long-term plan. Add a clear 'education, not advice' disclaimer. End with a personal investment-plan worksheet."),
      p("Sample lesson", "Write one lesson script",
        "Write the full lesson script for \"Compounding: Why Starting Early Beats Investing More Later.\" Audience: nervous beginners. Structure: hook, why compounding is the whole game, a simple worked example with rupee figures, a common myth, and one action now. ~700 words, calm and clear. Include a disclaimer. End with a summary."),
      p("Sell it", "Write the landing-page hero + ad",
        "Write sales copy for a ₹399 beginner investing course (education only). Give 3 pain-driven headlines (e.g. scared to start, don't know where to begin), a 2-line sub-promise, 6 outcome bullets, and a 15-second ad script. Reassuring, honest, no return promises or hype."),
    ]
  ),
  n(
    "Graphic Design with Canva",
    "Non-designers who need to make professional graphics",
    "₹299–₹699",
    [
      p("Curriculum", "Design the full course structure",
        "You are a design educator and course designer. Design a course \"Design Like a Pro with Canva (No Design Background).\" Learner: a small business owner or creator who needs good-looking graphics but isn't a designer. Goal: create on-brand social posts, thumbnails, and simple brand assets quickly. Produce a 6-module curriculum with benefit-driven titles, 3–5 lessons each, the transformation per module, and a practical exercise. Cover design principles (contrast, hierarchy, spacing), Canva essentials, templates, brand kits, and a content-graphics workflow. End with a brand-kit + 10-post project."),
      p("Sample lesson", "Write one lesson script",
        "Write the full lesson script for \"3 Rules That Instantly Make Any Design Look Professional.\" Audience: non-designers. Structure: hook, the 3 rules (contrast, hierarchy, whitespace) with before/after examples, a quick Canva exercise, and one action now. ~700 words, visual and practical. End with a summary."),
      p("Sell it", "Write the landing-page hero + ad",
        "Write sales copy for a ₹499 Canva design course for non-designers. Provide 3 pain-driven headlines (e.g. your posts look amateur next to competitors'), a 2-line sub-promise, 6 outcome bullets, and a 15-second Reel ad script showing an ugly-to-pro redesign. Friendly, confident, no hype."),
    ]
  ),
  n(
    "Productivity & Time Management",
    "Overwhelmed professionals and students drowning in to-dos",
    "₹299–₹699",
    [
      p("Curriculum", "Design the full course structure",
        "You are a productivity coach and course designer. Design a course \"Get More Done Without Burning Out.\" Learner: an overwhelmed professional or student who feels busy but unproductive. Goal: build a simple system to prioritise, focus, and finish what matters. Produce a 6-module curriculum with benefit-driven titles, 3–5 lessons each, the transformation per module, and a practical action. Cover prioritisation, deep focus, beating procrastination, a weekly planning ritual, and a lightweight task system. End with a personal productivity-system setup."),
      p("Sample lesson", "Write one lesson script",
        "Write the full lesson script for \"The Weekly Planning Ritual That Takes 20 Minutes and Saves Hours.\" Audience: busy beginners. Structure: hook, why planning beats reacting, the step-by-step ritual, a fill-in template, and one action now. ~700 words, calm and practical. End with a summary."),
      p("Sell it", "Write the landing-page hero + ad",
        "Write sales copy for a ₹399 productivity course for overwhelmed professionals/students. Give 3 pain-driven headlines (e.g. busy all day but nothing important done), a 2-line sub-promise, 6 outcome bullets, and a 15-second ad script. Calm, credible, no hype."),
    ]
  ),
  n(
    "Phone & DSLR Photography",
    "Hobbyists who want to take pro-looking photos",
    "₹399–₹899",
    [
      p("Curriculum", "Design the full course structure",
        "You are a photography instructor and course designer. Design a course \"Take Pro-Looking Photos (Phone or DSLR).\" Learner: a hobbyist who wants noticeably better photos without expensive gear. Goal: understand light, composition, and editing to shoot and edit striking images. Produce a 6-module curriculum with benefit-driven titles, 3–5 lessons each, the transformation per module, and a shooting exercise. Cover light, composition, phone camera settings, DSLR basics, and quick editing. End with a themed photo-project."),
      p("Sample lesson", "Write one lesson script",
        "Write the full lesson script for \"Light Is Everything: 3 Ways to Instantly Improve Any Photo.\" Audience: beginners. Structure: hook, why light matters more than gear, the 3 techniques with examples, a practical shooting exercise, and one action now. ~700 words, visual and encouraging. End with a summary."),
      p("Sell it", "Write the landing-page hero + ad",
        "Write sales copy for a ₹599 photography course for phone/DSLR hobbyists. Provide 3 pain-driven headlines (e.g. nice camera, boring photos), a 2-line sub-promise, 6 outcome bullets, and a 20-second Reel ad script with before/after shots. Inspiring, honest, no hype."),
    ]
  ),
  n(
    "Coding for Absolute Beginners",
    "People with zero coding background who want to start",
    "₹499–₹1,299",
    [
      p("Curriculum", "Design the full course structure",
        "You are a programming educator and course designer. Design a course \"Code Your First Project (Absolute Beginner).\" Learner: someone with zero coding background who feels intimidated. Goal: understand core programming ideas and build one small real project with confidence. Produce a 6-module curriculum with benefit-driven titles, 3–5 lessons each, the transformation per module, and a hands-on exercise. Cover how code works, variables/logic, a beginner-friendly language, debugging mindset, and a capstone mini-project. Emphasise doing over theory. End with a shippable first project."),
      p("Sample lesson", "Write one lesson script",
        "Write the full lesson script for \"Your First Program: Understanding Variables in 15 Minutes.\" Audience: total beginners. Structure: hook, why variables are just labelled boxes, a step-by-step first example, a tiny exercise to modify it, and one action now. ~700 words, friendly and demystifying. End with a summary."),
      p("Sell it", "Write the landing-page hero + ad",
        "Write sales copy for a ₹999 coding course for absolute beginners. Give 3 pain-driven headlines (e.g. always wanted to code but it feels overwhelming), a 2-line sub-promise, 6 outcome bullets, and a 15-second ad script. Encouraging, jargon-free, no hype."),
    ]
  ),
  n(
    "Yoga & Meditation",
    "Beginners seeking calm, flexibility, and a daily habit",
    "₹299–₹799",
    [
      p("Curriculum", "Design the full course structure",
        "You are a yoga & meditation teacher and course designer (educational, not medical advice). Design a beginner course \"Calm & Flexible: Daily Yoga and Meditation for Beginners.\" Learner: a stressed beginner who wants to feel calmer and more flexible with short daily practice. Goal: build a gentle daily habit of yoga and meditation. Produce a 6-module curriculum with benefit-driven titles, 3–5 lessons each, the transformation per module, and a short practice. Cover breath, foundational poses, a 15-minute daily flow, meditation basics, and habit-building. Add a 'listen to your body / consult a doctor' note. End with a 21-day practice plan."),
      p("Sample lesson", "Write one lesson script",
        "Write the full lesson script for \"The 15-Minute Morning Flow to Start Your Day Calm.\" Audience: beginners. Structure: hook, why a short morning practice sets the tone, the flow step by step with breath cues, an easier variation, and one action now. ~700 words, gentle and grounding. Include a safety note. End with a summary."),
      p("Sell it", "Write the landing-page hero + ad",
        "Write sales copy for a ₹399 beginner yoga & meditation course. Provide 3 pain-driven headlines (e.g. stressed, stiff, no time for long classes), a 2-line sub-promise, 6 outcome bullets, and a 20-second Reel ad script with a calm, inviting hook. Soothing, honest, no medical claims or hype."),
    ]
  ),
  n(
    "Resume & Job Interview Prep",
    "Job seekers and freshers struggling to get shortlisted or hired",
    "₹399–₹999",
    [
      p("Curriculum", "Design the full course structure",
        "You are a career coach and course designer. Design a course \"Land the Interview, Nail the Offer.\" Learner: a fresher or job-switcher who isn't getting shortlisted or freezes in interviews. Goal: a resume that gets callbacks and the confidence + answers to ace interviews. Produce a 6-module curriculum with benefit-driven titles, 3–5 lessons each, the transformation per module, and a practical action. Cover a results-focused resume, tailoring to a job, LinkedIn, common interview questions with frameworks (like STAR), and salary conversations. End with a mock-interview checklist."),
      p("Sample lesson", "Write one lesson script",
        "Write the full lesson script for \"Answer 'Tell Me About Yourself' Like a Pro.\" Audience: nervous interviewees. Structure: hook, why this question sets the tone, the 3-part framework with a fill-in template, a strong example answer, and one action now (write and rehearse theirs). ~700 words, confidence-building. End with a summary."),
      p("Sell it", "Write the landing-page hero + ad",
        "Write sales copy for a ₹599 resume + interview-prep course for freshers/job-switchers. Give 3 pain-driven headlines (e.g. sending 100 applications, getting zero callbacks), a 2-line sub-promise, 6 outcome bullets, and a 15-second ad script. Empowering, practical, no hype."),
    ]
  ),
];
