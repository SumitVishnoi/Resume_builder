"use client";

import ProtectedLayout from "@/app/protected/layout";
import ResumeEditorPage from "@/components/resume-editor/ResumeEditor";
import React from "react";

const page = () => {
  return (
    <ProtectedLayout>
      <ResumeEditorPage />
    </ProtectedLayout>
  );
};

export default page;
