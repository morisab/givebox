import { useEffect } from "react";

export const usePageTitle = (title: string) => {
  useEffect(() => {
    const previousTitle = document.title;
    document.title = `${title} | Givebox`;

    return () => {
      document.title = previousTitle;
    };
  }, [title]);
};
