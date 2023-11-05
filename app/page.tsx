"use client";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  FaForward,
  FaHourglassHalf,
  FaLeaf,
  FaPause,
  FaPlay,
  FaPlus,
  FaStopwatch,
  FaTrash,
} from "react-icons/fa6";

import { Button } from "./components/button";
import { Icon } from "./components/icon";
import { Label } from "./components/label";
import { LinearProgressBar } from "./components/progress-bar";

export default function Home() {
  const timer = {
    Type: {
      Focus: "Focus",
      ShortBreak: "ShortBreak",
      LongBreak: "LongBreak",
    },
    Duration: {
      Focus: 1200,
      ShortBreak: 300,
      LongBreak: 900,
    },
    Icon: {
      Focus: <Icon element={FaHourglassHalf} size="md" />,
      ShortBreak: <Icon element={FaLeaf} size="md" />,
      LongBreak: <Icon element={FaLeaf} size="md" />,
    },
  };

  const [tasks, setTasks] = useState(
    typeof window !== "undefined"
      ? localStorage.getItem("pomodoroTasks")
        ? JSON.parse(localStorage.getItem("pomodoroTasks"))
        : []
      : undefined
  );

  const [timeLeft, setTimeLeft] = useState(timer.Duration.Focus);
  const [formattedTime, setFormattedTimeLeft] = useState("");
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [timerType, setTimerType] = useState(timer.Type.Focus);
  const [timerDuration, setTimerDuration] = useState(timer.Duration.Focus);
  const [timerIcon, setTimerIcon] = useState(timer.Icon.Focus);
  const [currentPomodoroCount, setCurrentPomodoroCount] = useState(0);
  const [timerRunningAudio, setTimerRunningAudio] = useState(null);
  const [timerFinishedAudio, setTimerFinishedAudio] = useState(null);
  const [currentTask, setCurrentTask] = useState({
    id: 0,
    description: "",
    estimate: 0,
  });
  const [rendered, setRendered] = useState(false);

  useEffect(() => {
    setRendered(true);
  }, []);

  const setNextTimer: any = useCallback(() => {
    setIsTimerRunning(false);
    timerRunningAudio.pause();
    if (
      timerType == timer.Type.Focus &&
      (currentPomodoroCount == 0 || currentPomodoroCount % 3 != 0)
    ) {
      setTimerType(timer.Type.ShortBreak);
      setTimerDuration(timer.Duration.ShortBreak);
      setTimerIcon(timer.Icon.ShortBreak);
      setTimeLeft(timer.Duration.ShortBreak);
    } else if (
      timerType == timer.Type.Focus &&
      currentPomodoroCount > 0 &&
      currentPomodoroCount % 3 == 0
    ) {
      setTimerType(timer.Type.LongBreak);
      setTimerDuration(timer.Duration.LongBreak);
      setTimerIcon(timer.Icon.LongBreak);
      setTimeLeft(timer.Duration.LongBreak);
    } else {
      setTimerType(timer.Type.Focus);
      setTimerDuration(timer.Duration.Focus);
      setTimerIcon(timer.Icon.Focus);
      setTimeLeft(timer.Duration.Focus);
    }
  }, [
    currentPomodoroCount,
    timer.Duration.Focus,
    timer.Duration.LongBreak,
    timer.Duration.ShortBreak,
    timer.Icon.Focus,
    timer.Icon.LongBreak,
    timer.Icon.ShortBreak,
    timer.Type.Focus,
    timer.Type.LongBreak,
    timer.Type.ShortBreak,
    timerRunningAudio,
    timerType,
  ]);

  const timerCallBack: any = useCallback(() => {
    let remainingMinutes = String(Math.floor(timeLeft / 60)).padStart(2, "0");
    let remainingSeconds = String(
      timeLeft - Number(remainingMinutes) * 60
    ).padStart(2, "0");
    setFormattedTimeLeft(`${remainingMinutes}:${remainingSeconds}`);
  }, [timeLeft]);

  useMemo(() => {
    timerCallBack();
  }, [timerCallBack]);

  const timerRunningAudioRef = useRef<HTMLAudioElement | undefined>(
    typeof Audio !== "undefined"
      ? new Audio("\\audio\\ticking-slow.mp3")
      : undefined
  );

  const timerFinishedAudioRef = useRef<HTMLAudioElement | undefined>(
    typeof Audio !== "undefined"
      ? new Audio("\\audio\\clock-alarm.mp3")
      : undefined
  );

  useMemo(() => {
    if (timerRunningAudioRef && timerRunningAudioRef.current) {
      timerRunningAudioRef.current.loop = true;
      setTimerRunningAudio(timerRunningAudioRef.current);
    }
  }, [timerRunningAudioRef]);

  useMemo(() => {
    if (timerFinishedAudioRef && timerFinishedAudioRef.current) {
      timerFinishedAudioRef.current.loop = false;
      setTimerFinishedAudio(timerFinishedAudioRef.current);
    }
  }, [timerFinishedAudioRef]);

  useEffect(() => {
    if (timeLeft == 1) {
      setTimeout(() => {
        timerRunningAudio.pause();
        timerFinishedAudio.play();
        setIsTimerRunning(false);
        if (timerType == timer.Type.Focus) {
          setCurrentPomodoroCount(currentPomodoroCount + 1);
        }
        setNextTimer();
      }, 1000);
      return;
    }

    if (!isTimerRunning) {
      timerRunningAudio.pause();
      return;
    }

    timerRunningAudio.play();

    const intervalId = setInterval(() => {
      setTimeLeft(timeLeft - 1);
    }, 1000);
    timerCallBack();
    return () => clearInterval(intervalId);
  }, [
    isTimerRunning,
    timeLeft,
    timerCallBack,
    currentPomodoroCount,
    setNextTimer,
    timerType,
    timer.Type.Focus,
    timerRunningAudio,
    timerFinishedAudio,
  ]);

  const setTimerState = (timerState: boolean) => {
    setIsTimerRunning(timerState);
  };

  const setActiveTask = (task: any) => {
    setCurrentTask(task);
  };

  const deleteTask = (id: number) => {
    const allTasks = tasks.filter((el) => el.id !== id);
    setTasks(allTasks);
    localStorage.setItem("pomodoroTasks", JSON.stringify(allTasks));
  };

  const addTask = (e) => {
    e.preventDefault();
    if (!newTaskName) {
      return;
    }
    const newId = tasks.at(-1) ? tasks.at(-1).id + 1 : 1;
    const newTask = { id: newId, description: newTaskName, estimate: 0 };
    const allTasks = [...tasks, newTask];
    setTasks((x) => {
      return allTasks;
    });
    localStorage.setItem("pomodoroTasks", JSON.stringify(allTasks));
    console.log(localStorage.getItem("pomodoroTasks"));
    setNewTaskName("");
  };

  const [newTaskName, setNewTaskName] = useState("");

  const handleChange = (event) => {
    setNewTaskName(event.target.value);
  };

  if (!rendered) return <></>;

  return (
    <main className="flex flex-col items-center justify-between min-h-screen bg-gray-800">
      <div className="items-center justify-between w-full min-h-screen font-mono text-sm lg:flex-col">
        <div className="flex items-center justify-between w-full p-5 mb-2 bg-gray-700 border-white">
          <div className="flex items-center justify-start gap-2 font-semibold text-white uppercase">
            <Icon element={FaStopwatch} size="md" />
            <Label size="xl">Pomodoro Timer</Label>
          </div>
        </div>
        <div className="flex items-stretch w-screen gap-5 p-5 justify-stretch">
          <div className="flex-col items-start justify-center w-2/6 min-h-full p-5 font-semibold text-white uppercase bg-gray-700 rounded-xl">
            <div className="my-3">
              <form
                onSubmit={addTask}
                className="flex items-center justify-center gap-2"
              >
                <input
                  type="text"
                  id="taskName"
                  className="w-full p-5 text-gray-600 bg-white rounded-lg"
                  placeholder="Add a task to focus"
                  onChange={handleChange}
                  value={newTaskName}
                />
              </form>
            </div>
            <div className="flex-col items-center justify-center gap-5 overflow-y-auto h-72">
              {tasks &&
                tasks.map((task) => {
                  return (
                    <div
                      className="flex items-center justify-between w-full p-4 mt-1 bg-gray-800 rounded-md"
                      key={task.id}
                    >
                      <p>{task.description}</p>
                      <div className="flex items-center gap-2">
                        <Button
                          onClick={() => setActiveTask(task)}
                          size="xs"
                          icon={FaPlay}
                        ></Button>
                        <Button
                          onClick={() => deleteTask(task.id)}
                          variant="danger"
                          size="xs"
                          icon={FaTrash}
                        ></Button>
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>
          <div className="relative flex-col items-center justify-center w-full p-5 text-center bg-gray-700 rounded-xl">
            <div className="flex-col items-center justify-center mt-5 text-2xl font-semibold text-white uppercase">
              {timerIcon}
              {timerType}
            </div>
            <h3 className="font-bold text-white uppercase text-8xl">
              {formattedTime}
            </h3>
            <div className="flex items-center justify-center w-full gap-5 py-5">
              <div className="flex items-end justify-center gap-5 text-white">
                <Button
                  onClick={() => {
                    setTimeLeft(timeLeft + 120);
                    setTimerDuration(timerDuration + 120);
                  }}
                  variant="success"
                  size="sm"
                  icon={FaPlus}
                >
                  2 Mins
                </Button>
                {isTimerRunning && (
                  <Button
                    onClick={() => setTimerState(false)}
                    variant="warning"
                    icon={FaPause}
                    size="md"
                  >
                    Pause
                  </Button>
                )}
                {!isTimerRunning && (
                  <Button
                    onClick={() => setTimerState(true)}
                    variant="primary"
                    icon={FaPlay}
                    size="md"
                  >
                    Play
                  </Button>
                )}
                <Button
                  onClick={() => setNextTimer()}
                  variant="secondary"
                  size="sm"
                  icon={FaForward}
                >
                  Skip
                </Button>
              </div>
            </div>
            <div>
              {timerType == timer.Type.Focus &&
                currentTask.description != "" && (
                  <div className="h-full">
                    <h2
                      className={`h-full text-md font-medium uppercase text-white
                rounded-lg bg-gray-600 flex-col items-center justify-between`}
                    >
                      <p className="h-full p-3">{currentTask.description}</p>
                      <LinearProgressBar
                        percent={Math.abs(timeLeft / timerDuration) * 100}
                        animateTiming={1000}
                      />
                    </h2>
                  </div>
                )}
            </div>
          </div>
          {/* <div className="flex-col items-center justify-center w-1/6 p-5 font-semibold text-center text-white uppercase bg-gray-700 rounded-xl">
            Pomodoros
            <h3 className="text-5xl font-bold text-white">
              {currentPomodoroCount}
            </h3>
          </div> */}
        </div>
      </div>
    </main>
  );
}
