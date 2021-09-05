const bufferToBase64Img = buffer => {
  let binary = ''
  const bytes = new Uint8Array(buffer)
  for (let i = 0; i < bytes.byteLength; i++) {
    binary += String.fromCharCode(bytes[i])
  }
  return 'data:image/jpeg;base64,' + window.btoa(binary)
}

const isMock = import.meta.env.VITE_APP_IS_MOCK === 'mock'



export { bufferToBase64Img, isMock }