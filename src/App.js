import "./App.css";
import { useEffect, useState } from "react";
import { getCategories, getQuestions } from "./services/api";
import { Button } from "./components/Button";
import { OptionBox } from "./components/OptionBox";
import { DIFFICULTY_ENUMERATOR } from "./constants/config";

function App() {
  const [pantalla, setPantalla] = useState("inicio");
  const [dificultad, setDificultad] = useState("");
  const [categories, setCategories] = useState([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState("");
  const [tema, setTema] = useState("");
  const [questions, setQuestions] = useState([]);
  const [preguntaActual, setPreguntaActual] = useState(0);
  const [respuestasCorrectas, setRespuestasCorrectas] = useState(0);
  const [respuestasUsuario, setRespuestasUsuario] = useState([]);
  const [loadingQuestions, setLoadingQuestions] = useState(false);
  const [apiError, setApiError] = useState("");

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const categories = await getCategories();
        setCategories(categories);
        setApiError("");
      } catch (error) {
        console.error(error);
        setApiError("No se pudieron cargar las categorías. Intenta de nuevo más tarde.");
      }
    };

    fetchCategories();
  }, []);

  const iniciarJuego = () => {
    setPantalla("dificultad");
  };

  const seleccionarDificultad = (nivel) => {
    setDificultad(nivel);
    setSelectedCategoryId("");
    setTema("");
    setQuestions([]);
    setPreguntaActual(0);
    setRespuestasCorrectas(0);
    setRespuestasUsuario([]);
    setApiError("");
    setPantalla("tema");
  };

  const handleCategoryChange = (categoryId) => {
    setSelectedCategoryId(categoryId);
    const selected = categories.find((category) => category.id.toString() === categoryId);
    setTema(selected?.name || "");
    setQuestions([]);
    setPreguntaActual(0);
    setRespuestasCorrectas(0);
    setRespuestasUsuario([]);
  };

  const comenzarTrivia = async () => {
    if (!selectedCategoryId || !dificultad) return;

    setLoadingQuestions(true);
    setApiError("");

    try {
      const preguntas = await getQuestions({
        categoryId: selectedCategoryId,
        difficulty: dificultad,
        amount: 10,
      });

      if (!preguntas.length) {
        setApiError("No se encontraron preguntas para esta categoría y dificultad.");
        return;
      }

      setQuestions(preguntas);
      setPreguntaActual(0);
      setRespuestasCorrectas(0);
      setRespuestasUsuario([]);
      setPantalla("trivia");
    } catch (error) {
      console.error(error);
      setApiError("Hubo un error al cargar las preguntas. Intenta de nuevo.");
    } finally {
      setLoadingQuestions(false);
    }
  };

  const responder = (indiceOpcion) => {
    const preguntaActualData = questions[preguntaActual];
    if (!preguntaActualData) return;

    const esCorrecta = indiceOpcion === preguntaActualData.correcta;

    setRespuestasUsuario([
      ...respuestasUsuario,
      {
        pregunta: preguntaActualData.pregunta,
        respuestaUsuario: preguntaActualData.opciones[indiceOpcion],
        respuestaCorrecta: preguntaActualData.opciones[preguntaActualData.correcta],
        esCorrecta,
      },
    ]);

    if (esCorrecta) {
      setRespuestasCorrectas(respuestasCorrectas + 1);
    }

    if (preguntaActual + 1 < questions.length) {
      setPreguntaActual(preguntaActual + 1);
    } else {
      setPantalla("resultado");
    }
  };

  const volverAlInicio = () => {
    setPantalla("inicio");
    setPreguntaActual(0);
    setRespuestasCorrectas(0);
    setDificultad("");
    setSelectedCategoryId("");
    setTema("");
    setQuestions([]);
    setRespuestasUsuario([]);
    setApiError("");
  };

  const verDetalles = () => {
    setPantalla("detalles");
  };

  const preguntaData = questions[preguntaActual] || null;
  const selectedCategory = categories.find((category) => category.id.toString() === selectedCategoryId);

  const colorPalette = [
    "#4ECDC4",
    "#FF6B6B",
    "#95E1D3",
    "#FFE66D",
    "#FF6348",
    "#95A5FF",
    "#FF9FF3",
    "#FFC93C",
    "#6BCB77",
    "#5D5FEF",
    "#F76C6C",
    "#38B6FF",
    "#FEBF63",
  ];

  const categoryColor =
    selectedCategory
      ? colorPalette[categories.indexOf(selectedCategory) % colorPalette.length]
      : "#4ECDC4";

  const totalPreguntas = questions.length;

  function difficultyButton() {
    return DIFFICULTY_ENUMERATOR.map((dificultadItem) => (
      <Button
        key={dificultadItem.value}
        onClick={() => seleccionarDificultad(dificultadItem.value)}
        label={dificultadItem.label}
      />
    ));
  }

  return (
    <div className="App">
      {pantalla === "inicio" && (
        <div style={{ textAlign: "center" }}>
          <h1>🎯 Bienvenido a la Trivia</h1>
          <p>Demuestra tus conocimientos y sube de nivel</p>
          <button
            className="button"
            onClick={iniciarJuego}
            style={{
              marginTop: "30px",
              padding: "15px 40px",
              fontSize: "18px",
            }}
          >
            Empezar Quiz
          </button>
        </div>
      )}

      {pantalla === "dificultad" && (
        <div style={{ textAlign: "center" }}>
          <h1>⚙️ Elige la Dificultad</h1>
          <div
            style={{
              display: "flex",
              gap: "20px",
              justifyContent: "center",
              flexWrap: "wrap",
              marginTop: "40px",
            }}
          >
            {difficultyButton()}
            {/* <Button
              onClick={() => seleccionarDificultad("facil")}
              label="🟢 Fácil"
            />
            <Button
              onClick={() => seleccionarDificultad("media")}
              label="🟡 Media"
            />
            <Button
              onClick={() => seleccionarDificultad("dificil")}
              label="🔴 Difícil"
            /> */}
            {/* <button
              className="button"
              onClick={() => seleccionarDificultad("facil")}
              style={{ padding: "15px 35px", fontSize: "17px" }}
            >
              🟢 Fácil
            </button>
            <button
              className="button"
              onClick={() => seleccionarDificultad("media")}
              style={{ padding: "15px 35px", fontSize: "17px" }}
            >
              🟡 Media
            </button>
            <button
              className="button"
              onClick={() => seleccionarDificultad("dificil")}
              style={{ padding: "15px 35px", fontSize: "17px" }}
            >
              🔴 Difícil
            </button> */}
          </div>
          <br />
          <button
            onClick={volverAlInicio}
            style={{
              marginTop: "40px",
              background: "rgba(255, 255, 255, 0.3)",
              color: "white",
              border: "2px solid white",
              padding: "10px 25px",
              borderRadius: "20px",
              cursor: "pointer",
              fontWeight: "600",
              transition: "all 0.3s ease",
            }}
            onMouseEnter={(e) =>
              (e.target.style.background = "rgba(255, 255, 255, 0.5)")
            }
            onMouseLeave={(e) =>
              (e.target.style.background = "rgba(255, 255, 255, 0.3)")
            }
          >
            ← Volver
          </button>
        </div>
      )}

      {pantalla === "tema" && (
        <div style={{ textAlign: "center", padding: "40px" }}>
          <h1>🗂️ Elige un tema</h1>
          <p>Selecciona la categoría que quieres jugar con la dificultad elegida.</p>

          {apiError && (
            <p style={{ color: "#ffdddd", marginTop: "10px" }}>{apiError}</p>
          )}

          <div style={{ maxWidth: "450px", margin: "40px auto" }}>
            <OptionBox
              label="Categoría"
              options={categories}
              value={selectedCategoryId}
              onChange={handleCategoryChange}
              placeholder={categories.length ? "Selecciona una categoría" : "Cargando categorías..."}
            />
          </div>

          <button
            className="button"
            onClick={comenzarTrivia}
            disabled={!selectedCategoryId || loadingQuestions}
            style={{
              marginTop: "30px",
              padding: "18px 50px",
              fontSize: "18px",
              opacity: !selectedCategoryId || loadingQuestions ? 0.6 : 1,
              cursor: !selectedCategoryId || loadingQuestions ? "not-allowed" : "pointer",
            }}
          >
            {loadingQuestions ? "⏳ Cargando preguntas..." : "▶️ Comenzar Quiz"}
          </button>

          <button
            onClick={() => setPantalla("dificultad")}
            style={{
              marginTop: "20px",
              marginLeft: "10px",
              background: "rgba(255, 255, 255, 0.3)",
              color: "black",
              border: "2px solid white",
              padding: "10px 25px",
              borderRadius: "20px",
              cursor: "pointer",
              fontWeight: "600",
              transition: "all 0.3s ease",
            }}
            onMouseEnter={(e) =>
              (e.target.style.background = "rgba(255, 255, 255, 0.5)")
            }
            onMouseLeave={(e) =>
              (e.target.style.background = "rgba(255, 255, 255, 0.3)")
            }
          >
            ← Volver
          </button>
        </div>
      )}

      {pantalla === "trivia" && preguntaData && (
        <div
          style={{
            padding: "50px 40px",
            textAlign: "center",
            maxWidth: "700px",
          }}
        >
          <div style={{ marginBottom: "30px" }}>
            <p
              style={{
                fontSize: "14px",
                fontWeight: "700",
                letterSpacing: "1px",
                opacity: 0.8,
                color: categoryColor,
              }}
            >
              📚 {tema.toUpperCase()} | PREGUNTA {preguntaActual + 1} DE {totalPreguntas}
            </p>
            <div
              style={{
                width: "100%",
                height: "6px",
                backgroundColor: "rgba(102, 126, 234, 0.2)",
                borderRadius: "10px",
                marginTop: "10px",
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  width: `${((preguntaActual + 1) / totalPreguntas) * 100}%`,
                  height: "100%",
                  background: `linear-gradient(90deg, ${categoryColor}, #764ba2)`,
                  borderRadius: "10px",
                  transition: "width 0.5s ease",
                }}
              ></div>
            </div>
          </div>
          <h2>{preguntaData.pregunta}</h2>
          <div style={{ margin: "40px 0" }}>
            {preguntaData.opciones.map((opcion, indice) => (
              <button
                key={indice}
                onClick={() => responder(indice)}
                style={{
                  display: "block",
                  width: "100%",
                  padding: "18px",
                  margin: "15px 0",
                  fontSize: "1.05em",
                  cursor: "pointer",
                  background: `linear-gradient(135deg, ${categoryColor} 0%, #764ba2 100%)`,
                  color: "white",
                  border: "none",
                  borderRadius: "12px",
                  fontWeight: "600",
                  transition: "all 0.3s ease",
                  boxShadow: "0 4px 15px rgba(0, 0, 0, 0.18)",
                  textAlign: "center",
                }}
                onMouseEnter={(e) => {
                  e.target.style.transform = "translateX(10px)";
                  e.target.style.boxShadow = "0 8px 25px rgba(0, 0, 0, 0.22)";
                }}
                onMouseLeave={(e) => {
                  e.target.style.transform = "translateX(0)";
                  e.target.style.boxShadow = "0 4px 15px rgba(0, 0, 0, 0.18)";
                }}
              >
                {opcion}
              </button>
            ))}
          </div>
        </div>
      )}

      {pantalla === "resultado" && (
        <div style={{ textAlign: "center" }}>
          <h1>🎉 ¡Juego Terminado!</h1>
          <p
            style={{
              fontSize: "1.3em",
              fontWeight: "600",
              color: categoryColor,
              textTransform: "capitalize",
              marginBottom: "30px",
            }}
          >
            Tema: {tema}
          </p>
          <div
            style={{
              margin: "40px 0",
              padding: "30px",
              backgroundColor: "rgba(102, 126, 234, 0.1)",
              borderRadius: "15px",
              border: "2px solid rgba(102, 126, 234, 0.3)",
            }}
          >
            <p
              style={{
                fontSize: "2.5em",
                fontWeight: "700",
                color: "#667eea",
                margin: "10px 0",
              }}
            >
              {respuestasCorrectas}/{totalPreguntas}
            </p>
            <p style={{ fontSize: "1.1em", opacity: 0.9 }}>
              respuestas correctas
            </p>
          </div>
          <div
            style={{
              margin: "30px 0",
              padding: "25px",
              backgroundColor: "rgba(118, 75, 162, 0.1)",
              borderRadius: "15px",
              border: "2px solid rgba(118, 75, 162, 0.3)",
            }}
          >
            <p
              style={{
                fontSize: "2.2em",
                fontWeight: "700",
                color: "#764ba2",
                margin: "10px 0",
              }}
            >
              {Math.round((respuestasCorrectas / totalPreguntas) * 100)}%
            </p>
            <p style={{ fontSize: "1em", opacity: 0.9 }}>
              {Math.round((respuestasCorrectas / totalPreguntas) * 100) >= 80
                ? "¡Excelente trabajo! 🌟"
                : Math.round((respuestasCorrectas / totalPreguntas) * 100) >= 60
                ? "¡Buen intento! 👍"
                : "¡Sigue practicando! 💪"}
            </p>
          </div>
          <div
            style={{
              display: "flex",
              gap: "15px",
              justifyContent: "center",
              flexWrap: "wrap",
              marginTop: "40px",
            }}
          >
            <button
              className="button"
              onClick={verDetalles}
              style={{
                marginTop: "0px",
                padding: "15px 40px",
                fontSize: "17px",
              }}
            >
              📋 Ver Detalles
            </button>
            <button
              className="button"
              onClick={volverAlInicio}
              style={{
                marginTop: "0px",
                padding: "15px 40px",
                fontSize: "17px",
              }}
            >
              🔄 Jugar de Nuevo
            </button>
          </div>
        </div>
      )}

      {pantalla === "detalles" && (
        <div
          style={{
            padding: "40px",
            textAlign: "center",
            maxWidth: "800px",
            maxHeight: "90vh",
            overflowY: "auto",
          }}
        >
          <h1>📊 Detalles de tu desempeño</h1>
          <p
            style={{
              fontSize: "1.2em",
              fontWeight: "600",
              color: categoryColor,
              textTransform: "capitalize",
              marginBottom: "20px",
            }}
          >
            Tema: {tema}
          </p>
          <div
            style={{
              margin: "30px 0",
              padding: "20px",
              backgroundColor: "rgba(102, 126, 234, 0.1)",
              borderRadius: "15px",
              border: "2px solid rgba(102, 126, 234, 0.3)",
            }}
          >
            <p style={{ fontSize: "1.3em", fontWeight: "700", margin: "0" }}>
              <span style={{ color: "#667eea" }}>
                ✅ Correctas: {respuestasCorrectas}
              </span>{" "}
              /
              <span style={{ color: "#dc3545" }}>
                {" "}
                ❌ Incorrectas: {respuestasUsuario.length - respuestasCorrectas}
              </span>
            </p>
          </div>

          <div style={{ marginTop: "30px", textAlign: "left" }}>
            {respuestasUsuario.map((respuesta, indice) => (
              <div
                key={indice}
                style={{
                  margin: "20px 0",
                  padding: "20px",
                  backgroundColor: respuesta.esCorrecta
                    ? "rgba(40, 167, 69, 0.1)"
                    : "rgba(220, 53, 69, 0.1)",
                  borderLeft: `5px solid ${respuesta.esCorrecta ? "#28a745" : "#dc3545"}`,
                  borderRadius: "10px",
                  textAlign: "left",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    marginBottom: "10px",
                  }}
                >
                  <span style={{ fontSize: "1.5em", marginRight: "15px" }}>
                    {respuesta.esCorrecta ? "✅" : "❌"}
                  </span>
                  <p
                    style={{
                      margin: "0",
                      fontSize: "1.1em",
                      fontWeight: "600",
                      color: "#333",
                      flex: 1,
                    }}
                  >
                    Pregunta {indice + 1}
                  </p>
                </div>
                <p
                  style={{
                    margin: "10px 0 15px 0",
                    fontSize: "1em",
                    fontWeight: "600",
                    color: "#333",
                  }}
                >
                  {respuesta.pregunta}
                </p>
                <div style={{ paddingLeft: "40px" }}>
                  <p
                    style={{
                      margin: "8px 0",
                      fontSize: "0.95em",
                      color: "#333",
                    }}
                  >
                    <strong>Tu respuesta:</strong>{" "}
                    <span
                      style={{
                        color: respuesta.esCorrecta ? "#28a745" : "#dc3545",
                        fontWeight: "600",
                      }}
                    >
                      {respuesta.respuestaUsuario}
                    </span>
                  </p>
                  {!respuesta.esCorrecta && (
                    <p
                      style={{
                        margin: "8px 0",
                        fontSize: "0.95em",
                        color: "#333",
                      }}
                    >
                      <strong>Respuesta correcta:</strong>{" "}
                      <span style={{ color: "#28a745", fontWeight: "600" }}>
                        {respuesta.respuestaCorrecta}
                      </span>
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>

          <div
            style={{
              display: "flex",
              gap: "15px",
              justifyContent: "center",
              flexWrap: "wrap",
              marginTop: "40px",
              paddingBottom: "20px",
            }}
          >
            <button
              className="button"
              onClick={() => setPantalla("resultado")}
              style={{ padding: "15px 40px", fontSize: "17px" }}
            >
              ← Volver
            </button>
            <button
              className="button"
              onClick={volverAlInicio}
              style={{ padding: "15px 40px", fontSize: "17px" }}
            >
              🏠 Inicio
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
