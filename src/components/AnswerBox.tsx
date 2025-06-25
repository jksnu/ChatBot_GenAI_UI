// components/AnswerBox.tsx
'use client';

interface AnswerBoxProps {
  answer: string;
}

export function AnswerBox({ answer }: AnswerBoxProps) {
  if (!answer) return null;

  return (
    <div className="mt-6 p-6 border border-gray-200 rounded-2xl bg-white shadow-md">
      <h2 className="text-xl font-semibold text-gray-900 mb-3">AI Response</h2>
      <p className="text-base leading-relaxed text-gray-700 whitespace-pre-wrap">
        {answer}
      </p>
    </div>
  );
}
