import { toast } from 'react-toastify';
import { AiOutlineCloseCircle, AiOutlineCheckCircle } from 'react-icons/ai'
import 'react-toastify/dist/ReactToastify.css';

export const Notify = (notificationType: string, message: string) => {
  if(notificationType === "ERROR") {
    toast.error(message, {
      position: toast.POSITION.TOP_RIGHT,
      className: 'notify_error',
      bodyClassName: 'notify_body_error',
      progressClassName: 'notify_progress_error',
      icon: <AiOutlineCloseCircle fill="#fff" />
    });
    return
  }
  if(notificationType === "SUCCESS") {
    toast.success(message, {
      position: toast.POSITION.TOP_RIGHT,
      className: 'notify_success',
      bodyClassName: 'notify_body_success',
      progressClassName: 'notify_progress_success',
      icon: <AiOutlineCheckCircle fill="#fff" />
    });
    return
  }
}

// Notify("ERROR", "Exemple error toast")
// Notify("SUCCESS", "Exemple success toast")

