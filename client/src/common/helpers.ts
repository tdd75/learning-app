import { ElNotification } from 'element-plus';

export const ratioToPercentage = (ratio: string): number => {
  const [num, den] = ratio.split('/');
  return (parseInt(num) * 100) / parseInt(den);
};

export const showSuccessNotification = (title: string, message: string) => {
  ElNotification({
    type: 'success',
    title: title,
    message: message,
  });
};

export const showErrorNotification = (title: string, message: string) => {
  ElNotification({
    type: 'error',
    title: title,
    message: message,
  });
};
