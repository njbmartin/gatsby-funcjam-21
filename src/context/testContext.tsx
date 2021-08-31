import React, { useCallback, useContext, useEffect } from "react";
import { UserFlag, UserFlags } from "../types/flags";
import axios from "axios";

type TestContextType = {
  flags: UserFlag;
};

const LOCALSTORAGE_KEY = "bunting-flags";
const REFRESH_IN_SECONDS = 300; // refresh every 5 minutes
const localFlagData: UserFlags =
  typeof window !== "undefined"
    ? JSON.parse(window.localStorage.getItem(LOCALSTORAGE_KEY)) || {}
    : {};

export const TestContext = React.createContext<TestContextType>({
  flags: localFlagData.flags,
});

export const useFlags = (): UserFlag => {
  const { flags } = useContext(TestContext);
  return flags || {};
};

const timeBetween = (startDate: Date, endDate: Date): Number => {
  return (endDate.getTime() - startDate.getTime()) / 120;
};

export const TestProvider: React.FC = ({ children }) => {
  const [userData, setUserData] = React.useState<UserFlags>(localFlagData);

  const updateUserData = useCallback((data: UserFlags) => {
    const newData = {
      ...data,
      lastUpdated: new Date(),
    };
    setUserData(newData);
    window &&
      window.localStorage.setItem(LOCALSTORAGE_KEY, JSON.stringify(newData));
  }, []);

  useEffect(() => {
    if (!userData.userId) {
      axios.get<UserFlags>("/api/flags/init").then(({ data }) => {
        updateUserData(data);
      });
      return;
    }
    const nextRefresh = timeBetween(new Date(userData.lastUpdated), new Date());
    if (nextRefresh > REFRESH_IN_SECONDS) {
      axios.get<UserFlags>(`/api/flags/${userData.userId}`).then(({ data }) => {
        updateUserData(data);
      });
    }
  }, [userData]);

  return (
    <TestContext.Provider
      value={{
        flags: userData.flags,
      }}
    >
      {children}
    </TestContext.Provider>
  );
};
