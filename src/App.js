import "./App.css";
import { useState } from "react";

function App() {
  const [pantalla, setPantalla] = useState("inicio");
  const [dificultad, setDificultad] = useState("");
  const [tema, setTema] = useState("");
  const [preguntaActual, setPreguntaActual] = useState(0);
  const [respuestasCorrectas, setRespuestasCorrectas] = useState(0);
  const [respuestasUsuario, setRespuestasUsuario] = useState([]);
  const [girando, setGirando] = useState(false);
  const [rotacion, setRotacion] = useState(0);

  // Base de preguntas por dificultad y tema
  const preguntas = {
    facil: {
      geografia: [
        {
          pregunta: "¿Cuál es la capital de Francia?",
          opciones: ["París", "Londres", "Madrid", "Berlín"],
          correcta: 0,
        },
        {
          pregunta: "¿Cuál es el océano más grande?",
          opciones: ["Atlántico", "Índico", "Pacífico", "Ártico"],
          correcta: 2,
        },
        {
          pregunta: "¿Cuál es el país más poblado del mundo?",
          opciones: ["India", "China", "Estados Unidos", "Indonesia"],
          correcta: 1,
        },
        {
          pregunta: "¿En cuál continente está Egipto?",
          opciones: ["Asia", "África", "Europa", "América"],
          correcta: 1,
        },
        {
          pregunta: "¿Cuál es la montaña más alta del mundo?",
          opciones: ["Aconcagua", "Mont Blanc", "Everest", "Denali"],
          correcta: 2,
        },
      ],
      ciencias: [
        {
          pregunta: "¿Cuánto es 2 + 2?",
          opciones: ["3", "4", "5", "6"],
          correcta: 1,
        },
        {
          pregunta: "¿Cuál es el planeta más grande?",
          opciones: ["Tierra", "Marte", "Júpiter", "Saturno"],
          correcta: 2,
        },
        {
          pregunta: "¿Cuántos colores tiene el arcoíris?",
          opciones: ["5", "6", "7", "8"],
          correcta: 2,
        },
        {
          pregunta: "¿Cuántas patas tiene una araña?",
          opciones: ["6", "8", "10", "12"],
          correcta: 1,
        },
        {
          pregunta: "¿Cuál es la velocidad de la luz?",
          opciones: [
            "200.000 km/s",
            "300.000 km/s",
            "400.000 km/s",
            "500.000 km/s",
          ],
          correcta: 1,
        },
      ],
      naturaleza: [
        {
          pregunta: "¿Cuál es el animal más rápido del mundo?",
          opciones: ["León", "Guepardo", "Gacela", "Caballo"],
          correcta: 1,
        },
        {
          pregunta: "¿Cuál es el color de la nieve?",
          opciones: ["Gris", "Azul", "Blanco", "Transparente"],
          correcta: 2,
        },
        {
          pregunta: "¿En cuántas fases se divide la luna?",
          opciones: ["2", "3", "4", "5"],
          correcta: 2,
        },
        {
          pregunta: "¿Cuál es el árbol más alto del mundo?",
          opciones: ["Roble", "Pino", "Secuoya", "Cedro"],
          correcta: 2,
        },
        {
          pregunta: "¿Cuántos huesos tiene el cuerpo humano adulto?",
          opciones: ["186", "206", "226", "246"],
          correcta: 1,
        },
      ],
    },
    media: {
      historia: [
        {
          pregunta: "¿En qué año terminó la Segunda Guerra Mundial?",
          opciones: ["1943", "1944", "1945", "1946"],
          correcta: 2,
        },
        {
          pregunta: "¿En qué año cayó el muro de Berlín?",
          opciones: ["1987", "1988", "1989", "1990"],
          correcta: 2,
        },
        {
          pregunta: "¿Quién fue el primer presidente de Estados Unidos?",
          opciones: [
            "Thomas Jefferson",
            "George Washington",
            "Abraham Lincoln",
            "Benjamin Franklin",
          ],
          correcta: 1,
        },
        {
          pregunta: "¿En qué año comenzó la Revolución Francesa?",
          opciones: ["1787", "1789", "1791", "1793"],
          correcta: 1,
        },
        {
          pregunta: "¿Cuál fue el imperio más grande de la historia?",
          opciones: ["Británico", "Romano", "Otomano", "Mongol"],
          correcta: 0,
        },
      ],
      arte: [
        {
          pregunta: "¿Quién pintó la Mona Lisa?",
          opciones: [
            "Miguel Ángel",
            "Leonardo da Vinci",
            "Rafael",
            "Botticelli",
          ],
          correcta: 1,
        },
        {
          pregunta: "¿Cuántas sinfonías compuso Beethoven?",
          opciones: ["8", "9", "10", "11"],
          correcta: 1,
        },
        {
          pregunta: "¿Cuál es la estatua más famosa de Miguel Ángel?",
          opciones: ["David", "Pietà", "Moisés", "La victoria"],
          correcta: 0,
        },
        {
          pregunta: "¿En qué año Van Gogh se cortó la oreja?",
          opciones: ["1886", "1887", "1888", "1889"],
          correcta: 2,
        },
        {
          pregunta: "¿Quién escribió Don Quijote?",
          opciones: [
            "Lope de Vega",
            "Miguel de Cervantes",
            "Garcilaso",
            "Góngora",
          ],
          correcta: 1,
        },
      ],
      tecnologia: [
        {
          pregunta: "¿En qué año se inventó la bombilla?",
          opciones: ["1879", "1889", "1899", "1909"],
          correcta: 0,
        },
        {
          pregunta: "¿Cuál es el país más poblado del mundo?",
          opciones: ["India", "China", "Estados Unidos", "Indonesia"],
          correcta: 1,
        },
        {
          pregunta: "¿En qué año se creó Internet?",
          opciones: ["1969", "1979", "1989", "1999"],
          correcta: 0,
        },
        {
          pregunta: "¿Cuál es la velocidad del sonido?",
          opciones: ["250 m/s", "340 m/s", "450 m/s", "550 m/s"],
          correcta: 1,
        },
        {
          pregunta: "¿Cuál es el río más largo del mundo?",
          opciones: ["Amazonas", "Nilo", "Yangtsé", "Misisipi"],
          correcta: 1,
        },
      ],
    },
    dificil: {
      quimica: [
        {
          pregunta: "¿Cuál es el elemento químico con símbolo Au?",
          opciones: ["Plata", "Oro", "Aluminio", "Plomo"],
          correcta: 1,
        },
        {
          pregunta: "¿Cuál es el número atómico del Carbono?",
          opciones: ["4", "6", "8", "12"],
          correcta: 1,
        },
        {
          pregunta: "¿Cuál es el gas más abundante en la atmósfera?",
          opciones: ["Oxígeno", "Nitrógeno", "Dióxido de carbono", "Helio"],
          correcta: 1,
        },
        {
          pregunta: "¿Cuántos elementos hay en la tabla periódica?",
          opciones: ["104", "108", "118", "128"],
          correcta: 2,
        },
        {
          pregunta: "¿Cuál es el pH neutro del agua?",
          opciones: ["5", "7", "9", "11"],
          correcta: 1,
        },
      ],
      literatura: [
        {
          pregunta: "¿Cuál es la novela más vendida de todos los tiempos?",
          opciones: [
            "Don Quijote",
            "Harry Potter",
            "La Biblia",
            "El Quijote es la más vendida",
          ],
          correcta: 3,
        },
        {
          pregunta: "¿Quién escribió Cien años de soledad?",
          opciones: [
            "Jorge Luis Borges",
            "Gabriel García Márquez",
            "Pablo Neruda",
            "Octavio Paz",
          ],
          correcta: 1,
        },
        {
          pregunta: "¿Cuál es la obra más famosa de William Shakespeare?",
          opciones: ["Hamlet", "Romeo y Julieta", "Macbeth", "Otelo"],
          correcta: 0,
        },
        {
          pregunta: "¿Quién escribió La metamorfosis?",
          opciones: [
            "Fyodor Dostoyevski",
            "Nikolai Gogol",
            "Franz Kafka",
            "Anton Chéjov",
          ],
          correcta: 2,
        },
        {
          pregunta: "¿En qué siglo vivió Dante Alighieri?",
          opciones: ["XII", "XIII", "XIV", "XV"],
          correcta: 2,
        },
      ],
      fisica: [
        {
          pregunta: "¿Cuál es la velocidad de la luz?",
          opciones: [
            "200.000 km/s",
            "300.000 km/s",
            "400.000 km/s",
            "500.000 km/s",
          ],
          correcta: 1,
        },
        {
          pregunta: "¿Quién formuló la teoría de la relatividad?",
          opciones: [
            "Isaac Newton",
            "Stephen Hawking",
            "Albert Einstein",
            "Galileo Galilei",
          ],
          correcta: 2,
        },
        {
          pregunta: "¿Cuántas leyes del movimiento hay?",
          opciones: ["2", "3", "4", "5"],
          correcta: 1,
        },
        {
          pregunta: "¿Cuál es la constante de Planck aproximadamente?",
          opciones: [
            "6.626 × 10⁻³⁴",
            "9.109 × 10⁻³¹",
            "1.602 × 10⁻¹⁹",
            "6.022 × 10²³",
          ],
          correcta: 0,
        },
        {
          pregunta: "¿Qué es un agujero negro?",
          opciones: [
            "Un vacío en el espacio",
            "Una estrella muerta con gravedad extrema",
            "Un tipo de materia oscura",
            "Una anomalía del tiempo",
          ],
          correcta: 1,
        },
      ],
    },
  };

  const temasPorDificultad = {
    facil: ["geografía", "ciencias", "naturaleza"],
    media: ["historia", "arte", "tecnologia"],
    dificil: ["quimica", "literatura", "fisica"],
  };

  const coloresTemas = {
    geografía: "#FF6B6B",
    ciencias: "#4ECDC4",
    naturaleza: "#95E1D3",
    historia: "#FFE66D",
    arte: "#FF6348",
    tecnologia: "#95A5FF",
    quimica: "#FF9FF3",
    literatura: "#FFC93C",
    fisica: "#6BCB77",
  };

  const iniciarJuego = () => {
    setPantalla("dificultad");
  };

  const seleccionarDificultad = (nivel) => {
    setDificultad(nivel);
    setPantalla("ruleta");
    setRotacion(0);
  };

  const girarRuleta = () => {
    setGirando(true);
    const temas = temasPorDificultad[dificultad];
    const segmento = 360 / temas.length;

    // Seleccionar un índice completamente aleatorio
    const indiceGanador = Math.floor(Math.random() * temas.length);

    // Calcular la rotación para que el tema quede EXACTAMENTE bajo el puntero
    // El puntero está en la parte superior (-90 grados)
    // Cada segmento está centrado en: (indice * segmento) - 90 + (segmento/2)
    // Para que quede bajo el puntero: rotacion = -(indice + 0.5) * segmento + vueltas

    const variacion = Math.random() * (segmento * 0.5);
    const rotacionAleatoria =
      360 * 5 - (indiceGanador + 0.5) * segmento + variacion;

    setRotacion(rotacionAleatoria);

    setTimeout(() => {
      const temaSeleccionado = temas[indiceGanador];
      setTema(temaSeleccionado);
      setPreguntaActual(0);
      setRespuestasCorrectas(0);
      setRespuestasUsuario([]);
      setPantalla("temaganador");
      setGirando(false);
    }, 3500);
  };

  const responder = (indiceOpcion) => {
    const preguntasDelTema = preguntas[dificultad][tema];
    const esCorrecta =
      indiceOpcion === preguntasDelTema[preguntaActual].correcta;

    setRespuestasUsuario([
      ...respuestasUsuario,
      {
        pregunta: preguntasDelTema[preguntaActual].pregunta,
        respuestaUsuario:
          preguntasDelTema[preguntaActual].opciones[indiceOpcion],
        respuestaCorrecta:
          preguntasDelTema[preguntaActual].opciones[
            preguntasDelTema[preguntaActual].correcta
          ],
        esCorrecta: esCorrecta,
      },
    ]);

    if (esCorrecta) {
      setRespuestasCorrectas(respuestasCorrectas + 1);
    }

    if (preguntaActual + 1 < preguntasDelTema.length) {
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
    setTema("");
    setRespuestasUsuario([]);
  };

  const verDetalles = () => {
    setPantalla("detalles");
  };

  const temas = temasPorDificultad[dificultad] || [];
  const preguntasDelTema = preguntas[dificultad]?.[tema] || [];
  const preguntaData = preguntasDelTema[preguntaActual] || null;
  const anguloSegmento = 360 / temas.length;

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
            <button
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
            </button>
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

      {pantalla === "ruleta" && (
        <div style={{ textAlign: "center", padding: "40px" }}>
          <h1>🎡 ¡Gira la Ruleta!</h1>
          <p>Descubre qué tema saldrá</p>

          <div
            style={{
              width: "350px",
              height: "350px",
              margin: "40px auto",
              position: "relative",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {/* Puntero */}
            <div
              style={{
                position: "absolute",
                top: "-25px",
                left: "50%",
                transform: "translateX(-50%)",
                width: "0",
                height: "0",
                borderLeft: "20px solid transparent",
                borderRight: "20px solid transparent",
                borderTop: "40px solid #FFD700",
                zIndex: 10,
                boxShadow: "0 4px 15px rgba(0,0,0,0.5)",
                filter: "drop-shadow(0 2px 5px rgba(0,0,0,0.3))",
              }}
            />

            {/* Ruleta con SVG para segmentos */}
            <svg
              width="350"
              height="350"
              style={{
                transform: `rotate(${rotacion}deg)`,
                transition: girando
                  ? "transform 3.5s cubic-bezier(0.34, 1.56, 0.64, 1)"
                  : "none",
                filter: "drop-shadow(0 8px 20px rgba(0,0,0,0.3))",
              }}
            >
              {temas.map((temaNombre, index) => {
                const startAngle = (index * 360) / temas.length - 90;
                const endAngle = ((index + 1) * 360) / temas.length - 90;

                const startRad = (startAngle * Math.PI) / 180;
                const endRad = (endAngle * Math.PI) / 180;

                const x1 = 175 + 175 * Math.cos(startRad);
                const y1 = 175 + 175 * Math.sin(startRad);
                const x2 = 175 + 175 * Math.cos(endRad);
                const y2 = 175 + 175 * Math.sin(endRad);

                const largeArc = 360 / temas.length > 180 ? 1 : 0;

                const pathData = `M 175 175 L ${x1} ${y1} A 175 175 0 ${largeArc} 1 ${x2} ${y2} Z`;

                return (
                  <g key={index}>
                    <path
                      d={pathData}
                      fill={coloresTemas[temaNombre]}
                      stroke="white"
                      strokeWidth="3"
                    />
                    <text
                      x={
                        175 +
                        110 *
                          Math.cos(
                            (((startAngle + endAngle) / 2) * Math.PI) / 180,
                          )
                      }
                      y={
                        175 +
                        110 *
                          Math.sin(
                            (((startAngle + endAngle) / 2) * Math.PI) / 180,
                          ) +
                        8
                      }
                      textAnchor="middle"
                      fill="white"
                      fontSize="18"
                      fontWeight="bold"
                      textShadow="1px 1px 3px rgba(0,0,0,0.5)"
                      style={{
                        userSelect: "none",
                        pointerEvents: "none",
                        textShadow: "2px 2px 4px rgba(0,0,0,0.7)",
                      }}
                    >
                      {temaNombre.charAt(0).toUpperCase() + temaNombre.slice(1)}
                    </text>
                  </g>
                );
              })}

              {/* Centro de la ruleta */}
              <circle
                cx="175"
                cy="175"
                r="30"
                fill="#FFD700"
                stroke="white"
                strokeWidth="3"
              />
              <circle cx="175" cy="175" r="20" fill="#667eea" />
            </svg>
          </div>

          <button
            className="button"
            onClick={girarRuleta}
            disabled={girando}
            style={{
              marginTop: "30px",
              padding: "18px 50px",
              fontSize: "18px",
              opacity: girando ? 0.6 : 1,
              cursor: girando ? "not-allowed" : "pointer",
            }}
          >
            {girando ? "⏳ Girando..." : "🎰 Girar Ruleta"}
          </button>

          <button
            onClick={() => setPantalla("dificultad")}
            style={{
              marginTop: "20px",
              marginLeft: "10px",
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

      {pantalla === "temaganador" && (
        <div
          style={{
            textAlign: "center",
            padding: "60px 40px",
            animation: "slideUp 0.6s ease",
          }}
        >
          <h1 style={{ fontSize: "2.5em", marginBottom: "30px" }}>
            🎊 ¡TEMA SELECCIONADO! 🎊
          </h1>

          <div
            style={{
              width: "100%",
              maxWidth: "500px",
              margin: "0 auto",
              padding: "60px 40px",
              backgroundColor: coloresTemas[tema],
              borderRadius: "25px",
              boxShadow: `0 15px 50px rgba(102, 126, 234, 0.4)`,
              border: "5px solid white",
              animation: "pulse 0.6s ease",
            }}
          >
            <p
              style={{
                fontSize: "1.2em",
                fontWeight: "600",
                color: "white",
                marginBottom: "20px",
                opacity: 0.9,
              }}
            >
              Vas a jugar:
            </p>
            <h2
              style={{
                fontSize: "3.5em",
                fontWeight: "900",
                color: "white",
                margin: "20px 0",
                textTransform: "capitalize",
                textShadow: "3px 3px 6px rgba(0,0,0,0.3)",
                animation: "bounce 0.8s ease infinite",
              }}
            >
              {tema}
            </h2>
            <p
              style={{
                fontSize: "1.1em",
                color: "white",
                marginTop: "20px",
                opacity: 0.9,
              }}
            >
              📚 Demuestra tus conocimientos
            </p>
          </div>

          <button
            className="button"
            onClick={() => setPantalla("trivia")}
            style={{
              marginTop: "50px",
              padding: "20px 60px",
              fontSize: "18px",
              animation: "slideUp 0.8s ease 0.3s backwards",
            }}
          >
            ▶️ Comenzar el Quiz
          </button>

          <button
            onClick={() => setPantalla("ruleta")}
            style={{
              marginTop: "30px",
              marginLeft: "10px",
              background: "rgba(255, 255, 255, 0.3)",
              color: "white",
              border: "2px solid white",
              padding: "12px 25px",
              borderRadius: "20px",
              cursor: "pointer",
              fontWeight: "600",
              transition: "all 0.3s ease",
              fontSize: "16px",
            }}
            onMouseEnter={(e) =>
              (e.target.style.background = "rgba(255, 255, 255, 0.5)")
            }
            onMouseLeave={(e) =>
              (e.target.style.background = "rgba(255, 255, 255, 0.3)")
            }
          >
            ← Girar de Nuevo
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
                color: coloresTemas[tema],
              }}
            >
              📚 {tema.toUpperCase()} | PREGUNTA {preguntaActual + 1} DE{" "}
              {preguntasDelTema.length}
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
                  width: `${((preguntaActual + 1) / preguntasDelTema.length) * 100}%`,
                  height: "100%",
                  background: `linear-gradient(90deg, ${coloresTemas[tema]}, #764ba2)`,
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
                  background: `linear-gradient(135deg, ${coloresTemas[tema]} 0%, #764ba2 100%)`,
                  color: "white",
                  border: "none",
                  borderRadius: "12px",
                  fontWeight: "600",
                  transition: "all 0.3s ease",
                  boxShadow: "0 4px 15px rgba(102, 126, 234, 0.3)",
                  textAlign: "center",
                }}
                onMouseEnter={(e) => {
                  e.target.style.transform = "translateX(10px)";
                  e.target.style.boxShadow =
                    "0 8px 25px rgba(102, 126, 234, 0.5)";
                }}
                onMouseLeave={(e) => {
                  e.target.style.transform = "translateX(0)";
                  e.target.style.boxShadow =
                    "0 4px 15px rgba(102, 126, 234, 0.3)";
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
              color: coloresTemas[tema],
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
              {respuestasCorrectas}/{preguntasDelTema.length}
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
              {Math.round(
                (respuestasCorrectas / preguntasDelTema.length) * 100,
              )}
              %
            </p>
            <p style={{ fontSize: "1em", opacity: 0.9 }}>
              {Math.round(
                (respuestasCorrectas / preguntasDelTema.length) * 100,
              ) >= 80
                ? "¡Excelente trabajo! 🌟"
                : Math.round(
                      (respuestasCorrectas / preguntasDelTema.length) * 100,
                    ) >= 60
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
              color: coloresTemas[tema],
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
