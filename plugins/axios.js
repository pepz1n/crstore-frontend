export default function ({ $axios }, inject) {
  
  const token = localStorage.getItem('forget-key') || '';

  const api = $axios.create({
    headers: {
      common: {
        Authorization: `Bearer ${token}`
      }
    }
  })

  api.setBaseURL('http://localhost:3333')

  inject('api', api)
}