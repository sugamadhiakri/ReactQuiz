import { suffleArray } from "./utils";

export enum Difficulty {
	EASY = "easy",
	MEDIUM = "medium",
	HARD = "hard",
}

export type Question = {
	category: string;
	correct_answer: string;
	difficulty: string;
	incorrect_answers: string[];
	question: string;
	type: string;
};

export type QuestionState = Question & { answers: string[] };

export const fetchQuizQuestions = async (
	amount: number,
	dificulty: Difficulty
): Promise<QuestionState[]> => {
	const endpoint = `https://opentdb.com/api.php?amount=${amount}&difficulty=${dificulty}&type=multiple`;
	const data = await (await fetch(endpoint)).json();
	return data.results.map((question: Question) => ({
		...question,
		answers: suffleArray([
			...question.incorrect_answers,
			question.correct_answer,
		]),
	}));
};
