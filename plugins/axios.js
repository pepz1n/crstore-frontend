export default function ({ $axios }, inject) {
  
  const token = localStorage.getItem('forget-key') || '';

  const api = $axios.create()
  
  api.onRequest(() =>{
    const token = localStorage.getItem('forget-key') || '';
    api.setHeader('Authorization', `Bearer ${token}`)
  })

  api.setBaseURL('http://localhost:3333')

  inject('api', api)
}