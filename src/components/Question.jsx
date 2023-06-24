import Answer from "./Answer"

export default function Question(props){
    //Mapping over answers props coming from App and creating Answer components array
    const answerElements = props.answers.map(answer => {
        return <Answer
                    key={answer.id} 
                    value={answer.value} 
                    onClick={() => props.handleAnswerClick(props.id,answer.value)}
                    selectedAnswer={props.selectedAnswer}
                    isQuizOver = {props.isQuizOver}
                    correctAnswer = {props.correctAnswer}
                />
    })
    return(
        <div className="question">
            <h2>{props.question}</h2>
            <div className="answers">
                {answerElements}
            </div>
        </div>
    )
}