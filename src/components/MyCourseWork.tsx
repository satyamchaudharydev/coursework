import React from 'react';
import { useCourseworkStore } from "@/store/useCourseWorkStore";
import CourseWorkList from './CourseWorkList';

export const MyCourseWork = () => {
  const courseworks = useCourseworkStore((state) => state.getSortedCourseworks());

  return (
    <CourseWorkList title="My Coursework" courseworks={courseworks} />
  );
};