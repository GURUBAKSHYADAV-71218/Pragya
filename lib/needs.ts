import { EXERCISES } from "./content";

export interface Practice { id: string; title: string; href: string; minutes: number; type: string }
const ex = (slug: string): Practice => {
  const e = EXERCISES.find((x) => x.slug === slug);
  if (!e) throw new Error(`Unknown exercise: ${slug}`);
  return { id: slug, title: e.title, href: `/exercises/${slug}`, minutes: e.minutes, type: slug };
};
export const PRACTICES = {
  pause: ex("the-pause"), chain: ex("reaction-chain"), labelling: ex("thought-labelling"), reset: ex("focus-reset"), anchor: ex("attention-anchor"),
  scan: ex("body-scan"), patience: ex("patience-practice"), grounding: ex("grounding"), checkin: ex("emotion-checkin"),
  comfort: { id: "comfortable-breathing", title: "Comfortable Breathing", href: "/breathing", minutes: 2, type: "breathing" } as Practice,
  wave: { id: "breathing-wave", title: "Breathing Wave", href: "/breathing", minutes: 5, type: "breathing" } as Practice,
  silence: { id: "silence", title: "Silence", href: "/silence", minutes: 5, type: "silence" } as Practice,
};
export interface Need { id: string; label: string; primary: Practice; alternative: Practice; why: string; what: string; notice: string }
export const NEEDS: Need[] = [
  { id: "anger", label: "I feel angry or irritated", primary: PRACTICES.pause, alternative: PRACTICES.chain,
    why: "Anger tends to push you to act on the first urge. A short pause creates room to choose a response instead.", what: "Read a trigger, stop for a few slow breaths, name what you notice first, then choose how you might respond.", notice: "Whether you can feel the urge without acting on it straight away." },
  { id: "frustration", label: "I feel frustrated", primary: PRACTICES.pause, alternative: PRACTICES.labelling,
    why: "Frustration often arrives with a story ('this is unfair'). Pausing first, then naming the thought, helps you see the story as a thought.", what: "Pause, notice your first reaction, and (in the alternative) label the thoughts that come with it.", notice: "Which part is the situation and which part is your thinking about it." },
  { id: "distraction", label: "I keep getting distracted", primary: PRACTICES.reset, alternative: PRACTICES.anchor,
    why: "Distraction is easier to handle when you have a clear, small way back to the task. Focus Reset gives you that plan.", what: "Choose a task, name the distraction, shrink the first step and start a short focus interval.", notice: "Whether you can return without spending extra time judging yourself." },
  { id: "repetitive", label: "My thoughts keep repeating", primary: PRACTICES.labelling, alternative: PRACTICES.silence,
    why: "Naming a looping thought (worry, memory, planning) lets you observe it instead of following it again.", what: "Read several thoughts and choose a simple label for each. In Silence, you sit and notice thoughts come and go.", notice: "That a thought can be present without you acting on it." },
  { id: "restless", label: "I feel restless or tense", primary: PRACTICES.comfort, alternative: PRACTICES.scan,
    why: "A steady breathing rhythm gives your attention one simple thing to follow. A body scan helps you notice where tension sits.", what: "Follow an even breath for about two minutes, with no holds. Or move attention through body areas.", notice: "Which phase of the breath is easiest, and where you feel tension. Stop if anything feels uncomfortable." },
  { id: "overload", label: "My mind feels overloaded", primary: PRACTICES.silence, alternative: PRACTICES.wave,
    why: "Removing input for a few minutes lets you see how busy the mind is, without adding more to do.", what: "Sit quietly for a set time. Notice sounds, body and thoughts without trying to empty your mind.", notice: "That you can watch the busyness without solving it." },
  { id: "focus", label: "I want to improve my focus", primary: PRACTICES.anchor, alternative: PRACTICES.reset,
    why: "Focus is trained by noticing that attention left and returning. Attention Anchor repeats exactly that.", what: "Follow one anchor, tap when you drift and when you return.", notice: "How many times you came back, which matters more than how many times you left." },
  { id: "reactions", label: "I want to understand my reactions", primary: PRACTICES.chain, alternative: PRACTICES.labelling,
    why: "Looking at the steps between an event and your response helps you see where another response might be possible.", what: "Choose a trigger, thought, feeling and urge, then see what changes when a pause is added.", notice: "Which step felt fastest, and where a pause could fit." },
  { id: "restart", label: "I can't restart studying", primary: PRACTICES.reset, alternative: PRACTICES.anchor,
    why: "Starting is easier when the next step is small and specific.", what: "Choose a task, name what is in the way, pick one small next action and an optional timer, then leave with a restart plan.", notice: "How much lighter the task feels once it is small." },
  { id: "impatient", label: "I feel impatient waiting", primary: PRACTICES.patience, alternative: PRACTICES.pause,
    why: "Feeling impatient is different from acting on it. Waiting scenarios let you practise watching the urge.", what: "Work through short waiting situations, notice the urge and choose a response.", notice: "The gap between the urge to hurry and what you actually do." },
  { id: "onedge", label: "I feel on edge or scattered", primary: PRACTICES.grounding, alternative: PRACTICES.comfort,
    why: "Moving attention through your senses brings it back to what is here in the room.", what: "Notice 5 things you see, 4 you feel, 3 you hear, 2 you smell and 1 you taste. Skip any that do not work for you.", notice: "How attention settles on concrete details. Stop if it is uncomfortable." },
  { id: "unsure", label: "I'm not sure what I feel", primary: PRACTICES.checkin, alternative: PRACTICES.labelling,
    why: "Separating what happened, what you feel and what you need next can make a confusing moment clearer.", what: "Optionally pick a feeling and its intensity, then choose what you want to do next.", notice: "That a feeling does not have to be fixed to be understood." },
];
export interface Recommendation { need: Need; primary: Practice; alternative: Practice; repeated: boolean }
/** Deterministic: the same need always gives the same pair. `recentTypes` (most recent first) only sets a "repeated" flag. */
export function recommendFor(needId: string | null | undefined, recentTypes: string[] = []): Recommendation | null {
  const need = NEEDS.find((n) => n.id === needId);
  if (!need) return null;
  return { need, primary: need.primary, alternative: need.alternative, repeated: recentTypes[0] === need.primary.type };
}
