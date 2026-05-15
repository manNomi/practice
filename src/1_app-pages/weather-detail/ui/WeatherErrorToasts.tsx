"use client";

import { useEffect } from "react";
import { toast } from "react-hot-toast";

export type WeatherToastError = {
  id: string;
  message: string;
};

type WeatherErrorToastsProps = {
  errors: WeatherToastError[];
};

export function WeatherErrorToasts({ errors }: WeatherErrorToastsProps) {
  useEffect(() => {
    errors.forEach((error) => {
      toast.error(error.message, {
        id: error.id
      });
    });
  }, [errors]);

  return null;
}
