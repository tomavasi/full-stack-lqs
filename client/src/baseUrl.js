 
  export let baseUrl;

  if (process.env.NODE_ENV === 'development') {
    baseUrl = "http://localhost:5555"
  } else {
    baseUrl = "https://full-stack-lqs.onrender.com"
  }