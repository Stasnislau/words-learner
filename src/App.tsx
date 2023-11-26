import { BrowserRouter, Route, Routes } from "react-router-dom"
import { HomePage } from "./pages"

const App = () => {
  const availableRoutes = [
    {
      path: '/',
      component: HomePage,
    }
  ]
  return (
    <BrowserRouter>
      <div className="w-full h-full">
        <Routes >
          {availableRoutes.map(({ path, component }) => (
            <Route key={path} path={path} Component={component} />
          ))}
          <Route path="*" element={<h1>404</h1>} />
        </Routes>
      </div>

    </BrowserRouter>
  )
}

export default App