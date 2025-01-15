import { useEffect, useState } from "react";

const styles = {
  notificationAnimation: `
    @keyframes slideDown {
      0% { transform: translateY(-100%); opacity: 0; }
      100% { transform: translateY(0); opacity: 1; }
    }
    @keyframes slideUp {
      0% { transform: translateY(0); opacity: 1; }
      100% { transform: translateY(-100%); opacity: 0; }
    }
    .slide-down {
      animation: slideDown 0.5s ease forwards;
    }
    .slide-up {
      animation: slideUp 0.5s ease forwards;
    }
  `
};

interface Props {
  type: string;
  message: string;
  reset: () => void;
}

const NotificationCard = ({ type, message, reset }: Props) => {

  const [animateOut, setAnimateOut] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimateOut(true);
      setTimeout(() => reset(), 500);
    }, 2000);

    return () => clearTimeout(timer);
  }, [reset]);

  return (
    <div>
      <style dangerouslySetInnerHTML={{ __html: styles.notificationAnimation }} />

      <div
        className={`fixed top-4 left-1/2 transform -translate-x-1/2 z-50 px-6 py-3 rounded-lg shadow-md flex items-center space-x-3 ${
          animateOut ? "slide-up" : "slide-down"
        } ${
          type === "success" ? "bg-green-500 text-white" : "bg-red-500 text-white"
        }`}
      >
        <span className="font-medium">{message}</span>
      </div>
    </div>
  );
};

export default NotificationCard;
