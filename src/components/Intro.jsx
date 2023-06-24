export default function Intro(props){

    return(
        <header>
            <h1>Quizzical</h1>
            <p className="intro-desc">Test your general knowledge</p>
            <button className="btn intro-btn action-btn" onClick={props.startQuiz}>Start Quiz</button>
        </header>
    )
}