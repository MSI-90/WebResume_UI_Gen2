import {useState} from "react";

export const useResumeStart = () => {
  const [started, setStarted] = useState(false);

  const handleStart = () => setStarted(true);

  return {started, handleStart};
}