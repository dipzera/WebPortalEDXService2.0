import { useState, useEffect } from "react"
import { useHistory, Redirect } from "react-router-dom"
import axios from "axios"
import { LoginPage } from "../pages/LoginPage"

export default function useFetch({ method, url, data = null, config = null }) {
  const [response, setResponse] = useState(null)
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(true)
  let history = useHistory()

  useEffect(() => {
    const fetchData = async () => {
      try {
        axios[method](url, JSON.parse(config), JSON.parse(data))
          .then((res) => {
            setResponse(res.data)
          })
          .catch(() => {
            localStorage.clear()
            history.push("/login")
          })
          .finally(() => {
            setIsLoading(false)
          })
      } catch (err) {
        setError(err)
      }
    }

    fetchData()
  }, [method, url, data, config])

  return { response, error, isLoading }
}
