import { useEffect, useState } from "react";
import AppRouter from "@/presentation/router/AppRouter";
import SplashPage from "@/presentation/pages/SplashPage";

export default function App() {
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  if (showSplash) {
    return <SplashPage />;
  }

  return <AppRouter />;
}