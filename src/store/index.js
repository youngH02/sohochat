import { create } from "zustand";

const INITIAL_QUESTION_SET = [
  {
    id: 1,
    question: "유플러스 우리가게 패키지에 대해서 알려줘",
    answer:
      "유플러스에서 제공하는 우리가게패키지는 온라인 비즈니스를 운영하는 소상공인 및 개인사업자들이 온라인상으로 자신의 상품 및 서비스를 판매할 수 있도록 돕는 서비스입니다.",
  },
];

export const useChatQAStore = create((set) => ({
  questionSet: INITIAL_QUESTION_SET,
  addQuestion: (newQuestion) =>
    set((prev) => ({
      questionSet: [
        ...prev.questionSet,
        { id: prev.questionSet.length + 1, ...newQuestion },
      ],
    })),
  addAnswer: (newAnswer) =>
    set((state) => {
      const { questionSet } = state;

      const result = questionSet.map((set) =>
        set.id === questionSet.length
          ? { ...set, answer: set.answer + newAnswer }
          : set
      );
      console.log(result);
      return { questionSet: result };
    }),
}));
