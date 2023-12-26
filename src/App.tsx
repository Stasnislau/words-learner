import { BrowserRouter, Route, Routes } from "react-router-dom"
import { HomePage, GamePage } from "./pages"
import { useEffect } from "react"
import wordPairs from "./wordPairs.json"

const App = () => {

  useEffect(() => {
    if (!localStorage.getItem("wordList") || localStorage.getItem("wordList") === "[]") {
      localStorage.setItem("wordList", JSON.stringify(wordPairs))
    }
  }, [])

  const availableRoutes = [
    {
      path: '/',
      component: HomePage,
    },
    {
      path: '/game/:questions',
      component: GamePage,
    },
  ]

  return (
    <BrowserRouter>
      <div className="w-full">
        <Routes >
          {availableRoutes.map(({ path, component }) => (
            <Route key={path} path={path} Component={component} />
          ))}
          <Route path="*" element={<h1 className="flex justify-center text-7xl text-red-500">404</h1>} />
        </Routes>
      </div>

    </BrowserRouter>
  )
}

export default App