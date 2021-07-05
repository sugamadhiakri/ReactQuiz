import React from "react";
import { AnswerObject } from "../App";
import "./QuestionCard.css";

type Props = {
	question: string;
	answers: string[];
	callback: (e: React.MouseEvent<HTMLButtonElement>) => void;
	userAnswer: AnswerObject | undefined;
	questionNumber: number;
	totalQuestions: number;
};

enum AnswerBgColor {
	NEUTRAL = "white",
	CORRECT = "green",
	WRONG = "red",
}

const QuestionCard: React.FC<Props> = ({
	question,
	answers,
	callback,
	userAnswer,
	questionNumber,
	totalQuestions,
}) => {
	const correctColor = (answer: string): string => {
		if (userAnswer) {
			if (answer === userAnswer.correctAnswer) return AnswerBgColor.CORRECT;
			if (answer === userAnswer.answer && answer !== userAnswer.correctAnswer)
				return AnswerBgColor.WRONG;
		}
		return AnswerBgColor.NEUTRAL;
	};
	return (
		<div className="questionContainer">
			<p className="number">
				{questionNumber} / {totalQuestions}
			</p>

			<p
				dangerouslySetInnerHTML={{ __html: question }}
				className="questionText"
			></p>

			<div className="options">
				{answers.map((answer) => (
					<div key={answer}>
						<button
							disabled={userAnswer ? true : false}
							value={answer}
							onClick={callback}
							className="option"
							style={{ backgroundColor: correctColor(answer) }}
						>
							<span dangerouslySetInnerHTML={{ __html: answer }}></span>
						</button>
					</div>
				))}
			</div>
		</div>
	);
};

export default QuestionCard;
