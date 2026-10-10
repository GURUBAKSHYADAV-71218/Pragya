export type Dim = "Awareness" | "Calmness" | "Focus" | "Patience" | "Discipline" | "Presence";
export const DIMS: Dim[] = ["Awareness", "Calmness", "Focus", "Patience", "Discipline", "Presence"];
export interface Exercise { slug: string; title: string; category: string; minutes: number; level: string; blurb: string }
export const EXERCISES: Exercise[] = [
  { slug: "attention-anchor", title: "Attention Anchor", category: "Attention", minutes: 1, level: "Beginner", blurb: "Stay with one moving point. Notice when you leave, and return." },
  { slug: "focus-reset", title: "Focus Reset", category: "Focus", minutes: 2, level: "Beginner", blurb: "Choose one task, one small next action and an optional timer." },
  { slug: "the-pause", title: "The Pause", category: "Reaction", minutes: 1, level: "Beginner", blurb: "Create space before you respond." },
  { slug: "thought-labelling", title: "Thought Labelling", category: "Awareness", minutes: 2, level: "Intermediate", blurb: "Observe a thought and give it a name." },
  { slug: "reaction-chain", title: "Reaction Chain", category: "Reaction", minutes: 2, level: "Intermediate", blurb: "Trace a reaction from trigger to response." },
  { slug: "breathing-wave", title: "Breathing Wave", category: "Breathing", minutes: 5, level: "All levels", blurb: "Follow a natural breathing rhythm." },
  { slug: "body-scan", title: "Body Scan", category: "Emotion", minutes: 2, level: "All levels", blurb: "Move attention gently through the body." },
  { slug: "grounding", title: "Grounding 5-4-3-2-1", category: "Awareness", minutes: 2, level: "Beginner", blurb: "Move through your senses, one at a time, to come back to the room." },
  { slug: "emotion-checkin", title: "Emotion Check-in", category: "Emotion", minutes: 2, level: "Beginner", blurb: "Separate what happened, what you feel and what you need next." },
  { slug: "patience-practice", title: "Patience Practice", category: "Patience", minutes: 3, level: "Intermediate", blurb: "Notice the urge to hurry in realistic waiting situations." },
];
export const FILTERS = ["All", "Attention", "Awareness", "Reaction", "Focus", "Emotion", "Patience", "Breathing"];
export const exHref = (slug: string) => (slug === "breathing-wave" ? "/breathing" : `/exercises/${slug}`);
export const EXPERIMENTS = [
  { slug: "white-elephant", title: "The White Elephant", blurb: "Try not to think about it for 30 seconds." },
  { slug: "waiting", title: "The Waiting Experiment", blurb: "Sit with a countdown. Notice the urge to skip." },
  { slug: "reaction-chain", title: "The Reaction Chain", blurb: "See how a pause changes a response." },
  { slug: "attention-switch", title: "The Attention Switch", blurb: "Follow a shifting target. See how attention moves." },
];
export const QUESTIONS: { q: string; options: [string, Dim][] }[] = [
  { q: "When I sit down to work, I usually…", options: [["lose the thread quickly", "Focus"], ["feel restless inside", "Calmness"], ["start, then drop it", "Discipline"]] },
  { q: "When someone criticises me, I…", options: [["answer before I think", "Patience"], ["replay it for hours", "Awareness"], ["feel it tighten in my body", "Calmness"]] },
  { q: "Waiting in a queue, I…", options: [["reach for my phone", "Patience"], ["feel irritated", "Calmness"], ["drift into other places", "Presence"]] },
  { q: "At the end of a day, I…", options: [["can't say where the time went", "Awareness"], ["feel scattered", "Focus"], ["skipped what I planned", "Discipline"]] },
  { q: "Reading a long page, I…", options: [["reread the same line", "Focus"], ["notice I am somewhere else", "Presence"], ["jump between tabs", "Discipline"]] },
  { q: "When plans change suddenly, I…", options: [["snap", "Patience"], ["feel unsettled", "Calmness"], ["resist before I accept", "Awareness"]] },
  { q: "My thoughts are mostly…", options: [["about what comes next", "Presence"], ["about what I said or did", "Awareness"], ["a loud blur", "Calmness"]] },
  { q: "I would most like to…", options: [["pause before I respond", "Patience"], ["stay with one task", "Focus"], ["be here more often", "Presence"], ["practise regularly", "Discipline"]] },
];
export const START: Record<Dim, { label: string; href: string; sub: string }> = {
  Focus: { label: "Attention Anchor", href: "/exercises/attention-anchor", sub: "1 min · Beginner" },
  Awareness: { label: "Thought Labelling", href: "/exercises/thought-labelling", sub: "2 min · Intermediate" },
  Calmness: { label: "Breathing Wave", href: "/breathing", sub: "5 min · All levels" },
  Patience: { label: "The Pause", href: "/exercises/the-pause", sub: "1 min · Beginner" },
  Discipline: { label: "Focus Reset", href: "/exercises/focus-reset", sub: "2 min · Beginner" },
  Presence: { label: "Body Scan", href: "/exercises/body-scan", sub: "2 min · All levels" },
};
export const STAGES = [
  { n: "01", title: "Attention", blurb: "Learn to stay with one thing.", slugs: ["attention-anchor", "distraction-drift"] },
  { n: "02", title: "Reaction", blurb: "Create a pause before responding.", slugs: ["the-pause", "reaction-chain"] },
  { n: "03", title: "Focus", blurb: "Train the mind to stay steady.", slugs: ["focus-reset", "attention-switch"] },
  { n: "04", title: "Presence", blurb: "Be here, fully.", slugs: ["body-scan", "breathing", "silence"] },
];
export interface Scenario { situation: string; options: string[]; reflection: string }
export interface Topic { slug: string; title: string; explain: string; practical: string; prompt: string; scenario?: Scenario }
export const WISDOM: Topic[] = [
  { slug: "awareness", title: "Awareness", explain: "Knowing what your mind is doing while it does it.", practical: "Once an hour, ask: where is my attention right now?", prompt: "What did my attention keep returning to today?",
    scenario: { situation: "A colleague criticises your work in front of others.", options: ["Defend myself", "Go quiet", "Ask a question", "Feel heat in my face"], reflection: "Before any of these, something happened: a thought, a feeling, a sensation. Can you remember which came first? There is no right answer. The noticing is the practice." } },
  { slug: "presence", title: "Presence", explain: "Being where your body already is.", practical: "Feel your feet on the floor for three breaths.", prompt: "When did I feel fully here today?" },
  { slug: "patience", title: "Patience", explain: "Staying with a pace you do not control.", practical: "When you feel the urge to hurry, take one slower breath first.", prompt: "Where did I rush today, and what was the hurry?",
    scenario: { situation: "You are stuck in a slow queue and already late.", options: ["Check my phone", "Sigh and look around", "Breathe and wait", "Plan what to say"], reflection: "What did your body do in the first second? Impatience is often felt before it is thought." } },
  { slug: "attachment", title: "Attachment", explain: "Holding tightly to how things should be.", practical: "Notice the word 'should' in your thoughts today.", prompt: "What outcome am I gripping right now?",
    scenario: { situation: "Plans you looked forward to are cancelled.", options: ["Feel disappointed", "Look for blame", "Make new plans", "Let it be for a moment"], reflection: "What did you want to be true? Seeing the wish clearly can loosen its grip." } },
  { slug: "acceptance", title: "Acceptance", explain: "Seeing what is here without arguing with it. It is not approval.", practical: "Say silently: this is what it is right now.", prompt: "What am I resisting that already is?",
    scenario: { situation: "Rain cancels the day you had planned outside.", options: ["Feel frustrated", "Adapt quickly", "Argue with the weather", "Sit with it"], reflection: "Notice the moment between the rain and your reaction. That moment is where acceptance begins." } },
  { slug: "impermanence", title: "Impermanence", explain: "Moods, plans and moments pass.", practical: "When a feeling is strong, ask: will I feel this in a week?", prompt: "What felt permanent last month and has changed?" },
  { slug: "silence", title: "Silence", explain: "Space without input, where the mind shows its patterns.", practical: "Take two minutes without screens or sound.", prompt: "What appeared when it got quiet?" },
  { slug: "gratitude", title: "Gratitude", explain: "Turning attention toward what already supports you.", practical: "Name three small things before you sleep.", prompt: "What is one small thing I would miss?" },
  { slug: "discipline", title: "Discipline", explain: "Returning to what you chose, gently and repeatedly.", practical: "Practise at the same time for three days.", prompt: "What helped me return today?" },
  { slug: "self-observation", title: "Self-observation", explain: "Watching your own reactions as an interested witness.", practical: "Pick one reaction today and watch it unfold.", prompt: "What did I notice myself doing today?" },
];
