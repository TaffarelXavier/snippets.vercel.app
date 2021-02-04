import { toast } from 'react-toastify'
toast.configure({ autoClose: 3000, draggable: false })
/* INFO: "info" SUCCESS: "success" WARNING: "warning" ERROR: "error" DEFAULT: "default" */
const notify = (message, type = 'success', timerAutoClose = 6000) => {
  toast(message, { type: type, autoClose: timerAutoClose })
}
export default notify
