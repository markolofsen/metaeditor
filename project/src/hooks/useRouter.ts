import { useNavigate, useLocation } from "react-router-dom";


const PATH = {
  DEFAULT: '/',
  GALLERY: '/gallery',
  DEV: '/dev',
}

export const useRouter = () => {
  const navigate = useNavigate()
  const location = useLocation()

  const query: any = location?.state

  const push = new class {
    _navigate(name: string, state?: any) {
      navigate(name, { state })
    }
    default() {
      this._navigate(PATH.DEFAULT)
    }
    gallery() {
      this._navigate(PATH.GALLERY)
    }
    dev() {
      this._navigate(PATH.DEV)
    }

  }

  return {
    push,
    query,
  }
}