export default function Answer(props){
    let selectedAnswerClass
    
    // Determine the CSS class based on the quiz state and selected/correct answer
    if(!props.isQuizOver ){
        if(props.selectedAnswer === props.value){
            selectedAnswerClass = "selected-answer"
        }
    }else {
        if(props.correctAnswer === props.value){
            selectedAnswerClass = "correct-answer"
        }else if(props.selectedAnswer === props.value) {
            selectedAnswerClass = "false-answer"
        }
    }

    return (
        <button 
            value={props.value} 
            className={`btn answer-btn ${selectedAnswerClass}`}
            onClick={props.onClick}
            disabled = {props.isQuizOver}
        >
             {props.value}
        </button>
    )
}