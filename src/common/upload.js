import storage from './store/storage'
import { config } from './config'

export async function uploadFiles(files) {
  return Promise.all(files.map(uploadFile))
}

export async function uploadFile(file) {
  const form = new FormData()
  form.append('file', file)
  form.append('output', 'json')

  let header = {}
  if (storage.psnsToken) {
    header['authorization'] = storage.psnsToken
  }
  const res = await fetch(config.uploadUrl, {
    method: 'POST',headers: {
      ...header,
    },
    body: form,
  })

  const json = await res.json()

  if (res.status === 200 && json.StateCode == 200) {
    return {
      url: json.Data[0].Url,
      name: file.name,
      size: file.size,
      thumbUrl: json.Data[0].ThumbUrl || '',
    }
  }
  throw new Error('请求接口失败')
}

async function getVideoPosterFile(file) {
  return new Promise((resolve, reject) => {
    const video = document.createElement('video')
    video.style.position = 'fixed'
    video.style.left = '-10000px'
    video.style.top = '-10000px'
    video.style.opacity = 0

    document.body.appendChild(video)

    video.src = URL.createObjectURL(file)
    video.autoplay = true
    video.muted = true

    const clean = () => {
      document.body.removeChild(video)
    }

    video.onloadeddata = () => {
      const canvas = document.createElement('canvas')
      canvas.width = video.clientWidth
      canvas.height = video.clientHeight
      const ctx = canvas.getContext('2d')
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height)

      clean()
      canvas.toBlob(resolve, 'image/jpeg')
    }

    video.onerror = e => {
      clean()

      console.error(e)
      reject(new Error('获取视频封面图失败'))
    }
  })
}

async function getAudioDuration(file) {
  const url = URL.createObjectURL(file)
  const audio = new Audio(url)

  return new Promise(resolve => {
    audio.addEventListener('loadedmetadata', e => {
      console.log(e)
      resolve(audio.duration)
    })
  })
}
