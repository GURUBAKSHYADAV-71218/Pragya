const test = require("node:test"); const assert = require("node:assert");
const T = require("../.test-build/training.js"); const { EXERCISES, EXPERIMENTS } = require("../.test-build/content.js"); const V = require("../.test-build/validate.js");
test("every training step points at a real exercise or experiment, never breathing or silence", () => { for (const st of T.TRAINING) for (const s of st.steps) { if (s.kind === "reflect") continue; const ok = s.kind === "experiment" ? EXPERIMENTS.some((e) => e.slug === s.slug) : EXERCISES.some((e) => e.slug === s.slug); assert.ok(ok, `${st.id}/${s.id}`); assert.ok(s.why && s.does && s.feedback && s.completion); } });
test("four stages, each ending with a reflection step", () => { assert.strictEqual(T.TRAINING.length, 4); for (const st of T.TRAINING) assert.strictEqual(st.steps.at(-1).kind, "reflect"); });
test("nextAfter stays in the stage, then moves to the next stage, then the overview", () => {
  assert.strictEqual(T.nextAfter("attention", "anchor").href, "/training/attention/switch"); assert.strictEqual(T.nextAfter("attention", "switch").href, "/training/attention/reflect");
  assert.strictEqual(T.nextAfter("attention", "reflect").href, "/training/reaction/pause"); assert.strictEqual(T.nextAfter("presence", "reflect").href, "/training"); assert.strictEqual(T.nextAfter("nope", "x").href, "/training"); });
test("no destination is ever /breathing or /exercises", () => { for (const st of T.TRAINING) for (const s of st.steps) { const h = T.nextAfter(st.id, s.id).href; assert.ok(h.startsWith("/training"), h); } });
test("progress depends only on training state", () => {
  assert.deepStrictEqual(T.stageStatus(undefined, "attention"), { total: 3, finished: 0, complete: false, nextStep: T.getStep("attention", "anchor") });
  const st = { attention: { anchor: { status: "done", at: 1 } } }; const a = T.stageStatus(st, "attention"); assert.strictEqual(a.finished, 1); assert.strictEqual(a.nextStep.id, "switch");
  const full = { attention: { anchor: { status: "done", at: 1 }, switch: { status: "done", at: 2 }, reflect: { status: "skipped", at: 3 } } }; assert.strictEqual(T.stageStatus(full, "attention").complete, true);
  assert.strictEqual(T.stageStatus(st, "reaction").finished, 0); });
test("previousOf", () => { assert.strictEqual(T.previousOf("attention", "anchor"), null); assert.strictEqual(T.previousOf("attention", "switch").href, "/training/attention/anchor"); });
test("email and password validation", () => { assert.ok(V.validateEmail("")); assert.ok(V.validateEmail("not-an-email")); assert.ok(V.validateEmail("a@b")); assert.strictEqual(V.validateEmail("me@example.com"), null);
  assert.ok(V.validatePassword("", "login")); assert.strictEqual(V.validatePassword("x", "login"), null); assert.ok(V.validatePassword("short", "signup")); assert.strictEqual(V.validatePassword("longenough", "signup"), null); });
test("internal path validation", () => { assert.ok(V.isInternalPath("/training/attention")); assert.ok(!V.isInternalPath("//evil.com")); assert.ok(!V.isInternalPath("https://evil.com")); assert.ok(!V.isInternalPath("/a?b=1")); assert.ok(!V.isInternalPath(5)); });
