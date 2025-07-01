import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

type ToastOptions = {
  title?: string;
  message: string;
  position?:
    | 'topRight'
    | 'topLeft'
    | 'topCenter'
    | 'bottomRight'
    | 'bottomLeft'
    | 'bottomCenter';
  color?: 'info' | 'success' | 'warning' | 'error';
  timeout?: number;
};

export const showToast = ({
  title = '',
  message,
  position = 'topRight',
  color = 'info',
  timeout = 3000,
}: ToastOptions) => {
  iziToast[color]({
    title,
    message,
    position,
    timeout,
    transitionIn: 'fadeInDown',
    transitionOut: 'fadeOutUp',
    layout: 2,
    close: true,
    progressBar: true,
  });
};
