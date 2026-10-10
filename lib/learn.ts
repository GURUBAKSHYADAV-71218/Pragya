export const LEARN_CATEGORIES = ["Calmness", "Anger & Frustration", "Focus & Attention", "Thoughts & Emotions", "Patience", "Self-Awareness", "Breathing & Body", "Silence & Presence"] as const;
export type LearnCategory = (typeof LEARN_CATEGORIES)[number];
export interface Article {
  slug: string; title: string; category: LearnCategory; summary: string;
  practice: { href: string; label: string };
  meaning: string; why?: string; when?: string[]; steps: string[]; example?: string;
  mistakes?: string[]; tips?: string[]; safety?: string; tryNow: string; takeaway: string; related: string[]; diagram?: "box";
}
const NOT_MEDICAL = "PRAGYA is for self-awareness practice. It is not medical or therapeutic advice.";

export const ARTICLES: Article[] = [
  { slug: "choosing-a-breathing-rhythm", title: "Choosing a breathing rhythm", category: "Breathing & Body", summary: "Natural, Box, 4–6 and Slow: how to pick the one that suits you today.",
    practice: { href: "/breathing", label: "Return to the breathing timer" }, diagram: "box",
    meaning: "A breathing rhythm is the count you follow for each part of a breath: inhale, hold, exhale. Different counts feel different. None of them is the correct one.",
    why: "A steady rhythm gives attention something simple to rest on. Many people find a slightly longer exhale feels settling. Experiences vary, so treat this as an experiment in noticing, not a treatment.",
    when: ["Before a task that needs focus", "After a tense conversation", "When you notice your breathing is shallow or held"],
    steps: ["Sit or stand comfortably and let your shoulders drop.", "Start with Natural (4 in, 4 out) for two minutes.", "If that feels easy, try 4–6: the same inhale with a longer exhale.", "Try Box (4-4-4-4) only if holding your breath is comfortable.", "Keep the rhythm that you can follow without effort."],
    tips: ["Natural: even and simple. A good default.", "Box: adds pauses at the top and bottom. Skip the pauses if they feel tense.", "4–6: a gentler, longer exhale.", "Slow (5 in, 7 out): for when you have time and already feel at ease with the others.", "Yoga-inspired practice often uses smooth nasal breathing and an unhurried exhale. You can borrow that if it is comfortable. Avoid forceful or rapid techniques unless a qualified teacher guides you."],
    example: "Before an exam you try Box breathing and feel strain during the holds. You switch to Natural for two minutes and find the evenness much easier to follow.",
    mistakes: ["Forcing a long count. If you strain, shorten it.", "Breathing as deeply as possible. Comfortable beats big.", "Treating a hold as a test of endurance."],
    safety: `Stop and return to normal breathing if you feel dizzy, light-headed, short of breath or anxious. If you have a breathing or heart condition, or are pregnant, check with a health professional before holding your breath. ${NOT_MEDICAL}`,
    tryNow: "Open the timer, choose Natural for 2 minutes, and notice which part of the breath is easiest to follow.", takeaway: "The best rhythm is the one you can follow gently.", related: ["a-two-minute-reset", "noticing-tension-early"] },
  { slug: "a-two-minute-reset", title: "A two-minute reset", category: "Calmness", summary: "A short way to settle when your day feels crowded.",
    practice: { href: "/breathing", label: "Start a 2-minute breathing session" },
    meaning: "A reset is a deliberate two-minute stop between one thing and the next. It does not solve anything. It gives you a cleaner starting point.",
    why: "Stress carries over from one task to the next. A short pause stops it piling up and lets you choose how to begin again.",
    when: ["Between meetings or study blocks", "After reading upsetting news", "Before replying to a difficult message"],
    steps: ["Stop what you are doing and put your hands down.", "Feel your feet and the surface under you.", "Breathe at an easy pace for ten breaths, with a slightly longer exhale.", "Ask: what is one thing I need to do next?", "Do only that."],
    example: "After a tough call you take two minutes before opening email. The next message gets a short, clear reply instead of a rushed one.",
    mistakes: ["Waiting until you are overwhelmed", "Using the reset to plan ten things", "Expecting to feel perfectly calm"],
    tryNow: "Run a 2-minute Natural session now and write one line about how starting the next task feels.", takeaway: "A small pause is still a pause.", related: ["choosing-a-breathing-rhythm", "consistent-practice-without-pressure"] },
  { slug: "beginning-a-short-silence", title: "Beginning a short silence practice", category: "Silence & Presence", summary: "How to sit quietly for five minutes, including when you feel restless.",
    practice: { href: "/silence", label: "Return to Silence practice" },
    meaning: "Silence practice is sitting quietly, without input, and watching what the mind does.",
    why: "Without distractions, patterns such as planning, replaying and restlessness become visible. Seeing them is the practice. Stopping them is not the goal.",
    when: ["First thing in the morning, before screens", "Between work blocks", "When your mind feels crowded"],
    steps: ["Choose 5 minutes. Short is fine.", "Sit where you will not be interrupted and put your phone away.", "Let your eyes close or soften.", "Notice sounds, breath and body, whatever is present.", "When thoughts arrive, notice them and return to sitting.", "At the end, take one breath before you move."],
    tips: ["Restlessness: find where it lives in the body. Shift once, slowly, and then stay. Restlessness and boredom are also things to observe.", "Sleepy? Open your eyes and sit a little more upright.", "Add a minute or two each week, not ten at once."],
    example: "At minute two you start planning dinner. You notice 'planning', feel a small pull to follow it, and let it pass. That noticing was one repetition.",
    mistakes: ["Trying to empty your mind", "Judging the session good or bad", "Starting with 30 minutes"],
    tryNow: "Open Silence, choose 5 minutes and begin. Afterwards, write one line about what you noticed.", takeaway: "You are not trying to be quiet inside. You are noticing what is there.", related: ["labelling-your-thoughts", "consistent-practice-without-pressure"] },
  { slug: "labelling-your-thoughts", title: "Labelling your thoughts", category: "Thoughts & Emotions", summary: "Name a thought (memory, planning, worry, judgement, observation) instead of believing it.",
    practice: { href: "/exercises/thought-labelling", label: "Return to Thought Labelling" },
    meaning: "Thought labelling means giving a passing thought a simple name, such as memory, planning, worry, judgement or observation.",
    why: "A label creates a small distance. 'I'm failing' becomes 'judgement'. You still have the thought, but you stop treating it as a fact.",
    when: ["A thought keeps looping", "Before reacting to a worry", "When your mind is busy at night"],
    steps: ["Notice a thought as it appears.", "Ask: what kind is it? Memory, planning, worry, judgement or observation.", "Say the label silently, once.", "Return to what you were doing."],
    tips: ["Memory: 'I should have said something yesterday.'", "Planning: 'I need to call them after lunch.'", "Worry: 'What if it goes badly?'", "Judgement: 'This is pointless.'", "Observation: 'The room is quiet.'", "If a thought fits two labels, pick the stronger one and move on."],
    example: "While reading you think 'I'll never finish this.' You label it worry, notice your shoulders tense, and read the next line.",
    mistakes: ["Arguing with the thought instead of naming it", "Labelling harshly ('stupid thought')", "Expecting thoughts to stop"],
    tryNow: "Do the Thought Labelling exercise, then name one real thought during your day.", takeaway: "Naming a thought is not the same as obeying it.", related: ["repetitive-thoughts", "reflection-prompts-after-practice"] },
  { slug: "repetitive-thoughts", title: "Repetitive thoughts without fighting them", category: "Thoughts & Emotions", summary: "What to do when the same thought keeps returning.",
    practice: { href: "/experiments/white-elephant", label: "Try the White Elephant experiment" },
    meaning: "Repetitive thoughts circle the same topic. Trying hard to push them away often keeps them in view, which is what the White Elephant experiment shows.",
    why: "If you stop fighting, the thought has less to push against. It may still come, but it can come and go.",
    when: ["Replaying a conversation", "Worrying about something you cannot act on yet", "Lying awake"],
    steps: ["Notice: 'this is looping'.", "Label it: worry, memory or planning.", "Let it be there while your attention rests on your breath or hands for ten breaths.", "Ask: is there one action I can take? If yes, write it down. If no, return to the breath.", "Expect it to return. Repeat gently."],
    example: "You keep replaying a comment from earlier. You label it 'memory', feel your hands on the desk for ten breaths, and write 'ask Sam about it tomorrow'. The loop quiets.",
    mistakes: ["Arguing with the thought", "Judging yourself for having it", "Searching for the perfect answer"],
    safety: `If repetitive thoughts are distressing, persistent or getting in the way of daily life, talking to a mental health professional is a good step. ${NOT_MEDICAL}`,
    tryNow: "Try the White Elephant experiment and notice how often the thought appears.", takeaway: "You can let a thought be there and still choose where to put your attention.", related: ["labelling-your-thoughts", "returning-after-distraction"] },
  { slug: "returning-after-distraction", title: "Returning after distraction", category: "Focus & Attention", summary: "Notice, name, return. The skill behind every focus practice.",
    practice: { href: "/exercises/attention-anchor", label: "Return to Attention Anchor" },
    meaning: "Attention always wanders. The skill is noticing that it has and returning, again and again.",
    why: "Each return is one repetition. Training is the coming back, not never leaving.",
    when: ["Reading", "Studying", "Coding", "Long meetings"],
    steps: ["Notice: 'I have drifted.' Name it quietly.", "Skip the criticism. One calm sentence at most.", "Find one anchor: the word you were reading, the line of code, your breath.", "Return and continue for the next minute.", "Repeat as often as needed."],
    example: "While coding you catch yourself checking messages. You note 'drifted', close the tab, reread the last line you wrote and carry on.",
    mistakes: ["Counting a drift as failure", "Returning with a lecture", "Waiting to feel focused before restarting"],
    tips: ["Use a visible anchor, such as a single open window.", "In the exercise, returns matter more than drifts."],
    tryNow: "Do the one-minute Attention Anchor. Tap Drifted and Returned honestly.", takeaway: "Noticing you drifted is the success.", related: ["studying-after-distraction", "repetitive-thoughts"] },
  { slug: "studying-after-distraction", title: "Getting back to studying after distraction", category: "Focus & Attention", summary: "A ten-minute restart for when you have lost the thread.",
    practice: { href: "/exercises/focus-reset", label: "Return to Focus Reset" },
    meaning: "A focus reset is a short, deliberate restart after you lose the thread of a task.",
    when: ["You are scrolling during study time", "A call or message broke your concentration", "You cannot decide where to start"],
    steps: ["Pause for one breath. Do not open anything new.", "Write the next small action: 'read section 2, paragraph 1'.", "Remove the nearest distraction: phone face down, extra tabs closed.", "Set a 10-minute block with only that action.", "When it ends, note what pulled you away."],
    example: "After an hour you notice video clips. You write 'solve question 3', put the phone in another room and work for ten minutes. The next block is easier to start.",
    mistakes: ["Making the next action too big", "Restarting with an elaborate plan", "Punishing yourself with a long break"],
    tips: ["Reading: put a finger on the line. Coding: write a comment describing the next step.", "Keep a note of distractions to review later."],
    tryNow: "Do Focus Reset and count how many times you return to the circle.", takeaway: "Shrink the next step until it is easy to begin.", related: ["returning-after-distraction", "consistent-practice-without-pressure"] },
  { slug: "when-frustration-rises", title: "When frustration rises", category: "Anger & Frustration", summary: "Slow a reaction down into its parts so you can choose a response.",
    practice: { href: "/exercises/reaction-chain", label: "Return to Reaction Chain" },
    meaning: "A reaction has parts: trigger, thought, emotion, urge and response. Frustration squeezes them together. Slowing them apart gives you a choice.",
    when: ["Someone interrupts or criticises you", "Plans fall apart", "You feel your jaw or shoulders tighten"],
    steps: ["Notice early signs: heat, tight jaw, fast thoughts.", "Name it: 'frustration'.", "Take one slow exhale, longer than the inhale.", "Name the thought: 'This is unfair.'", "Name the urge (snap, leave, fix) without acting on it.", "Choose a response you would still accept tomorrow."],
    example: "A teammate changes your work without asking. Trigger: the edit. Thought: 'They don't respect me.' Urge: reply sharply. You pause, then write: 'Can we agree on changes before they are made?'",
    mistakes: ["Suppressing the feeling", "Waiting until you are furious to try", "Expecting calm to arrive instantly"],
    tips: ["Practise on small annoyances so the skill is there for bigger ones.", "No single technique works for everyone. Keep what helps."],
    safety: `If anger leads you to harm yourself or others, step away and reach out to someone you trust or a professional. ${NOT_MEDICAL}`,
    tryNow: "Walk through a scenario in Reaction Chain and insert the pause.", takeaway: "You may not control the first thought. You can create space before you respond.", related: ["pausing-in-an-argument", "noticing-tension-early"] },
  { slug: "pausing-in-an-argument", title: "Pausing before you respond in an argument", category: "Anger & Frustration", summary: "A short sequence for staying in the conversation without reacting.",
    practice: { href: "/exercises/the-pause", label: "Return to The Pause" },
    meaning: "A pause is a few seconds between hearing something and answering. It is not silence as punishment, and not giving in.",
    when: ["A disagreement is heating up", "You feel the urge to defend yourself", "You are about to send a sharp message"],
    steps: ["Notice the urge to answer immediately.", "Feel your feet on the floor.", "Breathe out slowly once. Count three.", "Say a bridge: 'Let me think about that for a moment.'", "Respond to the part that matters most.", "If it is too heated, ask for a short break and name a time to return."],
    example: "A friend says you never listen. You feel the defence rising, pause, and say: 'I want to understand. Can you give me an example?'",
    mistakes: ["Going silent as a weapon", "Using the pause to rehearse a rebuttal", "Promising to return and not doing so"],
    tryNow: "Do The Pause and notice what you feel first: thought, emotion, body or impulse.", takeaway: "A pause makes room for the response you would choose.", related: ["when-frustration-rises", "patience-in-waiting"] },
  { slug: "noticing-tension-early", title: "Noticing tension early", category: "Breathing & Body", summary: "A gentle body scan, with options if body focus feels uncomfortable.",
    practice: { href: "/exercises/body-scan", label: "Return to Body Scan" },
    meaning: "A body scan moves attention slowly through the body to notice sensations such as warmth, tightness or nothing at all. It does not require you to relax.",
    why: "Tension often shows in the body before you name the feeling. Noticing early gives you more options.",
    when: ["Before sleep", "When you feel on edge", "Mid-afternoon, after sitting for hours"],
    steps: ["Sit or lie comfortably.", "Start at your feet. Notice contact, temperature or tingling.", "Move slowly: legs, hips, belly, chest, hands, shoulders, face.", "At each area, notice and move on. Do not try to change anything.", "End by noticing the whole body breathing."],
    tips: ["If body focus is uncomfortable, anchor on your feet, your hands or sounds in the room. Keep your eyes open.", "You can stop at any time.", "Finding 'nothing' is a valid result."],
    mistakes: ["Trying to force relaxation", "Judging areas as bad", "Staying with a sensation that hurts. Move on or stop."],
    safety: `Stop if a sensation feels painful or distressing, and speak to a health professional about persistent pain. ${NOT_MEDICAL}`,
    tryNow: "Run the two-minute Body Scan and note where your attention stayed longest.", takeaway: "Notice first. Change nothing yet.", related: ["choosing-a-breathing-rhythm", "when-frustration-rises"] },
  { slug: "patience-in-waiting", title: "Practising patience while you wait", category: "Patience", summary: "Use queues, delays and uncertainty as practice.",
    practice: { href: "/experiments/waiting", label: "Try the Waiting experiment" },
    meaning: "Patience is staying with a pace you do not control, without filling every gap.",
    why: "The urge to skip or check something is a small, safe place to observe impatience before it grows.",
    when: ["In a queue", "Waiting for a reply", "Uncertain situations"],
    steps: ["Notice the first sign: reaching for your phone, sighing, shifting.", "Name it: 'impatience'.", "Feel your feet and breathe out slowly.", "Look around and notice three things.", "Decide: is there anything to do? If not, stay with the wait."],
    example: "Your friend is late and you reach for your phone. You pause, notice irritation in your chest, and watch people passing for a minute. Then you check the phone, on purpose rather than on impulse.",
    mistakes: ["Treating waiting as wasted time", "Banning your phone entirely", "Expecting the urge to vanish"],
    tryNow: "Try the Waiting experiment and count how often you reach for skip.", takeaway: "The urge to skip is something you can simply watch.", related: ["pausing-in-an-argument", "beginning-a-short-silence"] },
  { slug: "reflection-prompts-after-practice", title: "Reflection prompts after practice", category: "Self-Awareness", summary: "Simple questions that turn a session into understanding.",
    practice: { href: "/reflections", label: "Write a reflection" },
    meaning: "Reflection is a few lines about what you noticed. It connects practice to everyday life.",
    why: "Over time, entries show patterns in what distracts you, what helps and what repeats.",
    steps: ["Finish the practice and wait a breath.", "Choose one prompt below.", "Write for two minutes, with no editing.", "Save the entry under a fitting category."],
    tips: ["What did I notice first: a thought, a feeling, a body sensation or an urge?", "When did my attention leave, and where did it go?", "What helped me return?", "Where might I use this today?", "What surprised me?"],
    mistakes: ["Writing what you think you should have felt", "Long entries that you never reread", "Judging the session in the entry"],
    tryNow: "Write one entry now using the first prompt.", takeaway: "Two honest minutes beat a perfect page.", related: ["labelling-your-thoughts", "consistent-practice-without-pressure"] },
  { slug: "consistent-practice-without-pressure", title: "Building a consistent practice without pressure", category: "Self-Awareness", summary: "Small, realistic habits that you can keep.",
    practice: { href: "/training", label: "See your training path" },
    meaning: "Consistency means returning often, in small amounts, rather than doing long sessions rarely.",
    when: ["You keep starting and stopping", "You feel behind on your goals"],
    steps: ["Pick one practice you will do for two minutes.", "Attach it to something you already do: after coffee, before study.", "Do it on the same days for a week. Do not add more yet.", "If you miss a day, simply restart the next day.", "After a week, add a minute or a second practice."],
    example: "You choose Attention Anchor after breakfast. You miss Wednesday, do it Thursday, and by next Monday it has become part of your morning.",
    mistakes: ["Setting a daily target you cannot meet", "Treating a missed day as failure", "Changing practice every day"],
    tips: ["Streaks are information, not a score.", "Shorter and regular beats longer and rare."],
    tryNow: "Choose your one practice and the moment you will do it.", takeaway: "Small and regular is enough.", related: ["a-two-minute-reset", "reflection-prompts-after-practice"] },
];
export const getArticle = (slug: string) => ARTICLES.find((a) => a.slug === slug);
export const articleForHref = (href: string) => ARTICLES.find((a) => a.practice.href === href);
export const readingMinutes = (a: Article) => {
  const text = [a.meaning, a.why, a.example, a.safety, a.tryNow, a.takeaway, ...(a.when ?? []), ...a.steps, ...(a.mistakes ?? []), ...(a.tips ?? [])].filter(Boolean).join(" ");
  return Math.max(1, Math.ceil(text.split(/\s+/).length / 200));
};
export const EXERCISE_LEARN: Record<string, string> = { "thought-labelling": "labelling-your-thoughts", "attention-anchor": "returning-after-distraction", "distraction-drift": "returning-after-distraction", "focus-reset": "studying-after-distraction", "reaction-chain": "when-frustration-rises", "the-pause": "pausing-in-an-argument", "body-scan": "noticing-tension-early", grounding: "noticing-tension-early", "emotion-checkin": "reflection-prompts-after-practice", "study-restart": "studying-after-distraction", "patience-practice": "patience-in-waiting" };
export const EXPERIMENT_LEARN: Record<string, string> = { "white-elephant": "repetitive-thoughts", waiting: "patience-in-waiting", "reaction-chain": "when-frustration-rises", "attention-switch": "returning-after-distraction" };
export const WISDOM_LEARN: Record<string, string> = { patience: "patience-in-waiting", presence: "beginning-a-short-silence", silence: "beginning-a-short-silence", "self-observation": "labelling-your-thoughts", awareness: "reflection-prompts-after-practice", discipline: "consistent-practice-without-pressure", acceptance: "when-frustration-rises" };
export const STAGE_LEARN: Record<string, string> = { Attention: "returning-after-distraction", Reaction: "when-frustration-rises", Focus: "studying-after-distraction", Presence: "beginning-a-short-silence" };
const BACK: [string, string][] = [["/breathing", "Breathing"], ["/silence", "Silence"], ["/exercises", "Exercises"], ["/experiments", "Experiments"], ["/reflections", "Reflections"], ["/wisdom", "Wisdom"], ["/recommendations", "Recommendations"], ["/insights", "Insights"], ["/training", "Training"], ["/learn", "Explore & Learn"]];
/** Only same-site paths are accepted as a return target. */
export function safeFrom(from?: string | string[]): { href: string; label: string } | null {
  const f = Array.isArray(from) ? from[0] : from;
  if (!f || !/^\/[a-zA-Z0-9\-_/]*$/.test(f)) return null;
  const hit = BACK.find(([p]) => f === p || f.startsWith(p + "/"));
  return { href: f, label: hit ? hit[1] : "previous page" };
}
