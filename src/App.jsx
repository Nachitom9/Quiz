import ConnectionButton from "./components/ConnectionButton";
import questions from "./questions";
import { useState, useEffect } from "react";


function App() {

  const [preguntaActual,setPreguntaActual] = useState(0);
  const [puntuación, setPuntuación] = useState(0);
  const [isFinished, setIsFinished] = useState(false);
  const [tiempoRestante, setTiempoRestante] = useState(10);
  const [areDisabled, setAreDisabled] = useState(false);
  const [answersShown, setAnswersShown] = useState(false);

  function handleAnswerSubmit(isCorrect, e) {
    if (isCorrect) setPuntuación(puntuación + 1);
    e.target.classList.add(isCorrect ? "correct" : "incorrect");
   

    setTimeout(() => {
      if (preguntaActual === questions.length - 1) {
        setIsFinished(true);
      } else {
        setPreguntaActual(preguntaActual + 1);
        setTiempoRestante(10);
      }
    }, 1500);
  }

  useEffect(() => {
    const intervalo = setInterval(() => {
      if (tiempoRestante > 0) setTiempoRestante((prev) => prev - 1);
      if (tiempoRestante === 0) setAreDisabled(true);
    }, 1000);

    return () => clearInterval(intervalo);
  }, [tiempoRestante]);

  if (isFinished)
    return (
      
      <main className="app">
      
        <div className="juego-terminado">
          <span>
            {" "}
            You got {puntuación} of {questions.length}{" "}
          </span>
          <button onClick={() => (window.location.href = "/")}>
            {" "}
            Try Again
          </button>
          <button
            onClick={() => {
              setIsFinished(false);
              setAnswersShown(true);
            setPreguntaActual(0);
            }}
          >
            See answers
          </button>
          <button type="submit">
  
            Send Answers
          </button>
        </div>
      </main>
    );

  if (answersShown)
    return (
      <main className="app">
        <div className="lado-izquierdo">
          <div className="numero-pregunta">
            <span> Question {preguntaActual + 1} of</span> {questions.length}
          </div>
          <div className="titulo-pregunta">
            {questions[actualQuestion].title}
          </div>
          <div>
            {
              questions[preguntaActual].options.filter(
                (opcion) => opcion.isCorrect
              )[0].textoRespuesta
            }
          </div>
          <button
            onClick={() => {
              if (preguntaActual === questions.length - 1) {
                window.location.href = "/";
              } else {
                setPreguntaActual(preguntaActual + 1);
              }
            }}
          >
            {preguntaActual === questions.length - 1
              ? "Try Again"
              : "Next"}
          </button>
        </div>
      </main>
    );

  return (
    <main className="app">
      <div className="lado-izquierdo">
        <div className="numero-pregunta">
          <span> Question {preguntaActual + 1} of</span> {questions.length}
        </div>
        <div className="titulo-pregunta">
          {questions[preguntaActual].title}
        </div>
        <div>
          {!areDisabled ? (
            <span className="tiempo-restante">
              Time Left: {tiempoRestante}{" "}
            </span>
          ) : (
            <button
              onClick={() => {
                setTiempoRestante(10);
                setAreDisabled(false);
                if (preguntaActual === questions.length - 1) {
                  setIsFinished(true);
                } else {
                  setPreguntaActual(preguntaActual + 1);
                }
              }}
            >
              Continue
            </button>
          )}
        </div>
      </div>
      <div className="lado-derecho">
        {questions[preguntaActual].options.map((respuesta) => (
          <button
            disabled={areDisabled}
            key={respuesta.textoRespuesta}
            onClick={(e) => handleAnswerSubmit(respuesta.isCorrect, e)}
          >
            {respuesta.textoRespuesta}
          </button>
        ))}
      </div>
      <div>
      <ConnectionButton/>
      </div>
    </main>
  );
}

export default App;