import { notFound } from "next/navigation";
import TrainingStepView from "@/components/training/TrainingStepView";
import { TRAINING, getStep } from "@/lib/training";
export const dynamicParams = false;
export const generateStaticParams = () => TRAINING.flatMap((s) => s.steps.map((p) => ({ stage: s.id, step: p.id })));
export default function TrainingStepPage({ params }: { params: { stage: string; step: string } }) {
  if (!getStep(params.stage, params.step)) notFound();
  return <TrainingStepView stageId={params.stage} stepId={params.step} />;
}
